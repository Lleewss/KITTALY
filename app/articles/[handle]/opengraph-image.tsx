import OpengraphImage from 'components/opengraph-image';
import { getArticle } from 'lib/shopify';

// Using Node.js runtime for font loading in OpengraphImage
export const runtime = 'nodejs';

type Props = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function Image({ params }: Props) {
  const { handle } = await params;
  const article = await getArticle('news', handle);
  const title = article?.title || 'KITTALY Articles';

  return await OpengraphImage({ title });
}
