import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsNumber, IsEnum, Min } from 'class-validator';
import { EnquirySource } from '@axa/db';

export class CreateEnquiryDto {
  @ApiProperty({ example: 'Robert Vance' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Apex Energy Ltd' })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiProperty({ example: '+91 9876543210' })
  @IsString()
  @IsNotEmpty()
  phone: string;

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

  @ApiPropertyOptional({ example: 'India' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ example: 'Requesting custom CAD specs and quote for 5 units.' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({ example: 5, default: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({ example: 'uuid-product-id' })
  @IsString()
  @IsOptional()
  productId?: string;

  @ApiPropertyOptional({ enum: EnquirySource, default: EnquirySource.CONTACT_PAGE })
  @IsEnum(EnquirySource)
  @IsOptional()
  source?: EnquirySource;

  @ApiPropertyOptional({ example: 'Phone' })
  @IsString()
  @IsOptional()
  preferredContactMethod?: string;

  @ApiPropertyOptional({ example: 'Morning 10 AM' })
  @IsString()
  @IsOptional()
  preferredContactTime?: string;

  @ApiPropertyOptional({ description: 'Honeypot field for spam detection' })
  @IsString()
  @IsOptional()
  honeypot?: string;
}
