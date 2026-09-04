import { AdminRole, AdminStatus } from '@axa/db';

export interface JwtPayload {
  sub: string;
  email: string;
  role: AdminRole;
}

export interface JwtRefreshPayload extends JwtPayload {
  refreshToken: string;
}

export interface AuthenticatedAdmin {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  status: AdminStatus;
}
