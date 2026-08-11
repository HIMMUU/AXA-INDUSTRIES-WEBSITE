import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { EnquiriesRepository } from './repositories/enquiries.repository';
import { EnquiryEmailService } from './enquiry-email.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';
import { EnquiryStatus, EnquirySource } from '@axa/db';
import { CustomersRepository } from '../customers/repositories/customers.repository';

@Injectable()
export class EnquiriesService {
  private readonly logger = new Logger(EnquiriesService.name);

  constructor(
    private readonly repository: EnquiriesRepository,
    private readonly emailService: EnquiryEmailService,
    private readonly customersRepository: CustomersRepository
  ) {}

  async createEnquiry(dto: CreateEnquiryDto) {
    // 1. Honeypot Anti-Spam Check
    if (dto.honeypot) {
      this.logger.warn(`Spam submission detected via honeypot field for phone ${dto.phone}`);
      throw new BadRequestException('Invalid submission parameters.');
    }

    // 2. Auto-Link / Create Customer Record
    let existingCustomer = await this.customersRepository.findByPhone(dto.phone);
    if (!existingCustomer && dto.email) {
      existingCustomer = await this.customersRepository.findByEmail(dto.email);
    }

    let customerId = existingCustomer?.id;
    if (!existingCustomer) {
      const newCustomer = await this.customersRepository.createCustomer({
        name: dto.name,
        company: dto.company,
        phone: dto.phone,
        email: dto.email || `${dto.phone.replace(/[^0-9]/g, '')}@customer.axaindustries.com`,
        city: dto.city || '',
        state: dto.state || '',
        country: dto.country || 'India',
        status: 'ACTIVE' as any
      });
      customerId = newCustomer.id;
    }

    // 3. Generate Reference Number & Create Enquiry
    const referenceNumber = await this.repository.generateReferenceNumber();
    const enquiry = await this.repository.createEnquiry({
      ...dto,
      referenceNumber,
      customerId
    });

    // 4. Log Timeline Events
    await this.repository.addTimelineEvent(
      enquiry.id,
      'Enquiry Submitted',
      `Reference #${referenceNumber} generated via ${dto.source || 'Contact Page'}`
    );

    // 5. Trigger Email Automation in Background (Sub-second response time)
    if (dto.email) {
      this.emailService.sendCustomerConfirmation(dto.email, referenceNumber, dto.name)
        .then(() => {
          this.repository.addTimelineEvent(
            enquiry.id,
            'Confirmation Email Sent',
            `Automated response sent to ${dto.email}`
          );
        })
        .catch((err) => this.logger.error(`Async customer email failed: ${err.message}`));
    }

    this.emailService.sendAdminNotification(referenceNumber, dto.name, dto.phone, dto.company)
      .catch((err) => this.logger.error(`Async admin email failed: ${err.message}`));

    return enquiry;
  }

  async getEnquiries(query: {
    page?: number;
    limit?: number;
    q?: string;
    status?: EnquiryStatus;
    source?: EnquirySource;
    productId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    return this.repository.findEnquiries(query);
  }

  async getEnquiryById(id: string) {
    const enquiry = await this.repository.findById(id);
    if (!enquiry) {
      throw new NotFoundException('Enquiry record not found.');
    }
    return enquiry;
  }

  async updateEnquiry(id: string, dto: UpdateEnquiryDto) {
    await this.getEnquiryById(id);
    const updated = await this.repository.updateEnquiry(id, dto);

    if (dto.status) {
      await this.repository.addTimelineEvent(
        id,
        'Status Updated',
        `Enquiry status changed to ${dto.status}`
      );
    }

    return updated;
  }

  async updateStatus(id: string, status: EnquiryStatus) {
    await this.getEnquiryById(id);
    const updated = await this.repository.updateStatus(id, status);
    await this.repository.addTimelineEvent(id, 'Status Updated', `Status set to ${status}`);
    return updated;
  }

  async deleteEnquiry(id: string) {
    await this.getEnquiryById(id);
    return this.repository.softDeleteEnquiry(id);
  }

  async convertToCustomer(id: string) {
    await this.getEnquiryById(id);
    return this.repository.convertToCustomer(id);
  }

  async convertToOrder(id: string) {
    await this.getEnquiryById(id);
    return this.repository.convertToOrder(id);
  }

  async addNote(id: string, content: string) {
    await this.getEnquiryById(id);
    const note = await this.repository.addEnquiryNote(id, content);
    await this.repository.addTimelineEvent(id, 'Internal Note Added', content);
    return note;
  }

  async deleteNote(id: string, noteId: string) {
    await this.getEnquiryById(id);
    return this.repository.deleteEnquiryNote(noteId);
  }

  async exportCsv(body: { enquiryIds?: string[]; status?: EnquiryStatus }) {
    let items: any[] = [];
    if (body.enquiryIds && body.enquiryIds.length > 0) {
      const res = await Promise.all(body.enquiryIds.map((id) => this.repository.findById(id)));
      items = res.filter(Boolean);
    } else {
      const res = await this.repository.findEnquiries({ limit: 1000, status: body.status });
      items = res.items;
    }

    const header = 'Reference #,Name,Company,Phone,Email,Product,Quantity,Source,Status,Created At\n';
    const rows = items
      .map(
        (e) =>
          `"${e.referenceNumber}","${e.name}","${e.company || ''}","${e.phone}","${e.email || ''}","${e.product?.name || ''}","${e.quantity}","${e.source}","${e.status}","${e.createdAt.toISOString()}"`
      )
      .join('\n');

    return header + rows;
  }

  async bulkOperation(body: { enquiryIds: string[]; action: 'DELETE' | 'MARK_CONTACTED' | 'MARK_CONVERTED'; status?: EnquiryStatus }) {
    if (!body.enquiryIds || body.enquiryIds.length === 0) {
      throw new BadRequestException('No enquiry IDs provided');
    }

    if (body.action === 'DELETE') {
      return this.repository.softDeleteBulk(body.enquiryIds);
    }

    if (body.action === 'MARK_CONTACTED') {
      return this.repository.updateBulkStatus(body.enquiryIds, EnquiryStatus.CONTACTED);
    }

    if (body.action === 'MARK_CONVERTED') {
      return this.repository.updateBulkStatus(body.enquiryIds, EnquiryStatus.CONVERTED);
    }

    throw new BadRequestException('Invalid bulk action');
  }
}
