import FAQAccordion from './faq-accordion';

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="border-b border-neutral-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h1 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-base text-neutral-600">
              Find answers to commonly asked questions about orders, shipping, returns, and more.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <FAQAccordion />
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="border-t border-neutral-200 bg-neutral-50 py-12 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
                Still Have Questions?
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Can't find what you're looking for? Our customer service team is here to help.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a
                  href="/help/customer-service"
                  className="border-2 border-black bg-black px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-black"
                >
                  Contact Us
                </a>
                <a
                  href="/help/track-order"
                  className="border-2 border-black bg-white px-8 py-3 text-sm font-medium uppercase tracking-wider text-black transition-colors duration-200 hover:bg-black hover:text-white"
                >
                  Track Order
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
