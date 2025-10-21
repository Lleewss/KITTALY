'use client';

import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <div className="border-t border-neutral-200 py-12">
      <h2 className="mb-8 text-center text-2xl font-bold uppercase tracking-wider">
        You May Also Like
      </h2>
      <div className="group relative">
        {/* Left Arrow */}
        <button
          onClick={() => {
            const container = document.getElementById('related-products-scroll');
            if (container) {
              container.scrollBy({ left: -400, behavior: 'smooth' });
            }
          }}
          className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center bg-white p-3 opacity-0 shadow-md transition-opacity hover:opacity-100 group-hover:opacity-80 lg:flex"
          aria-label="Scroll left"
        >
          <svg
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => {
            const container = document.getElementById('related-products-scroll');
            if (container) {
              container.scrollBy({ left: 400, behavior: 'smooth' });
            }
          }}
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center bg-white p-3 opacity-0 shadow-md transition-opacity hover:opacity-100 group-hover:opacity-80 lg:flex"
          aria-label="Scroll right"
        >
          <svg
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <ul
          id="related-products-scroll"
          className="scrollbar-hide flex w-full gap-4 overflow-x-auto pt-1"
        >
          {products.map((product) => (
            <li
              key={product.handle}
              className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
            >
              <Link
                className="relative h-full w-full"
                href={`/product/${product.handle}`}
                prefetch={true}
              >
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
