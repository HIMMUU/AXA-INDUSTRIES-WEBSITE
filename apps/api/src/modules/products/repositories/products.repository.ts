import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { Prisma, ProductStatus } from '@axa/db';
import { ProductQueryDto } from '../dto/product-query.dto';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProducts(queryDto: ProductQueryDto) {
    const {
      page = 1,
      limit = 10,
      q,
      status,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = queryDto;

    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      deletedAt: null
    };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { slug: { contains: q, mode: 'insensitive' } },
        { shortDescription: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } }
      ];
    }

    if (status) {
      where.status = status;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput = {
      [sortBy]: sortOrder
    };

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          images: {
            orderBy: { order: 'asc' }
          },
          specifications: {
            orderBy: { sortOrder: 'asc' }
          }
        }
      }),
      this.prisma.product.count({ where })
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
    return this.prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: {
        images: { orderBy: { order: 'asc' } },
        specifications: { orderBy: { sortOrder: 'asc' } }
      }
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.product.findFirst({
      where: { slug, deletedAt: null },
      include: {
        images: { orderBy: { order: 'asc' } },
        specifications: { orderBy: { sortOrder: 'asc' } }
      }
    });
  }

  async createProduct(data: {
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    price: number;
    status?: ProductStatus;
    featured?: boolean;
    metaTitle?: string;
    metaDescription?: string;
    images?: Array<{ url: string; publicId: string; order?: number }>;
    specifications?: Array<{ key: string; value: string; sortOrder?: number }>;
  }) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        shortDescription: data.shortDescription,
        description: data.description,
        price: data.price,
        status: data.status || ProductStatus.DRAFT,
        featured: data.featured || false,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        images: data.images?.length
          ? {
              create: data.images.map((img, idx) => ({
                url: img.url,
                publicId: img.publicId,
                order: img.order ?? idx
              }))
            }
          : undefined,
        specifications: data.specifications?.length
          ? {
              create: data.specifications.map((spec, idx) => ({
                key: spec.key,
                value: spec.value,
                sortOrder: spec.sortOrder ?? idx
              }))
            }
          : undefined
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        specifications: { orderBy: { sortOrder: 'asc' } }
      }
    });
  }

  async updateProduct(
    id: string,
    data: {
      name?: string;
      slug?: string;
      shortDescription?: string;
      description?: string;
      price?: number;
      status?: ProductStatus;
      featured?: boolean;
      metaTitle?: string;
      metaDescription?: string;
      images?: Array<{ url: string; publicId: string; order?: number }>;
      specifications?: Array<{ key: string; value: string; sortOrder?: number }>;
    }
  ) {
    return this.prisma.$transaction(async (tx) => {
      if (data.images !== undefined) {
        await tx.productImage.deleteMany({ where: { productId: id } });
      }
      if (data.specifications !== undefined) {
        await tx.productSpecification.deleteMany({ where: { productId: id } });
      }

      return tx.product.update({
        where: { id },
        data: {
          ...(data.name && { name: data.name }),
          ...(data.slug && { slug: data.slug }),
          ...(data.shortDescription && { shortDescription: data.shortDescription }),
          ...(data.description && { description: data.description }),
          ...(data.price !== undefined && { price: data.price }),
          ...(data.status && { status: data.status }),
          ...(data.featured !== undefined && { featured: data.featured }),
          ...(data.metaTitle !== undefined && { metaTitle: data.metaTitle }),
          ...(data.metaDescription !== undefined && { metaDescription: data.metaDescription }),
          ...(data.images !== undefined && {
            images: {
              create: data.images.map((img, idx) => ({
                url: img.url,
                publicId: img.publicId,
                order: img.order ?? idx
              }))
            }
          }),
          ...(data.specifications !== undefined && {
            specifications: {
              create: data.specifications.map((spec, idx) => ({
                key: spec.key,
                value: spec.value,
                sortOrder: spec.sortOrder ?? idx
              }))
            }
          })
        },
        include: {
          images: { orderBy: { order: 'asc' } },
          specifications: { orderBy: { sortOrder: 'asc' } }
        }
      });
    });
  }

  async softDeleteProduct(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async updateBulkStatus(ids: string[], status: ProductStatus) {
    return this.prisma.product.updateMany({
      where: { id: { in: ids }, deletedAt: null },
      data: { status }
    });
  }

  async softDeleteBulk(ids: string[]) {
    return this.prisma.product.updateMany({
      where: { id: { in: ids }, deletedAt: null },
      data: { deletedAt: new Date() }
    });
  }
}
