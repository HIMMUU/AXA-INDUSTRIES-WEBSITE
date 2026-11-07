'use client';

import Link from 'next/link';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { formatCurrency } from '@axa/utils';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CatalogProductImage } from '@/components/products/catalog-product-image';
import { useCart } from '@/providers/cart-provider';

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-[#0A0A0C] dark:text-white">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Product selection</p>
          <h1 className="mt-2 text-3xl font-extrabold">Your Cart</h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Review equipment before requesting a quote. Checkout and online payment are not enabled.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 p-10 text-center dark:border-white/15">
            <ShoppingCart className="mx-auto h-10 w-10 text-neutral-400" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-bold">Your cart is empty</h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Browse the catalogue and add products to your selection.</p>
            <Link href="/products" className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <section aria-label="Cart items" className="space-y-4">
              {items.map((item) => (
                <article key={item.productId} className="flex flex-col gap-4 rounded-2xl border border-neutral-200 p-4 dark:border-white/10 sm:flex-row sm:items-center">
                  <Link href={`/products/${item.slug}`} className="h-24 w-24 shrink-0 rounded-xl bg-neutral-100 p-2 dark:bg-white/5">
                    <CatalogProductImage src={item.image} alt={item.name} className="h-full w-full object-contain" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/products/${item.slug}`} className="font-bold hover:text-blue-600">{item.name}</Link>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{formatCurrency(item.price)} each · Excl. GST</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.name}`}
                        disabled={item.quantity <= 1}
                        onClick={() => setQuantity(item.productId, item.quantity - 1)}
                        className="rounded-lg border border-neutral-300 p-1.5 disabled:opacity-40 dark:border-white/15"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold" aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.name}`}
                        disabled={item.quantity >= 99}
                        onClick={() => setQuantity(item.productId, item.quantity + 1)}
                        className="rounded-lg border border-neutral-300 p-1.5 disabled:opacity-40 dark:border-white/15"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" /> Remove
                      </button>
                    </div>
                  </div>
                  <p className="font-bold sm:text-right">{formatCurrency(item.price * item.quantity)}</p>
                </article>
              ))}
              <button type="button" onClick={clearCart} className="text-xs font-semibold text-neutral-500 underline hover:text-neutral-800 dark:hover:text-white">
                Clear cart
              </button>
            </section>

            <aside className="h-fit rounded-2xl border border-neutral-200 p-5 dark:border-white/10">
              <h2 className="text-base font-bold">Quote summary</h2>
              <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-sm dark:border-white/10">
                <span>Indicative subtotal · Excl. GST</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-neutral-500">
                Final pricing, taxes, shipping and availability will be confirmed by our sales team. No payment is collected here.
              </p>
              <Link href="/contact?cart=1" className="mt-5 flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500">
                Request a Quote
              </Link>
              <Link href="/products" className="mt-3 block text-center text-xs font-semibold text-blue-700 hover:underline dark:text-blue-300">
                Continue browsing
              </Link>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
