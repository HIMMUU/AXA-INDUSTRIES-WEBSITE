'use client';

export function StatsCounterSection() {
  const stats = [
    { label: 'Machines Deployed Pan-India', count: '15,000+' },
    { label: 'Schools & Universities', count: '1,200+' },
    { label: 'Daily Hygiene Cycles', count: '500,000+' },
    { label: 'Dispensing Reliability', count: '99.9%' }
  ];

  return (
    <section className="py-16 border-y border-neutral-200 dark:border-white/10 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-neutral-100 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-neutral-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">
                {s.count}
              </p>
              <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
