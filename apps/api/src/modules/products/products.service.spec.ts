import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './repositories/products.repository';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { ProductStatus } from '@axa/db';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Partial<ProductsRepository>;
  let cloudinaryService: Partial<CloudinaryService>;

  beforeEach(async () => {
    repository = {
      findProducts: jest.fn().mockResolvedValue({
        items: [],
        meta: { page: 1, limit: 10, total: 0, totalPages: 0 }
      }),
      findById: jest.fn().mockResolvedValue(null),
      findBySlug: jest.fn().mockResolvedValue(null),
      createProduct: jest.fn().mockImplementation(async (data) => ({
        id: 'uuid-test-1',
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      updateProduct: jest.fn().mockImplementation(async (id, data) => ({
        id,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      softDeleteProduct: jest.fn().mockResolvedValue({ id: 'uuid-test-1' }),
      updateBulkStatus: jest.fn().mockResolvedValue({ count: 2 }),
      softDeleteBulk: jest.fn().mockResolvedValue({ count: 2 })
    };

    cloudinaryService = {
      uploadImage: jest.fn().mockResolvedValue({
        url: 'https://cloudinary.com/test.jpg',
        publicId: 'test-id'
      }),
      deleteImage: jest.fn().mockResolvedValue(true)
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsRepository, useValue: repository },
        { provide: CloudinaryService, useValue: cloudinaryService }
      ]
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create product with auto-generated slug', async () => {
    const result = await service.createProduct({
      name: 'AXA Valve K1',
      shortDescription: 'Short summary',
      description: 'Full details',
      price: 299.99,
      status: ProductStatus.DRAFT
    });

    expect(result).toHaveProperty('id');
    expect(result.slug).toBe('axa-valve-k1');
    expect(result.price).toBe(299.99);
  });
});
