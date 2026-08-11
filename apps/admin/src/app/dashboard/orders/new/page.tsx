'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Customer, Product } from '@axa/types';
import {
  ShoppingBag,
  ArrowLeft,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  User,
  Package
} from 'lucide-react';

interface SelectedLineItem {
  productId: string;
  quantity: number;
  price: number;
}

export default function NewOrderPage() {
  const router = useRouter();
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [items, setItems] = useState<SelectedLineItem[]>([]);
  const [notes, setNotes] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);

  // Fetch Customers list
  const { data: customersData } = useQuery<{ items: Customer[] }>({
    queryKey: ['customers-list-picker'],
    queryFn: async () => {
      const res = await apiClient('/v1/customers?limit=100');
      return { items: res.data || [] };
    }
  });

  // Fetch Products list
  const { data: productsData } = useQuery<{ items: Product[] }>({
    queryKey: ['products-list-picker'],
    queryFn: async () => {
      const res = await apiClient('/v1/products?limit=100');
      return { items: res.data || [] };
    }
  });

  const customers = customersData?.items || [];
  const products = productsData?.items || [];

  const addLineItem = () => {
    if (products.length === 0) return;
    const defaultProduct = products[0];
    setItems([
      ...items,
      {
        productId: defaultProduct.id,
        quantity: 1,
        price: Number(defaultProduct.price)
      }
    ]);
  };

  const removeLineItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateLineItem = (index: number, field: keyof SelectedLineItem, value: any) => {
    const updated = [...items];
    if (field === 'productId') {
      const p = products.find((prod) => prod.id === value);
      updated[index] = {
        ...updated[index],
        productId: value,
        price: p ? Number(p.price) : updated[index].price
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setItems(updated);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!selectedCustomerId) {
        throw new Error('Please select a customer.');
      }
      if (items.length === 0) {
        throw new Error('Please add at least one product line item.');
      }
      return apiClient('/v1/orders', {
        method: 'POST',
        body: JSON.stringify({
          customerId: selectedCustomerId,
          items,
          notes
        })
      });
    },
    onSuccess: (res) => {
      if (res.data?.id) {
        router.push(`/dashboard/orders/${res.data.id}`);
      } else {
        router.push('/dashboard/orders');
      }
    },
    onError: (err: any) => {
      setServerError(err.message || 'Failed to create order.');
    }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/orders"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-blue-400" />
            <span>Create New Order</span>
          </h1>
          <p className="text-xs text-neutral-400">Manually issue an order for an existing customer.</p>
        </div>
      </div>

      {serverError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-medium text-red-400">
          {serverError}
        </div>
      )}

      {/* Form Card */}
      <div className="glass-panel rounded-3xl p-6 shadow-2xl border border-white/10 space-y-6">
        {/* Customer Selector */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
            <User className="h-4 w-4 text-blue-400" />
            <span>Select Customer *</span>
          </label>
          <select
            value={selectedCustomerId}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white focus:outline-none"
          >
            <option value="">-- Choose Customer --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.phone || c.email}) {c.company ? `- ${c.company}` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Line Items Picker */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
              <Package className="h-4 w-4 text-blue-400" />
              <span>Order Line Items *</span>
            </label>
            <button
              type="button"
              onClick={addLineItem}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-xs text-neutral-500">
              No products added yet. Click &quot;Add Item&quot; to attach products.
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5">
                  <select
                    value={item.productId}
                    onChange={(e) => updateLineItem(index, 'productId', e.target.value)}
                    className="flex-1 rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (${Number(p.price).toFixed(2)})
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateLineItem(index, 'quantity', Number(e.target.value))}
                      className="w-20 rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 text-xs text-white text-center"
                      placeholder="Qty"
                    />

                    <input
                      type="number"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateLineItem(index, 'price', Number(e.target.value))}
                      className="w-28 rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 text-xs text-white text-center font-mono"
                      placeholder="Price"
                    />

                    <div className="w-24 text-right text-xs font-mono font-semibold text-white">
                      ${(item.quantity * item.price).toFixed(2)}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeLineItem(index)}
                      className="p-2 text-neutral-400 hover:text-red-400 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notes & Summary */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">Order Notes (Optional)</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal delivery or payment terms notes..."
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
            <span className="text-xs text-neutral-400 font-medium">Calculated Order Total</span>
            <span className="text-xl font-bold text-white font-mono">
              ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/dashboard/orders"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition"
          >
            Cancel
          </Link>
          <button
            type="button"
            disabled={createMutation.isPending}
            onClick={() => createMutation.mutate()}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-neutral-200 transition disabled:opacity-50"
          >
            {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            <span>Issue Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}
