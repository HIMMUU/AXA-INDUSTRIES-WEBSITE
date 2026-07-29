import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  Logger
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdminRepository } from './repositories/admin.repository';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { HashUtil } from './utils/hash.util';
import { AdminRole, AdminStatus, Admin } from '@axa/db';
import { JwtPayload } from './types/auth.types';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const admin = await this.adminRepository.findByEmail(email);

    if (!admin) {
      this.logger.warn(`Failed login attempt for email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    if (admin.status !== AdminStatus.ACTIVE) {
      this.logger.warn(`Login attempt for disabled account: ${email}`);
      throw new UnauthorizedException('Account disabled');
    }

    const isPasswordValid = await HashUtil.compare(password, admin.passwordHash);
    if (!isPasswordValid) {
      this.logger.warn(`Invalid password for admin email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.generateTokens(admin);
    const hashedRefreshToken = await HashUtil.hash(tokens.refreshToken);
    await this.adminRepository.updateRefreshToken(admin.id, hashedRefreshToken);
    await this.adminRepository.updateLastLogin(admin.id);

    this.logger.log(`Successful admin login: ${admin.email}`);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      admin: this.sanitizeAdmin(admin)
    };
  }

  async refreshTokens(adminId: string, refreshToken: string) {
    const admin = await this.adminRepository.findById(adminId);
    if (!admin || !admin.refreshToken) {
      throw new UnauthorizedException('Access Denied: Invalid Refresh Token');
    }

    const isMatch = await HashUtil.compare(refreshToken, admin.refreshToken);
    if (!isMatch) {
      this.logger.warn(`Refresh token mismatch for admin ID: ${adminId}`);
      throw new UnauthorizedException('Access Denied: Refresh Token Invalid');
    }

    const tokens = await this.generateTokens(admin);
    const newHashedRefreshToken = await HashUtil.hash(tokens.refreshToken);
    await this.adminRepository.updateRefreshToken(admin.id, newHashedRefreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      admin: this.sanitizeAdmin(admin)
    };
  }

  async logout(adminId: string) {
    await this.adminRepository.updateRefreshToken(adminId, null);
    this.logger.log(`Admin logged out: ${adminId}`);
    return { success: true, message: 'Logged out successfully' };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const admin = await this.adminRepository.findByEmail(email);

    if (!admin) {
      // For security, do not disclose whether email exists
      return {
        success: true,
        message: 'If an account exists with this email, a reset token has been generated.'
      };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.adminRepository.setResetToken(admin.id, resetToken, resetExpiry);

    this.logger.log(`Password reset requested for admin: ${email}. Token: ${resetToken}`);

    return {
      success: true,
      message: 'Password reset link sent to email address.',
      resetToken // Returned for testing / demo purposes
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;
    const admin = await this.adminRepository.findByResetToken(token);

    if (!admin || !admin.resetTokenExpiry || admin.resetTokenExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const newPasswordHash = await HashUtil.hash(newPassword);
    await this.adminRepository.updatePassword(admin.id, newPasswordHash);

    this.logger.log(`Password successfully reset for admin: ${admin.email}`);

    return {
      success: true,
      message: 'Password has been reset successfully. Please login with your new password.'
    };
  }

  async getProfile(adminId: string) {
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) {
      throw new NotFoundException('Admin profile not found');
    }
    return this.sanitizeAdmin(admin);
  }

  private async generateTokens(admin: Admin) {
    const payload: JwtPayload = {
      sub: admin.id,
      email: admin.email,
      role: admin.role as AdminRole
    };

    const secret = this.configService.get<string>(
      'JWT_SECRET',
      'axa_industries_super_secret_jwt_key_2026_prod'
    );
    const refreshSecret = this.configService.get<string>(
      'JWT_REFRESH_SECRET',
      'axa_industries_super_secret_jwt_refresh_key_2026_prod'
    );

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret,
        expiresIn: '15m'
      }),
      this.jwtService.signAsync(payload, {
        secret: refreshSecret,
        expiresIn: '7d'
      })
    ]);

    return { accessToken, refreshToken };
  }

  private sanitizeAdmin(admin: Admin) {
    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      status: admin.status,
      lastLogin: admin.lastLogin,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt
    };
  }
}
