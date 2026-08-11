'use client';

import { Search, Send, CheckCircle2, Truck } from 'lucide-react';

export function ProcessStepsSection() {
  const steps = [
    {
      num: '01',
      icon: Search,
      title: 'Select Model & Capacity',
      desc: 'Choose from 50 to 100 pad storage, manual or automatic vending, and ceramic incinerator options.'
    },
    {
      num: '02',
      icon: Send,
      title: 'Request Instant Fast Quote',
      desc: 'Submit your institutional requirements or CSR procurement volume directly online.'
    },
    {
      num: '03',
      icon: CheckCircle2,
      title: 'Technical Review & Quotation',
      desc: 'Our sales engineers verify coin/token logic, power specs, and issue formal quotation within 2 hours.'
    },
    {
      num: '04',
      icon: Truck,
      title: 'Pan-India Installation',
      desc: 'Factory-tested machines are delivered to your facility with professional wall-mounting & training.'
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0C] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Institutional Procurement</span>
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white sm:text-4xl">How AXA Procurement Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-[#121216]/60 p-6 shadow-xl backdrop-blur-xl space-y-3"
              >
                <span className="text-3xl font-extrabold text-neutral-300 dark:text-white/10 font-mono absolute top-4 right-6">
                  {step.num}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">{step.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
