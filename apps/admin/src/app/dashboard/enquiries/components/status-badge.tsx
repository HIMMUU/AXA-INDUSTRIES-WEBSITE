import { EnquiryStatus } from '@axa/types';

export function EnquiryStatusBadge({ status }: { status: EnquiryStatus }) {
  switch (status) {
    case 'NEW':
      return <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-blue-400 border border-blue-500/20">NEW</span>;
    case 'CONTACTED':
      return <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-purple-400 border border-purple-500/20">CONTACTED</span>;
    case 'INTERESTED':
      return <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-400 border border-indigo-500/20">INTERESTED</span>;
    case 'QUOTATION_SENT':
      return <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400 border border-amber-500/20">QUOTATION SENT</span>;
    case 'CONVERTED':
      return <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">CONVERTED</span>;
    case 'CLOSED':
      return <span className="rounded-full bg-neutral-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-400 border border-neutral-500/20">CLOSED</span>;
    case 'REJECTED':
      return <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-rose-400 border border-rose-500/20">REJECTED</span>;
    case 'SPAM':
      return <span className="rounded-full bg-red-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-red-500 border border-red-500/20">SPAM</span>;
    default:
      return <span className="rounded-full bg-neutral-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-400">{status}</span>;
  }
}
