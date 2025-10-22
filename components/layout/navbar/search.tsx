'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Search() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Search Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-black hover:opacity-70 transition-opacity cursor-pointer"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>

      {/* Search Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Search Panel */}
          <div className="fixed left-0 right-0 top-0 z-50 bg-white">
            <div className="mx-auto max-w-screen-2xl px-4 py-6 lg:px-6">
              {/* Close Button - Top Right */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-black hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Close search"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Centered Search Form */}
              <div className="max-w-xl mx-auto">
                <Form action="/search" className="relative">
                  <label htmlFor="searchTerm" className="relative block">
                    <input
                      id="searchTerm"
                      key={searchParams?.get('q')}
                      type="text"
                      name="q"
                      placeholder="Search"
                      autoComplete="off"
                      autoFocus
                      defaultValue={searchParams?.get('q') || ''}
                      className="w-full border-b border-neutral-300 bg-transparent px-0 py-2 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-neutral-300"
                    />
                  </label>
                  <button
                    type="submit"
                    aria-label="Search"
                    className="absolute right-0 top-0 flex h-full items-center text-black hover:opacity-70 transition-opacity cursor-pointer"
                  >
                    <MagnifyingGlassIcon className="h-4 w-4" />
                  </button>
                </Form>
              </div>

              {/* Popular Searches Section */}
              <div className="mt-8 pb-4 max-w-xl mx-auto">
                <h4 className="text-xs font-medium mb-3 uppercase tracking-wider text-center">Popular Searches</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Outerwear', 'Dresses', 'Accessories', 'Footwear', 'Sale'].map((term) => (
                    <a
                      key={term}
                      href={`/search?q=${term.toLowerCase()}`}
                      className="px-3 py-1.5 border border-neutral-300 text-xs hover:bg-neutral-50 transition-colors cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      {term}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function SearchSkeleton() {
  return (
    <button
      className="text-black hover:opacity-70 transition-opacity cursor-pointer"
      aria-label="Search"
    >
      <MagnifyingGlassIcon className="h-5 w-5" />
    </button>
  );
}
