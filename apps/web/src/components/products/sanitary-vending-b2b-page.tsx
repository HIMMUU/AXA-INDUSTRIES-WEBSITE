'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product, MACHINE_PRICING } from '@axa/types';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Download,
  CheckCircle2,
  Sliders,
  HelpCircle,
  Building2,
  School,
  Hospital,
  Factory,
  Award,
  FileText,
  Send,
  MessageSquare,
  X,
  ChevronDown,
  Check,
  Lock,
  Layers,
  BatteryCharging,
  Package,
  Wrench,
  Clock,
  Coins,
  Receipt,
  Radio
} from 'lucide-react';

interface SanitaryVendingB2BPageProps {
  product?: Product;
}

export function SanitaryVendingB2BPage({ product }: SanitaryVendingB2BPageProps) {
  const [activeGalleryTab, setActiveGalleryTab] = useState<'front' | 'inside' | 'coin' | 'installed'>('front');
  const [selectedVariant, setSelectedVariant] = useState('AVND 50 H');
  const [pricingCategory, setPricingCategory] = useState<'automatic' | 'manual'>('automatic');
  const [autoFilter, setAutoFilter] = useState<'all' | 'coin' | 'push_button'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    orgName: '',
    contactPerson: '',
    designation: '',
    phone: '',
    email: '',
    model: 'AVND 50 H',
    orgType: 'School / College',
    femaleUsers: '100-500',
    quantity: '2 to 5 Units',
    city: '',
    state: '',
    message: ''
  });

  const galleryImages = {
    front: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786306986/Autoomatic_vending_machine_outer_t8odma.jpg',
    inside: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786306986/Autoomatic_vending_machine_interrnal_nv2phl.jpg',
    coin: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786306986/Autoomatic_vending_machine_outer_t8odma.jpg',
    installed: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786307641/raplace_washroom_machine_with_mine_202608100203_xukqfa.jpg'
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formEl = e.currentTarget;
    const formValues = new FormData(formEl);
    const org = (formValues.get('org') || formValues.get('organization') || formData.orgName || '').toString();
    const name = (formValues.get('name') || formData.contactPerson || '').toString();
    const phone = (formValues.get('phone') || formData.phone || '').toString();
    const email = (formValues.get('email') || formData.email || '').toString();
    const qty = parseInt((formValues.get('qty') || formData.quantity || '1').toString(), 10) || 1;
    const model = (formValues.get('model') || formData.model || 'AVND 50 H').toString();
    const notes = (formValues.get('notes') || formData.message || '').toString();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      await fetch(`${apiUrl}/v1/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || org || 'Valued Customer',
          phone: phone || '+91 80764 96709',
          email: email || undefined,
          company: org || undefined,
          message: notes || `Quotation request for Model ${model} Sanitary Napkin Vending Machine. Quantity: ${qty}`,
          quantity: qty,
          source: 'PRODUCT_DETAILS'
        })
      });
    } catch (err) {
      console.warn('Backend enquiry submission:', err);
    } finally {
      setIsSubmitting(false);
      setQuoteSubmitted(true);
      setTimeout(() => {
        setQuoteSubmitted(false);
        setShowQuoteModal(false);
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-white transition-colors duration-300 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* STICKY ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 dark:border-white/10 bg-white/95 dark:bg-[#0F0F14]/95 backdrop-blur-2xl py-3 px-4 shadow-2xl transition-colors duration-300">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <p className="text-xs font-bold text-neutral-900 dark:text-white">AXA Sanitary Napkin Vending Machines (Manual VND & Automatic AVND Series)</p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Starting ₹3,500 + GST (Manual) • ₹4,500 + GST (Push Button) • ₹5,500 + GST (Coin/Auto)</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <a
              href="tel:+918076496709"
              className="flex items-center gap-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-3.5 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/10 transition"
            >
              <PhoneCall className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">+91 80764 96709</span>
            </a>

            <a
              href="https://wa.me/918076496709?text=Hi%20AXA%20Industries,%20I%20want%20a%20quotation%20for%20Sanitary%20Napkin%20Vending%20Machine%20(Model%20AVND50H)."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => setShowQuoteModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition active:scale-95"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Request Quote</span>
            </button>
          </div>
        </div>
      </div>

      <Navbar />

      <main className="pt-24 pb-24 space-y-16">

        {/* 1. HERO SECTION */}
        <section className="relative pt-6 pb-12 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                  <Zap className="h-3.5 w-3.5" />
                  <span>SANITARY NAPKIN VENDING MACHINES (MANUAL & AUTOMATIC)</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
                  Instant Napkin Access. <br />
                  <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-500 bg-clip-text text-transparent">
                    Touchless & Reliable.
                  </span> <br />
                  Dignity for Every Facility.
                </h1>

                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                  Commercial manual and automatic sanitary napkin dispenser machines designed for schools, colleges, IT parks, factories, hospitals, and municipal washrooms. Features heavy MS steel construction, LCD customer instructions, and battery backup.
                </p>

                {/* Rating & Badge */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <div className="flex items-center gap-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 px-3 py-1.5 text-xs font-bold">
                    <span className="text-amber-500">⭐⭐⭐⭐⭐</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Trusted by 500+ Institutions</span>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                    <span>Starting from ₹3,500 + GST</span>
                  </div>
                </div>

                {/* Key Trust Checkmarks */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Made in India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>1-Year Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Battery Backup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Wall Mounted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Multi-Coin Acceptor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>GeM Registered Vendor</span>
                  </div>
                </div>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-xs font-bold text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500 transition active:scale-95"
                  >
                    <span>Get Instant Quote</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <a
                    href="https://wa.me/918076496709?text=Hi%20AXA%20Industries,%20I%20want%20to%20know%20more%20about%20Sanitary%20Napkin%20Vending%20Machine"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-2xl border border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-5 py-3.5 text-xs font-semibold text-neutral-800 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/10 transition"
                  >
                    <MessageSquare className="h-4 w-4 text-emerald-500" />
                    <span>WhatsApp Datasheet</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Gallery & Interactive Angle Selector */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 shadow-2xl">
                  <img
                    src={galleryImages[activeGalleryTab]}
                    alt="AXA Sanitary Napkin Vending Machine"
                    className="h-full w-full object-cover transition-all duration-500"
                  />

                  <div className="absolute top-4 left-4 rounded-xl bg-white/80 dark:bg-black/70 backdrop-blur-md px-3 py-1.5 text-[11px] font-bold text-neutral-900 dark:text-white flex items-center gap-1.5 border border-neutral-200 dark:border-white/10">
                    <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    <span>ISO 9001:2015 Certified Manufacturing</span>
                  </div>
                </div>

                {/* Angle Selector Tabs */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'front', label: 'Front View' },
                    { id: 'inside', label: 'Internal Dispenser' },
                    { id: 'coin', label: 'Coin / UPI Unit' },
                    { id: 'installed', label: 'Site Installation' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveGalleryTab(t.id as any)}
                      className={`rounded-xl border p-2 text-[11px] font-semibold text-center transition ${
                        activeGalleryTab === t.id
                          ? 'border-blue-500 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-white font-bold'
                          : 'border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. TRUST STRIP */}
        <section className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-[#121216]/80 p-6 backdrop-blur-xl shadow-xl transition-colors duration-300">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center divide-x-0 md:divide-x divide-neutral-200 dark:divide-white/5">
            {[
              { title: '★★★★★ 4.9/5 Rating', desc: 'Trusted by 500+ Institutions' },
              { title: 'ISO 9001:2015', desc: 'Quality Certified Process' },
              { title: 'Made in India', desc: '100% Indigenous Tech' },
              { title: 'MSME Registered', desc: 'Government Vendor Compliant' },
              { title: 'Fast Installation', desc: '48-Hour On-Site Setup' },
              { title: '1-Year Warranty', desc: 'Free On-Site Replacement' },
              { title: 'Pan-India Shipping', desc: 'Direct Doorstep Express Delivery' }
            ].map((item, idx) => (
              <div key={idx} className="p-2 space-y-1">
                <p className="text-xs font-bold text-neutral-900 dark:text-white">{item.title}</p>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. PRODUCT HIGHLIGHTS CARDS */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Engineering Excellence</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">Built For Uncompromising Reliability</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Designed specifically for high-frequency institutional usage with zero-jam dispensing.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: '50 Pad Storage Capacity', desc: 'Compact internal column holds up to 50 napkins, reducing refill frequency.', icon: Package },
              { title: 'Battery Backup System', desc: 'Integrated battery backup ensures 24×7 operation even during power outages.', icon: BatteryCharging },
              { title: 'Interactive LCD Display', desc: 'Step-by-step buyer instructions & napkin collection messages.', icon: Sparkles },
              { title: 'MS Powder Coated Body', desc: 'Heavy-gauge vandal-resistant steel cabinet built to withstand public washroom environments.', icon: ShieldCheck },
              { title: 'Smart Coin Rejection', desc: 'Automatically rejects coins when out of stock to prevent user financial loss.', icon: Lock },
              { title: 'Low Maintenance Engine', desc: 'Engineered for over 500,000 continuous dispense cycles.', icon: Wrench },
              { title: 'Live Stock & Price Display', desc: 'LCD displays real-time stock count with napkin price.', icon: Zap },
              { title: '230V AC Power Socket', desc: 'Operates on standard 230V AC electricity with low power consumption.', icon: Clock }
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#121216]/60 p-5 space-y-3 hover:border-blue-500/40 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{card.title}</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. AVAILABLE MODELS & TRANSPARENT PRICING MATRIX */}
        <section id="pricing-matrix" className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Direct Factory Procurement Rates
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
              Vending Machine Models & Transparent Pricing
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Choose between Zero-Power Manual Mechanical dispensers or Fully Automatic IoT/Coin & Push-Button models. *GST 18% Extra on all models.
            </p>

            {/* Category Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPricingCategory('automatic')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition shadow-sm ${
                  pricingCategory === 'automatic'
                    ? 'bg-blue-600 text-white shadow-blue-600/30'
                    : 'bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10'
                }`}
              >
                <Zap className="h-4 w-4" />
                <span>Automatic Machines ({MACHINE_PRICING.vending_automatic.models.length} Models)</span>
              </button>

              <button
                type="button"
                onClick={() => setPricingCategory('manual')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition shadow-sm ${
                  pricingCategory === 'manual'
                    ? 'bg-blue-600 text-white shadow-blue-600/30'
                    : 'bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10'
                }`}
              >
                <Wrench className="h-4 w-4" />
                <span>Manual / Mechanical ({MACHINE_PRICING.vending_manual.models.length} Models)</span>
              </button>
            </div>

            {/* Automatic Sub-filter */}
            {pricingCategory === 'automatic' && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setAutoFilter('all')}
                  className={`px-3 py-1 rounded-xl font-semibold transition ${
                    autoFilter === 'all'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                      : 'bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  All Automatic ({MACHINE_PRICING.vending_automatic.models.length})
                </button>
                <button
                  type="button"
                  onClick={() => setAutoFilter('coin')}
                  className={`px-3 py-1 rounded-xl font-semibold transition ${
                    autoFilter === 'coin'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                      : 'bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  Coin / Multi-Coin (6)
                </button>
                <button
                  type="button"
                  onClick={() => setAutoFilter('push_button')}
                  className={`px-3 py-1 rounded-xl font-semibold transition ${
                    autoFilter === 'push_button'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                      : 'bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  Push Button (Free Dispense) (5)
                </button>
              </div>
            )}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {(pricingCategory === 'automatic'
              ? MACHINE_PRICING.vending_automatic.models.filter((m) =>
                  autoFilter === 'all'
                    ? true
                    : autoFilter === 'coin'
                    ? m.operation === 'Coin / Multi-Coin'
                    : m.operation === 'Push Button'
                )
              : MACHINE_PRICING.vending_manual.models
            ).map((m) => (
              <div
                key={m.model}
                className={`rounded-3xl border p-5 flex flex-col justify-between space-y-5 transition relative hover:shadow-xl ${
                  m.popular
                    ? 'border-blue-500 bg-blue-500/5 dark:bg-blue-500/10 ring-2 ring-blue-500/30'
                    : 'border-neutral-200 dark:border-white/10 bg-white dark:bg-[#121216]/60'
                }`}
              >
                {m.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                )}

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-neutral-200">
                      {m.model}
                    </span>
                    <div className="flex items-center gap-1">
                      {m.orientation && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          {m.orientation}
                        </span>
                      )}
                      {m.operation && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                          {m.operation === 'Push Button' ? 'Push Button' : m.operation === 'Manual / Mechanical' ? 'Manual Knob' : 'Coin Slot'}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-snug">{m.name}</h3>

                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400">
                        ₹{m.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase">
                        + GST
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Capacity: {m.capacity}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-200 dark:border-white/10 space-y-1.5 text-xs">
                    {m.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-[11px]">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, model: m.model }));
                      setShowQuoteModal(true);
                    }}
                    className="w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition active:scale-95 shadow-md shadow-blue-600/20"
                  >
                    Request Quote for {m.model}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 text-center text-xs text-neutral-600 dark:text-neutral-300 flex flex-wrap items-center justify-center gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">Pricing Policy:</span>
            <span>All rates are Ex-Factory. 18% GST extra. Includes 1-Year Comprehensive Hardware Warranty. Bulk GeM/Institutional discounts available.</span>
          </div>
        </section>

        {/* 5. PRODUCT OVERVIEW & PURPOSE */}
        <section className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-[#121216]/60 p-8 space-y-6 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Institutional Procurement Guide</span>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">What is the AXA Vending Series?</h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Sanitary Napkin Vending Machine is an essential technology product that should become a norm at all commercial and public places. Our unique IoT-based fully automatic sanitary napkin dispenser allows women to avail hygienic sanitary napkins without any human contact. A simple coin-operated sanitary napkins dispenser machine is designed to help women anytime during menstrual emergencies.
            </p>
          </div>
        </section>

        {/* 6. FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Buyer Clarifications</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "What types and sizes of sanitary napkins can be loaded into the machine?",
                a: "The machine accommodates standard individual paper-wrapped sanitary napkins of sizes Regular, Large (240mm), and Extra Large (280mm)."
              },
              {
                q: "How does the coin acceptor handle different coin denominations?",
                a: "The optical coin acceptor can be programmed for ₹1, ₹2, ₹5, or ₹10 coins as well as custom tokens provided with the machine."
              },
              {
                q: "What happens when the machine runs out of napkins?",
                a: "The machine features an optical empty sensor that automatically locks the coin slot and displays 'OUT OF STOCK' on the LCD screen."
              },
              {
                q: "Is continuous electricity required?",
                a: "No. While the unit runs on 230V AC power, it includes an inbuilt rechargeable battery backup that powers dispensing during electrical outages."
              },
              {
                q: "What is the warranty and after-sales support policy?",
                a: "AXA Industries provides a 1-year comprehensive hardware warranty covering motors, control boards, and coin sensors with pan-India spare support."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#121216]/60 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-neutral-900 dark:text-white text-sm sm:text-base flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-200 dark:border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* REUSABLE B2B QUOTE MODAL */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#121216] border border-stone-200 dark:border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 text-left my-8 text-slate-900 dark:text-white">
            
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>

            {!quoteSubmitted ? (
              <div>
                <div className="mb-6">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-800 bg-blue-50 dark:bg-blue-950/80 dark:text-blue-300 px-2.5 py-1 rounded border border-blue-200 dark:border-blue-800">
                    Direct Institutional RFQ
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
                    Request Quotation - Sanitary Napkin Vending Machine
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Fill in your organization details to receive direct factory pricing, GST invoice quotation, and delivery timelines within 2 hours.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Organization / Client Name *</label>
                      <input
                        type="text"
                        name="org"
                        required
                        placeholder="e.g. DPS School / Infosys Campus"
                        value={formData.orgName}
                        onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                        className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Person Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Full Name"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="purchase@organization.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Select Machine Model *</label>
                    <select
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none font-medium"
                    >
                      <optgroup label="Automatic Vending Machines (AVND)">
                        {MACHINE_PRICING.vending_automatic.models.map((m) => (
                          <option key={m.model} value={m.model}>
                            {m.model} — ₹{m.price.toLocaleString('en-IN')} + GST ({m.capacity} • {m.operation})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Manual Mechanical Machines (VND)">
                        {MACHINE_PRICING.vending_manual.models.map((m) => (
                          <option key={m.model} value={m.model}>
                            {m.model} — ₹{m.price.toLocaleString('en-IN')} + GST ({m.capacity})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Estimated Quantity *</label>
                      <select
                        name="qty"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                      >
                        <option value="1 to 3 Units">1 to 3 Units</option>
                        <option value="4 to 10 Units">4 to 10 Units</option>
                        <option value="11 to 30 Units">11 to 30 Units</option>
                        <option value="31+ Units (Govt / Bulk Tender)">31+ Units (Bulk Enterprise / GeM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">City *</label>
                      <input
                        type="text"
                        placeholder="e.g. New Delhi / Bangalore"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">State *</label>
                    <input
                      type="text"
                      placeholder="State / Region"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Additional Requirements / Notes</label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="Specify napkin size preferences, installation location, or GeM tender details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl text-sm shadow-lg shadow-blue-600/25 transition active:scale-98 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Generating Commercial Quote...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit RFQ for Instant Quotation</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Quotation Request Received!</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-slate-900 dark:text-white">{formData.contactPerson}</span>. Your inquiry for <span className="font-bold text-blue-600">AXA Sanitary Napkin Vending Machine</span> has been assigned to an AXA Sales Engineer.
                </p>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="px-6 py-2.5 bg-stone-900 dark:bg-white dark:text-black hover:bg-stone-800 font-bold text-xs text-white rounded-xl transition"
                >
                  Close Window
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
