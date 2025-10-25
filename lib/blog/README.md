# 🔄 Hybrid Blog System Documentation

## Overview

This system allows you to **seamlessly mix Shopify blogs and hard-coded static blogs** with zero difference to the end user.

### Sources

1. **Shopify Blogs** - Dynamic blogs from Shopify Storefront API
2. **Static JSON** - Hard-coded blogs in `static-blogs.json`
3. **Future: MDX files** - Rich content with React components (optional)

---

## ✅ How It Works

```typescript
// Get ALL blogs (Shopify + Static merged)
const allBlogs = await getAllBlogs();

// Get single blog by handle (checks both sources)
const blog = await getBlogByHandle('christmas-pajamas-for-baby');

// Get blogs for core page
const blogs = await getBlogsForCorePage('family-matching', { 
  filter: 'christmas-pajamas',
  limit: 6 
});
```

**The system automatically:**
- ✅ Merges Shopify and static blogs
- ✅ Sorts by priority or date
- ✅ Filters by seasonality, tier, core page
- ✅ Returns same data structure for both sources
- ✅ No difference in rendering (both use `HybridArticle` type)

---

## 📝 Adding Hard-Coded Blogs

### Option 1: JSON (Simplest - for 603 planned blogs)

**File:** `/lib/blog/static-blogs.json`

```json
{
  "blog_posts": [
    {
      "blog_id": "BLOG-117",
      "tier": "tier-2",
      "title": "Christmas Pajamas for Baby",
      "url_slug": "christmas-pajamas-for-baby",
      "h1": "Christmas Pajamas for Baby",
      "meta_title": "Christmas Pajamas for Baby | FLOELI",
      "meta_description": "Find the perfect Christmas pajamas for your baby. Soft, festive, and photo-ready. Free shipping on orders $50+.",
      "target_core_page": "family-matching",
      "primary_cta": "Ready to coordinate your family's Christmas look? Browse our pajamas collection.",
      "cta_button_text": "Shop Christmas Pajamas",
      "cta_link": "/family-matching?filter=christmas-pajamas",
      "filter_param": "christmas-pajamas",
      "keywords": ["christmas pajamas for baby", "baby christmas pjs", "matching christmas pajamas"],
      "search_volume": 121570,
      "seasonality": "Christmas",
      "word_count_target": 2627,
      "priority_score": 182355,
      "h2_structure": [
        "What Makes Christmas Pajamas for Baby Special?",
        "Best Christmas Pajamas Styles for 2025",
        "How to Choose the Perfect Fit",
        "Styling Tips for Family Photos",
        "Size Guide by Age Group",
        "Where to Buy Christmas Pajamas for Baby",
        "Customer Reviews & Photos",
        "Frequently Asked Questions"
      ],
      "internal_links": [
        "/blog/christmas-outfits-for-newborns/",
        "/blog/best-christmas-dresses-for-toddlers/",
        "/blog/family-photo-outfit-ideas-christmas/"
      ],
      "featured_image": "/images/blog/christmas-pajamas-baby.jpg",
      "author": "Sarah Johnson",
      "published_at": "2025-10-25T10:00:00Z",
      "content": "<p>Full HTML content here...</p>"
    }
  ]
}
```

**To add a new hard-coded blog:**
1. Copy the structure above
2. Paste into `static-blogs.json` → `blog_posts` array
3. Update all fields
4. Deploy - it's automatically included!

---

### Option 2: Import from Excel (Automated)

**Convert `blog_funnel_system.xlsx` → `static-blogs.json`:**

```python
# Run this script in Temporary/ folder
import pandas as pd
import json

# Load Content Briefs sheet
df = pd.read_excel('blog_funnel_system.xlsx', sheet_name='Content Briefs')

# Convert to JSON structure
blog_posts = []
for _, row in df.iterrows():
    blog_posts.append({
        "blog_id": row['Blog ID'],
        "tier": row['Tier'],
        "title": row['Title'],
        "url_slug": row['URL'].replace('/blog/', '').replace('/', ''),
        "h1": row['H1'],
        "meta_title": row['Meta Title'],
        "meta_description": row['Meta Description'],
        "target_core_page": row['Target Core Page'],
        "primary_cta": row['Primary CTA'],
        "cta_button_text": row['CTA Button'],
        "cta_link": row['Link to'],
        "filter_param": row['Filter Param'],
        "keywords": row['Target Keywords'].split(', '),
        "search_volume": int(row['Search Volume']),
        "seasonality": row['Seasonality'],
        "word_count_target": int(row['Word Count Target']),
        "priority_score": int(row['Priority Score']),
        "h2_structure": row['H2 Structure'].split('\n'),
        "internal_links": row['Internal Blog Links'].split('\n'),
        "featured_image": "",  # Add later
        "author": "FLOELI Team",
        "published_at": "2025-10-25T10:00:00Z",  # Update with real date
        "content": ""  # Will be populated by writers
    })

# Save
output = {
    "blog_posts": blog_posts,
    "summary": {
        "total_static_blogs": len(blog_posts),
        "tier_2": len([b for b in blog_posts if b['tier'] == 'tier-2']),
        "tier_3": len([b for b in blog_posts if b['tier'] == 'tier-3']),
        "christmas_blogs": len([b for b in blog_posts if b['seasonality'] == 'Christmas'])
    }
}

with open('static-blogs.json', 'w') as f:
    json.dump(output, f, indent=2)

print(f"✅ Exported {len(blog_posts)} blogs to static-blogs.json")
```

Then copy `static-blogs.json` to `/lib/blog/static-blogs.json`

---

### Option 3: MDX Files (Future - Rich Content)

**File:** `/content/blog/christmas-pajamas-for-baby.mdx`

```mdx
---
blog_id: BLOG-117
tier: tier-2
title: Christmas Pajamas for Baby
url_slug: christmas-pajamas-for-baby
target_core_page: family-matching
cta_button_text: Shop Christmas Pajamas
cta_link: /family-matching?filter=christmas-pajamas
seasonality: Christmas
priority_score: 182355
---

# Christmas Pajamas for Baby

Are you planning your family's Christmas photos this year? Nothing makes holiday 
memories more special than adorable matching pajamas...

## What Makes Christmas Pajamas for Baby Special?

<ProductGrid products={babyChristmasPajamas} />

Content with React components...

<CTAButton href="/family-matching?filter=christmas-pajamas">
  Shop Christmas Pajamas
</CTAButton>
```

---

## 🎯 Usage Examples

### Example 1: Blog Index Page (`app/blog/page.tsx`)

```typescript
import { getAllBlogs } from 'lib/blog';

export default async function BlogIndexPage() {
  // Get all blogs (Shopify + Static merged automatically)
  const blogs = await getAllBlogs({
    includeStatic: true,
    sortBy: 'priority' // or 'date'
  });

  return (
    <div>
      <h1>All Blog Posts ({blogs.length})</h1>
      <div className="grid">
        {blogs.map(blog => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            excerpt={blog.excerpt}
            href={`/blog/${blog.handle}`}
            image={blog.image?.url}
            source={blog.source} // 'shopify' or 'static'
          />
        ))}
      </div>
    </div>
  );
}
```

---

### Example 2: Single Blog Page (`app/blog/[slug]/page.tsx`)

```typescript
import { getBlogByHandle } from 'lib/blog';
import { notFound } from 'next/navigation';

export default async function BlogPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  // Automatically checks BOTH Shopify and static blogs
  const blog = await getBlogByHandle(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <article>
      <h1>{blog.title}</h1>
      
      {/* Both Shopify and static blogs have same structure */}
      <div dangerouslySetInnerHTML={{ __html: blog.contentHtml }} />

      {/* Only static blogs have this metadata */}
      {blog.source === 'static' && blog.cta_button_text && (
        <CTASection
          copy={blog.primary_cta}
          buttonText={blog.cta_button_text}
          href={blog.cta_link}
        />
      )}

      {/* Source indicator (optional, for debugging) */}
      <small>Source: {blog.source}</small>
    </article>
  );
}
```

---

### Example 3: Core Page "Recently Viewed Blogs" Section

```typescript
// app/family-matching/page.tsx
import { getBlogsForCorePage } from 'lib/blog';

export default async function FamilyMatchingPage({ searchParams }) {
  const filter = searchParams.filter; // e.g., 'christmas-pajamas'

  // Get relevant blogs (both Shopify and static)
  const recentBlogs = await getBlogsForCorePage('family-matching', {
    filter,
    limit: 6
  });

  return (
    <div>
      {/* Collection products */}
      
      {/* Recently Viewed Blogs */}
      <section className="recent-blogs">
        <h2>Learn More</h2>
        <div className="grid">
          {recentBlogs.map(blog => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              href={`/blog/${blog.handle}`}
              image={blog.image?.url}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
```

---

### Example 4: Christmas Priority Blogs

```typescript
// app/christmas/page.tsx
import { getChristmasBlogs } from 'lib/blog';

export default async function ChristmasPage() {
  // Get top 20 Christmas blogs (sorted by priority)
  const christmasBlogs = await getChristmasBlogs(20);

  return (
    <div>
      <h1>Christmas Content ({christmasBlogs.length} blogs)</h1>
      <div className="grid">
        {christmasBlogs.map(blog => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            searchVolume={blog.search_volume}
            priorityScore={blog.priority_score}
            tier={blog.tier}
            href={`/blog/${blog.handle}`}
          />
        ))}
      </div>
    </div>
  );
}
```

---

### Example 5: Blog Stats Dashboard

```typescript
// app/admin/blog-stats/page.tsx
import { getBlogStats } from 'lib/blog';

export default async function BlogStatsPage() {
  const stats = await getBlogStats();

  return (
    <div>
      <h1>Blog Statistics</h1>
      
      <div className="stats">
        <StatCard label="Total Blogs" value={stats.total} />
        <StatCard label="Shopify Blogs" value={stats.shopify} />
        <StatCard label="Static Blogs" value={stats.static} />
      </div>

      <div className="stats">
        <StatCard label="Tier 2 Strategic" value={stats.tier2} />
        <StatCard label="Tier 3 Supporting" value={stats.tier3} />
        <StatCard label="Christmas Blogs" value={stats.christmas} />
      </div>

      <div className="breakdown">
        <h2>By Core Page</h2>
        <ul>
          <li>Mommy & Me: {stats.byCorePage['mommy-and-me']}</li>
          <li>Daddy & Me: {stats.byCorePage['daddy-and-me']}</li>
          <li>Family Matching: {stats.byCorePage['family-matching']}</li>
        </ul>
      </div>
    </div>
  );
}
```

---

## 🎨 Component Examples

### BlogCard Component

```typescript
// components/BlogCard.tsx
export function BlogCard({
  title,
  excerpt,
  href,
  image,
  source,
  tier,
  searchVolume,
  priorityScore
}: {
  title: string;
  excerpt?: string;
  href: string;
  image?: string;
  source?: 'shopify' | 'static';
  tier?: string;
  searchVolume?: number;
  priorityScore?: number;
}) {
  return (
    <a href={href} className="blog-card">
      {image && <img src={image} alt={title} />}
      
      <div className="content">
        <h3>{title}</h3>
        {excerpt && <p>{excerpt}</p>}
        
        {/* Optional metadata badges */}
        <div className="badges">
          {source === 'static' && <span className="badge">Hard-coded</span>}
          {tier && <span className="badge">{tier}</span>}
          {searchVolume && searchVolume > 10000 && (
            <span className="badge">High Volume: {searchVolume.toLocaleString()}</span>
          )}
        </div>
      </div>
    </a>
  );
}
```

### CTASection Component

```typescript
// components/CTASection.tsx
export function CTASection({
  copy,
  buttonText,
  href
}: {
  copy: string;
  buttonText: string;
  href: string;
}) {
  return (
    <section className="cta-section">
      <p>{copy}</p>
      <a href={href} className="cta-button">
        {buttonText}
      </a>
    </section>
  );
}
```

---

## 🔄 Workflow: From Excel to Published

### Phase 1: Content Creation (Writers)

1. **Receive assignment** from PM (Blog ID from Priority Queue)
2. **Write content** following Content Brief
3. **Save as HTML** or Markdown

### Phase 2: Add to System (Developer)

**Option A: One-by-one (for testing)**

```json
// Add to static-blogs.json manually
{
  "blog_posts": [
    {
      "blog_id": "BLOG-117",
      "title": "Christmas Pajamas for Baby",
      "url_slug": "christmas-pajamas-for-baby",
      "content": "<h1>Christmas Pajamas for Baby</h1><p>...</p>",
      // ... rest of fields from Content Brief
    }
  ]
}
```

**Option B: Bulk import (for production)**

```bash
# Run conversion script
cd /Users/lew/Documents/Headless/shopify-headless/Temporary
python3 convert_excel_to_json.py

# Copy output
cp static-blogs.json /Users/lew/Documents/Headless/shopify-headless/lib/blog/

# Deploy
git commit -m "Add 603 static blogs"
git push
```

### Phase 3: Publishing

- **No deployment needed!** Just add to `static-blogs.json` and commit
- Blogs appear immediately alongside Shopify blogs
- Use `getAllBlogs()` anywhere - automatically merged

---

## ✅ Benefits of Hybrid System

### ✅ **Flexibility**
- Use Shopify for blogs with comments, Shopify admin UI
- Use static JSON for bulk SEO content (603 blogs)
- Mix and match based on needs

### ✅ **No Vendor Lock-in**
- Not dependent on Shopify blog system
- Can migrate to another platform easily
- Full control over content structure

### ✅ **Performance**
- Static blogs = instant loading (no API calls)
- Cached at build time
- Better SEO (faster page loads)

### ✅ **Scalability**
- Add 603 blogs without hitting Shopify API limits
- No Shopify blog creation overhead
- Version control for all content (Git)

### ✅ **Developer-Friendly**
- TypeScript types for both sources
- Same `HybridArticle` interface
- Easy filtering, sorting, querying

---

## 🚀 Quick Start

### 1. Add Your First Static Blog

```json
// lib/blog/static-blogs.json
{
  "blog_posts": [
    {
      "blog_id": "BLOG-001",
      "tier": "tier-2",
      "title": "My First Hard-Coded Blog",
      "url_slug": "my-first-blog",
      "h1": "My First Hard-Coded Blog",
      "meta_title": "My First Blog | FLOELI",
      "meta_description": "This is a test blog added via JSON.",
      "target_core_page": "family-matching",
      "primary_cta": "Ready to shop?",
      "cta_button_text": "Shop Now",
      "cta_link": "/family-matching",
      "filter_param": "",
      "keywords": ["test", "blog"],
      "search_volume": 0,
      "seasonality": "Evergreen",
      "word_count_target": 1500,
      "priority_score": 1000,
      "h2_structure": ["Section 1", "Section 2"],
      "internal_links": [],
      "featured_image": "",
      "author": "Test Author",
      "published_at": "2025-10-24T00:00:00Z",
      "content": "<h1>My First Hard-Coded Blog</h1><p>Hello world! This blog is hard-coded in JSON.</p>"
    }
  ]
}
```

### 2. View It

```
Visit: /blog/my-first-blog

It will appear alongside Shopify blogs automatically!
```

### 3. Verify It Works

```typescript
// In any page
import { getAllBlogs, getBlogStats } from 'lib/blog';

const stats = await getBlogStats();
console.log('Static blogs:', stats.static); // Should be 1

const blog = await getBlogByHandle('my-first-blog');
console.log('Found blog:', blog?.title); // "My First Hard-Coded Blog"
console.log('Source:', blog?.source); // "static"
```

---

## 📋 Checklist: Adding 603 Blogs

- [ ] Run Excel → JSON conversion script
- [ ] Copy `static-blogs.json` to `/lib/blog/`
- [ ] Verify structure: `await getBlogStats()`
- [ ] Check Priority Queue works: `await getChristmasBlogs(20)`
- [ ] Test single blog: `/blog/christmas-pajamas-for-baby`
- [ ] Test core page: `/family-matching` → see "Recently Viewed Blogs"
- [ ] Deploy and monitor

---

**You now have a hybrid blog system that seamlessly merges Shopify blogs and hard-coded content.** 🎯

Add blogs via JSON = instant publishing, no API calls, full control!
