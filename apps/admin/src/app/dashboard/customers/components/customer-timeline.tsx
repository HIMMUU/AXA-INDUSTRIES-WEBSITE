'use client';

import { CustomerTimelineItem } from '@axa/types';
import { formatDate } from '@axa/utils';
import { Clock, UserPlus, ShoppingBag, Edit3, MessageSquare, ShieldAlert } from 'lucide-react';

interface CustomerTimelineProps {
  timeline?: CustomerTimelineItem[];
}

export function CustomerTimeline({ timeline = [] }: CustomerTimelineProps) {
  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'CREATED':
        return { icon: UserPlus, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' };
      case 'ORDER_PLACED':
        return { icon: ShoppingBag, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' };
      case 'NOTE_ADDED':
        return { icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' };
      case 'STATUS_CHANGED':
        return { icon: ShieldAlert, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' };
      case 'UPDATED':
      default:
        return { icon: Edit3, color: 'text-neutral-300', bg: 'bg-white/10 border-white/20' };
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl space-y-4">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <Clock className="h-4 w-4 text-emerald-400" />
        <h3 className="text-xs font-semibold text-white">Activity Timeline</h3>
      </div>

      {timeline.length === 0 ? (
        <p className="text-xs text-neutral-500 italic py-2">No activity recorded yet.</p>
      ) : (
        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
          {timeline.map((item) => {
            const style = getTimelineIcon(item.type);
            const Icon = style.icon;

            return (
              <div key={item.id} className="relative flex items-start gap-3 text-xs">
                {/* Dot */}
                <div className={`absolute -left-6 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border ${style.bg} bg-neutral-900`}>
                  <Icon className={`h-3 w-3 ${style.color}`} />
                </div>

                <div className="space-y-0.5">
                  <p className="font-semibold text-white">{item.title}</p>
                  {item.description && <p className="text-neutral-400 leading-relaxed">{item.description}</p>}
                  <p className="text-[10px] text-neutral-500 font-mono">{formatDate(item.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
