export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface OrderItemSummary {
  id: string;
  orderId: string;
  productId: string;
  product?: {
    id: string;
    name: string;
    slug: string;
    price: number;
    images?: Array<{ url: string }>;
  } | null;
  quantity: number;
  price: number;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer?: {
    id: string;
    name: string;
    phone: string;
    email: string;
    company?: string | null;
    address?: string | null;
  } | null;
  totalAmount: number;
  status: OrderStatus;
  notes?: string | null;
  items?: OrderItemSummary[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
  price?: number;
}

export interface CreateOrderInput {
  customerId: string;
  items: CreateOrderItemInput[];
  notes?: string;
  status?: OrderStatus;
}

export interface UpdateOrderInput {
  status?: OrderStatus;
  notes?: string;
}
