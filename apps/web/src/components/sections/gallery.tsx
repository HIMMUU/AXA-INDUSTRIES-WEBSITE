'use client';

import { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

export function GallerySection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const images = [
    { url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786306986/Autoomatic_vending_machine_interrnal_nv2phl.jpg', title: 'AVND 50 Internal Dispenser Assembly' },
    { url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786307641/raplace_washroom_machine_with_mine_202608100203_xukqfa.jpg', title: 'Institutional Washroom Deployment' },
    { url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786305121/CLOTH_BAG_VENNDING_COOMBO_pwx7d4.png', title: 'Cloth Bag Vending Kiosk Production' },
    { url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786304387/ChatGPT_Image_Aug_10_2026_01_09_31_AM_krrlsc.png', title: 'Thermal Destroyer Incineration Assembly' }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0C] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Production & Installation</span>
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white sm:text-4xl">Manufacturing & Site Deployments</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(img.url)}
              className="group relative aspect-square overflow-hidden rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-900 cursor-pointer shadow-xl"
            >
              <img
                src={img.url}
                alt={img.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                <Maximize2 className="h-6 w-6 text-white mb-2" />
                <p className="text-xs font-semibold text-white">{img.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <img src={activeImage} alt="Expanded Facility Preview" className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl" />
        </div>
      )}
    </section>
  );
}
