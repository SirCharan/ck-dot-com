import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return new Response(post.rawContent, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "index, follow",
    },
  });
}
