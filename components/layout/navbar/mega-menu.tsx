'use client';

import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface MegaMenuProps {
  menu: Menu[];
}

interface CollectionImages {
  [key: string]: string;
}

function isSaleItem(title: string): boolean {
  return title.toLowerCase().includes('sale');
}

export default function MegaMenu({ menu }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [hoveredSubMenu, setHoveredSubMenu] = useState<Menu | null>(null);
  const [collectionImages, setCollectionImages] = useState<CollectionImages>({});
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
  const [menuTop, setMenuTop] = useState(0);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (menuContainerRef.current) {
      const rect = menuContainerRef.current.getBoundingClientRect();
      setMenuTop(rect.bottom);
    }
  }, []);

  const fetchCollectionImage = async (path: string) => {
    if (collectionImages[path] || loadingImages.has(path)) return;
    
    setLoadingImages(prev => new Set(prev).add(path));
    
    try {
      let url = path;
      
      // If it's a full URL, extract just the pathname
      if (url.startsWith('http://') || url.startsWith('https://')) {
        try {
          const urlObj = new URL(url);
          url = urlObj.pathname;
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Invalid URL:', url);
          }
          return;
        }
      }
      
      // Extract handle from pathname - support both /search/ and /collections/
      let handle = url
        .replace('/search/', '')
        .replace('/collections/', '')
        .replace('/search', '')
        .replace('/collections', '')
        .replace(/^\/+/, '')
        .replace(/\/+$/, '');
      
      if (!handle) {
        if (process.env.NODE_ENV === 'development') {
          console.log('No handle found in path:', path);
        }
        return;
      }
      
      const response = await fetch(`/api/collection-image/${handle}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.image) {
          setCollectionImages(prev => ({ ...prev, [path]: data.image }));
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching collection image:', error);
      }
    } finally {
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(path);
        return newSet;
      });
    }
  };

  const handleMenuEnter = (title: string, item: Menu) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setActiveMenu(title);
    setActiveSubMenu(null);
    setHoveredSubMenu(null);
    
    if (item.items && item.items.length > 0 && item.items[0]) {
      fetchCollectionImage(item.items[0].path);
      setActiveSubMenu(item.items[0].title);
      setHoveredSubMenu(item.items[0]);
    }
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setActiveSubMenu(null);
      setHoveredSubMenu(null);
    }, 100);
  };

  const handleMegaMenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleSubMenuEnter = (subItem: Menu) => {
    setActiveSubMenu(subItem.title);
    setHoveredSubMenu(subItem);
    fetchCollectionImage(subItem.path);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={menuContainerRef} className="hidden md:flex md:items-center md:gap-8">
        {menu.map((item: Menu) => (
          <div
            key={item.title}
            className="relative group"
            onMouseEnter={() => handleMenuEnter(item.title, item)}
            onMouseLeave={handleMenuLeave}
          >
            <Link
              href={item.path}
              prefetch={true}
              className={`text-sm font-medium tracking-wide transition-opacity hover:opacity-70 block py-2 relative inline-block ${
                isSaleItem(item.title) ? 'text-[#E10101]' : 'text-black'
              }`}
            >
              {item.title}
              <span 
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-current transform origin-left transition-transform duration-200 ${
                  activeMenu === item.title ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
            
            {item.items && item.items.length > 0 && activeMenu === item.title && (
              <div className="absolute left-0 right-0 h-4 -bottom-4 z-50" />
            )}
          </div>
        ))}
      </div>

      {activeMenu && menu.find(m => m.title === activeMenu)?.items && (
        <div 
          className="fixed left-0 right-0 z-40 hidden md:block mt-1"
          style={{ 
            top: `${menuTop}px`,
          }}
          onMouseEnter={handleMegaMenuEnter}
          onMouseLeave={handleMenuLeave}
        >
          <div className="border-t border-neutral-200" />
          <div className="bg-white border-b border-neutral-200 shadow-lg">
            <div className="mx-auto max-w-screen-2xl">
              <div className="flex">
                <div className="w-64 border-r border-neutral-200 py-8 px-6">
                  <ul className="space-y-1">
                    {menu.find(m => m.title === activeMenu)?.items?.map((subItem: Menu) => (
                      <li
                        key={subItem.title}
                        onMouseEnter={() => handleSubMenuEnter(subItem)}
                        className="group/submenu"
                      >
                        <Link
                          href={subItem.path}
                          prefetch={true}
                          className={`block py-2 px-3 text-sm font-medium transition-all rounded-sm relative ${
                            activeSubMenu === subItem.title
                              ? 'bg-neutral-100'
                              : 'hover:bg-neutral-50'
                          } ${
                            isSaleItem(subItem.title) ? 'text-[#E10101]' : 'text-black'
                          }`}
                        >
                          <span className="relative inline-block">
                            {subItem.title}
                            {subItem.items && subItem.items.length > 0 && (
                              <svg
                                className="inline-block ml-1 w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M13.3309 10L5.62622 1.33221L6.37363 0.667847L14.6689 10L6.37363 19.3322L5.62622 18.6678L13.3309 10Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            <span 
                              className={`absolute bottom-0 left-0 right-0 h-px transform origin-left transition-transform duration-200 ${
                                activeSubMenu === subItem.title ? 'scale-x-100' : 'scale-x-0 group-hover/submenu:scale-x-100'
                              } ${
                                isSaleItem(subItem.title) ? 'bg-[#E10101]' : 'bg-black'
                              }`}
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1 py-8 px-8 min-h-[400px] max-h-[500px] overflow-y-auto">
                  {hoveredSubMenu && hoveredSubMenu.items && hoveredSubMenu.items.length > 0 ? (
                    <ul className="space-y-1">
                      {hoveredSubMenu.items.map((subSubItem: Menu) => (
                        <li key={subSubItem.title} className="group/subsubmenu">
                          <Link
                            href={subSubItem.path}
                            prefetch={true}
                            className={`block py-2 px-3 text-sm font-medium transition-all rounded-sm ${
                              isSaleItem(subSubItem.title)
                                ? 'text-[#E10101]'
                                : 'text-neutral-700'
                            } hover:bg-neutral-50`}
                          >
                            <span className="relative inline-block">
                              {subSubItem.title}
                              <span 
                                className={`absolute bottom-0 left-0 right-0 h-px transform origin-left transition-transform duration-200 scale-x-0 group-hover/subsubmenu:scale-x-100 ${
                                  isSaleItem(subSubItem.title) ? 'bg-[#E10101]' : 'bg-black'
                                }`}
                              />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div />
                  )}
                </div>

                <div className="w-96 border-l border-neutral-200 flex-shrink-0 bg-white">
                  {hoveredSubMenu && collectionImages[hoveredSubMenu.path] ? (
                    <Link href={hoveredSubMenu.path} className="block h-full max-h-[500px] group/image p-6">
                      <div className="relative h-full">
                        <img
                          src={collectionImages[hoveredSubMenu.path]}
                          alt={hoveredSubMenu.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-white p-6">
                          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">KITTALY</p>
                          <p className="text-lg font-medium text-black relative inline-block">
                            {hoveredSubMenu.title}
                            <span className="absolute bottom-0 left-0 right-0 h-px bg-black transform origin-left transition-transform duration-200 scale-x-0 group-hover/image:scale-x-100" />
                          </p>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="h-full max-h-[500px]" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
