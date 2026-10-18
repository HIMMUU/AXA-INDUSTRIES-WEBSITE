'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CldImage } from 'next-cloudinary';

const products = [
  {
    name: 'AXA AutoVend 50 Sanitary Napkin Vending Machine',
    category: 'Sanitary napkin vending',
    description:
      'An automatic sanitary napkin vending option for schools, colleges, workplaces and other institutional washrooms.',
    image:
      'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786306986/Autoomatic_vending_machine_outer_t8odma.jpg',
    alt: 'AXA AutoVend sanitary napkin vending machine',
    href: '/products/axa-autovend-50-sanitary-napkin-vending-machine'
  },
  {
    name: 'AXA EcoBurn 100 Sanitary Napkin Disposal Machine',
    category: 'Sanitary napkin disposal',
    description:
      'A compact sanitary napkin disposal option for facilities planning a more complete washroom hygiene setup.',
    image:
      'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458267/mainsnd_mle9pt.jpg',
    alt: 'AXA sanitary napkin disposal machine',
    href: '/products/axa-ecoburn-100-sanitary-napkin-disposal-machine'
  }
];

export function InstitutionalProductCards() {
  return (
    <section aria-labelledby="institutional-products-title" className="space-y-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">
          Institutional equipment
        </p>
        <h2 id="institutional-products-title" className="mt-2 text-2xl font-extrabold sm:text-3xl">
          Vending and Disposal Products for Institutions
        </h2>
        <p className="mt-3 leading-7 text-neutral-600 dark:text-neutral-300">
          Explore the vending and disposal machines, then open a product page for details or a quotation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <Link
            key={product.href}
            href={product.href}
            className="group grid overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl dark:border-white/10 dark:bg-[#121216]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-stone-100 to-white p-5 dark:from-white/[0.06] dark:to-white/[0.02]">
              <CldImage
                src={product.image}
                alt={product.alt}
                width={900}
                height={560}
                sizes="(max-width: 768px) 100vw, 50vw"
                preserveTransformations
                loading="lazy"
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">
                {product.category}
              </p>
              <h3 className="mt-2 text-xl font-extrabold leading-snug text-neutral-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
                {product.name}
              </h3>
              <p className="mt-3 flex-1 leading-7 text-neutral-600 dark:text-neutral-300">
                {product.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 border-t border-neutral-200 pt-4 text-sm font-bold text-blue-700 dark:border-white/10 dark:text-blue-300">
                View product details <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
