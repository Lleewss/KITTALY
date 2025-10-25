import { getArticle as getShopifyArticle, getBlog as getShopifyBlog } from 'lib/shopify';
import { Article } from 'lib/shopify/types';
import 'server-only';
import staticBlogsData from './static-blogs.json';

/**
 * HYBRID BLOG SYSTEM
 * Seamlessly combines Shopify blogs and hard-coded static blogs
 * 
 * Sources:
 * 1. Shopify Blog (via Storefront API)
 * 2. Static JSON files (from blog_funnel_system.json)
 * 3. MDX files (optional, for rich content)
 */

export type StaticBlog = {
  blog_id: string;
  tier: string;
  title: string;
  url_slug: string;
  h1: string;
  meta_title: string;
  meta_description: string;
  target_core_page: string;
  primary_cta: string;
  cta_button_text: string;
  cta_link: string;
  filter_param: string;
  keywords: string[];
  search_volume: number;
  seasonality: string;
  word_count_target: number;
  priority_score: number;
  h2_structure: string[];
  internal_links: string[];
  featured_image?: string | { url: string; alt?: string };
  author?: string;
  published_at?: string;
  content?: string; // HTML or MDX content
  source?: 'static';
};

export type HybridArticle = Article & {
  source: 'shopify' | 'static';
  tier?: string;
  target_core_page?: string;
  primary_cta?: string;
  cta_button_text?: string;
  cta_link?: string;
  filter_param?: string;
  keywords?: string[];
  search_volume?: number;
  seasonality?: string;
  priority_score?: number;
  internal_links?: string[];
};

/**
 * Convert static blog to Article format
 */
function staticBlogToArticle(blog: StaticBlog & { source?: 'static' }): HybridArticle {
  // Clean excerpt: remove title if meta_description starts with it
  let excerpt = blog.meta_description;
  if (excerpt && excerpt.startsWith(blog.title)) {
    // Remove title and any following punctuation/space
    excerpt = excerpt.substring(blog.title.length).replace(/^[\.\s]+/, '');
  }
  
  // Handle featured_image - could be string or object
  const featuredImageUrl = typeof blog.featured_image === 'string' 
    ? blog.featured_image 
    : blog.featured_image?.url;
  
  return {
    id: blog.blog_id,
    title: blog.title,
    handle: blog.url_slug,
    publishedAt: blog.published_at || new Date().toISOString(),
    excerpt: excerpt,
    content: blog.content || '',
    contentHtml: blog.content || '',
    seo: {
      title: blog.meta_title,
      description: blog.meta_description
    },
    image: featuredImageUrl ? {
      url: featuredImageUrl,
      altText: blog.title,
      width: 1200,
      height: 630
    } : undefined,
    author: {
      name: blog.author || 'FLOELI Team'
    },
    tags: blog.keywords || [],
    // Hybrid metadata
    source: 'static' as const,
    tier: blog.tier,
    target_core_page: blog.target_core_page,
    primary_cta: blog.primary_cta,
    cta_button_text: blog.cta_button_text,
    cta_link: blog.cta_link,
    filter_param: blog.filter_param,
    keywords: blog.keywords,
    search_volume: blog.search_volume,
    seasonality: blog.seasonality,
    priority_score: blog.priority_score,
    internal_links: blog.internal_links
  };
}

/**
 * Get all blogs (Shopify + Static) merged
 */
export async function getAllBlogs(
  options: {
    blogHandle?: string;
    includeStatic?: boolean;
    sortBy?: 'date' | 'priority';
    filterBy?: {
      seasonality?: string;
      tier?: string;
      targetCorePage?: string;
    };
  } = {}
): Promise<HybridArticle[]> {
  const {
    blogHandle = 'news',
    includeStatic = true,
    sortBy = 'date',
    filterBy
  } = options;

  // Get Shopify blogs
  const shopifyBlogs = await getShopifyBlog(blogHandle);
  const shopifyArticles: HybridArticle[] = shopifyBlogs.map(blog => ({
    ...blog,
    source: 'shopify' as const
  }));

  // Get static blogs
  let staticArticles: HybridArticle[] = [];
  if (includeStatic) {
    staticArticles = (staticBlogsData.blog_posts || [])
      .map((blog: any) => staticBlogToArticle({ ...blog, source: 'static' as const }));
    
    // De-duplicate by handle (url_slug) - keep only first occurrence of each unique slug
    const seenHandles = new Set<string>();
    staticArticles = staticArticles.filter(article => {
      if (seenHandles.has(article.handle)) {
        return false; // Skip duplicate
      }
      seenHandles.add(article.handle);
      return true; // Keep first occurrence
    });
  }

  // Merge
  let allBlogs = [...shopifyArticles, ...staticArticles];

  // Apply filters
  if (filterBy) {
    if (filterBy.seasonality) {
      allBlogs = allBlogs.filter(blog =>
        blog.seasonality?.toLowerCase() === filterBy.seasonality?.toLowerCase()
      );
    }
    if (filterBy.tier) {
      allBlogs = allBlogs.filter(blog => blog.tier === filterBy.tier);
    }
    if (filterBy.targetCorePage) {
      allBlogs = allBlogs.filter(blog =>
        blog.target_core_page === filterBy.targetCorePage
      );
    }
  }

  // Sort
  if (sortBy === 'priority') {
    allBlogs.sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0));
  } else {
    allBlogs.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  return allBlogs;
}

/**
 * Get single blog by handle (checks both Shopify and Static)
 */
export async function getBlogByHandle(
  handle: string,
  blogHandle: string = 'news'
): Promise<HybridArticle | undefined> {
  // Try Shopify first
  const shopifyArticle = await getShopifyArticle(blogHandle, handle);
  if (shopifyArticle) {
    return {
      ...shopifyArticle,
      source: 'shopify' as const
    };
  }

  // Try static blogs
  const staticBlog = (staticBlogsData.blog_posts || []).find(
    (blog: any) => blog.url_slug === handle
  );

  if (staticBlog) {
    return staticBlogToArticle({ ...staticBlog, source: 'static' as const });
  }

  return undefined;
}

/**
 * Get blogs for specific core page (for "Recently Viewed" section)
 */
export async function getBlogsForCorePage(
  corePageSlug: string,
  options: {
    limit?: number;
    filter?: string;
  } = {}
): Promise<HybridArticle[]> {
  const { limit = 6, filter } = options;

  const allBlogs = await getAllBlogs({
    includeStatic: true,
    sortBy: 'priority',
    filterBy: {
      targetCorePage: corePageSlug
    }
  });

  // Further filter by specific filter param if provided
  let filtered = allBlogs;
  if (filter) {
    filtered = allBlogs.filter(blog =>
      blog.filter_param?.includes(filter)
    );
  }

  return filtered.slice(0, limit);
}

/**
 * Get Christmas priority blogs
 */
export async function getChristmasBlogs(limit: number = 20): Promise<HybridArticle[]> {
  return getAllBlogs({
    includeStatic: true,
    sortBy: 'priority',
    filterBy: {
      seasonality: 'Christmas'
    }
  }).then(blogs => blogs.slice(0, limit));
}

/**
 * Get blog statistics (for admin/reporting)
 */
export async function getBlogStats() {
  const allBlogs = await getAllBlogs({ includeStatic: true });

  const shopifyCount = allBlogs.filter(b => b.source === 'shopify').length;
  const staticCount = allBlogs.filter(b => b.source === 'static').length;

  const tier2Count = allBlogs.filter(b => b.tier === 'tier-2').length;
  const tier3Count = allBlogs.filter(b => b.tier === 'tier-3').length;

  const christmasCount = allBlogs.filter(b => 
    b.seasonality?.toLowerCase() === 'christmas'
  ).length;

  const corePageBreakdown = {
    'mommy-and-me': allBlogs.filter(b => b.target_core_page === 'mommy-and-me').length,
    'daddy-and-me': allBlogs.filter(b => b.target_core_page === 'daddy-and-me').length,
    'family-matching': allBlogs.filter(b => b.target_core_page === 'family-matching').length
  };

  return {
    total: allBlogs.length,
    shopify: shopifyCount,
    static: staticCount,
    tier2: tier2Count,
    tier3: tier3Count,
    christmas: christmasCount,
    byCorePage: corePageBreakdown
  };
}

/**
 * Check if a blog exists (either source)
 */
export async function blogExists(handle: string): Promise<boolean> {
  const blog = await getBlogByHandle(handle);
  return !!blog;
}
