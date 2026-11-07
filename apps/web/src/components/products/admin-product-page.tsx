'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@axa/utils';
import type { Product, ProductPageTemplate } from '@axa/types';
import { AddToCartButton } from './add-to-cart-button';
import { CatalogProductImage } from './catalog-product-image';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const templateStyles: Record<ProductPageTemplate, { label: string; accent: string }> = {
  STANDARD: { label: 'AXA Equipment', accent: 'blue' },
  MANUAL_VENDING: { label: 'Manual vending machine', accent: 'emerald' },
  AUTOMATIC_VENDING: { label: 'Automatic vending machine', accent: 'blue' },
  SANITARY_DISPOSAL: { label: 'Sanitary napkin disposal machine', accent: 'rose' },
  SOLID_WASTE_INCINERATOR: { label: 'Solid waste incinerator', accent: 'cyan' },
  FEEDBACK_MACHINE: { label: 'Feedback machine', accent: 'indigo' },
  CLOTH_BAG_VENDING: { label: 'Cloth bag vending machine', accent: 'emerald' }
};

const accentClasses: Record<string, string> = {
  blue: 'bg-blue-600',
  emerald: 'bg-emerald-600',
  rose: 'bg-rose-600',
  cyan: 'bg-cyan-600',
  indigo: 'bg-indigo-600'
};

export function AdminProductPage({ product }: { product: Product }) {
  const template = templateStyles[product.pageTemplate || 'STANDARD'];
  const image = product.images?.[0]?.url;

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-[#0A0A0C] dark:text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-neutral-800 dark:text-neutral-200">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="aspect-square overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-6 dark:border-white/10 dark:bg-white/5">
            <CatalogProductImage src={image} alt={product.name} className="h-full w-full object-contain" />
          </div>

          <div className="flex flex-col justify-center">
            <span className={`mb-4 w-fit rounded-full px-3 py-1 text-xs font-bold text-white ${accentClasses[template.accent]}`}>
              {template.label}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{product.name}</h1>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">{product.shortDescription}</p>
            <p className="mt-6 text-2xl font-extrabold">{formatCurrency(product.price)} <span className="text-sm font-medium text-neutral-500">+ GST</span></p>
            <p className="mt-1 text-xs text-neutral-500">Indicative price; final quotation subject to confirmation.</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton product={product} className="min-h-12 px-6" />
              <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-neutral-300 px-6 py-3 text-sm font-semibold hover:border-blue-500 dark:border-white/15">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <ul className="mt-7 grid gap-2 text-sm text-neutral-600 dark:text-neutral-300 sm:grid-cols-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> For institutional requirements</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Quote confirmed by AXA Industries</li>
            </ul>
          </div>
        </div>

        <section className="mt-16 grid gap-12 border-t border-neutral-200 pt-10 dark:border-white/10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold">Product details</h2>
            <div className="mt-4 whitespace-pre-line text-sm leading-7 text-neutral-700 dark:text-neutral-300">{product.description}</div>
          </div>
          {product.specifications.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold">Specifications</h2>
              <dl className="mt-4 divide-y divide-neutral-200 dark:divide-white/10">
                {product.specifications.map((specification) => (
                  <div key={specification.id || `${specification.key}-${specification.sortOrder}`} className="grid grid-cols-2 gap-4 py-3 text-sm">
                    <dt className="font-semibold text-neutral-700 dark:text-neutral-300">{specification.key}</dt>
                    <dd className="text-neutral-600 dark:text-neutral-400">{specification.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </section>

        <Link href="/products" className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline dark:text-blue-300">
          <ArrowLeft className="h-4 w-4" /> Back to products
        </Link>
      </main>
      <Footer />
    </div>
  );
}
