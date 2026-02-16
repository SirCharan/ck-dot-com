import { ImageResponse } from "next/og";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

export const runtime = "nodejs";
export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((file) => ({ slug: file.replace(/\.md$/, "") }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title || "Untitled";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: title.length > 60 ? 42 : 56,
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            marginBottom: 32,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: "#a78bfa",
              fontWeight: 500,
            }}
          >
            Charandeep Kapoor
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#666",
            }}
          >
            ·
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#888",
            }}
          >
            charandeepkapoor.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
