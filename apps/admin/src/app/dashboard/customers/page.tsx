'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useCustomersStore } from '@/store/use-customers-store';
import { apiClient } from '@/lib/api-client';
import { Customer } from '@axa/types';
import { CustomerFilters } from './components/customer-filters';
import { CustomerTable } from './components/customer-table';
import { UserPlus, Download, RefreshCw } from 'lucide-react';

export default function CustomersPage() {
  const {
    page,
    searchQuery,
    selectedStatus,
    cityFilter,
    stateFilter,
    sortBy
  } = useCustomersStore();

  const {
    data,
    isLoading,
    refetch
  } = useQuery<{ items: Customer[]; meta: any }>({
    queryKey: ['customers', page, searchQuery, selectedStatus, cityFilter, stateFilter, sortBy],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchQuery && { q: searchQuery }),
        ...(selectedStatus && { status: selectedStatus }),
        ...(cityFilter && { city: cityFilter }),
        ...(stateFilter && { state: stateFilter }),
        sortBy
      });

      const res = await apiClient(`/v1/customers?${params.toString()}`);
      return {
        items: res.data || [],
        meta: res.meta || { page: 1, limit: 10, total: 0, totalPages: 1 }
      };
    }
  });

  const handleExportAllCsv = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/v1/customers/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('axa_access_token')}`
        }
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'axa-all-customers.csv';
      a.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Customer Directory</h2>
          <p className="text-xs text-neutral-400">Manage clients, enquiry profiles, spending & internal notes</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 hover:text-white transition"
            title="Refresh Directory"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={handleExportAllCsv}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/10 transition"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
          <Link
            href="/dashboard/customers/new"
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200 active:scale-[0.99]"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Customer</span>
          </Link>
        </div>
      </div>

      {/* Customer Filters */}
      <CustomerFilters />

      {/* Customer Data Table */}
      <CustomerTable
        customers={data?.items || []}
        meta={data?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 }}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
}
