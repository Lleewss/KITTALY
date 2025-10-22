import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export async function RelatedProducts({ id }: { id: string }) {
  const relatedProductsQuery = `
    query getProductRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) {
        id
        title
        handle
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
          width
          height
        }
      }
    }
  `;

  const SHOPIFY_GRAPHQL_API_ENDPOINT = process.env.SHOPIFY_STORE_DOMAIN
    ? `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-01/graphql.json`
    : '';

  const response = await fetch(SHOPIFY_GRAPHQL_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || ''
    },
    body: JSON.stringify({
      query: relatedProductsQuery,
      variables: { productId: id }
    }),
    next: { revalidate: 86400 }
  });

  if (!response.ok) {
    return null;
  }

  const { data } = await response.json();
  const relatedProducts: Product[] = data.productRecommendations;

  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <div className="pb-8">
      <h2 className="mb-6 text-2xl font-normal text-[#1D2022]">You May Also Like</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 overflow-x-auto md:grid-cols-4">
        {relatedProducts.map((product) => (
          <Link
            key={product.handle}
            className="group relative block"
            href={`/product/${product.handle}`}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-50">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-opacity duration-200 group-hover:opacity-90"
              />
            </div>
            <div className="mt-2 space-y-1">
              <h3 className="text-sm font-normal text-[#1D2022] line-clamp-2 leading-tight">
                {product.title}
              </h3>
              <p className="text-sm font-normal text-[#1D2022]">
                {product.priceRange.maxVariantPrice.currencyCode}{' '}
                {product.priceRange.maxVariantPrice.amount}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
