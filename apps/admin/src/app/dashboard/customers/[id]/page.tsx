'use client';

import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Customer } from '@axa/types';
import { CustomerOverview } from '../components/customer-overview';
import { CustomerStats } from '../components/customer-stats';
import { CustomerOrders } from '../components/customer-orders';
import { CustomerNotes } from '../components/customer-notes';
import { CustomerTimeline } from '../components/customer-timeline';
import { ArrowLeft, Edit, Trash2, Loader2, Download } from 'lucide-react';

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const { data: customer, isLoading, isError, refetch } = useQuery<Customer>({
    queryKey: ['customer', id],
    queryFn: async () => {
      const res = await apiClient(`/v1/customers/${id}`);
      return res.data;
    }
  });

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to soft delete this customer profile?')) return;
    try {
      await apiClient(`/v1/customers/${id}`, { method: 'DELETE' });
      router.push('/dashboard/customers');
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportCsv = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/v1/customers/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('axa_access_token')}`
        },
        body: JSON.stringify({ customerIds: [id], action: 'EXPORT' })
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `axa-customer-${id}.csv`;
      a.click();
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

  if (isError || !customer) {
    return (
      <div className="flex h-96 items-center justify-center text-xs text-red-400">
        Customer profile not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customers"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">{customer.name} Profile</h2>
            <p className="text-xs text-neutral-400">Enterprise Client Dashboard & Order History</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
          >
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
          <Link
            href={`/dashboard/customers/${id}/edit`}
            className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-200"
          >
            <Edit className="h-3.5 w-3.5" /> Edit Profile
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20"
          >
            <Trash2 className="h-3.5 w-3.5" /> Soft Delete
          </button>
        </div>
      </div>

      {/* SECTION 1 & 2: Overview & Contact Info */}
      <CustomerOverview customer={customer} />

      {/* SECTION 3: Customer Statistics */}
      <CustomerStats customer={customer} />

      {/* Grid: Order History (Left) & Internal Notes + Activity Feed (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SECTION 4: Order History */}
        <div className="lg:col-span-2">
          <CustomerOrders orders={customer.orders} />
        </div>

        {/* SECTION 5 & 6: Internal Notes & Timeline */}
        <div className="space-y-6">
          <CustomerNotes customerId={id} notes={customer.notesList || []} refetch={refetch} />
          <CustomerTimeline timeline={customer.timeline || []} />
        </div>
      </div>
    </div>
  );
}
