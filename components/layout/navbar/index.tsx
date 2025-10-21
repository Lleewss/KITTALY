import CartModal from 'components/cart/modal';
import { AnnouncementBanner } from 'components/layout/announcement-banner';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const SITE_NAME = process.env.SITE_NAME || 'KITALLY';

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <>
      <AnnouncementBanner />
      <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex items-center justify-between px-4 py-4 lg:px-6">
            {/* Mobile Menu */}
            <div className="flex items-center md:hidden">
              <Suspense fallback={null}>
                <MobileMenu menu={menu} />
              </Suspense>
            </div>

            {/* Left Menu - Desktop */}
            {menu.length ? (
              <div className="hidden md:flex md:items-center md:gap-8">
                {menu.slice(0, Math.ceil(menu.length / 2)).map((item: Menu) => (
                  <Link
                    key={item.title}
                    href={item.path}
                    prefetch={true}
                    className="text-sm font-medium tracking-wide text-black transition-opacity hover:opacity-70"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ) : null}

            {/* Center Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:relative md:left-auto md:top-auto md:translate-x-0 md:translate-y-0">
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

            {/* Right Menu - Desktop */}
            <div className="flex items-center gap-6">
              {menu.length ? (
                <div className="hidden md:flex md:items-center md:gap-8">
                  {menu.slice(Math.ceil(menu.length / 2)).map((item: Menu) => (
                    <Link
                      key={item.title}
                      href={item.path}
                      prefetch={true}
                      className="text-sm font-medium tracking-wide text-black transition-opacity hover:opacity-70"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ) : null}
              
              <div className="hidden md:block">
                <Suspense fallback={<SearchSkeleton />}>
                  <Search />
                </Suspense>
              </div>
              
              <CartModal />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="border-t border-neutral-200 px-4 py-3 md:hidden">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
        </div>
      </nav>
    </>
  );
}
