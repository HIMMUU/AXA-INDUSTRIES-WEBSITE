import { z } from 'zod';

export enum ProductStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  HIDDEN = 'HIDDEN',
  ARCHIVED = 'ARCHIVED'
}

export const PRODUCT_PAGE_TEMPLATES = [
  'STANDARD',
  'MANUAL_VENDING',
  'AUTOMATIC_VENDING',
  'SANITARY_DISPOSAL',
  'SOLID_WASTE_INCINERATOR',
  'FEEDBACK_MACHINE',
  'CLOTH_BAG_VENDING'
] as const;

export type ProductPageTemplate = (typeof PRODUCT_PAGE_TEMPLATES)[number];

export const PRODUCT_PAGE_TEMPLATE_LABELS: Record<ProductPageTemplate, string> = {
  STANDARD: 'Standard product',
  MANUAL_VENDING: 'Manual vending machine',
  AUTOMATIC_VENDING: 'Automatic vending machine',
  SANITARY_DISPOSAL: 'Sanitary napkin disposal machine',
  SOLID_WASTE_INCINERATOR: 'Solid waste incinerator',
  FEEDBACK_MACHINE: 'Feedback machine',
  CLOTH_BAG_VENDING: 'Cloth bag vending machine'
};

export interface ProductImageItem {
  id?: string;
  url: string;
  publicId: string;
  order: number;
}

export interface ProductSpecificationItem {
  id?: string;
  key: string;
  value: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  status: ProductStatus;
  featured: boolean;
  pageTemplate?: ProductPageTemplate;
  metaTitle?: string | null;
  metaDescription?: string | null;
  images: ProductImageItem[];
  specifications: ProductSpecificationItem[];
  createdAt: string;
  updatedAt: string;
}

// Zod Validation Schemas
export const CreateProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(150, 'Product name must be 150 characters or less'),
  slug: z.string().optional(),
  shortDescription: z
    .string()
    .min(1, 'Short description is required')
    .max(300, 'Short description must be 300 characters or less'),
  description: z.string().min(1, 'Product description is required'),
  price: z
    .number({ invalid_type_error: 'Price must be a valid number' })
    .positive('Price must be greater than 0'),
  status: z.nativeEnum(ProductStatus).default(ProductStatus.DRAFT),
  pageTemplate: z.enum(PRODUCT_PAGE_TEMPLATES).default('STANDARD'),
  featured: z.boolean().default(false),
  metaTitle: z.string().max(100, 'Meta title too long').optional().nullable(),
  metaDescription: z.string().max(300, 'Meta description too long').optional().nullable(),
  images: z
    .array(
      z.object({
        id: z.string().optional(),
        url: z.string().url('Invalid image URL'),
        publicId: z.string().min(1, 'Public ID required'),
        order: z.number().default(0)
      })
    )
    .max(10, 'Maximum 10 images allowed')
    .default([]),
  specifications: z
    .array(
      z.object({
        id: z.string().optional(),
        key: z.string().min(1, 'Specification key required'),
        value: z.string().min(1, 'Specification value required'),
        sortOrder: z.number().default(0)
      })
    )
    .default([])
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = CreateProductSchema.partial();
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;

export const BulkProductActionSchema = z.object({
  productIds: z.array(z.string().uuid('Invalid Product ID')).min(1, 'At least one product ID required'),
  action: z.enum(['DELETE', 'PUBLISH', 'ARCHIVE', 'HIDE', 'DUPLICATE'])
});

export type BulkProductActionInput = z.infer<typeof BulkProductActionSchema>;
