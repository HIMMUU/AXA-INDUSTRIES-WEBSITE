import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Logger
} from '@nestjs/common';
import { CustomersRepository } from './repositories/customers.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerQueryDto } from './dto/customer-query.dto';
import { CreateCustomerNoteDto } from './dto/create-note.dto';
import { BulkCustomerDto, BulkCustomerActionType } from './dto/bulk-customer.dto';
import { CustomerStatus, TimelineType } from '@axa/db';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger(CustomersService.name);

  constructor(private readonly customersRepository: CustomersRepository) {}

  async getCustomers(queryDto: CustomerQueryDto) {
    const result = await this.customersRepository.findCustomers(queryDto);

    let items = result.items.map((c) => this.formatCustomerResponse(c));

    // Sort by calculated aggregations if requested
    if (queryDto.sortBy === 'mostOrders') {
      items = items.sort((a, b) => (b.ordersCount || 0) - (a.ordersCount || 0));
    } else if (queryDto.sortBy === 'highestSpending') {
      items = items.sort((a, b) => (b.totalSpending || 0) - (a.totalSpending || 0));
    }

    return {
      items,
      meta: result.meta
    };
  }

  async getCustomerById(id: string) {
    const customer = await this.customersRepository.findById(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID '${id}' not found`);
    }
    return this.formatCustomerResponse(customer);
  }

  async createCustomer(dto: CreateCustomerDto) {
    const existingPhone = await this.customersRepository.findByPhone(dto.phone);
    if (existingPhone) {
      throw new ConflictException(`Customer with phone '${dto.phone}' already exists`);
    }

    const fullAddress = [
      dto.addressLine1,
      dto.addressLine2,
      dto.city,
      dto.state,
      dto.postalCode,
      dto.country || 'India'
    ]
      .filter(Boolean)
      .join(', ');

    const customer = await this.customersRepository.createCustomer({
      name: dto.name,
      company: dto.company,
      phone: dto.phone,
      email: dto.email,
      gst: dto.gst,
      addressLine1: dto.addressLine1 || '',
      addressLine2: dto.addressLine2,
      city: dto.city || '',
      state: dto.state || '',
      country: dto.country || 'India',
      postalCode: dto.postalCode || '',
      address: fullAddress,
      notes: dto.notes,
      status: dto.status || CustomerStatus.ACTIVE
    });

    await this.customersRepository.addTimelineEvent(
      customer.id,
      'Customer Profile Created',
      'Account created manually by Administrator',
      TimelineType.CREATED
    );

    this.logger.log(`Created customer: ${customer.name} (${customer.id})`);
    return this.formatCustomerResponse(customer);
  }

  async updateCustomer(id: string, dto: UpdateCustomerDto) {
    const existing = await this.customersRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Customer with ID '${id}' not found`);
    }

    if (dto.phone && dto.phone !== existing.phone) {
      const existingPhone = await this.customersRepository.findByPhone(dto.phone);
      if (existingPhone && existingPhone.id !== id) {
        throw new ConflictException(`Customer with phone '${dto.phone}' already exists`);
      }
    }

    const fullAddress = [
      dto.addressLine1 !== undefined ? dto.addressLine1 : existing.addressLine1,
      dto.addressLine2 !== undefined ? dto.addressLine2 : existing.addressLine2,
      dto.city !== undefined ? dto.city : existing.city,
      dto.state !== undefined ? dto.state : existing.state,
      dto.postalCode !== undefined ? dto.postalCode : existing.postalCode,
      dto.country !== undefined ? dto.country : existing.country
    ]
      .filter(Boolean)
      .join(', ');

    const updated = await this.customersRepository.updateCustomer(id, {
      ...(dto.name && { name: dto.name }),
      ...(dto.company !== undefined && { company: dto.company }),
      ...(dto.phone && { phone: dto.phone }),
      ...(dto.email && { email: dto.email }),
      ...(dto.gst !== undefined && { gst: dto.gst }),
      ...(dto.addressLine1 !== undefined && { addressLine1: dto.addressLine1 }),
      ...(dto.addressLine2 !== undefined && { addressLine2: dto.addressLine2 }),
      ...(dto.city !== undefined && { city: dto.city }),
      ...(dto.state !== undefined && { state: dto.state }),
      ...(dto.country !== undefined && { country: dto.country }),
      ...(dto.postalCode !== undefined && { postalCode: dto.postalCode }),
      address: fullAddress,
      ...(dto.notes !== undefined && { notes: dto.notes }),
      ...(dto.status && { status: dto.status })
    });

    await this.customersRepository.addTimelineEvent(
      id,
      'Customer Profile Updated',
      'Information modified by Administrator',
      TimelineType.UPDATED
    );

    this.logger.log(`Updated customer: ${updated.name} (${updated.id})`);
    return this.formatCustomerResponse(updated);
  }

  async deleteCustomer(id: string) {
    const existing = await this.customersRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Customer with ID '${id}' not found`);
    }

    await this.customersRepository.softDeleteCustomer(id);
    this.logger.log(`Soft deleted customer: ${id}`);
    return { success: true, message: 'Customer soft deleted successfully' };
  }

  async addNote(customerId: string, dto: CreateCustomerNoteDto) {
    const existing = await this.customersRepository.findById(customerId);
    if (!existing) {
      throw new NotFoundException(`Customer with ID '${customerId}' not found`);
    }

    const note = await this.customersRepository.addCustomerNote(customerId, dto.content);

    await this.customersRepository.addTimelineEvent(
      customerId,
      'Administrator Note Added',
      dto.content,
      TimelineType.NOTE_ADDED
    );

    return {
      id: note.id,
      customerId: note.customerId,
      content: note.content,
      createdBy: note.createdBy,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    };
  }

  async deleteNote(customerId: string, noteId: string) {
    await this.customersRepository.deleteCustomerNote(noteId);
    return { success: true, message: 'Note deleted successfully' };
  }

  async exportCustomersCsv(dto?: BulkCustomerDto) {
    let customersData;
    if (dto && dto.customerIds && dto.customerIds.length > 0) {
      const all = await this.customersRepository.findCustomers({ page: 1, limit: 1000 });
      customersData = all.items.filter((c) => dto.customerIds.includes(c.id));
    } else {
      const all = await this.customersRepository.findCustomers({ page: 1, limit: 1000 });
      customersData = all.items;
    }

    const headers = ['ID', 'Name', 'Company', 'Phone', 'Email', 'GST', 'City', 'State', 'Status', 'Created At'];
    const rows = customersData.map((c) => [
      c.id,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${(c.company || '').replace(/"/g, '""')}"`,
      `"${c.phone}"`,
      `"${c.email}"`,
      `"${c.gst || ''}"`,
      `"${c.city || ''}"`,
      `"${c.state || ''}"`,
      c.status,
      c.createdAt.toISOString()
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    return csvContent;
  }

  async bulkActions(dto: BulkCustomerDto) {
    const { customerIds, action } = dto;

    switch (action) {
      case BulkCustomerActionType.DELETE:
        await this.customersRepository.softDeleteBulk(customerIds);
        break;
      case BulkCustomerActionType.BLOCK:
        await this.customersRepository.updateBulkStatus(customerIds, CustomerStatus.BLOCKED);
        break;
      case BulkCustomerActionType.RESTORE:
        await this.customersRepository.updateBulkStatus(customerIds, CustomerStatus.ACTIVE);
        break;
      case BulkCustomerActionType.EXPORT:
        return {
          success: true,
          csvData: await this.exportCustomersCsv(dto)
        };
      default:
        throw new BadRequestException('Invalid bulk action type');
    }

    return {
      success: true,
      message: `Bulk ${action} operation completed for ${customerIds.length} customers`
    };
  }

  private formatCustomerResponse(customer: any) {
    const orders = customer.orders || [];
    const ordersCount = orders.length;
    const completedOrdersCount = orders.filter((o: any) => o.status === 'COMPLETED').length;
    const pendingOrdersCount = orders.filter((o: any) => o.status === 'PENDING').length;
    const cancelledOrdersCount = orders.filter((o: any) => o.status === 'CANCELLED').length;

    const totalSpending = orders
      .filter((o: any) => o.status !== 'CANCELLED')
      .reduce((sum: number, o: any) => sum + Number(o.totalAmount || 0), 0);

    const lastOrderDate = ordersCount > 0 ? orders[0].createdAt : null;

    return {
      id: customer.id,
      name: customer.name,
      company: customer.company,
      phone: customer.phone,
      email: customer.email,
      gst: customer.gst,
      addressLine1: customer.addressLine1 || '',
      addressLine2: customer.addressLine2,
      city: customer.city || '',
      state: customer.state || '',
      country: customer.country || 'India',
      postalCode: customer.postalCode || '',
      address: customer.address || '',
      notes: customer.notes,
      status: customer.status,
      ordersCount,
      completedOrdersCount,
      pendingOrdersCount,
      cancelledOrdersCount,
      totalSpending,
      lastOrderDate,
      orders: orders.map((o: any) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        totalAmount: Number(o.totalAmount),
        status: o.status,
        createdAt: o.createdAt
      })),
      notesList: customer.notesList
        ? customer.notesList.map((n: any) => ({
            id: n.id,
            customerId: n.customerId,
            content: n.content,
            createdBy: n.createdBy,
            createdAt: n.createdAt,
            updatedAt: n.updatedAt
          }))
        : [],
      timeline: customer.timeline
        ? customer.timeline.map((t: any) => ({
            id: t.id,
            customerId: t.customerId,
            title: t.title,
            description: t.description,
            type: t.type,
            createdAt: t.createdAt
          }))
        : [],
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt
    };
  }
}
