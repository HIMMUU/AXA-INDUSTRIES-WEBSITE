'use client';

import { DashboardSummaryData } from '@axa/types';
import { ShoppingBag, DollarSign, Users, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '@axa/utils';

interface StatsCardsProps {
  data?: DashboardSummaryData;
  isLoading: boolean;
}

export function StatsCards({ data, isLoading }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-panel h-32 rounded-3xl p-6 animate-pulse">
            <div className="h-4 w-24 bg-white/10 rounded mb-4" />
            <div className="h-8 w-32 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Today's Orders",
      value: data?.todaysOrders ?? 0,
      change: data?.todaysOrdersChange ?? 0,
      icon: ShoppingBag,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      description: 'vs yesterday'
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(data?.todaysRevenue ?? 0),
      change: data?.todaysRevenueChange ?? 0,
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      description: 'vs yesterday'
    },
    {
      title: 'Total Customers',
      value: data?.totalCustomers ?? 0,
      change: data?.totalCustomersChange ?? 0,
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      description: 'total registered'
    },
    {
      title: 'Total Products',
      value: data?.totalProducts ?? 0,
      change: 0,
      icon: Package,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      description: 'active in catalog'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const isPositive = card.change >= 0;

        return (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-[#121216]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">{card.title}</span>
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${card.bgColor} ${card.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-bold tracking-tight text-white">{card.value}</h3>
              <div className="mt-1 flex items-center gap-1.5 text-xs">
                {card.change !== 0 && (
                  <span
                    className={`inline-flex items-center gap-0.5 font-medium ${
                      isPositive ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {isPositive ? '+' : ''}
                    {card.change}%
                  </span>
                )}
                <span className="text-neutral-500">{card.description}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
