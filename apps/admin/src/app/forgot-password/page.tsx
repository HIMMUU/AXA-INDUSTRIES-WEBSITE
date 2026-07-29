'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordSchema, ForgotPasswordInput } from '@axa/types';
import { apiClient } from '@/lib/api-client';
import { Mail, ArrowLeft, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resetTokenDemo, setResetTokenDemo] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema)
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    setServerError(null);
    setSuccessMessage(null);

    try {
      const res = await apiClient('/v1/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      if (res.success) {
        setSuccessMessage(res.message || 'Password reset link dispatched.');
        if (res.resetToken) {
          setResetTokenDemo(res.resetToken);
        }
      } else {
        setServerError(res.message || 'Failed to send reset email.');
      }
    } catch (err: any) {
      setServerError(err.message || 'Error requesting password reset.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0C] p-4 bg-grid-pattern">
      <div className="glow-orb top-1/4 left-1/3 h-96 w-96 bg-blue-600/20" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Reset Password</h1>
          <p className="mt-1.5 text-xs text-neutral-400">
            Enter your admin email to receive password reset instructions.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 shadow-2xl shadow-black/80">
          {successMessage ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-sm text-neutral-200">{successMessage}</p>
              {resetTokenDemo && (
                <div className="rounded-xl bg-neutral-900/80 p-3 text-left border border-white/10">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase mb-1">Demo Reset Link Token:</p>
                  <Link
                    href={`/reset-password?token=${resetTokenDemo}`}
                    className="text-xs text-blue-400 underline font-mono break-all hover:text-blue-300"
                  >
                    /reset-password?token={resetTokenDemo}
                  </Link>
                </div>
              )}
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition pt-2"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
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
                <label htmlFor="email" className="text-xs font-medium text-neutral-300">
                  Admin Email Address
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

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200 active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Return to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
