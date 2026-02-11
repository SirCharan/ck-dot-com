import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "@/index.css";

const SITE_URL = "https://charandeepkapoor.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Charandeep Kapoor | Crypto, Finance & Mathematics Expert",
  description:
    "Charandeep Kapoor - 6+ years across product, research and VC in crypto & stock markets. Building products 0→1. Stocky AI creator, quantitative trader.",
  authors: [{ name: "Charandeep Kapoor", url: SITE_URL }],
  creator: "Charandeep Kapoor",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Charandeep Kapoor",
    title: "Charandeep Kapoor | Crypto, Finance & Mathematics Expert",
    description:
      "Charandeep Kapoor - 6+ years across product, research and VC in crypto & stock markets. Building products 0→1. Stocky AI creator, quantitative trader.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Charandeep Kapoor - Crypto, Finance & Mathematics Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourasianquant",
    creator: "@yourasianquant",
    title: "Charandeep Kapoor | Crypto, Finance & Mathematics Expert",
    description:
      "Charandeep Kapoor - 6+ years across product, research and VC in crypto & stock markets. Building products 0→1. Stocky AI creator, quantitative trader.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
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
