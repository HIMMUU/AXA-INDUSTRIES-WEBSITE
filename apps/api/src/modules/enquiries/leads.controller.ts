import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
  Req
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, isUUID } from 'class-validator';
import { Public } from '../auth/decorators/public.decorator';
import { CreateInstitutionalLeadDto } from './dto/create-institutional-lead.dto';
import { LeadsService } from './leads.service';

@ApiTags('Leads')
@Public()
@Controller('v1/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOperation({ summary: 'Create an institutional sanitary vending machine lead' })
  @ApiResponse({ status: 201, description: 'Lead accepted or safely discarded as spam' })
  @ApiResponse({ status: 400, description: 'Invalid enquiry fields or idempotency key' })
  @ApiResponse({ status: 429, description: 'Submission rate limit exceeded' })
  async createLead(
    @Headers('idempotency-key') idempotencyKey: string | undefined,
    @Body() body: unknown,
    @Req() request: Request
  ) {
    if (this.leadsService.isSpamSubmission(body)) {
      return this.leadsService.discardSpamSubmission();
    }
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      throw new BadRequestException('The enquiry body must be a JSON object.');
    }

    if (!idempotencyKey || !isUUID(idempotencyKey)) {
      throw new BadRequestException({
        message: 'A UUID Idempotency-Key header is required.',
        field: 'Idempotency-Key'
      });
    }

    const dto = plainToInstance(CreateInstitutionalLeadDto, body);
    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true
    });

    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Please check the enquiry form fields.',
        errors: errors.map((error) => ({
          field: error.property,
          constraints: Object.values(error.constraints || {})
        }))
      });
    }

    return this.leadsService.createLead(
      dto,
      idempotencyKey,
      request.headers['user-agent']
    );
  }
}
