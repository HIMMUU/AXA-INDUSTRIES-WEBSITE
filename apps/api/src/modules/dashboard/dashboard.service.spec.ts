import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { DashboardRepository } from './repositories/dashboard.repository';

describe('DashboardService', () => {
  let service: DashboardService;
  let repository: Partial<DashboardRepository>;

  beforeEach(async () => {
    repository = {
      getOrdersCountBetween: jest.fn().mockResolvedValue(5),
      getRevenueBetween: jest.fn().mockResolvedValue(1250.5),
      getTotalCustomersCount: jest.fn().mockResolvedValue(42),
      getCustomersCountBetween: jest.fn().mockResolvedValue(2),
      getTotalProductsCount: jest.fn().mockResolvedValue(18),
      getPendingOrdersCount: jest.fn().mockResolvedValue(3),
      getRecentOrders: jest.fn().mockResolvedValue([]),
      getRecentCustomers: jest.fn().mockResolvedValue([]),
      get7DayOrders: jest.fn().mockResolvedValue([]),
      searchProducts: jest.fn().mockResolvedValue([]),
      searchOrders: jest.fn().mockResolvedValue([]),
      searchCustomers: jest.fn().mockResolvedValue([])
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: DashboardRepository, useValue: repository }
      ]
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate summary metrics correctly', async () => {
    const summary = await service.getSummary();
    expect(summary.todaysOrders).toBe(5);
    expect(summary.todaysRevenue).toBe(1250.5);
    expect(summary.totalCustomers).toBe(42);
    expect(summary.totalProducts).toBe(18);
    expect(summary.pendingOrdersCount).toBe(3);
  });

  it('should format 7 day revenue points', async () => {
    const points = await service.getRevenue7Days();
    expect(points.length).toBe(7);
    expect(points[0]).toHaveProperty('date');
    expect(points[0]).toHaveProperty('revenue');
    expect(points[0]).toHaveProperty('orders');
  });
});
