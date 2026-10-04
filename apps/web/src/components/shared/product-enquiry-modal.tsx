'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { EnquirySource } from '@axa/types';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ProductEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  productName?: string;
  source?: EnquirySource;
}

export function ProductEnquiryModal({
  isOpen,
  onClose,
  productId,
  productName,
  source = 'QUICK_QUOTE',
}: ProductEnquiryModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLInputElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    quantity: 1,
    message: '',
    honeypot: '',
  });

  const handleClose = useCallback(() => {
    setSubmittedRef(null);
    setSubmissionError(null);
    onClose();
  }, [onClose]);
  const handleCloseRef = useRef(handleClose);

  useEffect(() => {
    handleCloseRef.current = handleClose;
  }, [handleClose]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    initialFocusRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0);
      if (!focusableElements.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const focusIsOutsideDialog = !dialogRef.current?.contains(
        document.activeElement,
      );
      if (
        event.shiftKey &&
        (document.activeElement === firstElement || focusIsOutsideDialog)
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastElement || focusIsOutsideDialog)
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement.current?.focus();
      previouslyFocusedElement.current = null;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/v1/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name || form.company || 'Valued Client',
          company: form.company || undefined,
          phone: form.phone || '+91 80764 96709',
          email: form.email || undefined,
          message:
            form.message ||
            `Quick quote inquiry for ${productName || 'AXA Product'}`,
          quantity: form.quantity || 1,
          productId: productId || undefined,
          source: source || 'QUICK_QUOTE',
          honeypot: form.honeypot,
        }),
      });
      const json: unknown = await res.json();
      if (!res.ok || !isEnquiryResponse(json)) {
        throw new Error('The enquiry service did not confirm the submission.');
      }

      setSubmittedRef(json.data.referenceNumber);
    } catch (err) {
      console.error('Product enquiry submission failed.', err);
      setSubmissionError(
        'We could not confirm your request was received. Please try again, or contact us by phone or WhatsApp.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-enquiry-modal-title"
        tabIndex={-1}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/10 bg-[#121216] p-6 shadow-2xl space-y-4"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close quote request"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-neutral-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {submittedRef ? (
          <div className="py-8 text-center space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mx-auto">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h2
              id="product-enquiry-modal-title"
              className="text-xl font-bold text-white"
            >
              Quotation Request Submitted!
            </h2>
            <p className="text-xs text-neutral-400">
              Reference Number:{' '}
              <span className="font-mono font-bold text-blue-400 text-sm">
                {submittedRef}
              </span>
            </p>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto">
              An AXA technical sales engineer will review your specs and email
              you within 2 business hours.
            </p>
            <button
              type="button"
              onClick={() => {
                handleClose();
              }}
              className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 border-b border-white/10 pb-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                Corporate Enquiry
              </span>
              <h2
                id="product-enquiry-modal-title"
                className="text-lg font-bold text-white"
              >
                {productName
                  ? `Request Quote for ${productName}`
                  : 'Request Custom Quote'}
              </h2>
            </div>

            {/* Hidden Honeypot Field */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label
                  htmlFor="product-enquiry-name"
                  className="text-xs font-medium text-neutral-300"
                >
                  Full Name *
                </label>
                <input
                  ref={initialFocusRef}
                  id="product-enquiry-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Robert Vance"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="product-enquiry-company"
                  className="text-xs font-medium text-neutral-300"
                >
                  Company Name
                </label>
                <input
                  id="product-enquiry-company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Apex Energy Ltd"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label
                  htmlFor="product-enquiry-phone"
                  className="text-xs font-medium text-neutral-300"
                >
                  Phone Number *
                </label>
                <input
                  id="product-enquiry-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+91 9876543210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-mono text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="product-enquiry-email"
                  className="text-xs font-medium text-neutral-300"
                >
                  Email Address
                </label>
                <input
                  id="product-enquiry-email"
                  type="email"
                  autoComplete="email"
                  placeholder="r.vance@apexenergy.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="product-enquiry-quantity"
                className="text-xs font-medium text-neutral-300"
              >
                Quantity Required
              </label>
              <input
                id="product-enquiry-quantity"
                type="number"
                min={1}
                inputMode="numeric"
                value={form.quantity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    quantity: parseInt(e.target.value, 10) || 1,
                  })
                }
                className="w-24 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-white focus:border-white/30 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="product-enquiry-message"
                className="text-xs font-medium text-neutral-300"
              >
                Requirements & Specs *
              </label>
              <textarea
                id="product-enquiry-message"
                rows={3}
                required
                placeholder="Specify pressure ratings, flange dimensions, alloy materials..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
              />
            </div>

            {submissionError && (
              <p
                role="alert"
                aria-atomic="true"
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
              >
                {submissionError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-xl hover:bg-blue-500 transition active:scale-95 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span>
                {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function isEnquiryResponse(
  response: unknown,
): response is { success: true; data: { referenceNumber: string } } {
  if (typeof response !== 'object' || response === null) return false;

  const payload = response as {
    success?: unknown;
    data?: { referenceNumber?: unknown };
  };
  return (
    payload.success === true &&
    typeof payload.data?.referenceNumber === 'string' &&
    payload.data.referenceNumber.trim().length > 0
  );
}
