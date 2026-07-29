'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductSchema, CreateProductInput, ProductStatus, Product } from '@axa/types';
import { apiClient } from '@/lib/api-client';
import { ImageUploader } from './image-uploader';
import { SpecificationsBuilder } from './specifications-builder';
import { SeoPanel } from './seo-panel';
import { slugify } from '@axa/utils';
import { Save, Loader2, ArrowLeft, Eye, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProductFormProps {
  initialData?: Product;
  isEditing?: boolean;
}

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<CreateProductInput>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      shortDescription: initialData?.shortDescription || '',
      description: initialData?.description || '',
      price: initialData?.price ? Number(initialData.price) : 0,
      status: initialData?.status || ProductStatus.DRAFT,
      featured: initialData?.featured || false,
      metaTitle: initialData?.metaTitle || '',
      metaDescription: initialData?.metaDescription || '',
      images: initialData?.images || [],
      specifications: initialData?.specifications || []
    }
  });

  const nameValue = watch('name');
  const slugValue = watch('slug');
  const statusValue = watch('status');
  const featuredValue = watch('featured');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue('name', val);
    if (!isEditing && (!slugValue || slugValue === slugify(nameValue))) {
      setValue('slug', slugify(val));
    }
  };

  const onSubmit = async (data: CreateProductInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const endpoint = isEditing ? `/v1/products/${initialData?.id}` : '/v1/products';
      const method = isEditing ? 'PATCH' : 'POST';

      const res = await apiClient(endpoint, {
        method,
        body: JSON.stringify(data)
      });

      if (res.success) {
        router.push('/dashboard/products');
      } else {
        setServerError(res.message || 'Operation failed');
      }
    } catch (err: any) {
      setServerError(err.message || 'An error occurred while saving product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-medium text-red-400">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/dashboard/products')}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              {isEditing ? `Edit ${initialData?.name}` : 'Create New Product'}
            </h2>
            <p className="text-xs text-neutral-400">Enterprise Product Catalogue Management</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Switcher Buttons */}
          <select
            value={statusValue}
            onChange={(e) => setValue('status', e.target.value as ProductStatus)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white focus:outline-none cursor-pointer"
          >
            <option value={ProductStatus.DRAFT} className="bg-neutral-900">Status: DRAFT</option>
            <option value={ProductStatus.PUBLISHED} className="bg-neutral-900">Status: PUBLISHED</option>
            <option value={ProductStatus.HIDDEN} className="bg-neutral-900">Status: HIDDEN</option>
            <option value={ProductStatus.ARCHIVED} className="bg-neutral-900">Status: ARCHIVED</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200 active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>{isEditing ? 'Update Product' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main 2 Columns: Basic Info, Specifications, Images & SEO */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Basic Information */}
          <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Section 1: Basic Information</h3>

            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-medium text-neutral-300">
                Product Name *
              </label>
              <input
                id="name"
                type="text"
                placeholder="AXA Industrial Valve V1"
                {...register('name')}
                onChange={handleNameChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
              />
              {errors.name && <p className="text-[11px] font-medium text-red-400">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="slug" className="text-xs font-medium text-neutral-300">
                URL Slug (Auto-generated)
              </label>
              <input
                id="slug"
                type="text"
                placeholder="axa-industrial-valve-v1"
                {...register('slug')}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-mono text-neutral-300 placeholder-neutral-500 focus:border-white/30 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="shortDescription" className="text-xs font-medium text-neutral-300">
                Short Description (Summary) *
              </label>
              <input
                id="shortDescription"
                type="text"
                placeholder="High-pressure stainless steel valve engineered for industrial applications."
                {...register('shortDescription')}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
              />
              {errors.shortDescription && (
                <p className="text-[11px] font-medium text-red-400">{errors.shortDescription.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="description" className="text-xs font-medium text-neutral-300">
                Full Product Description *
              </label>
              <textarea
                id="description"
                rows={5}
                placeholder="Detailed technical overview, performance parameters, and features..."
                {...register('description')}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
              />
              {errors.description && (
                <p className="text-[11px] font-medium text-red-400">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Section 3: Cloudinary Images */}
          <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Section 3: Product Images (Cloudinary CDN)
            </h3>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <ImageUploader images={field.value || []} onChange={field.onChange} />
              )}
            />
          </div>

          {/* Section 4: Specifications */}
          <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl">
            <Controller
              name="specifications"
              control={control}
              render={({ field }) => (
                <SpecificationsBuilder specifications={field.value || []} onChange={field.onChange} />
              )}
            />
          </div>

          {/* Section 5: SEO Panel */}
          <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl">
            <SeoPanel
              metaTitle={watch('metaTitle') || ''}
              metaDescription={watch('metaDescription') || ''}
              slug={slugValue}
              productName={nameValue}
              onMetaTitleChange={(val) => setValue('metaTitle', val)}
              onMetaDescriptionChange={(val) => setValue('metaDescription', val)}
            />
          </div>
        </div>

        {/* Sidebar 1 Column: Pricing, Visibility & Featured Toggle */}
        <div className="space-y-6">
          {/* Section 2: Pricing */}
          <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Section 2: Pricing</h3>

            <div className="space-y-1.5">
              <label htmlFor="price" className="text-xs font-medium text-neutral-300">
                Price (USD $) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 font-semibold text-xs">$</span>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="499.00"
                  {...register('price', { valueAsNumber: true })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-8 pr-3.5 text-xs text-white font-semibold placeholder-neutral-500 focus:border-white/30 focus:outline-none"
                />
              </div>
              {errors.price && <p className="text-[11px] font-medium text-red-400">{errors.price.message}</p>}
            </div>
          </div>

          {/* Section 6: Visibility & Featured */}
          <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Section 6: Visibility & Status</h3>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3.5">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <div>
                  <p className="text-xs font-semibold text-white">Featured Product</p>
                  <p className="text-[10px] text-neutral-400">Showcase on storefront homepage</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={featuredValue}
                onChange={(e) => setValue('featured', e.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
