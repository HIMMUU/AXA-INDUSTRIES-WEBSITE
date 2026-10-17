export type AttributionTouch = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  gclid?: string;
  wbraid?: string;
  gbraid?: string;
  landing_page?: string;
  referrer?: string;
  page_title?: string;
  ts?: string;
};

export type LeadAttribution = {
  first_touch: AttributionTouch;
  last_touch: AttributionTouch;
  consent: boolean;
};

type StoredAttribution = {
  first_touch: AttributionTouch;
  last_touch: AttributionTouch;
  expires_at: number;
};

type TrackParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = 'axa-vending-analytics-consent';
const ATTRIBUTION_KEY = 'axa-vending-attribution';
const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

function readValue(key: string): string | null {
  try {
    const value = window.localStorage.getItem(key);
    if (value !== null) return value;
  } catch {
    // Cookie storage is the fallback when localStorage is unavailable.
  }

  try {
    const cookie = document.cookie
      .split('; ')
      .find((item) => item.startsWith(`${key}=`));
    return cookie ? decodeURIComponent(cookie.slice(key.length + 1)) : null;
  } catch {
    return null;
  }
}

function writeValue(key: string, value: string): void {
  let stored = false;
  try {
    window.localStorage.setItem(key, value);
    stored = true;
  } catch {
    // Fall back to a first-party cookie if browser storage is blocked.
  }

  if (!stored) {
    try {
      document.cookie = `${key}=${encodeURIComponent(value)}; Max-Age=7776000; Path=/; SameSite=Lax; Secure`;
    } catch {
      // Analytics and attribution are optional; the lead form remains independent.
    }
  }
}

export function getAnalyticsConsent(): boolean | null {
  const value = readValue(CONSENT_KEY);
  return value === 'accepted' ? true : value === 'rejected' ? false : null;
}

export function setAnalyticsConsent(consent: boolean): void {
  writeValue(CONSENT_KEY, consent ? 'accepted' : 'rejected');
}

function safeLandingPage(): string {
  const allowedParams = new URLSearchParams();
  const current = new URL(window.location.href);
  for (const [key, value] of current.searchParams.entries()) {
    if (/^utm_(source|medium|campaign|content|term)$/.test(key) || ['gclid', 'wbraid', 'gbraid'].includes(key)) {
      allowedParams.set(key, value.slice(0, 2048));
    }
  }
  const query = allowedParams.toString();
  return `${current.pathname}${query ? `?${query}` : ''}`.slice(0, 2048);
}

function externalReferrer(): string | undefined {
  if (!document.referrer) return undefined;
  try {
    const referrer = new URL(document.referrer);
    return referrer.origin === window.location.origin ? undefined : referrer.origin;
  } catch {
    return undefined;
  }
}

function getCurrentTouch(): AttributionTouch {
  const params = new URLSearchParams(window.location.search);
  const gclid = params.get('gclid') || undefined;
  const wbraid = params.get('wbraid') || undefined;
  const gbraid = params.get('gbraid') || undefined;
  const referrer = externalReferrer();
  const source =
    gclid || wbraid || gbraid
      ? 'google'
      : params.get('utm_source') || (referrer ? new URL(referrer).hostname : 'direct');

  return {
    source: source.slice(0, 100),
    medium: (gclid || wbraid || gbraid ? 'cpc' : params.get('utm_medium') || (referrer ? 'referral' : 'direct')).slice(0, 100),
    campaign: params.get('utm_campaign')?.slice(0, 200),
    content: params.get('utm_content')?.slice(0, 200),
    term: params.get('utm_term')?.slice(0, 200),
    gclid: gclid?.slice(0, 2048),
    wbraid: wbraid?.slice(0, 2048),
    gbraid: gbraid?.slice(0, 2048),
    landing_page: safeLandingPage(),
    referrer,
    page_title: document.title.slice(0, 300),
    ts: new Date().toISOString()
  };
}

export function captureLandingAttribution(): void {
  if (getAnalyticsConsent() !== true) return;

  let stored: StoredAttribution | null = null;
  try {
    const value = readValue(ATTRIBUTION_KEY);
    if (value) stored = JSON.parse(value) as StoredAttribution;
  } catch {
    stored = null;
  }

  const now = Date.now();
  const touch = getCurrentTouch();
  const currentHasCampaign =
    Boolean(touch.gclid || touch.wbraid || touch.gbraid || touch.campaign || touch.referrer);

  if (!stored || stored.expires_at <= now) {
    writeValue(
      ATTRIBUTION_KEY,
      JSON.stringify({
        first_touch: touch,
        last_touch: touch,
        expires_at: now + NINETY_DAYS_MS
      } satisfies StoredAttribution)
    );
    return;
  }

  if (currentHasCampaign) {
    writeValue(
      ATTRIBUTION_KEY,
      JSON.stringify({
        ...stored,
        last_touch: touch
      } satisfies StoredAttribution)
    );
  }
}

export function getLeadAttribution(): LeadAttribution {
  const consent = getAnalyticsConsent() === true;
  if (consent) {
    try {
      const value = readValue(ATTRIBUTION_KEY);
      if (value) {
        const stored = JSON.parse(value) as StoredAttribution;
        if (stored.expires_at > Date.now()) {
          return {
            first_touch: stored.first_touch,
            last_touch: stored.last_touch,
            consent: true
          };
        }
      }
    } catch {
      // Continue with a minimal direct attribution record.
    }
  }

  const directTouch: AttributionTouch = {
    source: 'direct',
    medium: 'direct',
    landing_page: window.location.pathname,
    page_title: document.title.slice(0, 300),
    ts: new Date().toISOString()
  };
  return { first_touch: directTouch, last_touch: directTouch, consent };
}

export function trackEvent(name: string, params: TrackParams = {}): void {
  if (getAnalyticsConsent() !== true) return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
    window.gtag =
      window.gtag ||
      ((...args: unknown[]) => {
        window.dataLayer?.push(args);
      });
    window.gtag?.('event', name, params);

    if (
      name === 'generate_lead' &&
      process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID &&
      process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
    ) {
      window.gtag?.('event', 'conversion', {
        send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL}`,
        value: 1,
        currency: 'INR'
      });
    }
  } catch {
    // Analytics failures must never affect enquiry submission or navigation.
  }
}
