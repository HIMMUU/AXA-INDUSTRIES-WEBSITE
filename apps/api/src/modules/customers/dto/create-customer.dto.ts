import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsEnum, MaxLength } from 'class-validator';
import { CustomerStatus } from '@axa/db';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Alex Mercer', description: 'Customer Full Name' })
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  @MaxLength(100, { message: 'Full name must be 100 characters or less' })
  name: string;

  @ApiProperty({ example: 'AXA Tech Corp', required: false })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiProperty({ example: '+91 9876543210', description: 'Unique Phone Number' })
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @ApiProperty({ example: 'alex.mercer@axatech.com' })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email address is required' })
  email: string;

  @ApiProperty({ example: '27AAAAA0000A1Z5', required: false })
  @IsString()
  @IsOptional()
  gst?: string;

  @ApiProperty({ example: '124 Industrial Park, Sector 4', required: false })
  @IsString()
  @IsOptional()
  addressLine1?: string;

  @ApiProperty({ example: 'Near Main Plaza', required: false })
  @IsString()
  @IsOptional()
  addressLine2?: string;

  @ApiProperty({ example: 'Mumbai', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 'Maharashtra', required: false })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ example: 'India', default: 'India', required: false })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ example: '400001', required: false })
  @IsString()
  @IsOptional()
  postalCode?: string;

  @ApiProperty({ example: 'Key Enterprise Client', required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ enum: CustomerStatus, default: CustomerStatus.ACTIVE })
  @IsEnum(CustomerStatus)
  @IsOptional()
  status?: CustomerStatus;
}
