import type { Metadata } from "next";
import Script from "next/script";
import { Providers } from "@/components/Providers";
import { RootStructuredData } from "@/components/RootStructuredData";
import { inter, orbitron, rajdhani, syne } from "@/lib/fonts";
import "@/index.css";

const GA_ID = "G-J6SY9N1Y3W";

const SITE_URL = "https://charandeepkapoor.com";

const DEFAULT_DESCRIPTION =
  "Charandeep Kapoor - Creator of Stocky AI (AI-powered trading for Indian markets, 100%+ ROI, 73% win rate). 6+ years in crypto, quant finance & product. Essays on protected perps, DeFi, algorithmic trading, and trading psychology.";

const DEFAULT_TITLE = "Charandeep Kapoor | Stocky AI Creator, Quant Finance & Crypto Expert";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Charandeep Kapoor",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Charandeep Kapoor",
    "Stocky AI",
    "AI trading India",
    "algorithmic trading India",
    "AI stock trading",
    "crypto expert",
    "quantitative finance",
    "protected perps",
    "DeFi",
    "trading psychology",
    "Zerodha AI trading",
    "commodities trading India",
  ],
  verification: {
    // Replace with actual code from Google Search Console
    // google: "YOUR_GSC_VERIFICATION_CODE",
  },
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
    images: ["/og-image.jpg"],
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
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        <RootStructuredData />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
