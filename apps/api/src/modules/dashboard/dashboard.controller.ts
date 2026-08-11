import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Dashboard')
@Public()
@Controller('v1/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get Dashboard Aggregated Summary Metrics' })
  async getSummary() {
    const summary = await this.dashboardService.getSummary();
    return {
      success: true,
      message: 'Dashboard summary retrieved successfully',
      data: summary
    };
  }

  @Get('revenue')
  @ApiOperation({ summary: 'Get 7-Day Revenue Analytics Points' })
  async getRevenue() {
    const revenue = await this.dashboardService.getRevenue7Days();
    return {
      success: true,
      message: 'Revenue chart data retrieved successfully',
      data: revenue
    };
  }

  @Get('recent-orders')
  @ApiOperation({ summary: 'Get Latest 10 Orders' })
  async getRecentOrders() {
    const orders = await this.dashboardService.getRecentOrders();
    return {
      success: true,
      message: 'Recent orders retrieved successfully',
      data: orders
    };
  }

  @Get('recent-customers')
  @ApiOperation({ summary: 'Get Latest Customers' })
  async getRecentCustomers() {
    const customers = await this.dashboardService.getRecentCustomers();
    return {
      success: true,
      message: 'Recent customers retrieved successfully',
      data: customers
    };
  }

  @Get('notifications')
  @ApiOperation({ summary: 'Get Admin Notifications' })
  async getNotifications() {
    const notifications = await this.dashboardService.getNotifications();
    return {
      success: true,
      message: 'Notifications retrieved successfully',
      data: notifications
    };
  }

  @Get('search')
  @ApiOperation({ summary: 'Global Search across Products, Orders, and Customers' })
  @ApiQuery({ name: 'q', required: true, description: 'Search term' })
  async globalSearch(@Query('q') query: string) {
    const results = await this.dashboardService.globalSearch(query);
    return {
      success: true,
      message: 'Search completed successfully',
      data: results
    };
  }
}
