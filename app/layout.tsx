import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { WelcomeToast } from 'components/welcome-toast';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { baseUrl } from 'lib/utils';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

const SITE_NAME = process.env.SITE_NAME || 'KITALLY';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE_NAME} - Your Canvas for Limitless Self-Expression`,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  description: 'KITALLY - Premium fashion essentials. Your canvas for limitless self-expression. Shop the latest collection with 30-day free returns.',
  keywords: ['fashion', 'clothing', 'premium', 'lifestyle', 'essentials', 'KITALLY'],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Premium Fashion Essentials`,
    description: 'Your canvas for limitless self-expression'
  }
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-white text-black antialiased">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main className="min-h-screen">
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
