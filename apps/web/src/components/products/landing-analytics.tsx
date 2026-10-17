'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import {
  captureLandingAttribution,
  getAnalyticsConsent,
  setAnalyticsConsent,
  trackEvent
} from '@/lib/landing-analytics';

const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const adsConversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;

export function LandingAnalytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    setConsent(getAnalyticsConsent());
  }, []);

  useEffect(() => {
    if (consent !== true) return;
    captureLandingAttribution();
    trackEvent('page_view', {
      page_path: pathname,
      page_title: document.title
    });

    const specification = document.getElementById('specifications');
    if (!specification || !('IntersectionObserver' in window)) return;

    let sent = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!sent && entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)) {
          sent = true;
          trackEvent('view_product', { product_id: 'sanitary-napkin-vending-machine' });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(specification);
    return () => observer.disconnect();
  }, [consent, pathname]);

  const saveConsent = (value: boolean) => {
    setAnalyticsConsent(value);
    setConsent(value);
  };

  return (
    <>
      {consent === true && measurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
            strategy="afterInteractive"
          />
          <Script id="axa-analytics-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(measurementId)},{send_page_view:false});${adsConversionId ? `gtag('config',${JSON.stringify(adsConversionId)});` : ''}`}
          </Script>
        </>
      )}
      {consent === null && (
        <aside
          aria-label="Analytics preference"
          className="fixed inset-x-3 bottom-20 z-[60] mx-auto max-w-xl rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-neutral-900 sm:bottom-5"
        >
          <p className="text-sm font-semibold">Optional analytics</p>
          <p className="mt-1 text-xs leading-5 text-neutral-600 dark:text-neutral-300">
            Allow analytics cookies to measure this page and retain ad attribution for up to 90 days. Your enquiry form works either way. See our{' '}
            <a className="underline underline-offset-2" href="/privacy-policy">Privacy Policy</a>.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => saveConsent(false)}
              className="min-h-10 rounded-lg border border-neutral-300 px-4 text-sm font-semibold dark:border-white/20"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => saveConsent(true)}
              className="min-h-10 rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white"
            >
              Accept analytics
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
