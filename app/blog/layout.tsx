/**
 * Blog layout: Codex-style light theme, minimal chrome.
 * Uses CSS variables for light mode (overrides root dark theme when .blog-root is present).
 */

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-root min-h-screen">
      {children}
    </div>
  );
}
