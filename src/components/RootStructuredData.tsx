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
      "6+ years in crypto, quant finance and product. Creator of Stocky AI (AI-powered Zerodha trading, 100%+ ROI) and Stocky Terminal (open-source Bloomberg Terminal alternative). Writes on protected perps, DeFi, trading psychology, and building systems.",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "IIT Kanpur",
    },
    sameAs: [
      "https://twitter.com/yourasianquant",
      "https://linkedin.com/in/charandeepkapoor",
      "https://github.com/SirCharan",
      "https://stockyai.xyz",
      "https://terminal.stockyai.xyz",
      "https://llm.stockyai.xyz",
    ],
    affiliation: {
      "@type": "Organization",
      name: "Stocky AI",
      url: "https://stockyai.xyz",
      description:
        "AI-powered Zerodha trading system for Indian stock and commodity markets with 100%+ ROI and 73% win rate.",
    },
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
      "AI Trading Systems",
      "Zerodha API Trading",
      "Bloomberg Terminal Alternative",
      "OSINT Dashboard",
      "Geopolitical Intelligence",
      "Market Intelligence",
      "Options Trading",
      "Commodities Trading",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Charandeep Kapoor",
    url: SITE_URL,
    description:
      "Portfolio and writings of Charandeep Kapoor — crypto, quant finance, and mathematics expert. Creator of Stocky AI and Stocky Terminal.",
    about: {
      "@type": "Thing",
      name: "AI-powered trading systems, open-source market intelligence, DeFi derivatives and quantitative finance research",
    },
    keywords: [
      "Charandeep Kapoor",
      "Stocky AI",
      "Stocky Terminal",
      "AI trading India",
      "Zerodha AI trading bot",
      "quantitative finance research",
      "protected perps",
      "DeFi derivatives",
      "algorithmic trading strategies",
      "Bloomberg Terminal alternative",
      "open source terminal",
    ],
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
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const stockyTerminalSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Stocky Terminal",
    url: "https://terminal.stockyai.xyz",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free, open-source Bloomberg Terminal alternative with 12+ interactive data panels, 27+ map layers, AI-powered trade signals, and daily market briefs delivered to 70+ subscribers.",
    author: {
      "@type": "Person",
      name: "Charandeep Kapoor",
      url: SITE_URL,
    },
    license: "https://opensource.org/licenses/AGPL-3.0",
    codeRepository: "https://github.com/SirCharan/stocky-terminal",
    featureList: [
      "12+ interactive data panels (NSE/BSE/MCX, crypto, forex, news)",
      "27+ layer interactive map (geopolitical OSINT, earthquakes, wildfires, trade routes)",
      "AI-powered trade signals via Groq (Llama 3.1 8B)",
      "Automated daily market briefs at 8AM and 8PM IST",
      "Email delivery to 70+ subscribers",
      "25+ Vercel Edge Function API endpoints",
      "Data from 30+ sources (Reuters, Bloomberg, USGS, NASA, ACLED)",
      "Region selectors: India, Global, Asia, MENA, Europe, Americas, USA",
    ],
  };

  const stockyAiSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Stocky AI",
    url: "https://stockyai.xyz",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    description:
      "AI trading assistant for Indian stock markets. 15L to 37.62L in eight months. Fine-tuned LLM on Claude Opus 4.6 for NSE/BSE. Full portfolio automation, market briefs, and 7 tools (Inshorts, Tijori, LiveMint, Kite, Sensibull, TradingView, Moneycontrol) in one conversation.",
    author: {
      "@type": "Person",
      name: "Charandeep Kapoor",
      url: SITE_URL,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stockyTerminalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stockyAiSchema) }}
      />
    </>
  );
}
