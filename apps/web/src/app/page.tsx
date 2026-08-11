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

export const metadata = {
  title: 'AXA Industries | Smart Hygiene Vending & Environmental Incineration Systems',
  description: 'Leading manufacturer of Automatic Sanitary Napkin Vending Machines, EcoBurn Electric Incinerators, Cloth Bag Dispensers, Touch CSAT Feedback Kiosks, and Industrial Solid Waste Destroyers.'
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
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
