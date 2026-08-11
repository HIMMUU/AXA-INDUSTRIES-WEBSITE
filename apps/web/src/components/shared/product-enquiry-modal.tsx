'use client';

import { useState } from 'react';
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
  source = 'QUICK_QUOTE'
}: ProductEnquiryModalProps) {
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    quantity: 1,
    message: '',
    honeypot: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/v1/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name || form.company || 'Valued Client',
          company: form.company || undefined,
          phone: form.phone || '+91 80764 96709',
          email: form.email || undefined,
          message: form.message || `Quick quote inquiry for ${productName || 'AXA Product'}`,
          quantity: form.quantity || 1,
          productId: productId || undefined,
          source: source || 'QUICK_QUOTE'
        })
      });
      const json = await res.json();
      if (json.success) {
        setSubmittedRef(json.data.referenceNumber);
      } else {
        alert(json.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#121216] p-6 shadow-2xl space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-neutral-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {submittedRef ? (
          <div className="py-8 text-center space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mx-auto">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Quotation Request Submitted!</h3>
            <p className="text-xs text-neutral-400">
              Reference Number:{' '}
              <span className="font-mono font-bold text-blue-400 text-sm">{submittedRef}</span>
            </p>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto">
              An AXA technical sales engineer will review your specs and email you within 2 business hours.
            </p>
            <button
              onClick={() => {
                setSubmittedRef(null);
                onClose();
              }}
              className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 border-b border-white/10 pb-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">Corporate Enquiry</span>
              <h3 className="text-lg font-bold text-white">
                {productName ? `Request Quote for ${productName}` : 'Request Custom Quote'}
              </h3>
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

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-neutral-300">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Robert Vance"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-neutral-300">Company Name</label>
                <input
                  type="text"
                  placeholder="Apex Energy Ltd"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-neutral-300">Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 9876543210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-neutral-300">Email Address</label>
                <input
                  type="email"
                  placeholder="r.vance@apexenergy.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-neutral-300">Quantity Required</label>
              <input
                type="number"
                min={1}
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value, 10) || 1 })}
                className="w-24 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-white focus:border-white/30 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-neutral-300">Requirements & Specs *</label>
              <textarea
                rows={3}
                required
                placeholder="Specify pressure ratings, flange dimensions, alloy materials..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-xl hover:bg-blue-500 transition active:scale-95 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Quote Request'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
