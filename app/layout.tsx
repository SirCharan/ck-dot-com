import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "@/index.css";

export const metadata: Metadata = {
  title: "Charandeep Kapoor | Crypto, Finance & Mathematics Expert",
  description:
    "Charandeep Kapoor - 6+ years across product, research and VC in crypto & stock markets. Building products 0→1. Stocky AI creator, quantitative trader.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Charandeep Kapoor Writings"
          href="/blog/feed.xml"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
