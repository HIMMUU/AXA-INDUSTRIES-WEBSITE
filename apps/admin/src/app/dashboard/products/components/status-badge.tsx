'use client';

import { ProductStatus } from '@axa/types';

interface StatusBadgeProps {
  status: ProductStatus | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getBadgeStyle = () => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'HIDDEN':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'ARCHIVED':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'DRAFT':
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  return (
    <span className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getBadgeStyle()}`}>
      {status}
    </span>
  );
}
