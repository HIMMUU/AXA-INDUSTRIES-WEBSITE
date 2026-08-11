'use client';

import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const reviews = [
    {
      name: 'Dr. Sunita Sharma',
      role: 'Principal, St. Xavier Girls College',
      comment: 'We installed 12 units of AXA AutoVend 50 and EcoBurn Incinerators across our campus. The automatic coin dispensing and smokeless disposal have drastically improved student hygiene dignity.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
    },
    {
      name: 'Rajesh Mehra',
      role: 'Head of Facilities, TechCorp Cyberpark',
      comment: 'The AXA Sense 10.1" CSAT Feedback Kiosks and AVND 50 machines give us instant 4G cloud visibility on washroom cleanliness. Supervisor response time has dropped under 5 minutes.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    },
    {
      name: 'Priya Nambiar',
      role: 'Operations Director, Apex City Hospital',
      comment: 'AXA Thermal Destroyer 100 solved our solid waste disposal bottlenecks with 100% CPCB emission compliance. Direct factory support and training were exceptional.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section className="py-24 bg-neutral-50 dark:bg-[#08080A] border-t border-neutral-200 dark:border-white/10 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Institutional Feedback</span>
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white sm:text-4xl">What Institutional Leaders Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-[#121216]/60 p-6 shadow-xl backdrop-blur-xl relative"
            >
              <Quote className="h-8 w-8 text-neutral-200 dark:text-white/5 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                  &quot;{r.comment}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-neutral-200 dark:border-white/10 mt-6">
                <img src={r.avatar} alt={r.name} className="h-10 w-10 rounded-full object-cover border border-neutral-200 dark:border-white/10" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{r.name}</h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
