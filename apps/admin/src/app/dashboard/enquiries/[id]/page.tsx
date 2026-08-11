'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Enquiry, EnquiryStatus } from '@axa/types';
import { EnquiryOverview } from './components/enquiry-overview';
import { EnquiryProductAndMessage } from './components/enquiry-product';
import { EnquiryNotes } from './components/enquiry-notes';
import { EnquiryTimelineFeed } from './components/enquiry-timeline';
import {
  ArrowLeft,
  UserCheck,
  ShoppingCart,
  Trash2,
  Loader2,
  Mail,
  PhoneCall,
  Sliders,
  Check
} from 'lucide-react';

export default function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [isConvertingCustomer, setIsConvertingCustomer] = useState(false);
  const [isConvertingOrder, setIsConvertingOrder] = useState(false);

  const { data: enquiry, isLoading, isError, refetch } = useQuery<Enquiry>({
    queryKey: ['enquiry', id],
    queryFn: async () => {
      const res = await apiClient(`/v1/enquiries/${id}`);
      return res.data;
    }
  });

  const handleStatusChange = async (status: EnquiryStatus) => {
    try {
      await apiClient(`/v1/enquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleConvertToCustomer = async () => {
    setIsConvertingCustomer(true);
    try {
      const res = await apiClient(`/v1/enquiries/${id}/convert-customer`, {
        method: 'POST'
      });
      refetch();
      if (res.data?.id) {
        router.push(`/dashboard/customers/${res.data.id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsConvertingCustomer(false);
    }
  };

  const handleConvertToOrder = async () => {
    setIsConvertingOrder(true);
    try {
      await apiClient(`/v1/enquiries/${id}/convert-order`, {
        method: 'POST'
      });
      refetch();
      alert('Lead successfully converted to Pending Order!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsConvertingOrder(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to soft delete this lead enquiry?')) return;
    try {
      await apiClient(`/v1/enquiries/${id}`, { method: 'DELETE' });
      router.push('/dashboard/enquiries');
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center text-white">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (isError || !enquiry) {
    return (
      <div className="flex h-96 items-center justify-center text-xs text-red-400">
        Enquiry record not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/enquiries"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-white">
                Enquiry #{enquiry.referenceNumber}
              </h2>
            </div>
            <p className="text-xs text-neutral-400">Submitted by {enquiry.name} ({enquiry.company || 'Individual'})</p>
          </div>
        </div>

        {/* SECTION 7: Action Controls & Status Converter */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Status Select */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-2 py-1">
            <Sliders className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
            <select
              value={enquiry.status}
              onChange={(e) => handleStatusChange(e.target.value as EnquiryStatus)}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
            >
              <option value="NEW" className="bg-neutral-900 text-white">Status: NEW</option>
              <option value="CONTACTED" className="bg-neutral-900 text-white">Status: CONTACTED</option>
              <option value="INTERESTED" className="bg-neutral-900 text-white">Status: INTERESTED</option>
              <option value="QUOTATION_SENT" className="bg-neutral-900 text-white">Status: QUOTATION SENT</option>
              <option value="CONVERTED" className="bg-neutral-900 text-white">Status: CONVERTED</option>
              <option value="CLOSED" className="bg-neutral-900 text-white">Status: CLOSED</option>
              <option value="REJECTED" className="bg-neutral-900 text-white">Status: REJECTED</option>
              <option value="SPAM" className="bg-neutral-900 text-white">Status: SPAM</option>
            </select>
          </div>

          {/* Convert to Customer Button */}
          <button
            onClick={handleConvertToCustomer}
            disabled={isConvertingCustomer || enquiry.status === 'CONVERTED'}
            className="flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3.5 py-2 text-xs font-semibold text-blue-400 hover:bg-blue-500/20 disabled:opacity-50"
          >
            {isConvertingCustomer ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <UserCheck className="h-3.5 w-3.5" />}
            <span>{enquiry.customerId ? 'Linked Customer' : 'Convert to Customer'}</span>
          </button>

          {/* Convert to Order Button */}
          <button
            onClick={handleConvertToOrder}
            disabled={isConvertingOrder}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20"
          >
            {isConvertingOrder ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShoppingCart className="h-3.5 w-3.5" />}
            <span>Convert to Order</span>
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
            title="Soft Delete Enquiry"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* SECTION 1 & 2: Lead Overview & Contact Details */}
      <EnquiryOverview enquiry={enquiry} />

      {/* SECTION 3 & 4: Requested Product & Customer Message */}
      <EnquiryProductAndMessage enquiry={enquiry} />

      {/* Grid: SECTION 5 Internal Notes & SECTION 6 Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnquiryNotes enquiryId={id} notes={enquiry.notesList || []} refetch={refetch} />
        <EnquiryTimelineFeed timeline={enquiry.timeline || []} />
      </div>
    </div>
  );
}
