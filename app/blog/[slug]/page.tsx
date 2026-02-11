import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getAdjacentPosts } from "@/lib/blog";
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const { prev, next } = getAdjacentPosts(slug);

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

          <nav className="blog-post-nav">
            <div className="blog-post-nav-inner">
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="blog-post-nav-link blog-post-nav-prev">
                  <span className="blog-post-nav-label">← Newer</span>
                  <span className="blog-post-nav-title">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/blog/${next.slug}`} className="blog-post-nav-link blog-post-nav-next">
                  <span className="blog-post-nav-label">Older →</span>
                  <span className="blog-post-nav-title">{next.title}</span>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </nav>

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
