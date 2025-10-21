'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('🛍️ Welcome to KITALLY', {
        id: 'welcome-toast',
        duration: Infinity,
        onDismiss: () => {
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
        },
        description: (
          <>
            <p className="text-sm">
            Welcome to KITALLY. Your canvas for limitless self-expression. Discover premium fashion essentials with{' '}
            <span className="font-semibold">30-day free returns</span> and{' '}
            <span className="font-semibold">free shipping on orders over £50</span>.
          </p>
          </>
        )
      });
    }
  }, []);

  return null;
}
