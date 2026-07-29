'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Product } from '@axa/types';
import { ProductForm } from '../../components/product-form';
import { Loader2 } from 'lucide-react';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await apiClient(`/v1/products/${id}`);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center bg-[#0A0A0C] text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
          <p className="text-xs text-neutral-500 font-mono">Loading Product Data...</p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex h-96 items-center justify-center text-center text-xs text-red-400">
        Product not found or failed to load.
      </div>
    );
  }

  return <ProductForm initialData={product} isEditing={true} />;
}
