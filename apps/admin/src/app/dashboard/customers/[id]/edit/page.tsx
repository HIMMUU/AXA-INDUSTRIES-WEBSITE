'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Customer } from '@axa/types';
import { CustomerForm } from '../../components/customer-form';
import { Loader2 } from 'lucide-react';

export default function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { data: customer, isLoading, isError } = useQuery<Customer>({
    queryKey: ['customer', id],
    queryFn: async () => {
      const res = await apiClient(`/v1/customers/${id}`);
      return res.data;
    }
  });

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
        Customer record not found.
      </div>
    );
  }

  return <CustomerForm initialData={customer} isEditing={true} />;
}
