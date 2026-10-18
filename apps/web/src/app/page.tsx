import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero';
import { TrustedBySection } from '@/components/sections/trusted-by';
import { FeaturedProductsSection } from '@/components/sections/featured-products';
import { WhyChooseUsSection } from '@/components/sections/why-choose-us';
import { StatsCounterSection } from '@/components/sections/stats-counter';
import { ProcessStepsSection } from '@/components/sections/process-steps';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { GallerySection } from '@/components/sections/gallery';
import { FaqAccordionSection } from '@/components/sections/faq-accordion';
import { CtaBannerSection } from '@/components/sections/cta-banner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CloudinaryVideoEmbed } from '@/components/shared/cloudinary-video-embed';

const homepageVideo = {
  publicId: 'IMG_4744_2_udzorf',
  posterUrl:
    'https://res.cloudinary.com/j0f3i5re/video/upload/so_0,w_960,h_540,c_limit,f_auto,q_auto/v1792271592/IMG_4744_2_udzorf.jpg'
};

export const metadata: Metadata = {
  title: 'Sanitary Napkin Vending Machines & Incinerators for Institutions | AXA Industries',
  description:
    'Explore manual and automatic sanitary napkin vending machines and sanitary napkin disposal equipment for schools, colleges, hostels and workplaces. Compare models and request a quote from AXA Industries.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://axaindustries.com/',
    title: 'Sanitary Napkin Vending Machines & Incinerators for Institutions | AXA Industries',
    description:
      'Compare sanitary napkin vending and disposal equipment for schools, colleges, hostels and workplaces across India.',
    images: [
      {
        url: homepageVideo.posterUrl,
        width: 960,
        height: 540,
        alt: 'AXA Industries product video'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanitary Napkin Vending Machines & Incinerators for Institutions | AXA Industries',
    description:
      'Compare sanitary napkin vending and disposal equipment for schools, colleges, hostels and workplaces across India.',
    images: [homepageVideo.posterUrl]
  }
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
        <section aria-labelledby="homepage-video-title" className="bg-neutral-50 py-12 dark:bg-white/[0.025] sm:py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300">
                AXA Industries product video
              </p>
              <h2 id="homepage-video-title" className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Explore Our Institutional Hygiene Equipment
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
                Watch the AXA Industries product video, then explore equipment options for your school, college, workplace or facility.
              </p>
            </div>
            <CloudinaryVideoEmbed
              publicId={homepageVideo.publicId}
              posterUrl={homepageVideo.posterUrl}
              title="AXA Industries institutional hygiene equipment"
            />
          </div>
        </section>
        <TrustedBySection />
        <FeaturedProductsSection />
        <WhyChooseUsSection />
        <StatsCounterSection />
        <ProcessStepsSection />
        <TestimonialsSection />
        <GallerySection />
        <FaqAccordionSection />
        <CtaBannerSection />
      </main>
      <Footer />
    </div>
  );
}
