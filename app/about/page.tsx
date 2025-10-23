import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | KITTALY',
  description: 'Learn about KITTALY - our story, mission, and commitment to creating premium fashion essentials for self-expression.',
};

export default function AboutPage() {
  return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] bg-neutral-900">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
          <div className="relative flex h-full items-center justify-center text-center">
            <div className="px-4">
              <h1 className="text-4xl font-bold uppercase tracking-wider text-white md:text-5xl lg:text-6xl">
                About KITTALY
              </h1>
              <p className="mt-4 text-lg text-white/90 md:text-xl">
                Your Canvas for Limitless Self-Expression
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="border-b border-neutral-200 py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-4xl">
                  Our Story
                </h2>
                <div className="mt-6 space-y-4 text-base text-neutral-600">
                  <p>
                    Founded with a vision to redefine modern fashion, KITTALY emerged from a simple belief: 
                    clothing should be an extension of who you are, not a constraint on who you can become.
                  </p>
                  <p>
                    What started as a small collection of premium basics has evolved into a comprehensive 
                    lifestyle brand, trusted by individuals who refuse to compromise on quality, style, or values. 
                    We've grown by staying true to our core principles: exceptional craftsmanship, sustainable 
                    practices, and timeless design.
                  </p>
                  <p>
                    Today, KITTALY stands at the intersection of luxury and accessibility, offering pieces that 
                    elevate everyday moments while remaining conscious of our impact on the planet and the people 
                    who bring our vision to life.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="aspect-[4/3] w-full bg-neutral-100" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="border-b border-neutral-200 bg-neutral-50 py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-4xl">
                Our Mission
              </h2>
              <p className="mt-6 text-lg text-neutral-600">
                To create premium fashion essentials that empower individuals to express themselves 
                authentically, while building a more sustainable and equitable future for the fashion industry.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="border border-neutral-200 bg-white p-8">
                <h3 className="text-xl font-bold uppercase tracking-wider text-[#1D2022]">
                  Quality First
                </h3>
                <p className="mt-4 text-sm text-neutral-600">
                  We source the finest materials and partner with skilled artisans to create pieces 
                  that stand the test of time, both in durability and style.
                </p>
              </div>

              <div className="border border-neutral-200 bg-white p-8">
                <h3 className="text-xl font-bold uppercase tracking-wider text-[#1D2022]">
                  Sustainable Practice
                </h3>
                <p className="mt-4 text-sm text-neutral-600">
                  From ethical production to eco-friendly packaging, every decision we make considers 
                  its environmental and social impact.
                </p>
              </div>

              <div className="border border-neutral-200 bg-white p-8">
                <h3 className="text-xl font-bold uppercase tracking-wider text-[#1D2022]">
                  Timeless Design
                </h3>
                <p className="mt-4 text-sm text-neutral-600">
                  We create pieces that transcend seasonal trends, offering versatile designs that 
                  remain relevant year after year.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="border-b border-neutral-200 py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h2 className="text-center text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-4xl">
              Our Values
            </h2>

            <div className="mt-12 space-y-8">
              <div className="border-l-2 border-black pl-6">
                <h3 className="text-xl font-bold uppercase tracking-wider text-[#1D2022]">
                  Authenticity
                </h3>
                <p className="mt-2 text-base text-neutral-600">
                  We believe in being genuine in everything we do - from how we communicate with our 
                  community to the materials we choose for our products.
                </p>
              </div>

              <div className="border-l-2 border-black pl-6">
                <h3 className="text-xl font-bold uppercase tracking-wider text-[#1D2022]">
                  Innovation
                </h3>
                <p className="mt-2 text-base text-neutral-600">
                  While we respect tradition, we're constantly exploring new technologies, materials, 
                  and processes that can improve our products and reduce our environmental footprint.
                </p>
              </div>

              <div className="border-l-2 border-black pl-6">
                <h3 className="text-xl font-bold uppercase tracking-wider text-[#1D2022]">
                  Community
                </h3>
                <p className="mt-2 text-base text-neutral-600">
                  KITTALY is more than a brand - it's a community of like-minded individuals who value 
                  quality, sustainability, and self-expression.
                </p>
              </div>

              <div className="border-l-2 border-black pl-6">
                <h3 className="text-xl font-bold uppercase tracking-wider text-[#1D2022]">
                  Transparency
                </h3>
                <p className="mt-2 text-base text-neutral-600">
                  We're open about our supply chain, production processes, and the challenges we face 
                  in building a more sustainable fashion brand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-4xl">
                Join Our Journey
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                Whether you're here for a single piece or building your entire wardrobe, we're honored 
                to be part of your style journey. Thank you for choosing KITTALY.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a
                  href="/search"
                  className="border-2 border-black bg-black px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-black"
                >
                  Shop Collection
                </a>
                <a
                  href="/sustainability"
                  className="border-2 border-black bg-white px-8 py-3 text-sm font-medium uppercase tracking-wider text-black transition-colors duration-200 hover:bg-black hover:text-white"
                >
                  Our Sustainability
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
