import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact AXA Industries | Request a Product Quote',
  description:
    'Contact AXA Industries for sanitary napkin vending machines, incinerators and institutional hygiene equipment quotations.',
  alternates: { canonical: 'https://axaindustries.com/contact' },
  openGraph: {
    type: 'website',
    url: 'https://axaindustries.com/contact',
    title: 'Contact AXA Industries | Request a Product Quote',
    description:
      'Contact AXA Industries for sanitary napkin vending machines, incinerators and institutional hygiene equipment quotations.'
  }
};

export default function ContactLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
