'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useDashboardStore } from '@/store/use-dashboard-store';
import { apiClient } from '@/lib/api-client';
import { GlobalSearchResult } from '@axa/types';
import { Search, Package, ShoppingCart, Users, X, ArrowRight, Loader2 } from 'lucide-react';

export function GlobalSearchModal() {
  const router = useRouter();
  const { isSearchOpen, setSearchOpen, searchQuery, setSearchQuery } = useDashboardStore();
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Keyboard shortcut CMD+K / Ctrl+K & ESC listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  const { data: results = [], isLoading } = useQuery<GlobalSearchResult[]>({
    queryKey: ['global-search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return [];
      const res = await apiClient(`/v1/dashboard/search?q=${encodeURIComponent(debouncedQuery)}`);
      return res.data || [];
    },
    enabled: debouncedQuery.trim().length > 0
  });

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setSearchOpen(false)}
      />

      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-white/10 bg-[#121216] p-4 shadow-2xl">
        {/* Search Header */}
        <div className="relative flex items-center border-b border-white/10 pb-3">
          <Search className="absolute left-3.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search products, orders, customers... (ESC to close)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent pl-10 pr-10 text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute right-3 rounded-lg p-1 text-neutral-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="mt-3 max-h-96 space-y-1.5 overflow-y-auto pr-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-8 text-neutral-500">
              <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-500">
              {debouncedQuery ? 'No matching products, orders, or customers found.' : 'Type to begin searching...'}
            </div>
          ) : (
            results.map((r) => (
              <div
                key={`${r.type}-${r.id}`}
                onClick={() => {
                  setSearchOpen(false);
                  router.push(r.url);
                }}
                className="group flex items-center justify-between rounded-xl p-3 transition hover:bg-white/5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-neutral-400 group-hover:text-white">
                    {r.type === 'product' ? (
                      <Package className="h-4 w-4" />
                    ) : r.type === 'order' ? (
                      <ShoppingCart className="h-4 w-4" />
                    ) : (
                      <Users className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">{r.title}</p>
                    <p className="text-[11px] text-neutral-400">{r.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-600 transition group-hover:translate-x-0.5 group-hover:text-white" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
