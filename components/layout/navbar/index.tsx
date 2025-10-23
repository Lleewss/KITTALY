import CartModal from 'components/cart/modal';
import { AnnouncementBanner } from 'components/layout/announcement-banner';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import MegaMenu from './mega-menu';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const SITE_NAME = process.env.SITE_NAME || 'FLOELI';

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <>
      <AnnouncementBanner />
      <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-screen-2xl">
          <div className="relative flex items-center px-4 py-4 lg:px-6">
            {/* Mobile Menu */}
            <div className="md:hidden flex-none">
              <Suspense fallback={null}>
                <MobileMenu menu={menu} />
              </Suspense>
            </div>

            {/* Desktop Menu - Left Side */}
            <div className="hidden md:flex md:items-center md:gap-8 md:flex-none">
              {menu.length ? (
                <MegaMenu menu={menu} />
              ) : null}
            </div>

            {/* Logo - Centered */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link
                href="/"
                prefetch={true}
                className="flex items-center gap-2"
              >
                <LogoSquare />
                <span className="text-xl font-bold uppercase tracking-wider">
                  {SITE_NAME}
                </span>
              </Link>
            </div>

            {/* Right Section - Search & Cart */}
            <div className="flex items-center justify-end gap-6 md:flex-none ml-auto">
              <div className="hidden md:block">
                <Suspense fallback={<SearchSkeleton />}>
                  <Search />
                </Suspense>
              </div>
              
              <CartModal />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
