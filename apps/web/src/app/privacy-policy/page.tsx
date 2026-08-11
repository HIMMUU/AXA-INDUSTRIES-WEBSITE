import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata = {
  title: 'Privacy Policy | AXA Industries',
  description: 'AXA Industries corporate privacy policy regarding corporate client data protection.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b border-neutral-200 dark:border-white/10 pb-6 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Corporate Privacy Policy</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Last updated: July 2026</p>
          </div>

          <div className="space-y-4 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">1. Corporate Data Protection</h2>
            <p>
              AXA Industries respects the confidentiality of corporate client information. We collect contact details, phone numbers, and project quote specifications solely for processing corporate enquiries and issuing formal quotes.
            </p>

            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">2. Customer Account Authentication</h2>
            <p>
              Browsers and public website visitors do not create user accounts or log in. Customer records are automatically generated when a formal quote or order enquiry is submitted.
            </p>

            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">3. Third-Party Sharing</h2>
            <p>
              AXA Industries does not sell, rent, or lease client data to external market aggregators. Data is used exclusively by our engineering sales team and logistics partners.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
