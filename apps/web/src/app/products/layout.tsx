import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Institutional Hygiene & Waste-Management Products | AXA Industries',
  description:
    'Browse AXA Industries sanitary napkin vending machines, disposal equipment and institutional hygiene products.',
  alternates: { canonical: 'https://axaindustries.com/products' },
  openGraph: {
    type: 'website',
    url: 'https://axaindustries.com/products',
    title: 'Institutional Hygiene & Waste-Management Products | AXA Industries',
    description:
      'Browse AXA Industries sanitary napkin vending machines, disposal equipment and institutional hygiene products.'
  }
};

export default function ProductsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
