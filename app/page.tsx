import { Carousel } from 'components/carousel';
import { CustomerGallery } from 'components/customer-gallery';
import { DualHeroSection } from 'components/dual-hero-section';
import { ThreeItemGrid } from 'components/grid/three-items';
import { HeroSection } from 'components/hero-section';
import Footer from 'components/layout/footer';
import PromoBanner from 'components/promo-banner';
import { getMenu } from 'lib/shopify';

export const metadata = {
  description:
    'KITTALY - Your canvas for limitless self-expression. Shop premium fashion essentials with 30-day free returns.',
  openGraph: {
    type: 'website',
    title: 'KITTALY - Premium Fashion Essentials',
    description: 'Your canvas for limitless self-expression'
  }
};

export default async function HomePage() {
  const menu = await getMenu('next-js-frontend-header-menu');
  const saleLink = menu[3]?.path || '/search';
  const firstMenuLink = menu[0]?.path || '/search';
  const secondMenuLink = menu[1]?.path || '/search';
  const thirdMenuLink = menu[2]?.path || '/search';

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
          href: firstMenuLink
        }}
        textPosition="left"
        textColor="white"
      />

      {/* Dual Hero Section */}
      <DualHeroSection
        left={{
          image: '/images/hero/hero-2-desktop.webp',
          mobileImage: '/images/hero/hero-2-mobile.webp',
          title: 'Women',
          subtitle: 'Explore the latest collection',
          ctaText: 'Shop Now',
          ctaHref: secondMenuLink,
          textColor: 'white'
        }}
        right={{
          image: '/images/hero/hero-1-desktop.webp',
          mobileImage: '/images/hero/hero-1-mobile.webp',
          title: 'Men',
          subtitle: 'Discover timeless pieces',
          ctaText: 'Shop Now',
          ctaHref: thirdMenuLink,
          textColor: 'white'
        }}
      />

      {/* Featured Products Grid */}
      <section className="mx-auto max-w-screen-2xl px-4 py-12 md:py-16">
        <h2 className="mb-8 text-center text-3xl font-bold uppercase tracking-wider">
          Featured
        </h2>
        <ThreeItemGrid />
      </section>

      {/* Customer Gallery */}
      <CustomerGallery reviews={[
        {
          id: '1',
          image: '/images/hero/hero-1-desktop.webp',
          customerName: 'Sarah M.',
          rating: 5,
          quote: 'Absolutely love the quality and fit!',
          productName: 'Classic Denim Jacket'
        },
        {
          id: '2',
          image: '/images/hero/hero-2-desktop.webp',
          customerName: 'Jessica L.',
          rating: 5,
          quote: 'Perfect for everyday wear.',
          productName: 'Essential White Tee'
        },
        {
          id: '3',
          image: '/images/hero/hero-1-desktop.webp',
          customerName: 'Emily R.',
          rating: 5,
          quote: 'The fabric is so soft and comfortable!',
          productName: 'Oversized Hoodie'
        },
        {
          id: '4',
          image: '/images/hero/hero-2-desktop.webp',
          customerName: 'Michael T.',
          rating: 5,
          quote: 'Great quality, exactly as described.',
          productName: 'Slim Fit Chinos'
        },
        {
          id: '5',
          image: '/images/hero/hero-1-desktop.webp',
          customerName: 'David K.',
          rating: 5,
          quote: 'Best purchase I\'ve made this year!',
          productName: 'Leather Bomber Jacket'
        },
        {
          id: '6',
          image: '/images/hero/hero-2-desktop.webp',
          customerName: 'Amanda S.',
          rating: 5,
          quote: 'So many compliments on this piece!',
          productName: 'Midi Skirt'
        },
        {
          id: '7',
          image: '/images/hero/hero-1-desktop.webp',
          customerName: 'James P.',
          rating: 5,
          quote: 'Fits perfectly and looks amazing!',
          productName: 'Classic Trench Coat'
        },
        {
          id: '8',
          image: '/images/hero/hero-2-desktop.webp',
          customerName: 'Sophie T.',
          rating: 5,
          quote: 'Exceeded all my expectations!',
          productName: 'Cashmere Sweater'
        }
      ]} />

      {/* Product Carousel */}
      <section className="mx-auto max-w-screen-2xl px-4 py-12 md:py-16">
        <h2 className="mb-8 text-center text-3xl font-bold uppercase tracking-wider">
          Latest Arrivals
        </h2>
        <Carousel />
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
        textPosition="left"
        textColor="white"
      />

      <Footer />
    </>
  );
}
