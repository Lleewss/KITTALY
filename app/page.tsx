import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import { HeroSection } from 'components/hero-section';
import Footer from 'components/layout/footer';
import PromoBanner from 'components/promo-banner';
import { getMenu } from 'lib/shopify';

export const metadata = {
  description:
    'KITALLY - Your canvas for limitless self-expression. Shop premium fashion essentials with 30-day free returns.',
  openGraph: {
    type: 'website',
    title: 'KITALLY - Premium Fashion Essentials',
    description: 'Your canvas for limitless self-expression'
  }
};

export default async function HomePage() {
  const menu = await getMenu('next-js-frontend-header-menu');
  const saleLink = menu[3]?.path || '/search';

  return (
    <>
      {/* Promo Banner */}
      <PromoBanner
        buttonText="Shop Now"
        buttonLink={saleLink}
      />

      {/* Main Hero */}
      <HeroSection
        image="/images/hero/hero-1-desktop.webp"
        mobileImage="/images/hero/hero-1-mobile.webp"
        title="New Season Essentials"
        subtitle="Your canvas for limitless self-expression"
        cta={{
          text: 'Shop Now',
          href: '/search'
        }}
        textPosition="center"
        textColor="white"
      />

      {/* Featured Products Grid */}
      <section className="mx-auto max-w-screen-2xl px-4 py-12 md:py-16">
        <h2 className="mb-8 text-center text-3xl font-bold uppercase tracking-wider">
          Featured
        </h2>
        <ThreeItemGrid />
      </section>

      {/* Secondary Hero */}
      <HeroSection
        image="/images/hero/hero-2-desktop.webp"
        mobileImage="/images/hero/hero-2-mobile.webp"
        title="Explore the Collection"
        subtitle="Timeless pieces for every moment"
        cta={{
          text: 'Discover More',
          href: '/search'
        }}
        textPosition="center"
        textColor="white"
      />

      {/* Product Carousel */}
      <section className="mx-auto max-w-screen-2xl px-4 py-12 md:py-16">
        <h2 className="mb-8 text-center text-3xl font-bold uppercase tracking-wider">
          Latest Arrivals
        </h2>
        <Carousel />
      </section>

      <Footer />
    </>
  );
}
