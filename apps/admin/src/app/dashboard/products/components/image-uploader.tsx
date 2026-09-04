'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductImageItem } from '@axa/types';
import { Upload, X, Loader2, Image as ImageIcon, ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface ImageUploaderProps {
  images: ProductImageItem[];
  onChange: (images: ProductImageItem[]) => void;
}

export function ImageUploader({ images = [], onChange }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);

    if (images.length + files.length > 10) {
      setError('Maximum 10 images allowed per product');
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    const newImages: ProductImageItem[] = [...images];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // 5MB Limit check
        if (file.size > 5 * 1024 * 1024) {
          setError(`File '${file.name}' exceeds the 5MB size limit`);
          continue;
        }

        const base64 = await convertFileToBase64(file);
        setUploadProgress(30 + Math.floor(((i + 1) / files.length) * 60));

        const res = await apiClient('/v1/products/upload-images', {
          method: 'POST',
          body: JSON.stringify({ fileDataUrl: base64 })
        });

        if (res.success && res.data) {
          newImages.push({
            url: res.data.url,
            publicId: res.data.publicId,
            order: newImages.length
          });
        }
      }

      onChange(newImages);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, idx) => idx !== index).map((img, idx) => ({ ...img, order: idx }));
    onChange(updated);
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    const newIdx = direction === 'left' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= images.length) return;

    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[newIdx];
    copy[newIdx] = temp;

    const reordered = copy.map((img, idx) => ({ ...img, order: idx }));
    onChange(reordered);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 p-6 text-center transition hover:border-white/20 hover:bg-white/10">
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => handleFileUpload(e.target.files)}
          disabled={isUploading || images.length >= 10}
          className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-neutral-400 mb-3">
          {isUploading ? <Loader2 className="h-6 w-6 animate-spin text-blue-400" /> : <Upload className="h-6 w-6" />}
        </div>
        <p className="text-xs font-semibold text-white">
          {isUploading ? 'Uploading to Cloudinary...' : 'Click or Drag & Drop Product Images'}
        </p>
        <p className="mt-1 text-[11px] text-neutral-500">
          JPEG, PNG, WEBP up to 5MB (Max 10 images)
        </p>

        {isUploading && (
          <div className="mt-4 w-full max-w-xs overflow-hidden rounded-full bg-white/10 h-1.5">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Image Thumbnails Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 aspect-square shadow-lg"
            >
              <Image
                src={img.url}
                alt={`Product Thumbnail ${idx + 1}`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />

              {/* Order Badge */}
              <span className="absolute left-2 top-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[9px] font-mono font-bold text-white">
                #{idx + 1}
              </span>

              {/* Action Overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                {idx > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(idx, 'left')}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
                    title="Move Left"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                )}
                {idx < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(idx, 'right')}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
                    title="Move Right"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  title="Remove Image"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
