import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, MessageCircle, Phone } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { InstitutionalLeadForm } from '@/components/products/lead-form';
import { InstitutionalProductCards } from '@/components/products/institutional-product-cards';
import { CloudinaryVideoEmbed } from '@/components/shared/cloudinary-video-embed';
import { TrackedContactLink } from '@/components/products/tracked-contact-link';

const canonical = 'https://axaindustries.com/sanitary-napkin-vending-machine';
const heroImage =
  'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786306986/Autoomatic_vending_machine_outer_t8odma.jpg';

export const metadata: Metadata = {
  title: 'Sanitary Napkin Vending Machine for Institutions | AXA Industries',
  description:
    'Compare sanitary napkin vending machines for schools, colleges, hospitals, banks and offices. Share your requirements with AXA Industries for an institutional quotation.',
  alternates: { canonical },
  openGraph: {
    type: 'website',
    url: canonical,
    title: 'Sanitary Napkin Vending Machine for Institutions | AXA Industries',
    description:
      'Compare sanitary napkin vending machine options for institutional use and request a quotation from AXA Industries.',
    images: [{ url: heroImage, width: 1024, height: 1024, alt: 'AXA sanitary napkin vending machine' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanitary Napkin Vending Machine for Institutions | AXA Industries',
    description:
      'Compare sanitary napkin vending machine options for institutional use and request a quotation.',
    images: [heroImage]
  }
};

const vendingVideo = {
  videoUrl:
    'https://res.cloudinary.com/j0f3i5re/video/upload/f_mp4,q_auto:good,vc_h264,ac_aac/v1792271592/IMG_4744_2_udzorf.mp4',
  posterUrl: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1792358307/IMG_1258_nwqxjn.jpg'
};
const institutionalVideo = {
  videoUrl:
    'https://res.cloudinary.com/j0f3i5re/video/upload/f_mp4,q_auto:good,vc_h264,ac_aac/v1792271619/1792225113703428_2_qvhbu7.mp4',
  posterUrl: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1792358307/IMG_1257_zawiiq.jpg'
};

const faqs = [
  {
    question: 'How do I get a price for a sanitary napkin vending machine?',
    answer:
      'Share the institution type, city, required quantity and preferred operating method in the form. AXA Industries can provide a written quotation for the selected model and confirm taxes, delivery and other terms.'
  },
  {
    question: 'Can AXA provide a GST quotation?',
    answer:
      'GST quotations are available. The written quotation should confirm the selected model, applicable tax, delivery and any other agreed charges.'
  },
  {
    question: 'Which machine capacity should my school or college choose?',
    answer:
      'AXA’s current model list includes 25-, 50-, 100- and 200-pad capacities. Choose based on expected use and refill arrangements, then ask AXA to confirm the model and its current specifications.'
  },
  {
    question: 'Are coin-operated and push-button models available?',
    answer:
      'The published AXA model list includes coin or multi-coin operation and push-button options. Confirm the operation and dispensing configuration for the model in your quotation.'
  },
  {
    question: 'Can I request machines for multiple locations?',
    answer:
      'Yes. Include the number of machines and each delivery location in your enquiry so the sales team can respond with a suitable institutional quotation.'
  },
  {
    question: 'What are the power and mounting requirements?',
    answer:
      'Requirements differ by model. The current model list identifies some manual models as requiring no electricity; ask AXA for the selected model’s power input, mounting arrangement and dimensions before installation.'
  },
  {
    question: 'Does AXA provide installation, maintenance and warranty support?',
    answer:
      'Availability and terms depend on the selected model and site. Ask AXA to state the warranty period, installation scope, maintenance expectations and service coverage in writing before placing an order.'
  },
  {
    question: 'How quickly will AXA respond to my enquiry?',
    answer:
      'A fixed response-time commitment is not published here. The team will review the submitted details; for a time-sensitive request, call or WhatsApp AXA Industries directly.'
  }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      '@id': `${canonical}#product`,
      name: 'Sanitary Napkin Vending Machine (Institutional)',
      brand: { '@type': 'Brand', name: 'AXA Industries' },
      category: 'Sanitary Napkin Vending Machine',
      audience: {
        '@type': 'Audience',
        audienceType: 'Schools, colleges, hospitals, banks, corporate offices, factories and hostels'
      },
      url: canonical,
      image: heroImage
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer }
      }))
    }
  ]
};

const modelOptions = [
  { name: 'AVND 50 H', capacity: '50 pads', operation: 'Coin / multi-coin', orientation: 'Horizontal' },
  { name: 'AVND 50 H Push Button', capacity: '50 pads', operation: 'Push button', orientation: 'Horizontal' },
  { name: 'AVND 50 V', capacity: '50 pads', operation: 'Coin / multi-coin', orientation: 'Vertical' }
];

const applications = [
  {
    title: 'Schools and colleges',
    text: 'Plan access around washroom location, student use, refill ownership and the institution’s dispensing policy.'
  },
  {
    title: 'Banks and corporate offices',
    text: 'Consider staff and visitor access, washroom placement and whether the selected dispensing method fits workplace operations.'
  },
  {
    title: 'Hospitals and clinics',
    text: 'Review the intended user groups, washroom layout and refill process with the facility team before selecting capacity.'
  },
  {
    title: 'Factories and hostels',
    text: 'Estimate demand across shifts or resident groups and identify who will monitor stock and arrange refills.'
  }
];

function QuoteLink({ children = 'Get Institutional Quote' }: { children?: string }) {
  return (
    <Link
      href="#enquiry"
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
    >
      {children}<ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  );
}

export default function InstitutionalVendingLandingPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 dark:bg-[#0A0A0C] dark:text-white">
      <Navbar />
      <main className="pb-16 pt-24 sm:pt-28">
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-6 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-20">
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
              AXA Industries · Institutional Equipment
            </p>
            <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Sanitary Napkin Vending Machines for Institutions
            </h1>
            <p className="max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-300 sm:text-lg">
              Compare vending machine options for schools, colleges, hospitals, banks, offices and other facilities. Tell us your location and requirement to request a quotation.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <QuoteLink />
              <TrackedContactLink
                href="https://wa.me/918595156873?text=Hi%20AXA%20Industries%2C%20I%20need%20an%20institutional%20quotation%20for%20a%20sanitary%20napkin%20vending%20machine."
                kind="whatsapp"
                placement="hero"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-700 px-5 py-3 text-sm font-bold text-emerald-800 dark:border-emerald-400 dark:text-emerald-300"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp Our Team
              </TrackedContactLink>
            </div>
            <p className="text-xs font-medium text-neutral-500">Bulk requirements welcome · GST quotation available</p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-3xl bg-violet-50 dark:bg-white/[0.04]">
            <Image
              src={heroImage}
              alt="AXA AutoVend sanitary napkin vending machine for institutional washrooms"
              width={1024}
              height={1024}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-full w-full object-contain p-5"
            />
          </div>
        </section>

        <InstitutionalProductCards />

        <section aria-label="Institutional quotation information" className="border-y border-neutral-200 bg-violet-50/70 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 text-center text-sm font-semibold sm:grid-cols-3 sm:px-6 lg:px-8">
            <p>Bulk requirements welcome</p>
            <p>GST quotation available</p>
            <p>Model-specific details confirmed in writing</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">Product overview</p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Plan convenient access at your premises</h2>
          </div>
          <div className="space-y-4 leading-7 text-neutral-600 dark:text-neutral-300">
            <p>Schools, colleges, workplaces and care facilities may choose to make sanitary napkins accessible within their premises. Machine capacity, placement, the dispensing policy and the refill process should be planned for the people who use each facility.</p>
            <p>An automatic vending machine stores napkins for dispensing through its selected operating method. AXA’s listed models include coin or multi-coin and push-button options. Compare the model details and confirm the intended configuration before procurement.</p>
          </div>
        </section>

        <section className="bg-neutral-50 py-14 dark:bg-white/[0.025] sm:py-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">Product features</p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Compare listed automatic vending options</h2>
              <p className="mt-3 leading-7 text-neutral-600 dark:text-neutral-300">Capacity and operating method below come from AXA’s current model selector. Confirm the selected model’s final specification and availability in your quotation.</p>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {modelOptions.map((model) => (
                <article key={model.name} className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-[#121216]">
                  <h3 className="text-lg font-bold">{model.name}</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between gap-4"><dt className="text-neutral-500">Listed capacity</dt><dd className="font-semibold">{model.capacity}</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-neutral-500">Operation</dt><dd className="text-right font-semibold">{model.operation}</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-neutral-500">Orientation</dt><dd className="font-semibold">{model.orientation}</dd></div>
                  </dl>
                  <p className="mt-4 border-t border-neutral-200 pt-3 text-xs leading-5 text-neutral-500 dark:border-white/10">Confirm dimensions, power input, mounting and current price for this model.</p>
                </article>
              ))}
            </div>
            <div className="mt-6"><QuoteLink /></div>
            <p className="mt-2 text-xs text-neutral-500">Bulk requirements welcome · GST quotation available</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">Product demonstration</p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Watch AXA Industries Video Reels</h2>
              <p className="mt-3 leading-7 text-neutral-600 dark:text-neutral-300">See our short vertical videos about vending equipment and institutional applications. Each video loads when you press play.</p>
            </div>
            <div className="mt-8 grid justify-items-center gap-6 sm:grid-cols-2">
              <CloudinaryVideoEmbed
                videoUrl={vendingVideo.videoUrl}
                posterUrl={vendingVideo.posterUrl}
                title="AXA sanitary napkin vending machine reel"
              />
              <CloudinaryVideoEmbed
                videoUrl={institutionalVideo.videoUrl}
                posterUrl={institutionalVideo.posterUrl}
                title="AXA institutional equipment reel"
              />
            </div>
          </div>
          <div className="mt-5">
            <QuoteLink>Request Quote</QuoteLink>
            <p className="mt-2 text-xs text-neutral-500">Bulk requirements welcome · GST quotation available</p>
          </div>
        </section>

        <section id="specifications" className="scroll-mt-24 bg-violet-50/60 py-14 dark:bg-violet-950/10 sm:py-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">Specifications</p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Check the procurement details before ordering</h2>
              <p className="mt-3 leading-7 text-neutral-600 dark:text-neutral-300">The current product selector lists the following capacity and operation details. The remaining installation values are model-specific and should be confirmed from the current datasheet.</p>
            </div>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 bg-white dark:border-white/10 dark:bg-[#121216]">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-neutral-100 dark:bg-white/5">
                  <tr><th className="p-4">Listed model</th><th className="p-4">Capacity</th><th className="p-4">Operating method</th><th className="p-4">Orientation</th></tr>
                </thead>
                <tbody>
                  {modelOptions.map((model) => (
                    <tr key={model.name} className="border-t border-neutral-200 dark:border-white/10">
                      <th scope="row" className="p-4 font-semibold">{model.name}</th><td className="p-4">{model.capacity}</td><td className="p-4">{model.operation}</td><td className="p-4">{model.orientation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-5 grid gap-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300 sm:grid-cols-2">
              {['Dimensions and mounting arrangement', 'Power input and electrical requirements', 'Consumable compatibility and refill procedure', 'Warranty, delivery and installation terms'].map((item) => (
                <li key={item} className="flex gap-2"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />Confirm {item.toLowerCase()} for the selected model before purchase.</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="applications" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">Applications</p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">One Machine for Every Institution</h2>
              <p className="mt-3 leading-7 text-neutral-600 dark:text-neutral-300">Plan capacity, placement and replenishment around each site’s users and operating policy.</p>
              <div className="mt-4">
                <TrackedContactLink
                  href="https://wa.me/918595156873?text=Hi%20AXA%20Industries%2C%20I%20want%20to%20discuss%20a%20vending%20machine%20for%20my%20institution."
                  kind="whatsapp"
                  placement="applications"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-700 px-5 py-3 text-sm font-bold text-emerald-800 dark:border-emerald-400 dark:text-emerald-300"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" /> Enquire for Your Institution
                </TrackedContactLink>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {applications.map((application) => (
                <article key={application.title} className="rounded-2xl border border-neutral-200 p-5 dark:border-white/10">
                  <h3 className="font-bold">{application.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{application.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="combined-solution" className="bg-neutral-50 py-12 dark:bg-white/[0.025]">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">Related equipment</p>
              <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">Plan vending and disposal together</h2>
              <p className="mt-2 max-w-3xl leading-7 text-neutral-600 dark:text-neutral-300">Institutions evaluating a vending machine may also compare a separate sanitary waste disposal or incinerator solution. Discuss the use case and request separate product details and a quotation.</p>
            </div>
            <Link href="/sanitary-napkin-incinerator" className="inline-flex shrink-0 items-center gap-2 font-bold text-blue-700 hover:underline dark:text-blue-300">Explore disposal options <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">Installation and support</p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Confirm site requirements with the quotation</h2>
            <p className="mt-3 leading-7 text-neutral-600 dark:text-neutral-300">Power, mounting, delivery, installation availability, warranty and maintenance arrangements depend on the selected model and delivery site. Request these details in writing before procurement.</p>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {['Selected model, capacity and dispensing configuration', 'Dimensions, wall suitability and mounting hardware', 'Electrical requirements and any power backup details', 'GST, freight, delivery timeline and installation scope', 'Warranty period, exclusions and maintenance contact'].map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-neutral-200 p-4 text-sm leading-6 dark:border-white/10">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />
                <span>Ask AXA to confirm {item.toLowerCase()}.</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-violet-50/60 py-14 dark:bg-violet-950/10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">Frequently asked questions</p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Institutional procurement questions</h2>
            <div className="mt-6 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-[#121216]">
              {faqs.map((faq) => (
                <details key={faq.question} className="group p-5">
                  <summary className="cursor-pointer font-bold">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="enquiry" className="scroll-mt-24 mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">Institutional enquiry</p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Request a quotation for your institution</h2>
            <p className="mt-3 leading-7 text-neutral-600 dark:text-neutral-300">Share the machine quantity, institution type and city. The AXA team can follow up to clarify the model and quotation details.</p>
            <p className="mt-4 text-sm font-semibold">Bulk requirements welcome · GST quotation available</p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121216] sm:p-7">
            <InstitutionalLeadForm />
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 p-3 backdrop-blur md:hidden dark:border-white/10 dark:bg-neutral-950/95">
        <div className="mx-auto flex max-w-md gap-2">
          <QuoteLink />
          <TrackedContactLink
            href="tel:+918595156873"
            kind="call"
            placement="mobile-sticky"
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-300 px-3 text-sm font-bold dark:border-white/20"
          >
            <Phone aria-hidden="true" className="h-4 w-4" /> Call
          </TrackedContactLink>
        </div>
      </div>

      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
    </div>
  );
}
