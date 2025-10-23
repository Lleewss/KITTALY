import { NextRequest, NextResponse } from 'next/server';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Create customer in Shopify with accepts_marketing set to true
    const mutation = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
            acceptsMarketing
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        email: email,
        acceptsMarketing: true,
        tags: ['newsletter']
      }
    };

    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      }
    );

    const data = await response.json();

    // Check for errors
    if (data.data?.customerCreate?.customerUserErrors?.length > 0) {
      const errors = data.data.customerCreate.customerUserErrors;
      
      // If customer already exists, try to update their marketing preferences
      if (errors.some((error: any) => error.code === 'TAKEN')) {
        // Customer already exists - you might want to update their preferences
        // or just return success since they're already in the system
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to our newsletter!'
        });
      }

      return NextResponse.json(
        { error: errors[0].message },
        { status: 400 }
      );
    }

    if (data.data?.customerCreate?.customer) {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter!'
      });
    }

    throw new Error('Unexpected response from Shopify');

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}
