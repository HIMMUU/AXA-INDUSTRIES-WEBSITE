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
  Sparkles,
  ChevronDown,
  ChevronRight,
  Share2,
  Check,
  X,
  Building2,
  GraduationCap,
  Hospital,
  ShoppingBag,
  BarChart3,
  Wifi,
  Smartphone,
  CheckSquare,
  Hotel,
  Train,
  Plane,
  Building,
  Activity,
  Layers,
  AlertTriangle
} from 'lucide-react';

interface B2BPageProps {
  product?: Product;
}

export function FeedbackMachineB2BPage({ product }: B2BPageProps) {
  const [activeGalleryTab, setActiveGalleryTab] = useState<'front' | 'side' | 'installed' | 'brochure'>('front');
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
    orgType: 'Airport / Railway Station',
    quantity: '5 to 10 Units',
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
          fullName: name || 'Enterprise CSAT Lead',
          email: email || 'lead@organization.com',
          phone: phone || '9999999999',
          company: org || 'Commercial Client',
          productSlug: 'axa-sense-10-1-touch-feedback-machine-kiosk',
          productName: `AXA Swachh Toilet Feedback Machine`,
          quantity: qty,
          message: `[B2B Quote Request - Toilet Feedback Machine] Org Type: ${formData.orgType}, City: ${formData.city}, State: ${formData.state}. Additional Notes: ${notes}`
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
    <div className="min-h-screen bg-stone-50 text-slate-900 selection:bg-cyan-600 selection:text-white font-sans antialiased">
      {/* 1. TOP ANNOUNCEMENT STRIP */}
      <div className="bg-slate-900 text-slate-100 border-b border-slate-800 text-xs py-2 px-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-cyan-500 text-slate-950 font-extrabold px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider shadow-sm">
              Swachh Bharat Abhiyan Compliant
            </span>
            <span className="hidden md:inline text-slate-300 font-medium">
              Pan-India Institutional Supply • App-Based Monitoring • GeM Portal Vendor
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:+918076496709"
              className="flex items-center gap-1.5 font-bold text-cyan-300 hover:text-white transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span>+91 80764 96709</span>
            </a>

            <a
              href="https://wa.me/918076496709?text=Hi%20AXA%20Industries,%20I%20need%20a%20quotation%20for%20Swachh%20Toilet%20Feedback%20Machine"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Quote</span>
            </a>

            <button
              onClick={() => {
                setQuoteSubmitted(false);
                setShowQuoteModal(true);
              }}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-3 py-1 rounded-md transition shadow-md active:scale-95 flex items-center gap-1 text-[11px]"
            >
              <Send className="w-3 h-3" />
              <span>Request RFQ</span>
            </button>
          </div>
        </div>
      </div>

      <Navbar />

      <main className="pb-24">
        {/* BREADCRUMB */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-cyan-700 transition">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/products" className="hover:text-cyan-700 transition">
              Products
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-cyan-700 font-semibold truncate">
              Swachh Toilet Feedback Machine
            </span>
          </nav>
        </div>

        {/* 2. HERO SECTION */}
        <section className="relative pt-4 pb-16 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* LEFT COLUMN: BADGES, TITLE, DESCRIPTION, MODEL HIGHLIGHT */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200/80 shadow-xs">
                    <Activity className="w-3.5 h-3.5 text-cyan-600" />
                    Real-Time CSAT Analytics
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs">
                    <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                    App-Based Monitoring
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/80 shadow-xs">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    Swachh Bharat Certified
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    Swachh <span className="bg-gradient-to-r from-cyan-700 via-teal-600 to-emerald-700 bg-clip-text text-transparent">Toilet Feedback</span> Machine
                  </h1>
                  <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                    Enterprise washroom hygiene feedback system featuring 3 distinct color-coded push buttons (Excellent, Clean, Dirty). Designed for airports, railway stations, malls, corporate offices, and municipal washrooms for live CSAT auditing and supervisor alert management.
                  </p>
                </div>

                {/* SINGLE UNIFIED MODEL CARD */}
                <div className="bg-gradient-to-br from-cyan-50/90 via-white to-emerald-50/40 border-2 border-cyan-600/80 rounded-2xl p-5 shadow-lg shadow-cyan-600/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-700 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-600" />
                      Swachh Bharat Model Sense 3B
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      In Stock • Direct Supply
                    </span>
                  </div>

                  <div className="flex flex-wrap items-baseline justify-between gap-2 mt-2">
                    <div>
                      <div className="text-xl font-black text-slate-900">
                        ₹4,999 <span className="text-xs text-slate-500 font-normal">+ GST</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-600 mt-1">
                        Size: 210 x 160 x 70 mm • MS Powder Coated Body • App-Based Monitoring Software
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-cyan-200/60 text-xs text-slate-700 font-medium">
                    <div>• 3 Color Push Buttons</div>
                    <div>• 220V Electricity Operating</div>
                    <div>• Wall Surface Mountable</div>
                  </div>
                </div>

                {/* Key Features Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white border border-stone-200/80 rounded-xl p-3 text-center shadow-xs">
                    <CheckSquare className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-slate-900">3-State Buttons</div>
                    <div className="text-[10px] text-slate-500">Excellent / Clean / Dirty</div>
                  </div>
                  <div className="bg-white border border-stone-200/80 rounded-xl p-3 text-center shadow-xs">
                    <Smartphone className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-slate-900">App Integration</div>
                    <div className="text-[10px] text-slate-500">Live CSAT Software</div>
                  </div>
                  <div className="bg-white border border-stone-200/80 rounded-xl p-3 text-center shadow-xs">
                    <Layers className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-slate-900">MS Steel Body</div>
                    <div className="text-[10px] text-slate-500">Powder Coated Enclosure</div>
                  </div>
                  <div className="bg-white border border-stone-200/80 rounded-xl p-3 text-center shadow-xs">
                    <BarChart3 className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-slate-900">Live Reports</div>
                    <div className="text-[10px] text-slate-500">Cloud Excel Logs</div>
                  </div>
                </div>

                {/* CTA BUTTONS */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      setQuoteSubmitted(false);
                      setShowQuoteModal(true);
                    }}
                    className="flex-1 sm:flex-none min-w-[200px] bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-teal-500 text-white font-extrabold px-6 py-4 rounded-xl shadow-lg shadow-cyan-600/25 transition transform active:scale-95 flex items-center justify-center gap-2 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get Instant B2B Quote</span>
                  </button>

                  <a
                    href="https://wa.me/918076496709?text=Hi%20AXA%20Industries,%20I%20want%20to%20know%20more%20about%20Swachh%20Toilet%20Feedback%20Machine"
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
                    {activeGalleryTab === 'front' && (
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/feedback-machine-front.png"
                          alt="Swachh Toilet Feedback Machine Front View"
                          fill
                          className="object-contain rounded-xl"
                          priority
                        />
                      </div>
                    )}

                    {activeGalleryTab === 'side' && (
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/feedback-machine-side.jpg"
                          alt="Swachh Toilet Feedback Machine Side Angle View"
                          fill
                          className="object-contain rounded-xl"
                        />
                      </div>
                    )}

                    {activeGalleryTab === 'installed' && (
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/feedback-machine-washroom-installed.jpg"
                          alt="Toilet Feedback Machine Installed in Modern Washroom"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    )}

                    {activeGalleryTab === 'brochure' && (
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/feedback-machine-brochure.png"
                          alt="AXA Toilet Feedback Machine Official Datasheet Brochure"
                          fill
                          className="object-contain rounded-xl"
                        />
                      </div>
                    )}

                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md backdrop-blur-md">
                      AXA Model Sense 3B
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/90 border border-stone-200 text-slate-700 text-[10px] px-3 py-1 rounded-full font-mono backdrop-blur-md shadow-sm">
                      Swachh Bharat Enclosure
                    </div>
                  </div>

                  {/* GALLERY TAB BUTTONS */}
                  <div className="grid grid-cols-4 gap-1.5 mt-3">
                    <button
                      onClick={() => setActiveGalleryTab('front')}
                      className={`p-2 rounded-xl text-xs font-bold transition border text-center ${
                        activeGalleryTab === 'front'
                          ? 'bg-cyan-50 border-cyan-600 text-cyan-800'
                          : 'bg-stone-50 border-stone-200 text-slate-600 hover:bg-stone-100'
                      }`}
                    >
                      Front
                    </button>
                    <button
                      onClick={() => setActiveGalleryTab('side')}
                      className={`p-2 rounded-xl text-xs font-bold transition border text-center ${
                        activeGalleryTab === 'side'
                          ? 'bg-cyan-50 border-cyan-600 text-cyan-800'
                          : 'bg-stone-50 border-stone-200 text-slate-600 hover:bg-stone-100'
                      }`}
                    >
                      Side 3D
                    </button>
                    <button
                      onClick={() => setActiveGalleryTab('installed')}
                      className={`p-2 rounded-xl text-xs font-bold transition border text-center ${
                        activeGalleryTab === 'installed'
                          ? 'bg-cyan-50 border-cyan-600 text-cyan-800'
                          : 'bg-stone-50 border-stone-200 text-slate-600 hover:bg-stone-100'
                      }`}
                    >
                      Washroom
                    </button>
                    <button
                      onClick={() => setActiveGalleryTab('brochure')}
                      className={`p-2 rounded-xl text-xs font-bold transition border text-center ${
                        activeGalleryTab === 'brochure'
                          ? 'bg-cyan-50 border-cyan-600 text-cyan-800'
                          : 'bg-stone-50 border-stone-200 text-slate-600 hover:bg-stone-100'
                      }`}
                    >
                      Brochure
                    </button>
                  </div>
                </div>

                {/* TRUST CARD */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-4 text-xs space-y-2 text-slate-700 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-cyan-700 text-sm">
                    <ShieldCheck className="w-4 h-4 text-cyan-600" />
                    Commercial Quality & Guarantee
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>1-Year Full Device Warranty</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Pan-India Direct Shipping</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>MSME & GeM Portal Vendor</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Cloud Software Support</span>
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
                <div className="text-lg font-black text-slate-900">210x160x70 mm</div>
                <div className="text-xs text-slate-500">Compact Dimensions</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-emerald-700">Swachh Bharat</div>
                <div className="text-xs text-slate-500">Govt Protocol Compliant</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-cyan-700">App Monitoring</div>
                <div className="text-xs text-slate-500">Live CSAT Software</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-slate-900">MS Steel</div>
                <div className="text-xs text-slate-500">Heavy Powder Coated Body</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-amber-700">220V Electricity</div>
                <div className="text-xs text-slate-500">Low Power Consumption</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-slate-900">100% Made in India</div>
                <div className="text-xs text-slate-500">AXA Factory Manufactured</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PRODUCT DESCRIPTION & ENGINEERING OVERVIEW */}
        <section className="py-12 bg-white border-y border-stone-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-cyan-800 font-extrabold text-xs uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-md border border-cyan-200">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600" /> CSAT Hygiene Automation
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Real-Time Washroom Cleanliness Auditing & Supervisor Alerts
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  AXA Toilet Feedback System is engineered for institutional washrooms to monitor user satisfaction in real time. Featuring 3 distinct push buttons—Green for Excellent, Yellow for Clean/Average, and Red for Dirty—it gives facility managers instant visibility into washroom hygiene standards.
                </p>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Constructed with a heavy-duty MS powder-coated steel chassis and front-facing Swachh Bharat branding, the unit connects directly to our cloud software for continuous CSAT tracking and automated maintenance alerts.
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Instant Cleaning Dispatch</div>
                      <div className="text-slate-500 text-[11px]">Auto triggers supervisor alerts on negative feedback.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Vandal-Proof Heavy Steel</div>
                      <div className="text-slate-500 text-[11px]">Industrial powder-coated cabinet for high-traffic zones.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FEATURES GRID CARDS */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-stone-50 border border-stone-200/80 p-5 rounded-2xl space-y-2 hover:border-cyan-500/50 hover:bg-white shadow-xs transition">
                  <CheckSquare className="w-8 h-8 text-cyan-600" />
                  <h4 className="font-extrabold text-slate-900 text-base">3-State Push Buttons</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tactile Green (Excellent), Yellow (Clean), and Red (Dirty) buttons with instant visual response.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200/80 p-5 rounded-2xl space-y-2 hover:border-emerald-500/50 hover:bg-white shadow-xs transition">
                  <Smartphone className="w-8 h-8 text-emerald-600" />
                  <h4 className="font-extrabold text-slate-900 text-base">App & Live Software</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    App-based software for monitoring live feedbacks and facility performance metrics.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200/80 p-5 rounded-2xl space-y-2 hover:border-amber-500/50 hover:bg-white shadow-xs transition">
                  <AlertTriangle className="w-8 h-8 text-amber-600" />
                  <h4 className="font-extrabold text-slate-900 text-base">Instant SMS Alerts</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Optional SMS module sending immediate alerts to cleaning staff when "Dirty" button is pressed repeatedly.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200/80 p-5 rounded-2xl space-y-2 hover:border-teal-500/50 hover:bg-white shadow-xs transition">
                  <BarChart3 className="w-8 h-8 text-teal-600" />
                  <h4 className="font-extrabold text-slate-900 text-base">Excel CSAT Analytics</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automated Excel reports showing hourly, daily, and monthly cleanliness scores across multiple facilities.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. WHERE TO USE / TARGET APPLICATIONS */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Ideal Deployment Locations & Institutional Use
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Designed for public infrastructure, commercial buildings, and government washroom facilities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Plane, title: 'Airports & Bus Terminals', desc: 'High-footfall transit hub washroom monitoring.' },
              { icon: Train, title: 'Railway & Metro Stations', desc: 'Swachh Bharat protocol compliance for platforms.' },
              { icon: ShoppingBag, title: 'Shopping Malls & Retail', desc: 'Customer experience CSAT auditing in rest areas.' },
              { icon: Hospital, title: 'Hospitals & Medical Centers', desc: 'Strict hygiene control in clinical washrooms.' },
              { icon: Building2, title: 'Corporate Offices & IT Parks', desc: 'Facility manager SLAs and housekeeping audits.' },
              { icon: GraduationCap, title: 'Colleges & Universities', desc: 'Campus hygiene monitoring and maintenance.' },
              { icon: Hotel, title: 'Hotels & Restaurants', desc: 'Maintaining 5-star washroom standards for guests.' },
              { icon: Building, title: 'Govt Offices & Public Restrooms', desc: 'Municipal Swachh Bharat score tracking.' }
            ].map((loc, idx) => (
              <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-4 hover:border-cyan-500 hover:shadow-md transition group space-y-2">
                <loc.icon className="w-6 h-6 text-cyan-600 group-hover:scale-110 transition transform" />
                <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{loc.title}</h4>
                <p className="text-[11px] text-slate-500 leading-normal">{loc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FREQUENTLY ASKED QUESTIONS */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions (Institutional Procurement)
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Clear technical details regarding installation, app connectivity, and warranty support.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "How does the 3-button feedback system operate?",
                a: "Visitors press one of three color-coded buttons: Green for 'Excellent', Yellow for 'Clean', or Red for 'Dirty'. The device registers the vote locally or transmits it to the cloud app in real time."
              },
              {
                q: "What happens when a user presses the 'Dirty' button?",
                a: "Pressing 'Dirty' can trigger an immediate SMS or app notification to the designated washroom supervisor so housekeeping can be dispatched instantly."
              },
              {
                q: "Does the machine require a continuous Wi-Fi connection?",
                a: "Standard models store counts locally on internal memory. IoT models feature built-in 4G SIM connectivity or Wi-Fi to sync live data automatically."
              },
              {
                q: "Is the machine durable against water splashes and vandalism?",
                a: "Yes! The unit features a heavy-duty MS powder-coated steel enclosure with sealed industrial push buttons designed specifically for high-moisture public washroom environments."
              },
              {
                q: "What is the warranty and after-sales support policy?",
                a: "AXA Industries provides a 1-year comprehensive hardware warranty covering internal control circuitry and buttons. Pan-India spare parts and technical support are available."
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
                  <ChevronDown className={`w-4 h-4 text-cyan-600 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
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

      {/* 7. REUSABLE B2B QUOTE MODAL */}
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
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded border border-cyan-200">
                    Direct Institutional RFQ
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    Request Quotation - Toilet Feedback Machine
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
                        placeholder="e.g. Delhi Metro / Airport Authority"
                        value={formData.orgName}
                        onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-cyan-600 focus:bg-white focus:outline-none"
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
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-cyan-600 focus:bg-white focus:outline-none"
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
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-cyan-600 focus:bg-white focus:outline-none"
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
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-cyan-600 focus:bg-white focus:outline-none"
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
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-cyan-600 focus:bg-white focus:outline-none"
                      >
                        <option value="1 to 4 Units">1 to 4 Units</option>
                        <option value="5 to 10 Units">5 to 10 Units</option>
                        <option value="11 to 30 Units">11 to 30 Units</option>
                        <option value="31+ Units (Bulk Tender / Govt)">31+ Units (Bulk Enterprise / GeM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">City *</label>
                      <input
                        type="text"
                        placeholder="e.g. New Delhi / Bangalore"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-cyan-600 focus:bg-white focus:outline-none"
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
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-cyan-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Additional Requirements / Notes</label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="Specify custom logo branding, installation venue type, or GeM tender details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-cyan-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-teal-500 text-white font-extrabold rounded-xl text-sm shadow-lg shadow-cyan-600/25 transition active:scale-98 flex items-center justify-center gap-2"
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
                  Thank you, <span className="font-bold text-slate-900">{formData.contactPerson}</span>. Your inquiry for <span className="font-bold text-cyan-700">AXA Swachh Toilet Feedback Machine</span> has been assigned to an AXA Sales Engineer.
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
