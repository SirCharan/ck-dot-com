import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writings | Charandeep Kapoor",
  description:
    "Writings on crypto, quant trading, markets, and building systems.",
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
        <p className="blog-intro">
          Essays and notes on crypto, quantitative trading, and building systems at the intersection of math and markets.
        </p>

        <div className="blog-list">
          {posts.length === 0 ? (
            <p className="blog-empty">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <article key={post.slug} className="blog-list-item">
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
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
