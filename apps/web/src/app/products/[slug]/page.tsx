import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SanitaryVendingB2BPage } from '@/components/products/sanitary-vending-b2b-page';
import { SanitaryDisposalB2BPage } from '@/components/products/sanitary-disposal-b2b-page';
import { ClothBagVendingB2BPage } from '@/components/products/cloth-bag-vending-b2b-page';
import { FeedbackMachineB2BPage } from '@/components/products/feedback-machine-b2b-page';
import { SolidWasteIncineratorB2BPage } from '@/components/products/solid-waste-incinerator-b2b-page';

function SolidWaste45KwProductPage() {
  return <SolidWasteIncineratorB2BPage initialVariant="SWI4.5KW" />;
}

function ManualSanitaryVendingProductPage() {
  return <SanitaryVendingB2BPage initialPricingCategory="manual" />;
}

const products = {
  'axa-autovend-50-sanitary-napkin-vending-machine': {
    title: 'AXA AutoVend 50 Sanitary Napkin Vending Machine | AXA Industries',
    name: 'AXA AutoVend 50 Sanitary Napkin Vending Machine',
    description:
      'AXA AutoVend 50 is a coin- and UPI QR-operated sanitary napkin vending machine with 50-pad capacity for institutional settings.',
    image:
      'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786306986/Autoomatic_vending_machine_outer_t8odma.jpg',
    page: SanitaryVendingB2BPage
  },
  'axa-ecoburn-100-sanitary-napkin-disposal-machine': {
    title: 'AXA Sanitary Napkin Disposal Machine | AXA Industries',
    name: 'AXA EcoBurn 100 Sanitary Napkin Disposal Machine',
    description:
      'Explore AXA SND series sanitary napkin and mask incinerators, available in SND 100 to SND 600 variants with LCD temperature display and automatic cutoff.',
    image:
      'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458267/mainsnd_mle9pt.jpg',
    page: SanitaryDisposalB2BPage
  },
  'axa-sense-10-1-touch-feedback-machine-kiosk': {
    title: 'AXA Swachh Toilet Feedback Machine | AXA Industries',
    name: 'AXA Sense 10.1 Touch Feedback Machine Kiosk',
    description:
      'AXA Swachh Toilet Feedback Machine records Good, Average and Dirty washroom ratings with three feedback buttons and app-based live monitoring.',
    image:
      'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786303502/Studio_product_photography_creation_2K_202608100044_mcmwez.png',
    page: FeedbackMachineB2BPage
  },
  'axa-swi-3kw-solid-waste-incinerator': {
    title: 'AXA SWI 3kW Solid Waste Incinerator | AXA Industries',
    name: 'AXA Solid Waste Incinerator Machine (SWI 3kW / 5-8kg)',
    description:
      'AXA SWI 3kW solid waste incinerator for dry and medical waste, including PPE kits, masks, cotton and paper, with a stated 5–8 kg capacity.',
    image: 'https://axaindustries.com/images/solid-waste-incinerator-5-8kg.jpg',
    page: SolidWasteIncineratorB2BPage
  },
  'axa-thermal-destroyer-100-solid-waste-incinerator': {
    title: 'AXA SWI 4.5kW Solid Waste Incinerator | AXA Industries',
    name: 'AXA Solid Waste Incinerator Machine (SWI 4.5kW / 8-10kg)',
    description:
      'AXA SWI 4.5kW solid waste incinerator for dry and medical waste, including PPE kits, masks, cotton and paper, with a stated 8–10 kg capacity.',
    image: 'https://axaindustries.com/images/solid-waste-incinerator-8-10kg.jpg',
    page: SolidWaste45KwProductPage
  },
  'axa-cloth-bag-vending-machine-eco-dispenser': {
    title: 'AXA EcoVend Cloth Bag Vending Machine | AXA Industries',
    name: 'AXA EcoVend Cloth Bag Vending Machine Dispenser',
    description:
      'AXA EcoVend is an automatic cotton cloth bag vending dispenser with coin and UPI QR payment options and capacity for 100+ folded bags.',
    image:
      'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786305121/CLOTH_BAG_VENNDING_COOMBO_pwx7d4.png',
    page: ClothBagVendingB2BPage
  },
  'manual-sanitary-napkin-vending-machine': {
    title: 'AXA Manual Sanitary Napkin Vending Machine | AXA Industries',
    name: 'AXA Manual Sanitary Napkin Vending Machine',
    description:
      'AXA VND manual sanitary napkin vending machines are available in multiple capacities with a mechanical coin acceptor and no electricity requirement.',
    image: undefined,
    page: ManualSanitaryVendingProductPage
  }
} as const;

type ProductSlug = keyof typeof products;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug as ProductSlug];

  if (!product) {
    notFound();
  }

  const canonical = `https://axaindustries.com/products/${slug}`;

  return {
    title: product.title,
    description: product.description,
    alternates: { canonical },
    openGraph: {
      title: product.title,
      description: product.description,
      url: canonical,
      type: 'website'
    }
  };
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products[slug as ProductSlug];

  if (!product) {
    notFound();
  }

  const canonical = `https://axaindustries.com/products/${slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${canonical}#product`,
    name: product.name,
    description: product.description,
    ...(product.image ? { image: product.image } : {}),
    brand: { '@type': 'Brand', name: 'AXA Industries' },
    url: canonical
  };

  const ProductPage = product.page;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c')
        }}
      />
      <ProductPage />
    </>
  );
}
