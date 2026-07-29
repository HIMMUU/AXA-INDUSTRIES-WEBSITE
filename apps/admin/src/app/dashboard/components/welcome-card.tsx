'use client';

import { useAuthStore } from '@/store/use-auth-store';
import { ShoppingBag, Calendar, Sparkles } from 'lucide-react';
import { formatDate } from '@axa/utils';

interface WelcomeCardProps {
  pendingOrdersCount: number;
}

export function WelcomeCard({ pendingOrdersCount }: WelcomeCardProps) {
  const { admin } = useAuthStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-900/20 via-neutral-900/40 to-purple-900/20 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
      {/* Background Orbs & Sparkles */}
      <div className="glow-orb top-0 right-0 h-64 w-64 bg-blue-500/10" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-blue-400 mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AXA Industries Dashboard</span>
            <span className="text-neutral-600">•</span>
            <span className="flex items-center gap-1 text-neutral-400">
              <Calendar className="h-3 w-3" />
              {formatDate(new Date())}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            {getGreeting()}, {admin?.name || 'Owner'}
          </h2>
          <p className="mt-1 text-xs md:text-sm text-neutral-400">
            Here is your live business activity overview and performance metrics.
          </p>
        </div>

        {/* Pending Orders Counter Badge */}
        <div className="inline-flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-amber-300">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20">
            <ShoppingBag className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="text-xs font-semibold">
              {pendingOrdersCount} Pending Order{pendingOrdersCount !== 1 ? 's' : ''}
            </p>
            <p className="text-[10px] text-amber-400/80">Requires review today</p>
          </div>
        </div>
      </div>
    </div>
  );
}
