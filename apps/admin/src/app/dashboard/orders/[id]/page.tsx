'use client';

import { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { Order, OrderStatus } from '@axa/types';
import {
  ShoppingBag,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Trash2,
  Loader2
} from 'lucide-react';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ['order-detail', id],
    queryFn: async () => {
      const res = await apiClient(`/v1/orders/${id}`);
      return res.data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (status: OrderStatus) => {
      return apiClient(`/v1/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-detail', id] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return apiClient(`/v1/orders/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      router.push('/dashboard/orders');
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8 text-center text-neutral-400">
        Order not found or has been deleted.
      </div>
    );
  }

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20"><Clock className="h-3.5 w-3.5" /> Pending</span>;
      case 'CONFIRMED':
        return <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20"><CheckCircle2 className="h-3.5 w-3.5" /> Confirmed</span>;
      case 'COMPLETED':
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20"><CheckCircle2 className="h-3.5 w-3.5" /> Completed</span>;
      case 'CANCELLED':
        return <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 border border-red-500/20"><XCircle className="h-3.5 w-3.5" /> Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/orders"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white font-mono flex items-center gap-2">
              <span>{order.orderNumber}</span>
              {getStatusBadge(order.status)}
            </h1>
            <p className="text-xs text-neutral-400">Placed on {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Quick Status Stepper Controls */}
        <div className="flex items-center gap-2">
          {order.status === 'PENDING' && (
            <button
              onClick={() => updateStatusMutation.mutate('CONFIRMED')}
              disabled={updateStatusMutation.isPending}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition"
            >
              Confirm Order
            </button>
          )}
          {(order.status === 'PENDING' || order.status === 'CONFIRMED') && (
            <button
              onClick={() => updateStatusMutation.mutate('COMPLETED')}
              disabled={updateStatusMutation.isPending}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition"
            >
              Mark Completed
            </button>
          )}
          {order.status !== 'CANCELLED' && (
            <button
              onClick={() => updateStatusMutation.mutate('CANCELLED')}
              disabled={updateStatusMutation.isPending}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition"
            >
              Cancel Order
            </button>
          )}
          <button
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className="p-2 rounded-xl border border-white/10 bg-white/5 text-neutral-400 hover:text-red-400 transition"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Customer Profile & Order Line Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Profile Card */}
          <div className="glass-panel rounded-3xl p-6 shadow-2xl border border-white/10 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <User className="h-4 w-4 text-blue-400" />
              <span>Customer Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-neutral-400">Name</div>
                <div className="text-sm font-semibold text-white mt-0.5">{order.customer?.name || 'Walk-in Customer'}</div>
              </div>
              {order.customer?.company && (
                <div>
                  <div className="text-xs text-neutral-400">Company</div>
                  <div className="text-sm font-semibold text-white mt-0.5">{order.customer.company}</div>
                </div>
              )}
              <div>
                <div className="text-xs text-neutral-400">Phone</div>
                <div className="text-sm font-mono text-white mt-0.5">{order.customer?.phone || 'N/A'}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-400">Email</div>
                <div className="text-sm font-mono text-white mt-0.5">{order.customer?.email || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="glass-panel rounded-3xl p-6 shadow-2xl border border-white/10 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-400" />
              <span>Order Line Items</span>
            </h2>

            <div className="divide-y divide-white/5">
              {order.items?.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">{item.product?.name || 'Product'}</div>
                    <div className="text-xs text-neutral-500 font-mono">Qty: {item.quantity} × ${Number(item.price).toFixed(2)}</div>
                  </div>
                  <div className="text-sm font-bold text-white font-mono">
                    ${(item.quantity * Number(item.price)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Financial Totals Breakdown & Notes */}
        <div className="space-y-6">
          {/* Total Breakdown */}
          <div className="glass-panel rounded-3xl p-6 shadow-2xl border border-white/10 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-400" />
              <span>Financial Summary</span>
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-mono text-white">${Number(order.totalAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Tax (GST)</span>
                <span className="font-mono text-white">$0.00</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                <span>Grand Total</span>
                <span className="font-mono text-blue-400">${Number(order.totalAmount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes Card */}
          {order.notes && (
            <div className="glass-panel rounded-3xl p-6 shadow-2xl border border-white/10 space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Order Notes</h2>
              <p className="text-xs text-neutral-300 whitespace-pre-wrap">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
