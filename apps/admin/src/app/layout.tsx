import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Portal | AXA Industries',
  description: 'AXA Industries Business E-Commerce & Order Management System'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased selection:bg-neutral-800 selection:text-white`}>
        <ThemeProvider>
          <QueryProvider>
            <Suspense fallback={
              <div className="flex min-h-screen items-center justify-center bg-[#0A0A0C] text-white">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              </div>
            }>
              {children}
            </Suspense>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
