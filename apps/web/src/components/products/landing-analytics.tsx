'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import {
  captureLandingAttribution,
  GOOGLE_ADS_ID,
  trackEvent
} from '@/lib/landing-analytics';

const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const googleTagId = measurementId || GOOGLE_ADS_ID;

export function LandingAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
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
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}`}
        strategy="afterInteractive"
      />
      <Script id="axa-google-tags-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});${measurementId ? `gtag('config',${JSON.stringify(measurementId)},{send_page_view:false});` : ''}gtag('config',${JSON.stringify(GOOGLE_ADS_ID)});`}
      </Script>
    </>
  );
}
