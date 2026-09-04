'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product, ProductStatus } from '@axa/types';
import { useProductsStore } from '@/store/use-products-store';
import { StatusBadge } from './status-badge';
import { formatCurrency, formatDate } from '@axa/utils';
import {
  Edit,
  Copy,
  Eye,
  Trash2,
  Package,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CheckSquare,
  Square,
  ShieldAlert
} from 'lucide-react';
import { useState } from 'react';
import { apiClient } from '@/lib/api-client';

interface ProductTableProps {
  products: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  refetch: () => void;
}

export function ProductTable({ products = [], meta, isLoading, refetch }: ProductTableProps) {
  const router = useRouter();
  const {
    selectedProductIds,
    toggleSelectProduct,
    toggleSelectAll,
    clearSelection,
    setPage
  } = useProductsStore();

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const allProductIds = products.map((p) => p.id);
  const isAllSelected = allProductIds.length > 0 && selectedProductIds.length === allProductIds.length;

  const handleDuplicate = async (id: string) => {
    setIsActionLoading(true);
    try {
      await apiClient(`/v1/products/${id}/duplicate`, { method: 'POST' });
      refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
      setActiveMenuId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to soft delete this product?')) return;
    setIsActionLoading(true);
    try {
      await apiClient(`/v1/products/${id}`, { method: 'DELETE' });
      refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
      setActiveMenuId(null);
    }
  };

  const handleBulkAction = async (action: 'DELETE' | 'PUBLISH' | 'ARCHIVE' | 'HIDE' | 'DUPLICATE') => {
    if (selectedProductIds.length === 0) return;
    if (action === 'DELETE' && !confirm(`Soft delete ${selectedProductIds.length} selected product(s)?`)) return;

    setIsActionLoading(true);
    try {
      await apiClient('/v1/products/bulk', {
        method: 'POST',
        body: JSON.stringify({ productIds: selectedProductIds, action })
      });
      clearSelection();
      refetch();
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
      {selectedProductIds.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-3.5 px-5">
          <span className="text-xs font-semibold text-blue-300">
            {selectedProductIds.length} Product{selectedProductIds.length !== 1 ? 's' : ''} Selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction('PUBLISH')}
              disabled={isActionLoading}
              className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20"
            >
              Publish
            </button>
            <button
              onClick={() => handleBulkAction('HIDE')}
              disabled={isActionLoading}
              className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-400 hover:bg-purple-500/20"
            >
              Hide
            </button>
            <button
              onClick={() => handleBulkAction('ARCHIVE')}
              disabled={isActionLoading}
              className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400 hover:bg-amber-500/20"
            >
              Archive
            </button>
            <button
              onClick={() => handleBulkAction('DUPLICATE')}
              disabled={isActionLoading}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10"
            >
              Duplicate
            </button>
            <button
              onClick={() => handleBulkAction('DELETE')}
              disabled={isActionLoading}
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20"
            >
              Delete
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
                  <button type="button" onClick={() => toggleSelectAll(allProductIds)} className="text-neutral-400 hover:text-white">
                    {isAllSelected ? <CheckSquare className="h-4 w-4 text-blue-400" /> : <Square className="h-4 w-4" />}
                  </button>
                </th>
                <th className="py-4 pr-3">Product</th>
                <th className="py-4 px-3">Price</th>
                <th className="py-4 px-3">Status</th>
                <th className="py-4 px-3">Created</th>
                <th className="py-4 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500">
                    <Package className="mx-auto h-8 w-8 text-neutral-600 mb-2" />
                    <p className="text-xs font-medium text-neutral-400">No products found</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Try resetting search or adding a new product.</p>
                  </td>
                </tr>
              ) : (
                products.map((p) => {
                  const isSelected = selectedProductIds.includes(p.id);
                  const firstImage = p.images?.[0]?.url;

                  return (
                    <tr
                      key={p.id}
                      className={`group transition ${isSelected ? 'bg-blue-500/5' : 'hover:bg-white/5'}`}
                    >
                      <td className="p-4">
                        <button type="button" onClick={() => toggleSelectProduct(p.id)} className="text-neutral-400 hover:text-white">
                          {isSelected ? <CheckSquare className="h-4 w-4 text-blue-400" /> : <Square className="h-4 w-4" />}
                        </button>
                      </td>

                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
                            {firstImage ? (
                              <Image src={firstImage} alt={p.name} fill className="object-cover" />
                            ) : (
                              <div className="flex h-full items-center justify-center text-neutral-600">
                                <Package className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                          <div className="truncate max-w-xs">
                            <div className="flex items-center gap-1.5">
                              <Link href={`/dashboard/products/${p.id}/edit`} className="font-semibold text-white hover:text-blue-400 transition truncate">
                                {p.name}
                              </Link>
                              {p.featured && <Sparkles className="h-3 w-3 text-amber-400 shrink-0" />}
                            </div>
                            <p className="text-[11px] font-mono text-neutral-500 truncate">/{p.slug}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3 font-semibold text-white">
                        {formatCurrency(p.price)}
                      </td>

                      <td className="py-3 px-3">
                        <StatusBadge status={p.status} />
                      </td>

                      <td className="py-3 px-3 text-neutral-400">
                        {formatDate(p.createdAt)}
                      </td>

                      <td className="py-3 pr-4 text-right relative">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/dashboard/products/${p.id}`}
                            className="p-1.5 text-neutral-400 hover:text-white transition"
                            title="Preview"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/dashboard/products/${p.id}/edit`}
                            className="p-1.5 text-neutral-400 hover:text-white transition"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDuplicate(p.id)}
                            disabled={isActionLoading}
                            className="p-1.5 text-neutral-400 hover:text-white transition"
                            title="Duplicate"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
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
              <span className="font-semibold text-white">{meta.totalPages}</span> ({meta.total} total items)
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
