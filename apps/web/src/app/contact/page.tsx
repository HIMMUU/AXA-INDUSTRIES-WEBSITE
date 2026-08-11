'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get('fullName') || '').toString();
    const company = (formData.get('companyName') || '').toString();
    const email = (formData.get('emailAddress') || '').toString();
    const phone = (formData.get('phoneNumber') || '').toString();
    const message = (formData.get('messageText') || '').toString();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      await fetch(`${apiUrl}/v1/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || company || 'Valued Client',
          phone: phone || '+91 8076496709',
          email: email || undefined,
          company: company || undefined,
          message: message || 'Contact sales inquiry',
          quantity: 1,
          source: 'CONTACT_PAGE'
        })
      });
    } catch (err) {
      console.warn('Backend contact enquiry submission:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-500">Get In Touch</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Contact AXA Engineering Sales
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
              Submit your project specifications or custom quote parameters. Our technical engineering division responds within 2 business hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-7 rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-[#121216]/60 p-8 shadow-xl backdrop-blur-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Quote Request Received!</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                    Thank you. An AXA technical sales manager will review your parameters and email you a corporate invoice & CAD specifications.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-4 py-2 text-xs font-semibold text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/10"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">Request Custom Quote</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        placeholder="Robert Vance"
                        className="w-full rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none shadow-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="companyName" className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        Company Name
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        placeholder="Apex Energy Ltd"
                        className="w-full rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none shadow-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="emailAddress" className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        Corporate Email *
                      </label>
                      <input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        required
                        placeholder="r.vance@apexenergy.com"
                        className="w-full rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none shadow-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="phoneNumber" className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        Phone Number *
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        required
                        placeholder="+91 8076496709"
                        className="w-full rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 px-3.5 py-2.5 text-xs font-mono text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="messageText" className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      Project Specifications / Message *
                    </label>
                    <textarea
                      id="messageText"
                      name="messageText"
                      rows={4}
                      required
                      placeholder="Specify equipment requirements, incinerator capacity, vending machine counts, or custom specs..."
                      className="w-full rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 w-full rounded-2xl bg-blue-600 py-3 text-xs font-bold text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500 transition active:scale-95 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? 'Submitting Quote Request...' : 'Submit Quote Request'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Contact Details Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-[#121216]/60 p-8 shadow-xl backdrop-blur-xl space-y-6">
                <h3 className="text-base font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-white/10 pb-3">Corporate Headquarters</h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white">Registered Address</p>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mt-0.5">
                        E57/A, Gali No - 10, Harinagar EXTN Part - II, Jaitpur, Badarpur - 110044 New Delhi, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white">Direct Call & Support</p>
                      <p className="font-mono text-neutral-700 dark:text-neutral-300 mt-0.5">+91 8076496709 / +91 8595156873</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white">Official Email Enquiries</p>
                      <p className="font-mono text-neutral-700 dark:text-neutral-300 mt-0.5">axaclub1@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white">Business Hours</p>
                      <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">Monday – Saturday: 09:00 – 19:00 IST</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-white/10 flex items-center gap-2 text-[11px] text-neutral-600 dark:text-neutral-400">
                  <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>ISO 9001:2015 Quality Assured Response Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
