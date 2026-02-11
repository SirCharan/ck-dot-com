import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getAdjacentPosts } from "@/lib/blog";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { BlogVote } from "@/components/blog/BlogVote";
import { BlogShare } from "@/components/blog/BlogShare";
import { BlogRelatedReadings } from "@/components/blog/BlogRelatedReadings";
import { BlogStructuredData } from "@/components/blog/BlogStructuredData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

const SITE_URL = "https://charandeepkapoor.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const title = `${post.title} | Charandeep Kapoor`;
  const description = post.excerpt || post.title;
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title,
    description,
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "Charandeep Kapoor",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@yourasianquant",
      creator: "@yourasianquant",
      title,
      description,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const { prev, next } = getAdjacentPosts(slug);

  if (!post) notFound();

  return (
    <div className="blog-container">
      <BlogStructuredData post={post} slug={slug} />
      <header className="blog-header">
        <Link href="/blog" className="blog-back-link">
          ← Back to Writings
        </Link>
      </header>

      <main className="blog-main">
        <article>
          <h1 className="blog-post-title">{post.title}</h1>

          <div className="blog-post-body">
            <MarkdownRenderer content={post.content} />
          </div>

          {slug === "perps-payoff" && (
            <BlogRelatedReadings
              slugs={[
                "exchange-payoffs",
                "lps-downside",
                "web2-perps",
                "clubs-perps",
                "why-perps",
                "perps-next",
              ]}
              title="Read in order"
            />
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="blog-tags mt-10">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <BlogVote slug={slug} />
            <BlogShare slug={slug} title={post.title} />
          </div>

          <nav className="blog-post-nav">
            <div className="blog-post-nav-inner">
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="blog-post-nav-link blog-post-nav-prev">
                  <span className="blog-post-nav-label">← Newer</span>
                  <span className="blog-post-nav-title">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/blog/${next.slug}`} className="blog-post-nav-link blog-post-nav-next">
                  <span className="blog-post-nav-label">Older →</span>
                  <span className="blog-post-nav-title">{next.title}</span>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </nav>

          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link href="/blog" className="blog-back-link">
              ← Back to Writings
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
