import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Logger
} from '@nestjs/common';
import { ProductsRepository } from './repositories/products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { BulkActionDto, BulkActionType } from './dto/bulk-action.dto';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { slugify } from '@axa/utils';
import { ProductStatus } from '@axa/db';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async getProducts(queryDto: ProductQueryDto) {
    const result = await this.productsRepository.findProducts(queryDto);
    return {
      items: result.items.map((p) => this.formatProductResponse(p)),
      meta: result.meta
    };
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID '${id}' not found`);
    }
    return this.formatProductResponse(product);
  }

  async createProduct(dto: CreateProductDto) {
    const baseSlug = dto.slug ? slugify(dto.slug) : slugify(dto.name);
    const slug = await this.generateUniqueSlug(baseSlug);

    const product = await this.productsRepository.createProduct({
      ...dto,
      slug
    });

    this.logger.log(`Created product: ${product.name} (${product.id})`);
    return this.formatProductResponse(product);
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const existing = await this.productsRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Product with ID '${id}' not found`);
    }

    let slug = existing.slug;
    if (dto.slug && dto.slug !== existing.slug) {
      slug = await this.generateUniqueSlug(slugify(dto.slug), id);
    } else if (dto.name && dto.name !== existing.name && !dto.slug) {
      slug = await this.generateUniqueSlug(slugify(dto.name), id);
    }

    const updated = await this.productsRepository.updateProduct(id, {
      ...dto,
      slug
    });

    this.logger.log(`Updated product: ${updated.name} (${updated.id})`);
    return this.formatProductResponse(updated);
  }

  async deleteProduct(id: string) {
    const existing = await this.productsRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Product with ID '${id}' not found`);
    }

    await this.productsRepository.softDeleteProduct(id);
    this.logger.log(`Soft deleted product: ${id}`);
    return { success: true, message: 'Product deleted successfully' };
  }

  async duplicateProduct(id: string) {
    const source = await this.productsRepository.findById(id);
    if (!source) {
      throw new NotFoundException(`Product with ID '${id}' not found`);
    }

    const baseSlug = `${source.slug}-copy`;
    const newSlug = await this.generateUniqueSlug(baseSlug);

    const copy = await this.productsRepository.createProduct({
      name: `${source.name} (Copy)`,
      slug: newSlug,
      shortDescription: source.shortDescription,
      description: source.description,
      price: Number(source.price),
      status: ProductStatus.DRAFT,
      featured: source.featured,
      metaTitle: source.metaTitle || undefined,
      metaDescription: source.metaDescription || undefined,
      images: source.images.map((img) => ({
        url: img.url,
        publicId: img.publicId,
        order: img.order
      })),
      specifications: source.specifications.map((spec) => ({
        key: spec.key,
        value: spec.value,
        sortOrder: spec.sortOrder
      }))
    });

    this.logger.log(`Duplicated product ${id} -> ${copy.id}`);
    return this.formatProductResponse(copy);
  }

  async uploadProductImage(fileDataUrl: string) {
    return this.cloudinaryService.uploadImage(fileDataUrl);
  }

  async bulkActions(dto: BulkActionDto) {
    const { productIds, action } = dto;

    switch (action) {
      case BulkActionType.DELETE:
        await this.productsRepository.softDeleteBulk(productIds);
        break;
      case BulkActionType.PUBLISH:
        await this.productsRepository.updateBulkStatus(productIds, ProductStatus.PUBLISHED);
        break;
      case BulkActionType.ARCHIVE:
        await this.productsRepository.updateBulkStatus(productIds, ProductStatus.ARCHIVED);
        break;
      case BulkActionType.HIDE:
        await this.productsRepository.updateBulkStatus(productIds, ProductStatus.HIDDEN);
        break;
      case BulkActionType.DUPLICATE:
        for (const id of productIds) {
          await this.duplicateProduct(id);
        }
        break;
      default:
        throw new BadRequestException('Invalid bulk action type');
    }

    return {
      success: true,
      message: `Bulk ${action} operation completed for ${productIds.length} products`
    };
  }

  private async generateUniqueSlug(baseSlug: string, currentProductId?: string): Promise<string> {
    let candidate = baseSlug;
    let count = 1;

    while (true) {
      const existing = await this.productsRepository.findBySlug(candidate);
      if (!existing || (currentProductId && existing.id === currentProductId)) {
        return candidate;
      }
      candidate = `${baseSlug}-${count}`;
      count++;
    }
  }

  private formatProductResponse(product: any) {
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription,
      description: product.description,
      price: Number(product.price),
      status: product.status,
      featured: product.featured,
      metaTitle: product.metaTitle,
      metaDescription: product.metaDescription,
      images: product.images
        ? product.images.map((img: any) => ({
            id: img.id,
            url: img.url,
            publicId: img.publicId,
            order: img.order
          }))
        : [],
      specifications: product.specifications
        ? product.specifications.map((spec: any) => ({
            id: spec.id,
            key: spec.key,
            value: spec.value,
            sortOrder: spec.sortOrder
          }))
        : [],
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };
  }
}
