import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function LatestEssay() {
  const posts = getAllPosts();
  const latest = posts[0];
  if (!latest) return null;

  return (
    <section className="py-10 md:py-14 rule">
      <p className="kicker mb-4">Latest essay</p>
      <Link
        href={`/blog/${latest.slug}`}
        className="display text-2xl md:text-3xl text-ink hover:text-accent transition-colors leading-snug"
      >
        {latest.title}
      </Link>
      <div className="mt-2 text-sm text-mute">
        {formatDate(latest.date)} · {latest.readingTime} min read
      </div>
      {latest.excerpt && (
        <p className="mt-4 text-base text-ink/85 leading-relaxed max-w-[62ch]">
          {latest.excerpt}
        </p>
      )}
      <div className="mt-6">
        <Link href="/blog" className="link-ink text-sm">
          All writings →
        </Link>
      </div>
    </section>
  );
}
