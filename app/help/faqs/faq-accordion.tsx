'use client';

import { useState } from 'react';

type FAQCategory = {
  title: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

const faqData: FAQCategory[] = [
  {
    title: 'Orders & Payment',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely through our encrypted payment gateway.'
      },
      {
        question: 'How do I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history, or by using our Track Order tool.'
      },
      {
        question: 'Can I cancel or modify my order?',
        answer: 'You can cancel or modify your order within 1 hour of placing it by contacting our customer service team. After this window, orders are processed and cannot be modified.'
      },
      {
        question: 'Do you offer gift cards?',
        answer: 'Yes! Digital gift cards are available in denominations from £25 to £500. They can be purchased on our website and are delivered instantly via email.'
      }
    ]
  },
  {
    title: 'Shipping & Delivery',
    items: [
      {
        question: 'How long does delivery take?',
        answer: 'Standard delivery takes 3-5 business days. Express delivery (1-2 business days) and Next Day delivery options are also available at checkout.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to over 50 countries worldwide. International delivery times vary by location, typically taking 7-14 business days. Customs duties may apply.'
      },
      {
        question: 'What if my package is lost or damaged?',
        answer: 'We take full responsibility for lost or damaged packages. Please contact our customer service team within 48 hours of delivery, and we\'ll arrange a replacement or full refund.'
      },
      {
        question: 'Can I change my delivery address?',
        answer: 'You can change your delivery address within 2 hours of placing your order by contacting customer service. Once the order is dispatched, address changes are not possible.'
      }
    ]
  },
  {
    title: 'Returns & Exchanges',
    items: [
      {
        question: 'What is your return policy?',
        answer: 'We offer free returns within 30 days of delivery. Items must be unworn, unwashed, and in original condition with tags attached. Visit our returns portal to initiate a return.'
      },
      {
        question: 'How do I exchange an item?',
        answer: 'We don\'t offer direct exchanges. Please return your item for a refund and place a new order for the desired size or color. This ensures you receive your exchange as quickly as possible.'
      },
      {
        question: 'When will I receive my refund?',
        answer: 'Refunds are processed within 5-7 business days of receiving your return. The refund will be issued to your original payment method.'
      },
      {
        question: 'Are sale items returnable?',
        answer: 'Yes, sale items are returnable under the same conditions as full-price items - within 30 days, unworn, with tags attached.'
      }
    ]
  },
  {
    title: 'Products & Sizing',
    items: [
      {
        question: 'How do I find my size?',
        answer: 'Use our comprehensive size guide available on each product page. We also offer detailed measurement instructions to help you find your perfect fit.'
      },
      {
        question: 'Are your products sustainable?',
        answer: 'Yes! 80% of our collection is made from organic, recycled, or sustainably sourced materials. We\'re committed to reducing our environmental impact across all aspects of our business.'
      },
      {
        question: 'Do you restock sold-out items?',
        answer: 'Popular items are often restocked. Sign up for restock notifications on the product page to be alerted when an item returns to stock.'
      },
      {
        question: 'How do I care for my FLOELI items?',
        answer: 'Care instructions are included on the label of each item. Generally, we recommend cold water washing, line drying, and avoiding harsh chemicals to extend the life of your garments.'
      }
    ]
  },
  {
    title: 'Account & Privacy',
    items: [
      {
        question: 'Do I need an account to make a purchase?',
        answer: 'No, you can check out as a guest. However, creating an account allows you to track orders, save favorites, and speed up future checkouts.'
      },
      {
        question: 'How do you protect my personal information?',
        answer: 'We use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties for marketing purposes. Read our Privacy Policy for full details.'
      },
      {
        question: 'How can I unsubscribe from emails?',
        answer: 'Click the "Unsubscribe" link at the bottom of any marketing email, or manage your email preferences in your account settings.'
      },
      {
        question: 'Can I delete my account?',
        answer: 'Yes, you can request account deletion by contacting our customer service team. Please note that order history will be retained for legal and accounting purposes.'
      }
    ]
  }
];

export default function FAQAccordion() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-8">
      {faqData.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h2 className="mb-4 text-xl font-bold uppercase tracking-wider text-[#1D2022]">
            {category.title}
          </h2>
          <div className="space-y-3">
            {category.items.map((item, itemIndex) => {
              const key = `${categoryIndex}-${itemIndex}`;
              const isOpen = openItems[key];

              return (
                <div key={key} className="border border-neutral-200">
                  <button
                    onClick={() => toggleItem(key)}
                    className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-neutral-50"
                  >
                    <span className="font-medium text-black">{item.question}</span>
                    <svg
                      className={`h-5 w-5 flex-shrink-0 text-black transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="border-t border-neutral-200 bg-neutral-50 p-4">
                      <p className="text-sm text-neutral-600">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
