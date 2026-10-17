'use client';

import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLeadAttribution } from '@/lib/landing-analytics';
import { getApiBaseUrl } from '@/lib/api-url';
import { trackEvent } from '@/lib/landing-analytics';

const institutionOptions = [
  ['school', 'School'],
  ['college-or-university', 'College or university'],
  ['hospital-or-clinic', 'Hospital or clinic'],
  ['bank', 'Bank'],
  ['corporate-office', 'Corporate office'],
  ['factory', 'Factory'],
  ['hostel', 'Hostel'],
  ['other', 'Other']
];

function createIdempotencyKey(): string {
  if (window.crypto.randomUUID) return window.crypto.randomUUID();
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function InstitutionalLeadForm() {
  const router = useRouter();
  const idempotencyKey = useRef<string | null>(null);
  const formStartedAt = useRef(Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const formStarted = useRef(false);

  const markFormStarted = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    trackEvent('form_start', { form_id: 'institutional-vending-enquiry' });
  };

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorMessage('');
    if (!idempotencyKey.current) idempotencyKey.current = createIdempotencyKey();

    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    const payload = {
      name: String(form.get('name') || '').trim(),
      organisation: String(form.get('organisation') || '').trim(),
      phone: String(form.get('phone') || '').trim(),
      ...(email ? { email } : {}),
      city: String(form.get('city') || '').trim(),
      institution_type: String(form.get('institution_type') || ''),
      quantity: String(form.get('quantity') || ''),
      message: String(form.get('message') || '').trim(),
      consent: form.get('consent') === 'on',
      company_url: String(form.get('company_url') || ''),
      form_started_at: formStartedAt.current,
      attribution: getLeadAttribution()
    };

    try {
      const response = await fetch(`${getApiBaseUrl()}/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey.current
        },
        credentials: 'omit',
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        const message =
          typeof result?.message === 'string'
            ? result.message
            : response.status === 429
              ? 'Too many attempts. Please wait a minute and try again.'
              : 'We could not submit your enquiry. Please review the fields and try again.';
        throw new Error(message);
      }

      const result = await response.json();
      const leadId = result?.data?.lead_id || result?.lead_id;
      if (!leadId) throw new Error('The enquiry could not be confirmed. Please try again.');

      try {
        window.sessionStorage.setItem(
          'axa-vending-verified-lead',
          JSON.stringify({
            institution_type: payload.institution_type,
            quantity_band: payload.quantity,
            work_email_available: Boolean(email)
          })
        );
      } catch {
        // A storage failure only suppresses attribution on the thank-you page.
      }
      router.push('/thank-you');
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'We could not submit your enquiry. Please call or WhatsApp AXA Industries.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={submitForm}
      onFocusCapture={markFormStarted}
      className="grid gap-4"
      noValidate={false}
    >
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company_url">Company website</label>
        <input
          id="company_url"
          name="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          Your name *
          <input name="name" required minLength={2} maxLength={80} autoComplete="name" className="min-h-12 rounded-xl border border-neutral-300 bg-white px-3 dark:border-white/15 dark:bg-neutral-950" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Institution or company name *
          <input name="organisation" required minLength={2} maxLength={120} autoComplete="organization" className="min-h-12 rounded-xl border border-neutral-300 bg-white px-3 dark:border-white/15 dark:bg-neutral-950" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Phone number *
          <input name="phone" type="tel" inputMode="tel" required autoComplete="tel" maxLength={20} placeholder="+91 98765 43210" className="min-h-12 rounded-xl border border-neutral-300 bg-white px-3 dark:border-white/15 dark:bg-neutral-950" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Work email (optional)
          <input name="email" type="email" maxLength={254} autoComplete="email" className="min-h-12 rounded-xl border border-neutral-300 bg-white px-3 dark:border-white/15 dark:bg-neutral-950" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          City *
          <input name="city" required minLength={2} maxLength={60} autoComplete="address-level2" className="min-h-12 rounded-xl border border-neutral-300 bg-white px-3 dark:border-white/15 dark:bg-neutral-950" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Institution type *
          <select name="institution_type" required defaultValue="" className="min-h-12 rounded-xl border border-neutral-300 bg-white px-3 dark:border-white/15 dark:bg-neutral-950">
            <option value="" disabled>Select institution type</option>
            {institutionOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
          Approximate quantity *
          <select name="quantity" required defaultValue="" className="min-h-12 rounded-xl border border-neutral-300 bg-white px-3 dark:border-white/15 dark:bg-neutral-950">
            <option value="" disabled>Select number of machines</option>
            <option value="1">1 machine</option>
            <option value="2-5">2–5 machines</option>
            <option value="6-20">6–20 machines</option>
            <option value="20+">More than 20 machines</option>
          </select>
        </label>
      </div>

      <label className="grid gap-1.5 text-sm font-medium">
        Requirements (optional)
        <textarea name="message" maxLength={1000} rows={4} placeholder="Tell us about your use case, preferred operating method or delivery location." className="rounded-xl border border-neutral-300 bg-white px-3 py-3 dark:border-white/15 dark:bg-neutral-950" />
      </label>

      <label className="flex items-start gap-3 text-sm leading-6">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-blue-700" />
        <span>
          I agree that AXA Industries may use these details to respond to my enquiry. See the{' '}
          <a href="/privacy-policy" className="font-semibold underline underline-offset-2">Privacy Policy</a>. *
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="min-h-12 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800 disabled:cursor-wait disabled:opacity-60"
      >
        {submitting ? 'Submitting…' : 'Get Institutional Quote'}
      </button>

      {errorMessage && <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-300">{errorMessage}</p>}
      <p className="text-xs text-neutral-500">Bulk requirements welcome · GST quotation available. Final model, price, taxes, delivery and terms are confirmed in writing.</p>
    </form>
  );
}
