'use client';

import { CustomerStatus } from '@axa/types';

interface CustomerStatusBadgeProps {
  status: CustomerStatus | string;
}

export function CustomerStatusBadge({ status }: CustomerStatusBadgeProps) {
  const getBadgeStyle = () => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'INACTIVE':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'BLOCKED':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'DELETED':
      default:
        return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20';
    }
  };

  return (
    <span className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getBadgeStyle()}`}>
      {status}
    </span>
  );
}
