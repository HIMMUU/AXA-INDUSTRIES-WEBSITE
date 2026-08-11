'use client';

import Link from 'next/link';
import { Enquiry } from '@axa/types';
import { formatCurrency } from '@axa/utils';
import { Package, MessageSquare, ExternalLink } from 'lucide-react';

export function EnquiryProductAndMessage({ enquiry }: { enquiry: Enquiry }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* SECTION 3: Requested Product */}
      <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 backdrop-blur-xl shadow-xl space-y-4">
        <div className="space-y-0.5 border-b border-white/10 pb-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">SECTION 3</span>
          <h3 className="text-base font-bold text-white">Requested Product Details</h3>
        </div>

        {enquiry.product ? (
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
              {enquiry.product.images?.[0]?.url ? (
                <img src={enquiry.product.images[0].url} alt={enquiry.product.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-neutral-600">
                  <Package className="h-6 w-6" />
                </div>
              )}
            </div>

            <div className="space-y-1 flex-1">
              <h4 className="text-sm font-bold text-white">{enquiry.product.name}</h4>
              <p className="text-xs font-mono text-blue-400 font-bold">
                Unit Price: {formatCurrency(enquiry.product.price)}
              </p>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-neutral-400 font-mono">Requested Quantity: {enquiry.quantity}</span>
                <Link
                  href={`/dashboard/products/${enquiry.product.id}`}
                  className="flex items-center gap-1 text-[11px] text-blue-400 hover:underline"
                >
                  View Product <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/5 text-neutral-400 text-xs">
            <Package className="h-5 w-5 text-neutral-500 shrink-0" />
            <span>General Corporate Inquiry (No specific product attached)</span>
          </div>
        )}
      </div>

      {/* SECTION 4: Customer Original Message */}
      <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <MessageSquare className="h-4 w-4 text-blue-400" />
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">SECTION 4</span>
            <h3 className="text-base font-bold text-white">Customer Message / Requirements</h3>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-xs text-neutral-200 leading-relaxed italic whitespace-pre-wrap">
          &quot;{enquiry.message}&quot;
        </div>
      </div>
    </div>
  );
}
