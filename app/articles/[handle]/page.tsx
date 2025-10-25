import { getAllBlogs, getBlogByHandle } from 'lib/blog';
import { extractFAQSchema } from 'lib/blog/extract-faqs';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ShareButton from './share-button';

type Props = {
  params: Promise<{
    handle: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  // Check BOTH Shopify and static blogs
  const article = await getBlogByHandle(handle);

  if (!article) {
    return {
      title: 'Article Not Found | FLOELI',
      description: 'The article you are looking for could not be found.'
    };
  }

  return {
    title: article.seo?.title || `${article.title} | FLOELI`,
    description: article.seo?.description || article.excerpt || article.title,
    openGraph: article.image
      ? {
          images: [
            {
              url: article.image.url,
              width: article.image.width,
              height: article.image.height,
              alt: article.image.altText || article.title
            }
          ]
        }
      : undefined
  };
}

export default async function ArticlePage({ params }: Props) {
  const { handle } = await params;
  // Check BOTH Shopify and static blogs
  const article = await getBlogByHandle(handle);

  if (!article) {
    notFound();
  }

  // Get related articles (from both sources)
  const allArticles = await getAllBlogs({ includeStatic: true });
  const relatedArticles = allArticles
    .filter((a) => a.handle !== article.handle)
    .slice(0, 3);

  // Generate structured data schemas for SEO
  const baseUrl = 'https://floeli.com';
  
  // BlogPosting Schema
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    image: article.image ? article.image.url : `${baseUrl}/opengraph-image.jpg`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author?.name || 'FLOELI Team',
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'FLOELI',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    },
    description: article.excerpt || article.seo?.description || article.title,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/articles/${article.handle}`
    }
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: `${baseUrl}/articles`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${baseUrl}/articles/${article.handle}`
      }
    ]
  };

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FLOELI',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Premium family matching outfits designed in Spain with 13 years of refined craftsmanship',
    sameAs: [
      'https://instagram.com/floeli',
      'https://pinterest.com/floeli'
    ]
  };

  // FAQ Schema (if FAQs exist in content)
  const faqSchema = extractFAQSchema(article.contentHtml || article.content);

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data - SEO Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

        {/* Breadcrumb */}
        <nav className="border-b border-neutral-200 bg-white py-4">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <ol className="flex items-center gap-2 text-sm text-neutral-600">
              <li>
                <Link href="/" className="hover:text-black">
                  Home
                </Link>
              </li>
              <li>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link href="/articles" className="hover:text-black">
                  Articles
                </Link>
              </li>
              <li>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-black">{article.title}</li>
            </ol>
          </div>
        </nav>

        {/* Article Header */}
        <header className="border-b border-neutral-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            {/* Meta */}
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
              {article.author && (
                <>
                  <span>•</span>
                  <span>By {article.author.name}</span>
                </>
              )}
              {article.tags && article.tags.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-xs uppercase tracking-wider text-neutral-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-5xl">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="mt-6 text-lg text-neutral-600">{article.excerpt}</p>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {article.image && (
          <div className="border-b border-neutral-200">
            <div className="mx-auto max-w-6xl">
              <div className="relative aspect-[21/9] overflow-hidden bg-neutral-100">
                <Image
                  src={article.image.url}
                  alt={article.image.altText || article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <div
              className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wider prose-h2:text-2xl prose-h3:text-xl prose-p:text-neutral-700 prose-a:text-black prose-a:underline hover:prose-a:text-neutral-600 prose-strong:text-black prose-img:rounded-none"
              dangerouslySetInnerHTML={{ __html: article.contentHtml || article.content }}
            />

            {/* CTA Section for Static Blogs */}
            {article.source === 'static' && article.cta_link && article.cta_button_text && (
              <div className="my-16 border-2 border-[#1D2022] bg-white px-8 py-12 text-center md:px-12">
                {article.primary_cta && (
                  <h3 className="mb-4 text-2xl font-bold uppercase tracking-widest text-[#1D2022]">
                    {article.primary_cta}
                  </h3>
                )}
                <p className="mx-auto mb-8 max-w-2xl text-neutral-600">
                  Designed in Spain with 13 years of refined craftsmanship. Timeless pieces that celebrate
                  real families and real moments.
                </p>
                <div className="mb-8 flex flex-wrap justify-center gap-6 text-xs uppercase tracking-wider text-neutral-600">
                  <span>Premium Organic Fabrics</span>
                  <span>•</span>
                  <span>Sizes for Everyone</span>
                  <span>•</span>
                  <span>Free Shipping €50+</span>
                </div>
                <Link
                  href={article.cta_link}
                  className="inline-block border-2 border-[#1D2022] bg-[#1D2022] px-10 py-3.5 text-xs font-medium uppercase tracking-widest text-white transition-all duration-200 hover:bg-white hover:text-[#1D2022]"
                >
                  {article.cta_button_text}
                </Link>
              </div>
            )}
          </div>
        </article>

        {/* Share Section */}
        <section className="border-t border-neutral-200 bg-neutral-50 py-8">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium uppercase tracking-wider text-black">
                Share This Article
              </p>
              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://floeli.com/articles/${article.handle}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 transition-colors hover:text-black"
                  aria-label="Share on Twitter"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://floeli.com/articles/${article.handle}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 transition-colors hover:text-black"
                  aria-label="Share on Facebook"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <ShareButton title={article.title} handle={article.handle} />
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-neutral-200 py-12 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 md:px-6">
              <h2 className="mb-8 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
                Related Articles
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/articles/${relatedArticle.handle}`}
                    className="group"
                  >
                    <article>
                      {relatedArticle.image && (
                        <div className="relative mb-4 aspect-[16/9] overflow-hidden bg-neutral-100">
                          <Image
                            src={relatedArticle.image.url}
                            alt={relatedArticle.image.altText || relatedArticle.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="text-xs text-neutral-500">
                        <time dateTime={relatedArticle.publishedAt}>
                          {new Date(relatedArticle.publishedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </time>
                      </div>
                      <h3 className="mb-2 mt-2 text-lg font-bold uppercase tracking-wider text-[#1D2022] transition-colors group-hover:text-neutral-600">
                        {relatedArticle.title}
                      </h3>
                      {relatedArticle.excerpt && (
                        <p className="text-sm text-neutral-600 line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                      )}
                    </article>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/articles"
                  className="inline-block border-2 border-black bg-white px-8 py-3 text-sm font-medium uppercase tracking-wider text-black transition-colors duration-200 hover:bg-black hover:text-white"
                >
                  View All Articles
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
  );
}
