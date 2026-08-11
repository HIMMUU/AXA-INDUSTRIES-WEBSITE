import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCustomerNoteDto {
  @ApiProperty({ example: 'Client requested custom bulk order pricing for Q4.', description: 'Internal admin note content' })
  @IsString()
  @IsNotEmpty({ message: 'Note content is required' })
  content: string;
}
