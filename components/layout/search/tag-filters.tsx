'use client';

import { Product } from 'lib/shopify/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface TagFiltersProps {
  products: Product[];
}

export default function TagFilters({ products }: TagFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get all unique tags and their counts (limit to 6 most common)
  const tagCounts = products.reduce((acc, product) => {
    product.tags.forEach((tag) => {
      // Skip tags that are metadata (type:, color:, etc.)
      if (!tag.includes(':')) {
        acc[tag] = (acc[tag] || 0) + 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  const topTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([tag]) => tag);

  // Get currently active tags from URL
  const activeTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentTags = params.get('tags')?.split(',').filter(Boolean) || [];
    
    let newTags: string[];
    if (currentTags.includes(tag)) {
      // Remove tag if already active
      newTags = currentTags.filter((t) => t !== tag);
    } else {
      // Add tag if not active
      newTags = [...currentTags, tag];
    }
    
    if (newTags.length > 0) {
      params.set('tags', newTags.join(','));
    } else {
      params.delete('tags');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  if (topTags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {topTags.map((tag) => {
        const isActive = activeTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-2 text-sm border border-black transition-colors ${
              isActive
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
