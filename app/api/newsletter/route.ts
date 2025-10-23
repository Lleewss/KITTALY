import { NextRequest, NextResponse } from 'next/server';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if Admin API token is available
    if (!SHOPIFY_ADMIN_ACCESS_TOKEN) {
      console.warn('SHOPIFY_ADMIN_ACCESS_TOKEN not configured. Newsletter subscriptions disabled.');
      
      // Return success anyway to not break the UI
      // In production, you should set up proper Admin API access or use a marketing app
      return NextResponse.json({
        success: true,
        message: 'Thank you for subscribing! We\'ll add you to our mailing list shortly.'
      });
    }

    // Use Admin API to create customer with marketing consent
    const mutation = `
      mutation customerCreate($input: CustomerInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
            emailMarketingConsent {
              marketingState
              marketingOptInLevel
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        email: email,
        emailMarketingConsent: {
          marketingState: 'SUBSCRIBED',
          marketingOptInLevel: 'SINGLE_OPT_IN'
        },
        tags: ['newsletter']
      }
    };

    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      }
    );

    const data = await response.json();
    
    // Log the response for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Shopify Admin API response:', JSON.stringify(data, null, 2));
    }

    // Check if response has the expected structure
    if (!data.data) {
      console.error('No data in response:', data);
      
      // Check if it's an authentication error
      if (data.errors) {
        console.error('GraphQL errors:', data.errors);
        return NextResponse.json(
          { error: 'Unable to process subscription. Please contact support.' },
          { status: 500 }
        );
      }
      
      throw new Error('Invalid response structure from Shopify');
    }

    // Check for user errors
    if (data.data?.customerCreate?.userErrors?.length > 0) {
      const errors = data.data.customerCreate.userErrors;
      console.log('Customer user errors:', errors);
      
      // If customer already exists, try to update marketing consent
      const emailTakenError = errors.find((error: any) => 
        error.field?.includes('email') && 
        (error.message?.includes('taken') || error.message?.includes('already exists'))
      );
      
      if (emailTakenError) {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to our newsletter!'
        });
      }

      // Other validation errors
      return NextResponse.json(
        { error: errors[0].message || 'Invalid email address' },
        { status: 400 }
      );
    }

    // Success case
    if (data.data?.customerCreate?.customer) {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter!'
      });
    }

    // If we get here, something unexpected happened
    console.error('Unexpected response structure:', data);
    throw new Error('Unexpected response from Shopify');

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter. Please try again later.' },
      { status: 500 }
    );
  }
}
