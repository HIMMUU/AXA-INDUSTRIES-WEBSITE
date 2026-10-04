'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@axa/types';
import { formatCurrency } from '@axa/utils';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ApiUrlConfigurationError, getApiBaseUrl } from '@/lib/api-url';
import { CatalogProductImage, getCloudinaryProductImageUrl } from '@/components/products/catalog-product-image';
import { mergeCatalogProducts } from '@/lib/catalog-products';

export function FeaturedProductsSection() {
  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['featured-products'],
    queryFn: async () => {
      try {
        const apiUrl = getApiBaseUrl();
        const res = await fetch(`${apiUrl}/v1/products?limit=100`, {
          signal: AbortSignal.timeout(1500)
        });
        const json = await res.json();
        return mergeCatalogProducts(json.data || []);
      } catch (err) {
        if (err instanceof ApiUrlConfigurationError) throw err;
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

        {error instanceof ApiUrlConfigurationError && (
          <p role="alert" className="mb-6 text-sm text-red-600">
            {error.message}
          </p>
        )}

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
                slug: 'axa-autovend-50-sanitary-napkin-vending-machine',
                name: 'AXA AutoVend 50 Sanitary Napkin Vending Machine',
                category: 'Automatic Hygiene Dispenser',
                shortDescription: 'Model AVND 50 H • 50-Pad Storage • LCD Display & Battery Backup • + GST Extra.',
                price: 6600,
                badge: 'Automatic • From ₹4,500 + GST',
                badgeColor: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
                img: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786306986/Autoomatic_vending_machine_outer_t8odma.jpg'
              },
              {
                id: 'fallback-snd',
                slug: 'axa-ecoburn-100-sanitary-napkin-disposal-machine',
                name: 'AXA SND Sanitary Napkin & Mask Incinerator Machine',
                category: 'Sanitary Napkin Disposal',
                shortDescription: 'Compact electric incinerator with LCD temperature display and automatic cutoff.',
                price: 3800,
                badge: 'SND Series',
                badgeColor: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
                img: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458267/mainsnd_mle9pt.jpg'
              },
              {
                id: 'fallback-sense',
                slug: 'axa-sense-10-1-touch-feedback-machine-kiosk',
                name: 'AXA Swachh Toilet Feedback Machine',
                category: 'Washroom Feedback System',
                shortDescription: 'App-based washroom feedback system with Good, Average, and Dirty response buttons.',
                price: 8500,
                badge: 'Live Monitoring',
                badgeColor: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400',
                img: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786303502/Studio_product_photography_creation_2K_202608100044_mcmwez.png'
              },
              {
                id: 'fallback-swi-4-5kw',
                slug: 'axa-thermal-destroyer-100-solid-waste-incinerator',
                name: 'AXA SWI 4.5kW Solid Waste Incinerator',
                category: 'Solid Waste Incinerator',
                shortDescription: 'Heavy-duty 4.5kW incinerator for dry and medical waste disposal.',
                price: 215000,
                badge: '8–10kg Capacity',
                badgeColor: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
                img: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786304387/ChatGPT_Image_Aug_10_2026_01_09_31_AM_krrlsc.png'
              },
              {
                id: 'fallback-cloth-bag',
                slug: 'axa-cloth-bag-vending-machine-eco-dispenser',
                name: 'AXA EcoVend Cloth Bag Vending Machine',
                category: 'Reusable Bag Dispenser',
                shortDescription: 'Automatic cotton cloth bag dispenser with coin and UPI QR payment.',
                price: 18500,
                badge: 'Plastic-Free Retail',
                badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
                img: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786304876/ChatGPT_Image_Aug_10_2026_01_16_20_AM_usvtak.png'
              },
              {
                id: '6',
                slug: 'manual-sanitary-napkin-vending-machine',
                name: 'AXA Manual Sanitary Napkin Vending Machine',
                category: 'Mechanical Dispenser',
                shortDescription: 'Model VND Series (VND 25 to 200) • Mechanical Coin Acceptor • Zero Electricity • + GST Extra.',
                price: 3500,
                badge: 'Zero Power • From ₹3,500 + GST',
                badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
                img: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786306986/Autoomatic_vending_machine_interrnal_nv2phl.jpg'
              }
            ].map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                prefetch={true}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[#121216]/60 p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-500/40 cursor-pointer text-left block"
              >
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-b from-stone-100/90 via-stone-50 to-white border border-stone-200/80 mb-4 relative flex items-center justify-center p-3">
                  <CatalogProductImage
                    src={p.img || undefined}
                    alt={p.name}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 rounded-lg bg-white/95 dark:bg-black/80 border border-stone-200 dark:border-white/10 px-2.5 py-1 text-[11px] font-extrabold text-slate-900 dark:text-white shadow-sm">
                    {formatCurrency(p.price)} + GST
                  </span>
                  <div className={`absolute bottom-3 left-3 rounded-full border px-2.5 py-0.5 text-[9px] font-bold shadow-xs ${p.badgeColor}`}>
                    {p.badge}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">{p.category}</p>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {p.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200 dark:border-white/10 mt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">{formatCurrency(p.price)} + GST</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    View Specs <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
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
                  <span className="absolute top-3 right-3 rounded-lg bg-black/70 px-2.5 py-1 text-[10px] font-bold text-white font-mono backdrop-blur-md">
                    {formatCurrency(p.price)} + GST
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
                  <span className="text-xs font-bold text-neutral-900 dark:text-white font-mono">{formatCurrency(p.price)} + GST</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    View Specs <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
