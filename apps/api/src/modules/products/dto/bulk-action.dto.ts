import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsUUID } from 'class-validator';

export enum BulkActionType {
  DELETE = 'DELETE',
  PUBLISH = 'PUBLISH',
  ARCHIVE = 'ARCHIVE',
  HIDE = 'HIDE',
  DUPLICATE = 'DUPLICATE'
}

export class BulkActionDto {
  @ApiProperty({ example: ['uuid-1', 'uuid-2'], description: 'Product IDs' })
  @IsArray()
  @IsUUID('all', { each: true })
  productIds: string[];

  @ApiProperty({ enum: BulkActionType })
  @IsEnum(BulkActionType)
  action: BulkActionType;
}
