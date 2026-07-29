'use client';

import Link from 'next/link';
import { RecentOrderSummary } from '@axa/types';
import { ShoppingCart, ArrowRight, Eye } from 'lucide-react';
import { formatCurrency, formatDate } from '@axa/utils';

interface RecentOrdersProps {
  orders?: RecentOrderSummary[];
  isLoading: boolean;
}

export function RecentOrders({ orders = [], isLoading }: RecentOrdersProps) {
  const getStatusBadge = (status: RecentOrderSummary['status']) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'COMPLETED':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'CANCELLED':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

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
          <ShoppingCart className="h-4 w-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-white">Recent Orders</h3>
        </div>
        <Link
          href="/dashboard/orders"
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-neutral-400 font-medium">
              <th className="pb-3">Order Number</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-neutral-500">
                  No orders placed yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="group hover:bg-white/5 transition">
                  <td className="py-3 font-mono font-medium text-white">#{o.orderNumber}</td>
                  <td className="py-3 font-medium text-neutral-200">{o.customerName}</td>
                  <td className="py-3 text-neutral-400">{formatDate(o.createdAt)}</td>
                  <td className="py-3">
                    <span className={`inline-flex rounded-lg border px-2.5 py-0.5 text-[10px] font-semibold ${getStatusBadge(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 font-semibold text-white">{formatCurrency(o.totalAmount)}</td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/dashboard/orders/${o.id}`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:text-white transition"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
