'use client';

import { CollectionProductCard } from 'components/layout/collection-product-card';
import MobileFilterButton from 'components/layout/mobile-filter-button';
import FilterSidebar from 'components/layout/search/filter-sidebar';
import { Product } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

interface CollectionProductsProps {
  products: Product[];
}

export default function CollectionProducts({ products }: CollectionProductsProps) {
  const searchParams = useSearchParams();

  // Get filter parameters
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sizes = searchParams.get('sizes')?.split(',').filter(Boolean) || [];
  const productTypes = searchParams.get('productTypes')?.split(',').filter(Boolean) || [];
  const colors = searchParams.get('colors')?.split(',').filter(Boolean) || [];
  const materials = searchParams.get('materials')?.split(',').filter(Boolean) || [];
  const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Tag filter (from top tag buttons)
    if (tags.length > 0) {
      filtered = filtered.filter((product) => {
        return tags.some((tag) => product.tags.includes(tag));
      });
    }

    // Price filter
    if (minPrice || maxPrice) {
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.priceRange.maxVariantPrice.amount);
        if (minPrice && price < parseFloat(minPrice)) return false;
        if (maxPrice && price > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    // Size filter
    if (sizes.length > 0) {
      filtered = filtered.filter((product) => {
        return product.variants.some((variant) =>
          variant.selectedOptions.some(
            (opt) =>
              opt.name.toLowerCase() === 'size' && sizes.includes(opt.value)
          )
        );
      });
    }

    // Product type filter
    if (productTypes.length > 0) {
      filtered = filtered.filter((product) => {
        const type = product.tags.find((tag) => tag.toLowerCase().includes('type:'));
        if (!type) return false;
        const cleanType = type.replace(/type:/i, '').trim();
        return productTypes.includes(cleanType);
      });
    }

    // Color filter
    if (colors.length > 0) {
      filtered = filtered.filter((product) => {
        const color = product.tags.find((tag) =>
          tag.toLowerCase().includes('color:') || tag.toLowerCase().includes('colour:')
        );
        if (!color) return false;
        const cleanColor = color.replace(/colou?r:/i, '').trim();
        return colors.includes(cleanColor);
      });
    }

    // Material filter
    if (materials.length > 0) {
      filtered = filtered.filter((product) => {
        const material = product.tags.find((tag) => tag.toLowerCase().includes('material:'));
        if (!material) return false;
        const cleanMaterial = material.replace(/material:/i, '').trim();
        return materials.includes(cleanMaterial);
      });
    }

    return filtered;
  }, [products, minPrice, maxPrice, sizes, productTypes, colors, materials, tags]);

  return (
    <div className="lg:grid lg:grid-cols-4 lg:gap-8">
      {/* Desktop Sidebar - 1 column, sticky */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="sticky top-24">
          <FilterSidebar products={products} />
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <MobileFilterButton products={products} />
      </div>

      {/* Products Grid - 3 columns on desktop, 2 on mobile */}
      <div className="lg:col-span-3">
        {filteredProducts.length === 0 ? (
          <p className="py-12 text-center text-lg text-neutral-500">
            No products match your filters
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
            {filteredProducts.map((product) => (
              <CollectionProductCard key={product.handle} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
