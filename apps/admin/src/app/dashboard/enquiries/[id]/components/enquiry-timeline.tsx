'use client';

import { EnquiryTimelineItem } from '@axa/types';
import { formatDate } from '@axa/utils';
import { Activity, Clock } from 'lucide-react';

export function EnquiryTimelineFeed({ timeline }: { timeline: EnquiryTimelineItem[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 backdrop-blur-xl shadow-xl space-y-4">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <Activity className="h-4 w-4 text-purple-400" />
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">SECTION 6</span>
          <h3 className="text-base font-bold text-white">Chronological Lead Activity Feed</h3>
        </div>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10 max-h-72 overflow-y-auto">
        {timeline.length === 0 ? (
          <p className="text-xs text-neutral-500 text-center py-4">No activity events recorded.</p>
        ) : (
          timeline.map((item) => (
            <div key={item.id} className="relative space-y-0.5">
              <div className="absolute -left-6 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white">
                <Clock className="h-2.5 w-2.5" />
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-white">{item.title}</span>
                <span className="text-neutral-500">{formatDate(item.createdAt)}</span>
              </div>
              {item.description && (
                <p className="text-xs text-neutral-400 leading-relaxed">{item.description}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
