'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // In production, this would send to your customer service system
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        orderNumber: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      {submitStatus === 'success' && (
        <div className="mb-6 border border-green-600 bg-green-50 p-4">
          <p className="text-sm text-green-800">
            Thank you for contacting us! We'll get back to you within 24 hours.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 border border-red-600 bg-red-50 p-4">
          <p className="text-sm text-red-800">
            Something went wrong. Please try again or email us directly at support@floeli.com
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium uppercase tracking-wider text-black">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-black focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium uppercase tracking-wider text-black">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-black focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="orderNumber" className="mb-2 block text-sm font-medium uppercase tracking-wider text-black">
            Order Number (if applicable)
          </label>
          <input
            type="text"
            id="orderNumber"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            placeholder="e.g., #1234"
            className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-black focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium uppercase tracking-wider text-black">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-black focus:outline-none"
          >
            <option value="">Select a subject</option>
            <option value="order">Order Inquiry</option>
            <option value="delivery">Delivery Question</option>
            <option value="return">Return or Exchange</option>
            <option value="product">Product Question</option>
            <option value="technical">Technical Issue</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium uppercase tracking-wider text-black">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-black focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full border-2 border-black bg-black px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-black disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </>
  );
}
