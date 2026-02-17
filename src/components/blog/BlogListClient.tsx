"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BlogVote } from "@/components/blog/BlogVote";
import { BlogProtectedPerpsCollapsible } from "@/components/blog/BlogProtectedPerpsCollapsible";
import { BlogSeriesCollapsible } from "@/components/blog/BlogSeriesCollapsible";

interface SerializedPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  readingTime: number;
}

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

const VC_JOURNEY_SLUGS = new Set([
  "the-future",
  "my-ideal-company",
]);

const HIDDEN_SLUGS = new Set([...PROTECTED_PERPS_SUB_SLUGS, ...VC_JOURNEY_SLUGS]);

interface BlogListClientProps {
  posts: SerializedPost[];
  subArticles: SerializedPost[];
  vcJourneyArticles?: SerializedPost[];
}

export function BlogListClient({ posts, subArticles, vcJourneyArticles = [] }: BlogListClientProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const visible = posts.filter((p) => !HIDDEN_SLUGS.has(p.slug));
    if (!query.trim()) return visible;
    const q = query.toLowerCase();
    return visible.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }, [posts, query]);

  return (
    <>
      <div className="blog-search">
        <input
          type="text"
          placeholder="Search writings..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="blog-search-input"
          aria-label="Search writings"
        />
      </div>

      <div className="blog-list">
        {filtered.length === 0 ? (
          <p className="blog-empty">
            {query ? "No posts match your search." : "No posts yet."}
          </p>
        ) : (
          filtered.map((post) => (
            <React.Fragment key={post.slug}>
              <article className="blog-list-item">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <Link href={`/blog/${post.slug}`} className="blog-list-title">
                      {post.title}
                    </Link>
                    <span className="blog-list-date">
                      {post.date} · {post.readingTime} min read
                    </span>
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
                    {post.slug === "perps-payoff" && subArticles.length > 0 && !query && (
                      <BlogProtectedPerpsCollapsible
                        posts={subArticles}
                        className="mt-4"
                      />
                    )}
                    {post.slug === "vc-motivations" && vcJourneyArticles.length > 0 && !query && (
                      <BlogSeriesCollapsible
                        title="My VC Journey"
                        posts={vcJourneyArticles}
                        numbered={false}
                        className="mt-4"
                      />
                    )}
                  </div>
                  <BlogVote slug={post.slug} className="shrink-0 mt-1" />
                </div>
              </article>
            </React.Fragment>
          ))
        )}
      </div>
    </>
  );
}
