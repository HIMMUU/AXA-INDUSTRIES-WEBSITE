import { AdminRole } from '@axa/db';

export interface JwtPayload {
  sub: string;
  email: string;
  role: AdminRole;
}

export interface JwtRefreshPayload extends JwtPayload {
  refreshToken: string;
}
