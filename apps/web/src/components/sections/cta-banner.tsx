'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Factory, Sparkles } from 'lucide-react';

export function CtaBannerSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-neutral-50 dark:bg-[#070709]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 dark:border-white/10 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30 dark:bg-[#0F1017] p-8 sm:p-14 lg:p-20 shadow-2xl shadow-blue-900/5 backdrop-blur-3xl text-neutral-900 dark:text-white">
          
          {/* Ambient Glow Orbs */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-400/20 dark:bg-blue-600/25 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-300/25 dark:bg-purple-600/20 blur-[120px]" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-cyan-300/20 dark:bg-cyan-500/15 blur-[90px]" />

          {/* Decorative Grid Pattern Overlay */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.10]" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', 
              backgroundSize: '24px 24px' 
            }} 
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50/90 dark:bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 backdrop-blur-xl shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
              <span>ISO 9001:2015 Certified Manufacturing</span>
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] bg-gradient-to-r from-neutral-900 via-neutral-800 to-blue-950 dark:from-white dark:via-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent">
              Ready to Upgrade Your Institutional Hygiene Infrastructure?
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto leading-relaxed font-medium">
              Request bulk institutional quotations, custom branding, or turnkey on-site installation directly from the AXA engineering division.
            </p>

            {/* Value Highlights Pill Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 pb-2 text-xs text-neutral-600 dark:text-neutral-300">
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                <span className="font-semibold text-neutral-900 dark:text-white">2-Hour Quote Turnaround</span>
              </div>
              <span className="hidden sm:inline text-neutral-300 dark:text-neutral-600">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-neutral-900 dark:text-white">CPCB & ISO Certified</span>
              </div>
              <span className="hidden sm:inline text-neutral-300 dark:text-neutral-600">•</span>
              <div className="flex items-center gap-1.5">
                <Factory className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span className="font-semibold text-neutral-900 dark:text-white">Direct Factory Pricing</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/25 transition-all hover:shadow-blue-600/35 active:scale-95"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 dark:border-white/20 bg-white dark:bg-white/10 hover:bg-neutral-100 dark:hover:bg-white/20 text-neutral-800 dark:text-white px-8 py-3.5 text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-95"
              >
                <span>Browse Full Catalogue</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
