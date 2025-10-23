import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CustomerGallery } from 'components/customer-gallery';
import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { ProductProvider } from 'components/product/product-context';
import { ProductDescription } from 'components/product/product-description';
import { RelatedProducts } from 'components/product/related-products';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct } from 'lib/shopify';
import { Image } from 'lib/shopify/types';
import { Suspense } from 'react';

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="bg-white">
        <div className="mx-auto flex max-w-screen-2xl flex-col lg:flex-row lg:gap-0">
          {/* Left Column - Images */}
          <div className="scrollbar-hide w-full lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:overflow-y-auto lg:pr-1">
            <Suspense
              fallback={
                <div className="relative aspect-[3/4] w-full bg-neutral-100" />
              }
            >
              <Gallery
                images={product.images.map((image: Image) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              />
            </Suspense>
          </div>

          {/* Right Column - Product Details */}
          <div className="w-full px-6 py-8 lg:w-1/2 lg:px-12 lg:py-12">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>

        {/* Customer Gallery */}
        <CustomerGallery />

        {/* Related Products - Full Width */}
        <div className="mx-auto max-w-screen-2xl px-6">
          <Suspense fallback={null}>
            <RelatedProductsWrapper id={product.id} />
          </Suspense>
        </div>
      </div>
      <Footer />
    </ProductProvider>
  );
}

async function RelatedProductsWrapper({ id }: { id: string }) {
  return <RelatedProducts id={id} />;
}
