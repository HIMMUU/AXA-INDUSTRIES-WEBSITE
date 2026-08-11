import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { CustomersRepository } from './repositories/customers.repository';
import { CustomerStatus } from '@axa/db';

describe('CustomersService', () => {
  let service: CustomersService;
  let repository: Partial<CustomersRepository>;

  beforeEach(async () => {
    repository = {
      findCustomers: jest.fn().mockResolvedValue({
        items: [],
        meta: { page: 1, limit: 10, total: 0, totalPages: 0 }
      }),
      findById: jest.fn().mockResolvedValue(null),
      findByPhone: jest.fn().mockResolvedValue(null),
      findByEmail: jest.fn().mockResolvedValue(null),
      createCustomer: jest.fn().mockImplementation(async (data) => ({
        id: 'cust-uuid-1',
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      updateCustomer: jest.fn().mockImplementation(async (id, data) => ({
        id,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      softDeleteCustomer: jest.fn().mockResolvedValue({ id: 'cust-uuid-1' }),
      addTimelineEvent: jest.fn().mockResolvedValue({ id: 't-1' }),
      addCustomerNote: jest.fn().mockResolvedValue({ id: 'n-1', content: 'test note' }),
      deleteCustomerNote: jest.fn().mockResolvedValue({ id: 'n-1' }),
      updateBulkStatus: jest.fn().mockResolvedValue({ count: 2 }),
      softDeleteBulk: jest.fn().mockResolvedValue({ count: 2 })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        { provide: CustomersRepository, useValue: repository }
      ]
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create customer record', async () => {
    const result = await service.createCustomer({
      name: 'Alex Mercer',
      company: 'AXA Tech Corp',
      phone: '+91 9876543210',
      email: 'alex.mercer@axatech.com',
      status: CustomerStatus.ACTIVE
    });

    expect(result).toHaveProperty('id');
    expect(result.name).toBe('Alex Mercer');
    expect(result.phone).toBe('+91 9876543210');
  });
});
