import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata = {
  title: 'Terms & Conditions | AXA Industries',
  description: 'AXA Industries corporate terms of service and commercial warranty parameters.'
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b border-neutral-200 dark:border-white/10 pb-6 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Terms & Conditions</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Last updated: July 2026</p>
          </div>

          <div className="space-y-4 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">1. Quotations & Technical Specifications</h2>
            <p>
              All product dimensions, pressure ratings, and CAD parameters provided on AXA Industries digital storefront are subject to final technical review by AXA engineers upon quote submission.
            </p>

            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">2. Quality Warranty & Class VI Testing</h2>
            <p>
              Equipment manufactured by AXA Industries includes a 5-year corporate warranty covering material defects and high-temperature stress endurance per ISO 9001:2015 standards.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
