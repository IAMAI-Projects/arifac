"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { GalleryItem, Media } from "@/payload-types";

interface GalleryGridProps {
  items: GalleryItem[];
}

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "industry-consultations", label: "Industry Consultations" },
  { value: "training-capacity-building", label: "Training & Capacity Building" },
  { value: "working-groups", label: "Working Groups & Expert Engagements" },
  { value: "flagship-programs", label: "Flagship Programs & Events" },
];

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, goPrev, goNext]);

  const getImageUrl = (image: Media | number): string | null => {
    if (typeof image === "object" && image?.url) return image.url;
    return null;
  };

  const getImageAlt = (image: Media | number, title: string): string => {
    if (typeof image === "object" && image?.alt) return image.alt;
    return title;
  };

  const activeLightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      {/* Category filter */}
      <div className="border-b border-neutral-200 bg-white sticky top-24 z-30">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide -mb-px">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  setLightboxIndex(null);
                }}
                className={`shrink-0 px-4 py-4 text-[12px] font-bold uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${
                  activeCategory === cat.value
                    ? "border-brand text-brand"
                    : "border-transparent text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1240px] mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="py-24 text-center text-neutral-400 text-[15px]">
              No images in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item, idx) => {
                const url = getImageUrl(item.image);
                const alt = getImageAlt(item.image, item.title);
                return (
                  <button
                    key={item.id}
                    onClick={() => openLightbox(idx)}
                    className="group relative aspect-[4/3] bg-neutral-100 overflow-hidden border border-neutral-200 hover:border-brand/50 transition-colors text-left"
                    aria-label={`View ${item.title}`}
                  >
                    {url ? (
                      <Image
                        src={url}
                        alt={alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
                        <span className="text-neutral-400 text-[12px]">No image</span>
                      </div>
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white text-[13px] font-bold leading-snug line-clamp-2 drop-shadow">
                        {item.title}
                      </p>
                      {item.description && (
                        <p className="text-white/80 text-[11px] mt-1 line-clamp-1 drop-shadow">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {/* Expand icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/0 group-hover:bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Count */}
          {filtered.length > 0 && (
            <p className="mt-6 text-[12px] text-neutral-400 font-bold uppercase tracking-widest">
              {filtered.length} {filtered.length === 1 ? "Photo" : "Photos"}
            </p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {activeLightboxItem !== null && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Previous"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image container */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const url = getImageUrl(activeLightboxItem.image);
              const alt = getImageAlt(activeLightboxItem.image, activeLightboxItem.title);
              return url ? (
                <div className="relative w-full max-h-[75vh]" style={{ aspectRatio: "16/10" }}>
                  <Image
                    src={url}
                    alt={alt}
                    fill
                    sizes="90vw"
                    className="object-contain"
                    priority
                  />
                </div>
              ) : null;
            })()}

            {/* Caption */}
            <div className="mt-4 text-center px-4">
              <p className="text-white text-[14px] font-bold">{activeLightboxItem.title}</p>
              {activeLightboxItem.description && (
                <p className="text-white/60 text-[13px] mt-1">{activeLightboxItem.description}</p>
              )}
              <p className="text-white/40 text-[11px] mt-2 uppercase tracking-widest">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
