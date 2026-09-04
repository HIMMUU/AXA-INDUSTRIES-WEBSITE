'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Product } from '@axa/types';
import { StatusBadge } from '../components/status-badge';
import { formatCurrency, formatDate } from '@axa/utils';
import {
  ArrowLeft,
  Edit,
  Copy,
  Trash2,
  Package,
  Sparkles,
  Loader2,
  Sliders,
  Globe
} from 'lucide-react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await apiClient(`/v1/products/${id}`);
      return res.data;
    }
  });

  const handleDuplicate = async () => {
    try {
      const res = await apiClient(`/v1/products/${id}/duplicate`, { method: 'POST' });
      if (res.success && res.data) {
        router.push(`/dashboard/products/${res.data.id}/edit`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to soft delete this product?')) return;
    try {
      await apiClient(`/v1/products/${id}`, { method: 'DELETE' });
      router.push('/dashboard/products');
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

  if (isError || !product) {
    return (
      <div className="flex h-96 items-center justify-center text-xs text-red-400">
        Product not found or failed to load.
      </div>
    );
  }

  const activeImage = product.images?.[activeImageIdx]?.url;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/products"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-white">{product.name}</h2>
              <StatusBadge status={product.status} />
              {product.featured && <Sparkles className="h-4 w-4 text-amber-400" />}
            </div>
            <p className="text-xs font-mono text-neutral-400">/{product.slug}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDuplicate}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
          >
            <Copy className="h-3.5 w-3.5" /> Duplicate
          </button>
          <Link
            href={`/dashboard/products/${id}/edit`}
            className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-200"
          >
            <Edit className="h-3.5 w-3.5" /> Edit Product
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl">
            {activeImage ? (
              <Image src={activeImage} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-600">
                <Package className="h-16 w-16" />
              </div>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition ${
                    activeImageIdx === idx ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img.url} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Pricing, Specs & SEO */}
        <div className="space-y-6">
          {/* Price & Summary Card */}
          <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl space-y-3">
            <span className="text-xs font-medium text-neutral-400">Catalogue Price</span>
            <h3 className="text-3xl font-bold tracking-tight text-white">{formatCurrency(product.price)}</h3>
            <p className="text-xs text-neutral-300 leading-relaxed pt-2 border-t border-white/10">
              {product.shortDescription}
            </p>
          </div>

          {/* Full Description */}
          <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Description</h4>
            <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap">{product.description}</p>
          </div>

          {/* Technical Specifications */}
          <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-purple-400" />
              <h4 className="text-xs font-semibold text-white">Technical Specifications</h4>
            </div>

            {product.specifications && product.specifications.length > 0 ? (
              <div className="divide-y divide-white/5 border border-white/5 rounded-2xl overflow-hidden">
                {product.specifications.map((s) => (
                  <div key={s.id || s.key} className="flex justify-between p-3 text-xs">
                    <span className="font-medium text-neutral-400">{s.key}</span>
                    <span className="font-semibold text-white">{s.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500">No specifications defined for this product.</p>
            )}
          </div>

          {/* SEO Metadata */}
          <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="h-4 w-4 text-emerald-400" />
              <h4 className="text-xs font-semibold text-white">SEO & OpenGraph Metadata</h4>
            </div>
            <p className="text-xs text-neutral-400">
              <span className="font-semibold text-white">Meta Title:</span> {product.metaTitle || product.name}
            </p>
            <p className="text-xs text-neutral-400">
              <span className="font-semibold text-white">Meta Description:</span> {product.metaDescription || product.shortDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
