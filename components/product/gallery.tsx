'use client';

import Image from 'next/image';
import { MouseEvent, useEffect, useState } from 'react';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {images.map((image, index) => (
          <div
            key={image.src}
            className="group relative w-full cursor-zoom-in overflow-hidden bg-neutral-50"
            style={{ aspectRatio: '3/4' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onMouseMove={handleMouseMove}
            onClick={() => openLightbox(index)}
          >
            <Image
              className="h-full w-full object-cover transition-transform duration-300 ease-out"
              style={
                hoveredIndex === index
                  ? {
                      transform: `scale(2)`,
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                    }
                  : {}
              }
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              alt={image.altText}
              src={image.src}
              priority={index < 4}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute right-4 top-4 z-10 text-white hover:text-neutral-300"
            aria-label="Close"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white hover:text-neutral-300"
                aria-label="Previous"
              >
                <svg
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-white hover:text-neutral-300"
                aria-label="Next"
              >
                <svg
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative h-[90vh] w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              className="h-full w-full object-contain"
              fill
              sizes="90vw"
              alt={images[lightboxIndex]?.altText || ''}
              src={images[lightboxIndex]?.src || ''}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
