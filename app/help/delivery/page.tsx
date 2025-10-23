import type { Metadata } from 'next';
import Footer from 'components/layout/footer';

export const metadata: Metadata = {
  title: 'Delivery Information - KITTALY',
  description: 'Learn about our delivery options, shipping times, and international delivery services.',
};

export default function DeliveryPage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="border-b border-neutral-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h1 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-4xl">
              Delivery Information
            </h1>
            <p className="mt-3 text-base text-neutral-600">
              Everything you need to know about our delivery services
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-screen-xl px-4 py-12 md:px-6 md:py-16">
          {/* Delivery Options */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
              Delivery Options
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border border-neutral-200 p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-black">
                    Standard Delivery
                  </h3>
                  <span className="text-sm font-medium text-black">FREE</span>
                </div>
                <p className="mb-4 text-sm text-neutral-600">
                  Free on all orders over £50
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• Delivery within 3-5 business days</li>
                  <li>• Track your order online</li>
                  <li>• Sign for delivery required</li>
                </ul>
              </div>

              <div className="border border-neutral-200 p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-black">
                    Express Delivery
                  </h3>
                  <span className="text-sm font-medium text-black">£5.95</span>
                </div>
                <p className="mb-4 text-sm text-neutral-600">
                  For when you need it faster
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• Delivery within 1-2 business days</li>
                  <li>• Track your order online</li>
                  <li>• Sign for delivery required</li>
                </ul>
              </div>

              <div className="border border-neutral-200 p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-black">
                    Next Day Delivery
                  </h3>
                  <span className="text-sm font-medium text-black">£9.95</span>
                </div>
                <p className="mb-4 text-sm text-neutral-600">
                  Order before 10pm for next day
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• Next working day delivery</li>
                  <li>• Track your order online</li>
                  <li>• Sign for delivery required</li>
                </ul>
              </div>

              <div className="border border-neutral-200 p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-black">
                    Click & Collect
                  </h3>
                  <span className="text-sm font-medium text-black">FREE</span>
                </div>
                <p className="mb-4 text-sm text-neutral-600">
                  Collect from selected stores
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• Ready for collection in 2-3 days</li>
                  <li>• Email notification when ready</li>
                  <li>• Hold for up to 7 days</li>
                </ul>
              </div>
            </div>
          </section>

          {/* International Delivery */}
          <section className="mb-12 border-t border-neutral-200 pt-12">
            <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
              International Delivery
            </h2>
            <p className="mb-6 text-sm text-neutral-600">
              We ship worldwide. Delivery times and costs vary by destination.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">Region</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">Delivery Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">UK</td>
                    <td className="px-4 py-3 text-sm">3-5 business days</td>
                    <td className="px-4 py-3 text-sm">FREE over £50</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">Europe</td>
                    <td className="px-4 py-3 text-sm">5-7 business days</td>
                    <td className="px-4 py-3 text-sm">£9.95</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">USA & Canada</td>
                    <td className="px-4 py-3 text-sm">7-10 business days</td>
                    <td className="px-4 py-3 text-sm">£15.95</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="px-4 py-3 text-sm">Rest of World</td>
                    <td className="px-4 py-3 text-sm">10-14 business days</td>
                    <td className="px-4 py-3 text-sm">£19.95</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm text-neutral-600">
              *Please note: International orders may be subject to import duties and taxes, which are the responsibility of the recipient.
            </p>
          </section>

          {/* Important Information */}
          <section className="mb-12 border-t border-neutral-200 pt-12">
            <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
              Important Information
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
                  Order Processing
                </h3>
                <p className="text-sm text-neutral-600">
                  Orders are processed Monday to Friday (excluding bank holidays). Orders placed after 10pm or on weekends will be processed the next business day.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
                  Delivery Times
                </h3>
                <p className="text-sm text-neutral-600">
                  All delivery times are estimates from the date of dispatch, not the date of order. Delivery times may be affected during peak periods such as sales and holidays.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
                  Tracking Your Order
                </h3>
                <p className="text-sm text-neutral-600">
                  Once your order has been dispatched, you'll receive a tracking number via email. You can track your order at any time using our order tracking page.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
                  Failed Deliveries
                </h3>
                <p className="text-sm text-neutral-600">
                  If we're unable to deliver your order, a card will be left with instructions on how to rearrange delivery or collect from your local depot. Items not collected within 10 days will be returned to us.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
                  Customs & Duties
                </h3>
                <p className="text-sm text-neutral-600">
                  For international orders, customs duties and import taxes may apply. These charges are the responsibility of the recipient and are not included in your order total.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded border border-neutral-200 bg-neutral-50 p-8 text-center">
            <h2 className="mb-3 text-xl font-bold uppercase tracking-wider text-[#1D2022]">
              Questions About Delivery?
            </h2>
            <p className="mb-6 text-sm text-neutral-600">
              Our customer service team is available to help with any delivery queries.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="/help/track-order"
                className="inline-block border-2 border-black bg-black px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-black"
              >
                Track Order
              </a>
              <a
                href="/help/customer-service"
                className="inline-block border-2 border-black bg-white px-8 py-3 text-sm font-medium uppercase tracking-wider text-black transition-colors duration-200 hover:bg-black hover:text-white"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
