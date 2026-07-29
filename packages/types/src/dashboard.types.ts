export interface DashboardSummaryData {
  todaysOrders: number;
  todaysOrdersChange: number;
  todaysRevenue: number;
  todaysRevenueChange: number;
  totalCustomers: number;
  totalCustomersChange: number;
  totalProducts: number;
  pendingOrdersCount: number;
}

export interface RevenueChartPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface RecentOrderSummary {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  itemsCount: number;
  createdAt: string;
}

export interface RecentCustomerSummary {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'ORDER' | 'SYSTEM' | 'CUSTOMER';
  createdAt: string;
  isRead: boolean;
}

export interface GlobalSearchResult {
  id: string;
  type: 'product' | 'order' | 'customer';
  title: string;
  subtitle: string;
  url: string;
}
