import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden bg-white',
        {
          relative: label,
          'border-2 border-black': active,
          'border border-neutral-200 hover:border-neutral-400': !active && isInteractive,
          'border border-neutral-200': !active && !isInteractive
        }
      )}
    >
      {props.src ? (
        <Image
          className={clsx('relative h-full w-full object-cover', {
            'transition duration-500 ease-in-out group-hover:opacity-90': isInteractive
          })}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
