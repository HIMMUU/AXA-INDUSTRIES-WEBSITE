'use client';

import Link from 'next/link';
import { formatCurrency, formatDate } from '@axa/utils';
import { ShoppingBag, Eye, ExternalLink } from 'lucide-react';

interface CustomerOrdersProps {
  orders?: Array<{
    id: string;
    orderNumber: string;
    totalAmount: number;
    status: string;
    createdAt: string;
  }>;
}

export function CustomerOrders({ orders = [] }: CustomerOrdersProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-blue-400" />
          <h3 className="text-xs font-semibold text-white">Order History</h3>
        </div>
        <span className="text-xs text-neutral-400 font-mono font-medium">
          {orders.length} Order{orders.length !== 1 ? 's' : ''}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-xs text-neutral-500">
          No orders or enquiries placed by this customer yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-neutral-400 font-medium">
                <th className="py-2.5 px-3">Order Number</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-white/5 transition">
                  <td className="py-3 px-3 font-semibold font-mono text-white">
                    {o.orderNumber}
                  </td>
                  <td className="py-3 px-3 text-neutral-400">
                    {formatDate(o.createdAt)}
                  </td>
                  <td className="py-3 px-3 font-semibold text-white">
                    {formatCurrency(o.totalAmount)}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[9px] font-semibold uppercase ${
                        o.status === 'COMPLETED'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : o.status === 'CONFIRMED'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : o.status === 'CANCELLED'
                          ? 'bg-red-500/10 text-red-400 border-red-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href={`/dashboard/orders/${o.id}`}
                      className="inline-flex items-center gap-1 text-blue-400 hover:underline"
                    >
                      View <ExternalLink className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
