import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CtaBannerSection } from '@/components/sections/cta-banner';
import { Target, Eye, Heart, Shield, Sparkles, CheckCircle2, Award, Users, Lightbulb, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About AXA Industries | Official Company Profile & AXA CLUB',
  description: 'AXA INDUSTRIES is a forward-thinking company dedicated to advancing hygiene solutions under our flagship brand AXA CLUB. Empowering Hygiene, Ensuring Dignity, Building a Better Tomorrow.'
};

export default function AboutPage() {
  const coreValues = [
    {
      icon: Lightbulb,
      title: 'Innovation with Purpose',
      desc: 'We design solutions that make hygiene simple, smart, and sustainable for all environments.'
    },
    {
      icon: Heart,
      title: 'Empowerment & Dignity',
      desc: 'We strive to create dignity, confidence, and equal opportunities for women through accessible hygiene facilities.'
    },
    {
      icon: Users,
      title: 'Social Responsibility',
      desc: 'Beyond business, we work to bring positive change to communities, institutions, and society.'
    },
    {
      icon: Shield,
      title: 'Customer Commitment',
      desc: 'We build long-lasting relationships by delivering quality products and reliable pan-India support.'
    }
  ];

  const keyBenefits = [
    { title: '24/7 Hygiene Access', desc: 'Our vending machines ensure sanitary napkins are always available whenever needed.' },
    { title: 'Eco-Friendly Disposal', desc: 'SND 500 incinerators provide safe, smokeless, and odorless disposal, protecting health and environment.' },
    { title: 'App-Based Monitoring', desc: 'Swachh Toilet Feedback Machines provide live app-based tracking of visitor cleanliness ratings.' },
    { title: 'Solid Waste Destruction', desc: 'SWI incinerator machines efficiently destroy PPE kits, masks, cotton, dry leaves, and papers.' },
    { title: 'Improved Institutional Image', desc: 'Schools, colleges, and workplaces adopting AXA solutions demonstrate commitment to dignity.' },
    { title: 'Low Maintenance & Cost-Effective', desc: 'Durable products engineered with MS powder-coated chassis for long-term industrial use with minimal upkeep.' }
  ];

  const productSolutions = [
    {
      num: '01',
      title: 'Sanitary Napkin Vending Machines',
      desc: '24/7 availability of sanitary napkins with coin, card, or smart UPI QR payment options. Compact, durable, and low-maintenance.'
    },
    {
      num: '02',
      title: 'SND 500 Napkin & Mask Incinerators',
      desc: 'Compact electric incinerators with 2500W ceramic heater, LCD temp display, 15-min auto cutoff, and 25mm ceramic fiber insulation. CE approved & CPCB compliant.'
    },
    {
      num: '03',
      title: 'Swachh Toilet Feedback Machines',
      desc: 'Digital live feedback terminals (Good, Average, Dirty) with app-based software monitoring to capture real-time CSAT metrics.'
    },
    {
      num: '04',
      title: 'SWI Solid Waste Incinerators',
      desc: '3kW and 4.5kW solid waste incinerators designed for PPE kits, masks, cotton, paper, and dry medical/organic waste disposal.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="pt-28 pb-20">
        {/* About Hero Section */}
        <section className="py-20 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Official Company Profile • Flagship Brand AXA CLUB</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-neutral-900 dark:text-white max-w-4xl mx-auto leading-tight">
              Empowering Hygiene, Ensuring Dignity, Building a Better Tomorrow
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              AXA INDUSTRIES is a forward-thinking company dedicated to advancing hygiene solutions with innovation, quality, and care. Under our flagship brand <strong className="text-blue-600 dark:text-blue-400">AXA CLUB</strong>, we specialize in Sanitary Napkin Vending Machines, Eco-Friendly Incinerators, Swachh Toilet Feedback Systems, and Industrial Solid Waste Incinerators.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <a
                href="#products"
                className="rounded-2xl bg-blue-600 px-6 py-3.5 text-xs font-bold text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500 transition"
              >
                Explore Product Offerings
              </a>
              <Link
                href="/contact"
                className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-6 py-3.5 text-xs font-semibold text-neutral-800 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/10 transition"
              >
                Contact Sales Desk
              </Link>
            </div>
          </div>
        </section>

        {/* Company Overview & Mission/Vision */}
        <section className="py-16 bg-neutral-50 dark:bg-[#08080A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#121216]/80 p-8 shadow-xl space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Our Mission</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  To provide reliable, 24/7 accessible, and dignified hygiene automation across educational institutions, hostels, workplaces, hospitals, and public facilities worldwide.
                </p>
              </div>

              <div className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#121216]/80 p-8 shadow-xl space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Our Vision</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  To lead the global transition toward sustainable menstrual hygiene awareness and zero-pollution thermal waste treatment, empowering women and fostering inclusivity in every community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Solutions Breakdown */}
        <section className="py-20 bg-white dark:bg-[#0A0A0C]" id="products">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Products We Offer</span>
              <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">Comprehensive Hygiene Solutions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {productSolutions.map((ps, idx) => (
                <div key={idx} className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#121216]/60 p-8 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">SOLUTION {ps.num}</span>
                    <Award className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{ps.title}</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">{ps.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Core Values */}
        <section className="py-20 bg-neutral-50 dark:bg-[#08080A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Guided Principles</span>
              <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">Our Values</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <div key={idx} className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#121216]/60 p-6 space-y-3 shadow-md">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white">{v.title}</h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white dark:bg-[#0A0A0C]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">Why Choose AXA</span>
              <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">Institutional Benefits</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {keyBenefits.map((b, idx) => (
                <div key={idx} className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#121216]/60 p-6 space-y-2 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mb-1" />
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{b.title}</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info Strip */}
        <section className="py-16 bg-neutral-50 dark:bg-[#08080A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 p-8 shadow-2xl space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Our Head Office Contact</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300">At AXA INDUSTRIES, we are always ready to assist you with the best hygiene solutions for your institution.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs">
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-neutral-200 dark:border-white/10 space-y-1">
                  <Phone className="h-5 w-5 mx-auto text-blue-600 dark:text-blue-400" />
                  <p className="font-bold text-neutral-900 dark:text-white">Call Us Direct</p>
                  <p className="font-mono text-neutral-600 dark:text-neutral-300">+91 8076496709 / +91 8595156873</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-neutral-200 dark:border-white/10 space-y-1">
                  <Mail className="h-5 w-5 mx-auto text-purple-600 dark:text-purple-400" />
                  <p className="font-bold text-neutral-900 dark:text-white">Official Email</p>
                  <p className="font-mono text-neutral-600 dark:text-neutral-300">axaclub1@gmail.com</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-neutral-200 dark:border-white/10 space-y-1">
                  <MapPin className="h-5 w-5 mx-auto text-emerald-600 dark:text-emerald-400" />
                  <p className="font-bold text-neutral-900 dark:text-white">Registered Address</p>
                  <p className="text-neutral-600 dark:text-neutral-300">E57/A, Gali No - 10, Harinagar EXTN Part - II, Jaitpur, Badarpur - 110044 New Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaBannerSection />
      </main>

      <Footer />
    </div>
  );
}
