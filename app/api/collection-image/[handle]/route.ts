import { getCollection } from 'lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ handle: string }> }
) {
  const { handle } = await params;

  try {
    const collection = await getCollection(handle);
    
    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    const imageUrl = collection.image?.url || null;

    return NextResponse.json({ 
      image: imageUrl,
      title: collection.title 
    });
  } catch (error) {
    console.error('Error fetching collection image:', error);
    return NextResponse.json({ error: 'Failed to fetch collection image' }, { status: 500 });
  }
}
