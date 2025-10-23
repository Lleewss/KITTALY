import imageFragment from './image';
import seoFragment from './seo';

const articleFragment = /* GraphQL */ `
  fragment article on Article {
    id
    title
    handle
    content
    contentHtml
    excerpt
    excerptHtml
    publishedAt
    image {
      ...image
    }
    authorV2 {
      name
    }
    tags
    seo {
      ...seo
    }
  }
  ${imageFragment}
  ${seoFragment}
`;

export default articleFragment;
