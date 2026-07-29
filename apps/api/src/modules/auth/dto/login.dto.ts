import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsBoolean, IsOptional } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@axaindustries.com', description: 'Admin Email Address' })
  @IsEmail({}, { message: 'Must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ example: 'AdminPass123!', description: 'Admin Account Password' })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(64, { message: 'Password must be under 64 characters' })
  password: string;

  @ApiProperty({ example: false, required: false, description: 'Remember Me toggle' })
  @IsBoolean()
  @IsOptional()
  rememberMe?: boolean;
}
