import Link from "next/link";
import { getPostBySlug } from "@/lib/blog";

interface BlogRelatedReadingsProps {
  slugs: string[];
  title?: string;
}

export function BlogRelatedReadings({ slugs, title = "Read in order" }: BlogRelatedReadingsProps) {
  const posts = slugs
    .map((s) => getPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p !== null);

  if (posts.length === 0) return null;

  return (
    <div className="blog-related-readings">
      <h3 className="blog-related-readings-title">{title}</h3>
      <ol className="blog-related-readings-list">
        {posts.map((post, i) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="blog-related-readings-item">
              <span className="blog-related-readings-num">{i + 1}</span>
              <div className="blog-related-readings-content">
                <span className="blog-related-readings-item-title">{post.title}</span>
                {post.excerpt && (
                  <span className="blog-related-readings-excerpt">{post.excerpt}</span>
                )}
              </div>
              <span className="blog-related-readings-arrow">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
