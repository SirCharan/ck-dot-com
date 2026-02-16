"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BlogVote } from "@/components/blog/BlogVote";
interface CollapsiblePost {
  slug: string;
  title: string;
  excerpt?: string;
  tags?: string[];
}

interface BlogProtectedPerpsCollapsibleProps {
  posts: CollapsiblePost[];
  className?: string;
}

export function BlogProtectedPerpsCollapsible({ posts, className }: BlogProtectedPerpsCollapsibleProps) {
  const [open, setOpen] = useState(false);

  if (posts.length === 0) return null;

  return (
    <Collapsible open={open} onOpenChange={setOpen} className={`blog-perps-collapsible ${className ?? ""}`}>
      <CollapsibleTrigger className="blog-perps-trigger">
        {open ? (
          <ChevronDown className="blog-perps-icon" />
        ) : (
          <ChevronRight className="blog-perps-icon" />
        )}
        <span className="blog-perps-trigger-text">Protected Perps</span>
        <span className="blog-perps-trigger-count">({posts.length} articles)</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="blog-perps-list">
          {posts.map((post, i) => (
            <article key={post.slug} className="blog-list-item blog-list-item--sub">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <Link href={`/blog/${post.slug}`} className="blog-list-title">
                    <span className="blog-perps-num">{i + 1}.</span> {post.title}
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
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
