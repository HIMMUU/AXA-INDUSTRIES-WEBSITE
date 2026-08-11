import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  Res
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Public } from '../auth/decorators/public.decorator';
import { OrderStatus } from '@axa/db';

@ApiTags('Orders')
@Public()
@Controller('v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get Paginated Order List' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus })
  async getOrders(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('q') q?: string,
    @Query('status') status?: OrderStatus,
    @Query('customerId') customerId?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc'
  ) {
    const result = await this.ordersService.getOrders({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      q,
      status,
      customerId,
      sortBy,
      sortOrder
    });

    return {
      success: true,
      message: 'Orders retrieved successfully',
      data: result.items,
      meta: result.meta
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Order Details by ID' })
  async getOrderById(@Param('id') id: string) {
    const order = await this.ordersService.getOrderById(id);
    return {
      success: true,
      message: 'Order retrieved successfully',
      data: order
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create New Order' })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.createOrder(createOrderDto);
    return {
      success: true,
      message: 'Order created successfully',
      data: order
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Existing Order' })
  async updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersService.updateOrder(id, updateOrderDto);
    return {
      success: true,
      message: 'Order updated successfully',
      data: order
    };
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update Order Status' })
  async updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    const order = await this.ordersService.updateStatus(id, status);
    return {
      success: true,
      message: `Order status updated to ${status}`,
      data: order
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft Delete Order' })
  async deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }

  @Post('export')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Export Orders to CSV' })
  async exportCsv(@Res() res: Response, @Body() dto?: { ids?: string[]; status?: OrderStatus }) {
    const csvContent = await this.ordersService.exportOrdersCsv(dto);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="axa-orders-export.csv"');
    return res.send(csvContent);
  }

  @Post('bulk')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Bulk Actions on Orders' })
  async bulkActions(@Body() dto: { ids: string[]; action: 'delete' | 'confirm' | 'complete' | 'cancel' }) {
    return this.ordersService.bulkActions(dto);
  }
}
