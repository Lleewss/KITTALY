import type { Metadata } from 'next';
import Image from 'next/image';

import Footer from 'components/layout/footer';

export const metadata: Metadata = {
  title: 'Size Guide - KITTALY',
  description: 'Find your perfect fit with our comprehensive size guide. Detailed measurements for all KITTALY products.',
};

export default function SizeGuidePage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="border-b border-neutral-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h1 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-4xl">
              Size Guide
            </h1>
            <p className="mt-3 text-base text-neutral-600">
              Find your perfect fit with our detailed measurements
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-screen-xl px-4 py-12 md:px-6 md:py-16">
          {/* How to Measure */}
          <section className="mb-12 border-b border-neutral-200 pb-12">
            <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
              How to Measure
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">Chest</h3>
                <p className="text-sm text-neutral-600">
                  Measure around the fullest part of your chest, keeping the tape horizontal.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">Waist</h3>
                <p className="text-sm text-neutral-600">
                  Measure around your natural waistline, keeping the tape comfortably loose.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">Hips</h3>
                <p className="text-sm text-neutral-600">
                  Measure around the fullest part of your hips, approximately 8 inches below your waist.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">Inseam</h3>
                <p className="text-sm text-neutral-600">
                  Measure from the top of your inner thigh to the bottom of your ankle.
                </p>
              </div>
            </div>
          </section>

          {/* Women's Sizing */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
              Women's Sizing
            </h2>
            
            <div className="mb-8 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">Size</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">UK</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">US</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">EU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">Chest (cm)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">Waist (cm)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">Hips (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">XS</td>
                    <td className="px-4 py-3 text-sm">6</td>
                    <td className="px-4 py-3 text-sm">2</td>
                    <td className="px-4 py-3 text-sm">34</td>
                    <td className="px-4 py-3 text-sm">78-82</td>
                    <td className="px-4 py-3 text-sm">60-64</td>
                    <td className="px-4 py-3 text-sm">86-90</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">S</td>
                    <td className="px-4 py-3 text-sm">8</td>
                    <td className="px-4 py-3 text-sm">4</td>
                    <td className="px-4 py-3 text-sm">36</td>
                    <td className="px-4 py-3 text-sm">82-86</td>
                    <td className="px-4 py-3 text-sm">64-68</td>
                    <td className="px-4 py-3 text-sm">90-94</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">M</td>
                    <td className="px-4 py-3 text-sm">10</td>
                    <td className="px-4 py-3 text-sm">6</td>
                    <td className="px-4 py-3 text-sm">38</td>
                    <td className="px-4 py-3 text-sm">86-90</td>
                    <td className="px-4 py-3 text-sm">68-72</td>
                    <td className="px-4 py-3 text-sm">94-98</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">L</td>
                    <td className="px-4 py-3 text-sm">12</td>
                    <td className="px-4 py-3 text-sm">8</td>
                    <td className="px-4 py-3 text-sm">40</td>
                    <td className="px-4 py-3 text-sm">90-94</td>
                    <td className="px-4 py-3 text-sm">72-76</td>
                    <td className="px-4 py-3 text-sm">98-102</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">XL</td>
                    <td className="px-4 py-3 text-sm">14</td>
                    <td className="px-4 py-3 text-sm">10</td>
                    <td className="px-4 py-3 text-sm">42</td>
                    <td className="px-4 py-3 text-sm">94-98</td>
                    <td className="px-4 py-3 text-sm">76-80</td>
                    <td className="px-4 py-3 text-sm">102-106</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Men's Sizing */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
              Men's Sizing
            </h2>
            
            <div className="mb-8 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">Size</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">UK</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">US</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">EU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">Chest (cm)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">Waist (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">XS</td>
                    <td className="px-4 py-3 text-sm">34</td>
                    <td className="px-4 py-3 text-sm">34</td>
                    <td className="px-4 py-3 text-sm">44</td>
                    <td className="px-4 py-3 text-sm">86-89</td>
                    <td className="px-4 py-3 text-sm">71-76</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">S</td>
                    <td className="px-4 py-3 text-sm">36</td>
                    <td className="px-4 py-3 text-sm">36</td>
                    <td className="px-4 py-3 text-sm">46</td>
                    <td className="px-4 py-3 text-sm">89-94</td>
                    <td className="px-4 py-3 text-sm">76-81</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">M</td>
                    <td className="px-4 py-3 text-sm">38</td>
                    <td className="px-4 py-3 text-sm">38</td>
                    <td className="px-4 py-3 text-sm">48</td>
                    <td className="px-4 py-3 text-sm">94-99</td>
                    <td className="px-4 py-3 text-sm">81-86</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">L</td>
                    <td className="px-4 py-3 text-sm">40</td>
                    <td className="px-4 py-3 text-sm">40</td>
                    <td className="px-4 py-3 text-sm">50</td>
                    <td className="px-4 py-3 text-sm">99-104</td>
                    <td className="px-4 py-3 text-sm">86-91</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">XL</td>
                    <td className="px-4 py-3 text-sm">42</td>
                    <td className="px-4 py-3 text-sm">42</td>
                    <td className="px-4 py-3 text-sm">52</td>
                    <td className="px-4 py-3 text-sm">104-109</td>
                    <td className="px-4 py-3 text-sm">91-97</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">XXL</td>
                    <td className="px-4 py-3 text-sm">44</td>
                    <td className="px-4 py-3 text-sm">44</td>
                    <td className="px-4 py-3 text-sm">54</td>
                    <td className="px-4 py-3 text-sm">109-114</td>
                    <td className="px-4 py-3 text-sm">97-102</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Fit Guide */}
          <section className="mb-12 border-t border-neutral-200 pt-12">
            <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
              Fit Guide
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="border border-neutral-200 p-6">
                <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-black">Slim Fit</h3>
                <p className="text-sm text-neutral-600">
                  A closer, more tailored fit that follows the contours of your body. Ideal for a sleek, modern silhouette.
                </p>
              </div>
              <div className="border border-neutral-200 p-6">
                <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-black">Regular Fit</h3>
                <p className="text-sm text-neutral-600">
                  Our standard fit with a comfortable, classic cut. Not too tight, not too loose—just right for everyday wear.
                </p>
              </div>
              <div className="border border-neutral-200 p-6">
                <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-black">Oversized Fit</h3>
                <p className="text-sm text-neutral-600">
                  A relaxed, roomy fit for a contemporary, laid-back look. Size down if you prefer a less oversized style.
                </p>
              </div>
            </div>
          </section>

          {/* Need Help */}
          <section className="rounded border border-neutral-200 bg-neutral-50 p-8 text-center">
            <h2 className="mb-3 text-xl font-bold uppercase tracking-wider text-[#1D2022]">
              Need Help Finding Your Size?
            </h2>
            <p className="mb-6 text-sm text-neutral-600">
              Our customer service team is here to help you find the perfect fit.
            </p>
            <a
              href="/help/customer-service"
              className="inline-block border-2 border-black bg-black px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-black"
            >
              Contact Us
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
