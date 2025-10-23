'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { addItem } from 'components/cart/actions';
import { useCart } from 'components/cart/cart-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { startTransition, useState } from 'react';
import { toast } from 'sonner';

function RelatedProductCard({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [isAdding, setIsAdding] = useState(false);
  const { addCartItem } = useCart();

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
    <div className="group relative flex flex-col">
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

      {/* Product Info - Fixed Heights for Alignment */}
      <div className="mt-3 flex flex-col gap-2">
        {/* Title - Fixed 2 lines with ellipsis */}
        <Link href={`/product/${product.handle}`} className="hover:opacity-70">
          <p className="line-clamp-2 h-10 text-sm font-medium uppercase tracking-wider">
            {product.title}
          </p>
        </Link>

        {/* Price - Fixed height */}
        <p className="h-5 text-sm">
          {new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: product.priceRange.maxVariantPrice.currencyCode
          }).format(parseFloat(product.priceRange.maxVariantPrice.amount))}
        </p>

        {/* Size Selector - Always visible, fixed height */}
        <select
          value={selectedVariant?.id || ''}
          onChange={(e) => {
            const variant = product.variants.find((v) => v.id === e.target.value);
            if (variant) setSelectedVariant(variant);
          }}
          className="h-10 w-full border border-neutral-300 bg-white p-2 text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-neutral-300"
          onClick={(e) => e.stopPropagation()}
        >
          <option value="">Select Size</option>
          {product.variants.map((variant) => (
            <option key={variant.id} value={variant.id} disabled={!variant.availableForSale}>
              {variant.title} {!variant.availableForSale ? '- Out of Stock' : ''}
            </option>
          ))}
        </select>

        {/* Add to Bag Button - Fixed height */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant || !selectedVariant.availableForSale || isAdding}
          className="relative flex h-12 w-full items-center justify-center bg-black text-xs font-medium uppercase tracking-wider text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {selectedVariant && !selectedVariant.availableForSale ? (
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
  );
}

export function RelatedProductsClient({ products }: { products: Product[] }) {
  return (
    <div className="relative -mx-4 lg:mx-0">
      {/* Scrollable Grid Container */}
      <div className="overflow-x-auto scrollbar-hide px-4 lg:px-0">
        <div className="flex gap-3 lg:gap-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-none w-[calc((100%-0.75rem)/2.2)] lg:w-[calc((100%-5*1rem)/6.4)]"
            >
              <RelatedProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
