import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminRepository } from './repositories/admin.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    ConfigModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AdminRepository,
    JwtStrategy,
    JwtRefreshStrategy
  ],
  exports: [AuthService, AdminRepository]
})
export class AuthModule {}
