import imageFragment from './image';
import seoFragment from './seo';

const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
    metafields(identifiers: [
      { namespace: "custom", key: "gallery_item_1_photo" }
      { namespace: "custom", key: "gallery_item_1_text" }
      { namespace: "custom", key: "gallery_item_2_photo" }
      { namespace: "custom", key: "gallery_item_2_text" }
      { namespace: "custom", key: "gallery_item_3_photo" }
      { namespace: "custom", key: "gallery_item_3_text" }
      { namespace: "custom", key: "gallery_item_4_photo" }
      { namespace: "custom", key: "gallery_item_4_text" }
      { namespace: "custom", key: "gallery_item_5_photo" }
      { namespace: "custom", key: "gallery_item_5_text" }
      { namespace: "custom", key: "gallery_item_6_photo" }
      { namespace: "custom", key: "gallery_item_6_text" }
      { namespace: "custom", key: "gallery_item_7_photo" }
      { namespace: "custom", key: "gallery_item_7_text" }
      { namespace: "custom", key: "gallery_item_8_photo" }
      { namespace: "custom", key: "gallery_item_8_text" }
    ]) {
      key
      value
      type
      reference {
        ... on MediaImage {
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
  ${imageFragment}
  ${seoFragment}
`;

export default productFragment;
