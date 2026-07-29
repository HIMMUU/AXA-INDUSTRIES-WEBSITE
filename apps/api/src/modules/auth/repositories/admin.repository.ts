import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { Admin, Prisma, AdminRole, AdminStatus } from '@axa/db';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Admin | null> {
    return this.prisma.admin.findFirst({
      where: {
        email,
        deletedAt: null
      }
    });
  }

  async findById(id: string): Promise<Admin | null> {
    return this.prisma.admin.findFirst({
      where: {
        id,
        deletedAt: null
      }
    });
  }

  async findByResetToken(resetToken: string): Promise<Admin | null> {
    return this.prisma.admin.findFirst({
      where: {
        resetToken,
        deletedAt: null
      }
    });
  }

  async updateRefreshToken(id: string, refreshToken: string | null): Promise<Admin> {
    return this.prisma.admin.update({
      where: { id },
      data: { refreshToken }
    });
  }

  async updateLastLogin(id: string): Promise<Admin> {
    return this.prisma.admin.update({
      where: { id },
      data: { lastLogin: new Date() }
    });
  }

  async setResetToken(id: string, resetToken: string, expiry: Date): Promise<Admin> {
    return this.prisma.admin.update({
      where: { id },
      data: {
        resetToken,
        resetTokenExpiry: expiry
      }
    });
  }

  async updatePassword(id: string, passwordHash: string): Promise<Admin> {
    return this.prisma.admin.update({
      where: { id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpiry: null,
        refreshToken: null
      }
    });
  }

  async createAdmin(data: {
    email: string;
    passwordHash: string;
    name: string;
    role?: AdminRole;
  }): Promise<Admin> {
    return this.prisma.admin.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
        name: data.name,
        role: data.role || AdminRole.ADMIN,
        status: AdminStatus.ACTIVE
      }
    });
  }
}
