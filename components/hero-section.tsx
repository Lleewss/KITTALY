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

  const colorClass = textColor === 'white' ? 'text-white' : 'text-black';

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-neutral-100">
      {/* Desktop Image */}
      <div className="relative hidden h-full w-full md:block">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
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
          className="object-cover"
          sizes="(min-width: 768px) 0vw, 100vw"
          quality={90}
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className={`flex w-full max-w-screen-xl flex-col gap-4 px-6 ${textAlignClass}`}>
          <h1 className={`text-4xl font-bold uppercase tracking-wider md:text-6xl lg:text-7xl ${colorClass}`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`text-lg font-light md:text-xl lg:text-2xl ${colorClass}`}>
              {subtitle}
            </p>
          )}
          {cta && (
            <div className="mt-4">
              <Link
                href={cta.href}
                className={`inline-block border-2 px-8 py-3 text-sm font-medium uppercase tracking-wider transition-colors duration-200 hover:bg-white hover:text-black ${
                  textColor === 'white'
                    ? 'border-white text-white'
                    : 'border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                {cta.text}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Optional Gradient Overlay for better text readability */}
      {textColor === 'white' && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
      )}
    </section>
  );
}
