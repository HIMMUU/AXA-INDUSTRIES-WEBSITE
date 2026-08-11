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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerQueryDto } from './dto/customer-query.dto';
import { CreateCustomerNoteDto } from './dto/create-note.dto';
import { BulkCustomerDto } from './dto/bulk-customer.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Customers')
@Public()
@Controller('v1/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'Get Paginated Customer List' })
  async getCustomers(@Query() queryDto: CustomerQueryDto) {
    const result = await this.customersService.getCustomers(queryDto);
    return {
      success: true,
      message: 'Customers retrieved successfully',
      data: result.items,
      meta: result.meta
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Customer Details by ID' })
  async getCustomerById(@Param('id') id: string) {
    const customer = await this.customersService.getCustomerById(id);
    return {
      success: true,
      message: 'Customer retrieved successfully',
      data: customer
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create New Customer Manually' })
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customersService.createCustomer(createCustomerDto);
    return {
      success: true,
      message: 'Customer created successfully',
      data: customer
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Existing Customer' })
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    const customer = await this.customersService.updateCustomer(id, updateCustomerDto);
    return {
      success: true,
      message: 'Customer updated successfully',
      data: customer
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft Delete Customer' })
  async deleteCustomer(@Param('id') id: string) {
    return this.customersService.deleteCustomer(id);
  }

  @Post(':id/notes')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add Administrator Internal Note' })
  async addNote(
    @Param('id') id: string,
    @Body() dto: CreateCustomerNoteDto
  ) {
    const note = await this.customersService.addNote(id, dto);
    return {
      success: true,
      message: 'Note added successfully',
      data: note
    };
  }

  @Delete(':id/notes/:noteId')
  @ApiOperation({ summary: 'Delete Administrator Internal Note' })
  async deleteNote(
    @Param('id') id: string,
    @Param('noteId') noteId: string
  ) {
    return this.customersService.deleteNote(id, noteId);
  }

  @Post('export')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Export Customers to CSV' })
  async exportCsv(@Res() res: Response, @Body() dto?: BulkCustomerDto) {
    const csvContent = await this.customersService.exportCustomersCsv(dto);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="axa-customers-export.csv"');
    return res.send(csvContent);
  }

  @Post('bulk')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Bulk Actions on Customers' })
  async bulkActions(@Body() bulkDto: BulkCustomerDto) {
    return this.customersService.bulkActions(bulkDto);
  }
}
