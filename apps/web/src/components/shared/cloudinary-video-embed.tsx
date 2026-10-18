'use client';

import Image from 'next/image';
import { useState } from 'react';

type CloudinaryVideoEmbedProps = {
  videoUrl: string;
  posterUrl: string;
  title: string;
};

export function CloudinaryVideoEmbed({
  videoUrl,
  posterUrl,
  title
}: CloudinaryVideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-2xl bg-neutral-950">
      {isPlaying ? (
        <>
          <video
            autoPlay
            controls
            playsInline
            preload="none"
            poster={posterUrl}
            onError={() => setHasError(true)}
            className="h-full w-full bg-black object-contain"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          {hasError && (
            <p role="alert" className="absolute inset-x-4 bottom-4 rounded-lg bg-black/80 p-3 text-sm text-white">
              This video could not be loaded. Please try again later.
            </p>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group absolute inset-0 flex h-full w-full items-center justify-center text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-blue-400"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={posterUrl}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 640px) 90vw, 360px"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/40" />
          <span aria-hidden="true" className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-700/95 text-2xl shadow-xl transition group-hover:scale-105">
            ▶
          </span>
        </button>
      )}
    </div>
  );
}
