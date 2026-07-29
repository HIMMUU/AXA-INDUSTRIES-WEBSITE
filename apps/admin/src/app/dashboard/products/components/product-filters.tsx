'use client';

import { useEffect, useState } from 'react';
import { useProductsStore } from '@/store/use-products-store';
import { Search, Filter, RotateCcw, ArrowUpDown } from 'lucide-react';
import { ProductStatus } from '@axa/types';

export function ProductFilters() {
  const {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    sortBy,
    sortOrder,
    setSorting,
    resetFilters
  } = useProductsStore();

  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery]);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#121216]/60 p-4 backdrop-blur-xl">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        <input
          type="text"
          placeholder="Search products by name, slug, description... (300ms debounced)"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-3.5 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto">
        {/* Status Filter */}
        <div className="relative flex items-center">
          <Filter className="absolute left-3 h-3.5 w-3.5 text-neutral-500 pointer-events-none" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-8 text-xs text-neutral-200 focus:border-white/30 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="" className="bg-neutral-900 text-white">All Statuses</option>
            <option value={ProductStatus.PUBLISHED} className="bg-neutral-900 text-white">Published</option>
            <option value={ProductStatus.DRAFT} className="bg-neutral-900 text-white">Draft</option>
            <option value={ProductStatus.HIDDEN} className="bg-neutral-900 text-white">Hidden</option>
            <option value={ProductStatus.ARCHIVED} className="bg-neutral-900 text-white">Archived</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="relative flex items-center">
          <ArrowUpDown className="absolute left-3 h-3.5 w-3.5 text-neutral-500 pointer-events-none" />
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [by, order] = e.target.value.split('-');
              setSorting(by, order as 'asc' | 'desc');
            }}
            className="rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-8 text-xs text-neutral-200 focus:border-white/30 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="createdAt-desc" className="bg-neutral-900 text-white">Newest First</option>
            <option value="createdAt-asc" className="bg-neutral-900 text-white">Oldest First</option>
            <option value="price-desc" className="bg-neutral-900 text-white">Price: High to Low</option>
            <option value="price-asc" className="bg-neutral-900 text-white">Price: Low to High</option>
            <option value="name-asc" className="bg-neutral-900 text-white">Name: A-Z</option>
          </select>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => {
            setLocalSearch('');
            resetFilters();
          }}
          className="flex h-9 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 text-xs text-neutral-400 hover:text-white transition"
          title="Reset Filters"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
}
