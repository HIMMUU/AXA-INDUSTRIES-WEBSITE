'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-[#09090C] text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/images/axa-industries-logo.png"
                alt="AXA Industries Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm">
              AXA Industries (Flagship Brand <strong>AXA CLUB</strong>) is a pioneer in smart hygiene vending automation, compact sanitary napkin & mask incinerators, app-based washroom feedback machines, and solid waste incinerator systems.
            </p>
            
            {/* Government Initiative Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                🇮🇳 Buy Made in India
              </span>
              <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                Vocal for Local
              </span>
              <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                Swachh Bharat Abhiyan
              </span>
              <span className="rounded-full bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 text-[10px] font-bold text-pink-600 dark:text-pink-400">
                Beti Bachao Beti Padhao
              </span>
            </div>

            <div className="pt-2 text-xs text-neutral-500 font-mono">
              Empowering Hygiene • Ensuring Dignity • Building a Better Tomorrow
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-neutral-900 dark:hover:text-white transition">Product Catalogue</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-neutral-900 dark:hover:text-white transition">About AXA</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-neutral-900 dark:hover:text-white transition">Contact & Enquiries</Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">Legal & Terms</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-neutral-900 dark:hover:text-white transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-neutral-900 dark:hover:text-white transition">Terms of Service</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-neutral-900 dark:hover:text-white transition">Quality Assurance</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">Headquarters</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>E57/A, Gali No - 10, Harinagar EXTN Part - II, Jaitpur, Badarpur - 110044 New Delhi</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-neutral-500 shrink-0" />
                <span className="font-mono">+91 8076496709 / +91 8595156873</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-neutral-500 shrink-0" />
                <span className="font-mono">axaclub1@gmail.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} AXA Industries (AXA CLUB). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-neutral-700 dark:hover:text-neutral-300">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-neutral-700 dark:hover:text-neutral-300">Terms</Link>
            <Link href="/contact" className="hover:text-neutral-700 dark:hover:text-neutral-300">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
