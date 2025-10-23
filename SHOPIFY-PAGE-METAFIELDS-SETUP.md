# Shopify Page Metafields Setup Guide

This guide explains how to set up metafields in Shopify Admin to create dynamic homepage-style pages.

## Overview

Pages with homepage-style layout will automatically render with the following sections:
1. Promo Banner
2. Hero Section
3. Dual Hero Section
4. Featured Products Grid
5. Customer Gallery ("How Our Customers Wear It")
6. Latest Arrivals Carousel
7. Secondary Hero (Explore Collection)

## Required Metafields Configuration

Go to **Shopify Admin → Settings → Custom Data → Pages → Add Definition**

### Namespace
All metafields use the namespace: `custom`

---

## Metafield Definitions

### 1. Promo Banner Section

#### promo_banner_button_text
- **Key**: `promo_banner_button_text`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Button text for promo banner (e.g., "Shop Now")

#### promo_banner_button_link
- **Key**: `promo_banner_button_link`
- **Namespace**: `custom`
- **Type**: Single line text (URL)
- **Description**: Link for promo banner button (e.g., "/search/sale")

---

### 2. Main Hero Section

#### hero_image_desktop
- **Key**: `hero_image_desktop`
- **Namespace**: `custom`
- **Type**: File (Image)
- **Description**: Desktop hero image (recommended: 1920x800px)
- **Required**: Yes (triggers homepage layout)

#### hero_image_mobile
- **Key**: `hero_image_mobile`
- **Namespace**: `custom`
- **Type**: File (Image)
- **Description**: Mobile hero image (recommended: 768x1024px)

#### hero_title
- **Key**: `hero_title`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Main headline text (e.g., "New Season Essentials")

#### hero_subtitle
- **Key**: `hero_subtitle`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Subtitle text (e.g., "Your canvas for limitless self-expression")

#### hero_cta_text
- **Key**: `hero_cta_text`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Call-to-action button text (e.g., "Shop Now")

#### hero_cta_link
- **Key**: `hero_cta_link`
- **Namespace**: `custom`
- **Type**: Single line text (URL)
- **Description**: CTA button destination (e.g., "/search/new-arrivals")

#### hero_text_position
- **Key**: `hero_text_position`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Text position on hero image
- **Allowed values**: `left`, `center`, `right`

#### hero_text_color
- **Key**: `hero_text_color`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Text color for hero section
- **Allowed values**: `white`, `black`

---

### 3. Dual Hero Section (Left Side)

#### dual_hero_left_image_desktop
- **Key**: `dual_hero_left_image_desktop`
- **Namespace**: `custom`
- **Type**: File (Image)
- **Description**: Desktop image for left hero (recommended: 960x800px)

#### dual_hero_left_image_mobile
- **Key**: `dual_hero_left_image_mobile`
- **Namespace**: `custom`
- **Type**: File (Image)
- **Description**: Mobile image for left hero (recommended: 768x800px)

#### dual_hero_left_title
- **Key**: `dual_hero_left_title`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Title for left hero (e.g., "Women")

#### dual_hero_left_subtitle
- **Key**: `dual_hero_left_subtitle`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Subtitle for left hero (e.g., "Explore the latest collection")

#### dual_hero_left_cta_text
- **Key**: `dual_hero_left_cta_text`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: CTA button text (e.g., "Shop Now")

#### dual_hero_left_cta_link
- **Key**: `dual_hero_left_cta_link`
- **Namespace**: `custom`
- **Type**: Single line text (URL)
- **Description**: CTA destination (e.g., "/search/women")

#### dual_hero_left_text_color
- **Key**: `dual_hero_left_text_color`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Text color for left hero
- **Allowed values**: `white`, `black`

---

### 4. Dual Hero Section (Right Side)

#### dual_hero_right_image_desktop
- **Key**: `dual_hero_right_image_desktop`
- **Namespace**: `custom`
- **Type**: File (Image)
- **Description**: Desktop image for right hero (recommended: 960x800px)

#### dual_hero_right_image_mobile
- **Key**: `dual_hero_right_image_mobile`
- **Namespace**: `custom`
- **Type**: File (Image)
- **Description**: Mobile image for right hero (recommended: 768x800px)

#### dual_hero_right_title
- **Key**: `dual_hero_right_title`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Title for right hero (e.g., "Men")

#### dual_hero_right_subtitle
- **Key**: `dual_hero_right_subtitle`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Subtitle for right hero (e.g., "Discover timeless pieces")

#### dual_hero_right_cta_text
- **Key**: `dual_hero_right_cta_text`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: CTA button text (e.g., "Shop Now")

#### dual_hero_right_cta_link
- **Key**: `dual_hero_right_cta_link`
- **Namespace**: `custom`
- **Type**: Single line text (URL)
- **Description**: CTA destination (e.g., "/search/men")

#### dual_hero_right_text_color
- **Key**: `dual_hero_right_text_color`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Text color for right hero
- **Allowed values**: `white`, `black`

---

### 5. Featured Products Section

#### featured_collection
- **Key**: `featured_collection`
- **Namespace**: `custom`
- **Type**: Collection reference
- **Description**: Collection to display in the featured grid (shows 3 products)
- **Note**: Currently uses ThreeItemGrid component which pulls from homepage settings

---

### 6. Customer Gallery Section

#### customer_gallery_collection
- **Key**: `customer_gallery_collection`
- **Namespace**: `custom`
- **Type**: Collection reference
- **Description**: Collection for "How Our Customers Wear It" section
- **Note**: Currently uses CustomerGallery component which pulls from homepage settings

---

### 7. Latest Arrivals Section

#### latest_arrivals_collection
- **Key**: `latest_arrivals_collection`
- **Namespace**: `custom`
- **Type**: Collection reference
- **Description**: Collection for the carousel/latest arrivals
- **Note**: Currently uses Carousel component which pulls from homepage settings

---

### 8. Secondary Hero Section (Explore Collection)

#### secondary_hero_image_desktop
- **Key**: `secondary_hero_image_desktop`
- **Namespace**: `custom`
- **Type**: File (Image)
- **Description**: Desktop image for bottom hero (recommended: 1920x800px)

#### secondary_hero_image_mobile
- **Key**: `secondary_hero_image_mobile`
- **Namespace**: `custom`
- **Type**: File (Image)
- **Description**: Mobile image for bottom hero (recommended: 768x1024px)

#### secondary_hero_title
- **Key**: `secondary_hero_title`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Title for bottom hero (e.g., "Explore the Collection")

#### secondary_hero_subtitle
- **Key**: `secondary_hero_subtitle`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Subtitle for bottom hero (e.g., "Timeless pieces for every moment")

#### secondary_hero_cta_text
- **Key**: `secondary_hero_cta_text`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: CTA button text (e.g., "Discover More")

#### secondary_hero_cta_link
- **Key**: `secondary_hero_cta_link`
- **Namespace**: `custom`
- **Type**: Single line text (URL)
- **Description**: CTA destination (e.g., "/search")

#### secondary_hero_text_position
- **Key**: `secondary_hero_text_position`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Text position on secondary hero
- **Allowed values**: `left`, `center`, `right`

#### secondary_hero_text_color
- **Key**: `secondary_hero_text_color`
- **Namespace**: `custom`
- **Type**: Single line text
- **Description**: Text color for secondary hero
- **Allowed values**: `white`, `black`

---

## Step-by-Step Setup in Shopify

### 1. Create Metafield Definitions

1. Go to **Shopify Admin → Settings → Custom Data**
2. Click on **Pages** 
3. Click **Add definition**
4. For each metafield above:
   - Enter the **Name** (can be human-readable, e.g., "Hero Image Desktop")
   - Enter the **Namespace and key** exactly as shown (e.g., `custom.hero_image_desktop`)
   - Select the **Type** (Single line text, File, etc.)
   - Add **Description** for your team
   - Click **Save**

### 2. Add Metafield Values to a Page

1. Go to **Shopify Admin → Online Store → Pages**
2. Select or create a page (e.g., "About Us", "Brand Story")
3. Scroll down to **Metafields** section
4. Fill in the metafield values:
   - Upload images for file fields
   - Enter text for text fields
   - Select collections for collection reference fields

### 3. Trigger Homepage Layout

**Important**: The page will only render with homepage layout if `hero_image_desktop` has a value.

If you don't set `hero_image_desktop`, the page will render in default prose/content mode.

---

## Example Page Setup

### Example: "Brand Story" Page

```
Page Title: Brand Story
Handle: brand-story

Metafields:
├── hero_image_desktop: [Upload image]
├── hero_image_mobile: [Upload image]
├── hero_title: "Our Story"
├── hero_subtitle: "Crafting timeless fashion since 2020"
├── hero_cta_text: "Explore Collection"
├── hero_cta_link: "/search/all"
├── hero_text_position: "center"
├── hero_text_color: "white"
├── dual_hero_left_image_desktop: [Upload image]
├── dual_hero_left_title: "Sustainable"
├── dual_hero_left_subtitle: "Eco-friendly materials"
├── dual_hero_left_cta_text: "Learn More"
├── dual_hero_left_cta_link: "/pages/sustainability"
├── dual_hero_right_image_desktop: [Upload image]
├── dual_hero_right_title: "Quality"
├── dual_hero_right_subtitle: "Handcrafted excellence"
├── dual_hero_right_cta_text: "Shop Now"
├── dual_hero_right_cta_link: "/search/premium"
└── ... (continue for other fields)
```

---

## Optional Sections

Each section is optional. If you don't provide metafields for a section, it won't render:

- **Promo Banner**: Skipped if `promo_banner_button_link` is empty
- **Dual Hero**: Skipped if BOTH `dual_hero_left_image_desktop` AND `dual_hero_right_image_desktop` are empty (both required)
- **Featured**: Skipped if `featured_collection` is empty
- **Customer Gallery**: Skipped if `customer_gallery_collection` is empty
- **Latest Arrivals**: Skipped if `latest_arrivals_collection` is empty
- **Secondary Hero**: Skipped if `secondary_hero_image_desktop` is empty

---

## URL Structure

Your dynamic pages will be accessible at:
- `https://yourdomain.com/pages/your-page-handle`

For example:
- `https://yourdomain.com/pages/brand-story`
- `https://yourdomain.com/pages/sustainability`

---

## Image Recommendations

### Desktop Images
- Main Hero: 1920x800px or 2400x1000px
- Dual Hero: 960x800px each
- Secondary Hero: 1920x800px

### Mobile Images
- Main Hero: 768x1024px
- Dual Hero: 768x800px each
- Secondary Hero: 768x1024px

### Format
- WEBP (preferred for performance)
- JPEG (fallback)
- PNG (if transparency needed)

---

## Testing

1. Create a test page with all metafields filled
2. Navigate to `/pages/your-page-handle`
3. Verify all sections render correctly
4. Test on mobile and desktop
5. Check all CTA links work

---

## Troubleshooting

### Page shows default prose layout instead of homepage layout
- ✅ Check that `hero_image_desktop` metafield has a value
- ✅ Verify the metafield key is exactly `custom.hero_image_desktop`

### Images not showing
- ✅ Ensure images are uploaded to File metafield type (not URL text)
- ✅ Check image URLs are accessible
- ✅ Verify file type is image (not video/document)

### Section not appearing
- ✅ Confirm the required metafield for that section has a value
- ✅ Check the metafield key matches exactly

### Links not working
- ✅ Use relative URLs (e.g., `/search/collection-name`)
- ✅ Or use full URLs (e.g., `https://yourdomain.com/search/collection-name`)

---

## Notes

- The promo banner text is automatically generated based on season/sales (not customizable per page)
- ThreeItemGrid, CustomerGallery, and Carousel components currently pull from global settings
- To fully customize these sections per page, additional development would be needed

