import type { Metadata } from 'next';

import CollectionProducts from 'components/layout/collection-products';
import TagFilters from 'components/layout/search/tag-filters';
import Prose from 'components/prose';
import { defaultSort, sorting } from 'lib/constants';
import { getCollection, getCollectionProducts, getPage } from 'lib/shopify';
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
