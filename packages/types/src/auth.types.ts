import { z } from 'zod';

export enum AdminRole {
  ADMIN = 'ADMIN'
}

export enum AdminStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED'
}

export interface AdminProfile {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  status: AdminStatus;
  lastLogin?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  admin: AdminProfile;
}

// Validation Schemas
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(255, 'Email is too long'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be under 64 characters'),
  rememberMe: z.boolean().optional().default(false)
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address')
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be under 64 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required')
});

export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;
