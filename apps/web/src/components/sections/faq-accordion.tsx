'use client';

import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

export function FaqAccordionSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: 'What payment/coin options are supported by AXA Sanitary Vending Machines?',
      a: 'AXA AutoVend machines feature electronic multi-coin acceptors that support standard Indian ₹5 and ₹10 coins, custom institutional brass tokens, as well as optional Smart UPI QR payment modules.'
    },
    {
      q: 'Are AXA EcoBurn incinerators smokeless and compliant with CPCB guidelines?',
      a: 'Yes. EcoBurn incinerators utilize high-grade ceramic insulation and automated timer cut-offs to reach 800°C–900°C temperatures, reducing pads to <1% sterile ash without black smoke or toxic odor.'
    },
    {
      q: 'What happens during power outages? Is there battery backup?',
      a: 'AXA automatic vending machines include integrated rechargeable lithium battery backups capable of supporting 6 to 8 hours (or 150+ continuous dispenses) during power failures.'
    },
    {
      q: 'How do schools, colleges, and corporate campuses request bulk institutional pricing?',
      a: 'Simply click "Request Fast Quote" on any product page or contact our New Delhi manufacturing desk directly at axaindustries1@gmail.com / +91 85951 56873. We provide direct factory quotation, GST invoices, and turnkey on-site installation.'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 bg-neutral-50 dark:bg-[#08080A] border-t border-neutral-200 dark:border-white/10 transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">Frequently Asked Questions</span>
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white sm:text-4xl">Everything You Need To Know</h2>

          {/* FAQ Search */}
          <div className="relative max-w-md mx-auto pt-4">
            <Search className="absolute left-3.5 top-7 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search FAQ questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 py-2.5 pl-10 pr-4 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-[#121216]/60 backdrop-blur-xl transition shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-neutral-400'}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
