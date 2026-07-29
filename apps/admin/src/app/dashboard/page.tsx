'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { DashboardSummaryData, RevenueChartPoint, RecentOrderSummary, RecentCustomerSummary } from '@axa/types';
import { WelcomeCard } from './components/welcome-card';
import { QuickActions } from './components/quick-actions';
import { StatsCards } from './components/stats-cards';
import { RevenueChart } from './components/revenue-chart';
import { RecentOrders } from './components/recent-orders';
import { RecentCustomers } from './components/recent-customers';
import { RefreshCw, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  // Fetch Summary
  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    refetch: refetchSummary
  } = useQuery<DashboardSummaryData>({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      const res = await apiClient('/v1/dashboard/summary');
      return res.data;
    }
  });

  // Fetch 7-Day Revenue
  const {
    data: revenue,
    isLoading: isRevenueLoading
  } = useQuery<RevenueChartPoint[]>({
    queryKey: ['dashboard-revenue'],
    queryFn: async () => {
      const res = await apiClient('/v1/dashboard/revenue');
      return res.data || [];
    }
  });

  // Fetch Recent Orders
  const {
    data: recentOrders,
    isLoading: isOrdersLoading
  } = useQuery<RecentOrderSummary[]>({
    queryKey: ['dashboard-recent-orders'],
    queryFn: async () => {
      const res = await apiClient('/v1/dashboard/recent-orders');
      return res.data || [];
    }
  });

  // Fetch Recent Customers
  const {
    data: recentCustomers,
    isLoading: isCustomersLoading
  } = useQuery<RecentCustomerSummary[]>({
    queryKey: ['dashboard-recent-customers'],
    queryFn: async () => {
      const res = await apiClient('/v1/dashboard/recent-customers');
      return res.data || [];
    }
  });

  if (isSummaryError) {
    return (
      <div className="flex h-96 items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
        <div>
          <AlertCircle className="mx-auto h-8 w-8 text-red-400 mb-3" />
          <h3 className="text-sm font-semibold text-white">Failed to load dashboard metrics</h3>
          <p className="text-xs text-neutral-400 mt-1 mb-4">Please verify API connection and try again.</p>
          <button
            onClick={() => refetchSummary()}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section 1: Welcome Card */}
      <WelcomeCard pendingOrdersCount={summary?.pendingOrdersCount ?? 0} />

      {/* Section 6: Quick Actions */}
      <QuickActions />

      {/* Section 2: Statistics Cards */}
      <StatsCards data={summary} isLoading={isSummaryLoading} />

      {/* Section 3: Revenue Chart */}
      <RevenueChart data={revenue} isLoading={isRevenueLoading} />

      {/* Section 4 & 5: Recent Orders & Customers Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentOrders orders={recentOrders} isLoading={isOrdersLoading} />
        </div>
        <div>
          <RecentCustomers customers={recentCustomers} isLoading={isCustomersLoading} />
        </div>
      </div>
    </div>
  );
}
