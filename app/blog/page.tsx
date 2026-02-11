import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogVote } from "@/components/blog/BlogVote";

const SUB_ARTICLE_SLUGS = new Set([
  "exchange-payoffs",
  "lps-downside",
  "web2-perps",
  "clubs-perps",
  "why-perps",
  "perps-next",
]);

export const metadata: Metadata = {
  title: "Writings | Charandeep Kapoor",
  description:
    "Writings on crypto, quant trading, markets, and building systems.",
  openGraph: {
    type: "website",
    url: "https://charandeepkapoor.com/blog",
    title: "Writings | Charandeep Kapoor",
    description: "Writings on crypto, quant trading, markets, and building systems.",
    siteName: "Charandeep Kapoor",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Charandeep Kapoor Writings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourasianquant",
    creator: "@yourasianquant",
    title: "Writings | Charandeep Kapoor",
    description: "Writings on crypto, quant trading, markets, and building systems.",
    images: ["/og-image.png"],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="blog-container">
      <header className="blog-header">
        <Link href="/" className="blog-back-link">
          ← Back to Home
        </Link>
      </header>

      <main className="blog-main">
        <h1 className="blog-title">Writings</h1>

        <div className="blog-list">
          {posts.length === 0 ? (
            <p className="blog-empty">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className={`blog-list-item ${SUB_ARTICLE_SLUGS.has(post.slug) ? "blog-list-item--sub" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <Link href={`/blog/${post.slug}`} className="blog-list-title">
                      {post.title}
                    </Link>
                    {post.excerpt && (
                      <p className="blog-list-excerpt">{post.excerpt}</p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="blog-tags">
                        {post.tags.map((tag) => (
                          <span key={tag} className="blog-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <BlogVote slug={post.slug} className="shrink-0 mt-1" />
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
