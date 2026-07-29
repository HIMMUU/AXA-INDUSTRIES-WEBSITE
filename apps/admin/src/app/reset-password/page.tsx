'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema, ResetPasswordInput } from '@axa/types';
import { apiClient } from '@/lib/api-client';
import { Lock, Eye, EyeOff, CheckCircle2, ShieldAlert, Loader2 } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get('token') || '';

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token: tokenParam,
      newPassword: ''
    }
  });

  useEffect(() => {
    if (tokenParam) {
      setValue('token', tokenParam);
    }
  }, [tokenParam, setValue]);

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const res = await apiClient('/v1/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      if (res.success) {
        setIsSuccess(true);
      } else {
        setServerError(res.message || 'Password reset failed.');
      }
    } catch (err: any) {
      setServerError(err.message || 'Invalid or expired token.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-8 shadow-2xl shadow-black/80">
      {isSuccess ? (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-medium text-white">Password Updated!</h2>
          <p className="text-xs text-neutral-400">
            Your admin credentials have been successfully updated. You can now log in.
          </p>
          <Link
            href="/login"
            className="inline-flex w-full items-center justify-center rounded-xl bg-white py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
          >
            Proceed to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {serverError && (
            <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs font-medium text-red-400">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="token" className="text-xs font-medium text-neutral-300">
              Reset Token
            </label>
            <input
              id="token"
              type="text"
              readOnly={!!tokenParam}
              {...register('token')}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-3.5 text-xs font-mono text-neutral-300 focus:outline-none"
            />
            {errors.token && (
              <p className="text-[11px] font-medium text-red-400">{errors.token.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="newPassword" className="text-xs font-medium text-neutral-300">
              New Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="New strong password"
                {...register('newPassword')}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder-neutral-500 transition focus:border-white/30 focus:bg-white/10 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-500 hover:text-neutral-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-[11px] font-medium text-red-400">{errors.newPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200 active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Set New Password'}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0C] p-4 bg-grid-pattern">
      <div className="glow-orb top-1/4 left-1/3 h-96 w-96 bg-purple-600/20" />
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Create New Password</h1>
          <p className="mt-1.5 text-xs text-neutral-400">Must contain uppercase, lowercase, and number.</p>
        </div>
        <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
