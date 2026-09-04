import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, AuthenticatedAdmin } from '../types/auth.types';
import { AdminRepository } from '../repositories/admin.repository';
import { AdminStatus } from '@axa/db';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly adminRepository: AdminRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: any) => request?.cookies?.axa_access_token
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'axa_industries_super_secret_jwt_key_2026_prod')
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedAdmin> {
    const admin = await this.adminRepository.findById(payload.sub);
    if (!admin) {
      throw new UnauthorizedException('Admin user not found');
    }
    if (admin.status !== AdminStatus.ACTIVE) {
      throw new UnauthorizedException('Admin account disabled');
    }
    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      status: admin.status
    };
  }
}
