'use client';

import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState } from 'react';

import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menu } from 'lib/shopify/types';
import Search, { SearchSkeleton } from './search';

function isSaleItem(title: string): boolean {
  return title.toLowerCase().includes('sale');
}

function MenuSearchIcon() {
  return (
    <svg 
      width="40" 
      height="20" 
      viewBox="0 0 40 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="h-4"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M29 16C32.866 16 36 12.866 36 9C36 5.13401 32.866 2 29 2C25.134 2 22 5.13401 22 9C22 12.866 25.134 16 29 16ZM29 17C31.0292 17 32.8819 16.2445 34.2922 14.9995L38.6461 19.3535L39.3532 18.6464L34.9993 14.2924C36.2444 12.8821 37 11.0293 37 9C37 4.58172 33.4183 1 29 1C24.5817 1 21 4.58172 21 9C21 13.4183 24.5817 17 29 17ZM1 4H19V3H1V4ZM1 10.5H19V9.5H1V10.5ZM19 17H1V16H19V17Z" 
        fill="black"
      />
    </svg>
  );
}

function MobileMenuItem({ item, onClose, level = 0 }: { item: Menu; onClose: () => void; level?: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubItems = item.items && item.items.length > 0;

  const handleToggle = () => {
    if (hasSubItems) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <li className={`${level > 0 ? 'pl-4' : ''}`}>
      <div className="flex items-center justify-between py-2 cursor-pointer" onClick={handleToggle}>
        <Link
          href={item.path}
          prefetch={true}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={`text-xl transition-colors hover:text-neutral-500 ${
            isSaleItem(item.title) ? 'text-[#E10101]' : 'text-black'
          }`}
        >
          {item.title}
        </Link>
        <div className="flex-1" onClick={handleToggle} />
        {hasSubItems && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
            className="p-2 flex-shrink-0"
            aria-label={isExpanded ? 'Collapse submenu' : 'Expand submenu'}
          >
            <ChevronRightIcon
              className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            />
          </button>
        )}
      </div>
      {hasSubItems && isExpanded && (
        <ul className="border-l border-neutral-200">
          {item.items!.map((subItem) => (
            <MobileMenuItem key={subItem.title} item={subItem} onClose={onClose} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center border border-neutral-200 text-black transition-colors md:hidden hover:border-neutral-400"
      >
        <MenuSearchIcon />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 overflow-y-auto">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center border border-neutral-200 text-black transition-colors hover:border-neutral-400"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button>

                <div className="mb-4 w-full">
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search showText={true} />
                  </Suspense>
                </div>
                {menu.length ? (
                  <ul className="flex w-full flex-col">
                    {menu.map((item: Menu) => (
                      <MobileMenuItem key={item.title} item={item} onClose={closeMobileMenu} />
                    ))}
                  </ul>
                ) : null}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
