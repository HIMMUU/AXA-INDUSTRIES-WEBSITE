import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { OrderStatus } from '@axa/db';

export class UpdateOrderDto {
  @ApiPropertyOptional({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiPropertyOptional({ example: 'Updated order notes' })
  @IsString()
  @IsOptional()
  notes?: string;
}
