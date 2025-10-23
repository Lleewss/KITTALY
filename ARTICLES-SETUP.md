# Articles/Blog Setup Guide for KITTALY

## Overview
The articles system pulls blog posts from Shopify's built-in blog functionality, specifically from a blog with the handle `news`. This guide will walk you through setting up and managing your blog content in Shopify.

## Shopify Setup

### 1. Create Blog in Shopify Admin

1. Log into your Shopify Admin
2. Navigate to **Online Store** → **Blog Posts**
3. Click **Manage Blogs**
4. Create a new blog with the following settings:
   - **Title**: "News" (or any title you prefer)
   - **Handle**: `news` (IMPORTANT: Must be "news" to work with the code)
   - **Comment settings**: Configure as desired

### 2. Configure Storefront API Permissions

Ensure your Storefront API has the following permissions:

1. Go to **Settings** → **Apps and sales channels** → **Develop apps**
2. Select your app or create a new one
3. Under **Storefront API access scopes**, enable:
   - ✅ `unauthenticated_read_content` (for blog access)
   - ✅ `unauthenticated_read_articles` (for article access)

### 3. Create Blog Posts

1. Navigate to **Online Store** → **Blog Posts**
2. Click **Create blog post**
3. Fill in the required fields:

#### Required Fields:
- **Title**: The article title (will appear as the main heading)
- **Content**: The full article content (supports rich text and HTML)
- **Excerpt**: A short summary (recommended 150-200 characters)
- **Author**: Select an author from your staff
- **Featured Image**: Upload a high-quality image (recommended 1920x1080px)
- **Tags**: Add relevant tags (e.g., "Style Guide", "Sustainability", "News")

#### SEO Settings:
- **Page title**: Custom SEO title (defaults to article title)
- **Meta description**: Custom SEO description (defaults to excerpt)

#### Visibility:
- **Published**: Set to "Published" when ready to go live
- **Visibility**: Set to "Online Store" to make it publicly accessible

## Code Implementation

### Files Created

1. **Types** (`lib/shopify/types.ts`)
   - Added `Article`, `Blog`, `ShopifyArticle`, `ShopifyBlog` types
   - Added operation types for GraphQL queries

2. **Fragments** (`lib/shopify/fragments/article.ts`)
   - GraphQL fragment for article data structure

3. **Queries** (`lib/shopify/queries/blog.ts`)
   - `getBlogQuery`: Fetches all articles from a blog
   - `getArticleQuery`: Fetches a single article by handle

4. **Functions** (`lib/shopify/index.ts`)
   - `getBlog(handle)`: Returns array of articles
   - `getArticle(blogHandle, articleHandle)`: Returns single article

5. **Pages**
   - `/app/articles/page.tsx`: Lists all articles
   - `/app/articles/[handle]/page.tsx`: Individual article page
   - `/app/articles/loading.tsx`: Loading state
   - `/app/articles/[handle]/opengraph-image.tsx`: Dynamic OG images

6. **Sitemap** (`app/sitemap.ts`)
   - Added articles to sitemap for SEO

## Features

### Articles Listing Page (`/articles`)

**Features:**
- Featured article (most recent) with large display
- "Discover More" section with links to:
  - About KITTALY
  - Sustainability
  - Careers
  - Press
- Grid of all remaining articles
- Responsive design (1-3 columns)
- Article metadata (date, author, tags)
- Hover effects on images

**Data Pulled:**
- Article title
- Featured image
- Excerpt
- Published date
- Author name
- Tags

### Individual Article Page (`/articles/[handle]`)

**Features:**
- Breadcrumb navigation
- Full article header with metadata
- Large featured image
- Rich HTML content rendering
- Social sharing (Twitter, Facebook, Copy link)
- Related articles section
- Custom SEO metadata
- OpenGraph images

**Data Pulled:**
- All article fields
- Full HTML content
- SEO metadata
- Related articles

### Styling & Design

**Brand Consistency:**
- Uses KITTALY brand colors (#1D2022 black, neutrals)
- Uppercase tracking-wider for headings
- Minimal, clean aesthetic
- Consistent spacing and borders
- Responsive images with hover effects

**Typography:**
- Article content uses prose styling
- Headings: Bold, uppercase, tracking-wider
- Body text: Neutral-700 color
- Links: Black with underline, hover effects

## Content Best Practices

### Article Structure

1. **Title**: Keep it concise but descriptive (50-60 characters)
2. **Excerpt**: Write a compelling summary (150-200 characters)
3. **Content**: 
   - Use proper heading hierarchy (H2, H3)
   - Break up text with images
   - Include internal links to products/collections
   - Keep paragraphs short and scannable
4. **Images**: 
   - Use high-quality, on-brand imagery
   - Optimize for web (aim for <500KB)
   - Include descriptive alt text
5. **Tags**: Use 3-5 relevant tags per article

### Article Ideas

**Style Guides:**
- "How to Style Our Corduroy Jacket"
- "Winter Layering Essentials"
- "Capsule Wardrobe Basics"

**Sustainability:**
- "Behind the Scenes: Our Organic Cotton"
- "The Journey to Carbon Neutral Shipping"
- "Meet Our Ethical Partners"

**Brand Stories:**
- "Founder's Message: Our 2024 Vision"
- "Customer Spotlight: Real Stories"
- "A Day in the Life at KITTALY HQ"

**Product Features:**
- "New Collection Launch: Spring/Summer 2024"
- "Product Spotlight: The Perfect White Tee"
- "Archive Revisit: Our Best Sellers"

## Testing

### Test the Integration

1. **Create a test article** in Shopify:
   ```
   Title: "Test Article - Please Ignore"
   Content: "This is a test article to verify the blog integration works."
   Excerpt: "Testing blog integration"
   Featured Image: Upload any image
   Status: Published
   Visibility: Online Store
   ```

2. **Visit the pages**:
   - `/articles` - Should list all articles including test
   - `/articles/test-article-please-ignore` - Should show full article
   - Check responsive behavior on mobile

3. **Verify functionality**:
   - ✅ Featured article displays correctly
   - ✅ Article grid shows all posts
   - ✅ Individual article page loads
   - ✅ Images load and are properly sized
   - ✅ Dates format correctly
   - ✅ Author names display
   - ✅ Tags appear
   - ✅ Related articles show
   - ✅ Share buttons work
   - ✅ Breadcrumbs navigate correctly

## Troubleshooting

### Articles Not Showing

**Problem**: `/articles` page shows "No articles available"

**Solutions**:
1. Verify blog handle is exactly `news` in Shopify
2. Check articles are set to "Published" status
3. Verify articles have "Online Store" visibility
4. Confirm Storefront API permissions are enabled
5. Check environment variables are set correctly

### Images Not Loading

**Problem**: Article images appear broken

**Solutions**:
1. Verify images are uploaded to Shopify
2. Check image URLs in Shopify admin
3. Ensure images aren't too large (optimize for web)
4. Verify Next.js `next.config.ts` allows Shopify image domains

### Styling Issues

**Problem**: Content doesn't match brand styling

**Solutions**:
1. Use Shopify's rich text editor for consistent formatting
2. Avoid inline styles in HTML
3. Use proper heading hierarchy (H2, H3, not H1)
4. Test content rendering on staging before publishing

## Performance Optimization

### Caching Strategy

The blog functions use Next.js caching:
```typescript
'use cache';
cacheTag(TAGS.collections);
cacheLife('days');
```

**Benefits:**
- Articles cached for 1 day
- Reduces Shopify API calls
- Faster page loads
- Better user experience

### Image Optimization

- Next.js Image component used throughout
- Automatic WebP conversion
- Responsive srcsets
- Lazy loading below fold
- Priority loading for featured images

## Monitoring & Analytics

### Track Article Performance

1. **Google Analytics**: Track pageviews for `/articles/*` paths
2. **Shopify Analytics**: Monitor blog traffic in admin
3. **User Engagement**: Track time on page, bounce rate
4. **Social Shares**: Monitor share button clicks

### Key Metrics

- Total articles published
- Average views per article
- Most popular articles
- Traffic sources (organic, social, direct)
- Conversion from articles to products

## Maintenance

### Regular Tasks

**Weekly:**
- Review article performance
- Respond to any questions/comments
- Plan upcoming content

**Monthly:**
- Publish 2-4 new articles
- Update evergreen content
- Review SEO performance
- Optimize underperforming articles

**Quarterly:**
- Audit all content for accuracy
- Update images if needed
- Refresh popular articles
- Review and update tags

## Future Enhancements

### Potential Features

1. **Article Categories**: Add category filtering
2. **Search**: Implement article search functionality
3. **Comments**: Enable customer comments/reviews
4. **Newsletter**: Auto-add articles to newsletter
5. **Related Products**: Link products within articles
6. **Author Pages**: Individual author bio pages
7. **Series**: Group related articles together
8. **Bookmarks**: Let users save favorite articles
9. **Reading Time**: Calculate and display reading time
10. **Social Proof**: Show view counts

## Support

For technical issues or questions:
- **Code Issues**: Check GitHub repository
- **Shopify Setup**: Consult Shopify Help Center
- **Design Questions**: Reference KITTALY brand guidelines
- **Content Strategy**: Review this guide's best practices

---

## Quick Reference

### Blog Handle
```
news
```

### API Functions
```typescript
getBlog('news') // Get all articles
getArticle('news', 'article-handle') // Get single article
```

### Routes
```
/articles                    // All articles
/articles/[handle]          // Single article
```

### Required Shopify Fields
- Title ✅
- Content ✅
- Excerpt (recommended)
- Author (recommended)
- Featured Image (recommended)
- Tags (optional)
- Published status ✅
- Online Store visibility ✅
