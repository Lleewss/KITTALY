import Image from 'next/image';
import Link from 'next/link';

interface HeroSection {
  image: string;
  mobileImage?: string;
  title: string;
  subtitle?: string;
  cta?: {
    text: string;
    href: string;
  };
  textPosition?: 'left' | 'center' | 'right';
  textColor?: 'white' | 'black';
}

export function HeroSection({
  image,
  mobileImage,
  title,
  subtitle,
  cta,
  textPosition = 'center',
  textColor = 'white'
}: HeroSection) {
  const textAlignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }[textPosition];

  const textPositionClass = {
    left: 'justify-start items-end',
    center: 'justify-center items-center',
    right: 'justify-end items-end'
  }[textPosition];

  const colorClass = textColor === 'white' ? 'text-white' : 'text-black';
  const ctaHref = cta?.href || '/search';

  return (
    <Link href={ctaHref} className="block">
      <section className="relative h-screen w-full overflow-hidden bg-neutral-100 cursor-pointer group">
        {/* Desktop Image */}
        <div className="relative hidden h-full w-full md:block">
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 0vw, 100vw"
            quality={90}
          />
        </div>

        {/* Mobile Image */}
        <div className="relative block h-full w-full md:hidden">
          <Image
            src={mobileImage || image}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 768px) 0vw, 100vw"
            quality={90}
          />
        </div>

        {/* Overlay Content */}
        <div className={`absolute inset-0 z-10 flex ${textPositionClass} pointer-events-none`}>
          <div className={`flex w-full max-w-screen-2xl flex-col gap-4 px-6 pb-12 md:px-12 lg:px-16 md:pb-16 ${textAlignClass}`}>
            <h1 className={`text-4xl font-bold uppercase tracking-wider md:text-6xl lg:text-7xl ${colorClass}`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`text-lg font-light md:text-xl lg:text-2xl ${colorClass}`}>
                {subtitle}
              </p>
            )}
            {cta && (
              <div className="mt-4 pointer-events-auto">
                <span
                  className={`inline-block border-2 px-8 py-3 text-sm font-medium uppercase tracking-wider transition-colors duration-200 hover:bg-white hover:text-black ${
                    textColor === 'white'
                      ? 'border-white text-white'
                      : 'border-black text-black hover:bg-black hover:text-white'
                  }`}
                >
                  {cta.text}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </Link>
  );
}
