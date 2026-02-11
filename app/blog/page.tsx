import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { BlogVote } from "@/components/blog/BlogVote";
import { BlogProtectedPerpsCollapsible } from "@/components/blog/BlogProtectedPerpsCollapsible";

/* Sub-articles shown in collapsible under perps-payoff */
const PROTECTED_PERPS_SUB_SLUGS = new Set([
  "exchange-payoffs",
  "lps-downside",
  "web2-perps",
  "clubs-perps",
  "why-perps",
  "perps-next",
  "perps-pm-design",
  "extract-money",
]);

const PROTECTED_PERPS_SUB_ORDER = [
  "exchange-payoffs",
  "lps-downside",
  "web2-perps",
  "clubs-perps",
  "why-perps",
  "perps-next",
  "perps-pm-design",
  "extract-money",
];

export const metadata: Metadata = {
  title: "Writings",
  description:
    "Essays on protected perps, DeFi, trading psychology, crypto markets, AI, and life philosophy. By Charandeep Kapoor, crypto and quant finance expert.",
  keywords: [
    "Charandeep Kapoor",
    "protected perps",
    "DeFi",
    "trading psychology",
    "crypto essays",
    "quant finance",
  ],
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
  const allPosts = getAllPosts();
  const subArticles = PROTECTED_PERPS_SUB_ORDER.map((s) => getPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p !== null);

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
          {allPosts.length === 0 ? (
            <p className="blog-empty">No posts yet.</p>
          ) : (
            <>
              {allPosts.map((post) => {
                if (PROTECTED_PERPS_SUB_SLUGS.has(post.slug)) return null;
                return (
                  <article key={post.slug} className="blog-list-item">
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
                        {post.slug === "perps-payoff" && subArticles.length > 0 && (
                          <BlogProtectedPerpsCollapsible
                            posts={subArticles}
                            className="mt-4"
                          />
                        )}
                      </div>
                      <BlogVote slug={post.slug} className="shrink-0 mt-1" />
                    </div>
                  </article>
                );
              })}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
