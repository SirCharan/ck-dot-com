/**
 * Blog utilities: read markdown posts from /content/blog/
 * Uses gray-matter for frontmatter, works with Next.js generateStaticParams
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  content: string;
  rawContent: string;
}

/**
 * Get all blog post slugs (for generateStaticParams)
 */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_") && f.toLowerCase() !== "readme.md");
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug: data.slug || slug,
    title: data.title || "Untitled",
    date: data.date || "",
    excerpt: data.excerpt,
    tags: data.tags || [],
    content,
    rawContent: raw,
  };
}

/**
 * Get all posts, sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  const slugs = getAllSlugs();
  const posts: BlogPost[] = [];

  for (const file of slugs) {
    const slug = file.replace(/\.md$/, "");
    const post = getPostBySlug(slug);
    if (post) posts.push(post);
  }

  return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
}
