'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { addItem } from 'components/cart/actions';
import { useCart } from 'components/cart/cart-context';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { startTransition, useState } from 'react';
import { toast } from 'sonner';

function RelatedProductCard({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addCartItem } = useCart();

  const hasMultipleSizes = product.variants.length > 1;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!selectedVariant || !selectedVariant.availableForSale) return;
    
    setIsAdding(true);
    try {
      // Add to cart with startTransition to avoid React warnings
      startTransition(() => {
        addCartItem(selectedVariant, product);
      });
      
      await addItem(null, selectedVariant.id);
      
      toast.success('Added to bag', {
        duration: 2000,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to bag');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setShowQuickAdd(true)}
      onMouseLeave={() => setShowQuickAdd(false)}
    >
      {/* Product Image */}
      <Link href={`/product/${product.handle}`} className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-50">
        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.title}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-75"
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-100">
            <span className="text-xs uppercase text-neutral-400">No Image</span>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="mt-3 flex flex-col gap-2">
        <Link href={`/product/${product.handle}`} className="text-sm uppercase tracking-wider hover:opacity-70">
          <p className="font-medium">{product.title}</p>
          <p className="text-sm">
            {new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: product.priceRange.maxVariantPrice.currencyCode
            }).format(parseFloat(product.priceRange.maxVariantPrice.amount))}
          </p>
        </Link>

        {/* Quick Add Section - Shows on Hover */}
        <div className={`flex flex-col gap-2 transition-opacity duration-200 ${showQuickAdd ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {/* Size Selector */}
          {hasMultipleSizes && (
            <select
              value={selectedVariant?.id}
              onChange={(e) => {
                const variant = product.variants.find((v) => v.id === e.target.value);
                if (variant) setSelectedVariant(variant);
              }}
              className="w-full border border-black bg-white p-2 text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-black"
              onClick={(e) => e.stopPropagation()}
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id} disabled={!variant.availableForSale}>
                  {variant.title} {!variant.availableForSale ? '- Out of Stock' : ''}
                </option>
              ))}
            </select>
          )}

          {/* Add to Bag Button */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant?.availableForSale || isAdding}
            className="relative flex w-full items-center justify-center bg-black p-3 text-xs font-medium uppercase tracking-wider text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {!selectedVariant?.availableForSale ? (
              'Out Of Stock'
            ) : isAdding ? (
              'Adding...'
            ) : (
              <>
                <div className="absolute left-0 ml-3">
                  <PlusIcon className="h-4" />
                </div>
                Add To Bag
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

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
          className="scrollbar-hide flex w-full gap-6 overflow-x-auto pt-1"
        >
          {products.map((product) => (
            <li
              key={product.handle}
              className="w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
            >
              <RelatedProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
