'use client';

import Link from 'next/link';
import { useState } from 'react';

type LinkItem = {
  title: string;
  href: string;
};

type Props = {
  title?: string;
  items: LinkItem[];
  initialCount?: number;
  loadMoreCount?: number;
  showCount?: boolean;
  headerLinks?: LinkItem[];
};

export default function LoadMoreSection({
  title,
  items,
  initialCount = 50,
  loadMoreCount = 50,
  showCount = false,
  headerLinks = []
}: Props) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const hasMore = visibleCount < items.length;
  const visibleItems = items.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + loadMoreCount, items.length));
  };

  return (
    <div>
      {title && (
        <h2 className="mb-6 text-xl font-bold uppercase tracking-wider text-[#1D2022]">
          {title}
        </h2>
      )}
      {showCount && (
        <p className="mb-4 text-xs text-neutral-500">
          Showing {visibleItems.length} of {items.length}
        </p>
      )}
      <ul className="space-y-3">
        {headerLinks.map((link, index) => (
          <li key={`header-${index}-${link.href}`}>
            <Link
              href={link.href}
              className="text-sm font-medium text-black transition-colors hover:text-neutral-600"
            >
              {link.title}
            </Link>
          </li>
        ))}
        {visibleItems.map((link, index) => (
          <li key={`${title || 'item'}-${index}-${link.href}`}>
            <Link
              href={link.href}
              className="text-sm text-neutral-600 transition-colors hover:text-black"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-6 border-2 border-black bg-white px-6 py-2 text-xs font-medium uppercase tracking-wider text-black transition-colors duration-200 hover:bg-black hover:text-white"
        >
          Load More ({Math.min(loadMoreCount, items.length - visibleCount)} more)
        </button>
      )}
    </div>
  );
}
