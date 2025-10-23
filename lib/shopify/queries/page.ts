import seoFragment from '../fragments/seo';

const pageFragment = /* GraphQL */ `
  fragment page on Page {
    ... on Page {
      id
      title
      handle
      body
      bodySummary
      seo {
        ...seo
      }
      createdAt
      updatedAt
      metafields(identifiers: [
        { namespace: "custom", key: "hero_image_desktop" }
        { namespace: "custom", key: "hero_image_mobile" }
        { namespace: "custom", key: "hero_title" }
        { namespace: "custom", key: "hero_subtitle" }
        { namespace: "custom", key: "hero_cta_link" }
        { namespace: "custom", key: "dual_hero_left_image_desktop" }
        { namespace: "custom", key: "dual_hero_left_image_mobile" }
        { namespace: "custom", key: "dual_hero_left_title" }
        { namespace: "custom", key: "dual_hero_left_subtitle" }
        { namespace: "custom", key: "dual_hero_left_cta_link" }
        { namespace: "custom", key: "dual_hero_right_image_desktop" }
        { namespace: "custom", key: "dual_hero_right_image_mobile" }
        { namespace: "custom", key: "dual_hero_right_title" }
        { namespace: "custom", key: "dual_hero_right_subtitle" }
        { namespace: "custom", key: "dual_hero_right_cta_link" }
        { namespace: "custom", key: "featured_collection" }
        { namespace: "custom", key: "customer_gallery_collection" }
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
        { namespace: "custom", key: "latest_arrivals_collection" }
        { namespace: "custom", key: "secondary_hero_image_desktop" }
        { namespace: "custom", key: "secondary_hero_image_mobile" }
        { namespace: "custom", key: "secondary_hero_title" }
        { namespace: "custom", key: "secondary_hero_subtitle" }
        { namespace: "custom", key: "secondary_hero_cta_link" }
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
  }
  ${seoFragment}
`;

export const getPageQuery = /* GraphQL */ `
  query getPage($handle: String!) {
    pageByHandle(handle: $handle) {
      ...page
    }
  }
  ${pageFragment}
`;

export const getPagesQuery = /* GraphQL */ `
  query getPages {
    pages(first: 100) {
      edges {
        node {
          ...page
        }
      }
    }
  }
  ${pageFragment}
`;
