'use client';

import Link from 'next/link';
import { Customer } from '@axa/types';
import { useCustomersStore } from '@/store/use-customers-store';
import { CustomerStatusBadge } from './status-badge';
import { formatCurrency, formatDate } from '@axa/utils';
import {
  Edit,
  Eye,
  Trash2,
  Users,
  ShieldBan,
  Download,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  Building,
  Phone,
  Mail
} from 'lucide-react';
import { useState } from 'react';
import { apiClient } from '@/lib/api-client';

interface CustomerTableProps {
  customers: Customer[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  refetch: () => void;
}

export function CustomerTable({ customers = [], meta, isLoading, refetch }: CustomerTableProps) {
  const {
    selectedCustomerIds,
    toggleSelectCustomer,
    toggleSelectAll,
    clearSelection,
    setPage
  } = useCustomersStore();

  const [isActionLoading, setIsActionLoading] = useState(false);

  const allCustomerIds = customers.map((c) => c.id);
  const isAllSelected = allCustomerIds.length > 0 && selectedCustomerIds.length === allCustomerIds.length;

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to soft delete this customer?')) return;
    setIsActionLoading(true);
    try {
      await apiClient(`/v1/customers/${id}`, { method: 'DELETE' });
      refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleBulkAction = async (action: 'EXPORT' | 'DELETE' | 'BLOCK' | 'RESTORE') => {
    if (selectedCustomerIds.length === 0) return;
    if (action === 'DELETE' && !confirm(`Soft delete ${selectedCustomerIds.length} selected customer(s)?`)) return;

    setIsActionLoading(true);
    try {
      if (action === 'EXPORT') {
        const res = await fetch('http://localhost:4000/api/v1/customers/export', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('axa_access_token')}`
          },
          body: JSON.stringify({ customerIds: selectedCustomerIds, action: 'EXPORT' })
        });
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'axa-selected-customers.csv';
        a.click();
      } else {
        await apiClient('/v1/customers/bulk', {
          method: 'POST',
          body: JSON.stringify({ customerIds: selectedCustomerIds, action })
        });
        clearSelection();
        refetch();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 animate-pulse space-y-4">
        <div className="h-6 w-48 bg-white/10 rounded" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 w-full bg-white/5 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Action Bar */}
      {selectedCustomerIds.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-3.5 px-5">
          <span className="text-xs font-semibold text-blue-300">
            {selectedCustomerIds.length} Customer{selectedCustomerIds.length !== 1 ? 's' : ''} Selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction('EXPORT')}
              disabled={isActionLoading}
              className="flex items-center gap-1.5 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/20"
            >
              <Download className="h-3.5 w-3.5" /> Export CSV
            </button>
            <button
              onClick={() => handleBulkAction('BLOCK')}
              disabled={isActionLoading}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20"
            >
              <ShieldBan className="h-3.5 w-3.5" /> Block
            </button>
            <button
              onClick={() => handleBulkAction('RESTORE')}
              disabled={isActionLoading}
              className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20"
            >
              Restore Active
            </button>
            <button
              onClick={() => handleBulkAction('DELETE')}
              disabled={isActionLoading}
              className="rounded-xl border border-neutral-500/20 bg-neutral-500/10 px-3 py-1.5 text-xs font-medium text-neutral-400 hover:bg-neutral-500/20"
            >
              Soft Delete
            </button>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121216]/60 shadow-xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-neutral-400 font-medium">
                <th className="p-4 w-10">
                  <button type="button" onClick={() => toggleSelectAll(allCustomerIds)} className="text-neutral-400 hover:text-white">
                    {isAllSelected ? <CheckSquare className="h-4 w-4 text-blue-400" /> : <Square className="h-4 w-4" />}
                  </button>
                </th>
                <th className="py-4 pr-3">Customer</th>
                <th className="py-4 px-3">Contact</th>
                <th className="py-4 px-3 text-center">Orders</th>
                <th className="py-4 px-3">Total Spending</th>
                <th className="py-4 px-3">Status</th>
                <th className="py-4 px-3">Created</th>
                <th className="py-4 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-500">
                    <Users className="mx-auto h-8 w-8 text-neutral-600 mb-2" />
                    <p className="text-xs font-medium text-neutral-400">No customer records found</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Try resetting search or adding a new customer.</p>
                  </td>
                </tr>
              ) : (
                customers.map((c) => {
                  const isSelected = selectedCustomerIds.includes(c.id);
                  const initial = c.name.charAt(0).toUpperCase();

                  return (
                    <tr
                      key={c.id}
                      className={`group transition ${isSelected ? 'bg-blue-500/5' : 'hover:bg-white/5'}`}
                    >
                      <td className="p-4">
                        <button type="button" onClick={() => toggleSelectCustomer(c.id)} className="text-neutral-400 hover:text-white">
                          {isSelected ? <CheckSquare className="h-4 w-4 text-blue-400" /> : <Square className="h-4 w-4" />}
                        </button>
                      </td>

                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-3">
                          {/* Avatar Circle */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 text-xs font-bold text-white shadow-inner">
                            {initial}
                          </div>
                          <div className="truncate max-w-xs">
                            <Link href={`/dashboard/customers/${c.id}`} className="font-semibold text-white hover:text-blue-400 transition truncate block">
                              {c.name}
                            </Link>
                            {c.company && (
                              <p className="text-[11px] text-neutral-400 flex items-center gap-1 truncate">
                                <Building className="h-3 w-3 text-neutral-500 shrink-0" /> {c.company}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3 space-y-0.5">
                        <div className="text-neutral-300 font-mono text-[11px] flex items-center gap-1.5">
                          <Phone className="h-3 w-3 text-neutral-500 shrink-0" /> {c.phone}
                        </div>
                        {c.email && (
                          <div className="text-neutral-400 text-[11px] flex items-center gap-1.5 truncate max-w-[180px]">
                            <Mail className="h-3 w-3 text-neutral-500 shrink-0" /> {c.email}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-lg bg-white/5 px-2 font-mono font-bold text-white">
                          {c.ordersCount || 0}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-semibold text-white">
                        {formatCurrency(c.totalSpending || 0)}
                      </td>

                      <td className="py-3 px-3">
                        <CustomerStatusBadge status={c.status} />
                      </td>

                      <td className="py-3 px-3 text-neutral-400">
                        {formatDate(c.createdAt)}
                      </td>

                      <td className="py-3 pr-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/dashboard/customers/${c.id}`}
                            className="p-1.5 text-neutral-400 hover:text-white transition"
                            title="View Profile & History"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/dashboard/customers/${c.id}/edit`}
                            className="p-1.5 text-neutral-400 hover:text-white transition"
                            title="Edit Customer"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(c.id)}
                            disabled={isActionLoading}
                            className="p-1.5 text-red-400 hover:text-red-300 transition"
                            title="Soft Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-white/10 p-4 text-xs">
            <span className="text-neutral-400">
              Showing page <span className="font-semibold text-white">{meta.page}</span> of{' '}
              <span className="font-semibold text-white">{meta.totalPages}</span> ({meta.total} total customers)
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(meta.page - 1)}
                disabled={meta.page <= 1}
                className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-neutral-300 hover:bg-white/10 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <button
                onClick={() => setPage(meta.page + 1)}
                disabled={meta.page >= meta.totalPages}
                className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-neutral-300 hover:bg-white/10 disabled:opacity-40"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
