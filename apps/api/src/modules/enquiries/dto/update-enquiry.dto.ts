import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsNumber, IsEnum, Min } from 'class-validator';
import { EnquiryStatus } from '@axa/db';

export class UpdateEnquiryDto {
  @ApiPropertyOptional({ example: 'Robert Vance' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Apex Energy Ltd' })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiPropertyOptional({ example: '+91 9876543210' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'r.vance@apexenergy.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'Mumbai' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ example: 'Maharashtra' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ example: 'Updated message details' })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({ example: 10 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({ enum: EnquiryStatus })
  @IsEnum(EnquiryStatus)
  @IsOptional()
  status?: EnquiryStatus;

  @ApiPropertyOptional({ example: 'Internal admin note' })
  @IsString()
  @IsOptional()
  notes?: string;
}
