import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link className="group relative block" href={`/product/${product.handle}`}>
            {/* Image container - Calvin Klein style */}
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
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-opacity duration-200 group-hover:opacity-90"
              />
            </div>

            {/* Product info - Calvin Klein minimal style */}
            <div className="mt-2 space-y-1">
              {/* Product title - clean, minimal */}
              <h3 className="text-sm font-normal text-[#1D2022] line-clamp-2 leading-tight">
                {product.title}
              </h3>

              {/* Price - simple, no styling */}
              <p className="text-sm font-normal text-[#1D2022]">
                {product.priceRange.maxVariantPrice.currencyCode}{' '}
                {product.priceRange.maxVariantPrice.amount}
              </p>
            </div>
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
