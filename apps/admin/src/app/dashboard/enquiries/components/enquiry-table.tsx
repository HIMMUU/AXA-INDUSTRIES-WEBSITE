'use client';

import Link from 'next/link';
import { useEnquiriesStore } from '@/store/use-enquiries-store';
import { Enquiry } from '@axa/types';
import { formatDate } from '@axa/utils';
import { EnquiryStatusBadge } from './status-badge';
import { apiClient } from '@/lib/api-client';
import {
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
  CheckCircle2,
  Package,
  Inbox
} from 'lucide-react';

interface EnquiryTableProps {
  enquiries: Enquiry[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  refetch: () => void;
}

export function EnquiryTable({ enquiries, meta, isLoading, refetch }: EnquiryTableProps) {
  const { page, setPage, selectedIds, toggleSelect, selectAll, clearSelection } = useEnquiriesStore();

  const list = Array.isArray(enquiries) ? enquiries : [];
  const isAllSelected = list.length > 0 && list.every((e) => selectedIds.includes(e.id));

  const handleSelectAllToggle = () => {
    if (isAllSelected) {
      clearSelection();
    } else {
      selectAll(list.map((e) => e.id));
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to soft delete ${selectedIds.length} selected lead enquiries?`)) return;
    try {
      await apiClient('/v1/enquiries/bulk', {
        method: 'POST',
        body: JSON.stringify({ enquiryIds: selectedIds, action: 'DELETE' })
      });
      clearSelection();
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBulkStatus = async (action: 'MARK_CONTACTED' | 'MARK_CONVERTED') => {
    try {
      await apiClient('/v1/enquiries/bulk', {
        method: 'POST',
        body: JSON.stringify({ enquiryIds: selectedIds, action })
      });
      clearSelection();
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportSelectedCsv = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/v1/enquiries/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('axa_access_token')}`
        },
        body: JSON.stringify({ enquiryIds: selectedIds })
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `axa-enquiries-export-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRow = async (id: string) => {
    if (!confirm('Soft delete this enquiry lead?')) return;
    try {
      await apiClient(`/v1/enquiries/${id}`, { method: 'DELETE' });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Bulk Action Floating Bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-2.5 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>{selectedIds.length} enquiries selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkStatus('MARK_CONTACTED')}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10"
            >
              Mark Contacted
            </button>
            <button
              onClick={() => handleBulkStatus('MARK_CONVERTED')}
              className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Mark Converted
            </button>
            <button
              onClick={handleExportSelectedCsv}
              className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10"
            >
              <Download className="h-3.5 w-3.5" /> CSV
            </button>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-1 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Main Data Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121216]/60 backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/5 text-neutral-400 sticky top-0 backdrop-blur-md">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAllToggle}
                    className="rounded border-white/20 bg-neutral-900 text-blue-500 focus:ring-0"
                  />
                </th>
                <th className="p-4 font-semibold text-white">Reference #</th>
                <th className="p-4 font-semibold text-white">Customer & Company</th>
                <th className="p-4 font-semibold text-white">Contact Phone/Email</th>
                <th className="p-4 font-semibold text-white">Product & Qty</th>
                <th className="p-4 font-semibold text-white">Source</th>
                <th className="p-4 font-semibold text-white">Status</th>
                <th className="p-4 font-semibold text-white">Submitted Date</th>
                <th className="p-4 text-right font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={9} className="p-4">
                      <div className="h-4 rounded bg-white/5 w-full" />
                    </td>
                  </tr>
                ))
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-neutral-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Inbox className="h-8 w-8 text-neutral-600" />
                      <p className="text-xs font-semibold text-neutral-400">No lead enquiries found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                list.map((e) => {
                  const isSelected = selectedIds.includes(e.id);
                  return (
                    <tr
                      key={e.id}
                      className={`transition hover:bg-white/5 ${isSelected ? 'bg-blue-500/5' : ''}`}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(e.id)}
                          className="rounded border-white/20 bg-neutral-900 text-blue-500 focus:ring-0"
                        />
                      </td>

                      {/* Reference # */}
                      <td className="p-4 font-mono font-bold text-white">
                        <Link href={`/dashboard/enquiries/${e.id}`} className="hover:text-blue-400">
                          {e.referenceNumber}
                        </Link>
                      </td>

                      {/* Customer Name & Company */}
                      <td className="p-4">
                        <div>
                          <p className="font-semibold text-white">{e.name}</p>
                          <p className="text-[11px] text-neutral-400">{e.company || 'Individual Client'}</p>
                        </div>
                      </td>

                      {/* Phone & Email */}
                      <td className="p-4 font-mono text-[11px]">
                        <p className="text-white">{e.phone}</p>
                        <p className="text-neutral-400">{e.email || 'No email'}</p>
                      </td>

                      {/* Requested Product & Qty */}
                      <td className="p-4">
                        {e.product ? (
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-blue-400 shrink-0" />
                            <div>
                              <p className="font-semibold text-white truncate max-w-[140px]">{e.product.name}</p>
                              <p className="text-[11px] font-mono text-neutral-400">Qty: {e.quantity}</p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-neutral-500 italic">General Enquiry</span>
                        )}
                      </td>

                      {/* Form Source */}
                      <td className="p-4 text-[11px]">
                        <span className="rounded-lg bg-white/5 px-2 py-1 text-neutral-300 font-mono">
                          {e.source}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="p-4">
                        <EnquiryStatusBadge status={e.status} />
                      </td>

                      {/* Submitted Date */}
                      <td className="p-4 text-[11px] text-neutral-400 whitespace-nowrap">
                        {formatDate(e.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/dashboard/enquiries/${e.id}`}
                            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 hover:text-white transition"
                            title="View Lead Details"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDeleteRow(e.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                            title="Soft Delete Enquiry"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
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

        {/* Pagination Footer */}
        <div className="flex items-center justify-between p-4 border-t border-white/10 text-xs text-neutral-400">
          <div>
            Showing <span className="font-semibold text-white">{enquiries.length}</span> of{' '}
            <span className="font-semibold text-white">{meta.total}</span> lead enquiries
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-neutral-300 hover:bg-white/10 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <span className="font-semibold text-white">
              Page {page} of {meta.totalPages || 1}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= meta.totalPages}
              className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-neutral-300 hover:bg-white/10 disabled:opacity-40"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
