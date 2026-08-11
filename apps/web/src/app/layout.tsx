import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AXA Industries | Official B2B E-Commerce & Institutional Portal',
  description: 'AXA Industries official business portal & catalogue for Sanitary Napkin Vending Machines, Incinerators, Cloth Bag Vending & Feedback Kiosks.',
  icons: {
    icon: [
      { url: '/images/axa-industries-logo.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    shortcut: '/images/axa-industries-logo.png',
    apple: '/images/axa-industries-logo.png'
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
        </ThemeProvider>
      </body>
    </html>
  );
}
