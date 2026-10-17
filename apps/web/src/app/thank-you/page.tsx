import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Phone } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { LandingAnalytics } from '@/components/products/landing-analytics';
import { TrackedContactLink } from '@/components/products/tracked-contact-link';
import { VerifiedLeadTracking } from '@/components/products/verified-lead-tracking';

export const metadata: Metadata = {
  title: 'Enquiry Received | AXA Industries',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://axaindustries.com/thank-you' }
};

export default function EnquiryThankYouPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 dark:bg-[#0A0A0C] dark:text-white">
      <Navbar />
      <main className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">Enquiry received</p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Thank you for contacting AXA Industries</h1>
        <p className="mt-4 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
          Your institutional vending machine enquiry has been submitted. The team will review the details and contact you. A response-time commitment is not published; if your request is time-sensitive, call or WhatsApp the team.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <TrackedContactLink
            href="https://wa.me/918595156873?text=Hi%20AXA%20Industries%2C%20I%20have%20submitted%20an%20institutional%20vending%20machine%20enquiry."
            kind="whatsapp"
            placement="thank-you"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp the team
          </TrackedContactLink>
          <TrackedContactLink
            href="tel:+918595156873"
            kind="call"
            placement="thank-you"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-neutral-300 px-5 py-3 font-bold dark:border-white/20"
          >
            <Phone aria-hidden="true" className="h-4 w-4" /> Call +91 85951 56873
          </TrackedContactLink>
        </div>
        <Link href="/sanitary-napkin-vending-machine" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline dark:text-blue-300">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to vending machine information
        </Link>
      </main>
      <Footer />
      <LandingAnalytics />
      <VerifiedLeadTracking />
    </div>
  );
}
