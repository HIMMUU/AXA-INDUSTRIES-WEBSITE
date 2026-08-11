import { z } from 'zod';

export enum CustomerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED'
}

export enum TimelineType {
  CREATED = 'CREATED',
  ORDER_PLACED = 'ORDER_PLACED',
  UPDATED = 'UPDATED',
  NOTE_ADDED = 'NOTE_ADDED',
  STATUS_CHANGED = 'STATUS_CHANGED'
}

export interface CustomerNoteItem {
  id: string;
  customerId: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerTimelineItem {
  id: string;
  customerId: string;
  title: string;
  description?: string | null;
  type: TimelineType;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  company?: string | null;
  phone: string;
  email: string;
  gst?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  address?: string;
  notes?: string | null;
  status: CustomerStatus;
  ordersCount?: number;
  completedOrdersCount?: number;
  pendingOrdersCount?: number;
  cancelledOrdersCount?: number;
  totalSpending?: number;
  lastOrderDate?: string | null;
  orders?: Array<{
    id: string;
    orderNumber: string;
    totalAmount: number;
    status: string;
    createdAt: string;
  }>;
  notesList?: CustomerNoteItem[];
  timeline?: CustomerTimelineItem[];
  createdAt: string;
  updatedAt: string;
}

// Zod Validation Schemas
export const CreateCustomerSchema = z.object({
  name: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be 100 characters or less'),
  company: z.string().max(150, 'Company name too long').optional().nullable(),
  phone: z
    .string()
    .min(5, 'Phone number is required')
    .max(20, 'Invalid phone number length'),
  email: z
    .string()
    .email('Invalid email address')
    .or(z.literal('')),
  gst: z.string().max(30, 'GST number too long').optional().nullable(),
  addressLine1: z.string().max(250, 'Address line 1 too long').default(''),
  addressLine2: z.string().max(250, 'Address line 2 too long').optional().nullable(),
  city: z.string().max(100, 'City too long').default(''),
  state: z.string().max(100, 'State too long').default(''),
  country: z.string().max(100, 'Country too long').default('India'),
  postalCode: z.string().max(20, 'Postal code too long').default(''),
  notes: z.string().optional().nullable(),
  status: z.nativeEnum(CustomerStatus).default(CustomerStatus.ACTIVE)
});

export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>;

export const UpdateCustomerSchema = CreateCustomerSchema.partial();
export type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>;

export const CreateCustomerNoteSchema = z.object({
  content: z.string().min(1, 'Note content is required')
});

export type CreateCustomerNoteInput = z.infer<typeof CreateCustomerNoteSchema>;

export const BulkCustomerActionSchema = z.object({
  customerIds: z.array(z.string().uuid('Invalid Customer ID')).min(1, 'At least one customer ID required'),
  action: z.enum(['EXPORT', 'DELETE', 'BLOCK', 'RESTORE'])
});

export type BulkCustomerActionInput = z.infer<typeof BulkCustomerActionSchema>;
