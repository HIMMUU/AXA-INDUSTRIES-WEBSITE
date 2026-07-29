import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { REFRESH_TOKEN_COOKIE_NAME } from '../constants/auth.constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let token = request?.cookies?.[REFRESH_TOKEN_COOKIE_NAME];
          if (!token && request?.body?.refreshToken) {
            token = request.body.refreshToken;
          }
          return token;
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET', 'axa_industries_super_secret_jwt_refresh_key_2026_prod'),
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: any) {
    let refreshToken = req?.cookies?.[REFRESH_TOKEN_COOKIE_NAME];
    if (!refreshToken && req?.body?.refreshToken) {
      refreshToken = req.body.refreshToken;
    }
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      refreshToken
    };
  }
}
