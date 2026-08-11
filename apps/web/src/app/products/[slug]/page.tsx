import { SanitaryVendingB2BPage } from '@/components/products/sanitary-vending-b2b-page';
import { SanitaryDisposalB2BPage } from '@/components/products/sanitary-disposal-b2b-page';
import { ClothBagVendingB2BPage } from '@/components/products/cloth-bag-vending-b2b-page';
import { FeedbackMachineB2BPage } from '@/components/products/feedback-machine-b2b-page';
import { SolidWasteIncineratorB2BPage } from '@/components/products/solid-waste-incinerator-b2b-page';
import { GenericProductView } from '@/components/products/generic-product-view';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return [
    { slug: 'axa-ecoburn-100-sanitary-napkin-disposal-machine' },
    { slug: 'axa-autovend-50-sanitary-napkin-vending-machine' },
    { slug: 'sanitary-napkin-incinerator-machine-ecoburn-100' },
    { slug: 'automatic-sanitary-napkin-vending-machine-avnd50' },
    { slug: 'axa-sense-10-1-touch-feedback-machine-kiosk' },
    { slug: 'swachh-toilet-feedback-machine' },
    { slug: 'automatic-cloth-bag-vending-machine' },
    { slug: 'axa-cloth-bag-vending-machine-eco-dispenser' },
    { slug: 'axa-swi-3kw-solid-waste-incinerator' },
    { slug: 'axa-thermal-destroyer-100-solid-waste-incinerator' }
  ];
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug || '';

  // Immediate rendering for specialized B2B product pages
  if (slug.includes('solid-waste') || slug.includes('swi') || slug.includes('thermal-destroyer')) {
    return <SolidWasteIncineratorB2BPage />;
  }

  if (slug.includes('feedback') || slug.includes('sense') || slug.includes('toilet')) {
    return <FeedbackMachineB2BPage />;
  }

  if (slug.includes('cloth-bag') || slug.includes('cloth') || slug.includes('cbv')) {
    return <ClothBagVendingB2BPage />;
  }

  if (slug.includes('vending') || slug.includes('autovend')) {
    return <SanitaryVendingB2BPage />;
  }

  if (slug.includes('disposal') || slug.includes('incinerator')) {
    return <SanitaryDisposalB2BPage />;
  }

  let productData = null;
  try {
    const res = await fetch(`http://localhost:4000/api/v1/products/${slug}`, {
      signal: AbortSignal.timeout(400),
      next: { revalidate: 10 }
    });
    if (res.ok) {
      const json = await res.json();
      productData = json.data;
    }
  } catch (err) {
    // API server offline fallback
  }

  const fallbackProduct = productData || {
    id: 'fallback-1',
    name: slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) : 'AXA Industrial Precision Product',
    slug: slug,
    price: 1250,
    shortDescription: 'High-precision engineering product manufactured for industrial infrastructure.',
    description: 'AXA Industries manufactures enterprise-grade valves, pressure sensors, and precision equipment designed for chemical, petrochemical, and heavy manufacturing plants globally.',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [{ id: '1', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80', isPrimary: true }]
  };

  return <GenericProductView product={fallbackProduct as any} />;
}
