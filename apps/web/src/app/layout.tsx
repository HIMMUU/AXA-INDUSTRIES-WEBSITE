import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { StickyContactWidget } from '@/components/shared/sticky-contact-widget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://axaindustries.com'),
  title: 'Sanitary Napkin Vending Machines & Incinerators | AXA Industries',
  description: 'Compare sanitary napkin vending machines, pad dispensers and sanitary napkin incinerators for schools, colleges, hostels and institutions across India. Request an itemized quote from AXA Industries.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'AXA Industries',
    title: 'Sanitary Napkin Vending Machines & Incinerators | AXA Industries',
    description: 'Institutional sanitary napkin vending, disposal and hygiene equipment. Compare models and request a quote.',
    url: 'https://axaindustries.com/',
    locale: 'en_IN'
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' }
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#0A0A0C]">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            </div>
          }>
            {children}
          </Suspense>
          <StickyContactWidget />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://axaindustries.com/#website',
              url: 'https://axaindustries.com/',
              name: 'AXA Industries',
              inLanguage: 'en-IN'
            }).replace(/</g, '\\u003c')
          }}
        />
      </body>
    </html>
  );
}
