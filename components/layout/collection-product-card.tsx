'use client';

import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function CollectionProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get primary and secondary images
  const primaryImage = product.featuredImage;
  
  // Find the second image - exclude the featured image from the images array
  const secondaryImage = product.images?.find(
    (img) => img.url !== primaryImage?.url
  ) || null;

  // If no primary image, don't render
  if (!primaryImage) return null;

  return (
    <Link
      className="group relative block"
      href={`/product/${product.handle}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-50">
        {/* Primary Image - Always visible unless hovering with secondary */}
        <Image
          src={primaryImage.url}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className={`object-cover transition-opacity duration-300 ${
            isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Secondary Image - Only render if exists, show on hover */}
        {secondaryImage && (
          <Image
            src={secondaryImage.url}
            alt={`${product.title} - alternate view`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className={`object-cover transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Product info - Single row with title and price */}
      <div className="mt-2 flex items-start justify-between gap-2">
        {/* Product title - left aligned, small font */}
        <h3 className="text-sm font-normal text-[#1D2022] line-clamp-2 leading-tight flex-1">
          {product.title}
        </h3>

        {/* Price - right aligned */}
        <p className="text-sm font-normal text-[#1D2022] flex-shrink-0">
          {product.priceRange.maxVariantPrice.currencyCode}{' '}
          {product.priceRange.maxVariantPrice.amount}
        </p>
      </div>
    </Link>
  );
}
