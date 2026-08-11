'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import { useOrdersStore } from '@/store/use-orders-store';
import { Order, OrderStatus } from '@axa/types';
import {
  ShoppingBag,
  Plus,
  Search,
  Filter,
  Download,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileSpreadsheet
} from 'lucide-react';
import { useState } from 'react';

export default function OrdersDirectoryPage() {
  const queryClient = useQueryClient();
  const {
    page,
    limit,
    searchQuery,
    statusFilter,
    selectedIds,
    setPage,
    setSearchQuery,
    setStatusFilter,
    toggleSelectId,
    selectAllOnPage,
    clearSelection
  } = useOrdersStore();

  const [isExporting, setIsExporting] = useState(false);

  // Fetch Orders
  const { data, isLoading } = useQuery<{ items: Order[]; meta: any }>({
    queryKey: ['orders', page, limit, searchQuery, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (searchQuery) params.append('q', searchQuery);
      if (statusFilter !== 'ALL') params.append('status', statusFilter);

      const res = await apiClient(`/v1/orders?${params.toString()}`);
      return { items: res.data || [], meta: res.meta };
    }
  });

  // Bulk Action Mutation
  const bulkMutation = useMutation({
    mutationFn: async ({ action, ids }: { action: string; ids: string[] }) => {
      return apiClient('/v1/orders/bulk', {
        method: 'POST',
        body: JSON.stringify({ action, ids })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      clearSelection();
    }
  });

  const handleExportCsv = async () => {
    setIsExporting(true);
    try {
      const res = await fetch('http://localhost:4000/api/v1/orders/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds })
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `axa-orders-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Export failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  const orders = data?.items || [];
  const meta = data?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };
  const allOnPageSelected = orders.length > 0 && orders.every((o) => selectedIds.includes(o.id));

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20"><Clock className="h-3 w-3" /> Pending</span>;
      case 'CONFIRMED':
        return <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20"><CheckCircle2 className="h-3 w-3" /> Confirmed</span>;
      case 'COMPLETED':
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20"><CheckCircle2 className="h-3 w-3" /> Completed</span>;
      case 'CANCELLED':
        return <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 border border-red-500/20"><XCircle className="h-3 w-3" /> Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2.5">
            <ShoppingBag className="h-6 w-6 text-blue-400" />
            <span>Order Management</span>
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Track, process, and manage customer orders and state transitions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            disabled={isExporting}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10 active:scale-[0.98]"
          >
            {isExporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
            <span>Export CSV</span>
          </button>
          <Link
            href="/dashboard/orders/new"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Order</span>
          </Link>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by order #, customer name, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3.5 text-xs text-white placeholder-neutral-500 transition focus:border-white/20 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-400">
            <Filter className="h-3.5 w-3.5" />
            <span>Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 text-xs font-medium text-white focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-xs text-blue-300">
          <span>Selected <strong>{selectedIds.length}</strong> orders</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => bulkMutation.mutate({ action: 'confirm', ids: selectedIds })}
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition"
            >
              Confirm Selected
            </button>
            <button
              onClick={() => bulkMutation.mutate({ action: 'complete', ids: selectedIds })}
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition"
            >
              Complete Selected
            </button>
            <button
              onClick={() => bulkMutation.mutate({ action: 'delete', ids: selectedIds })}
              className="rounded-lg bg-red-600/80 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition"
            >
              Delete Selected
            </button>
            <button
              onClick={clearSelection}
              className="text-neutral-400 hover:text-white px-2 py-1"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/5 text-neutral-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={allOnPageSelected}
                    onChange={() => selectAllOnPage(orders.map((o) => o.id))}
                    className="rounded border-white/20 bg-white/5"
                  />
                </th>
                <th className="p-4">Order Number</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-neutral-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin mb-2" />
                    <span>Loading order records...</span>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-neutral-500">
                    No orders found matching parameters.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(order.id)}
                        onChange={() => toggleSelectId(order.id)}
                        className="rounded border-white/20 bg-white/5"
                      />
                    </td>
                    <td className="p-4 font-semibold text-white font-mono">
                      <Link href={`/dashboard/orders/${order.id}`} className="hover:text-blue-400 transition">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-white">{order.customer?.name || 'Walk-in Customer'}</div>
                      <div className="text-[11px] text-neutral-500">{order.customer?.phone || order.customer?.email}</div>
                    </td>
                    <td className="p-4 font-mono text-neutral-400">
                      {order.items?.length || 0} line item(s)
                    </td>
                    <td className="p-4 font-semibold text-white font-mono">
                      ${Number(order.totalAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4">{getStatusBadge(order.status)}</td>
                    <td className="p-4 text-neutral-400 font-mono">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-neutral-300 hover:bg-white/10 hover:text-white transition"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-white/10 p-4 text-xs text-neutral-400">
          <div>
            Showing <strong>{orders.length}</strong> of <strong>{meta.total}</strong> orders
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Previous</span>
            </button>
            <span className="px-2 font-medium text-white">{page} / {meta.totalPages || 1}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= meta.totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
