import { Injectable } from '@nestjs/common';
import { EnquiryStatus, EnquirySource, OrderStatus } from '@axa/db';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateEnquiryDto } from '../dto/create-enquiry.dto';
import { UpdateEnquiryDto } from '../dto/update-enquiry.dto';

@Injectable()
export class EnquiriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async generateReferenceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.prisma.enquiry.count();
    const nextSeq = (count + 1).toString().padStart(5, '0');
    return `ENQ-${year}-${nextSeq}`;
  }

  async findEnquiries(params: {
    page?: number;
    limit?: number;
    q?: string;
    status?: EnquiryStatus;
    source?: EnquirySource;
    productId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const {
      page = 1,
      limit = 10,
      q,
      status,
      source,
      productId,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params;

    const skip = (page - 1) * limit;
    const where: any = { deletedAt: null };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { company: { contains: q, mode: 'insensitive' } },
        { phone: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { referenceNumber: { contains: q, mode: 'insensitive' } }
      ];
    }

    if (status) where.status = status;
    if (source) where.source = source;
    if (productId) where.productId = productId;

    const [items, total] = await Promise.all([
      this.prisma.enquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          customer: {
            select: { id: true, name: true, phone: true, email: true, company: true }
          },
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              images: { take: 1, select: { url: true } }
            }
          }
        }
      }),
      this.prisma.enquiry.count({ where })
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findById(id: string) {
    return this.prisma.enquiry.findFirst({
      where: { id, deletedAt: null },
      include: {
        customer: {
          select: { id: true, name: true, phone: true, email: true, company: true, address: true }
        },
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            images: { take: 1, select: { url: true } }
          }
        },
        notesList: {
          orderBy: { createdAt: 'desc' }
        },
        timeline: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }

  async createEnquiry(data: CreateEnquiryDto & { referenceNumber: string; customerId?: string }) {
    return this.prisma.enquiry.create({
      data: {
        referenceNumber: data.referenceNumber,
        name: data.name,
        company: data.company,
        phone: data.phone,
        email: data.email,
        city: data.city,
        state: data.state,
        country: data.country || 'India',
        message: data.message,
        quantity: data.quantity || 1,
        productId: data.productId,
        customerId: data.customerId,
        source: data.source || EnquirySource.CONTACT_PAGE,
        status: EnquiryStatus.NEW,
        preferredContactMethod: data.preferredContactMethod,
        preferredContactTime: data.preferredContactTime
      },
      include: {
        customer: true,
        product: true
      }
    });
  }

  async updateEnquiry(id: string, data: UpdateEnquiryDto) {
    return this.prisma.enquiry.update({
      where: { id },
      data,
      include: {
        customer: true,
        product: true
      }
    });
  }

  async updateStatus(id: string, status: EnquiryStatus) {
    return this.prisma.enquiry.update({
      where: { id },
      data: { status }
    });
  }

  async softDeleteEnquiry(id: string) {
    return this.prisma.enquiry.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async addTimelineEvent(enquiryId: string, title: string, description?: string, type = 'SUBMITTED') {
    return this.prisma.enquiryTimeline.create({
      data: {
        enquiryId,
        title,
        description,
        type
      }
    });
  }

  async addEnquiryNote(enquiryId: string, content: string, createdBy = 'Admin') {
    return this.prisma.enquiryNote.create({
      data: {
        enquiryId,
        content,
        createdBy
      }
    });
  }

  async deleteEnquiryNote(noteId: string) {
    return this.prisma.enquiryNote.delete({
      where: { id: noteId }
    });
  }

  async convertToCustomer(id: string) {
    const enquiry = await this.findById(id);
    if (!enquiry) throw new Error('Enquiry not found');

    let customer = await this.prisma.customer.findUnique({
      where: { phone: enquiry.phone }
    });

    if (!customer) {
      customer = await this.prisma.customer.create({
        data: {
          name: enquiry.name,
          company: enquiry.company,
          phone: enquiry.phone,
          email: enquiry.email || `${enquiry.phone}@customer.axaindustries.com`,
          city: enquiry.city || '',
          state: enquiry.state || '',
          country: enquiry.country || 'India'
        }
      });
    }

    await this.prisma.enquiry.update({
      where: { id },
      data: {
        customerId: customer.id,
        status: EnquiryStatus.CONVERTED
      }
    });

    await this.addTimelineEvent(id, 'Converted to Official Customer', `Linked to Customer ID: ${customer.id}`, 'CONVERTED');

    return customer;
  }

  async convertToOrder(id: string) {
    const enquiry = await this.findById(id);
    if (!enquiry) throw new Error('Enquiry not found');

    let customerId = enquiry.customerId;
    if (!customerId) {
      const customer = await this.convertToCustomer(id);
      customerId = customer.id;
    }

    let unitPrice = 0;
    if (enquiry.product) {
      unitPrice = Number(enquiry.product.price);
    }

    const totalAmount = unitPrice * (enquiry.quantity || 1);
    const year = new Date().getFullYear();
    const count = await this.prisma.order.count();
    const orderNumber = `ORD-${year}-${(count + 1).toString().padStart(5, '0')}`;

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        customerId,
        totalAmount,
        status: OrderStatus.PENDING,
        notes: `Converted from Enquiry #${enquiry.referenceNumber}`,
        ...(enquiry.productId && {
          items: {
            create: [
              {
                productId: enquiry.productId,
                quantity: enquiry.quantity || 1,
                price: unitPrice
              }
            ]
          }
        })
      }
    });

    await this.prisma.enquiry.update({
      where: { id },
      data: { status: EnquiryStatus.CONVERTED }
    });

    await this.addTimelineEvent(id, 'Converted to Pending Order', `Order #${order.orderNumber} created`, 'CONVERTED');

    return order;
  }

  async softDeleteBulk(ids: string[]) {
    return this.prisma.enquiry.updateMany({
      where: { id: { in: ids } },
      data: { deletedAt: new Date() }
    });
  }

  async updateBulkStatus(ids: string[], status: EnquiryStatus) {
    return this.prisma.enquiry.updateMany({
      where: { id: { in: ids } },
      data: { status }
    });
  }
}
