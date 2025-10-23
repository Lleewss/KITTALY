import ContactForm from './contact-form';

export default function CustomerServicePage() {
  return (
    <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="border-b border-neutral-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h1 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-4xl">
              Customer Service
            </h1>
            <p className="mt-3 text-base text-neutral-600">
              We're here to help. Get in touch with our team.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-screen-xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
                Other Ways to Reach Us
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="border border-neutral-200 p-6">
                  <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
                    Email
                  </h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    For general inquiries and support
                  </p>
                  <a
                    href="mailto:support@kittaly.com"
                    className="text-sm font-medium text-black underline"
                  >
                    support@kittaly.com
                  </a>
                  <p className="mt-3 text-xs text-neutral-500">
                    We typically respond within 24 hours
                  </p>
                </div>

                {/* Phone */}
                <div className="border border-neutral-200 p-6">
                  <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
                    Phone
                  </h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    Speak to our customer service team
                  </p>
                  <a
                    href="tel:+441234567890"
                    className="text-sm font-medium text-black underline"
                  >
                    +44 (0) 123 456 7890
                  </a>
                  <p className="mt-3 text-xs text-neutral-500">
                    Monday - Friday: 9am - 6pm GMT<br />
                    Saturday: 10am - 4pm GMT<br />
                    Sunday: Closed
                  </p>
                </div>

                {/* Live Chat */}
                <div className="border border-neutral-200 p-6">
                  <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
                    Live Chat
                  </h3>
                  <p className="text-sm text-neutral-600 mb-3">
                    Chat with us for instant help
                  </p>
                  <button
                    className="inline-block border border-black bg-white px-6 py-2 text-xs font-medium uppercase tracking-wider text-black transition-colors duration-200 hover:bg-black hover:text-white"
                  >
                    Start Chat
                  </button>
                  <p className="mt-3 text-xs text-neutral-500">
                    Available during business hours
                  </p>
                </div>

                {/* Social Media */}
                <div className="border border-neutral-200 p-6">
                  <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-black">
                    Social Media
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Follow us for updates and styling inspiration
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com/kittaly"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-neutral-600"
                    >
                      <span className="text-sm">Instagram</span>
                    </a>
                    <a
                      href="https://facebook.com/kittaly"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-neutral-600"
                    >
                      <span className="text-sm">Facebook</span>
                    </a>
                    <a
                      href="https://twitter.com/kittaly"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-neutral-600"
                    >
                      <span className="text-sm">Twitter</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-8 border-t border-neutral-200 pt-8">
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-black">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/help/faqs" className="text-sm text-neutral-600 hover:text-black">
                      → Frequently Asked Questions
                    </a>
                  </li>
                  <li>
                    <a href="/help/track-order" className="text-sm text-neutral-600 hover:text-black">
                      → Track Your Order
                    </a>
                  </li>
                  <li>
                    <a href="/help/delivery" className="text-sm text-neutral-600 hover:text-black">
                      → Delivery Information
                    </a>
                  </li>
                  <li>
                    <a href="/help/size-guide" className="text-sm text-neutral-600 hover:text-black">
                      → Size Guide
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
