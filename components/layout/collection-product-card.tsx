'use client';

import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';
import { useState } from 'react';

export function CollectionProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get primary and secondary images
  const primaryImage = product.featuredImage;
  const secondaryImage = product.images && product.images.length > 1 ? product.images[1] : null;

  // If no primary image, don't render
  if (!primaryImage) return null;

  // Determine which image to show
  const currentImage = isHovered && secondaryImage ? secondaryImage.url : primaryImage.url;

  return (
    <Link
      className="group relative block"
      href={`/product/${product.handle}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-50">
        <GridTileImage
          alt={product.title}
          src={currentImage}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-all duration-300 ease-in-out group-hover:opacity-90"
        />
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
