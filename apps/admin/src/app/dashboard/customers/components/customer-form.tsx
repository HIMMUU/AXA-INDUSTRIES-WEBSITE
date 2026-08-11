'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCustomerSchema, CreateCustomerInput, CustomerStatus, Customer } from '@axa/types';
import { apiClient } from '@/lib/api-client';
import { Save, Loader2, ArrowLeft, ShieldAlert } from 'lucide-react';

interface CustomerFormProps {
  initialData?: Customer;
  isEditing?: boolean;
}

export function CustomerForm({ initialData, isEditing = false }: CustomerFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CreateCustomerInput>({
    resolver: zodResolver(CreateCustomerSchema),
    defaultValues: {
      name: initialData?.name || '',
      company: initialData?.company || '',
      phone: initialData?.phone || '',
      email: initialData?.email || '',
      gst: initialData?.gst || '',
      addressLine1: initialData?.addressLine1 || initialData?.address || '',
      addressLine2: initialData?.addressLine2 || '',
      city: initialData?.city || '',
      state: initialData?.state || '',
      country: initialData?.country || 'India',
      postalCode: initialData?.postalCode || '',
      notes: initialData?.notes || '',
      status: initialData?.status || CustomerStatus.ACTIVE
    }
  });

  const statusValue = watch('status');

  const onSubmit = async (data: CreateCustomerInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const endpoint = isEditing ? `/v1/customers/${initialData?.id}` : '/v1/customers';
      const method = isEditing ? 'PATCH' : 'POST';

      const res = await apiClient(endpoint, {
        method,
        body: JSON.stringify(data)
      });

      if (res.success) {
        router.push(isEditing ? `/dashboard/customers/${initialData?.id}` : '/dashboard/customers');
      } else {
        setServerError(res.message || 'Operation failed');
      }
    } catch (err: any) {
      setServerError(err.message || 'An error occurred while saving customer profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
      {serverError && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-medium text-red-400">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              {isEditing ? `Edit ${initialData?.name}` : 'Create New Customer'}
            </h2>
            <p className="text-xs text-neutral-400">Manage AXA Industries client directory & details</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusValue}
            onChange={(e) => setValue('status', e.target.value as CustomerStatus)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white focus:outline-none cursor-pointer"
          >
            <option value={CustomerStatus.ACTIVE} className="bg-neutral-900">ACTIVE</option>
            <option value={CustomerStatus.INACTIVE} className="bg-neutral-900">INACTIVE</option>
            <option value={CustomerStatus.BLOCKED} className="bg-neutral-900">BLOCKED</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200 disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>{isEditing ? 'Save Profile' : 'Create Customer'}</span>
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Basic Information & Company</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-medium text-neutral-300">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              placeholder="Alex Mercer"
              {...register('name')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
            />
            {errors.name && <p className="text-[11px] font-medium text-red-400">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="company" className="text-xs font-medium text-neutral-300">
              Company Name (Optional)
            </label>
            <input
              id="company"
              type="text"
              placeholder="AXA Tech Corp"
              {...register('company')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-xs font-medium text-neutral-300">
              Phone Number *
            </label>
            <input
              id="phone"
              type="text"
              placeholder="+91 9876543210"
              {...register('phone')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-mono text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
            />
            {errors.phone && <p className="text-[11px] font-medium text-red-400">{errors.phone.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-medium text-neutral-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="alex.mercer@axatech.com"
              {...register('email')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
            />
            {errors.email && <p className="text-[11px] font-medium text-red-400">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="gst" className="text-xs font-medium text-neutral-300">
              GST Number (Optional)
            </label>
            <input
              id="gst"
              type="text"
              placeholder="27AAAAA0000A1Z5"
              {...register('gst')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-mono text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="rounded-3xl border border-white/10 bg-[#121216]/60 p-6 shadow-xl space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Address Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="addressLine1" className="text-xs font-medium text-neutral-300">
              Address Line 1
            </label>
            <input
              id="addressLine1"
              type="text"
              placeholder="124 Industrial Park, Sector 4"
              {...register('addressLine1')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="addressLine2" className="text-xs font-medium text-neutral-300">
              Address Line 2 (Optional)
            </label>
            <input
              id="addressLine2"
              type="text"
              placeholder="Near Main Plaza"
              {...register('addressLine2')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="city" className="text-xs font-medium text-neutral-300">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="Mumbai"
              {...register('city')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="state" className="text-xs font-medium text-neutral-300">
              State
            </label>
            <input
              id="state"
              type="text"
              placeholder="Maharashtra"
              {...register('state')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="postalCode" className="text-xs font-medium text-neutral-300">
              Postal Code
            </label>
            <input
              id="postalCode"
              type="text"
              placeholder="400001"
              {...register('postalCode')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-mono text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="country" className="text-xs font-medium text-neutral-300">
              Country
            </label>
            <input
              id="country"
              type="text"
              placeholder="India"
              {...register('country')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
