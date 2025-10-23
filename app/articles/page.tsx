import Footer from 'components/layout/footer';
import { getBlog } from 'lib/shopify';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Articles | KITTALY',
  description:
    'Read the latest news, style guides, and stories from KITTALY. Discover fashion trends, sustainability insights, and more.'
};

export default async function ArticlesPage() {
  const articles = await getBlog('news');

  // Featured article (most recent)
  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="border-b border-neutral-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h1 className="text-3xl font-bold uppercase tracking-wider text-[#1D2022] md:text-4xl">
              Articles
            </h1>
            <p className="mt-3 text-base text-neutral-600">
              Latest news, style guides, and stories from KITTALY
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-screen-xl px-4 py-12 md:px-6 md:py-16">
          {/* Featured Article */}
          {featuredArticle && (
            <section className="mb-16 border-b border-neutral-200 pb-16">
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-500">
                Featured Article
              </p>
              <Link
                href={`/articles/${featuredArticle.handle}`}
                className="group grid gap-8 lg:grid-cols-2"
              >
                {featuredArticle.image && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                    <Image
                      src={featuredArticle.image.url}
                      alt={featuredArticle.image.altText || featuredArticle.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center">
                  <div className="mb-3 flex items-center gap-3 text-sm text-neutral-500">
                    <time dateTime={featuredArticle.publishedAt}>
                      {new Date(featuredArticle.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </time>
                    {featuredArticle.author && (
                      <>
                        <span>•</span>
                        <span>{featuredArticle.author.name}</span>
                      </>
                    )}
                  </div>
                  <h2 className="mb-4 text-3xl font-bold uppercase tracking-wider text-[#1D2022] transition-colors group-hover:text-neutral-600 md:text-4xl">
                    {featuredArticle.title}
                  </h2>
                  {featuredArticle.excerpt && (
                    <p className="mb-4 text-base text-neutral-600 line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                  )}
                  <span className="inline-flex items-center text-sm font-medium uppercase tracking-wider text-black">
                    Read Article
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </section>
          )}

          {/* Quick Links to Info Pages */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
              Discover More
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/about"
                className="group border border-neutral-200 p-6 transition-colors hover:border-black"
              >
                <h3 className="mb-2 text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  About KITTALY
                </h3>
                <p className="mb-4 text-sm text-neutral-600">
                  Learn about our story, mission, and values
                </p>
                <span className="inline-flex items-center text-xs font-medium uppercase tracking-wider text-black">
                  Read More
                  <svg
                    className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/sustainability"
                className="group border border-neutral-200 p-6 transition-colors hover:border-black"
              >
                <h3 className="mb-2 text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Sustainability
                </h3>
                <p className="mb-4 text-sm text-neutral-600">
                  Our commitment to ethical and sustainable fashion
                </p>
                <span className="inline-flex items-center text-xs font-medium uppercase tracking-wider text-black">
                  Read More
                  <svg
                    className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/careers"
                className="group border border-neutral-200 p-6 transition-colors hover:border-black"
              >
                <h3 className="mb-2 text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Careers
                </h3>
                <p className="mb-4 text-sm text-neutral-600">
                  Join our team and shape the future of fashion
                </p>
                <span className="inline-flex items-center text-xs font-medium uppercase tracking-wider text-black">
                  Read More
                  <svg
                    className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/press"
                className="group border border-neutral-200 p-6 transition-colors hover:border-black"
              >
                <h3 className="mb-2 text-lg font-bold uppercase tracking-wider text-[#1D2022]">
                  Press
                </h3>
                <p className="mb-4 text-sm text-neutral-600">
                  Media resources and press inquiries
                </p>
                <span className="inline-flex items-center text-xs font-medium uppercase tracking-wider text-black">
                  Read More
                  <svg
                    className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </section>

          {/* All Articles Grid */}
          {remainingArticles.length > 0 && (
            <section>
              <h2 className="mb-8 text-2xl font-bold uppercase tracking-wider text-[#1D2022]">
                All Articles
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {remainingArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.handle}`}
                    className="group"
                  >
                    <article>
                      {article.image && (
                        <div className="relative mb-4 aspect-[16/9] overflow-hidden bg-neutral-100">
                          <Image
                            src={article.image.url}
                            alt={article.image.altText || article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <time dateTime={article.publishedAt}>
                          {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </time>
                        {article.author && (
                          <>
                            <span>•</span>
                            <span>{article.author.name}</span>
                          </>
                        )}
                      </div>
                      <h3 className="mb-2 mt-3 text-xl font-bold uppercase tracking-wider text-[#1D2022] transition-colors group-hover:text-neutral-600">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-sm text-neutral-600 line-clamp-2">{article.excerpt}</p>
                      )}
                      {article.tags && article.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs uppercase tracking-wider text-neutral-500"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {articles.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-neutral-600">No articles available at the moment.</p>
              <p className="mt-2 text-sm text-neutral-500">Check back soon for updates!</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
