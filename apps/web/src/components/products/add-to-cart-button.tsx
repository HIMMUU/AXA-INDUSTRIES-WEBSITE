'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import type { Product } from '@axa/types';
import { useCart } from '@/providers/cart-provider';

export function AddToCartButton({
  product,
  className = ''
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${className}`}
      aria-label={`Add ${product.name} to cart`}
    >
      {added ? <Check className="h-4 w-4" aria-hidden="true" /> : <ShoppingCart className="h-4 w-4" aria-hidden="true" />}
      {added ? 'Added to cart' : 'Add to cart'}
    </button>
  );
}
