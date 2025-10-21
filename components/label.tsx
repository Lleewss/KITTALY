import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
      className={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label')}
    >
      <div className="flex w-full items-center justify-between bg-white p-3 text-xs font-medium text-black">
        <h3 className="line-clamp-2 grow pr-4 leading-tight tracking-wide">{title}</h3>
        <Price
          className="flex-none text-sm font-semibold"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
