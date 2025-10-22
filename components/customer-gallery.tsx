'use client';

import Image from 'next/image';
import Link from 'next/link';

interface CustomerReview {
  id: string;
  image: string;
  customerName: string;
  rating: number;
  quote: string;
  productName: string;
  productHandle: string;
}

// Mock data - replace with real data from your reviews system
const customerReviews: CustomerReview[] = [
  {
    id: '1',
    image: '/images/hero/hero-1-desktop.webp',
    customerName: 'Sarah M.',
    rating: 5,
    quote: 'Absolutely love the quality and fit!',
    productName: 'Classic Denim Jacket',
    productHandle: 'classic-denim-jacket'
  },
  {
    id: '2',
    image: '/images/hero/hero-2-desktop.webp',
    customerName: 'Jessica L.',
    rating: 5,
    quote: 'Perfect for everyday wear.',
    productName: 'Essential White Tee',
    productHandle: 'essential-white-tee'
  },
  {
    id: '3',
    image: '/images/hero/hero-1-desktop.webp',
    customerName: 'Emily R.',
    rating: 5,
    quote: 'The fabric is so soft and comfortable!',
    productName: 'Oversized Hoodie',
    productHandle: 'oversized-hoodie'
  },
  {
    id: '4',
    image: '/images/hero/hero-2-desktop.webp',
    customerName: 'Michael T.',
    rating: 5,
    quote: 'Great quality, exactly as described.',
    productName: 'Slim Fit Chinos',
    productHandle: 'slim-fit-chinos'
  },
  {
    id: '5',
    image: '/images/hero/hero-1-desktop.webp',
    customerName: 'David K.',
    rating: 5,
    quote: 'Best purchase I\'ve made this year!',
    productName: 'Leather Bomber Jacket',
    productHandle: 'leather-bomber-jacket'
  },
  {
    id: '6',
    image: '/images/hero/hero-2-desktop.webp',
    customerName: 'Amanda S.',
    rating: 5,
    quote: 'So many compliments on this piece!',
    productName: 'Midi Skirt',
    productHandle: 'midi-skirt'
  },
  {
    id: '7',
    image: '/images/hero/hero-1-desktop.webp',
    customerName: 'James P.',
    rating: 5,
    quote: 'Fits perfectly and looks amazing!',
    productName: 'Classic Trench Coat',
    productHandle: 'classic-trench-coat'
  },
  {
    id: '8',
    image: '/images/hero/hero-2-desktop.webp',
    customerName: 'Sophie T.',
    rating: 5,
    quote: 'Exceeded all my expectations!',
    productName: 'Cashmere Sweater',
    productHandle: 'cashmere-sweater'
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function CustomerReviewCard({ review }: { review: CustomerReview }) {
  return (
    <Link
      href="/reviews"
      className="group block"
    >
      {/* Customer Photo */}
      <div className="relative aspect-[2/3] overflow-hidden bg-neutral-100">
        <Image
          src={review.image}
          alt={`${review.customerName} wearing ${review.productName}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16.66vw"
        />
      </div>

      {/* Review Info Below */}
      <div className="mt-3 flex flex-col gap-2">
        {/* Star Rating */}
        <StarRating rating={review.rating} />
        
        {/* Quote */}
        <p className="text-sm text-neutral-800 leading-relaxed line-clamp-2">
          "{review.quote}"
        </p>
        
        {/* Customer Name & Product */}
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-medium text-black">
            {review.customerName}
          </p>
          <p className="text-xs text-neutral-500">
            {review.productName}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function CustomerGallery() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-8 text-center md:mb-12">
          <h2 className="text-3xl font-bold uppercase tracking-wider md:text-4xl">
            How Our Customers Wear It
          </h2>
          <p className="mt-3 text-sm text-neutral-600 md:text-base">
            Real people, real style. Get inspired by our community.
          </p>
        </div>

        {/* Gallery Carousel */}
        <div className="overflow-x-auto scrollbar-hide pb-4">
          <div className="flex gap-4 w-max">
            {customerReviews.map((review) => (
              <div key={review.id} className="w-[240px] md:w-[280px]">
                <CustomerReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 text-center md:mt-12">
          <Link
            href="/reviews"
            className="inline-block border-2 border-black bg-white px-8 py-3 text-sm font-medium uppercase tracking-wider text-black transition-colors duration-200 hover:bg-black hover:text-white"
          >
            View All Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
