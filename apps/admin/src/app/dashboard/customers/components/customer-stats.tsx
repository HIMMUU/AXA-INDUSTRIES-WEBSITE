'use client';

import { Customer } from '@axa/types';
import { formatCurrency, formatDate } from '@axa/utils';
import { ShoppingBag, CheckCircle2, Clock, XCircle, DollarSign, Calendar } from 'lucide-react';

interface CustomerStatsProps {
  customer: Customer;
}

export function CustomerStats({ customer }: CustomerStatsProps) {
  const stats = [
    {
      title: 'Total Orders',
      value: customer.ordersCount || 0,
      icon: ShoppingBag,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Completed Orders',
      value: customer.completedOrdersCount || 0,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Pending Orders',
      value: customer.pendingOrdersCount || 0,
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Cancelled Orders',
      value: customer.cancelledOrdersCount || 0,
      icon: XCircle,
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/20'
    },
    {
      title: 'Total Lifetime Spending',
      value: formatCurrency(customer.totalSpending || 0),
      icon: DollarSign,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-white/10 bg-[#121216]/60 p-4 shadow-xl backdrop-blur-xl transition hover:border-white/20"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-neutral-400">{item.title}</span>
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${item.bg}`}>
                <Icon className={`h-3.5 w-3.5 ${item.color}`} />
              </div>
            </div>
            <p className="text-xl font-bold tracking-tight text-white">{item.value}</p>
            {idx === 4 && customer.lastOrderDate && (
              <p className="text-[10px] text-neutral-500 mt-1 flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Last: {formatDate(customer.lastOrderDate)}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
