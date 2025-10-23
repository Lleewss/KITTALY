import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sustainability | KITTALY',
  description: 'Discover KITTALY\'s commitment to sustainable fashion, ethical production, and environmental responsibility.',
};

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="border-b border-neutral-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h1 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-4xl">
              Sustainability
            </h1>
            <p className="mt-3 text-base text-neutral-600">
              Building a better future for fashion, one conscious choice at a time.
            </p>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="border-b border-neutral-200 py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
                Our Commitment
              </h2>
              <div className="mt-6 space-y-4 text-base text-neutral-600">
                <p>
                  At KITTALY, sustainability isn't a marketing term - it's a fundamental part of how we 
                  operate. We recognize that the fashion industry has a significant environmental impact, 
                  and we're committed to being part of the solution.
                </p>
                <p>
                  From the materials we source to the factories we partner with, every decision is made 
                  with consideration for our planet and the people who inhabit it. We're not perfect, 
                  but we're transparent about our progress and continuously working to do better.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Initiatives */}
        <section className="border-b border-neutral-200 bg-neutral-50 py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h2 className="mb-12 text-center text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
              Our Initiatives
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Sustainable Materials */}
              <div className="border border-neutral-200 bg-white p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center border border-black">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Sustainable Materials
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  80% of our collection is made from organic, recycled, or sustainably sourced materials. 
                  We prioritize organic cotton, recycled polyester, and innovative eco-friendly fabrics.
                </p>
              </div>

              {/* Ethical Production */}
              <div className="border border-neutral-200 bg-white p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center border border-black">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Ethical Production
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  All our manufacturing partners are audited for fair labor practices. We ensure safe 
                  working conditions, fair wages, and no child labor in our supply chain.
                </p>
              </div>

              {/* Carbon Neutral Shipping */}
              <div className="border border-neutral-200 bg-white p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center border border-black">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Carbon Neutral Shipping
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  We offset 100% of our shipping emissions through verified carbon offset programs and 
                  use eco-friendly packaging made from recycled materials.
                </p>
              </div>

              {/* Water Conservation */}
              <div className="border border-neutral-200 bg-white p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center border border-black">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Water Conservation
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  Our denim production uses 90% less water than conventional methods. We employ water 
                  recycling systems and waterless finishing techniques.
                </p>
              </div>

              {/* Circular Fashion */}
              <div className="border border-neutral-200 bg-white p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center border border-black">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Circular Fashion
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  Our take-back program allows customers to return worn items for recycling. We also 
                  offer repair services to extend the life of your KITTALY pieces.
                </p>
              </div>

              {/* Transparency */}
              <div className="border border-neutral-200 bg-white p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center border border-black">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Full Transparency
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  We publish annual sustainability reports detailing our environmental impact, supply 
                  chain practices, and progress towards our sustainability goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Goals */}
        <section className="border-b border-neutral-200 py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h2 className="mb-12 text-center text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
              2030 Goals
            </h2>

            <div className="mx-auto max-w-3xl space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center bg-black text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-[#1D2022]">
                    100% Sustainable Materials
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    All products made from organic, recycled, or certified sustainable materials
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center bg-black text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-[#1D2022]">
                    Net Zero Emissions
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    Achieve carbon neutrality across our entire supply chain and operations
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center bg-black text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-[#1D2022]">
                    Zero Waste Packaging
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    All packaging fully recyclable, compostable, or reusable
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center bg-black text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-[#1D2022]">
                    Living Wages
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    Ensure all workers in our supply chain receive living wages
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
                Join Us in Making a Difference
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Every purchase supports our sustainability initiatives. Together, we can create a 
                more responsible fashion industry.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a
                  href="/search"
                  className="border-2 border-black bg-black px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-black"
                >
                  Shop Sustainable
                </a>
                <a
                  href="/help/customer-service"
                  className="border-2 border-black bg-white px-8 py-3 text-sm font-medium uppercase tracking-wider text-black transition-colors duration-200 hover:bg-black hover:text-white"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
