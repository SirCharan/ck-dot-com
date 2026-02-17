/**
 * Root-level structured data injected on every page.
 * Enhances AI discoverability (Perplexity, ChatGPT) and E-E-A-T signals.
 */

const SITE_URL = "https://charandeepkapoor.com";

export function RootStructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Charandeep Kapoor",
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    jobTitle: "Crypto, Quant Finance & Mathematics Expert",
    description:
      "6+ years in crypto, quant finance and product. Creator of Stocky AI (Claude-powered Zerodha trading, 100%+ ROI). Writes on protected perps, DeFi, trading psychology, and building systems.",
    sameAs: [
      "https://twitter.com/yourasianquant",
      "https://linkedin.com/in/charandeepkapoor",
      "https://github.com/SirCharan",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Crypto & FinTech Industry",
    },
    knowsAbout: [
      "Cryptocurrency",
      "Quantitative Finance",
      "Algorithmic Trading",
      "DeFi",
      "Protected Perpetuals",
      "Blockchain",
      "Stocky AI",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Charandeep Kapoor",
    url: SITE_URL,
    description:
      "Portfolio and writings of Charandeep Kapoor - crypto, quant finance, and mathematics expert.",
    author: {
      "@type": "Person",
      name: "Charandeep Kapoor",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Charandeep Kapoor",
      url: SITE_URL,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "ReadAction",
      target: [`${SITE_URL}/blog`, `${SITE_URL}`],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
