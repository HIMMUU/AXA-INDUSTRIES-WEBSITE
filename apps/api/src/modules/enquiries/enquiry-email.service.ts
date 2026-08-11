import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EnquiryEmailService {
  private readonly logger = new Logger(EnquiryEmailService.name);

  private createTransporter(): nodemailer.Transporter | null {
    const rawPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.EMAIL_PASS || 'llatcecgoezktlyj';
    const pass = rawPass.replace(/\s+/g, '');
    const user = process.env.SMTP_USER || process.env.EMAIL_USER || 'axaindustries.contact@gmail.com';
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '587', 10);

    if (!pass) {
      this.logger.warn(`[Email Service] No SMTP password found. Mail dispatch skipped.`);
      return null;
    }

    if (host.includes('gmail.com') || user.includes('gmail.com')) {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
      });
    }

    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });
  }

  async sendCustomerConfirmation(email: string, referenceNumber: string, name: string): Promise<boolean> {
    this.logger.log(`[Email Automation] Sending confirmation email to customer ${name} (${email}) for reference #${referenceNumber}`);
    
    const transporter = this.createTransporter();
    if (transporter) {
      try {
        const senderUser = process.env.SMTP_USER || 'axaindustries.contact@gmail.com';
        await transporter.sendMail({
          from: `"AXA Industries B2B Desk" <${senderUser}>`,
          to: email,
          subject: `Quotation Request Received - #${referenceNumber}`,
          html: `<div style="font-family: sans-serif; padding: 20px;">
            <h2>Dear ${name},</h2>
            <p>Thank you for submitting a quote request to AXA Industries (Flagship Brand AXA CLUB).</p>
            <p>Your Enquiry Reference Number: <strong>#${referenceNumber}</strong></p>
            <p>Our sales engineer team will review your specifications and send you formal commercial quotation within 2 hours.</p>
            <hr />
            <p style="color: #666; font-size: 12px;">AXA Industries • E-57, Gali no. 10, Harinagar Part 2, Badarpur, New Delhi - 110044 • Direct Desk: +91 80764 96709</p>
          </div>`
        });
      } catch (err: any) {
        this.logger.error(`Failed to send customer confirmation email: ${err.message}`);
      }
    }
    return true;
  }

  async sendAdminNotification(referenceNumber: string, name: string, phone: string, company?: string): Promise<boolean> {
    const adminTarget = process.env.ADMIN_NOTIFICATION_EMAIL || 'axaindustries.contact@gmail.com';
    const senderUser = process.env.SMTP_USER || 'axaindustries.contact@gmail.com';
    this.logger.log(`[Email Automation] Alerting admin (${adminTarget}) of new Enquiry #${referenceNumber} from ${name} (${company || 'Individual'}) - Phone: ${phone}`);

    const transporter = this.createTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"AXA Platform Lead Alert" <${senderUser}>`,
          to: adminTarget,
          subject: `🚨 NEW LEAD ENQUIRY #${referenceNumber} - ${name} (${company || 'Direct Client'})`,
          html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; max-width: 600px;">
            <h2 style="color: #1e40af; margin-top: 0;">New Quote Enquiry Received!</h2>
            <p><strong>Reference Number:</strong> <span style="font-size: 16px; font-weight: bold; color: #0d9488;">#${referenceNumber}</span></p>
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Organization / Company:</strong> ${company || 'Individual'}</p>
            <p><strong>Contact Phone:</strong> <a href="tel:${phone}" style="color: #2563eb; font-weight: bold;">${phone}</a></p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 16px 0;" />
            <p style="color: #4b5563; font-size: 13px;">Review and manage this lead directly in your AXA Admin Portal under <strong>Queries & Enquiries</strong>.</p>
          </div>`
        });
        this.logger.log(`[Email Automation] Email successfully dispatched to ${adminTarget}`);
      } catch (err: any) {
        this.logger.error(`Failed to send admin notification email to ${adminTarget}: ${err.message}`);
      }
    }
    return true;
  }
}
