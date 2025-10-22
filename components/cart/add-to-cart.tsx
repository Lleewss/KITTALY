'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';

function SubmitButton({
  availableForSale,
  selectedVariantId,
  onScrollToVariant
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  onScrollToVariant?: () => void;
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center bg-black p-4 text-sm font-medium uppercase tracking-wider text-white transition-opacity';
  const disabledClasses = 'cursor-not-allowed opacity-40';
  const mobileClickableClasses = 'lg:cursor-not-allowed lg:opacity-40 hover:opacity-80';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        type="button"
        aria-label="Please select an option"
        onClick={(e) => {
          // On mobile, scroll to variant selector instead of being disabled
          if (window.innerWidth < 1024 && onScrollToVariant) {
            e.preventDefault();
            onScrollToVariant();
          }
        }}
        disabled={typeof window !== 'undefined' && window.innerWidth >= 1024}
        className={clsx(buttonClasses, mobileClickableClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Bag
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, 'hover:opacity-80')}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Bag
    </button>
  );
}

export function AddToCart({ product, onScrollToVariant }: { product: Product; onScrollToVariant?: () => void }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        addItemAction();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        onScrollToVariant={onScrollToVariant}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
