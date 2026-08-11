'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  Send,
  MessageSquare,
  Download
} from 'lucide-react';

/*
  Attribution Reference:
  <!-- This hero was inspired and implemented based on the implementation at https://crazygl.com/hero/masked-text-carousel -->
  <!-- Original implementation by @ybouane https://x.com/ybouane -->
*/

interface CarouselSlide {
  heading: string;
  subheading: string;
  caption: string;
  image: string;
  slug: string;
  category: string;
  price: string;
  badge: string;
  colorTheme: 'pink' | 'blue' | 'emerald' | 'rose' | 'sand';
  scaleClass?: string;
}

const HERO_SLIDES: CarouselSlide[] = [
  {
    heading: 'VENDING',
    subheading: 'Automatic Sanitary Napkin Vending Machine',
    caption: '01 — Model AVND50H',
    image: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786383062/ChatGPT_Image_Aug_10_2026_10_59_46_PM_1_kvcdy8.png',
    slug: 'axa-autovend-50-sanitary-napkin-vending-machine',
    category: 'Hygiene Automation',
    price: '₹6,200',
    badge: '50-Pad Storage • LCD Display & Battery Backup',
    colorTheme: 'pink',
    scaleClass: 'scale-[1.15] sm:scale-[1.28] lg:scale-[1.38]'
  },
  {
    heading: 'CLOTH BAG',
    subheading: 'Automatic Eco-Friendly Cloth Bag Vending Machine',
    caption: '02 — Model CBVND100',
    image: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786305121/CLOTH_BAG_VENNDING_COOMBO_pwx7d4.png',
    slug: 'axa-cloth-bag-vending-machine-eco-dispenser',
    category: 'Eco-Friendly Automation',
    price: '₹18,500',
    badge: '100+ Bag Capacity • Coin / UPI QR Payment • Heavy-Duty Steel Enclosure',
    colorTheme: 'sand'
  },
  {
    heading: 'DISPOSAL',
    subheading: 'Sanitary Napkin Incinerator',
    caption: '03 — Model EcoBurn 100',
    image: '/images/disposal-combo-transparent.png',
    slug: 'axa-ecoburn-100-sanitary-napkin-disposal-machine',
    category: 'Thermal Waste Treatment',
    price: '₹12,499',
    badge: 'Ceramic Insulation • Auto Cut-Off Timer',
    colorTheme: 'pink'
  },
  {
    heading: 'FEEDBACK',
    subheading: 'Smart Washroom & CSAT Feedback Terminal',
    caption: '04 — Model Sense 3B / 10.1',
    image: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786303502/Studio_product_photography_creation_2K_202608100044_mcmwez.png',
    slug: 'axa-sense-10-1-touch-feedback-machine-kiosk',
    category: 'Washroom & Hygiene Automation',
    price: '₹14,999',
    badge: 'Real-Time CSAT Analytics • 4G Cloud Reporting • Instant SMS Supervisor Alerts',
    colorTheme: 'blue'
  },
  {
    heading: 'INDUSTRIAL',
    subheading: 'Solid & Bio-Medical Waste Incinerator',
    caption: '05 — Thermal Destroyer 100',
    image: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786304387/ChatGPT_Image_Aug_10_2026_01_09_31_AM_krrlsc.png',
    slug: 'axa-thermal-destroyer-100-solid-waste-incinerator',
    category: 'Solid Waste Systems',
    price: '₹2,45,000',
    badge: 'Dual Combustion Chamber • Wet Scrubber',
    colorTheme: 'blue'
  }
];

export function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Autoplay Effect
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Pointer Parallax Effect
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPointer({ x: x * 30, y: y * 20 });
  };

  // Per-Frame Mask Synchronization (CrazyGL Technique)
  useEffect(() => {
    let animId: number;
    const syncMask = () => {
      if (slideRef.current && imgRef.current && overlayRef.current) {
        const sr = slideRef.current.getBoundingClientRect();
        const ir = imgRef.current.getBoundingClientRect();
        overlayRef.current.style.maskSize = `${ir.width}px ${ir.height}px`;
        overlayRef.current.style.webkitMaskSize = `${ir.width}px ${ir.height}px`;
        overlayRef.current.style.maskPosition = `${ir.left - sr.left}px ${ir.top - sr.top}px`;
        overlayRef.current.style.webkitMaskPosition = `${ir.left - sr.left}px ${ir.top - sr.top}px`;

      }
      animId = requestAnimationFrame(syncMask);
    };
    animId = requestAnimationFrame(syncMask);
    return () => cancelAnimationFrame(animId);
  }, [activeIdx]);

  const currentSlide = HERO_SLIDES[activeIdx];
  const theme = currentSlide.colorTheme || 'pink';

  // Dynamic Theme Styling Tokens
  const orbClass = {
    pink: "bg-pink-600/10 dark:bg-pink-500/15",
    blue: "bg-blue-600/10 dark:bg-blue-500/15",
    emerald: "bg-emerald-600/10 dark:bg-emerald-500/15",
    rose: "bg-rose-500/10 dark:bg-rose-400/15",
    sand: "bg-[#B5AD9A]/20 dark:bg-[#B5AD9A]/25"
  }[theme];

  const pillBadgeClass = {
    pink: "border-pink-500/30 bg-pink-500/10 text-pink-600 dark:text-pink-400",
    blue: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    rose: "border-rose-400/30 bg-rose-400/10 text-rose-500 dark:text-rose-300",
    sand: "border-[#B5AD9A]/40 bg-[#B5AD9A]/15 text-[#B5AD9A] dark:text-[#D4CDBC]"
  }[theme];

  const headingColorClass = {
    pink: "text-pink-600 dark:text-pink-500",
    blue: "text-blue-600 dark:text-blue-500",
    emerald: "text-emerald-600 dark:text-emerald-500",
    rose: "text-rose-500 dark:text-rose-400",
    sand: "text-[#B5AD9A] dark:text-[#C8C0AE]"
  }[theme];

  const strokeColor = {
    pink: '#EC4899',
    blue: '#3B82F6',
    emerald: '#10B981',
    rose: '#FB7185',
    sand: '#B5AD9A'
  }[theme];

  const categoryAccentClass = {
    pink: "text-pink-600 dark:text-pink-400",
    blue: "text-blue-600 dark:text-blue-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
    rose: "text-rose-500 dark:text-rose-300",
    sand: "text-[#B5AD9A] dark:text-[#D4CDBC]"
  }[theme];

  const primaryButtonClass = {
    pink: "bg-pink-600 hover:bg-pink-500 shadow-pink-600/30 text-white",
    blue: "bg-blue-600 hover:bg-blue-500 shadow-blue-600/30 text-white",
    emerald: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30 text-white",
    rose: "bg-rose-500 hover:bg-rose-400 shadow-rose-500/30 text-white",
    sand: "bg-[#B5AD9A] hover:bg-[#a69e8b] shadow-[#B5AD9A]/30 text-neutral-950 font-bold"
  }[theme];

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 40;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    } else if (isRightSwipe) {
      setActiveIdx((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
    }
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPointer({ x: 0, y: 0 });
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative flex flex-col justify-between pt-20 pb-4 overflow-hidden bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-white transition-colors duration-300 select-none touch-pan-y"
    >
      {/* FLOATING SIDE CAROUSEL NAVIGATION BUTTONS (DESKTOP / TABLET) */}
      <button
        onClick={() => setActiveIdx((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 h-12 w-12 items-center justify-center rounded-full border border-neutral-200 dark:border-white/15 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl text-neutral-800 dark:text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={() => setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length)}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 h-12 w-12 items-center justify-center rounded-full border border-neutral-200 dark:border-white/15 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl text-neutral-800 dark:text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Radial Background Glow Orbs */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none rounded-full blur-[140px] transition-colors duration-700 ${orbClass}`} />

      {/* CRAZYGL MASKED TEXT CAROUSEL CORE STAGE */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative my-auto py-2">
        <div ref={slideRef} className="relative flex items-center justify-center min-h-[360px] sm:min-h-[440px] lg:min-h-[480px]">

          {/* LAYER 1: Solid Giant Heading (Behind Image) */}
          <h1
            className={`text-[17vw] sm:text-[15vw] lg:text-[12.5vw] font-black tracking-tighter uppercase leading-none opacity-95 transition-all duration-700 font-sans text-center pointer-events-none ${headingColorClass}`}
          >
            {currentSlide.heading}
          </h1>

          {/* LAYER 2: Floating Product Image with Pointer Parallax */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{
              transform: `translate3d(${pointer.x}px, ${pointer.y}px, 0px)`
            }}
          >
            <img
              ref={imgRef}
              src={currentSlide.image}
              alt={currentSlide.heading}
              className={`max-w-[85%] max-h-[85%] sm:max-w-[65%] sm:max-h-[90%] lg:max-w-[55%] lg:max-h-[95%] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out animate-pulse-subtle ${currentSlide.scaleClass || ''}`}
            />
          </div>

          {/* LAYER 3: Masked Overlay Text (Shows Outline Over Product Image) */}
          <div
            ref={overlayRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-all duration-700"
            style={{
              maskImage: `url("${currentSlide.image}")`,
              WebkitMaskImage: `url("${currentSlide.image}")`,
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat'
            }}
          >
            <h1
              className="text-[17vw] sm:text-[15vw] lg:text-[12.5vw] font-black tracking-tighter uppercase leading-none font-sans text-center transition-all duration-500"
              style={{
                color: 'transparent',
                WebkitTextStroke: `2.5px ${strokeColor}`
              }}
            >
              {currentSlide.heading}
            </h1>
          </div>
        </div>

        {/* Dynamic Subheading & Product Details */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mt-2 relative z-30">
          <div className="inline-flex items-center gap-2 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 px-3 py-1 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            <span className={`font-bold transition-colors duration-500 ${categoryAccentClass}`}>{currentSlide.category}</span>
            <span>•</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{currentSlide.price}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white">
            {currentSlide.subheading}
          </h2>

          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
            {currentSlide.badge}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href={`/products/${currentSlide.slug}`}
              className={`flex items-center gap-2 rounded-2xl px-6 py-3.5 text-xs font-bold text-white shadow-xl transition active:scale-95 transition-all duration-500 ${primaryButtonClass}`}
            >
              <span>View Product Details</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="documents/AXA-INDUSTRIES-CATALOG.pdf"
              download="AXA-INDUSTRIES-CATALOG.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 px-5 py-3.5 text-xs font-semibold text-neutral-800 dark:text-white transition"
            >
              <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Download Brochure</span>
            </a>

            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-5 py-3.5 text-xs font-semibold text-neutral-800 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/10 transition"
            >
              <span>Get Fast Quote</span>
            </Link>
          </div>
        </div>
      </div>

      {/* CAROUSEL NAVIGATION CONTROLS FOOTER BAR */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-30 flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-white/10 text-xs">
        {/* Previous / Next Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveIdx((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/10 transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={() => setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/10 transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Carousel Slide Indicators */}
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((slide, idx) => {
            const slideTheme = slide.colorTheme || 'pink';
            const activeColorClass = {
              pink: 'w-8 bg-pink-600 dark:bg-pink-500',
              blue: 'w-8 bg-blue-600 dark:bg-blue-500',
              emerald: 'w-8 bg-emerald-600 dark:bg-emerald-500',
              rose: 'w-8 bg-rose-500 dark:bg-rose-400',
              sand: 'w-8 bg-[#B5AD9A]'
            }[slideTheme];

            return (
              <button
                key={slide.heading}
                onClick={() => setActiveIdx(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${activeIdx === idx
                  ? activeColorClass
                  : 'w-2 bg-neutral-300 dark:bg-white/20 hover:bg-neutral-400'
                  }`}
              />
            );
          })}
        </div>

        {/* Fast Action Support */}
        <a
          href="tel:+918076496709"
          className="hidden sm:flex items-center gap-2 font-bold text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <PhoneCall className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span>+91 80764 96709</span>
        </a>
      </div>
    </section>
  );
}
