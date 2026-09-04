'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginInput } from '@axa/types';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/use-auth-store';
import { Eye, EyeOff, Lock, Mail, ShieldAlert, Loader2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const setAdmin = useAuthStore((state) => state.setAdmin);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const res = await apiClient('/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      if (res.success && res.admin) {
        if (res.accessToken) {
          localStorage.setItem('axa_access_token', res.accessToken);
        }
        if (res.refreshToken) {
          localStorage.setItem('axa_refresh_token', res.refreshToken);
        }
        setAdmin(res.admin);
        router.push('/dashboard');
      } else {
        setServerError(res.message || 'Login failed. Please verify credentials.');
      }
    } catch (err: any) {
      setServerError(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0C] p-4 bg-grid-pattern">
      {/* Background Radial Orbs */}
      <div className="glow-orb top-1/4 left-1/3 h-96 w-96 bg-blue-600/20" />
      <div className="glow-orb bottom-1/4 right-1/3 h-96 w-96 bg-purple-600/15" />

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Header */}
        <div className="mb-8 text-center">
          <Image
            src="/images/axa-industries-logo.png"
            alt="AXA Industries Logo"
            width={200}
            height={64}
            className="h-16 w-auto mx-auto object-contain mb-3 drop-shadow-lg"
          />
          <h1 className="text-2xl font-semibold tracking-tight text-white">AXA Industries</h1>
          <p className="mt-1.5 text-xs text-neutral-400">Admin Authentication & Management Portal</p>
        </div>

        {/* Glassmorphic Form Card */}
        <div className="glass-panel rounded-3xl p-8 shadow-2xl shadow-black/80">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {serverError && (
              <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs font-medium text-red-400">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-medium text-neutral-300">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@axaindustries.com"
                  {...register('email')}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3.5 text-sm text-white placeholder-neutral-500 transition focus:border-white/30 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20"
                />
              </div>
              {errors.email && (
                <p className="text-[11px] font-medium text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-medium text-neutral-300">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-neutral-400 hover:text-white transition"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  {...register('password')}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder-neutral-500 transition focus:border-white/30 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-500 hover:text-neutral-300 transition"
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] font-medium text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                {...register('rememberMe')}
                className="h-4 w-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-0 focus:ring-offset-0"
              />
              <label htmlFor="rememberMe" className="text-xs font-medium text-neutral-400 select-none">
                Remember this session
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200 active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-neutral-950" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-neutral-600">
          © 2026 AXA Industries. All rights reserved. Secure JWT Authentication.
        </p>
      </div>
    </main>
  );
}
