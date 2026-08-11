import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Res,
  HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { EnquiriesService } from './enquiries.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { EnquiryStatus, EnquirySource } from '@axa/db';

@ApiTags('Enquiries')
@Public()
@Controller('v1/enquiries')
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Submit public quote / contact enquiry (Public Form)' })
  @ApiResponse({ status: 201, description: 'Enquiry created successfully' })
  async createEnquiry(@Body() dto: CreateEnquiryDto) {
    const data = await this.enquiriesService.createEnquiry(dto);
    return {
      success: true,
      message: 'Enquiry submitted successfully',
      data
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get paginated enquiries list (Admin Only)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'q', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: EnquiryStatus })
  @ApiQuery({ name: 'source', required: false, enum: EnquirySource })
  @ApiQuery({ name: 'productId', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  async getEnquiries(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('q') q?: string,
    @Query('status') status?: EnquiryStatus,
    @Query('source') source?: EnquirySource,
    @Query('productId') productId?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc'
  ) {
    const result = await this.enquiriesService.getEnquiries({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
      q,
      status,
      source,
      productId,
      sortBy,
      sortOrder
    });

    return {
      success: true,
      data: result.items,
      meta: result.meta
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get enquiry details by ID (Admin Only)' })
  async getEnquiryById(@Param('id') id: string) {
    const data = await this.enquiriesService.getEnquiryById(id);
    return {
      success: true,
      data
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update enquiry details (Admin Only)' })
  async updateEnquiry(@Param('id') id: string, @Body() dto: UpdateEnquiryDto) {
    const data = await this.enquiriesService.updateEnquiry(id, dto);
    return {
      success: true,
      message: 'Enquiry updated successfully',
      data
    };
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update enquiry status (Admin Only)' })
  async updateStatus(@Param('id') id: string, @Body('status') status: EnquiryStatus) {
    const data = await this.enquiriesService.updateStatus(id, status);
    return {
      success: true,
      message: 'Enquiry status updated',
      data
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete enquiry (Admin Only)' })
  async deleteEnquiry(@Param('id') id: string) {
    await this.enquiriesService.deleteEnquiry(id);
    return {
      success: true,
      message: 'Enquiry deleted successfully'
    };
  }

  @Post(':id/convert-customer')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Convert lead to official Customer (Admin Only)' })
  async convertToCustomer(@Param('id') id: string) {
    const data = await this.enquiriesService.convertToCustomer(id);
    return {
      success: true,
      message: 'Lead converted to Customer successfully',
      data
    };
  }

  @Post(':id/convert-order')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Convert lead to Pending Order (Admin Only)' })
  async convertToOrder(@Param('id') id: string) {
    const data = await this.enquiriesService.convertToOrder(id);
    return {
      success: true,
      message: 'Lead converted to Pending Order successfully',
      data
    };
  }

  @Post(':id/notes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add internal lead note (Admin Only)' })
  async addNote(@Param('id') id: string, @Body('content') content: string) {
    const data = await this.enquiriesService.addNote(id, content);
    return {
      success: true,
      message: 'Note added successfully',
      data
    };
  }

  @Delete(':id/notes/:noteId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete internal lead note (Admin Only)' })
  async deleteNote(@Param('id') id: string, @Param('noteId') noteId: string) {
    await this.enquiriesService.deleteNote(id, noteId);
    return {
      success: true,
      message: 'Note deleted successfully'
    };
  }

  @Post('export')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Export enquiries as CSV (Admin Only)' })
  async exportCsv(@Body() body: { enquiryIds?: string[]; status?: EnquiryStatus }, @Res() res: Response) {
    const csv = await this.enquiriesService.exportCsv(body);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=axa-enquiries-export.csv');
    return res.status(HttpStatus.OK).send(csv);
  }

  @Post('bulk')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bulk operations on enquiries (Admin Only)' })
  async bulkOperation(@Body() body: { enquiryIds: string[]; action: 'DELETE' | 'MARK_CONTACTED' | 'MARK_CONVERTED'; status?: EnquiryStatus }) {
    const result = await this.enquiriesService.bulkOperation(body);
    return {
      success: true,
      message: 'Bulk operation executed',
      data: result
    };
  }
}
