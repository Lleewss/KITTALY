import TrackOrderForm from './track-order-form';

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="border-b border-neutral-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h1 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-4xl">
              Track Your Order
            </h1>
            <p className="mt-3 text-base text-neutral-600">
              Enter your order details below to track your delivery.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-screen-xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Tracking Form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
                Track Order
              </h2>
              <TrackOrderForm />
            </div>

            {/* Information */}
            <div>
              <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
                Need Help?
              </h2>

              <div className="space-y-4">
                <div className="border border-neutral-200 p-6">
                  <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
                    Where's My Tracking Number?
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Your tracking number was sent via email when your order was dispatched. 
                    Check your inbox and spam folder for an email from KITTALY.
                  </p>
                </div>

                <div className="border border-neutral-200 p-6">
                  <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
                    When Will My Order Dispatch?
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Orders are typically processed and dispatched within 1-2 business days. 
                    You'll receive a tracking number once your order ships.
                  </p>
                </div>

                <div className="border border-neutral-200 p-6">
                  <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
                    Already Have an Account?
                  </h3>
                  <p className="mb-3 text-sm text-neutral-600">
                    Log in to view all your orders and track deliveries in one place.
                  </p>
                  <a
                    href="/account/login?return_url=/account/orders"
                    className="inline-block border border-black bg-white px-6 py-2 text-xs font-medium uppercase tracking-wider text-black transition-colors duration-200 hover:bg-black hover:text-white"
                  >
                    View My Orders
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="mt-12 border-t border-neutral-200 pt-12">
            <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
              Delivery Information
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
                  Standard Delivery
                </h3>
                <p className="text-sm text-neutral-600">
                  Free on orders over £50. Arrives in 3-5 business days.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
                  Express Delivery
                </h3>
                <p className="text-sm text-neutral-600">
                  £5.95. Arrives in 1-2 business days.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
                  Next Day Delivery
                </h3>
                <p className="text-sm text-neutral-600">
                  £9.95. Order before 2pm for next day delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
