'use client';

import React from 'react';
import { PhoneCall } from 'lucide-react';

// Official authentic WhatsApp SVG icon
function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
    </svg>
  );
}

export function StickyContactWidget() {
  const phoneNumber = '+91 85951 56873';
  const rawPhoneNumber = '+918595156873';
  const whatsappMessage = encodeURIComponent(
    'Hi AXA Industries, I have an inquiry regarding your products and solutions.'
  );
  const whatsappUrl = `https://wa.me/918595156873?text=${whatsappMessage}`;

  return (
    <aside
      aria-label="Quick Contact Options"
      className="fixed right-2.5 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3 transition-all duration-300 pointer-events-auto"
    >
      {/* Call Now Button */}
      <a
        href={`tel:${rawPhoneNumber}`}
        aria-label={`Call Now (${phoneNumber})`}
        title={`Call Now: ${phoneNumber}`}
        className="group relative flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white font-semibold shadow-xl shadow-blue-600/35 hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-105 active:scale-95 transition-all duration-200 h-12 w-12 sm:h-11 sm:w-auto sm:px-4 sm:py-2 border border-blue-400/30 backdrop-blur-sm"
      >
        {/* Subtle pulsing live indicator */}
        <span className="absolute -top-1 -left-1 sm:-top-1 sm:-right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border border-white dark:border-[#0A0A0C]" />
        </span>

        <div className="flex items-center gap-2">
          <PhoneCall className="h-5 w-5 sm:h-4 sm:w-4 shrink-0 transition-transform group-hover:rotate-12 duration-300" />
          {/* Label hidden on mobile phone, visible on tablet/desktop */}
          <span className="hidden sm:inline-block text-xs md:text-sm font-semibold tracking-wide whitespace-nowrap">
            Call Now
          </span>
        </div>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title={`Chat on WhatsApp (${phoneNumber})`}
        className="group relative flex items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold shadow-xl shadow-[#25D366]/35 hover:shadow-2xl hover:shadow-[#25D366]/50 hover:scale-105 active:scale-95 transition-all duration-200 h-12 w-12 sm:h-11 sm:w-auto sm:px-4 sm:py-2 border border-emerald-300/30 backdrop-blur-sm"
      >
        {/* Subtle pulsing live indicator */}
        <span className="absolute -top-1 -left-1 sm:-top-1 sm:-right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border border-white dark:border-[#0A0A0C]" />
        </span>

        <div className="flex items-center gap-2">
          <WhatsAppIcon className="h-5 w-5 sm:h-4 sm:w-4 shrink-0 transition-transform group-hover:scale-110 duration-300" />
          {/* Label hidden on mobile phone, visible on tablet/desktop */}
          <span className="hidden sm:inline-block text-xs md:text-sm font-semibold tracking-wide whitespace-nowrap">
            WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
}
