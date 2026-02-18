import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { BlogListClient } from "@/components/blog/BlogListClient";

const PROTECTED_PERPS_SUB_ORDER = [
  "exchange-payoffs",
  "lps-downside",
  "web2-perps",
  "clubs-perps",
  "why-perps",
  "perps-next",
  "perps-pm-design",
  "extract-money",
];

const VC_JOURNEY_ORDER = [
  "the-future",
  "my-ideal-company",
  "how-to-pitch",
];

export const metadata: Metadata = {
  title: "Writings",
  description:
    "Essays on protected perps, DeFi, trading psychology, crypto markets, AI, and life philosophy. By Charandeep Kapoor, crypto and quant finance expert.",
  keywords: [
    "Charandeep Kapoor",
    "protected perps",
    "DeFi",
    "trading psychology",
    "crypto essays",
    "quant finance",
  ],
  openGraph: {
    type: "website",
    url: "https://charandeepkapoor.com/blog",
    title: "Writings | Charandeep Kapoor",
    description: "Writings on crypto, quant trading, markets, and building systems.",
    siteName: "Charandeep Kapoor",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Charandeep Kapoor Writings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourasianquant",
    creator: "@yourasianquant",
    title: "Writings | Charandeep Kapoor",
    description: "Writings on crypto, quant trading, markets, and building systems.",
    images: ["/og-image.jpg"],
  },
};

export default function BlogIndexPage() {
  const allPosts = getAllPosts();
  const subArticles = PROTECTED_PERPS_SUB_ORDER.map((s) => getPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map(({ slug, title, date, excerpt, tags, readingTime }) => ({
      slug, title, date, excerpt, tags, readingTime,
    }));

  const vcJourneyArticles = VC_JOURNEY_ORDER.map((s) => getPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map(({ slug, title, date, excerpt, tags, readingTime }) => ({
      slug, title, date, excerpt, tags, readingTime,
    }));

  const serializedPosts = allPosts.map(({ slug, title, date, excerpt, tags, readingTime }) => ({
    slug, title, date, excerpt, tags, readingTime,
  }));

  return (
    <div className="blog-container">
      <header className="blog-header">
        <Link href="/" className="blog-back-link">
          ← Back to Home
        </Link>
      </header>

      <main className="blog-main">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
          <h1 className="blog-title">Writings</h1>
          <a
            href="/blog/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Subscribe via RSS ↗
          </a>
        </div>

        <BlogListClient posts={serializedPosts} subArticles={subArticles} vcJourneyArticles={vcJourneyArticles} />
      </main>
    </div>
  );
}
