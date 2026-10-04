import { Product, ProductStatus } from '@axa/types';

export const CLOTH_BAG_VENDING_CLOUDINARY_IMAGE =
  'https://res.cloudinary.com/j0f3i5re/image/upload/v1786305121/CLOTH_BAG_VENNDING_COOMBO_pwx7d4.png';

const fallbackTimestamp = '2026-01-01T00:00:00.000Z';

function fallbackProduct(
  id: string,
  name: string,
  slug: string,
  shortDescription: string,
  description: string,
  price: number,
  image?: { url: string; publicId: string }
): Product {
  return {
    id,
    name,
    slug,
    shortDescription,
    description,
    price,
    status: ProductStatus.PUBLISHED,
    featured: true,
    images: image ? [{ ...image, order: 0 }] : [],
    specifications: [],
    createdAt: fallbackTimestamp,
    updatedAt: fallbackTimestamp
  };
}

export const catalogFallbackProducts: Product[] = [
  fallbackProduct(
    'fallback-autovend-50',
    'AXA AutoVend 50 Sanitary Napkin Vending Machine',
    'axa-autovend-50-sanitary-napkin-vending-machine',
    'Coin and UPI QR operated 50-pad capacity sanitary napkin vending machine.',
    'AXA AutoVend 50 sanitary napkin vending machine for schools, colleges, offices, and hospitals.',
    6600,
    {
      url: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786306986/Autoomatic_vending_machine_outer_t8odma.jpg',
      publicId: 'Autoomatic_vending_machine_outer_t8odma'
    }
  ),
  fallbackProduct(
    'fallback-cloth-bag-vending',
    'AXA EcoVend Cloth Bag Vending Machine Dispenser',
    'axa-cloth-bag-vending-machine-eco-dispenser',
    'Automatic cotton cloth bag vending dispenser with coin and UPI QR payment acceptor.',
    'AXA EcoVend cloth bag vending machine for retail centers, supermarkets, and municipal markets.',
    18500,
    {
      url: CLOTH_BAG_VENDING_CLOUDINARY_IMAGE,
      publicId: 'CLOTH_BAG_VENNDING_COOMBO_pwx7d4'
    }
  ),
  fallbackProduct(
    'fallback-snd',
    'AXA SND Sanitary Napkin & Mask Incinerator Machine',
    'axa-ecoburn-100-sanitary-napkin-disposal-machine',
    'Compact sanitary napkin and mask incinerator with LCD temperature display and automatic cutoff.',
    'AXA SND Series electric incinerators for sanitary napkins and masks, available in SND 100 to SND 600 models.',
    3800,
    {
      url: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458267/mainsnd_mle9pt.jpg',
      publicId: 'mainsnd_mle9pt'
    }
  ),
  fallbackProduct(
    'fallback-sense-10-1',
    'AXA Swachh Toilet Feedback Machine',
    'axa-sense-10-1-touch-feedback-machine-kiosk',
    'App-based washroom feedback system with Good, Average, and Dirty response buttons.',
    'AXA Swachh Toilet Feedback Machine provides three-button washroom feedback and app-based monitoring.',
    8500,
    {
      url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786303502/Studio_product_photography_creation_2K_202608100044_mcmwez.png',
      publicId: 'Studio_product_photography_creation_2K_202608100044_mcmwez'
    }
  ),
  fallbackProduct(
    'fallback-swi-4-5kw',
    'AXA Solid Waste Incinerator Machine (SWI 4.5kW / 8-10kg)',
    'axa-thermal-destroyer-100-solid-waste-incinerator',
    'Heavy-duty 4.5kW solid waste incinerator for dry and medical waste disposal.',
    'AXA SWI 4.5kW solid waste incinerator for larger institutional waste disposal.',
    215000,
    {
      url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786304387/ChatGPT_Image_Aug_10_2026_01_09_31_AM_krrlsc.png',
      publicId: 'ChatGPT_Image_Aug_10_2026_01_09_31_AM_krrlsc'
    }
  ),
  fallbackProduct(
    'fallback-manual-vnd',
    'AXA Manual Sanitary Napkin Vending Machine',
    'manual-sanitary-napkin-vending-machine',
    'Manual VND series sanitary napkin vending machine with mechanical coin acceptor and zero electricity requirement.',
    'AXA VND manual sanitary napkin vending machines are available in multiple pad capacities for institutional washrooms.',
    3500,
    {
      url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786306986/Autoomatic_vending_machine_interrnal_nv2phl.jpg',
      publicId: 'Autoomatic_vending_machine_interrnal_nv2phl'
    }
  )
];

const catalogProductSlugs = new Set(catalogFallbackProducts.map(({ slug }) => slug));

export function isCatalogProduct(product: Pick<Product, 'slug'>): boolean {
  return catalogProductSlugs.has(product.slug);
}

export function isCloudinaryImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.protocol === 'https:' &&
      parsedUrl.hostname === 'res.cloudinary.com' &&
      /\/image\/upload\/(?:[^/]+\/)*v\d+\//.test(parsedUrl.pathname)
    );
  } catch {
    return false;
  }
}

export function mergeCatalogProducts(apiProducts: Product[]): Product[] {
  const apiProductsBySlug = new Map(
    apiProducts.filter(isCatalogProduct).map((product) => [product.slug, product])
  );

  return catalogFallbackProducts.map((fallbackProduct) => {
    const apiProduct = apiProductsBySlug.get(fallbackProduct.slug);
    if (!apiProduct) return fallbackProduct;

    return {
      ...fallbackProduct,
      ...apiProduct,
      images: fallbackProduct.images
    };
  });
}
