import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  MaxLength
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductStatus } from '@axa/db';

export class ProductImageDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ example: 'axa-products/img-12345' })
  @IsString()
  @IsNotEmpty()
  publicId: string;

  @ApiProperty({ example: 0, default: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;
}

export class ProductSpecificationDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ example: 'Material' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: 'Stainless Steel 316L' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({ example: 0, default: 0 })
  @IsNumber()
  @IsOptional()
  sortOrder?: number;
}

export class CreateProductDto {
  @ApiProperty({ example: 'AXA Industrial Valve V1', description: 'Product Title (Max 150)' })
  @IsString()
  @IsNotEmpty({ message: 'Product name is required' })
  @MaxLength(150, { message: 'Product name must be 150 characters or less' })
  name: string;

  @ApiProperty({ example: 'axa-industrial-valve-v1', required: false })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ example: 'High-pressure stainless steel industrial valve.', description: 'Short summary' })
  @IsString()
  @IsNotEmpty({ message: 'Short description is required' })
  @MaxLength(300, { message: 'Short description must be 300 characters or less' })
  shortDescription: string;

  @ApiProperty({ example: 'Engineered for extreme pressure applications in chemical processing plants.' })
  @IsString()
  @IsNotEmpty({ message: 'Product description is required' })
  description: string;

  @ApiProperty({ example: 499.00, description: 'Product Price' })
  @IsNumber({}, { message: 'Price must be a valid number' })
  @IsPositive({ message: 'Price must be greater than 0' })
  price: number;

  @ApiProperty({ enum: ProductStatus, default: ProductStatus.DRAFT })
  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @ApiProperty({ example: false, default: false })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiProperty({ example: 'AXA Industrial Valve V1 - Premium Quality', required: false })
  @IsString()
  @IsOptional()
  metaTitle?: string;

  @ApiProperty({ example: 'Buy AXA Industrial Valve V1 online.', required: false })
  @IsString()
  @IsOptional()
  metaDescription?: string;

  @ApiProperty({ type: [ProductImageDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  @IsOptional()
  images?: ProductImageDto[];

  @ApiProperty({ type: [ProductSpecificationDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductSpecificationDto)
  @IsOptional()
  specifications?: ProductSpecificationDto[];
}
