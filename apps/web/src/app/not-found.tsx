import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-28">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-500/10 text-blue-400 mx-auto border border-blue-500/20">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white font-mono">404</h1>
          <h2 className="text-lg font-bold text-white">Page Not Found</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            The requested industrial catalogue page or resource does not exist or has been moved.
          </p>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-neutral-200 transition"
            >
              <ArrowLeft className="h-4 w-4" /> Return to Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
