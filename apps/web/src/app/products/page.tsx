'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@axa/types';
import { formatCurrency } from '@axa/utils';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Search, ArrowRight, Package, ArrowUpDown, Download, FileText } from 'lucide-react';

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

  const { data, isLoading } = useQuery<{ items: Product[]; meta: any }>({
    queryKey: ['storefront-products', page, debouncedSearch, by, order],
    queryFn: async () => {
      const fallbackItems: Product[] = [
        {
          id: 'fb-vending',
          name: 'AXA AutoVend 50 Sanitary Napkin Vending Machine',
          slug: 'axa-autovend-50-sanitary-napkin-vending-machine',
          price: 6600,
          shortDescription: 'Model AVND 50 H • 50-Pad Storage • LCD Display & Battery Backup • Starting from ₹3,000 + GST',
          description: 'Industrial automatic sanitary napkin vending machine for schools, colleges, factories, and corporate offices.',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          images: [{ id: 'img1', url: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786306986/Autoomatic_vending_machine_outer_t8odma.jpg', isPrimary: true }]
        },
        {
          id: 'fb-snd-500',
          name: 'AXA Sanitary Napkin Disposal Incinerator Machine',
          slug: 'axa-ecoburn-100-sanitary-napkin-disposal-machine',
          price: 3360,
          shortDescription: 'SND Series (SND 100 to SND 600) • Ceramic Heater • LCD Temp Display • Auto Cutoff • Starting ₹3,360 + GST',
          description: 'Compact Sanitary Napkin & Mask Incinerator machine with lowest power consumption, automatic thermosensor, and 100-600 napkin daily burn capacity. CE approved & CPCB compliant.',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          images: [
            { id: 'img2-1', url: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458267/mainsnd_mle9pt.jpg', isPrimary: true },
            { id: 'img2-2', url: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458267/frrontsnd_qypbta.jpg', isPrimary: false },
            { id: 'img2-3', url: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458267/left_snd_ozcmjm.jpg', isPrimary: false },
            { id: 'img2-4', url: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458268/installsnd_ifajcr.png', isPrimary: false }
          ]
        },
        {
          id: 'fb-swachh-feedback',
          name: 'AXA Swachh Toilet Feedback Machine',
          slug: 'axa-sense-10-1-touch-feedback-machine-kiosk',
          price: 8500,
          shortDescription: 'Model Swachh TFM • 3-Button Feedback (Good, Average, Dirty) • App-Based Software Live Monitoring',
          description: 'App-based live monitoring washroom feedback machine with 3 distinct feedback push buttons (Green, Yellow, Red) and MS powder-coated body.',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          images: [{ id: 'img3', url: '/images/feedback-machine-front.png', isPrimary: true }]
        },
        {
          id: 'fb-swi-3kw',
          name: 'AXA Solid Waste Incinerator Machine (SWI 3kW / 5-8kg)',
          slug: 'axa-swi-3kw-solid-waste-incinerator',
          price: 165000,
          shortDescription: 'Model SWI-3KW • 5-8 kg Batch Capacity • 3kW Heater • Digital Temp Controller • 4 Caster Wheels',
          description: 'Solid Waste Incinerator Machine used to dispose general dry waste & medical waste such as used PPE kits, masks, cotton, dry leaves, papers & other dry waste.',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          images: [{ id: 'img4', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop', isPrimary: true }]
        },
        {
          id: 'fb-swi-4.5kw',
          name: 'AXA Solid Waste Incinerator Machine (SWI 4.5kW / 8-10kg)',
          slug: 'axa-thermal-destroyer-100-solid-waste-incinerator',
          price: 215000,
          shortDescription: 'Model SWI-4.5KW • 8-10 kg Batch Capacity • 4.5kW Heater • Digital Temp Controller • 4 Caster Wheels',
          description: 'Heavy-duty Solid Waste Incinerator Machine for institutional dry waste and PPE kit disposal with automatic digital temperature controller.',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          images: [{ id: 'img5', url: '/images/solid-waste-incinerator-5-8kg.jpg', isPrimary: true }]
        },
        {
          id: 'fb-cloth-bag',
          name: 'AXA EcoVend Cloth Bag Vending Machine Dispenser',
          slug: 'axa-cloth-bag-vending-machine-eco-dispenser',
          price: 18500,
          shortDescription: 'Model CBVND100 • 100+ Canvas Bag Capacity • Coin / UPI QR Payment • Heavy-Duty Steel Body',
          description: 'Eco-friendly automatic cloth bag vending dispenser for supermarkets, malls, metro stations, and public plazas.',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          images: [{ id: 'img-cb', url: '/images/cloth-bag-vending-pink-front.png', isPrimary: true }]
        }
      ] as unknown as Product[];

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '9',
          ...(debouncedSearch && { q: debouncedSearch }),
          sortBy: by,
          sortOrder: order
        });
        const res = await fetch(`http://localhost:4000/api/v1/products?${params.toString()}`, {
          signal: AbortSignal.timeout(400)
        });
        const json = await res.json();
        const apiItems = json.data || [];
        if (apiItems.length > 0) {
          return {
            items: apiItems,
            meta: json.meta || { page: 1, limit: 9, total: apiItems.length, totalPages: 1 }
          };
        }
      } catch (err) {
        // Fallback to local catalog items if API server is offline
      }

      const filtered = debouncedSearch
        ? fallbackItems.filter(
            (item) =>
              item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
              item.shortDescription.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
        : fallbackItems;

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
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 dark:border-white/10 pb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-500">Flagship Brand AXA CLUB</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1">
                Smart Hygiene & Environmental Solutions
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
                Browse our complete lineup of Automatic Sanitary Napkin Vending Machines, SND 500 Incinerators, Swachh Toilet Feedback Machines, SWI Solid Waste Incinerators & Cloth Bag Dispensers.
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
                <div
                  key={p.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-stone-200 bg-white p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-500/40"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-b from-stone-100/90 via-stone-50 to-white border border-stone-200/80 mb-4 relative flex items-center justify-center p-3">
                    {p.images?.[0]?.url ? (
                      <img
                        src={p.images[0].url}
                        alt={p.name}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-neutral-600">
                        <Package className="h-10 w-10" />
                      </div>
                    )}
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
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block">Indicative Price</span>
                      <span className="text-sm font-extrabold text-neutral-900 dark:text-white">
                        {formatCurrency(p.price)}
                      </span>
                    </div>

                    <Link
                      href={`/products/${p.slug}`}
                      prefetch={true}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-500 transition active:scale-95"
                    >
                      <span>Details & Quote</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
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
