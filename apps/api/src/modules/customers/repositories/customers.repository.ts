import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { Prisma, CustomerStatus, TimelineType } from '@axa/db';
import { CustomerQueryDto } from '../dto/customer-query.dto';

@Injectable()
export class CustomersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findCustomers(queryDto: CustomerQueryDto) {
    const {
      page = 1,
      limit = 10,
      q,
      status,
      city,
      state,
      sortBy = 'newest'
    } = queryDto;

    const skip = (page - 1) * limit;

    const where: Prisma.CustomerWhereInput = {
      deletedAt: null
    };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { company: { contains: q, mode: 'insensitive' } },
        { phone: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } }
      ];
    }

    if (status) {
      where.status = status;
    }

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (state) {
      where.state = { contains: state, mode: 'insensitive' };
    }

    let orderBy: Prisma.CustomerOrderByWithRelationInput = { createdAt: 'desc' };
    if (sortBy === 'oldest') {
      orderBy = { createdAt: 'asc' };
    }

    const [items, total] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          orders: {
            where: { deletedAt: null },
            select: {
              id: true,
              totalAmount: true,
              status: true,
              createdAt: true
            }
          }
        }
      }),
      this.prisma.customer.count({ where })
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
    return this.prisma.customer.findFirst({
      where: { id, deletedAt: null },
      include: {
        orders: {
          where: { deletedAt: null },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            orderNumber: true,
            totalAmount: true,
            status: true,
            createdAt: true
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

  async findByPhone(phone: string) {
    return this.prisma.customer.findFirst({
      where: { phone, deletedAt: null }
    });
  }

  async findByEmail(email: string) {
    return this.prisma.customer.findFirst({
      where: { email, deletedAt: null }
    });
  }

  async createCustomer(data: Prisma.CustomerCreateInput) {
    return this.prisma.customer.create({
      data,
      include: {
        notesList: true,
        timeline: true
      }
    });
  }

  async updateCustomer(id: string, data: Prisma.CustomerUpdateInput) {
    return this.prisma.customer.update({
      where: { id },
      data,
      include: {
        notesList: true,
        timeline: true
      }
    });
  }

  async softDeleteCustomer(id: string) {
    return this.prisma.customer.update({
      where: { id },
      data: {
        status: CustomerStatus.DELETED,
        deletedAt: new Date()
      }
    });
  }

  async addCustomerNote(customerId: string, content: string, createdBy = 'Admin') {
    return this.prisma.customerNote.create({
      data: {
        customerId,
        content,
        createdBy
      }
    });
  }

  async deleteCustomerNote(noteId: string) {
    return this.prisma.customerNote.delete({
      where: { id: noteId }
    });
  }

  async addTimelineEvent(customerId: string, title: string, description?: string, type: TimelineType = TimelineType.CREATED) {
    return this.prisma.customerTimeline.create({
      data: {
        customerId,
        title,
        description,
        type
      }
    });
  }

  async updateBulkStatus(ids: string[], status: CustomerStatus) {
    return this.prisma.customer.updateMany({
      where: { id: { in: ids }, deletedAt: null },
      data: { status }
    });
  }

  async softDeleteBulk(ids: string[]) {
    return this.prisma.customer.updateMany({
      where: { id: { in: ids }, deletedAt: null },
      data: {
        status: CustomerStatus.DELETED,
        deletedAt: new Date()
      }
    });
  }
}
