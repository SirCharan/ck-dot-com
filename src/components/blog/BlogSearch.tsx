"use client";

import { useState, useMemo } from "react";

interface SerializedPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  readingTime: number;
}

interface BlogSearchProps {
  posts: SerializedPost[];
  children: (filtered: SerializedPost[]) => React.ReactNode;
}

export function BlogSearch({ posts, children }: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.toLowerCase();
    return posts.filter(
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
      {children(filtered)}
    </>
  );
}
