import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsUUID } from 'class-validator';

export enum BulkCustomerActionType {
  EXPORT = 'EXPORT',
  DELETE = 'DELETE',
  BLOCK = 'BLOCK',
  RESTORE = 'RESTORE'
}

export class BulkCustomerDto {
  @ApiProperty({ example: ['uuid-1', 'uuid-2'], description: 'Customer IDs' })
  @IsArray()
  @IsUUID('all', { each: true })
  customerIds: string[];

  @ApiProperty({ enum: BulkCustomerActionType })
  @IsEnum(BulkCustomerActionType)
  action: BulkCustomerActionType;
}
