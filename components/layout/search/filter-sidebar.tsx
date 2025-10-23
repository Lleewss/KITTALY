'use client';

import { Product } from 'lib/shopify/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface FilterSidebarProps {
  products: Product[];
  isMobile?: boolean;
  onClose?: () => void;
}

interface FilterGroup {
  name: string;
  options: { value: string; count: number }[];
}

export default function FilterSidebar({ products, isMobile = false, onClose }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get price range
  const prices = products.map((p) => parseFloat(p.priceRange.maxVariantPrice.amount));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const currencyCode = products[0]?.priceRange.maxVariantPrice.currencyCode || 'USD';

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [isClearing, setIsClearing] = useState(false);
  const isInitialMount = useRef(true);
  
  // Get unique sizes with counts
  const sizes = products.reduce((acc, product) => {
    product.variants.forEach((variant) => {
      const sizeOption = variant.selectedOptions.find((opt) => opt.name.toLowerCase() === 'size');
      if (sizeOption) {
        acc[sizeOption.value] = (acc[sizeOption.value] || 0) + 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  // Get unique product types with counts
  const productTypes = products.reduce((acc, product) => {
    const type = product.tags.find((tag) => tag.toLowerCase().includes('type:'));
    if (type) {
      const cleanType = type.replace(/type:/i, '').trim();
      acc[cleanType] = (acc[cleanType] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Get unique colors with counts
  const colors = products.reduce((acc, product) => {
    const color = product.tags.find((tag) => tag.toLowerCase().includes('color:') || tag.toLowerCase().includes('colour:'));
    if (color) {
      const cleanColor = color.replace(/colou?r:/i, '').trim();
      acc[cleanColor] = (acc[cleanColor] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Get unique materials with counts
  const materials = products.reduce((acc, product) => {
    const material = product.tags.find((tag) => tag.toLowerCase().includes('material:'));
    if (material) {
      const cleanMaterial = material.replace(/material:/i, '').trim();
      acc[cleanMaterial] = (acc[cleanMaterial] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort) {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }
    router.push(`${pathname}?${params.toString()}`);
    if (onClose) onClose();
  };

  const handlePriceChange = (min: number, max: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('minPrice', min.toString());
    params.set('maxPrice', max.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const currentSort = searchParams.get('sort') || '';
  const currentSizes = searchParams.get('sizes')?.split(',').filter(Boolean) || [];
  const currentProductTypes = searchParams.get('productTypes')?.split(',').filter(Boolean) || [];
  const currentColors = searchParams.get('colors')?.split(',').filter(Boolean) || [];
  const currentMaterials = searchParams.get('materials')?.split(',').filter(Boolean) || [];

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(filterType)?.split(',').filter(Boolean) || [];
    
    let newValues: string[];
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }
    
    if (newValues.length > 0) {
      params.set(filterType, newValues.join(','));
    } else {
      params.delete(filterType);
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setIsClearing(true);
    const params = new URLSearchParams();
    const currentSort = searchParams.get('sort');
    if (currentSort) {
      params.set('sort', currentSort); // Keep sort when clearing filters
    }
    setPriceRange([minPrice, maxPrice]); // Reset price range
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`);
    setTimeout(() => setIsClearing(false), 100); // Reset clearing flag
    if (onClose) onClose();
  };

  const hasActiveFilters = 
    currentSizes.length > 0 || 
    currentProductTypes.length > 0 || 
    currentColors.length > 0 || 
    currentMaterials.length > 0 ||
    searchParams.get('minPrice') !== null ||
    searchParams.get('maxPrice') !== null ||
    searchParams.get('tags') !== null;

  // Debounce price changes
  const priceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Don't trigger on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Don't trigger price filter if we're clearing filters
    if (isClearing) return;

    // Only apply filter if price range actually changed from default
    if (priceRange[0] === minPrice && priceRange[1] === maxPrice) return;

    // Apply price filter after user stops dragging (500ms delay)
    if (priceTimeoutRef.current) {
      clearTimeout(priceTimeoutRef.current);
    }

    priceTimeoutRef.current = setTimeout(() => {
      handlePriceChange(priceRange[0]!, priceRange[1]!);
    }, 500);

    return () => {
      if (priceTimeoutRef.current) {
        clearTimeout(priceTimeoutRef.current);
      }
    };
  }, [priceRange, isClearing]);

  const sortOptions = [
    { value: '', label: 'Recommended' },
    { value: 'best-selling', label: 'Best Sellers' },
    { value: 'created-descending', label: 'New Arrivals' },
    { value: 'price-descending', label: 'Price: High to Low' },
    { value: 'price-ascending', label: 'Price: Low to High' }
  ];

  const FilterSection = ({ 
    title, 
    items, 
    filterType, 
    currentValues 
  }: { 
    title: string; 
    items: Record<string, number>; 
    filterType: string;
    currentValues: string[];
  }) => {
    if (Object.keys(items).length === 0) return null;

    return (
      <div className="border-b border-neutral-200 pb-6 mb-6">
        <h3 className="text-sm font-medium text-[#1D2022] mb-3">{title}</h3>
        <div className="space-y-2">
          {Object.entries(items)
            .sort(([, a], [, b]) => b - a)
            .map(([value, count]) => (
              <label
                key={value}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={currentValues.includes(value)}
                    onChange={(e) => handleFilterChange(filterType, value, e.target.checked)}
                    className="w-4 h-4 border-neutral-300 rounded text-black focus:ring-black"
                  />
                  <span className="ml-2 text-sm text-neutral-700 group-hover:text-black">
                    {value}
                  </span>
                </div>
                <span className="text-sm text-neutral-400">({count})</span>
              </label>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`${isMobile ? 'h-full flex flex-col' : ''}`}>
      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="mb-6">
          <button
            onClick={handleClearFilters}
            className="w-full py-2.5 px-4 text-sm font-medium border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-200 uppercase tracking-wider"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Sort By Section */}
      <div className="border-b border-neutral-200 pb-6 mb-6">
        <h3 className="text-sm font-medium text-[#1D2022] mb-3">Sort By</h3>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={currentSort === option.value}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-4 h-4 border-neutral-300 text-black focus:ring-black"
              />
              <span className="ml-2 text-sm text-neutral-700 group-hover:text-black">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className={`${isMobile ? 'flex-1 overflow-y-auto' : ''}`}>
        {Object.keys(sizes).length > 0 && (
          <FilterSection title="Size" items={sizes} filterType="sizes" currentValues={currentSizes} />
        )}
        {Object.keys(productTypes).length > 0 && (
          <FilterSection title="Product Type" items={productTypes} filterType="productTypes" currentValues={currentProductTypes} />
        )}
        {Object.keys(colors).length > 0 && (
          <FilterSection title="Colour" items={colors} filterType="colors" currentValues={currentColors} />
        )}
        {Object.keys(materials).length > 0 && (
          <FilterSection title="Material" items={materials} filterType="materials" currentValues={currentMaterials} />
        )}

        {/* Price Range Slider */}
        {minPrice !== maxPrice && (
          <div className="border-b border-neutral-200 pb-6 mb-6">
            <h3 className="text-sm font-medium text-[#1D2022] mb-4">Price Range</h3>
            
            {/* Dual Range Slider */}
            <div className="px-2">
              <div className="relative h-1 bg-neutral-200 rounded">
                <div 
                  className="absolute h-1 bg-black rounded"
                  style={{
                    left: `${((priceRange[0]! - minPrice) / (maxPrice - minPrice)) * 100}%`,
                    right: `${100 - ((priceRange[1]! - minPrice) / (maxPrice - minPrice)) * 100}%`
                  }}
                />
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  step="0.01"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const newMin = parseFloat(e.target.value);
                    if (newMin <= priceRange[1]!) {
                      setPriceRange([newMin, priceRange[1]!]);
                    }
                  }}
                  className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                  style={{ zIndex: priceRange[0]! > maxPrice - (maxPrice - minPrice) / 10 ? 5 : 3 }}
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  step="0.01"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const newMax = parseFloat(e.target.value);
                    if (newMax >= priceRange[0]!) {
                      setPriceRange([priceRange[0]!, newMax]);
                    }
                  }}
                  className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                  style={{ zIndex: 4 }}
                />
              </div>
              
              {/* Price Labels */}
              <div className="flex items-center justify-between mt-6 text-sm text-neutral-600">
                <span>{currencyCode} {priceRange[0]!.toFixed(2)}</span>
                <span className="text-neutral-400">—</span>
                <span>{currencyCode} {priceRange[1]!.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Close Button */}
      {isMobile && onClose && (
        <div className="border-t border-neutral-200 pt-4 pb-4">
          <button
            onClick={onClose}
            className="w-full bg-black text-white py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
