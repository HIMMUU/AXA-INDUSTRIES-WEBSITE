'use client';

import { Customer } from '@axa/types';
import { CustomerStatusBadge } from './status-badge';
import { formatDate } from '@axa/utils';
import { Building, Phone, Mail, MapPin, CreditCard, Calendar } from 'lucide-react';

interface CustomerOverviewProps {
  customer: Customer;
}

export function CustomerOverview({ customer }: CustomerOverviewProps) {
  const initial = customer.name.charAt(0).toUpperCase();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Section 1: Customer Overview Card */}
      <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 text-xl font-bold text-white shadow-inner">
              {initial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{customer.name}</h3>
                <CustomerStatusBadge status={customer.status} />
              </div>
              {customer.company && (
                <p className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
                  <Building className="h-3.5 w-3.5 text-neutral-500" /> {customer.company}
                </p>
              )}
            </div>
          </div>

          <div className="text-xs text-neutral-400 flex items-center gap-1.5 font-mono">
            <Calendar className="h-3.5 w-3.5 text-neutral-500" /> Joined {formatDate(customer.createdAt)}
          </div>
        </div>

        {/* Section 2: Contact Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1">
              <Phone className="h-3 w-3 text-neutral-500" /> Phone Number
            </span>
            <p className="font-semibold text-white font-mono">{customer.phone}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1">
              <Mail className="h-3 w-3 text-neutral-500" /> Email Address
            </span>
            <p className="font-semibold text-white truncate">{customer.email || 'N/A'}</p>
          </div>

          {customer.gst && (
            <div className="space-y-1 sm:col-span-2">
              <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1">
                <CreditCard className="h-3 w-3 text-neutral-500" /> GST Identification Number
              </span>
              <p className="font-semibold text-white font-mono">{customer.gst}</p>
            </div>
          )}
        </div>
      </div>

      {/* Address Card */}
      <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl space-y-3">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <MapPin className="h-4 w-4 text-purple-400" />
          <h4 className="text-xs font-semibold text-white">Shipping & Billing Address</h4>
        </div>

        <div className="space-y-1 text-xs leading-relaxed text-neutral-300">
          <p className="font-medium text-white">{customer.addressLine1 || customer.address || 'No primary address recorded'}</p>
          {customer.addressLine2 && <p className="text-neutral-400">{customer.addressLine2}</p>}
          <p className="text-neutral-400">
            {[customer.city, customer.state, customer.postalCode].filter(Boolean).join(', ')}
          </p>
          <p className="font-semibold text-neutral-200">{customer.country || 'India'}</p>
        </div>
      </div>
    </div>
  );
}
