'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@axa/types';
import { formatCurrency } from '@axa/utils';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  ShieldCheck,
  CheckCircle2,
  Download,
  PhoneCall,
  Send,
  MessageSquare,
  Award,
  Zap,
  BatteryCharging,
  Layers,
  Wrench,
  Building2,
  GraduationCap,
  Hospital,
  Factory,
  Building,
  ChevronDown,
  ChevronRight,
  Star,
  FileText,
  HelpCircle,
  QrCode,
  Sparkles,
  ArrowRight,
  Check,
  Package,
  Share2,
  Clock,
  Settings,
  X,
  Lock,
  ThumbsUp,
  MapPin,
  ShoppingBag,
  Coins,
  Receipt,
  Leaf,
  BarChart3,
  Bus,
  Train,
  Plane,
  Fuel,
  Hotel
} from 'lucide-react';

interface B2BPageProps {
  product?: Product;
}

export function ClothBagVendingB2BPage({ product }: B2BPageProps) {
  const [activeGalleryTab, setActiveGalleryTab] = useState<'front' | 'inside' | 'perspective' | 'installed' | 'specs'>('front');
  const [selectedVariant, setSelectedVariant] = useState<'CBV100' | 'CBV300'>('CBV100');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sustainability calculator state
  const [dailyBags, setDailyBags] = useState<number>(100);

  // Form State
  const [formData, setFormData] = useState({
    orgName: '',
    contactPerson: '',
    designation: '',
    phone: '',
    email: '',
    orgType: 'Supermarket / Mall',
    model: 'CBV-100 (100 Bags Capacity)',
    quantity: '2 to 5 Units',
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
    const org = (formValues.get('org') || formValues.get('organization') || formData.orgName || '').toString();
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
          productSlug: 'automatic-cloth-bag-vending-machine',
          productName: `AXA Automatic Cloth Bag Vending Machine (${selectedVariant})`,
          quantity: qty,
          message: `[B2B Quote Request - Cloth Bag Vending Machine] Model: ${selectedVariant}, Org Type: ${formData.orgType}, City: ${formData.city}, State: ${formData.state}. Additional Notes: ${notes}`
        })
      });
    } catch (err) {
      console.warn('Enquiry submission fallback:', err);
    } finally {
      setIsSubmitting(false);
      setQuoteSubmitted(true);
    }
  };

  // Calculations for sustainability impact
  const annualPlasticBagsEliminated = dailyBags * 365;
  const annualCO2SavedKg = Math.round(annualPlasticBagsEliminated * 0.06); // ~60g CO2 saved per plastic bag replaced

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 selection:bg-teal-600 selection:text-white font-sans antialiased">
      <Navbar />

      <main className="pt-28 pb-24">
        {/* 1. TOP ANNOUNCEMENT & DIRECT CONTACT STRIP */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="bg-teal-50/90 text-slate-800 border border-teal-200/80 text-xs py-2.5 px-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="bg-teal-600 text-white font-extrabold px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-wider shadow-xs">
                Swachh Bharat & CSR Ready
              </span>
              <span className="hidden md:inline text-slate-600 font-medium">
                Pan-India Commercial Supply • Direct Factory Billing • GeM Portal Vendor
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <a
                href="tel:+918076496709"
                className="flex items-center gap-1.5 font-bold text-teal-700 hover:text-teal-900 transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
                <span>+91 80764 96709</span>
              </a>

              <a
                href="https://wa.me/918076496709?text=Hi%20AXA%20Industries,%20I%20need%20a%20quotation%20for%20Automatic%20Cloth%20Bag%20Vending%20Machine"
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
                className="bg-teal-600 hover:bg-teal-500 text-white font-extrabold px-3 py-1 rounded-lg transition shadow-md active:scale-95 flex items-center gap-1 text-[11px]"
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
            <Link href="/" className="hover:text-teal-700 transition">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/products" className="hover:text-teal-700 transition">
              Products
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-teal-700 font-semibold truncate">
              Automatic Cloth Bag Vending Machine
            </span>
          </nav>
        </div>

        {/* 2. HERO SECTION */}
        <section className="relative pt-4 pb-16 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* LEFT COLUMN: BADGES, TITLE, DESCRIPTION, VARIANT SELECTOR */}
              <div className="lg:col-span-7 space-y-6">

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200/80 shadow-xs">
                    <Leaf className="w-3.5 h-3.5 text-teal-600" />
                    Zero Plastic Initiative
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs">
                    <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                    Coin + Note + UPI QR Payment
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/80 shadow-xs">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    ISO 9001:2015 Certified
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    Automatic <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-700 bg-clip-text text-transparent">Cloth Bag Vending</span> Machine
                  </h1>
                  <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                    Enterprise IoT-based automatic cloth bag dispenser machine designed for supermarkets, shopping malls, metro stations, colleges, and public places. Dispenses durable reusable cloth bags via automated coin, banknote, and instant UPI QR payments.
                  </p>
                </div>

                {/* MODEL VARIANT SELECTOR */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-4 sm:p-5 shadow-lg shadow-stone-200/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700 flex items-center gap-1.5">
                      <Settings className="w-4 h-4 text-teal-600" />
                      Select Capacity Model
                    </span>
                    <span className="text-xs font-medium text-slate-500">Direct Commercial Supply</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Model CBV-100 */}
                    <button
                      onClick={() => setSelectedVariant('CBV100')}
                      className={`relative p-4 rounded-xl text-left border transition-all duration-200 ${selectedVariant === 'CBV100'
                          ? 'bg-gradient-to-br from-teal-50/90 to-emerald-50/40 border-teal-600 shadow-md ring-1 ring-teal-600/30'
                          : 'bg-stone-50/80 border-stone-200 hover:border-stone-300'
                        }`}
                    >
                      {selectedVariant === 'CBV100' && (
                        <span className="absolute top-3 right-3 w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                      <div className="font-extrabold text-slate-900 text-base">Model CBV-100</div>
                      <div className="text-xs font-bold text-teal-700 mt-0.5">100 Cloth Bags Capacity</div>
                      <div className="text-[11px] text-slate-600 mt-2 space-y-1">
                        <div>• Size: 815 x 880 x 190 mm</div>
                        <div>• Multi-Coin Acceptor</div>
                        <div>• 230V AC Electricity</div>
                      </div>
                      <div className="mt-3 text-sm font-black text-slate-900">
                        ₹18,500 <span className="text-[10px] text-slate-500 font-normal">+ GST</span>
                      </div>
                    </button>

                    {/* Model CBV-300 */}
                    <button
                      onClick={() => setSelectedVariant('CBV300')}
                      className={`relative p-4 rounded-xl text-left border transition-all duration-200 ${selectedVariant === 'CBV300'
                          ? 'bg-gradient-to-br from-teal-50/90 to-emerald-50/40 border-teal-600 shadow-md ring-1 ring-teal-600/30'
                          : 'bg-stone-50/80 border-stone-200 hover:border-stone-300'
                        }`}
                    >
                      {selectedVariant === 'CBV300' && (
                        <span className="absolute top-3 right-3 w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                      <div className="font-extrabold text-slate-900 text-base">Model CBV-300</div>
                      <div className="text-xs font-bold text-emerald-700 mt-0.5">300 Cloth Bags Capacity</div>
                      <div className="text-[11px] text-slate-600 mt-2 space-y-1">
                        <div>• Size: 1143 x 1050 x 300 mm</div>
                        <div>• Coin + Note Acceptor + UPI QR</div>
                        <div>• 220V - 240V AC, 50Hz</div>
                      </div>
                      <div className="mt-3 text-sm font-black text-slate-900">
                        ₹28,500 <span className="text-[10px] text-slate-500 font-normal">+ GST</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Key Spec Highlights Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white border border-stone-200/80 rounded-xl p-3 text-center shadow-xs">
                    <Coins className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-slate-900">Multi-Payment</div>
                    <div className="text-[10px] text-slate-500">Coin / Note / UPI</div>
                  </div>
                  <div className="bg-white border border-stone-200/80 rounded-xl p-3 text-center shadow-xs">
                    <Receipt className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-slate-900">LCD Guide</div>
                    <div className="text-[10px] text-slate-500">Step-by-Step Display</div>
                  </div>
                  <div className="bg-white border border-stone-200/80 rounded-xl p-3 text-center shadow-xs">
                    <BatteryCharging className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-slate-900">Battery Backup</div>
                    <div className="text-[10px] text-slate-500">Inbuilt Power Guard</div>
                  </div>
                  <div className="bg-white border border-stone-200/80 rounded-xl p-3 text-center shadow-xs">
                    <BarChart3 className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-slate-900">IoT Telemetry</div>
                    <div className="text-[10px] text-slate-500">Excel Sales Reports</div>
                  </div>
                </div>

                {/* CTA BUTTONS */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      setQuoteSubmitted(false);
                      setShowQuoteModal(true);
                    }}
                    className="flex-1 sm:flex-none min-w-[200px] bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold px-6 py-4 rounded-xl shadow-lg shadow-teal-600/25 transition transform active:scale-95 flex items-center justify-center gap-2 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get Instant B2B Quote</span>
                  </button>

                  <a
                    href="https://wa.me/918076496709?text=Hi%20AXA%20Industries,%20I%20want%20to%20know%20more%20about%20Automatic%20Cloth%20Bag%20Vending%20Machine"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-6 py-4 rounded-xl border border-emerald-200 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Spec Sheet</span>
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
                          src="/images/cloth-bag-vending-pink-front.png"
                          alt="AXA Automatic Cloth Bag Vending Machine Front View"
                          fill
                          className="object-contain rounded-xl"
                          priority
                        />
                      </div>
                    )}

                    {activeGalleryTab === 'inside' && (
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/cloth-bag-vending-pink-inside.png"
                          alt="AXA Cloth Bag Vending Machine Open Cabinet Internal View"
                          fill
                          className="object-contain rounded-xl"
                        />
                      </div>
                    )}

                    {activeGalleryTab === 'perspective' && (
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/cloth-bag-vending-pink-perspective.png"
                          alt="AXA Cloth Bag Vending Machine 3D Angle View"
                          fill
                          className="object-contain rounded-xl"
                        />
                      </div>
                    )}

                    {activeGalleryTab === 'installed' && (
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/cloth-bag-vending-supermarket-installed.jpg"
                          alt="AXA Cloth Bag Vending Machine Installed at Supermarket Checkout"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    )}

                    {activeGalleryTab === 'specs' && (
                      <div className="w-full h-full bg-slate-900 p-4 rounded-xl text-left overflow-y-auto space-y-3 font-mono text-xs text-slate-100">
                        <div className="text-teal-400 font-bold text-sm border-b border-teal-800/60 pb-1">
                          AXA CBV-SERIES TECHNICAL SPECIFICATION
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-slate-300">
                          <div><span className="text-slate-400">Chassis:</span> MS Powder Coated</div>
                          <div><span className="text-slate-400">Backup:</span> Inbuilt Battery</div>
                          <div><span className="text-slate-400">CBV-100 Size:</span> 815x880x190mm</div>
                          <div><span className="text-slate-400">CBV-300 Size:</span> 1143x1050x300mm</div>
                          <div><span className="text-slate-400">Acceptor:</span> Multi-Coin & Note</div>
                          <div><span className="text-slate-400">UPI QR:</span> Dynamic / Static</div>
                          <div><span className="text-slate-400">Stock Sensor:</span> Auto-Reject Coin</div>
                          <div><span className="text-slate-400">Reports:</span> IoT Excel (Optional)</div>
                        </div>
                        <div className="bg-teal-950 p-3 rounded-lg border border-teal-800/60 text-[11px] text-teal-200">
                          LCD guidance guides buyers step-by-step and displays real-time bag price & available stock.
                        </div>
                      </div>
                    )}

                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md backdrop-blur-md">
                      AXA Model CBV-100
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/90 border border-stone-200 text-slate-700 text-[10px] px-3 py-1 rounded-full font-mono backdrop-blur-md shadow-sm">
                      Vandal Proof MS Steel Body
                    </div>
                  </div>

                  {/* GALLERY TAB BUTTONS */}
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    <button
                      onClick={() => setActiveGalleryTab('front')}
                      className={`p-1.5 rounded-lg text-[10px] font-bold transition border text-center ${activeGalleryTab === 'front'
                          ? 'bg-teal-50 border-teal-600 text-teal-800'
                          : 'bg-stone-50 border-stone-200 text-slate-600 hover:bg-stone-100'
                        }`}
                    >
                      Front
                    </button>
                    <button
                      onClick={() => setActiveGalleryTab('inside')}
                      className={`p-1.5 rounded-lg text-[10px] font-bold transition border text-center ${activeGalleryTab === 'inside'
                          ? 'bg-teal-50 border-teal-600 text-teal-800'
                          : 'bg-stone-50 border-stone-200 text-slate-600 hover:bg-stone-100'
                        }`}
                    >
                      Inside
                    </button>
                    <button
                      onClick={() => setActiveGalleryTab('perspective')}
                      className={`p-1.5 rounded-lg text-[10px] font-bold transition border text-center ${activeGalleryTab === 'perspective'
                          ? 'bg-teal-50 border-teal-600 text-teal-800'
                          : 'bg-stone-50 border-stone-200 text-slate-600 hover:bg-stone-100'
                        }`}
                    >
                      3D
                    </button>
                    <button
                      onClick={() => setActiveGalleryTab('installed')}
                      className={`p-1.5 rounded-lg text-[10px] font-bold transition border text-center ${activeGalleryTab === 'installed'
                          ? 'bg-teal-50 border-teal-600 text-teal-800'
                          : 'bg-stone-50 border-stone-200 text-slate-600 hover:bg-stone-100'
                        }`}
                    >
                      Installation
                    </button>

                  </div>
                </div>

                {/* TRUST CARD */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-4 text-xs space-y-2 text-slate-700 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-teal-700 text-sm">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    Commercial Guarantee & Delivery
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>1-Year Full Machine Warranty</span>
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
                <div className="text-lg font-black text-slate-900">ISO 9001:2015</div>
                <div className="text-xs text-slate-500">Certified Manufacturing</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-emerald-700">Swachh Bharat</div>
                <div className="text-xs text-slate-500">Plastic Ban Compliant</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-slate-900">Multi-Payment</div>
                <div className="text-xs text-slate-500">Coins, Notes & UPI QR</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-teal-700">IoT Telemetry</div>
                <div className="text-xs text-slate-500">Excel Sales Reports</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-slate-900">100% Powder Coated</div>
                <div className="text-xs text-slate-500">Heavy MS Steel Cabinet</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-amber-700">Vocal for Local</div>
                <div className="text-xs text-slate-500">100% Made in India</div>
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
              Detailed engineering parameters derived directly from AXA Industries official product datasheets.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-stone-900 text-stone-100 uppercase tracking-wider text-[11px] border-b border-stone-800">
                <tr>
                  <th className="p-4 sm:p-5 font-extrabold w-1/3">Technical Feature / Parameter</th>
                  <th className="p-4 sm:p-5 font-extrabold text-teal-300 w-1/3 bg-stone-950 border-x border-stone-800">
                    Model CBV-100 (Compact)
                  </th>
                  <th className="p-4 sm:p-5 font-extrabold text-emerald-300 w-1/3 bg-stone-900">
                    Model CBV-300 (Enterprise)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-normal">
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Storage Capacity</td>
                  <td className="p-4 font-bold text-teal-800 bg-teal-50/50 border-x border-stone-200">100 Cloth Bags</td>
                  <td className="p-4 font-bold text-emerald-800 bg-emerald-50/50">300 Cloth Bags</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Dimensions (H x W x D)</td>
                  <td className="p-4 bg-teal-50/30 border-x border-stone-200 font-mono text-xs">815 x 880 x 190 mm</td>
                  <td className="p-4 bg-emerald-50/30 font-mono text-xs">1143 x 1050 x 300 mm</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Payment Acceptance Modes</td>
                  <td className="p-4 bg-teal-50/30 border-x border-stone-200">Multi-Coin Acceptor</td>
                  <td className="p-4 bg-emerald-50/30">Multi-Coin + Note Acceptor + UPI QR Payment</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Chassis & Body Material</td>
                  <td className="p-4 bg-teal-50/30 border-x border-stone-200">Heavy MS Powder Coated Body</td>
                  <td className="p-4 bg-emerald-50/30">Heavy MS Powder Coated Body</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Customer Guidance Display</td>
                  <td className="p-4 bg-teal-50/30 border-x border-stone-200">
                    LCD Display guides buyer in every step and shows message to collect cloth bag after dispensing
                  </td>
                  <td className="p-4 bg-emerald-50/30">
                    LCD Display guides buyer in every step and shows message to collect cloth bag after dispensing
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Stock & Pricing Display</td>
                  <td className="p-4 bg-teal-50/30 border-x border-stone-200">LCD Display shows live stock with bag price</td>
                  <td className="p-4 bg-emerald-50/30">LCD Display shows live stock with bag price</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Empty Stock Protection</td>
                  <td className="p-4 bg-teal-50/30 border-x border-stone-200">Machine automatically rejects coins when empty</td>
                  <td className="p-4 bg-emerald-50/30">Machine automatically rejects coins & notes when empty</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Battery Backup System</td>
                  <td className="p-4 bg-teal-50/30 border-x border-stone-200">Inbuilt Battery Backup included</td>
                  <td className="p-4 bg-emerald-50/30">Inbuilt Battery Backup included</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Power Supply & Voltage</td>
                  <td className="p-4 bg-teal-50/30 border-x border-stone-200">Works on Electricity (230V AC)</td>
                  <td className="p-4 bg-emerald-50/30">220V - 240V AC, Frequency 50Hz</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Sales & Analytics Reporting</td>
                  <td className="p-4 bg-teal-50/30 border-x border-stone-200">After sales report in Excel format (Optional)</td>
                  <td className="p-4 bg-emerald-50/30">After sales report in Excel format (Optional)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Mounting Options</td>
                  <td className="p-4 bg-teal-50/30 border-x border-stone-200">Wall Mountable / Stand Kiosk</td>
                  <td className="p-4 bg-emerald-50/30">Floor Stand Kiosk / Wall Mountable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. PRODUCT DESCRIPTION & ENGINEERING HIGHLIGHTS */}
        <section className="py-12 bg-white border-y border-stone-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-teal-800 font-extrabold text-xs uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-md border border-teal-200">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Product Engineering Overview
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Automated Cloth Bag Dispensing Solution for Plastic-Free Spaces
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Automatic Cloth Bag Vending machine is an essential technology product that should become a norm at all commercial and public places. Our unique IoT-based fully automatic cloth bag dispenser allows people to avail cloth bags that are convenient, durable and safe to use.
                </p>

                <p className="text-sm text-slate-600 leading-relaxed">
                  A simple coin- and UPI-operated cloth bag dispenser machine is designed to help people avail eco-friendly reusable bags to serve multiple purposes while actively reducing single-use plastic carry bag pollution across urban infrastructure.
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Fail-Safe Auto Rejection</div>
                      <div className="text-slate-500 text-[11px]">Prevents coin insertion when bag stock is empty.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Dynamic UPI & Coin Integration</div>
                      <div className="text-slate-500 text-[11px]">Accepts ₹1, ₹2, ₹5, ₹10 coins, notes & GPay/PhonePe.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FEATURES GRID CARDS */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-stone-50 border border-stone-200/80 p-5 rounded-2xl space-y-2 hover:border-teal-500/50 hover:bg-white shadow-xs transition">
                  <Coins className="w-8 h-8 text-teal-600" />
                  <h4 className="font-extrabold text-slate-900 text-base">Multi-Coin & Note Acceptor</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Advanced optical coin & note validator recognizing all standard Indian currency denominations with 99.8% precision.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200/80 p-5 rounded-2xl space-y-2 hover:border-emerald-500/50 hover:bg-white shadow-xs transition">
                  <QrCode className="w-8 h-8 text-emerald-600" />
                  <h4 className="font-extrabold text-slate-900 text-base">Instant UPI QR Scanner</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Integrated digital display generating instant UPI QR codes compatible with GPay, PhonePe, Paytm & BHIM apps.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200/80 p-5 rounded-2xl space-y-2 hover:border-cyan-500/50 hover:bg-white shadow-xs transition">
                  <Receipt className="w-8 h-8 text-cyan-600" />
                  <h4 className="font-extrabold text-slate-900 text-base">LCD Step-by-Step Display</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    User-friendly digital display showing price per bag, remaining stock count, and dispensing progress.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200/80 p-5 rounded-2xl space-y-2 hover:border-amber-500/50 hover:bg-white shadow-xs transition">
                  <BarChart3 className="w-8 h-8 text-amber-600" />
                  <h4 className="font-extrabold text-slate-900 text-base">IoT Excel Sales Telemetry</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Optional cloud telemetry system generating automated Excel sales logs & low-stock SMS alert notifications.
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
              Ideal Deployment Locations & Target Segments
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Designed for high-traffic commercial and municipal locations replacing single-use plastic bags.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: ShoppingBag, title: 'Shopping Malls & Supermarkets', desc: 'Essential near checkout counters & entrance lobbies.' },
              { icon: Building2, title: 'Offices & Corporate Factories', desc: 'For employee cafeteria & eco-initiatives.' },
              { icon: GraduationCap, title: 'Schools, Colleges & Hostels', desc: 'Promoting green habits among students.' },
              { icon: Hospital, title: 'Hospitals & Waiting Rooms', desc: 'Hygienic bag dispensing in medical campuses.' },
              { icon: Hotel, title: 'Hotels & Restaurants', desc: 'Guest convenience in hospitality hubs.' },
              { icon: Plane, title: 'Airports & Bus Stations', desc: 'Transit passengers needing travel carry bags.' },
              { icon: Train, title: 'Railways & Metro Stations', desc: 'High-footfall transit hubs & platforms.' },
              { icon: Fuel, title: 'Petrol Pumps & Amusement Parks', desc: '24/7 public access points & retail shops.' }
            ].map((loc, idx) => (
              <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-4 hover:border-teal-500 hover:shadow-md transition group space-y-2">
                <loc.icon className="w-6 h-6 text-teal-600 group-hover:scale-110 transition transform" />
                <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{loc.title}</h4>
                <p className="text-[11px] text-slate-500 leading-normal">{loc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. INTERACTIVE SUSTAINABILITY & PLASTIC BAG CALCULATOR */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal-50/90 via-white to-emerald-50/50 text-slate-900 border border-teal-200/80 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-teal-800 font-extrabold text-xs uppercase tracking-widest bg-teal-100/80 px-3 py-1 rounded-md border border-teal-200">
                  <Leaf className="w-3.5 h-3.5 text-teal-600" /> Environmental Impact Calculator
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Estimate Your Plastic Waste Reduction & Carbon Savings
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Select your expected daily cloth bag vending volume to see how many single-use plastic carry bags your organization can prevent from entering landfills and oceans annually.
                </p>

                {/* SLIDER CONTROL */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>Expected Daily Vended Bags:</span>
                    <span className="text-base text-teal-800 font-black px-3 py-1 bg-white rounded-lg border border-stone-200 shadow-xs">
                      {dailyBags} Bags / Day
                    </span>
                  </div>

                  <input
                    type="range"
                    min="20"
                    max="500"
                    step="10"
                    value={dailyBags}
                    onChange={(e) => setDailyBags(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>20 Bags</span>
                    <span>250 Bags</span>
                    <span>500 Bags</span>
                  </div>
                </div>
              </div>

              {/* IMPACT METRICS RESULTS */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-stone-200/80 p-5 rounded-2xl space-y-1 text-center shadow-xs">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-700">
                    {annualPlasticBagsEliminated.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs font-bold text-slate-900">Plastic Bags Eliminated / Year</div>
                  <div className="text-[10px] text-slate-500">Replaced with reusable 100% cotton canvas bags</div>
                </div>

                <div className="bg-white border border-stone-200/80 p-5 rounded-2xl space-y-1 text-center shadow-xs">
                  <div className="text-2xl sm:text-3xl font-black text-teal-700">
                    {annualCO2SavedKg.toLocaleString('en-IN')} kg
                  </div>
                  <div className="text-xs font-bold text-slate-900">CO₂ Emissions Avoided / Year</div>
                  <div className="text-[10px] text-slate-500">Direct CSR sustainability impact points</div>
                </div>

                <div className="sm:col-span-2 bg-teal-50/80 border border-teal-200/80 p-4 rounded-xl text-center text-xs text-teal-900">
                  💡 <span className="font-bold">Self-Sustaining Revenue:</span> Charging ₹10-20 per cloth bag allows full capital expenditure payback within 4 to 6 months of active deployment!
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 8. FREQUENTLY ASKED QUESTIONS */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions (B2B Buyers)
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Clear answers regarding machine operation, bag replenishment, payment setup, and warranty.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "What types of cloth bags are compatible with this vending machine?",
                a: "The machine is calibrated for folded cotton cloth bags, non-woven eco-friendly bags, and canvas carry bags (typically 12x15 or 14x16 inches). Custom bag sizing plates can also be configured upon request."
              },
              {
                q: "How does the UPI QR payment system operate?",
                a: "Model CBV-300 includes a dynamic LCD screen that generates an instant UPI QR code when a customer selects a bag. Upon successful payment verification, the internal motor automatically dispenses one cloth bag."
              },
              {
                q: "What happens when the machine runs out of cloth bags?",
                a: "Both Model CBV-100 and CBV-300 feature built-in optoelectronic empty-stock sensors. When bags are out of stock, the coin and note acceptor automatically locks and rejects inserted currency to prevent customer loss."
              },
              {
                q: "Can we track daily sales and inventory remotely?",
                a: "Yes! Optional IoT telemetry modules allow after-sales sales reports in Excel format and send SMS / email notifications when inventory drops below 15%."
              },
              {
                q: "Does the machine require continuous grid power?",
                a: "The machine operates on standard 220V-240V AC power and includes an inbuilt rechargeable battery backup to ensure uninterrupted dispensing during power cuts."
              },
              {
                q: "What is the warranty and after-sales service policy?",
                a: "AXA Industries provides a 1-year comprehensive warranty covering internal motor mechanisms, control boards, and coin/note sensors. Pan-India spare parts and technical support are available."
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
                  <ChevronDown className={`w-4 h-4 text-teal-600 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
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

      {/* 9. REUSABLE B2B QUOTE MODAL */}
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
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                    Direct Commercial RFQ
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    Request Quotation - Cloth Bag Vending Machine
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
                        placeholder="e.g. LuLu Mall / Reliance Retail"
                        value={formData.orgName}
                        onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
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
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
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
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
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
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Preferred Model *</label>
                      <select
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                      >
                        <option value="CBV-100 (100 Bags Capacity)">Model CBV-100 (100 Bags Capacity)</option>
                        <option value="CBV-300 (300 Bags Capacity with UPI)">Model CBV-300 (300 Bags Capacity + UPI)</option>
                        <option value="Both Models / Custom Solution">Both Models / Custom Quantity Solution</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Estimated Quantity *</label>
                      <select
                        name="qty"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                      >
                        <option value="1 Unit (Sample / Pilot)">1 Unit (Sample / Pilot)</option>
                        <option value="2 to 5 Units">2 to 5 Units</option>
                        <option value="6 to 15 Units">6 to 15 Units</option>
                        <option value="16+ Units (Bulk Enterprise)">16+ Units (Bulk Enterprise Order)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">City *</label>
                      <input
                        type="text"
                        placeholder="e.g. New Delhi / Mumbai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">State *</label>
                      <input
                        type="text"
                        placeholder="State / Region"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Additional Requirements / Notes</label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="Specify custom logo branding requirements, installation venue type, or GeM tender details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold rounded-xl text-sm shadow-lg shadow-teal-600/25 transition active:scale-98 flex items-center justify-center gap-2"
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
                  Thank you, <span className="font-bold text-slate-900">{formData.contactPerson}</span>. Your inquiry for <span className="font-bold text-teal-700">{formData.model}</span> has been assigned to an AXA Sales Engineer.
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
