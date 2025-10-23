import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Footer from 'components/layout/footer';
import { DEFAULT_REVIEWS } from 'lib/default-reviews';
import { getPage } from 'lib/shopify';

export const metadata: Metadata = {
  title: 'Customer Reviews - KITTALY',
  description: 'Read what our customers are saying about KITTALY. Real reviews from real people.',
  openGraph: {
    title: 'Customer Reviews - KITTALY',
    description: 'Real reviews from real people.'
  }
};

interface Review {
  id: string;
  photo: string;
  rating: number;
  text: string;
  name: string;
  product: string;
  link: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Link
      href={review.link}
      className="group block border border-neutral-200 bg-white transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <Image
          src={review.photo}
          alt={`${review.name} wearing ${review.product}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {/* Star Rating */}
        <StarRating rating={review.rating} />

        {/* Review Text */}
        <p className="mt-3 text-sm leading-relaxed text-neutral-800 md:text-base">
          "{review.text}"
        </p>

        {/* Customer Info */}
        <div className="mt-4 border-t border-neutral-200 pt-4">
          <p className="text-sm font-medium text-black">{review.name}</p>
          <p className="mt-1 text-xs text-neutral-500 uppercase tracking-wide">
            {review.product}
          </p>
        </div>

        {/* View Product Link */}
        <div className="mt-4">
          <span className="inline-flex items-center text-xs font-medium uppercase tracking-wider text-black transition-colors group-hover:underline">
            View Product
            <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function ReviewsPage() {
  const page = await getPage('reviews');
  
  let customReviews: Review[] = [];
  
  // Try to parse JSON from page body
  if (page?.body) {
    try {
      const parsedReviews = JSON.parse(page.body);
      if (Array.isArray(parsedReviews)) {
        customReviews = parsedReviews;
      }
    } catch (error) {
      console.error('Failed to parse reviews JSON:', error);
    }
  }

  // Convert default reviews to Review format
  const defaultReviewsFormatted: Review[] = DEFAULT_REVIEWS.map((review) => ({
    id: review.id,
    photo: review.image,
    rating: review.rating,
    text: review.quote,
    name: review.customerName,
    product: review.productName,
    link: '/search' // Default link for hardcoded reviews
  }));

  // Combine custom reviews with hardcoded reviews
  const allReviews = [...customReviews, ...defaultReviewsFormatted];

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <section className="border-b border-neutral-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-4xl lg:text-5xl">
                Customer Reviews
              </h1>
              <p className="mt-4 text-base text-neutral-600 md:text-lg">
                Real people, real style. See how our customers are wearing KITTALY.
              </p>
              
              {/* Stats */}
              <div className="mt-8 flex items-center justify-center gap-8">
                <div>
                  <p className="text-2xl font-bold text-black md:text-3xl">
                    {allReviews.length}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-neutral-500">
                    Reviews
                  </p>
                </div>
                <div className="h-12 w-px bg-neutral-200" />
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-2xl font-bold text-black md:text-3xl">5.0</p>
                    <svg className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wider text-neutral-500">
                    Average Rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
            {allReviews.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg text-neutral-500">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-neutral-200 bg-neutral-50 py-12 md:py-16">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
                Share Your Style
              </h2>
              <p className="mt-3 text-sm text-neutral-600 md:text-base">
                Tag us @kittaly on Instagram to be featured in our customer gallery
              </p>
              <div className="mt-8">
                <Link
                  href="/search"
                  className="inline-block border-2 border-black bg-black px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-black"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
