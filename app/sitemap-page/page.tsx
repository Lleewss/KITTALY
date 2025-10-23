import { getBlog, getCollections, getPages, getProducts } from 'lib/shopify';
import { Metadata } from 'next';
import Link from 'next/link';
import LoadMoreSection from './load-more-section';

export const metadata: Metadata = {
  title: 'Sitemap | KITTALY',
  description: 'Browse all pages and collections on KITTALY. Find what you\'re looking for quickly and easily.'
};

export default async function SitemapPage() {
  // Fetch ALL data dynamically from Shopify
  const [collections, articles, pages, products] = await Promise.all([
    getCollections(),
    getBlog('news'),
    getPages(),
    getProducts({})
  ]);

  // Shop Links - All Collections
  const shopLinks = [
    { title: 'All Products', href: '/search' },
    ...collections.map(collection => ({
      title: collection.title,
      href: collection.path
    }))
  ];

  // Products - All Products
  const productLinks = products.map(product => ({
    title: product.title,
    href: `/product/${product.handle}`
  }));

  // Articles
  const articleLinks = articles.map(article => ({
    title: article.title,
    href: `/articles/${article.handle}`
  }));

  // Info Links - Dynamically get pages from Shopify + hardcoded special pages
  const specialPages = [
    { title: 'Articles', href: '/articles' },
    { title: 'Reviews', href: '/reviews' }
  ];

  const pageLinks = [
    ...pages.map(page => ({
      title: page.title,
      href: `/${page.handle}`
    })),
    ...specialPages
  ];

  const helpLinks = [
    { title: 'Customer Service', href: '/help/customer-service' },
    { title: 'FAQs', href: '/help/faqs' },
    { title: 'Delivery & Returns', href: '/help/delivery' },
    { title: 'Track Order', href: '/help/track-order' },
    { title: 'Size Guide', href: '/help/size-guide' }
  ];

  const legalLinks = [
    { title: 'Privacy Policy', href: '/legal/privacy' },
    { title: 'Terms & Conditions', href: '/legal/terms' },
    { title: 'Cookie Policy', href: '/legal/cookies' }
  ];

  return (
    <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-neutral-200 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h1 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-5xl">
              Sitemap
            </h1>
            <p className="mt-4 max-w-2xl text-base text-neutral-600">
              Navigate through all pages on KITTALY. Find collections, articles, help resources, and more.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="py-12 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              {/* Collections */}
              <LoadMoreSection
                title="Collections"
                items={shopLinks}
                initialCount={20}
                loadMoreCount={20}
                showCount={shopLinks.length > 20}
              />

              {/* Products */}
              <LoadMoreSection
                title="Products"
                items={productLinks}
                initialCount={50}
                loadMoreCount={50}
                showCount={true}
              />

              {/* Pages (About, Sustainability, etc.) */}
              <LoadMoreSection
                title="Pages"
                items={pageLinks}
                initialCount={20}
                loadMoreCount={20}
                showCount={pageLinks.length > 20}
              />

              {/* Articles */}
              <LoadMoreSection
                title="Articles"
                items={articleLinks}
                initialCount={20}
                loadMoreCount={20}
                showCount={articleLinks.length > 20}
                headerLinks={[{ title: 'All Articles', href: '/articles' }]}
              />

              {/* Help & Support */}
              <div>
                <h2 className="mb-6 text-xl font-bold uppercase tracking-wider text-[#1D2022]">
                  Help & Support
                </h2>
                <ul className="space-y-3">
                  {helpLinks.map((link, index) => (
                    <li key={`help-${index}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-600 transition-colors hover:text-black"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h2 className="mb-6 text-xl font-bold uppercase tracking-wider text-[#1D2022]">
                  Legal
                </h2>
                <ul className="space-y-3">
                  {legalLinks.map((link, index) => (
                    <li key={`legal-${index}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-600 transition-colors hover:text-black"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 border-t border-neutral-200 pt-12">
              <div className="mx-auto max-w-2xl text-center">
                <h3 className="text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
                  Can't Find What You're Looking For?
                </h3>
                <p className="mt-4 text-base text-neutral-600">
                  Our customer service team is here to help. Get in touch with us for assistance.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/help/customer-service"
                    className="border-2 border-black bg-black px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-black"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/search"
                    className="border-2 border-black bg-white px-8 py-3 text-sm font-medium uppercase tracking-wider text-black transition-colors duration-200 hover:bg-black hover:text-white"
                  >
                    Browse All Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
