import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0C] p-4 bg-grid-pattern">
      <div className="relative z-10 w-full max-w-md text-center">
        <div className="glass-panel rounded-3xl p-8 shadow-2xl shadow-black/80 space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-neutral-400 border border-white/10">
            <FileQuestion className="h-7 w-7" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">404 - Page Not Found</h1>
          <p className="text-xs text-neutral-400">
            The admin page you requested does not exist or has been moved.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
