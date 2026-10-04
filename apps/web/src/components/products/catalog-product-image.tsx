'use client';

import { CldImage } from 'next-cloudinary';
import { Package } from 'lucide-react';
import type { Product } from '@axa/types';
import { isCloudinaryImageUrl } from '@/lib/catalog-products';

export function getCloudinaryProductImageUrl(product: Pick<Product, 'images'>): string | undefined {
  return (product.images ?? []).find(({ url }) => isCloudinaryImageUrl(url))?.url;
}

export function CatalogProductImage({
  src,
  alt,
  className
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div className={`flex h-full items-center justify-center text-neutral-500 ${className ?? ''}`}>
        <Package className="h-10 w-10" aria-hidden="true" />
      </div>
    );
  }

  return (
    <CldImage
      src={src}
      alt={alt}
      width={600}
      height={600}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      preserveTransformations
      loading="lazy"
      className={className}
    />
  );
}
