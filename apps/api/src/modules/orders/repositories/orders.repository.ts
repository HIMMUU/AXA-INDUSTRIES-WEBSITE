import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@axa/db';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async generateOrderNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.prisma.order.count();
    const seq = (count + 1).toString().padStart(5, '0');
    return `ORD-${year}-${seq}`;
  }

  async findOrders(params: {
    page?: number;
    limit?: number;
    q?: string;
    status?: OrderStatus;
    customerId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const {
      page = 1,
      limit = 10,
      q,
      status,
      customerId,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params;

    const skip = (page - 1) * limit;
    const where: any = { deletedAt: null };

    if (q) {
      where.OR = [
        { orderNumber: { contains: q, mode: 'insensitive' } },
        { customer: { name: { contains: q, mode: 'insensitive' } } },
        { customer: { phone: { contains: q, mode: 'insensitive' } } },
        { customer: { email: { contains: q, mode: 'insensitive' } } },
        { customer: { company: { contains: q, mode: 'insensitive' } } }
      ];
    }

    if (status) where.status = status;
    if (customerId) where.customerId = customerId;

    const [items, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          customer: {
            select: { id: true, name: true, phone: true, email: true, company: true }
          },
          items: {
            include: {
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
          }
        }
      }),
      this.prisma.order.count({ where })
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
    return this.prisma.order.findFirst({
      where: { id, deletedAt: null },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            company: true,
            gst: true,
            address: true,
            city: true,
            state: true
          }
        },
        items: {
          include: {
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
        }
      }
    });
  }

  async createOrder(data: CreateOrderDto & { orderNumber: string; totalAmount: number }) {
    return this.prisma.order.create({
      data: {
        orderNumber: data.orderNumber,
        customerId: data.customerId,
        totalAmount: data.totalAmount,
        status: data.status || OrderStatus.PENDING,
        notes: data.notes,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price || 0
          }))
        }
      },
      include: {
        customer: true,
        items: {
          include: { product: true }
        }
      }
    });
  }

  async updateOrder(id: string, data: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data,
      include: {
        customer: true,
        items: {
          include: { product: true }
        }
      }
    });
  }

  async updateStatus(id: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id },
      data: { status }
    });
  }

  async softDeleteOrder(id: string) {
    return this.prisma.order.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async softDeleteBulk(ids: string[]) {
    return this.prisma.order.updateMany({
      where: { id: { in: ids } },
      data: { deletedAt: new Date() }
    });
  }

  async updateBulkStatus(ids: string[], status: OrderStatus) {
    return this.prisma.order.updateMany({
      where: { id: { in: ids } },
      data: { status }
    });
  }
}
