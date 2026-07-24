/**
 * Root-level structured data injected on every page.
 * Enhances AI discoverability (Perplexity, ChatGPT, Claude) and E-E-A-T signals.
 */

import { SITE } from "@/data/site";

const SITE_URL = "https://charandeepkapoor.com";

// Identity profiles only (no booking links) — sourced from SITE.socials so
// URLs can't drift from the rest of the site.
const SAME_AS = [
  SITE.socials.twitter,
  SITE.socials.linkedin,
  SITE.socials.github,
  SITE.socials.telegram,
];

export function RootStructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Charandeep Kapoor",
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    jobTitle: "AI Product Manager",
    description:
      "AI Product Manager at Delta Exchange, India's largest crypto derivatives exchange. Creator of Drishti (live LLM trading signals for crypto perpetuals) and Stocky (Claude-driven Zerodha trading, +110% verified, ₹16.57L profit, Sharpe 2.29). Founder of Timelock Trade (oracle-less, liquidation-free DeFi derivatives, $7.3M volume). Writes on markets, trading psychology, AI, and building systems.",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "IIT Kanpur",
    },
    sameAs: SAME_AS,
    worksFor: {
      "@type": "Organization",
      name: "Delta Exchange",
      url: "https://www.delta.exchange",
      description: "India's largest crypto derivatives exchange.",
    },
    knowsAbout: [
      "AI Product Management",
      "Large Language Models",
      "Claude",
      "Model Context Protocol",
      "LLM Trading Systems",
      "Cryptocurrency Derivatives",
      "Perpetual Futures",
      "Options Trading",
      "Quantitative Finance",
      "Algorithmic Trading",
      "DeFi",
      "Protected Perpetuals",
      "Drishti",
      "Stocky AI",
      "Indian Stock Market",
      "Zerodha API Trading",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Charandeep Kapoor",
    url: SITE_URL,
    description:
      "Portfolio and writings of Charandeep Kapoor — AI Product Manager at Delta Exchange. Live AI trading systems (Drishti, Stocky, Lakshay), DeFi derivatives (Timelock), open-source tools (Second Brain, OpenWispr), and essays on markets and building.",
    about: {
      "@type": "Thing",
      name: "AI-powered trading systems, crypto derivatives product, LLM tooling, and quantitative finance",
    },
    keywords: [
      "Charandeep Kapoor",
      "AI Product Manager",
      "Delta Exchange",
      "Drishti AI trading signals",
      "Stocky AI",
      "Zerodha AI trading bot",
      "Lakshay NSE signals",
      "Timelock protected perps",
      "Second Brain Claude Code",
      "OpenWispr macOS dictation",
      "Model Context Protocol",
      "LLM trading systems",
      "quantitative finance",
      "crypto derivatives",
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

  const author = {
    "@type": "Person",
    name: "Charandeep Kapoor",
    url: SITE_URL,
  };

  const drishtiSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Drishti",
    url: "https://drishti-beryl.vercel.app",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    description:
      "Live LLM-driven trading signals for Delta Exchange crypto perpetuals: 15-minute regime-aware cycles across 8 markets, with a real-money executor placing risk-managed orders (reduce-only stop-loss/take-profit).",
    author,
  };

  const stockyAiSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Stocky AI",
    url: "https://stockai-red.vercel.app/",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    description:
      "Claude-driven Zerodha trading for the Indian stock market via a custom MCP server. ₹16.57L profit (+110% ROI) on ₹15L capital over ~9 months, Sharpe 2.29, 73% win rate — verified P&L on Sensibull.",
    author,
  };

  const secondBrainSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Second Brain",
    url: `${SITE_URL}/second-brain`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, Windows",
    description:
      "Local-first memory for Claude Code: captures every session into an Obsidian-compatible Markdown vault on your own machine and recalls it into new prompts. Open source (Apache-2.0).",
    license: "https://www.apache.org/licenses/LICENSE-2.0",
    codeRepository: "https://github.com/SirCharan/second-brain",
    author,
  };

  const openWisprSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OpenWispr",
    url: `${SITE_URL}/openwispr`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "macOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free, open-source, on-device dictation for macOS: hold a hotkey, speak, and Whisper-transcribed text is pasted at the cursor in any app. 100% local — no cloud, no subscription.",
    codeRepository: "https://github.com/SirCharan/openwispr",
    author,
  };

  const schemas = [
    personSchema,
    websiteSchema,
    drishtiSchema,
    stockyAiSchema,
    secondBrainSchema,
    openWisprSchema,
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
