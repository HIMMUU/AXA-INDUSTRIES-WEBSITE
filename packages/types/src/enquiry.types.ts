export type EnquiryStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'INTERESTED'
  | 'QUOTATION_SENT'
  | 'CONVERTED'
  | 'CLOSED'
  | 'REJECTED'
  | 'SPAM';

export type EnquirySource =
  | 'CONTACT_PAGE'
  | 'PRODUCT_DETAILS'
  | 'HOMEPAGE_CTA'
  | 'FOOTER_CONTACT'
  | 'QUICK_QUOTE'
  | 'FLOATING_WIDGET';

export interface EnquiryNoteItem {
  id: string;
  enquiryId: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryTimelineItem {
  id: string;
  enquiryId: string;
  title: string;
  description?: string | null;
  type: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  referenceNumber: string;
  customerId?: string | null;
  customer?: {
    id: string;
    name: string;
    phone: string;
    email: string;
    company?: string | null;
  } | null;
  productId?: string | null;
  product?: {
    id: string;
    name: string;
    slug: string;
    price: number;
    images?: Array<{ url: string }>;
  } | null;
  name: string;
  company?: string | null;
  phone: string;
  email?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  message: string;
  quantity: number;
  source: EnquirySource;
  status: EnquiryStatus;
  preferredContactMethod?: string | null;
  preferredContactTime?: string | null;
  notes?: string | null;
  notesList?: EnquiryNoteItem[];
  timeline?: EnquiryTimelineItem[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateEnquiryDto {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  city?: string;
  state?: string;
  country?: string;
  message: string;
  quantity?: number;
  productId?: string;
  source?: EnquirySource;
  preferredContactMethod?: string;
  preferredContactTime?: string;
  honeypot?: string;
}

export interface UpdateEnquiryDto {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  city?: string;
  state?: string;
  message?: string;
  quantity?: number;
  status?: EnquiryStatus;
  notes?: string;
}
