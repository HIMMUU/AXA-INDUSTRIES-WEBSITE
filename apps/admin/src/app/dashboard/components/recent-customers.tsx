'use client';

import Link from 'next/link';
import { RecentCustomerSummary } from '@axa/types';
import { Users, ArrowRight, User } from 'lucide-react';
import { formatDate } from '@axa/utils';

interface RecentCustomersProps {
  customers?: RecentCustomerSummary[];
  isLoading: boolean;
}

export function RecentCustomers({ customers = [], isLoading }: RecentCustomersProps) {
  if (isLoading) {
    return (
      <div className="glass-panel h-80 rounded-3xl p-6 animate-pulse">
        <div className="h-6 w-36 bg-white/10 rounded mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-full bg-white/5 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Recent Customers</h3>
        </div>
        <Link
          href="/dashboard/customers"
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {customers.length === 0 ? (
          <div className="py-8 text-center text-xs text-neutral-500">
            No customers registered yet.
          </div>
        ) : (
          customers.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-3 transition hover:border-white/10 hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 font-bold text-xs">
                  {c.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{c.name}</p>
                  <p className="text-[11px] text-neutral-400">{c.phone || c.email}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium text-neutral-300">
                  {c.ordersCount} Order{c.ordersCount !== 1 ? 's' : ''}
                </span>
                <p className="mt-1 text-[9px] text-neutral-500">{formatDate(c.createdAt)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
