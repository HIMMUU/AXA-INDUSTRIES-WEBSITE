'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
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
  Flame,
  Award,
  FileText,
  Send,
  MessageSquare,
  X,
  ChevronDown,
  Check,
  Lock,
  Layers,
  Wind,
  Calculator,
  RotateCcw,
  PackageCheck
} from 'lucide-react';

interface SanitaryDisposalB2BPageProps {
  product?: Product;
}

export function SanitaryDisposalB2BPage({ product }: SanitaryDisposalB2BPageProps) {
  const [activeGallery, setActiveGallery] = useState<'main' | 'front' | 'left' | 'installed'>('main');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    orgName: '',
    contactName: '',
    designation: '',
    phone: '',
    email: '',
    orgType: 'School/College',
    quantity: '2-5 Units',
    timeline: 'Immediate (1-2 weeks)',
    model: 'SND 100',
    notes: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Interactive ROI Calculator State
  const [femaleCount, setFemaleCount] = useState(250);
  const [activeModel, setActiveModel] = useState<string>('SND 150 Display');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formEl = e.currentTarget;
    const formValues = new FormData(formEl);
    const org = (formValues.get('org') || formValues.get('organization') || formData.orgName || '').toString();
    const name = (formValues.get('name') || formData.contactName || '').toString();
    const phone = (formValues.get('phone') || formData.phone || '').toString();
    const email = (formValues.get('email') || formData.email || '').toString();
    const qty = parseInt((formValues.get('qty') || formData.quantity || '1').toString(), 10) || 1;
    const model = (formValues.get('model') || formData.model || 'SND 100').toString();
    const notes = (formValues.get('notes') || formData.notes || '').toString();

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
          message: notes || `Quotation request for Incinerator Model ${model}. Quantity: ${qty}`,
          quantity: qty,
          source: 'PRODUCT_DETAILS'
        })
      });
    } catch (err) {
      console.warn('Backend enquiry submission:', err);
    } finally {
      setIsSubmitting(false);
      setQuoteSubmitted(true);
    }
  };

  const galleryImages = {
    main: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458267/mainsnd_mle9pt.jpg',
    front: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458267/frrontsnd_qypbta.jpg',
    left: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458267/left_snd_ozcmjm.jpg',
    installed: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458268/installsnd_ifajcr.png'
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-white transition-colors duration-300 font-sans selection:bg-rose-500 selection:text-white">
      
      {/* 20. STICKY CONVERSION BAR FOR B2B PURCHASING */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 dark:border-white/10 bg-white/95 dark:bg-[#0F0F14]/95 backdrop-blur-2xl py-3 px-4 shadow-2xl transition-colors duration-300">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
            <div>
              <p className="text-xs font-bold text-neutral-900 dark:text-white">AXA Sanitary Napkin Incinerator Series (SND 100 to SND 600)</p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Starting ₹3,360 + GST • Pan-India Factory Direct Shipping</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <a
              href="tel:+918076496709"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-100 dark:bg-white/5 px-3 py-2 text-xs font-semibold text-neutral-800 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/10 transition"
            >
              <PhoneCall className="h-3.5 w-3.5 text-rose-500" />
              <span className="hidden sm:inline">Call Expert</span>
            </a>

            <a
              href="https://wa.me/918076496709?text=Hi%20AXA%20Industries,%20I%20need%20a%20quotation%20for%20Sanitary%20Napkin%20Incinerator%20Machine"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => setShowQuoteModal(true)}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-rose-600/30 hover:bg-rose-500 transition active:scale-95"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Request Quote</span>
            </button>
          </div>
        </div>
      </div>

      <Navbar />

      <main className="pt-24 pb-24 space-y-16">
        
        {/* 1. HERO SECTION (ABOVE THE FOLD) */}
        <section className="relative pt-6 pb-12 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Content (60%) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                  <Flame className="h-3.5 w-3.5" />
                  <span>SANITARY NAPKIN INCINERATOR MACHINE</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
                  Safe Disposal. <br />
                  <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
                    Clean Washrooms.
                  </span> <br />
                  Healthier Environment.
                </h1>

                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                  A compact, hygienic, and energy-efficient sanitary napkin incinerator designed for schools, colleges, offices, hospitals, factories, and public facilities. Dispose of used sanitary napkins safely while promoting complete washroom hygiene.
                </p>

                {/* Rating & Starting Price Badge */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <div className="flex items-center gap-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 px-3 py-1.5 text-xs font-bold">
                    <span className="text-amber-500">⭐⭐⭐⭐⭐</span>
                    <span className="text-neutral-700 dark:text-neutral-300">Trusted by 500+ Institutions</span>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 font-mono">
                    <span>Starting from ₹3,360 + GST</span>
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
                    <span>Low Power Draft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Wall Mounted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Easy Ash Removal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Bulk Order Discounts</span>
                  </div>
                </div>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="flex items-center gap-2 rounded-2xl bg-rose-600 px-6 py-3.5 text-xs font-bold text-white shadow-xl shadow-rose-600/30 hover:bg-rose-500 transition active:scale-95"
                  >
                    <span>Get Instant Quote</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <a
                    href="/documents/axa-incinerator-catalog.pdf"
                    download="AXA-Sanitary-Napkin-Incinerator-Catalog.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-2xl border border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-5 py-3.5 text-xs font-semibold text-neutral-800 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/10 transition"
                  >
                    <Download className="h-4 w-4 text-rose-500" />
                    <span>Download Incinerator Catalog PDF</span>
                  </a>
                </div>
              </div>

              {/* Right Side (40%) - Interactive Product Viewer */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative aspect-square w-full rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-[#121216]/80 p-4 shadow-2xl overflow-hidden group">
                  <CldImage
                    src={galleryImages[activeGallery]}
                    alt="AXA Sanitary Napkin Disposal Machine"
                    width={800}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="h-full w-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    Model SND-50
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-mono">
                    Smokeless Electric Incinerator
                  </div>
                </div>

                {/* View Angle Selector Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {(['main', 'front', 'left', 'installed'] as const).map((view) => (
                    <button
                      key={view}
                      onClick={() => setActiveGallery(view)}
                      className={`rounded-xl border p-1 text-[11px] font-bold capitalize transition ${
                        activeGallery === view
                          ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          : 'border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. TRUST STRIP */}
        <section className="border-y border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#0E0E12] py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
              {[
                { label: 'ISO Certified', sub: '9001:2015' },
                { label: 'MSME Registered', sub: 'Govt Approved' },
                { label: 'Made in India', sub: 'Vocal for Local' },
                { label: '1-Year Warranty', sub: 'On Heater Unit' },
                { label: 'Pan India Delivery', sub: 'Express Dispatch' },
                { label: 'Installation Support', sub: 'Expert Guidance' },
                { label: 'GST Invoice', sub: 'Input Credit Ready' },
                { label: '500+ Installs', sub: 'Pan-India Active' }
              ].map((item, i) => (
                <div key={i} className="space-y-0.5">
                  <p className="text-xs font-bold text-neutral-900 dark:text-white">{item.label}</p>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. WHY THIS PRODUCT? (PROBLEM & SOLUTION) */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-8 sm:p-12 relative overflow-hidden">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                The Hygiene Challenge in Public & Institutional Washrooms
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
                Why Traditional Sanitary Napkin Disposal Fails
              </h2>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Improper disposal of sanitary napkins can lead to severely clogged drainage systems, unhygienic washroom conditions, unpleasant odours, and dangerous environmental pollution. Conventional trash bins attract bacteria, create health hazards for cleaning personnel, and compromise dignity.
              </p>
              <div className="pt-2 text-sm font-semibold text-rose-600 dark:text-rose-400">
                ✓ Solution: The AXA Sanitary Napkin Incinerator provides an immediate, safe, and automated thermal solution by enabling hygienic disposal directly inside individual washrooms.
              </div>
            </div>
          </div>
        </section>

        {/* 4. KEY FEATURES */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
              Engineered for Safety, Reliability & Hygiene
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              High-precision ceramic heating element designed for commercial washroom environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Flame,
                title: 'High Temperature Incineration',
                desc: 'Efficiently converts used sanitary pads into negligible sterile ash at high temperatures with minimal smoke output.'
              },
              {
                icon: ShieldCheck,
                title: 'Hygienic & Odourless Disposal',
                desc: 'Eliminates bacterial contamination, unpleasant odours, and dignity risks for washroom cleaning personnel.'
              },
              {
                icon: Zap,
                title: 'Low Power Consumption',
                desc: 'Features auto cut-off thermostat and smart timers to minimize electrical power consumption during each burn cycle.'
              },
              {
                icon: Building2,
                title: 'Compact Wall-Mounted Design',
                desc: 'Saves valuable floor space in school, office, hospital, or factory washrooms with easy wall installation.'
              },
              {
                icon: Lock,
                title: 'Safe Insulated Operation',
                desc: 'Double-wall ceramic thermal insulation prevents outer body overheating, making it completely safe for users.'
              },
              {
                icon: RotateCcw,
                title: 'Easy Ash Tray Maintenance',
                desc: 'Removable bottom ash collection tray allows quick, safe routine cleaning without touching internal heating elements.'
              }
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#121216]/60 p-6 shadow-sm hover:border-rose-500/40 transition space-y-3"
              >
                <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">{f.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. HOW IT WORKS WORKFLOW */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
              6-Step Automated Operation Workflow
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Simple 1-touch operation designed for touch-free safety.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { step: '01', title: 'Open Door', desc: 'Pull front handle' },
              { step: '02', title: 'Insert Napkin', desc: 'Place used pad inside' },
              { step: '03', title: 'Close Door', desc: 'Latch safety lock' },
              { step: '04', title: 'Press Start', desc: '1-Touch activation' },
              { step: '05', title: 'Incinerate', desc: 'Auto cut-off timer' },
              { step: '06', title: 'Ash Collection', desc: 'Sterile residue tray' }
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 p-4 space-y-2">
                <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">{s.step}</span>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{s.title}</h4>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. TECHNICAL SPECIFICATIONS TABLE */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
              Technical Specifications (Model SND-50 Series)
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Built with heavy-duty MS powder-coated steel and ceramic insulation.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#121216]/60 overflow-hidden shadow-xl">
            <div className="divide-y divide-neutral-200 dark:divide-white/10">
              {[
                { key: 'Model Name', val: 'AXA SND 500 Sanitary Napkin & Mask Incinerator Machine' },
                { key: 'Dimensions (LxWxH)', val: '710 x 320 x 320 mm' },
                { key: 'Heater Power', val: '2500 Watt High-Efficiency Heater' },
                { key: 'Weight', val: 'Approx 30 kg' },
                { key: 'Daily Capacity', val: '500 to 800 Napkins / 2000 to 2500 Masks per Day' },
                { key: 'Single Batch Load', val: '25 to 30 Napkins or 40 to 50 Masks at once' },
                { key: 'Burning Time', val: '25 to 30 Minutes (Settable Cycle)' },
                { key: 'Auto Cut-Off', val: '15 Minutes Auto Cut-Off (as required for energy saving)' },
                { key: 'Thermal Insulation', val: '25mm Thickness Ceramic Fiber Insulation' },
                { key: 'Temperature Display', val: 'LCD Display with Temperature & Timer Controller' },
                { key: 'Body Material', val: 'Heavy-Duty MS Powder Coated Body' },
                { key: 'Ash Residue', val: 'Produces Less Than 1g Ash per Napkin' },
                { key: 'Mounting Options', val: 'Wall Mounted & Table Top Option' },
                { key: 'Certifications', val: 'CE Approved & CPCB Norm Compliant Test Report' }
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 p-4 text-xs">
                  <span className="font-semibold text-neutral-600 dark:text-neutral-400">{row.key}</span>
                  <span className="font-bold text-neutral-900 dark:text-white mt-1 sm:mt-0">{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. AVAILABLE MODELS & PRICING CARDS */}
        <section id="models-pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
              Official Factory Pricing Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
              Available Incinerator Models & Institutional Pricing
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
              Direct factory procurement rates for schools, colleges, hostels, corporate offices, and hospitals. *GST 18% extra on all models.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MACHINE_PRICING.disposal_machine.models.map((m) => (
              <div
                key={m.model}
                className={`rounded-3xl border p-5 flex flex-col justify-between space-y-5 transition relative hover:shadow-xl ${
                  m.popular
                    ? 'border-rose-500 bg-rose-500/5 dark:bg-rose-500/10 ring-2 ring-rose-500/30'
                    : 'border-neutral-200 dark:border-white/10 bg-white dark:bg-[#121216]/60'
                }`}
              >
                {m.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-rose-600 px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300">
                      {m.model}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.hasDisplay ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400'}`}>
                      {m.hasDisplay ? 'Digital Display' : 'Standard'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-snug">{m.name}</h3>

                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400">
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
                    className="w-full rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white hover:bg-rose-500 transition active:scale-95 shadow-md shadow-rose-600/20"
                  >
                    Request Quote for {m.model}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 text-center text-xs text-neutral-600 dark:text-neutral-300 flex flex-wrap items-center justify-center gap-2">
            <span className="font-bold text-rose-600 dark:text-rose-400">Note:</span>
            <span>All pricing mentioned is Ex-Factory. 18% GST extra as applicable. Pan-India Doorstep Dispatch & Institutional Volume Discounts available.</span>
          </div>
        </section>

        {/* 22. INTERACTIVE CAPACITY & USAGE CALCULATOR */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#121216]/90 p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Institutional Capacity Calculator</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Estimate how many machines your campus or workplace requires.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Total Female Population (Students / Employees): <span className="text-rose-600 dark:text-rose-400 font-mono text-sm">{femaleCount} Users</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={femaleCount}
                  onChange={(e) => setFemaleCount(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />

                <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                  <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 p-3">
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Est. Daily Disposal Need</p>
                    <p className="text-base font-bold text-neutral-900 dark:text-white">{Math.round(femaleCount * 0.25)} Pads / Day</p>
                  </div>
                  <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 p-3">
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Recommended Units</p>
                    <p className="text-base font-bold text-rose-600 dark:text-rose-400">{Math.max(1, Math.ceil((femaleCount * 0.25) / 80))} Incinerator Units</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 p-6 space-y-3 text-center">
                <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400">Bulk Quotation Estimate</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300">
                  For {femaleCount} users, we recommend installing {Math.max(1, Math.ceil((femaleCount * 0.25) / 80))} unit(s) of Model SND-50.
                </p>
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="w-full rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white hover:bg-rose-500 transition"
                >
                  Get Bulk Rate For {femaleCount} Users
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 10. IDEAL APPLICATIONS */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
              Ideal Institutional Applications
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Deployed in leading government & private organizations across India.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: School, title: 'Schools' },
              { icon: School, title: 'Colleges' },
              { icon: Hospital, title: 'Hospitals' },
              { icon: Building2, title: 'Corporate Offices' },
              { icon: Factory, title: 'Factories' },
              { icon: Building2, title: 'Railway Stations' }
            ].map((app, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#121216]/60 p-4 text-center space-y-2">
                <app.icon className="h-6 w-6 text-rose-500 mx-auto" />
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{app.title}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* 17. DOWNLOADS CENTER */}
        <section id="downloads" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#121216]/60 p-8 space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-rose-500" />
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Download Procurement Documentation</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Official technical datasheets, tender specifications, and manuals.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'AXA Industries Official Brochure.pdf',
                'Model SND-50 Technical Datasheet.pdf',
                'Installation & User Manual.pdf',
                'ISO 9001:2015 Certificate.pdf'
              ].map((doc, idx) => (
                <a
                  key={idx}
                  href="/documents/axa-industries-official-brochure.pdf"
                  download="AXA-Industries-Official-Brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 p-3 text-xs font-bold text-neutral-800 dark:text-white hover:border-rose-500 transition"
                >
                  <span className="truncate mr-2">{doc}</span>
                  <Download className="h-4 w-4 text-rose-500 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 18. FREQUENTLY ASKED QUESTIONS */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Clear answers for school administrators, HR managers, and procurement officers.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: 'How many sanitary napkins can be disposed of per day?',
                a: 'Model SND-50 handles 80 to 100 napkins per day with rapid high-temperature incineration cycle times.'
              },
              {
                q: 'What is the power consumption per cycle?',
                a: 'The unit features an automatic thermostat cut-off timer. Power consumption is minimal (approx. 0.2 to 0.4 units per burn cycle).'
              },
              {
                q: 'Does the incinerator emit excessive smoke or odour?',
                a: 'No. The unit uses a double-chamber ceramic heating element with a top exhaust duct connector that minimizes smoke and odour.'
              },
              {
                q: 'Is installation support provided?',
                a: 'Yes. Every unit comes with complete wall mounting hardware and easy step-by-step installation manuals. Virtual engineer support is available pan-India.'
              },
              {
                q: 'What warranty is included?',
                a: 'AXA Industries provides a 1-Year Comprehensive Manufacturer Warranty covering heating elements and electrical components.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#121216]/60 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left text-xs font-bold text-neutral-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-neutral-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 21. SMART LEAD CAPTURE MODAL */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#121216] p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Request Official B2B Quotation</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">AXA Sanitary Napkin Incinerator (Model SND-50)</p>
            </div>

            {quoteSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-neutral-900 dark:text-white">Quotation Request Received!</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Our B2B procurement team will email & WhatsApp your official GST estimate within 30 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">Organization Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. ABC Public School / Apex Hospitals"
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    className="w-full mt-1 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 p-2.5 text-neutral-900 dark:text-white outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-neutral-700 dark:text-neutral-300">Contact Person *</label>
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full mt-1 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 p-2.5 text-neutral-900 dark:text-white outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-700 dark:text-neutral-300">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full mt-1 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 p-2.5 text-neutral-900 dark:text-white outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">Selected Machine Model *</label>
                  <select
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full mt-1 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-[#1A1A20] p-2.5 text-neutral-900 dark:text-white outline-none focus:border-rose-500 font-medium"
                  >
                    {MACHINE_PRICING.disposal_machine.models.map((m) => (
                      <option key={m.model} value={m.model}>
                        {m.model} — ₹{m.price.toLocaleString('en-IN')} + GST ({m.capacity})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-neutral-700 dark:text-neutral-300">Organization Type</label>
                    <select
                      value={formData.orgType}
                      onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                      className="w-full mt-1 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-[#1A1A20] p-2.5 text-neutral-900 dark:text-white outline-none focus:border-rose-500"
                    >
                      <option value="School/College">School / College</option>
                      <option value="Hospital">Hospital / Clinic</option>
                      <option value="Corporate Office">Corporate Office</option>
                      <option value="Factory">Factory / Plant</option>
                      <option value="Government/NGO">Government / NGO</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-700 dark:text-neutral-300">Quantity Required</label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full mt-1 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-[#1A1A20] p-2.5 text-neutral-900 dark:text-white outline-none focus:border-rose-500"
                    >
                      <option value="1 Unit">1 Unit (Sample)</option>
                      <option value="2-5 Units">2 - 5 Units</option>
                      <option value="6-20 Units">6 - 20 Units</option>
                      <option value="50+ Bulk Tender">50+ Bulk Tender</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-rose-600 py-3 text-xs font-bold text-white shadow-xl shadow-rose-600/30 hover:bg-rose-500 transition active:scale-95 mt-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Quotation Request...' : 'Submit Quotation Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
