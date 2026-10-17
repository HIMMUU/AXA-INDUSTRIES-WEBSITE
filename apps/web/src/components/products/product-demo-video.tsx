'use client';

import { useRef, useState } from 'react';
import { trackEvent } from '@/lib/landing-analytics';

type ProductDemoVideoProps = {
  reelId: 'reel1' | 'reel2';
  videoUrl?: string;
  posterUrl?: string;
  captionsUrl?: string;
};

export function ProductDemoVideo({
  reelId,
  videoUrl,
  posterUrl,
  captionsUrl
}: ProductDemoVideoProps) {
  const [playing, setPlaying] = useState(false);
  const sentPlayEvent = useRef(false);

  if (!videoUrl || !posterUrl || !captionsUrl) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center text-sm text-neutral-600 dark:border-white/15 dark:bg-white/[0.03] dark:text-neutral-300">
        Product demonstration video is not available on this page yet. Contact AXA Industries to discuss a live demonstration.
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-2xl bg-black">
      {playing ? (
        <video
          width={1280}
          height={720}
          controls
          playsInline
          preload="none"
          poster={posterUrl}
          className="h-full w-full"
          onPlay={() => {
            if (sentPlayEvent.current) return;
            sentPlayEvent.current = true;
            trackEvent('video_play', { reel_id: reelId, video_provider: 'self-hosted' });
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          <track kind="captions" src={captionsUrl} srcLang="en" label="English captions" default />
          Your browser does not support HTML video.
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="flex h-full w-full items-center justify-center bg-cover bg-center text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-blue-400"
          style={{ backgroundImage: `url("${posterUrl.replace(/["\\]/g, '')}")` }}
          aria-label={`Play ${reelId === 'reel1' ? 'vending machine demonstration' : 'institutional applications'} video`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-700/90 text-2xl shadow-xl" aria-hidden="true">▶</span>
        </button>
      )}
    </div>
  );
}
