'use client';

import Link from 'next/link';
import { Enquiry } from '@axa/types';
import { formatDate } from '@axa/utils';
import { EnquiryStatusBadge } from '../../components/status-badge';
import { User, Building, Phone, Mail, MapPin, Calendar, ExternalLink } from 'lucide-react';

export function EnquiryOverview({ enquiry }: { enquiry: Enquiry }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* SECTION 1: Lead Information Summary */}
      <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">SECTION 1</span>
            <h3 className="text-base font-bold text-white">Lead Overview</h3>
          </div>
          <EnquiryStatusBadge status={enquiry.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-neutral-500 font-medium">Reference #</p>
            <p className="font-mono font-bold text-white mt-0.5">{enquiry.referenceNumber}</p>
          </div>
          <div>
            <p className="text-neutral-500 font-medium">Form Source</p>
            <p className="font-mono text-neutral-300 mt-0.5">{enquiry.source}</p>
          </div>
          <div>
            <p className="text-neutral-500 font-medium">Created Date</p>
            <p className="text-neutral-300 mt-0.5">{formatDate(enquiry.createdAt)}</p>
          </div>
          <div>
            <p className="text-neutral-500 font-medium">Preferred Contact</p>
            <p className="text-neutral-300 mt-0.5">
              {enquiry.preferredContactMethod || 'Any'} ({enquiry.preferredContactTime || 'Flexible'})
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Customer Contact Information */}
      <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">SECTION 2</span>
            <h3 className="text-base font-bold text-white">Customer Contact Details</h3>
          </div>

          {enquiry.customerId && (
            <Link
              href={`/dashboard/customers/${enquiry.customerId}`}
              className="flex items-center gap-1 text-xs text-blue-400 hover:underline"
            >
              <span>Customer Profile</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center gap-2.5">
            <User className="h-4 w-4 text-blue-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">{enquiry.name}</p>
              <p className="text-[11px] text-neutral-400">{enquiry.company || 'Individual Client'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
            <p className="font-mono text-white">{enquiry.phone}</p>
          </div>

          <div className="flex items-center gap-2.5">
            <Mail className="h-4 w-4 text-purple-400 shrink-0" />
            <p className="text-neutral-300">{enquiry.email || 'No email specified'}</p>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-neutral-300">
              {[enquiry.city, enquiry.state, enquiry.country].filter(Boolean).join(', ') || 'Location Not Specified'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
