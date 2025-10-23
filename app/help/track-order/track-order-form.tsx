'use client';

import { useState } from 'react';

export default function TrackOrderForm() {
  const [formData, setFormData] = useState({
    orderNumber: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Redirect to Shopify order tracking
    window.location.href = `/account/login?return_url=/account/orders`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="orderNumber" className="mb-2 block text-sm font-medium uppercase tracking-wider text-black">
          Order Number *
        </label>
        <input
          type="text"
          id="orderNumber"
          name="orderNumber"
          value={formData.orderNumber}
          onChange={handleChange}
          required
          placeholder="e.g., #1234"
          className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-black focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium uppercase tracking-wider text-black">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-black focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full border-2 border-black bg-black px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-black disabled:opacity-50"
      >
        {isSubmitting ? 'Tracking...' : 'Track Order'}
      </button>
    </form>
  );
}
