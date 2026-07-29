import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh-token-string', description: 'Refresh Token', required: false })
  @IsString()
  @IsOptional()
  refreshToken?: string;
}
