'use client';

import { RevenueChartPoint } from '@axa/types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { TrendingUp, BarChart2 } from 'lucide-react';
import { formatCurrency } from '@axa/utils';

interface RevenueChartProps {
  data?: RevenueChartPoint[];
  isLoading: boolean;
}

export function RevenueChart({ data = [], isLoading }: RevenueChartProps) {
  if (isLoading) {
    return (
      <div className="glass-panel h-80 rounded-3xl p-6 animate-pulse">
        <div className="h-6 w-48 bg-white/10 rounded mb-4" />
        <div className="h-56 w-full bg-white/5 rounded-2xl" />
      </div>
    );
  }

  const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">7-Day Revenue Trend</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Total 7-day revenue: <span className="font-semibold text-white">{formatCurrency(totalRevenue)}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-xs text-neutral-400">Confirmed Orders Revenue</span>
        </div>
      </div>

      <div className="h-64 w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs text-neutral-500">
            No revenue recorded over the last 7 days.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis dataKey="date" stroke="#737373" fontSize={11} tickLine={false} />
              <YAxis stroke="#737373" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val}`} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as RevenueChartPoint;
                    return (
                      <div className="rounded-xl border border-white/10 bg-[#18181C] p-3 shadow-2xl">
                        <p className="text-xs font-semibold text-white">{item.date}</p>
                        <p className="text-xs text-blue-400 font-medium mt-1">
                          Revenue: {formatCurrency(item.revenue)}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          Orders: {item.orders}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
