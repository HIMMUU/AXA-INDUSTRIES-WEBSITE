import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderStatus } from '@axa/db';
import { OrdersRepository } from './repositories/orders.repository';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly prisma: PrismaService
  ) {}

  async getOrders(params: {
    page?: number;
    limit?: number;
    q?: string;
    status?: OrderStatus;
    customerId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    return this.ordersRepository.findOrders(params);
  }

  async getOrderById(id: string) {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return order;
  }

  async createOrder(dto: CreateOrderDto) {
    // Verify customer exists
    const customer = await this.prisma.customer.findUnique({
      where: { id: dto.customerId }
    });
    if (!customer) {
      throw new BadRequestException(`Customer with ID "${dto.customerId}" not found`);
    }

    // Verify products & compute prices
    const productIds = dto.items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    let calculatedTotal = 0;
    const resolvedItems = dto.items.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new BadRequestException(`Product with ID "${item.productId}" not found`);
      }
      const itemPrice = item.price !== undefined ? item.price : Number(product.price);
      calculatedTotal += itemPrice * item.quantity;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: itemPrice
      };
    });

    const orderNumber = await this.ordersRepository.generateOrderNumber();

    return this.ordersRepository.createOrder({
      ...dto,
      items: resolvedItems,
      orderNumber,
      totalAmount: calculatedTotal
    });
  }

  async updateOrder(id: string, dto: UpdateOrderDto) {
    await this.getOrderById(id);
    return this.ordersRepository.updateOrder(id, dto);
  }

  async updateStatus(id: string, status: OrderStatus) {
    await this.getOrderById(id);
    return this.ordersRepository.updateStatus(id, status);
  }

  async deleteOrder(id: string) {
    await this.getOrderById(id);
    await this.ordersRepository.softDeleteOrder(id);
    return {
      success: true,
      message: `Order "${id}" soft-deleted successfully`
    };
  }

  async bulkActions(dto: { ids: string[]; action: 'delete' | 'confirm' | 'complete' | 'cancel' }) {
    if (!dto.ids || dto.ids.length === 0) {
      throw new BadRequestException('No order IDs provided for bulk action');
    }

    switch (dto.action) {
      case 'delete':
        await this.ordersRepository.softDeleteBulk(dto.ids);
        return { success: true, message: `Soft-deleted ${dto.ids.length} orders` };
      case 'confirm':
        await this.ordersRepository.updateBulkStatus(dto.ids, OrderStatus.CONFIRMED);
        return { success: true, message: `Updated ${dto.ids.length} orders to CONFIRMED` };
      case 'complete':
        await this.ordersRepository.updateBulkStatus(dto.ids, OrderStatus.COMPLETED);
        return { success: true, message: `Updated ${dto.ids.length} orders to COMPLETED` };
      case 'cancel':
        await this.ordersRepository.updateBulkStatus(dto.ids, OrderStatus.CANCELLED);
        return { success: true, message: `Updated ${dto.ids.length} orders to CANCELLED` };
      default:
        throw new BadRequestException(`Unknown bulk action "${dto.action}"`);
    }
  }

  async exportOrdersCsv(dto?: { ids?: string[]; status?: OrderStatus }) {
    const where: any = { deletedAt: null };
    if (dto?.ids && dto.ids.length > 0) where.id = { in: dto.ids };
    if (dto?.status) where.status = dto.status;

    const orders = await this.prisma.order.findMany({
      where,
      include: { customer: true, items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });

    const headers = ['Order Number', 'Customer Name', 'Phone', 'Email', 'Total Amount', 'Status', 'Item Count', 'Created At'];
    const rows = orders.map((o) => [
      `"${o.orderNumber}"`,
      `"${o.customer?.name || ''}"`,
      `"${o.customer?.phone || ''}"`,
      `"${o.customer?.email || ''}"`,
      `"${o.totalAmount}"`,
      `"${o.status}"`,
      `"${o.items.length}"`,
      `"${new Date(o.createdAt).toISOString()}"`
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }
}
