import Image from 'next/image';
import Link from 'next/link';

interface DualHeroItem {
  image: string;
  mobileImage?: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
  textColor?: 'white' | 'black';
}

interface DualHeroSectionProps {
  left: DualHeroItem;
  right: DualHeroItem;
}

function DualHeroItem({ item }: { item: DualHeroItem }) {
  const colorClass = item.textColor === 'black' ? 'text-black' : 'text-white';

  return (
    <Link href={item.ctaHref} className="block h-full">
      <div className="relative h-full w-full overflow-hidden bg-neutral-100 cursor-pointer group">
        {/* Desktop Image */}
        <div className="relative hidden h-full w-full md:block">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="50vw"
            quality={90}
          />
        </div>

        {/* Mobile Image */}
        <div className="relative block h-full w-full md:hidden">
          <Image
            src={item.mobileImage || item.image}
            alt={item.title}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 flex justify-start items-end pointer-events-none">
          <div className="flex w-full flex-col gap-3 px-6 pb-8 md:px-8 lg:px-12 md:pb-12 text-left items-start">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider ${colorClass}`}>
              {item.title}
            </h2>
            {item.subtitle && (
              <p className={`text-base md:text-lg lg:text-xl font-light ${colorClass}`}>
                {item.subtitle}
              </p>
            )}
            <div className="mt-2 pointer-events-auto">
              <span
                className={`inline-block border-2 px-8 py-3 text-sm font-medium uppercase tracking-wider transition-colors duration-200 hover:bg-white hover:text-black ${
                  item.textColor === 'black'
                    ? 'border-black text-black hover:bg-black hover:text-white'
                    : 'border-white text-white'
                }`}
              >
                {item.ctaText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function DualHeroSection({ left, right }: DualHeroSectionProps) {
  return (
    <section className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Column */}
        <div className="h-screen">
          <DualHeroItem item={left} />
        </div>

        {/* Right Column */}
        <div className="h-screen">
          <DualHeroItem item={right} />
        </div>
      </div>
    </section>
  );
}
