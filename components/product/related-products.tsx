import { Product } from 'lib/shopify/types';
import { RelatedProductsClient } from './related-products-client';

export async function RelatedProducts({ id }: { id: string }) {
  // Fetch related products
  const relatedProductsQuery = `
    query getProductRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) {
        id
        handle
        title
        availableForSale
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
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
        variants(first: 250) {
          edges {
            node {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
            }
          }
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
  const recommendations = data?.productRecommendations || [];
  
  // Transform Shopify response to Product type
  const products: Product[] = recommendations.map((rec: any) => ({
    ...rec,
    variants: rec.variants.edges.map((edge: any) => edge.node)
  }));

  if (!products.length) return null;

  return (
    <section className="py-12">
      <div className="px-4">
        <h2 className="mb-8 text-2xl font-medium uppercase tracking-wider">
          You May Also Like
        </h2>
        <RelatedProductsClient products={products} />
      </div>
    </section>
  );
}
