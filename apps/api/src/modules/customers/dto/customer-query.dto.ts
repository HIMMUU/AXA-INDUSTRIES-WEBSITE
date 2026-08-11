import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomerStatus } from '@axa/db';

export class CustomerQueryDto {
  @ApiProperty({ required: false, default: 1 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ required: false, default: 10 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({ required: false, description: 'Search name, company, phone, email' })
  @IsString()
  @IsOptional()
  q?: string;

  @ApiProperty({ enum: CustomerStatus, required: false })
  @IsEnum(CustomerStatus)
  @IsOptional()
  status?: CustomerStatus;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ required: false, default: 'newest' })
  @IsString()
  @IsOptional()
  sortBy?: 'newest' | 'oldest' | 'mostOrders' | 'highestSpending' = 'newest';
}
