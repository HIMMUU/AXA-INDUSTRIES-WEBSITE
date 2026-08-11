'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@axa/types';
import { formatCurrency } from '@axa/utils';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ProductEnquiryModal } from '@/components/shared/product-enquiry-modal';
import { ArrowLeft, ShieldCheck, Sliders, Send, Share2, Check, MessageSquare, Sparkles, Download } from 'lucide-react';

export function GenericProductView({ product }: { product: Product }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const images = product.images || [];
  const currentImg = images[activeImgIdx]?.url || '/images/vending-combo-transparent.png';

  const slug = product.slug || '';
  const isVending = slug.includes('vending') || slug.includes('autovend');
  const isIncinerator = slug.includes('ecoburn') || slug.includes('snd') || (slug.includes('incinerator') && !slug.includes('solid') && !slug.includes('swi'));
  const isSolidWaste = slug.includes('solid') || slug.includes('swi') || slug.includes('destroyer') || slug.includes('biohazard');
  const isFeedback = slug.includes('sense') || slug.includes('feedback') || slug.includes('swachh');
  const isClothBag = slug.includes('cloth-bag');

  const themeBadge = isClothBag
    ? { label: 'Plastic-Free Eco Dispenser', color: 'border-[#B5AD9A]/40 bg-[#B5AD9A]/15 text-[#D1C9B8]' }
    : isIncinerator
      ? { label: 'Smokeless High-Temp Destruction', color: 'border-amber-500/30 bg-amber-500/10 text-amber-400' }
      : isSolidWaste
        ? { label: 'Heavy Duty Solid Waste Destroyer', color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' }
        : isFeedback
          ? { label: 'App Live CSAT Monitoring', color: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400' }
          : { label: 'Automatic Hygiene Dispenser', color: 'border-blue-500/30 bg-blue-500/10 text-blue-400' };

  // Category-specific brochure matching
  const categoryBrochure = isVending
    ? { url: '/documents/axa-vending-machine-catalog.pdf', filename: 'AXA-Sanitary-Napkin-Vending-Machine-Catalog.pdf', title: 'Download Vending Machine Brochure' }
    : isIncinerator
      ? { url: '/documents/axa-incinerator-catalog.pdf', filename: 'AXA-Sanitary-Napkin-Incinerator-Catalog.pdf', title: 'Download Incinerator Brochure' }
      : isSolidWaste
        ? { url: '/documents/axa-solid-waste-incinerator-catalog.pdf', filename: 'AXA-Solid-Waste-Incinerator-Catalog.pdf', title: 'Download Solid Waste Incinerator Brochure' }
        : isFeedback
          ? { url: '/documents/axa-feedback-machine-catalog.pdf', filename: 'AXA-Toilet-Feedback-Machine-Catalog.pdf', title: 'Download Toilet Feedback Machine Brochure' }
          : { url: '/documents/axa-master-catalog.pdf', filename: 'AXA-Industries-Official-Brochure.pdf', title: 'Download Official Brochure' };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <Link href="/products" className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition">
                <ArrowLeft className="h-3.5 w-3.5" /> Products
              </Link>
              <span>/</span>
              <span className="text-neutral-900 dark:text-white font-semibold truncate max-w-xs">{product.name}</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-3 py-1.5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied Link' : 'Share'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Product Image Viewer */}
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-square w-full overflow-hidden rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-900 shadow-2xl relative flex items-center justify-center p-6">
                <img src={currentImg} alt={product.name} className="h-full w-full object-contain" />
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={img.id || idx}
                      onClick={() => setActiveImgIdx(idx)}
                      className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition bg-neutral-900 p-1 ${
                        activeImgIdx === idx ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-neutral-200 dark:border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={`Thumb ${idx + 1}`} className="h-full w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Specs & Fast Quote CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${themeBadge.color}`}>
                  <Sparkles className="h-3 w-3" /> {themeBadge.label}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">{product.name}</h1>
                <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">{formatCurrency(product.price)}</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pt-2 border-t border-neutral-200 dark:border-white/10">
                  {product.shortDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-500 py-3.5 text-xs font-bold text-white shadow-xl shadow-blue-600/30 transition active:scale-95 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>Request Instant Fast Quote</span>
                </button>

                {/* Category-matched Download Brochure Button */}
                <a
                  href={categoryBrochure.url}
                  download={categoryBrochure.filename}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 py-3.5 text-xs font-bold text-neutral-800 dark:text-white transition"
                >
                  <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>{categoryBrochure.title} (PDF)</span>
                </a>

                <a
                  href={`https://wa.me/918076496709?text=Hi%20AXA%20Industries,%20I%20want%20a%20quotation%20for%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 py-3.5 text-xs font-bold text-emerald-400 transition"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat on WhatsApp (+91 8076496709)</span>
                </a>
              </div>

              <div className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#121216]/60 p-6 shadow-xl space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Detailed Specifications</h3>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">{product.description}</p>
              </div>

              <div className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#121216]/60 p-6 shadow-xl space-y-3">
                <div className="flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-500" />
                  <h3 className="text-xs font-semibold text-neutral-950 dark:text-white">Institutional Assurance</h3>
                </div>

                <div className="divide-y divide-neutral-200 dark:divide-white/5 border border-neutral-200 dark:border-white/5 rounded-2xl overflow-hidden">
                  <div className="flex justify-between p-3 text-xs">
                    <span className="font-medium text-neutral-500 dark:text-neutral-400">Certification</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">ISO 9001:2015 & CPCB Compliant</span>
                  </div>
                  <div className="flex justify-between p-3 text-xs">
                    <span className="font-medium text-neutral-500 dark:text-neutral-400">Warranty Coverage</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">3 Years Comprehensive</span>
                  </div>
                  <div className="flex justify-between p-3 text-xs">
                    <span className="font-medium text-neutral-500 dark:text-neutral-400">Delivery & Mounting</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">Pan-India Doorstep Dispatch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ProductEnquiryModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productId={product.id}
        productName={product.name}
        source="QUICK_QUOTE"
      />

      <Footer />
    </div>
  );
}
