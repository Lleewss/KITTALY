# Reviews Page Setup Guide

## Overview
The `/reviews` page displays customer reviews from a combination of:
1. **Custom reviews** from Shopify page JSON (dynamic)
2. **8 hardcoded reviews** (fallback/default)

---

## Shopify Setup

### Step 1: Create Reviews Page
1. Go to **Shopify Admin → Online Store → Pages**
2. Click **Add page**
3. Set **Title**: `Reviews`
4. Set **Handle**: `reviews` (important!)
5. **Content/Body**: Paste the JSON array from `REVIEWS-JSON-TEMPLATE.json`
6. Click **Save**

### Step 2: JSON Format
The page body should contain a JSON array with this structure:

```json
[
  {
    "id": "review-1",
    "photo": "https://cdn.shopify.com/s/files/1/YOUR-STORE/files/customer-photo-1.jpg",
    "rating": 5,
    "text": "Absolutely love this piece! The quality is outstanding...",
    "name": "Emily R.",
    "product": "Classic Denim Jacket",
    "link": "/product/classic-denim-jacket"
  },
  {
    "id": "review-2",
    ...
  }
]
```

---

## Field Definitions

### Required Fields (all required):

| Field    | Type   | Description                                           | Example                          |
|----------|--------|-------------------------------------------------------|----------------------------------|
| `id`     | string | Unique identifier for the review                      | `"review-1"`                     |
| `photo`  | string | Full URL to customer photo (Shopify CDN recommended) | `"https://cdn.shopify.com/..."` |
| `rating` | number | Star rating (1-5, typically 5)                        | `5`                              |
| `text`   | string | Customer review text/quote                            | `"Absolutely love this..."`      |
| `name`   | string | Customer name                                         | `"Emily R."`                     |
| `product`| string | Product name being reviewed                           | `"Classic Denim Jacket"`         |
| `link`   | string | Product page URL (relative or absolute)               | `"/product/classic-denim-jacket"`|

---

## Image Upload Instructions

### Upload Customer Photos to Shopify:
1. Go to **Shopify Admin → Content → Files**
2. Click **Upload files**
3. Upload customer review photos
4. After upload, click on each image
5. Copy the **CDN URL** (looks like: `https://cdn.shopify.com/s/files/1/XXXXX/files/image.jpg`)
6. Use these URLs in the `"photo"` field

### Image Recommendations:
- **Aspect Ratio**: 3:4 (portrait) works best
- **Minimum Size**: 800x1066px
- **Format**: JPG or WebP
- **File Size**: Keep under 500KB for performance

---

## How It Works

### Review Display Order:
1. Custom reviews from Shopify page body (parsed from JSON)
2. Followed by 8 hardcoded default reviews
3. Total reviews shown = Custom + 8 defaults

### Example Scenarios:

**Scenario 1**: 10 custom reviews in JSON
- Shows: 10 custom + 8 hardcoded = **18 total reviews**

**Scenario 2**: 0 custom reviews (empty/no page)
- Shows: 8 hardcoded = **8 total reviews**

**Scenario 3**: 5 custom reviews in JSON
- Shows: 5 custom + 8 hardcoded = **13 total reviews**

---

## Page Features

### Header Section:
- Title: "Customer Reviews"
- Subtitle: "Real people, real style..."
- Stats: Total review count + 5.0 star average

### Review Cards:
- Customer photo with hover zoom effect
- 5-star rating display
- Review quote/text
- Customer name
- Product name
- "View Product" link (clickable entire card)

### Footer CTA:
- "Share Your Style" section
- Instagram tag prompt
- "Continue Shopping" button

---

## Updating Reviews

### To Add New Reviews:
1. Go to **Shopify Admin → Pages → Reviews**
2. Edit the page
3. Add new review objects to the JSON array:
   ```json
   {
     "id": "review-NEW",
     "photo": "https://cdn.shopify.com/...",
     "rating": 5,
     "text": "New review text here...",
     "name": "Customer Name",
     "product": "Product Name",
     "link": "/product/product-handle"
   }
   ```
4. Save the page

### To Remove Reviews:
1. Delete the review object from the JSON array
2. Save the page

---

## Link Format

### Product Links:
- Use relative URLs: `/product/PRODUCT-HANDLE`
- Or full URLs: `https://yourstore.com/product/PRODUCT-HANDLE`
- Or collection links: `/search/collection-name`

### Finding Product Handles:
1. Go to **Shopify Admin → Products**
2. Click on a product
3. The handle is in the URL: `admin/products/PRODUCT-HANDLE`
4. Or check the "Search engine listing preview" section

---

## Troubleshooting

### Reviews Not Showing:
- Check page handle is exactly `reviews` (lowercase)
- Verify JSON is valid (use JSONLint.com)
- Check browser console for errors
- Ensure all required fields are present

### JSON Validation:
- Copy your JSON
- Paste into https://jsonlint.com/
- Fix any syntax errors (missing commas, quotes, etc.)

### Images Not Loading:
- Verify image URLs are accessible
- Use Shopify CDN URLs (not external links that might break)
- Check image file permissions

---

## Example Valid JSON

See `REVIEWS-JSON-TEMPLATE.json` for a complete example with 10 reviews.

Key points:
- Array starts with `[` and ends with `]`
- Each review object is wrapped in `{}`
- Commas separate each review object
- No comma after the last review
- All strings use double quotes `""`
- All fields are required

---

## Page URL

The reviews page will be accessible at:
- **URL**: `https://yourstore.com/reviews`
- **Route**: `/reviews`

The page is also linked from all Customer Gallery sections via the "View All Reviews" button.
