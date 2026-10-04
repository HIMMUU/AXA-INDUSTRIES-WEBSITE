'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@axa/types';
import { formatCurrency } from '@axa/utils';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Search, ArrowRight, Package, ArrowUpDown, Download, FileText } from 'lucide-react';
import { ApiUrlConfigurationError, getApiBaseUrl } from '@/lib/api-url';
import { catalogFallbackProducts, mergeCatalogProducts } from '@/lib/catalog-products';
import { CatalogProductImage, getCloudinaryProductImageUrl } from '@/components/products/catalog-product-image';

export default function ProductsCataloguePage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt-desc');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const [by, order] = sortBy.split('-');

  const { data, isLoading, error } = useQuery<{ items: Product[]; meta: any }>({
    queryKey: ['storefront-products', page, debouncedSearch, by, order],
    queryFn: async () => {
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '100',
          ...(debouncedSearch && { q: debouncedSearch }),
          sortBy: by,
          sortOrder: order
        });
        const apiUrl = getApiBaseUrl();
        const res = await fetch(`${apiUrl}/v1/products?${params.toString()}`, {
          signal: AbortSignal.timeout(1500)
        });
        const json = await res.json();
        if (json.data?.length > 0) {
          const mergedItems = mergeCatalogProducts(json.data);
          const matchingItems = debouncedSearch
            ? mergedItems.filter((item) =>
                `${item.name} ${item.shortDescription} ${item.description}`
                  .toLowerCase()
                  .includes(debouncedSearch.toLowerCase())
              )
            : mergedItems;
          return {
            items: matchingItems,
            meta: { page: 1, limit: 100, total: matchingItems.length, totalPages: 1 }
          };
        }
      } catch (err) {
        if (err instanceof ApiUrlConfigurationError) throw err;
        // Fallback to local catalog items if API server is offline
      }

      const filtered = debouncedSearch
        ? catalogFallbackProducts.filter(
            (item) =>
              item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
              item.shortDescription.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
              item.description.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
        : catalogFallbackProducts;

      return {
        items: filtered,
        meta: { page: 1, limit: 9, total: filtered.length, totalPages: 1 }
      };
    }
  });

  const products = data?.items || [];

  const categoryBrochures = [
    {
      title: 'Sanitary Napkin Vending Machine Catalog',
      desc: 'Automatic Coin & UPI QR Vending Machine Specifications',
      url: '/documents/axa-vending-machine-catalog.pdf',
      filename: 'AXA-Sanitary-Napkin-Vending-Machine-Catalog.pdf',
      color: 'border-blue-500/30 bg-blue-500/10 text-blue-400'
    },
    {
      title: 'Sanitary Napkin & Mask Incinerator Catalog',
      desc: 'SND 500 Compact 2500W Smokeless Electric Incinerators',
      url: '/documents/axa-incinerator-catalog.pdf',
      filename: 'AXA-Sanitary-Napkin-Incinerator-Catalog.pdf',
      color: 'border-rose-500/30 bg-rose-500/10 text-rose-400'
    },
    {
      title: 'Swachh Toilet Feedback Machine Catalog',
      desc: 'App-Based Live CSAT Washroom Cleanliness Feedback System',
      url: '/documents/axa-feedback-machine-catalog.pdf',
      filename: 'AXA-Toilet-Feedback-Machine-Catalog.pdf',
      color: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
    },
    {
      title: 'Solid Waste Incinerator (SWI) Catalog',
      desc: 'SWI 3kW & 4.5kW Dry Waste, PPE Kit & Medical Waste Incinerators',
      url: '/documents/axa-solid-waste-incinerator-catalog.pdf',
      filename: 'AXA-Solid-Waste-Incinerator-Catalog.pdf',
      color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {error instanceof ApiUrlConfigurationError && (
            <p role="alert" className="mb-6 text-sm text-red-600">
              {error.message}
            </p>
          )}
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 dark:border-white/10 pb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-500">Flagship Brand AXA CLUB</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1">
                Smart Hygiene & Environmental Solutions
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
                Browse Manual VND and automatic sanitary napkin vending machines, SND incinerators, washroom feedback terminals, thermal waste destroyers, and EcoVend cloth bag dispensers.
              </p>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search catalogue..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 py-2.5 pl-10 pr-4 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none shadow-sm"
                />
              </div>

              <div className="relative w-full sm:w-auto flex items-center">
                <ArrowUpDown className="absolute left-3 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 py-2.5 pl-9 pr-8 text-xs text-neutral-900 dark:text-neutral-200 focus:outline-none appearance-none cursor-pointer shadow-sm"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { label: 'All Equipment', value: '', activeStyle: 'bg-blue-600 border-blue-600 text-white' },
              { label: 'Sanitary Vending', value: 'Vending', activeStyle: 'bg-blue-600 border-blue-600 text-white' },
              { label: 'SND Incinerators', value: 'Incinerator', activeStyle: 'bg-rose-600 border-rose-600 text-white' },
              { label: 'Swachh Feedback Machines', value: 'Feedback', activeStyle: 'bg-indigo-600 border-indigo-600 text-white' },
              { label: 'Solid Waste SWI', value: 'Solid Waste', activeStyle: 'bg-cyan-600 border-cyan-600 text-white' },
              { label: 'Cloth Bag Dispensers', value: 'Cloth Bag', activeStyle: 'bg-[#B5AD9A] border-[#B5AD9A] text-black font-bold' }
            ].map((cat) => {
              const isActive = (search === '' && cat.value === '') || (cat.value !== '' && search.toLowerCase().includes(cat.value.toLowerCase()));
              return (
                <button
                  key={cat.label}
                  onClick={() => setSearch(cat.value)}
                  className={`shrink-0 rounded-2xl px-4 py-2 text-xs font-semibold transition border ${
                    isActive
                      ? `${cat.activeStyle} shadow-md`
                      : 'border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:border-blue-500/40'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <nav aria-label="Equipment buying guides" className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <Link href="/sanitary-napkin-vending-machine" className="font-semibold text-blue-700 hover:underline dark:text-blue-300">
              Sanitary napkin vending machine guide
            </Link>
            <Link href="/sanitary-napkin-vending-machine-price" className="font-semibold text-blue-700 hover:underline dark:text-blue-300">
              Vending machine price guide
            </Link>
            <Link href="/sanitary-napkin-incinerator" className="font-semibold text-blue-700 hover:underline dark:text-blue-300">
              Sanitary napkin disposal guide
            </Link>
            <Link href="/menstrual-waste-management" className="font-semibold text-blue-700 hover:underline dark:text-blue-300">
              Institutional menstrual waste planning
            </Link>
          </nav>

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 p-16 text-center text-neutral-500 space-y-3">
              <Package className="mx-auto h-10 w-10 text-neutral-400" />
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">No Matching Products Found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try refining your search term or reset filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  prefetch={true}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[#121216]/60 p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-500/40 cursor-pointer text-left block"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-b from-stone-100/90 via-stone-50 to-white border border-stone-200/80 mb-4 relative flex items-center justify-center p-3">
                    <CatalogProductImage
                      src={getCloudinaryProductImageUrl(p)}
                      alt={p.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                      Factory Direct
                    </span>
                  </div>

                  <div className="space-y-2 flex-1">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {p.name}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {p.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block">Indicative Price · Excl. GST</span>
                      <span className="text-sm font-extrabold text-neutral-900 dark:text-white">
                        {formatCurrency(p.price)}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-md group-hover:bg-blue-500 transition active:scale-95">
                      <span>Details & Quote</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Category Download Center (PDF Brochures) */}
          <div className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-[#121216]/60 p-8 space-y-6 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Institutional Download Center</span>
                <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white mt-1">Download Product Catalogs & Brochures (PDF)</h3>
              </div>
              <a
                href="/documents/axa-master-catalog.pdf"
                download="AXA-Industries-Official-Master-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg hover:bg-blue-500 transition"
              >
                <Download className="h-4 w-4" />
                <span>Download Master Company Brochure</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoryBrochures.map((b, idx) => (
                <div key={idx} className="flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 space-y-3 shadow-sm hover:border-blue-500/40 transition">
                  <div className="space-y-2">
                    <span className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-[10px] font-bold ${b.color}`}>
                      <FileText className="h-3 w-3" /> PDF CATALOG
                    </span>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{b.title}</h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">{b.desc}</p>
                  </div>

                  <a
                    href={b.url}
                    download={b.filename}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 py-2.5 text-xs font-bold text-neutral-900 dark:text-white hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
