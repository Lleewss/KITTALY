'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { useEffect, useRef, useState } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const [showStickyButton, setShowStickyButton] = useState(false);
  const addToCartRef = useRef<HTMLDivElement>(null);
  const variantSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (addToCartRef.current) {
        const rect = addToCartRef.current.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        setShowStickyButton(!isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToVariantSelector = () => {
    if (variantSelectorRef.current) {
      const rect = variantSelectorRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = rect.top + scrollTop - (window.innerHeight / 2) + (rect.height / 2);
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col border-b border-neutral-200 pb-6">
        <h1 className="mb-4 text-3xl font-bold uppercase tracking-wider">{product.title}</h1>
        <div className="text-2xl font-semibold">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      
      {/* Variant Selector with ref */}
      <div ref={variantSelectorRef}>
        <VariantSelector options={product.options} variants={product.variants} />
      </div>
      
      {product.descriptionHtml ? (
        <Prose
          className="mb-8 text-sm leading-relaxed text-neutral-600"
          html={product.descriptionHtml}
        />
      ) : null}
      
      {/* Original Add to Cart */}
      <div ref={addToCartRef}>
        <AddToCart product={product} onScrollToVariant={scrollToVariantSelector} />
      </div>

      {/* Sticky Add to Cart for Mobile - Only shows when original is off-screen */}
      {showStickyButton && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 p-4 lg:hidden shadow-lg">
          <AddToCart product={product} onScrollToVariant={scrollToVariantSelector} />
        </div>
      )}
    </>
  );
}
