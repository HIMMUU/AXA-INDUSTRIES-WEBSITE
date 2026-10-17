import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@axa/db';
import { randomUUID } from 'crypto';
import { EnquiriesRepository } from './repositories/enquiries.repository';
import { EnquiryEmailService } from './enquiry-email.service';
import {
  CreateInstitutionalLeadDto,
  LeadAttributionTouchDto
} from './dto/create-institutional-lead.dto';

const QUANTITY_MINIMUMS: Record<CreateInstitutionalLeadDto['quantity'], number> = {
  '1': 1,
  '2-5': 2,
  '6-20': 6,
  '20+': 20
};

function toJsonTouch(touch: LeadAttributionTouchDto): Prisma.InputJsonObject {
  return {
    source: touch.source ?? null,
    medium: touch.medium ?? null,
    campaign: touch.campaign ?? null,
    content: touch.content ?? null,
    term: touch.term ?? null,
    gclid: touch.gclid ?? null,
    wbraid: touch.wbraid ?? null,
    gbraid: touch.gbraid ?? null,
    landing_page: touch.landing_page ?? null,
    referrer: touch.referrer ?? null,
    page_title: touch.page_title ?? null,
    ts: touch.ts ?? null
  };
}

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    private readonly repository: EnquiriesRepository,
    private readonly emailService: EnquiryEmailService
  ) {}

  isSpamSubmission(body: unknown): boolean {
    if (!body || typeof body !== 'object' || Array.isArray(body)) return false;

    const payload = body as Record<string, unknown>;
    if (
      payload.company_url !== undefined &&
      payload.company_url !== null &&
      !(typeof payload.company_url === 'string' && payload.company_url.trim() === '')
    ) {
      return true;
    }

    return (
      typeof payload.form_started_at === 'number' &&
      Date.now() - payload.form_started_at < 3000
    );
  }

  discardSpamSubmission() {
    this.logger.warn('Discarded a spam lead submission.');
    return { ok: true, lead_id: `LEAD-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}` };
  }

  async createLead(
    dto: CreateInstitutionalLeadDto,
    idempotencyKey: string,
    userAgent: string | string[] | undefined
  ) {
    const existing = await this.repository.findByIdempotencyKey(idempotencyKey);
    if (existing) return { ok: true, lead_id: existing.referenceNumber };

    const analyticsConsent = dto.attribution.consent;
    const attribution: Prisma.InputJsonObject = {
      first_touch: toJsonTouch(dto.attribution.first_touch),
      last_touch: toJsonTouch(dto.attribution.last_touch),
      consent: analyticsConsent,
      user_agent: analyticsConsent
        ? (Array.isArray(userAgent) ? userAgent[0] : userAgent)?.slice(0, 512) ?? null
        : null
    };
    const phone = this.normalizeIndianPhone(dto.phone);

    try {
      const enquiry = await this.repository.createInstitutionalLead({
        idempotencyKey,
        name: dto.name,
        company: dto.organisation,
        phone,
        email: dto.email || undefined,
        city: dto.city,
        message: [
          'Product interest: sanitary napkin vending machine.',
          dto.message?.trim()
        ].filter(Boolean).join('\n\n'),
        quantity: QUANTITY_MINIMUMS[dto.quantity],
        institutionType: dto.institution_type,
        quantityBand: dto.quantity,
        consentAt: new Date(),
        attribution
      });

      const adminNotificationSent = await this.emailService.sendAdminNotification(enquiry.id, {
        referenceNumber: enquiry.referenceNumber,
        name: dto.name,
        phone,
        company: dto.organisation,
        email: dto.email,
        city: dto.city,
        institutionType: dto.institution_type,
        quantity: QUANTITY_MINIMUMS[dto.quantity],
        quantityBand: dto.quantity,
        message: dto.message,
        attribution,
        createdAt: enquiry.createdAt
      });
      if (adminNotificationSent && dto.email) {
        await this.emailService.sendCustomerConfirmation(
          enquiry.id,
          dto.email,
          enquiry.referenceNumber,
          dto.name
        );
      }

      return { ok: true, lead_id: enquiry.referenceNumber };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        const replay = await this.repository.findByIdempotencyKey(idempotencyKey);
        if (replay) return { ok: true, lead_id: replay.referenceNumber };
      }
      throw error;
    }
  }

  private normalizeIndianPhone(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('91') && digits.length > 10) return digits;
    return `91${digits.startsWith('0') ? digits.slice(1) : digits}`;
  }
}
