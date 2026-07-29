import { Injectable, Logger } from '@nestjs/common';
import { DashboardRepository } from './repositories/dashboard.repository';
import { NotificationItem } from '@axa/types';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async getSummary() {
    const now = new Date();

    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    const yesterdayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const yesterdayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59);

    const [
      todaysOrders,
      yesterdaysOrders,
      todaysRevenue,
      yesterdaysRevenue,
      totalCustomers,
      yesterdayCustomersCount,
      totalProducts,
      pendingOrdersCount
    ] = await Promise.all([
      this.dashboardRepository.getOrdersCountBetween(todayStart, todayEnd),
      this.dashboardRepository.getOrdersCountBetween(yesterdayStart, yesterdayEnd),
      this.dashboardRepository.getRevenueBetween(todayStart, todayEnd),
      this.dashboardRepository.getRevenueBetween(yesterdayStart, yesterdayEnd),
      this.dashboardRepository.getTotalCustomersCount(),
      this.dashboardRepository.getCustomersCountBetween(yesterdayStart, yesterdayEnd),
      this.dashboardRepository.getTotalProductsCount(),
      this.dashboardRepository.getPendingOrdersCount()
    ]);

    const todaysOrdersChange = yesterdaysOrders > 0
      ? Number((((todaysOrders - yesterdaysOrders) / yesterdaysOrders) * 100).toFixed(1))
      : todaysOrders > 0 ? 100 : 0;

    const todaysRevenueChange = yesterdaysRevenue > 0
      ? Number((((todaysRevenue - yesterdaysRevenue) / yesterdaysRevenue) * 100).toFixed(1))
      : todaysRevenue > 0 ? 100 : 0;

    const totalCustomersChange = yesterdayCustomersCount > 0
      ? Number((((totalCustomers - (totalCustomers - yesterdayCustomersCount)) / (totalCustomers - yesterdayCustomersCount)) * 100).toFixed(1))
      : 0;

    return {
      todaysOrders,
      todaysOrdersChange,
      todaysRevenue,
      todaysRevenueChange,
      totalCustomers,
      totalCustomersChange,
      totalProducts,
      pendingOrdersCount
    };
  }

  async getRevenue7Days() {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const orders = await this.dashboardRepository.get7DayOrders(sevenDaysAgo);

    const chartPointsMap = new Map<string, { revenue: number; orders: number }>();

    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(sevenDaysAgo.getDate() + i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      chartPointsMap.set(dateStr, { revenue: 0, orders: 0 });
    }

    orders.forEach((o) => {
      const dateStr = new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (chartPointsMap.has(dateStr)) {
        const curr = chartPointsMap.get(dateStr)!;
        curr.orders += 1;
        if (o.status === 'CONFIRMED' || o.status === 'COMPLETED') {
          curr.revenue += Number(o.totalAmount);
        }
      }
    });

    return Array.from(chartPointsMap.entries()).map(([date, val]) => ({
      date,
      revenue: val.revenue,
      orders: val.orders
    }));
  }

  async getRecentOrders() {
    const orders = await this.dashboardRepository.getRecentOrders(10);
    return orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customer?.name || 'Guest',
      customerPhone: o.customer?.phone || '',
      customerEmail: o.customer?.email || '',
      totalAmount: Number(o.totalAmount),
      status: o.status,
      itemsCount: o._count.items,
      createdAt: o.createdAt.toISOString()
    }));
  }

  async getRecentCustomers() {
    const customers = await this.dashboardRepository.getRecentCustomers(5);
    return customers.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      ordersCount: c._count.orders,
      createdAt: c.createdAt.toISOString()
    }));
  }

  async getNotifications(): Promise<NotificationItem[]> {
    const recentOrders = await this.dashboardRepository.getRecentOrders(5);
    const notifications: NotificationItem[] = recentOrders.map((o) => ({
      id: `notif-order-${o.id}`,
      title: `New Order #${o.orderNumber}`,
      message: `Order placed by ${o.customer?.name || 'Customer'} for $${Number(o.totalAmount).toFixed(2)}`,
      type: 'ORDER',
      createdAt: o.createdAt.toISOString(),
      isRead: false
    }));

    if (notifications.length === 0) {
      notifications.push({
        id: 'notif-system-welcome',
        title: 'System Initialized',
        message: 'AXA Industries platform initialized successfully.',
        type: 'SYSTEM',
        createdAt: new Date().toISOString(),
        isRead: true
      });
    }

    return notifications;
  }

  async globalSearch(query: string) {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const cleanQuery = query.trim();

    const [products, orders, customers] = await Promise.all([
      this.dashboardRepository.searchProducts(cleanQuery),
      this.dashboardRepository.searchOrders(cleanQuery),
      this.dashboardRepository.searchCustomers(cleanQuery)
    ]);

    const results: Array<{
      id: string;
      type: 'product' | 'order' | 'customer';
      title: string;
      subtitle: string;
      url: string;
    }> = [];

    products.forEach((p) => {
      results.push({
        id: p.id,
        type: 'product',
        title: p.name,
        subtitle: `$${Number(p.price).toFixed(2)} | /products/${p.slug}`,
        url: `/products/${p.id}`
      });
    });

    orders.forEach((o) => {
      results.push({
        id: o.id,
        type: 'order',
        title: `Order #${o.orderNumber}`,
        subtitle: `${o.customer?.name || 'Customer'} - $${Number(o.totalAmount).toFixed(2)} (${o.status})`,
        url: `/orders/${o.id}`
      });
    });

    customers.forEach((c) => {
      results.push({
        id: c.id,
        type: 'customer',
        title: c.name,
        subtitle: `${c.email} | ${c.phone}`,
        url: `/customers/${c.id}`
      });
    });

    return results;
  }
}
