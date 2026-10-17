import { Injectable, Logger } from '@nestjs/common';
import {
  EmailAttemptStatus,
  EmailNotificationType,
  Prisma
} from '@axa/db';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../../common/prisma/prisma.service';

type EnquiryMailDetails = {
  referenceNumber: string;
  name: string;
  phone: string;
  company?: string | null;
  email?: string | null;
  city?: string | null;
  institutionType?: string | null;
  quantity?: number | null;
  quantityBand?: string | null;
  message?: string | null;
  attribution?: Prisma.JsonValue | Prisma.InputJsonValue | null;
  createdAt?: Date | string;
};

const MAX_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [250, 500];

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entities[character];
  });
}

function formatAttribution(
  attribution?: Prisma.JsonValue | Prisma.InputJsonValue | null
): string {
  if (
    !attribution ||
    typeof attribution !== 'object' ||
    Array.isArray(attribution) ||
    !('last_touch' in attribution)
  ) {
    return 'Not available';
  }

  const lastTouch = attribution.last_touch;
  if (!lastTouch || typeof lastTouch !== 'object' || Array.isArray(lastTouch)) {
    return 'Not available';
  }

  const values = ['source', 'medium', 'campaign', 'term', 'gclid', 'wbraid', 'gbraid']
    .flatMap((key) => {
      const value = lastTouch[key];
      return typeof value === 'string' && value ? [`${key}: ${value}`] : [];
    });
  return values.length ? values.join(' | ') : 'Direct / untagged';
}

@Injectable()
export class EnquiryEmailService {
  private readonly logger = new Logger(EnquiryEmailService.name);

  constructor(private readonly prisma: PrismaService) {}

  async sendCustomerConfirmation(
    enquiryId: string,
    email: string,
    referenceNumber: string,
    name: string
  ): Promise<boolean> {
    const safeName = escapeHtml(name);
    const subject = `Enquiry received — ${referenceNumber}`;
    const text = [
      `Hello ${name},`,
      '',
      'Thank you for contacting AXA Industries. Your enquiry has been received.',
      `Reference: ${referenceNumber}`,
      '',
      'Our team will review your request and follow up.',
      '',
      'AXA Industries'
    ].join('\n');
    const html = `<div style="font-family:Arial,sans-serif;line-height:1.6"><p>Hello ${safeName},</p><p>Thank you for contacting AXA Industries. Your enquiry has been received.</p><p>Reference: <strong>${escapeHtml(referenceNumber)}</strong></p><p>Our team will review your request and follow up.</p><p>AXA Industries</p></div>`;

    return this.sendWithRetry(
      enquiryId,
      EmailNotificationType.CUSTOMER_ACKNOWLEDGEMENT,
      [email],
      subject,
      text,
      html
    );
  }

  async sendAdminNotification(
    enquiryId: string,
    details: EnquiryMailDetails
  ): Promise<boolean> {
    const recipients = (process.env.ADMIN_NOTIFICATION_EMAIL || '')
      .split(/[;,]/)
      .map((address) => address.trim())
      .filter(Boolean);
    const sentAt = details.createdAt
      ? new Date(details.createdAt).toISOString()
      : new Date().toISOString();
    const attribution = formatAttribution(details.attribution);
    const fields: Array<[string, string]> = [
      ['Reference', details.referenceNumber],
      ['Name', details.name],
      ['Organisation', details.company || 'Not provided'],
      ['Phone', details.phone],
      ['Email', details.email || 'Not provided'],
      ['City', details.city || 'Not provided'],
      ['Institution type', details.institutionType || 'Not provided'],
      ['Quantity', details.quantityBand || (details.quantity ? String(details.quantity) : 'Not provided')],
      ['Message', details.message || 'Not provided'],
      ['Submitted at', sentAt],
      ['Attribution', attribution]
    ];
    const text = [
      'A new website enquiry was received.',
      '',
      ...fields.map(([label, value]) => `${label}: ${value}`),
      '',
      'Review this enquiry in the AXA Industries admin portal.'
    ].join('\n');
    const rows = fields
      .map(
        ([label, value]) =>
          `<tr><th align="left" style="padding:6px 12px 6px 0">${escapeHtml(label)}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
      )
      .join('');

    if (recipients.length === 0) {
      await this.recordAttempt({
        enquiryId,
        notificationType: EmailNotificationType.ADMIN_ALERT,
        attemptNumber: 1,
        status: EmailAttemptStatus.FAILED,
        errorText: 'ADMIN_NOTIFICATION_EMAIL is not configured.'
      });
      this.logger.error(`Admin notification unavailable for enquiry ${details.referenceNumber}: recipient is not configured.`);
      return false;
    }

    return this.sendWithRetry(
      enquiryId,
      EmailNotificationType.ADMIN_ALERT,
      recipients,
      `New website enquiry — ${details.referenceNumber}`,
      text,
      `<div style="font-family:Arial,sans-serif;line-height:1.5"><h2>New website enquiry</h2><table>${rows}</table><p>Review this enquiry in the AXA Industries admin portal.</p></div>`
    );
  }

  private async sendWithRetry(
    enquiryId: string,
    notificationType: EmailNotificationType,
    recipients: string[],
    subject: string,
    text: string,
    html: string
  ): Promise<boolean> {
    const config = this.getSmtpConfig();
    if (!config) {
      await this.recordAttempt({
        enquiryId,
        notificationType,
        attemptNumber: 1,
        status: EmailAttemptStatus.FAILED,
        errorText: 'SMTP configuration is incomplete.'
      });
      this.logger.error(`Email delivery unavailable for enquiry ${enquiryId}: SMTP configuration is incomplete.`);
      return false;
    }

    let pendingRecipients = recipients;
    for (let attemptNumber = 1; attemptNumber <= MAX_ATTEMPTS; attemptNumber += 1) {
      try {
        const transporter = nodemailer.createTransport({
          host: config.host,
          port: config.port,
          secure: config.port === 465,
          auth: { user: config.user, pass: config.password },
          connectionTimeout: 1500,
          greetingTimeout: 1500,
          socketTimeout: 2500
        });
        const result = await transporter.sendMail({
          from: config.from,
          ...(config.replyTo ? { replyTo: config.replyTo } : {}),
          to: pendingRecipients.join(', '),
          subject,
          text,
          html
        });
        if (result.rejected.length > 0) {
          pendingRecipients = result.rejected.map(String);
          throw new Error(`Mail provider rejected ${pendingRecipients.length} recipient(s).`);
        }
        await this.recordAttempt({
          enquiryId,
          notificationType,
          attemptNumber,
          status: EmailAttemptStatus.SENT,
          providerMessageId: result.messageId
        });
        this.logger.log(
          `Email sent (${notificationType}) for enquiry ${enquiryId}, attempt ${attemptNumber}.`
        );
        return true;
      } catch (error) {
        const errorText = this.safeErrorText(error);
        const isFinalAttempt = attemptNumber === MAX_ATTEMPTS;
        await this.recordAttempt({
          enquiryId,
          notificationType,
          attemptNumber,
          status: isFinalAttempt ? EmailAttemptStatus.FAILED : EmailAttemptStatus.RETRYING,
          errorText
        });

        if (isFinalAttempt) {
          this.logger.error(
            `Email delivery failed (${notificationType}) for enquiry ${enquiryId} after ${attemptNumber} attempts: ${errorText}`
          );
          return false;
        }

        this.logger.warn(
          `Email delivery retry scheduled (${notificationType}) for enquiry ${enquiryId}, attempt ${attemptNumber}.`
        );
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAYS_MS[attemptNumber - 1]));
      }
    }

    return false;
  }

  private getSmtpConfig():
    | { host: string; port: number; user: string; password: string; from: string; replyTo?: string }
    | null {
    const host = process.env.SMTP_HOST?.trim();
    const port = Number(process.env.SMTP_PORT);
    const user = process.env.SMTP_USER?.trim();
    const password = (process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '').trim();
    const from = process.env.SMTP_FROM?.trim();
    const replyTo = process.env.SMTP_REPLY_TO?.trim();

    if (!host || !Number.isInteger(port) || port < 1 || port > 65535 || !user || !password || !from) {
      return null;
    }

    return { host, port, user, password, from, ...(replyTo ? { replyTo } : {}) };
  }

  private safeErrorText(error: unknown): string {
    if (!(error instanceof Error)) return 'Mail provider returned an unknown error.';
    const code =
      typeof error === 'object' &&
      'code' in error &&
      typeof error.code === 'string'
        ? ` (${error.code})`
        : '';
    return `${error.message}${code}`
      .replace(/(pass(?:word)?|secret|token|api[_ -]?key)\s*[:=]\s*\S+/gi, '$1=[redacted]')
      .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[email]')
      .replace(/\b\d{7,}\b/g, '[number]')
      .replace(/[\r\n]+/g, ' ')
      .slice(0, 500);
  }

  private async recordAttempt(data: {
    enquiryId: string;
    notificationType: EmailNotificationType;
    attemptNumber: number;
    status: EmailAttemptStatus;
    providerMessageId?: string;
    errorText?: string;
  }): Promise<void> {
    try {
      await this.prisma.emailNotificationAttempt.create({
        data: {
          enquiryId: data.enquiryId,
          notificationType: data.notificationType,
          attemptNumber: data.attemptNumber,
          status: data.status,
          providerMessageId: data.providerMessageId?.slice(0, 500),
          errorText: data.errorText
        }
      });
    } catch (error) {
      const message = error instanceof Error ? error.message.replace(/[\r\n]+/g, ' ').slice(0, 300) : 'Unknown database error';
      this.logger.error(`Could not persist email attempt for enquiry ${data.enquiryId}: ${message}`);
    }
  }
}
