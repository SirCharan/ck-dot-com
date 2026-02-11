import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Charandeep Kapoor`,
    description: post.excerpt || post.title,
  };
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="blog-container">
      <header className="blog-header">
        <Link href="/blog" className="blog-back-link">
          ← Back to Writings
        </Link>
      </header>

      <main className="blog-main">
        <article>
          <h1 className="blog-post-title">{post.title}</h1>
          <time className="blog-post-date" dateTime={post.date}>
            {formatDate(post.date)}
          </time>

          <div className="blog-post-body">
            <MarkdownRenderer content={post.content} />
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="blog-tags mt-10">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

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
