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
    description:
      'AXA AutoVend 50 is a coin- and UPI QR-operated sanitary napkin vending machine with 50-pad capacity for institutional settings.',
    page: SanitaryVendingB2BPage
  },
  'axa-ecoburn-100-sanitary-napkin-disposal-machine': {
    title: 'AXA Sanitary Napkin Disposal Machine | AXA Industries',
    description:
      'Explore AXA SND series sanitary napkin and mask incinerators, available in SND 100 to SND 600 variants with LCD temperature display and automatic cutoff.',
    page: SanitaryDisposalB2BPage
  },
  'axa-sense-10-1-touch-feedback-machine-kiosk': {
    title: 'AXA Swachh Toilet Feedback Machine | AXA Industries',
    description:
      'AXA Swachh Toilet Feedback Machine records Good, Average and Dirty washroom ratings with three feedback buttons and app-based live monitoring.',
    page: FeedbackMachineB2BPage
  },
  'axa-swi-3kw-solid-waste-incinerator': {
    title: 'AXA SWI 3kW Solid Waste Incinerator | AXA Industries',
    description:
      'AXA SWI 3kW solid waste incinerator for dry and medical waste, including PPE kits, masks, cotton and paper, with a stated 5–8 kg capacity.',
    page: SolidWasteIncineratorB2BPage
  },
  'axa-thermal-destroyer-100-solid-waste-incinerator': {
    title: 'AXA SWI 4.5kW Solid Waste Incinerator | AXA Industries',
    description:
      'AXA SWI 4.5kW solid waste incinerator for dry and medical waste, including PPE kits, masks, cotton and paper, with a stated 8–10 kg capacity.',
    page: SolidWaste45KwProductPage
  },
  'axa-cloth-bag-vending-machine-eco-dispenser': {
    title: 'AXA EcoVend Cloth Bag Vending Machine | AXA Industries',
    description:
      'AXA EcoVend is an automatic cotton cloth bag vending dispenser with coin and UPI QR payment options and capacity for 100+ folded bags.',
    page: ClothBagVendingB2BPage
  },
  'manual-sanitary-napkin-vending-machine': {
    title: 'AXA Manual Sanitary Napkin Vending Machine | AXA Industries',
    description:
      'AXA VND manual sanitary napkin vending machines are available in multiple capacities with a mechanical coin acceptor and no electricity requirement.',
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

  const ProductPage = product.page;
  return <ProductPage />;
}
