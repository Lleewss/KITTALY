'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const announcements = [
  { id: 1, text: 'Free Shipping on Orders Over £50', link: '/shipping' },
  { id: 2, text: 'New Arrivals - Explore the Latest Collection', link: '/new-arrivals' },
  { id: 3, text: '30-Day Free Returns', link: '/returns' }
];

export function AnnouncementBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <div className="relative bg-black text-white">
      <div className="mx-auto flex items-center justify-between px-4 py-2.5 text-sm">
        <button
          onClick={handlePrevious}
          className="p-1 hover:opacity-70 transition-opacity"
          aria-label="Previous announcement"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        <div className="flex-1 text-center">
          <a
            href={announcements[currentIndex]?.link}
            className="hover:opacity-70 transition-opacity"
          >
            {announcements[currentIndex]?.text}
          </a>
        </div>

        <button
          onClick={handleNext}
          className="p-1 hover:opacity-70 transition-opacity"
          aria-label="Next announcement"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
        aria-label="Close announcement"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
