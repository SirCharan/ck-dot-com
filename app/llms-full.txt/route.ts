import fs from "fs";
import path from "path";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://charandeepkapoor.com";

export const dynamic = "force-static";

export async function GET() {
  const manifest = fs.readFileSync(
    path.join(process.cwd(), "public", "llms.txt"),
    "utf-8",
  );
  const posts = getAllPosts();

  const body = [
    manifest.trim(),
    ...posts.map(
      (post) =>
        `---\n# ${post.title}\nURL: ${SITE_URL}/blog/${post.slug}\nPublished: ${post.date}\n\n${post.rawContent.trim()}`,
    ),
  ].join("\n\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "index, follow",
    },
  });
}
