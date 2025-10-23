import Footer from 'components/layout/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | KITTALY',
  description: 'Join the KITTALY team. Explore career opportunities and be part of building the future of sustainable fashion.',
};

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior Fashion Designer',
      department: 'Design',
      location: 'London, UK',
      type: 'Full-time'
    },
    {
      title: 'E-commerce Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      title: 'Sustainability Coordinator',
      department: 'Operations',
      location: 'London, UK',
      type: 'Full-time'
    },
    {
      title: 'Customer Experience Specialist',
      department: 'Customer Service',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      title: 'Full Stack Developer',
      department: 'Technology',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      title: 'Social Media Manager',
      department: 'Marketing',
      location: 'London, UK / Remote',
      type: 'Full-time'
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="border-b border-neutral-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h1 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-4xl">
              Careers at KITTALY
            </h1>
            <p className="mt-3 text-base text-neutral-600">
              Join our team and help shape the future of sustainable fashion.
            </p>
          </div>
        </section>

        {/* Why KITTALY */}
        <section className="border-b border-neutral-200 py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
                Why Work at KITTALY?
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                At KITTALY, we're building more than just a fashion brand - we're creating a community 
                of passionate individuals committed to making a positive impact on the industry and the 
                planet. Join us and be part of something meaningful.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-b border-neutral-200 bg-neutral-50 py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h2 className="mb-12 text-center text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
              Benefits & Perks
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="border border-neutral-200 bg-white p-6">
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Competitive Salary
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  We offer competitive compensation packages with performance-based bonuses and regular 
                  salary reviews.
                </p>
              </div>

              <div className="border border-neutral-200 bg-white p-6">
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Health & Wellness
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  Comprehensive health insurance, mental health support, and gym membership subsidy 
                  for all team members.
                </p>
              </div>

              <div className="border border-neutral-200 bg-white p-6">
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Flexible Working
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  Hybrid work model with flexible hours. Work from home, the office, or a mix of both 
                  - whatever suits you best.
                </p>
              </div>

              <div className="border border-neutral-200 bg-white p-6">
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Learning & Development
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  Annual learning budget, access to courses, conferences, and mentorship programs to 
                  help you grow professionally.
                </p>
              </div>

              <div className="border border-neutral-200 bg-white p-6">
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Generous Time Off
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  25 days annual leave plus bank holidays, with additional days for long service. 
                  Plus your birthday off!
                </p>
              </div>

              <div className="border border-neutral-200 bg-white p-6">
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Product Discount
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  50% discount on all KITTALY products, plus exclusive access to new collections 
                  before they launch.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="border-b border-neutral-200 py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h2 className="mb-12 text-center text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
              Open Positions
            </h2>

            <div className="mx-auto max-w-4xl space-y-4">
              {openPositions.map((position, index) => (
                <div key={index} className="border border-neutral-200 p-6 transition-all hover:border-black">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                        {position.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-neutral-600">
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {position.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`mailto:careers@kittaly.com?subject=Application for ${position.title}`}
                      className="inline-block border border-black bg-white px-6 py-2 text-center text-sm font-medium uppercase tracking-wider text-black transition-colors duration-200 hover:bg-black hover:text-white"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Culture */}
        <section className="border-b border-neutral-200 bg-neutral-50 py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
                Our Culture
              </h2>
              <div className="mt-6 space-y-4 text-base text-neutral-600">
                <p>
                  We're a diverse team of creatives, strategists, technologists, and sustainability 
                  advocates united by a common goal: to create fashion that's as good for the planet 
                  as it looks on you.
                </p>
                <p>
                  We value collaboration, innovation, and authenticity. We celebrate different 
                  perspectives and believe that our differences make us stronger. Whether you're 
                  early in your career or an experienced professional, you'll find a supportive 
                  environment where your ideas matter.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="border-l-2 border-black pl-4">
                  <h3 className="font-bold uppercase tracking-wider text-[#1D2022]">Collaborative</h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    We work together, share knowledge, and support each other's growth.
                  </p>
                </div>
                <div className="border-l-2 border-black pl-4">
                  <h3 className="font-bold uppercase tracking-wider text-[#1D2022]">Innovative</h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    We encourage experimentation and aren't afraid to challenge the status quo.
                  </p>
                </div>
                <div className="border-l-2 border-black pl-4">
                  <h3 className="font-bold uppercase tracking-wider text-[#1D2022]">Inclusive</h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    We celebrate diversity and create space for everyone to be themselves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Didn't Find Your Role */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
                Don't See Your Role?
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                We're always looking for talented people to join our team. Send us your CV and tell 
                us how you'd like to contribute to KITTALY.
              </p>
              <div className="mt-8">
                <a
                  href="mailto:careers@kittaly.com?subject=General Application"
                  className="inline-block border-2 border-black bg-black px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-black"
                >
                  Send General Application
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
