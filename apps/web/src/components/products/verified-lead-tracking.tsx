'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/landing-analytics';

type VerifiedLead = {
  institution_type: string;
  quantity_band: string;
  work_email_available: boolean;
};

export function VerifiedLeadTracking() {
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    try {
      const stored = window.sessionStorage.getItem('axa-vending-verified-lead');
      if (!stored) return;
      window.sessionStorage.removeItem('axa-vending-verified-lead');
      const lead = JSON.parse(stored) as VerifiedLead;
      if (
        typeof lead.institution_type !== 'string' ||
        typeof lead.quantity_band !== 'string' ||
        typeof lead.work_email_available !== 'boolean'
      ) return;

      trackEvent('generate_lead', {
        value: 1,
        currency: 'INR',
        institution_type: lead.institution_type,
        quantity_band: lead.quantity_band,
        work_email_available: lead.work_email_available
      });
    } catch {
      // A storage or analytics failure does not change the accepted enquiry.
    }
  }, []);

  return null;
}
