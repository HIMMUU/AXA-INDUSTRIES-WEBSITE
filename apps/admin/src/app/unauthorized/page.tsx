import Link from 'next/link';
import { ShieldX, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0C] p-4 bg-grid-pattern">
      <div className="glow-orb top-1/3 left-1/3 h-96 w-96 bg-red-600/15" />

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="glass-panel rounded-3xl p-8 shadow-2xl shadow-black/80 space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
            <ShieldX className="h-7 w-7" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">403 - Access Denied</h1>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Unauthorized attempt. You do not have the administrative privileges required to access this resource.
          </p>
          <div className="pt-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Return to Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
