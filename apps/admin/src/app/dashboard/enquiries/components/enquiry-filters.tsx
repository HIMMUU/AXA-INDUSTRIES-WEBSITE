'use client';

import { useState, useEffect } from 'react';
import { useEnquiriesStore } from '@/store/use-enquiries-store';
import { EnquiryStatus, EnquirySource } from '@axa/types';
import { Search, RotateCcw, Filter } from 'lucide-react';

export function EnquiryFilters() {
  const {
    searchQuery,
    selectedStatus,
    selectedSource,
    setSearchQuery,
    setSelectedStatus,
    setSelectedSource,
    resetFilters
  } = useEnquiriesStore();

  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput, setSearchQuery]);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      {/* Left: Search input */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
        <input
          type="text"
          placeholder="Search by name, company, phone, email, or reference (e.g. ENQ-2026-00001)..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
        />
      </div>

      {/* Right: Filter dropdowns */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as EnquiryStatus | '')}
          className="rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 text-xs text-neutral-200 focus:outline-none cursor-pointer"
        >
          <option value="">All Lead Statuses</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="INTERESTED">Interested</option>
          <option value="QUOTATION_SENT">Quotation Sent</option>
          <option value="CONVERTED">Converted</option>
          <option value="CLOSED">Closed</option>
          <option value="REJECTED">Rejected</option>
          <option value="SPAM">Spam</option>
        </select>

        {/* Source Filter */}
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value as EnquirySource | '')}
          className="rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 text-xs text-neutral-200 focus:outline-none cursor-pointer"
        >
          <option value="">All Form Sources</option>
          <option value="CONTACT_PAGE">Contact Page</option>
          <option value="PRODUCT_DETAILS">Product Details Page</option>
          <option value="HOMEPAGE_CTA">Homepage CTA</option>
          <option value="FOOTER_CONTACT">Footer Form</option>
          <option value="QUICK_QUOTE">Quick Quote Modal</option>
        </select>

        {/* Reset Button */}
        {(selectedStatus || selectedSource || searchInput) && (
          <button
            onClick={() => {
              setSearchInput('');
              resetFilters();
            }}
            className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-neutral-400 hover:text-white transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
