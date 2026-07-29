import { SetMetadata } from '@nestjs/common';
import { AdminRole } from '@axa/db';
import { ROLES_KEY } from '../constants/auth.constants';

export const Roles = (...roles: AdminRole[]) => SetMetadata(ROLES_KEY, roles);
