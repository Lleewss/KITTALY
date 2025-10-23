'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-t border-neutral-200 bg-neutral-50 py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-[#1D2022] md:text-3xl">
            Stay in Touch
          </h2>
          <p className="mt-3 text-sm text-neutral-600 md:text-base">
            Subscribe to our newsletter for exclusive offers, style tips, and early access to new collections.
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-black focus:outline-none sm:w-80"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="border-2 border-black bg-black px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-black disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {status === 'success' && (
              <p className="mt-4 text-sm text-green-700">
                Thank you for subscribing! Check your email to confirm your subscription.
              </p>
            )}

            {status === 'error' && (
              <p className="mt-4 text-sm text-red-700">
                Something went wrong. Please try again.
              </p>
            )}

            <p className="mt-4 text-xs text-neutral-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
