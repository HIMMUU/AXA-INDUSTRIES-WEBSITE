'use client';

import { ShieldCheck, Truck, Headphones, Award, Cpu, Flame } from 'lucide-react';

export function WhyChooseUsSection() {
  const features = [
    {
      icon: Award,
      title: 'ISO 9001:2015 Certified Engineering',
      desc: 'Precision hygiene equipment complying with international CPCB and sanitary waste disposal guidelines.'
    },
    {
      icon: Flame,
      title: 'Zero-Emission Ceramic Incineration',
      desc: 'Advanced multi-stage thermal core destroys pads to <1% sterile ash with smokeless auto cut-off.'
    },
    {
      icon: ShieldCheck,
      title: 'Optical Anti-Theft & Multi-Coin Logic',
      desc: 'Dual spiral mechanism with 99.9% anti-jam reliability, accepting ₹5, ₹10 coins, custom tokens & UPI.'
    },
    {
      icon: Cpu,
      title: 'IoT & 4G Cloud Telemetry',
      desc: 'Real-time stock monitoring, supervisor SMS refill alerts, and centralized CSAT cleanliness tracking.'
    },
    {
      icon: Truck,
      title: 'Pan-India Direct Logistics',
      desc: 'Rapid doorstep delivery, turnkey institutional mounting, and comprehensive on-site staff training.'
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support & Warranty',
      desc: 'Direct engineer hotline (+91 85951 56873) and 3-year factory warranty on core heating & dispensing modules.'
    }
  ];

  return (
    <section className="py-24 bg-neutral-50 dark:bg-[#08080A] border-t border-neutral-200 dark:border-white/10 relative transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-500">Flagship Brand AXA CLUB</span>
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white sm:text-4xl">Why Institutional Leaders Choose AXA</h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Uncompromising standards in hygiene automation, smokeless waste destruction, and direct factory client support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="group rounded-3xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-[#121216]/60 p-6 shadow-xl backdrop-blur-xl transition hover:border-blue-500/30 hover:shadow-2xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
