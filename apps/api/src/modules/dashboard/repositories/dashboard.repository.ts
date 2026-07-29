import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOrdersCountBetween(startDate: Date, endDate: Date): Promise<number> {
    return this.prisma.order.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        deletedAt: null
      }
    });
  }

  async getRevenueBetween(startDate: Date, endDate: Date): Promise<number> {
    const result = await this.prisma.order.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        status: {
          in: ['CONFIRMED', 'COMPLETED']
        },
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        deletedAt: null
      }
    });
    return result._sum.totalAmount ? Number(result._sum.totalAmount) : 0;
  }

  async getCustomersCountBetween(startDate: Date, endDate: Date): Promise<number> {
    return this.prisma.customer.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        deletedAt: null
      }
    });
  }

  async getTotalCustomersCount(): Promise<number> {
    return this.prisma.customer.count({
      where: { deletedAt: null }
    });
  }

  async getTotalProductsCount(): Promise<number> {
    return this.prisma.product.count({
      where: {
        status: 'PUBLISHED',
        deletedAt: null
      }
    });
  }

  async getPendingOrdersCount(): Promise<number> {
    return this.prisma.order.count({
      where: {
        status: 'PENDING',
        deletedAt: null
      }
    });
  }

  async getRecentOrders(limit = 10) {
    return this.prisma.order.findMany({
      take: limit,
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        orderNumber: true,
        totalAmount: true,
        status: true,
        createdAt: true,
        customer: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        },
        _count: {
          select: { items: true }
        }
      }
    });
  }

  async getRecentCustomers(limit = 5) {
    return this.prisma.customer.findMany({
      take: limit,
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        _count: {
          select: { orders: true }
        }
      }
    });
  }

  async get7DayOrders(startDate: Date) {
    return this.prisma.order.findMany({
      where: {
        createdAt: { gte: startDate },
        deletedAt: null
      },
      select: {
        createdAt: true,
        totalAmount: true,
        status: true
      }
    });
  }

  async searchProducts(query: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { slug: { contains: query, mode: 'insensitive' } }
        ],
        deletedAt: null
      },
      take: 5,
      select: { id: true, name: true, slug: true, price: true }
    });
  }

  async searchOrders(query: string) {
    return this.prisma.order.findMany({
      where: {
        OR: [
          { orderNumber: { contains: query, mode: 'insensitive' } },
          { customer: { name: { contains: query, mode: 'insensitive' } } }
        ],
        deletedAt: null
      },
      take: 5,
      select: { id: true, orderNumber: true, totalAmount: true, status: true, customer: { select: { name: true } } }
    });
  }

  async searchCustomers(query: string) {
    return this.prisma.customer.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { phone: { contains: query, mode: 'insensitive' } }
        ],
        deletedAt: null
      },
      take: 5,
      select: { id: true, name: true, email: true, phone: true }
    });
  }
}
