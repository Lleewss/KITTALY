import type { Metadata } from 'next';

import { Carousel } from 'components/carousel';
import { CustomerGallery } from 'components/customer-gallery';
import { DualHeroSection } from 'components/dual-hero-section';
import { ThreeItemGrid } from 'components/grid/three-items';
import { HeroSection } from 'components/hero-section';
import CollectionProducts from 'components/layout/collection-products';
import Footer from 'components/layout/footer';
import TagFilters from 'components/layout/search/tag-filters';
import PromoBanner from 'components/promo-banner';
import Prose from 'components/prose';
import { defaultSort, sorting } from 'lib/constants';
import { getCollection, getCollectionProducts, getMenu, getPage } from 'lib/shopify';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  
  // Try collection first
  const collection = await getCollection(params.page);
  if (collection) {
    return {
      title: collection.seo?.title || collection.title,
      description:
        collection.seo?.description || collection.description || `${collection.title} products`
    };
  }
  
  // Then try page
  const page = await getPage(params.page);
  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function Page(props: {
  params: Promise<{ page: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  // Try collection first
  const collection = await getCollection(params.page);
  
  if (collection) {
    // This is a collection - show products with CK-style layout
    const { sort } = (searchParams as { [key: string]: string }) || {};
    const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
    const products = await getCollectionProducts({
      collection: params.page,
      sortKey,
      reverse
    });

    return (
      <>
        {/* Collection Header - Left aligned title, right aligned count */}
        <div className="border-b border-neutral-200 bg-white py-6">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-normal text-[#1D2022] md:text-3xl">
                {collection.title}
              </h1>
              <span className="text-sm text-neutral-500">
                {products.length} {products.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
        </div>

        {/* Tag Filters Row */}
        <div className="border-b border-neutral-200 bg-white py-4">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
            <TagFilters products={products} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-screen-2xl px-4 py-8 lg:px-6 lg:py-12">
          {products.length === 0 ? (
            <p className="py-12 text-center text-lg text-neutral-500">
              No products found in this collection
            </p>
          ) : (
            <CollectionProducts products={products} />
          )}
        </div>
      </>
    );
  }
  
  // Not a collection, try page
  const page = await getPage(params.page);
  if (!page) return notFound();

  // Helper function to get metafield value
  const getMetafield = (key: string): string | null => {
    const metafield = page.metafields?.find((m: any) => m && m.key === key);
    if (!metafield) return null;
    
    // Handle file references (images)
    if (metafield.type === 'file_reference' && metafield.reference?.image) {
      return metafield.reference.image.url;
    }
    
    return metafield.value;
  };

  // Check if page has homepage-style metafields
  const hasHomeLayout = getMetafield('hero_image_desktop') !== null;

  // If page has home layout metafields, render homepage structure
  if (hasHomeLayout) {
    // Get menu links for CTAs (same as homepage)
    const menu = await getMenu('next-js-frontend-header-menu');
    const saleLink = menu[3]?.path || '/search';

    return (
      <>
        {/* Promo Banner - Always show */}
        <PromoBanner
          buttonText="Shop Now"
          buttonLink={saleLink}
        />

        {/* Main Hero */}
        <HeroSection
          image={getMetafield('hero_image_desktop') || '/images/hero/hero-1-desktop.webp'}
          mobileImage={getMetafield('hero_image_mobile') || '/images/hero/hero-1-mobile.webp'}
          title={getMetafield('hero_title') || 'Welcome'}
          subtitle={getMetafield('hero_subtitle') || ''}
          cta={{
            text: 'Shop Now',
            href: getMetafield('hero_cta_link') || '/search'
          }}
          textPosition="left"
          textColor="white"
        />

        {/* Dual Hero Section */}
        {getMetafield('dual_hero_left_image_desktop') && getMetafield('dual_hero_right_image_desktop') && (
          <DualHeroSection
            left={{
              image: getMetafield('dual_hero_left_image_desktop')!,
              mobileImage: getMetafield('dual_hero_left_image_mobile') || getMetafield('dual_hero_left_image_desktop')!,
              title: getMetafield('dual_hero_left_title') || '',
              subtitle: getMetafield('dual_hero_left_subtitle') || '',
              ctaText: 'Shop Now',
              ctaHref: getMetafield('dual_hero_left_cta_link') || '/search',
              textColor: 'white'
            }}
            right={{
              image: getMetafield('dual_hero_right_image_desktop')!,
              mobileImage: getMetafield('dual_hero_right_image_mobile') || getMetafield('dual_hero_right_image_desktop')!,
              title: getMetafield('dual_hero_right_title') || '',
              subtitle: getMetafield('dual_hero_right_subtitle') || '',
              ctaText: 'Shop Now',
              ctaHref: getMetafield('dual_hero_right_cta_link') || '/search',
              textColor: 'white'
            }}
          />
        )}

        {/* Featured Products Grid */}
        {getMetafield('featured_collection') && (
          <section className="mx-auto max-w-screen-2xl px-4 py-12 md:py-16">
            <h2 className="mb-8 text-center text-3xl font-bold uppercase tracking-wider">
              Featured
            </h2>
            <ThreeItemGrid />
          </section>
        )}

        {/* Customer Gallery */}
        {getMetafield('gallery_item_1_photo') && (() => {
          // Parse gallery items
          const galleryReviews = [];
          for (let i = 1; i <= 8; i++) {
            const photo = getMetafield(`gallery_item_${i}_photo`);
            const text = getMetafield(`gallery_item_${i}_text`);
            
            if (photo && text) {
              // Parse the multiline text (3 lines: comment, name, product)
              const lines = text.split('\n').map(line => line.trim()).filter(line => line);
              if (lines.length >= 3) {
                galleryReviews.push({
                  id: `${i}`,
                  image: photo,
                  quote: lines[0] || '', // First line: comment
                  customerName: lines[1] || '', // Second line: name
                  productName: lines[2] || '', // Third line: product
                  rating: 5 // Hardcoded 5 stars
                });
              }
            }
          }
          
          return galleryReviews.length > 0 ? <CustomerGallery reviews={galleryReviews} /> : null;
        })()}

        {/* Product Carousel - Latest Arrivals */}
        {getMetafield('latest_arrivals_collection') && (
          <section className="mx-auto max-w-screen-2xl px-4 py-12 md:py-16">
            <h2 className="mb-8 text-center text-3xl font-bold uppercase tracking-wider">
              Latest Arrivals
            </h2>
            <Carousel />
          </section>
        )}

        {/* Secondary Hero - Explore Collection */}
        {getMetafield('secondary_hero_image_desktop') && (
          <HeroSection
            image={getMetafield('secondary_hero_image_desktop') || ''}
            mobileImage={getMetafield('secondary_hero_image_mobile') || ''}
            title={getMetafield('secondary_hero_title') || 'Explore the Collection'}
            subtitle={getMetafield('secondary_hero_subtitle') || ''}
            cta={{
              text: 'Shop Now',
              href: getMetafield('secondary_hero_cta_link') || '/search'
            }}
            textPosition="left"
            textColor="white"
          />
        )}

        <Footer />
      </>
    );
  }

  // Default page layout (prose content)
  return (
    <div className="w-full">
      <div className="mx-auto max-w-2xl px-8 py-20">
        <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
        <Prose className="mb-8" html={page.body} />
        <p className="text-sm italic">
          {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }).format(new Date(page.updatedAt))}.`}
        </p>
      </div>
    </div>
  );
}
