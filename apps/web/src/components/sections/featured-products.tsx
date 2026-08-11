'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@axa/types';
import { formatCurrency } from '@axa/utils';
import { ArrowRight, Package, Sparkles } from 'lucide-react';

export function FeaturedProductsSection() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['featured-products'],
    queryFn: async () => {
      try {
        const res = await fetch('http://localhost:4000/api/v1/products?limit=6', {
          signal: AbortSignal.timeout(400)
        });
        const json = await res.json();
        return json.data || [];
      } catch (err) {
        return [];
      }
    }
  });

  return (
    <section className="py-24 relative bg-white dark:bg-[#0A0A0C] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 mb-2">
              <Sparkles className="h-3 w-3" /> Featured Equipment
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              High Performance Catalogue
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
              Explore our core product lineup engineered for demanding industrial environments.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-4 py-2 text-xs font-semibold text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/10 transition"
          >
            <span>View All Products</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: '1',
                slug: 'automatic-sanitary-napkin-vending-machine-avnd50',
                name: 'AXA AutoVend 50 Sanitary Napkin Vending Machine',
                category: 'Automatic Hygiene Dispenser',
                shortDescription: 'Model AVND50H • 50-Pad Storage • LCD Display & Battery Backup • Multi-Coin & Token Operated.',
                price: 18500,
                badge: 'Flagship Vending System',
                badgeColor: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
                img: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786306986/Autoomatic_vending_machine_outer_t8odma.jpg'
              },
              {
                id: '2',
                slug: 'sanitary-napkin-incinerator-machine-ecoburn-100',
                name: 'AXA EcoBurn 100 Sanitary Napkin Disposal Incinerator',
                category: 'Eco Incinerator',
                shortDescription: 'Model SND-50 • Ceramic Thermal Core • Auto Cut-off Timer • Smokeless & Odorless Ash Disposal.',
                price: 14500,
                badge: 'Smokeless Ceramic Core',
                badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
                img: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458267/mainsnd_mle9pt.jpg'
              },
              {
                id: '3',
                slug: 'cloth-bag-vending-machine-eco-dispenser-200',
                name: 'AXA EcoVend Cloth Bag Vending Machine Dispenser',
                category: 'Plastic-Free Automation',
                shortDescription: 'Model CBVND100 • 100+ Canvas Bag Capacity • Coin / Smart UPI QR • Anti-Theft Dispense Spiral.',
                price: 24999,
                badge: 'Eco Bag Dispenser #B5AD9A',
                badgeColor: 'border-[#B5AD9A]/40 bg-[#B5AD9A]/15 text-[#D1C9B8]',
                img: '/images/cloth-bag-vending-pink-front.png'
              },
              {
                id: '4',
                slug: 'axa-sense-10-1-touch-feedback-machine-kiosk',
                name: 'AXA Sense 10.1" Smart Washroom Feedback Kiosk',
                category: 'IoT Washroom Analytics',
                shortDescription: 'Model Sense 3B • Real-Time CSAT Survey • 4G Cloud Reporting • Instant Supervisor SMS Alerts.',
                price: 14999,
                badge: 'Smart CSAT Analytics',
                badgeColor: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400',
                img: '/images/feedback-machine-front.png'
              },
              {
                id: '5',
                slug: 'axa-thermal-destroyer-100-solid-waste-incinerator',
                name: 'AXA Thermal Destroyer 100 Solid Waste Incinerator',
                category: 'Solid Waste Systems',
                shortDescription: 'Dual Combustion Chamber • 100kg/day Solid & Biomedical Waste Thermal Destruction • Wet Scrubber.',
                price: 245000,
                badge: 'Dual Chamber CPCB Compliant',
                badgeColor: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
                img: '/images/solid-waste-incinerator-5-8kg.jpg'
              },
              {
                id: '6',
                slug: 'manual-sanitary-napkin-vending-machine',
                name: 'AXA Manual Sanitary Napkin Vending Machine',
                category: 'Mechanical Dispenser',
                shortDescription: 'Model MVND30 • Mechanical Coin Acceptor • Zero Electricity Required • Wall-Mounted Robust Steel Body.',
                price: 8999,
                badge: 'Zero Power Operation',
                badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
                img: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786306986/Autoomatic_vending_machine_interrnal_nv2phl.jpg'
              }
            ].map((p) => (
              <div
                key={p.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-stone-200 bg-white p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-500/40"
              >
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-b from-stone-100/90 via-stone-50 to-white border border-stone-200/80 mb-4 relative flex items-center justify-center p-3">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 rounded-lg bg-white/95 border border-stone-200 px-2.5 py-1 text-[11px] font-extrabold text-slate-900 shadow-sm">
                    {formatCurrency(p.price)}
                  </span>
                  <div className={`absolute bottom-3 left-3 rounded-full border px-2.5 py-0.5 text-[9px] font-bold shadow-xs ${p.badgeColor}`}>
                    {p.badge}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">{p.category}</p>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {p.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200 mt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 font-mono">{formatCurrency(p.price)}</span>
                  <Link
                    href={`/products/${p.slug}`}
                    prefetch={true}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    View Specs <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
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
                  <span className="absolute top-3 right-3 rounded-lg bg-black/70 px-2.5 py-1 text-[10px] font-bold text-white font-mono backdrop-blur-md">
                    {formatCurrency(p.price)}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {p.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-white/10 mt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white font-mono">{formatCurrency(p.price)}</span>
                  <Link
                    href={`/products/${p.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Specs <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
