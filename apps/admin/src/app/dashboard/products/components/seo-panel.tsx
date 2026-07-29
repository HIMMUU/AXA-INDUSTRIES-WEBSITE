'use client';

import { Search, Globe } from 'lucide-react';

interface SeoPanelProps {
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  productName?: string;
  onMetaTitleChange: (val: string) => void;
  onMetaDescriptionChange: (val: string) => void;
}

export function SeoPanel({
  metaTitle = '',
  metaDescription = '',
  slug = '',
  productName = '',
  onMetaTitleChange,
  onMetaDescriptionChange
}: SeoPanelProps) {
  const displayTitle = metaTitle || productName || 'Product Title';
  const displaySlug = slug || 'product-slug';
  const displayDesc = metaDescription || 'High performance business product by AXA Industries.';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-emerald-400" />
        <h3 className="text-xs font-semibold text-white">SEO & Search Engine Optimization</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Fields */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-[11px] font-medium text-neutral-400 mb-1">
              <label htmlFor="metaTitle">Meta Title</label>
              <span>{metaTitle.length}/100</span>
            </div>
            <input
              id="metaTitle"
              type="text"
              placeholder="Custom Search Engine Title"
              value={metaTitle}
              maxLength={100}
              onChange={(e) => onMetaTitleChange(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-medium text-neutral-400 mb-1">
              <label htmlFor="metaDescription">Meta Description</label>
              <span>{metaDescription.length}/300</span>
            </div>
            <textarea
              id="metaDescription"
              rows={3}
              placeholder="Custom Search Engine Description snippet"
              value={metaDescription}
              maxLength={300}
              onChange={(e) => onMetaDescriptionChange(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none"
            />
          </div>
        </div>

        {/* Live Search Engine Snippet Preview */}
        <div className="rounded-2xl border border-white/10 bg-neutral-900/90 p-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-2">
            <Search className="h-3.5 w-3.5 text-blue-400" />
            <span>Google Search Result Preview</span>
          </div>

          <div className="space-y-1 font-sans">
            <p className="text-xs text-neutral-400 truncate">
              https://axaindustries.com › products › <span className="text-neutral-200">{displaySlug}</span>
            </p>
            <h4 className="text-sm font-medium text-blue-400 hover:underline cursor-pointer truncate">
              {displayTitle} | AXA Industries
            </h4>
            <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
              {displayDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
