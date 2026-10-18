'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';

const CldVideoPlayer = dynamic(
  () => import('next-cloudinary').then((cloudinary) => cloudinary.CldVideoPlayer),
  { ssr: false }
);

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'j0f3i5re';

type CloudinaryVideoEmbedProps = {
  publicId: string;
  posterUrl: string;
  title: string;
};

export function CloudinaryVideoEmbed({
  publicId,
  posterUrl,
  title
}: CloudinaryVideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-950">
      {isPlaying ? (
        <>
          <CldVideoPlayer
            src={publicId}
            width={1280}
            height={720}
            quality="auto"
            preload="none"
            playsinline
            controls
            poster={publicId}
            config={{ cloud: { cloudName } }}
            onError={() => setHasError(true)}
          />
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
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
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
