"use client";

import { useMemo } from "react";
import { slugify } from "@/lib/slugify";

interface TocItem {
  level: number;
  text: string;
  id: string;
}

interface BlogTableOfContentsProps {
  content: string;
}

export function BlogTableOfContents({ content }: BlogTableOfContentsProps) {
  const headings = useMemo(() => {
    const items: TocItem[] = [];
    const lines = content.split("\n");
    let inCodeBlock = false;

    for (const line of lines) {
      if (line.trim().startsWith("```")) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      if (inCodeBlock) continue;

      const match = line.match(/^(#{2,3})\s+(.+)/);
      if (match) {
        items.push({
          level: match[1].length,
          text: match[2].replace(/[*_`]/g, ""),
          id: slugify(match[2].replace(/[*_`]/g, "")),
        });
      }
    }
    return items;
  }, [content]);

  if (headings.length < 2) return null;

  return (
    <nav className="blog-toc" aria-label="Table of contents">
      <h2 className="blog-toc-title">Contents</h2>
      <ul className="blog-toc-list">
        {headings.map((h) => (
          <li
            key={h.id}
            className={h.level === 3 ? "blog-toc-item blog-toc-item--nested" : "blog-toc-item"}
          >
            <a href={`#${h.id}`} className="blog-toc-link">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
