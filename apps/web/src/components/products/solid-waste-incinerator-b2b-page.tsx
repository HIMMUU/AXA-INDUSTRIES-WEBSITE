'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@axa/types';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Send,
  MessageSquare,
  Award,
  Zap,
  Layers,
  Wrench,
  Building2,
  GraduationCap,
  Hospital,
  Factory,
  Building,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Check,
  Share2,
  Clock,
  Settings,
  X,
  Lock,
  Flame,
  Thermometer,
  Shield,
  Activity,
  ShoppingBag,
  Hotel,
  Train,
  Plane,
  Fuel,
  Users,
  MapPin
} from 'lucide-react';

interface B2BPageProps {
  product?: Product;
}

export function SolidWasteIncineratorB2BPage({ product }: B2BPageProps) {
  const [activeGalleryTab, setActiveGalleryTab] = useState<'3kw' | '4.5kw' | 'installed'>('3kw');
  const [selectedVariant, setSelectedVariant] = useState<'SWI3KW' | 'SWI4.5KW'>('SWI3KW');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    orgName: '',
    contactPerson: '',
    phone: '',
    email: '',
    orgType: 'Hospital / Medical Hub',
    quantity: '1 to 2 Units',
    city: '',
    state: '',
    message: ''
  });

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formEl = e.currentTarget;
    const formValues = new FormData(formEl);
    const org = (formValues.get('org') || formData.orgName || '').toString();
    const name = (formValues.get('name') || formData.contactPerson || '').toString();
    const phone = (formValues.get('phone') || formData.phone || '').toString();
    const email = (formValues.get('email') || formData.email || '').toString();
    const qty = parseInt((formValues.get('qty') || formData.quantity || '1').toString(), 10) || 1;
    const notes = (formValues.get('notes') || formData.message || '').toString();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      await fetch(`${apiUrl}/v1/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name || 'Enterprise Lead',
          email: email || 'lead@organization.com',
          phone: phone || '9999999999',
          company: org || 'Commercial Client',
          productSlug: 'axa-swi-3kw-solid-waste-incinerator',
          productName: `AXA Solid Waste Incinerator Machine (${selectedVariant})`,
          quantity: qty,
          message: `[B2B Quote Request - Solid Waste Incinerator] Model: ${selectedVariant}, Org Type: ${formData.orgType}, City: ${formData.city}, State: ${formData.state}. Additional Notes: ${notes}`
        })
      });
    } catch (err) {
      console.warn('Enquiry submission fallback:', err);
    } finally {
      setIsSubmitting(false);
      setQuoteSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 selection:bg-blue-600 selection:text-white font-sans antialiased">
      <Navbar />

      <main className="pt-28 pb-24">
        {/* TOP ANNOUNCEMENT STRIP */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="bg-blue-50/90 text-slate-800 border border-blue-200/80 text-xs py-2.5 px-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="bg-blue-600 text-white font-extrabold px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-wider shadow-xs">
                CPCB & Swachh Bharat Compliant
              </span>
              <span className="hidden md:inline text-slate-600 font-medium">
                Pan-India Industrial Supply • Direct Factory Billing • GeM Portal Vendor
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <a
                href="tel:+918076496709"
                className="flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-900 transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                <span>+91 80764 96709</span>
              </a>

              <a
                href="https://wa.me/918076496709?text=Hi%20AXA%20Industries,%20I%20need%20a%20quotation%20for%20Solid%20Waste%20Incinerator%20Machine"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-900 transition"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">WhatsApp Quote</span>
              </a>

              <button
                onClick={() => {
                  setQuoteSubmitted(false);
                  setShowQuoteModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-3 py-1 rounded-lg transition shadow-md active:scale-95 flex items-center gap-1 text-[11px]"
              >
                <Send className="w-3 h-3" />
                <span>Request RFQ</span>
              </button>
            </div>
          </div>
        </div>

        {/* BREADCRUMB */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-blue-700 transition">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/products" className="hover:text-blue-700 transition">
              Products
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-blue-700 font-semibold truncate">
              Solid Waste Incinerator Machine (SWI)
            </span>
          </nav>
        </div>

        {/* 2. HERO SECTION */}
        <section className="relative pt-4 pb-16 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* LEFT COLUMN: BADGES, TITLE, DESCRIPTION, MODEL SELECTOR */}
              <div className="lg:col-span-7 space-y-6">

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200/80 shadow-xs">
                    <Flame className="w-3.5 h-3.5 text-blue-600" />
                    Smokeless Thermal Destruction
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200/80 shadow-xs">
                    <Thermometer className="w-3.5 h-3.5 text-blue-600" />
                    Automatic Digital Controller
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/80 shadow-xs">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    ISO 9001:2015 Certified
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    Solid Waste <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Incinerator Machine</span> (SWI)
                  </h1>
                  <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                    Heavy-duty electric Solid Waste Incinerator Machine used to dispose general dry waste & medical waste such as used PPE kits, masks, cotton, dry leaves, papers & other dry waste with automatic digital temperature control and 50mm ceramic insulation.
                  </p>
                </div>

                {/* MODEL VARIANT SELECTOR */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-4 sm:p-5 shadow-lg shadow-stone-200/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                      <Settings className="w-4 h-4 text-blue-600" />
                      Select Capacity Model
                    </span>
                    <span className="text-xs font-medium text-slate-500">Direct Factory Price</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Model SWI 3kW */}
                    <button
                      onClick={() => setSelectedVariant('SWI3KW')}
                      className={`relative p-4 rounded-xl text-left border transition-all duration-200 ${
                        selectedVariant === 'SWI3KW'
                          ? 'bg-gradient-to-br from-blue-50/90 to-indigo-50/40 border-blue-600 shadow-md ring-1 ring-blue-600/30'
                          : 'bg-stone-50/80 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {selectedVariant === 'SWI3KW' && (
                        <span className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                      <div className="font-extrabold text-slate-900 text-base">Model SWI 3kW</div>
                      <div className="text-xs font-bold text-blue-700 mt-0.5">Burns 5 - 8 kgs / Batch</div>
                      <div className="text-[11px] text-slate-600 mt-2 space-y-1">
                        <div>• Size: 1070 x 580 x 580 mm</div>
                        <div>• Heater: 3kW (220V Supply)</div>
                        <div>• 50mm Insulation & 4 Caster Wheels</div>
                      </div>
                      <div className="mt-3 text-sm font-black text-slate-900">
                        ₹1,65,000 <span className="text-[10px] text-slate-500 font-normal">+ GST</span>
                      </div>
                    </button>

                    {/* Model SWI 4.5kW */}
                    <button
                      onClick={() => setSelectedVariant('SWI4.5KW')}
                      className={`relative p-4 rounded-xl text-left border transition-all duration-200 ${
                        selectedVariant === 'SWI4.5KW'
                          ? 'bg-gradient-to-br from-blue-50/90 to-indigo-50/40 border-blue-600 shadow-md ring-1 ring-blue-600/30'
                          : 'bg-stone-50/80 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {selectedVariant === 'SWI4.5KW' && (
                        <span className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                      <div className="font-extrabold text-slate-900 text-base">Model SWI 4.5kW</div>
                      <div className="text-xs font-bold text-blue-700 mt-0.5">Burns 8 - 10 kgs / Batch</div>
                      <div className="text-[11px] text-slate-600 mt-2 space-y-1">
                        <div>• Size: 1200 x 600 x 600 mm</div>
                        <div>• Heater: 4.5kW (220V Supply)</div>
                        <div>• 50mm Insulation & 4 Caster Wheels</div>
                      </div>
                      <div className="mt-3 text-sm font-black text-slate-900">
                        ₹2,15,000 <span className="text-[10px] text-slate-500 font-normal">+ GST</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Key Spec Highlights Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white border border-stone-200/80 rounded-xl p-3 text-center shadow-xs">
                    <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-slate-900">45 Min Burn Time</div>
                    <div className="text-[10px] text-slate-500">Fast Cycle Duration</div>
                  </div>
                  <div className="bg-white border border-stone-200/80 rounded-xl p-3 text-center shadow-xs">
                    <Thermometer className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-slate-900">Digital Controller</div>
                    <div className="text-[10px] text-slate-500">Auto Temp Monitoring</div>
                  </div>
                  <div className="bg-white border border-stone-200/80 rounded-xl p-3 text-center shadow-xs">
                    <Shield className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-slate-900">50mm Insulation</div>
                    <div className="text-[10px] text-slate-500">High Heat Retention</div>
                  </div>
                  <div className="bg-white border border-stone-200/80 rounded-xl p-3 text-center shadow-xs">
                    <Layers className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-slate-900">MS Steel Body</div>
                    <div className="text-[10px] text-slate-500">Heavy Powder Coated</div>
                  </div>
                </div>

                {/* CTA BUTTONS */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      setQuoteSubmitted(false);
                      setShowQuoteModal(true);
                    }}
                    className="flex-1 sm:flex-none min-w-[200px] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold px-6 py-4 rounded-xl shadow-lg shadow-blue-600/25 transition transform active:scale-95 flex items-center justify-center gap-2 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get Instant B2B Quote</span>
                  </button>

                  <a
                    href="https://wa.me/918076496709?text=Hi%20AXA%20Industries,%20I%20want%20to%20know%20more%20about%20Solid%20Waste%20Incinerator%20Machine"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-6 py-4 rounded-xl border border-emerald-200 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Datasheet</span>
                  </a>

                  <button
                    onClick={handleShare}
                    className="p-4 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-slate-700 transition"
                    title="Share Page"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>

              </div>

              {/* RIGHT COLUMN: INTERACTIVE PRODUCT IMAGE VIEWER */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white border border-stone-200/80 rounded-3xl p-4 shadow-xl relative group overflow-hidden">

                  {/* Active Visual Container */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100/80 border border-stone-200 flex items-center justify-center p-2">
                    {activeGalleryTab === '3kw' && (
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/solid-waste-incinerator-5-8kg.jpg"
                          alt="AXA Solid Waste Incinerator Machine SWI 3kW (5-8kg)"
                          fill
                          className="object-contain rounded-xl"
                          priority
                        />
                      </div>
                    )}

                    {activeGalleryTab === '4.5kw' && (
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/solid-waste-incinerator-8-10kg.jpg"
                          alt="AXA Solid Waste Incinerator Machine SWI 4.5kW (8-10kg)"
                          fill
                          className="object-contain rounded-xl"
                        />
                      </div>
                    )}

                    {activeGalleryTab === 'installed' && (
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/solid-waste-incinerator-site-installed.jpg"
                          alt="AXA SWI Incinerator Installed Site Bio-Medical Waste Area"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    )}

                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 bg-white/95 border border-stone-200 text-slate-900 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md backdrop-blur-md">
                      AXA {selectedVariant === 'SWI3KW' ? 'Model SWI 3kW' : 'Model SWI 4.5kW'}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/90 border border-stone-200 text-slate-700 text-[10px] px-3 py-1 rounded-full font-mono backdrop-blur-md shadow-sm">
                      4 Caster Mobility Wheels
                    </div>
                  </div>

                  {/* GALLERY TAB BUTTONS */}
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <button
                      onClick={() => {
                        setActiveGalleryTab('3kw');
                        setSelectedVariant('SWI3KW');
                      }}
                      className={`p-2 rounded-xl text-xs font-bold transition border text-center ${
                        activeGalleryTab === '3kw'
                          ? 'bg-blue-50 border-blue-600 text-blue-800'
                          : 'bg-stone-50 border-stone-200 text-slate-600 hover:bg-stone-100'
                      }`}
                    >
                      3kW (5-8kg)
                    </button>
                    <button
                      onClick={() => {
                        setActiveGalleryTab('4.5kw');
                        setSelectedVariant('SWI4.5KW');
                      }}
                      className={`p-2 rounded-xl text-xs font-bold transition border text-center ${
                        activeGalleryTab === '4.5kw'
                          ? 'bg-blue-50 border-blue-600 text-blue-800'
                          : 'bg-stone-50 border-stone-200 text-slate-600 hover:bg-stone-100'
                      }`}
                    >
                      4.5kW (8-10kg)
                    </button>
                    <button
                      onClick={() => setActiveGalleryTab('installed')}
                      className={`p-2 rounded-xl text-xs font-bold transition border text-center ${
                        activeGalleryTab === 'installed'
                          ? 'bg-blue-50 border-blue-600 text-blue-800'
                          : 'bg-stone-50 border-stone-200 text-slate-600 hover:bg-stone-100'
                      }`}
                    >
                      Site View
                    </button>
                  </div>
                </div>

                {/* TRUST CARD */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-4 text-xs space-y-2 text-slate-700 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-blue-700 text-sm">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Commercial Quality & Guarantee
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>1-Year Full Unit Warranty</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Pan-India Direct Logistics</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>MSME & GeM Registered Vendor</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>On-Site Installation Support</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 3. TRUST STRIP */}
        <section className="border-y border-stone-200 bg-white py-6 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
              <div className="space-y-1">
                <div className="text-lg font-black text-slate-900">45 Min</div>
                <div className="text-xs text-slate-500">Fast Burning Cycle Time</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-blue-700">50mm Insulation</div>
                <div className="text-xs text-slate-500">High Heat Retention Core</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-blue-700">Digital Controller</div>
                <div className="text-xs text-slate-500">Automatic Temperature Control</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-slate-900">220V Electricity</div>
                <div className="text-xs text-slate-500">Standard AC Power Supply</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-amber-700">MS Steel Body</div>
                <div className="text-xs text-slate-500">Heavy Powder Coated Enclosure</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-slate-900">100% Made in India</div>
                <div className="text-xs text-slate-500">AXA Factory Manufactured</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TECHNICAL SPECIFICATIONS COMPARISON TABLE */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Technical Specifications & Model Comparison
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Detailed engineering parameters derived directly from official AXA Industries product datasheets.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-blue-600 text-white uppercase tracking-wider text-[11px] border-b border-blue-700">
                <tr>
                  <th className="p-4 sm:p-5 font-extrabold w-1/3">Technical Feature / Parameter</th>
                  <th className="p-4 sm:p-5 font-extrabold text-white w-1/3 bg-blue-700 border-x border-blue-800">
                    Model SWI 3kW (Standard)
                  </th>
                  <th className="p-4 sm:p-5 font-extrabold text-white w-1/3 bg-blue-600">
                    Model SWI 4.5kW (Heavy Capacity)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-normal">
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Batch Burning Capacity</td>
                  <td className="p-4 font-bold text-blue-800 bg-blue-50/50 border-x border-stone-200">Burns 5 - 8 kgs</td>
                  <td className="p-4 font-bold text-blue-800 bg-blue-50/30">Burns 8 - 10 kgs</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Dimensions (Size)</td>
                  <td className="p-4 bg-blue-50/30 border-x border-stone-200 font-mono text-xs">1070 x 580 x 580 mm</td>
                  <td className="p-4 bg-blue-50/20 font-mono text-xs">1200 x 600 x 600 mm</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Heater Power Output</td>
                  <td className="p-4 bg-blue-50/30 border-x border-stone-200 font-bold text-slate-900">Heater 3kW</td>
                  <td className="p-4 bg-blue-50/20 font-bold text-slate-900">Heater 4.5kW</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Burning Cycle Time</td>
                  <td className="p-4 bg-blue-50/30 border-x border-stone-200">Burning time 45 min</td>
                  <td className="p-4 bg-blue-50/20">Burning time 45 min</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Temperature Control</td>
                  <td className="p-4 bg-blue-50/30 border-x border-stone-200">Automatic digital temperature controller</td>
                  <td className="p-4 bg-blue-50/20">Automatic digital temperature controller</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Power Supply Voltage</td>
                  <td className="p-4 bg-blue-50/30 border-x border-stone-200 font-mono text-xs">220V Supply</td>
                  <td className="p-4 bg-blue-50/20 font-mono text-xs">220V Supply</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Thermal Insulation Layer</td>
                  <td className="p-4 bg-blue-50/30 border-x border-stone-200">50mm Thick insulation</td>
                  <td className="p-4 bg-blue-50/20">50mm Thick insulation</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Chassis & Body Material</td>
                  <td className="p-4 bg-blue-50/30 border-x border-stone-200">MS power coated body</td>
                  <td className="p-4 bg-blue-50/20">MS power coated body</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Mobility Mechanism</td>
                  <td className="p-4 bg-blue-50/30 border-x border-stone-200">4 Caster wheel</td>
                  <td className="p-4 bg-blue-50/20">4 Caster wheel</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. PRODUCT DESCRIPTION & PURPOSE */}
        <section className="py-12 bg-white border-y border-stone-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-blue-800 font-extrabold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Official Product Description
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  High-Capacity Solid & Medical Waste Thermal Destruction
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Solid Waste Incinerator Machine used to dispose general dry waste & medical waste such as used PPE kits, masks, cotton&apos;s, dry leaves, papers & other dry waste.
                </p>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Constructed with a heavy-duty MS powder-coated steel chassis, 50mm high-density thermal ceramic insulation, automatic digital temperature controller, and smooth 4-caster wheel mobility, the SWI series offers safe, smokeless, and eco-compliant waste disposal.
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">45-Minute Burn Cycle</div>
                      <div className="text-slate-500 text-[11px]">Rapid thermal conversion to sterile ash.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Automatic Digital Controller</div>
                      <div className="text-slate-500 text-[11px]">Precise temperature monitoring and auto cut-off.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FEATURES GRID CARDS */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-stone-50 border border-stone-200/80 p-5 rounded-2xl space-y-2 hover:border-blue-500/50 hover:bg-white shadow-xs transition">
                  <Flame className="w-8 h-8 text-blue-600" />
                  <h4 className="font-extrabold text-slate-900 text-base">5-10kg Batch Burn</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Designed for heavy-duty volume incinerating 5-8kg (3kW) or 8-10kg (4.5kW) per 45-minute cycle.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200/80 p-5 rounded-2xl space-y-2 hover:border-blue-500/50 hover:bg-white shadow-xs transition">
                  <Thermometer className="w-8 h-8 text-blue-600" />
                  <h4 className="font-extrabold text-slate-900 text-base">Digital Temp Controller</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automated thermostat system maintaining optimal combustion temperature for complete sterilization.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200/80 p-5 rounded-2xl space-y-2 hover:border-amber-500/50 hover:bg-white shadow-xs transition">
                  <Shield className="w-8 h-8 text-amber-600" />
                  <h4 className="font-extrabold text-slate-900 text-base">50mm Thermal Insulation</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    High-grade 50mm insulation lining ensuring maximum heat retention and cool exterior cabinet walls.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200/80 p-5 rounded-2xl space-y-2 hover:border-cyan-500/50 hover:bg-white shadow-xs transition">
                  <Wrench className="w-8 h-8 text-cyan-600" />
                  <h4 className="font-extrabold text-slate-900 text-base">4 Caster Wheels</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Heavy-duty lockable caster wheels for smooth mobility across factory floors and hospital wards.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. WHERE TO USE / TARGET APPLICATIONS */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Where to Use (Target Segments & Applications)
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Official deployment venues specified directly on the AXA Industries product datasheet.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: GraduationCap, title: "Girls' School & Colleges", desc: "Campus waste & hygiene management." },
              { icon: Users, title: "Women's Hostels", desc: "Residential waste treatment." },
              { icon: Hospital, title: "Hospitals & Medical Hubs", desc: "Biomedical masks, PPE & cotton disposal." },
              { icon: ShoppingBag, title: "Shopping Malls & Supermarkets", desc: "Commercial facility waste destruction." },
              { icon: Hotel, title: "Hotels & Restaurants", desc: "Hospitality waste management." },
              { icon: Building2, title: "Offices & Factories", desc: "Industrial dry waste & employee hygiene." },
              { icon: Plane, title: "Airports, Railways & Bus Stations", desc: "High-footfall transit terminal waste." },
              { icon: Building, title: "Public Toilets & Restrooms", desc: "Municipal Swachh Bharat cleanliness." },
              { icon: Sparkles, title: "Amusement Parks", desc: "Visitor center waste disposal." },
              { icon: Users, title: "Waiting Rooms", desc: "Institutional waiting hall waste." },
              { icon: Fuel, title: "Petrol Pumps", desc: "24/7 highway retail site waste." },
              { icon: Train, title: "Police Stations & Metro Stations", desc: "Public sector & infrastructure sites." }
            ].map((loc, idx) => (
              <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-4 hover:border-blue-500 hover:shadow-md transition group space-y-2">
                <loc.icon className="w-6 h-6 text-blue-600 group-hover:scale-110 transition transform" />
                <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{loc.title}</h4>
                <p className="text-[11px] text-slate-500 leading-normal">{loc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. FREQUENTLY ASKED QUESTIONS */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions (Institutional Procurement)
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Clear technical details regarding installation, power requirements, and warranty support.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "What waste materials can be disposed of in the SWI Incinerator?",
                a: "The SWI series is designed for general dry waste and medical waste including used PPE kits, face masks, cotton, dry leaves, paper waste, and institutional sanitary waste."
              },
              {
                q: "How long does a burning cycle take?",
                a: "The standard burning time is 45 minutes per batch. The automatic digital temperature controller monitors the cycle and shuts off power upon completion."
              },
              {
                q: "What is the difference between Model SWI 3kW and Model SWI 4.5kW?",
                a: "Model SWI 3kW burns 5 to 8 kgs per batch (dimensions 1070x580x580mm), while Model SWI 4.5kW burns 8 to 10 kgs per batch (dimensions 1200x600x600mm) for larger institutional needs."
              },
              {
                q: "What power supply is required?",
                a: "Both models operate on standard 220V AC single-phase electricity."
              },
              {
                q: "What is the warranty and after-sales support policy?",
                a: "AXA Industries provides a 1-year comprehensive warranty covering heating elements, digital temperature controllers, and internal components with pan-India service support."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-blue-600 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 8. REUSABLE B2B QUOTE MODAL */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white border border-stone-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-left my-8 text-slate-900">

            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-500 hover:text-slate-900 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {!quoteSubmitted ? (
              <div>
                <div className="mb-6">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-800 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                    Direct Institutional RFQ
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    Request Quotation - Solid Waste Incinerator Machine
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Fill in your organization details to receive direct factory pricing, GST invoice quotation, and delivery timelines within 2 hours.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Organization / Client Name *</label>
                      <input
                        type="text"
                        name="org"
                        required
                        placeholder="e.g. AIIMS Hospital / Tata Steel"
                        value={formData.orgName}
                        onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Contact Person Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Full Name"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="purchase@organization.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Estimated Quantity *</label>
                      <select
                        name="qty"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                      >
                        <option value="1 to 2 Units">1 to 2 Units</option>
                        <option value="3 to 5 Units">3 to 5 Units</option>
                        <option value="6 to 15 Units">6 to 15 Units</option>
                        <option value="16+ Units (Govt / Bulk Tender)">16+ Units (Bulk Enterprise / GeM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">City *</label>
                      <input
                        type="text"
                        placeholder="e.g. New Delhi / Bangalore"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">State *</label>
                    <input
                      type="text"
                      placeholder="State / Region"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Additional Requirements / Notes</label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="Specify waste type (medical PPE, cotton, paper), installation site setup, or GeM tender details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-xl text-sm shadow-lg shadow-blue-600/25 transition active:scale-98 flex items-center justify-center gap-2"
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
                <h3 className="text-2xl font-black text-slate-900">Quotation Request Received!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-slate-900">{formData.contactPerson}</span>. Your inquiry for <span className="font-bold text-blue-700">AXA Solid Waste Incinerator Machine</span> has been assigned to an AXA Sales Engineer.
                </p>
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs text-slate-600 space-y-1">
                  <div>Direct Phone: <span className="font-bold text-slate-900">+91 80764 96709</span></div>
                  <div>Official Email: <span className="font-bold text-slate-900">axaindustries.contact@gmail.com</span></div>
                </div>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 font-bold text-xs text-white rounded-xl transition"
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
