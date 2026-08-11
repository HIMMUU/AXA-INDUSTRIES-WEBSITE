import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested, IsNumber, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '@axa/db';

export class CreateOrderItemDto {
  @ApiProperty({ example: 'uuid-product-id' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({ example: 499.00 })
  @IsNumber()
  @IsOptional()
  price?: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'uuid-customer-id' })
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiPropertyOptional({ example: 'Urgent delivery required for site installation.' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ enum: OrderStatus, default: OrderStatus.PENDING })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
