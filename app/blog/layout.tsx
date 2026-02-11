/**
 * Blog layout: Codex-style light theme, minimal chrome.
 * Uses CSS variables for light mode (overrides root dark theme when .blog-root is present).
 */

import Link from "next/link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-root min-h-screen">
      <nav className="blog-nav">
        <div className="blog-nav-inner">
          <Link href="/" className="blog-nav-brand">
            Charandeep Kapoor
          </Link>
          <div className="blog-nav-links">
            <Link href="/" className="blog-nav-link">Home</Link>
            <span className="blog-nav-sep">·</span>
            <Link href="/blog" className="blog-nav-link">Writings</Link>
            <span className="blog-nav-sep">·</span>
            <a href="/blog/feed.xml" className="blog-nav-link" target="_blank" rel="noopener noreferrer">RSS</a>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
