import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { RootStructuredData } from "@/components/RootStructuredData";
import { inter, orbitron, rajdhani, syne } from "@/lib/fonts";
import "@/index.css";

const SITE_URL = "https://charandeepkapoor.com";

const DEFAULT_DESCRIPTION =
  "Charandeep Kapoor - 6+ years in crypto, quant finance & product. Creator of Stocky AI (100%+ ROI). Essays on protected perps, DeFi, trading psychology. Expert in algorithmic trading, blockchain, mathematical finance.";

const DEFAULT_TITLE = "Charandeep Kapoor | Crypto, Quant Finance & Mathematics Expert";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Charandeep Kapoor",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Charandeep Kapoor",
    "crypto expert",
    "quantitative finance",
    "algorithmic trading",
    "blockchain",
    "DeFi",
    "Stocky AI",
    "protected perps",
    "trading psychology",
    "mathematical finance",
  ],
  authors: [{ name: "Charandeep Kapoor", url: SITE_URL }],
  creator: "Charandeep Kapoor",
  publisher: "Charandeep Kapoor",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Charandeep Kapoor",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Charandeep Kapoor - Crypto, Quant Finance & Mathematics Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourasianquant",
    creator: "@yourasianquant",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": "/blog/feed.xml",
    },
  },
  category: "Finance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${rajdhani.variable} ${syne.variable}`}>
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
        <RootStructuredData />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
