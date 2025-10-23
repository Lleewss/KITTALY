import Link from 'next/link';

import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import Newsletter from 'components/newsletter';
import { getMenu } from 'lib/shopify';
import { Suspense } from 'react';

const COMPANY_NAME = process.env.COMPANY_NAME || 'KITTALY';
const SITE_NAME = process.env.SITE_NAME || 'KITTALY';

const footerLinks = {
  help: [
    { title: 'Customer Service', href: '/help/customer-service' },
    { title: 'FAQs', href: '/help/faqs' },
    { title: 'Delivery & Returns', href: '/help/delivery' },
    { title: 'Track Order', href: '/help/track-order' },
    { title: 'Size Guide', href: '/help/size-guide' }
  ],
  about: [
    { title: 'About KITTALY', href: '/about' },
    { title: 'Articles', href: '/articles' },
    { title: 'Sustainability', href: '/sustainability' },
    { title: 'Careers', href: '/careers' },
    { title: 'Press', href: '/press' }
  ],
  legal: [
    { title: 'Privacy Policy', href: '/legal/privacy' },
    { title: 'Terms & Conditions', href: '/legal/terms' },
    { title: 'Cookie Policy', href: '/legal/cookies' }
  ]
};

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse bg-neutral-100';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || 'KITTALY';

  return (
    <footer className="border-t border-neutral-200 bg-white text-sm">
      {/* Newsletter Section */}
      <Newsletter />
      
      <div className="mx-auto max-w-screen-2xl px-6 py-12 lg:px-8">
        {/* Section 1: Product Categories - Centered with Underline */}
        <div className="pb-8">
          <nav className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-6">
            <Link
              href="/outerwear"
              className="text-neutral-600 underline transition-colors hover:text-black"
            >
              Outerwear
            </Link>
            <Link
              href="/jeans"
              className="text-neutral-600 underline transition-colors hover:text-black"
            >
              Jeans
            </Link>
            <Link
              href="/knitwear"
              className="text-neutral-600 underline transition-colors hover:text-black"
            >
              Knitwear
            </Link>
            <Link
              href="/trainers"
              className="text-neutral-600 underline transition-colors hover:text-black"
            >
              Trainers
            </Link>
            <Link
              href="/bags"
              className="text-neutral-600 underline transition-colors hover:text-black"
            >
              Bags
            </Link>
            <Link
              href="/classics"
              className="text-neutral-600 underline transition-colors hover:text-black"
            >
              KITTALY Classics
            </Link>
          </nav>
        </div>

        {/* Section 2: Brand Description - Left Aligned */}
        <div className="py-8">
          <div className="text-left">
            <h3 className="mb-3 text-base font-medium text-black">KITTALY Fashion Collection</h3>
            <div className="space-y-2 text-sm text-neutral-600">
              <p>
                Discover the KITTALY fashion collection. Relaxed. Refined. Confident. Feel
                effortlessly stylish in KITTALY apparel and accessories. Relax on the weekend in our
                designer jeans and t-shirts. Make an impact in sophisticated KITTALY wear. Then
                unwind in comfort with our premium essentials. Time to get active? Work out in style
                with KITTALY sportswear.
              </p>
              <p>
                The KITTALY collection features sustainable and breathable materials. Because we care
                about you, and about the planet. KITTALY fashion. Express yourself, every day.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Newsletter Benefits - Centered */}
        <div className="border-t border-neutral-200 py-8">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="mb-6 text-lg font-medium text-black">Enjoy 10% Off Your Order</h3>
            <div className="mb-6 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-8">
              <p className="flex items-center gap-2 text-sm text-neutral-600">
                <svg
                  className="h-4 w-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                15% off on your birthday
              </p>
              <p className="flex items-center gap-2 text-sm text-neutral-600">
                <svg
                  className="h-4 w-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Early access to sales
              </p>
              <p className="flex items-center gap-2 text-sm text-neutral-600">
                <svg
                  className="h-4 w-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Exclusive discounts
              </p>
            </div>
            <Link
              href="/newsletter"
              className="inline-block bg-black px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Original Footer Content */}
        <div className="border-t border-neutral-200 pt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link className="flex items-center gap-2 text-black" href="/">
                <LogoSquare size="sm" />
                <span className="text-xl font-bold uppercase tracking-wider">{SITE_NAME}</span>
              </Link>
              <p className="mt-4 text-sm text-neutral-600">
                Your canvas for limitless self-expression. Premium fashion essentials for the modern
                wardrobe.
              </p>
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-wider text-black">Newsletter</p>
                <form className="mt-3 flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 border border-neutral-300 px-4 py-2 text-sm focus:border-black focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-black px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Help Column */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-black">Help</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.help.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-neutral-600 transition-colors hover:text-black"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-black">About</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-neutral-600 transition-colors hover:text-black"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Menu or Legal Column */}
            <div>
              {menu.length ? (
                <Suspense
                  fallback={
                    <div className="flex flex-col gap-2">
                      <div className={skeleton} />
                      <div className={skeleton} />
                      <div className={skeleton} />
                    </div>
                  }
                >
                  <FooterMenu menu={menu} />
                </Suspense>
              ) : (
                <>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-black">Legal</h3>
                  <ul className="mt-4 space-y-3">
                    {footerLinks.legal.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          className="text-neutral-600 transition-colors hover:text-black"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t border-neutral-200 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-neutral-600">
                &copy; {copyrightDate} {copyrightName}. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 transition-colors hover:text-black"
                  aria-label="Instagram"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 transition-colors hover:text-black"
                  aria-label="Facebook"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 transition-colors hover:text-black"
                  aria-label="Twitter"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
