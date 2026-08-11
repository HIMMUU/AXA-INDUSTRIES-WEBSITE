'use client';

import { ShieldCheck, Award, Globe2, Building2 } from 'lucide-react';

export function TrustedBySection() {
  const highlights = [
    { icon: Award, label: 'ISO 9001:2015 Certified', desc: 'Government & CPCB Compliant Standards' },
    { icon: ShieldCheck, label: '100% Quality Tested', desc: 'Auto Cut-Off & Anti-Jam Certified' },
    { icon: Globe2, label: 'Pan-India Deployment', desc: 'Doorstep Delivery & On-Site Installation' },
    { icon: Building2, label: '1,200+ Institutions', desc: 'Schools, Universities & Corporates' }
  ];

  return (
    <section className="py-12 border-y border-neutral-200 dark:border-white/10 bg-neutral-100/70 dark:bg-[#0C0C0F] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-8">
          Trusted by Premier Educational Institutions, Hospitals, Airports & CSR Initiatives
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 rounded-2xl border border-neutral-200 dark:border-white/5 bg-white/80 dark:bg-white/5 backdrop-blur-xl transition hover:border-blue-500/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{item.label}</h4>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
