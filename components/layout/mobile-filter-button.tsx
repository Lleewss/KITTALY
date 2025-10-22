'use client';

import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import FilterSidebar from 'components/layout/search/filter-sidebar';
import { Product } from 'lib/shopify/types';
import { useState } from 'react';

export default function MobileFilterButton({ products }: { products: Product[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 border border-black bg-white text-sm font-medium hover:bg-black hover:text-white transition-colors"
      >
        <AdjustmentsHorizontalIcon className="w-5 h-5" />
        Filters & Sort
      </button>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
              <h2 className="text-lg font-medium text-[#1D2022]">Filters & Sort</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-neutral-100 rounded"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <FilterSidebar products={products} isMobile onClose={() => setIsOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
