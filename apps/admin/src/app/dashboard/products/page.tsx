'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useProductsStore } from '@/store/use-products-store';
import { apiClient } from '@/lib/api-client';
import { Product } from '@axa/types';
import { ProductFilters } from './components/product-filters';
import { ProductTable } from './components/product-table';
import { PackagePlus, RefreshCw } from 'lucide-react';

export default function ProductsPage() {
  const {
    page,
    searchQuery,
    selectedStatus,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder
  } = useProductsStore();

  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery<{ items: Product[]; meta: any }>({
    queryKey: ['products', page, searchQuery, selectedStatus, minPrice, maxPrice, sortBy, sortOrder],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchQuery && { q: searchQuery }),
        ...(selectedStatus && { status: selectedStatus }),
        ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
        ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
        sortBy,
        sortOrder
      });

      const res = await apiClient(`/v1/products?${params.toString()}`);
      return {
        items: res.data || [],
        meta: res.meta || { page: 1, limit: 10, total: 0, totalPages: 1 }
      };
    }
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Product Catalogue</h2>
          <p className="text-xs text-neutral-400">Manage AXA Industries official business products & status</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 hover:text-white transition"
            title="Refresh Table"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <Link
            href="/dashboard/products/new"
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200 active:scale-[0.99]"
          >
            <PackagePlus className="h-4 w-4" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Product Filters */}
      <ProductFilters />

      {/* Product Table */}
      <ProductTable
        products={data?.items || []}
        meta={data?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 }}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
}
