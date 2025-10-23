import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press | FLOELI',
  description: 'FLOELI press resources, media inquiries, and brand information for journalists and content creators.',
};

export default function PressPage() {
  const pressReleases = [
    {
      date: 'March 15, 2024',
      title: 'FLOELI Announces Partnership with Global Recycling Initiative',
      excerpt: 'New collaboration aims to recycle 1 million garments by 2025, setting industry standard for circular fashion.'
    },
    {
      date: 'February 1, 2024',
      title: 'Spring/Summer 2024 Collection Launches with Sustainable Innovation',
      excerpt: 'New collection features breakthrough materials made from ocean plastic and organic fibers.'
    },
    {
      date: 'January 10, 2024',
      title: 'FLOELI Achieves B-Corp Certification',
      excerpt: 'Milestone reflects commitment to transparency, ethics, and environmental responsibility.'
    },
    {
      date: 'December 5, 2023',
      title: 'Year in Review: 50% Reduction in Carbon Emissions',
      excerpt: 'Annual sustainability report reveals significant progress toward 2030 climate goals.'
    }
  ];

  const mediaKit = [
    { name: 'Brand Guidelines (PDF)', size: '2.4 MB' },
    { name: 'Logo Pack (ZIP)', size: '5.1 MB' },
    { name: 'Product Images (High-Res)', size: '45 MB' },
    { name: 'Founder Photos', size: '8.2 MB' },
    { name: 'Company Fact Sheet', size: '156 KB' }
  ];

  return (
    <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="border-b border-neutral-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h1 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-4xl">
              Press & Media
            </h1>
            <p className="mt-3 text-base text-neutral-600">
              Resources and information for journalists, bloggers, and content creators.
            </p>
          </div>
        </section>

        {/* Media Inquiries */}
        <section className="border-b border-neutral-200 py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
                  Media Inquiries
                </h2>
                <div className="mt-6 space-y-4 text-base text-neutral-600">
                  <p>
                    For all press and media inquiries, including interview requests, product samples, 
                    and brand information, please contact our press team.
                  </p>
                  <p>
                    We typically respond to media requests within 24-48 hours. For urgent matters, 
                    please indicate this in your subject line.
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="border border-neutral-200 p-6">
                    <h3 className="text-sm font-medium uppercase tracking-wider text-black">
                      Press Contact
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">Sarah Mitchell</p>
                    <p className="text-sm text-neutral-600">Head of Communications</p>
                    <a
                      href="mailto:press@floeli.com"
                      className="mt-3 inline-block text-sm font-medium text-black underline"
                    >
                      press@floeli.com
                    </a>
                    <p className="mt-1 text-sm text-neutral-600">
                      +44 (0) 123 456 7891
                    </p>
                  </div>

                  <div className="border border-neutral-200 p-6">
                    <h3 className="text-sm font-medium uppercase tracking-wider text-black">
                      Influencer Partnerships
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">Alex Chen</p>
                    <p className="text-sm text-neutral-600">Partnerships Manager</p>
                    <a
                      href="mailto:partnerships@floeli.com"
                      className="mt-3 inline-block text-sm font-medium text-black underline"
                    >
                      partnerships@floeli.com
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
                  Media Kit
                </h2>
                <p className="mt-6 text-base text-neutral-600">
                  Download our brand assets, product images, and company information for use in your 
                  editorial content.
                </p>

                <div className="mt-8 space-y-3">
                  {mediaKit.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border border-neutral-200 p-4">
                      <div className="flex items-center gap-3">
                        <svg className="h-5 w-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-black">{item.name}</p>
                          <p className="text-xs text-neutral-500">{item.size}</p>
                        </div>
                      </div>
                      <button className="border border-black bg-white px-4 py-1 text-xs font-medium uppercase tracking-wider text-black transition-colors hover:bg-black hover:text-white">
                        Download
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border border-neutral-200 bg-neutral-50 p-6">
                  <p className="text-sm text-neutral-600">
                    <strong>Usage Guidelines:</strong> All brand assets are for editorial use only. 
                    For commercial usage rights, please contact our press team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Press Releases */}
        <section className="border-b border-neutral-200 bg-neutral-50 py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h2 className="mb-12 text-center text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
              Recent Press Releases
            </h2>

            <div className="mx-auto max-w-4xl space-y-6">
              {pressReleases.map((release, index) => (
                <div key={index} className="border border-neutral-200 bg-white p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                    {release.date}
                  </p>
                  <h3 className="mt-2 text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                    {release.title}
                  </h3>
                  <p className="mt-3 text-sm text-neutral-600">
                    {release.excerpt}
                  </p>
                  <a
                    href={`mailto:press@floeli.com?subject=Request: ${release.title}`}
                    className="mt-4 inline-block text-sm font-medium text-black underline"
                  >
                    Request Full Release →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About FLOELI */}
        <section className="border-b border-neutral-200 py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
                About FLOELI
              </h2>
              <div className="mt-6 space-y-4 text-base text-neutral-600">
                <p>
                  FLOELI is a premium fashion brand committed to creating exceptional clothing while 
                  building a more sustainable and equitable fashion industry. Founded on the principle 
                  that style and sustainability are not mutually exclusive, FLOELI offers timeless 
                  designs crafted from organic and recycled materials.
                </p>
                <p>
                  With a focus on quality, transparency, and innovation, FLOELI has established itself 
                  as a leader in conscious fashion. The brand's commitment to ethical production, 
                  carbon-neutral operations, and circular fashion practices has earned recognition from 
                  industry leaders and environmental organizations.
                </p>
                <p>
                  FLOELI's collections are available online at floeli.com and at select retail 
                  partners worldwide.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="mt-8 border-t border-neutral-200 pt-8">
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-black">
                  Quick Facts
                </h3>
                <dl className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <dt className="font-medium text-black">Founded:</dt>
                    <dd className="text-neutral-600">2020</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-black">Headquarters:</dt>
                    <dd className="text-neutral-600">London, United Kingdom</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-black">Founder & CEO:</dt>
                    <dd className="text-neutral-600">Emma Thompson</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-black">Industry:</dt>
                    <dd className="text-neutral-600">Sustainable Fashion</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-black">Website:</dt>
                    <dd className="text-neutral-600">floeli.com</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-black">Certifications:</dt>
                    <dd className="text-neutral-600">B-Corp, GOTS, Fair Trade</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Featured In */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h2 className="mb-12 text-center text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
              As Featured In
            </h2>

            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {['Vogue', 'GQ', 'Elle', 'The Guardian', 'WWD', 'Forbes', 'Refinery29', 'The Times'].map((publication) => (
                  <div key={publication} className="flex items-center justify-center border border-neutral-200 p-6">
                    <span className="text-lg font-bold uppercase tracking-wider text-neutral-400">
                      {publication}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-neutral-600">
                For press clippings and full coverage, please contact our press team.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 bg-neutral-50 py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
                Let's Collaborate
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Interested in featuring FLOELI in your publication or partnering with us? 
                We'd love to hear from you.
              </p>
              <div className="mt-8">
                <a
                  href="mailto:press@floeli.com"
                  className="inline-block border-2 border-black bg-black px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-black"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
