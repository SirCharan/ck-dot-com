import type { Metadata } from "next";
import Script from "next/script";
import { Providers } from "@/components/Providers";
import { RootStructuredData } from "@/components/RootStructuredData";
import { grotesk, serif, mono } from "@/lib/fonts";
import "@/index.css";

const GA_ID = "G-J6SY9N1Y3W";

const SITE_URL = "https://charandeepkapoor.com";

const DEFAULT_DESCRIPTION =
  "Charandeep Kapoor — founder of Timelock Trade, creator of Stocky AI (Claude-driven Zerodha trading, 150%+ ROI). Six years across product, research, and VC in crypto and quant finance. Essays on perps, DeFi, and trading.";

const DEFAULT_TITLE =
  "Charandeep Kapoor — Perpetuals, Quant Finance, AI Trading";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s — Charandeep Kapoor",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Charandeep Kapoor",
    "Stocky AI",
    "Timelock Trade",
    "perpetual futures",
    "AI trading",
    "Claude trading bot",
    "quantitative finance",
    "DeFi",
    "Delta Exchange",
    "crypto product",
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
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Charandeep Kapoor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourasianquant",
    creator: "@yourasianquant",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: SITE_URL,
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
  category: "Finance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${serif.variable} ${mono.variable}`}
    >
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Charandeep Kapoor Writings"
          href="/blog/feed.xml"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        <RootStructuredData />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
