export const SITE = {
  name: "Charandeep Kapoor",
  handle: "yourasianquant",
  email: "",
  location: "India",
  socials: {
    linkedin: "https://www.linkedin.com/in/charandeep-kapoor/",
    twitter: "https://x.com/yourasianquant",
    telegram: "https://t.me/charandeep_kapoor",
    github: "https://github.com/SirCharan",
    calendly: "https://calendly.com/charan-kapoor/30min",
    // Confirmed by ck 2026-07-10.
    topmate: "https://topmate.io/charandeep_kapoor",
  },
} as const;

export const HERO = {
  lede:
    "AI Product Manager at Delta Exchange. I build perpetuals and AI-driven trading systems, and run a Claude-powered bot trading real capital across crypto and Indian equities.",
  kicker: "Delta Exchange",
} as const;

// Headline proof numbers for the data-forward hero. Stocky figures mirror
// src/data/stocky-pnl.json (refresh via `npm run pull:pnl`); Timelock numbers
// come from the EXPERIENCE entry below.
export interface HeroStat {
  value: string;
  label: string;
  sub: string;
  href?: string;
  tone?: "pos" | "accent" | "neutral";
}

const STOCKY_VERIFIED =
  "https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl";

export const HERO_STATS: HeroStat[] = [
  { value: "+110%", label: "Stocky AI ROI", sub: "₹15L → ₹31.57L · verified", href: STOCKY_VERIFIED, tone: "pos" },
  { value: "2.29", label: "Sharpe ratio", sub: "Stocky AI", href: STOCKY_VERIFIED, tone: "accent" },
  { value: "73%", label: "Win rate", sub: "Stocky AI", href: STOCKY_VERIFIED, tone: "accent" },
  { value: "$7.3M", label: "Timelock volume", sub: "$2M TVL · 1k+ users", href: "https://perps.timelock.trade/", tone: "neutral" },
];

export const BIO = {
  paragraphs: [
    "I'm an AI Product Manager at Delta Exchange, building perpetual futures and AI-driven trading tools at India's largest crypto derivatives exchange. Earlier I founded Timelock Trade (oracle-less, liquidation-free derivatives) and led 0→1 DeFi products at Diffusion Labs, with earlier stints at Stader, Heru, and Tykhe Ventures.",
    "I blend math and finance to ship products and quant strategies that live at the intersection of models and markets, from protocol design to Claude-driven bots that trade real capital.",
  ],
  highlights: [
    "AI Product Manager, Delta Exchange, perpetuals and AI-driven trading products.",
    "Built Stocky: fine-tuned Claude on a custom Zerodha MCP, ₹15L → ₹31.57L (+110% / ₹16.57L profit), Sharpe 2.29, 73% win rate.",
    "Founded Timelock Trade, oracle-less, liquidation-free perps & options. $7.3M volume · $2M TVL · 1,000+ users.",
    "B.Tech, IIT Kanpur. JEE Advanced AIR 638 (99.96%ile). National Maths Olympiad AIR 3.",
  ],
} as const;

export interface Experience {
  company: string;
  position: string;
  duration: string;
  one: string;
  bullets?: { html: string }[];
}

export const EXPERIENCE: Experience[] = [
  {
    company: "Delta Exchange",
    position: "AI Product Manager",
    duration: "Apr 2026 – Present",
    one:
      "Building perpetuals and AI-driven trading products at India's largest crypto derivatives exchange.",
    bullets: [
      { html: "Product for AI / LLM features across the trading, signals and research stack." },
      { html: "Perpetual futures and options on crypto, design, growth and quant tooling." },
    ],
  },
  {
    company: "Drishti",
    position: "Creator · AI Trading Signals",
    duration: "Apr 2026 – Present",
    one:
      "Built and run Drishti, a live, LLM-driven trading-signal system for Delta crypto perpetuals.",
    bullets: [
      { html: "Claude-driven signals on a 15-minute, regime-aware cycle across 8 perpetual markets." },
      { html: "Live executor places real, risk-managed orders (reduce-only SL/TP) on Delta." },
      { html: '<a href="https://drishti-beryl.vercel.app">Live dashboard</a>, signals, equity curve and stats, updated continuously.' },
    ],
  },
  {
    company: "Timelock Trade",
    position: "Founder / Product",
    duration: "Apr 2025 – Apr 2026",
    one:
      "Bootstrapped Timelock and led 6 across tech, product, design, BD and marketing.",
    bullets: [
      { html: "House of Finance (perps, options, prediction markets, binary options), decentralized, oracle-less, liquidation-free." },
      { html: "$7.3M trading volume · $2M TVL · 1,000+ active users on Monad testnet." },
      { html: '<a href="https://docs.timelock.trade/docs">Docs</a> · <a href="https://perps.timelock.trade/">Perps</a> · <a href="https://swap.timelock.trade/">Swap</a>' },
    ],
  },
  {
    company: "Diffusion Labs",
    position: "Product Manager",
    duration: "Dec 2023 – Apr 2025",
    one: "0→1 product lead for DeFi protocols, prediction markets and liquidation-free lending.",
    bullets: [
      { html: "Defined roadmap and led a 15-person team across product, eng, design and growth for Methlab." },
      { html: "Scaled Methlab to 20,000+ users and $50M TVL in 6 months." },
      { html: 'Launched <a href="https://puffthedragon.xyz/">Puff</a>, a +EV prediction marketplace, $75M market cap, $2.5M revenue.' },
    ],
  },
  {
    company: "Delta Exchange",
    position: "Product & Growth",
    duration: "Jun 2023 – Jul 2024",
    one: "Led socials and education; traded live algos on BTC and ETH.",
    bullets: [
      { html: '<strong>BTC ATM Short Straddles</strong>, 2,860% return in 1 year (<a href="https://www.delta.exchange/blog/the-algo-trading-strategy-which-made-2860-returns-in-the-past-2-years">blog</a>).' },
      { html: '<strong>Refined MACD</strong>, 100% in 2 years (<a href="https://www.delta.exchange/blog/optimising-returns-pairing-ma-crossovers-with-a-trend-indicator?category=all">blog</a>).' },
      { html: "Grew YouTube from 3K → 25K subscribers (+733%) in ~6 months." },
    ],
  },
  {
    company: "Stader Labs",
    position: "Analyst",
    duration: "Mar 2023 – Nov 2023",
    one: "On-chain analytics and treasury optimization for multi-chain staking.",
  },
  {
    company: "Heru Finance",
    position: "Trader & Investment Analyst",
    duration: "May 2022 – Feb 2023",
    one: "Ran a $500K fund targeting >30% delta-neutral yields; hedged >$5M of portfolio exposures.",
  },
  {
    company: "Tykhe Block Ventures",
    position: "VC Analyst",
    duration: "Mar 2023 – Nov 2023",
    one: "Technical due diligence on DeFi protocols; supported NFTPerp on derivative pricing.",
  },
];

export interface Tool {
  title: string;
  one: string;
  long?: string[];
  live?: string;
  liveLabel?: string;
  github?: string;
  latest?: string;
  latestLabel?: string;
  verified?: string;
  tags?: string[];
  /** Drives the /work status seal: live (go) · verified (metal) · archived (mute). */
  status: "live" | "verified" | "archived";
  /** Cover image under /images/work/<slug>/ for the featured plates. */
  cover?: string;
  /** Internal case-study / detail route. */
  detail?: string;
}

export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "AI / LLM",
    items: [
      "Claude (Opus/Sonnet)",
      "Prompt & context engineering",
      "Model Context Protocol (MCP)",
      "RAG / vector search",
      "Agentic tool-calling",
      "Cost-aware model routing",
    ],
  },
  {
    group: "Markets & quant",
    items: [
      "Perpetual futures & options",
      "Options pricing (Black-Scholes)",
      "Delta-neutral strategies",
      "Backtesting & signal research",
      "Risk management",
    ],
  },
  {
    group: "Build",
    items: [
      "Next.js / React / TypeScript",
      "Python",
      "Solidity / DeFi",
      "Vercel / Cloudflare",
      "Redis / vector DBs",
    ],
  },
  {
    group: "Product",
    items: ["0-to-1 product", "Team leadership", "GTM & growth", "Protocol design"],
  },
];

// Filter pills for the Proof-of-Work grid (order matters; "All" is implicit).
export const TOOL_TAGS = ["Delta", "Markets", "AI", "Tools"] as const;

export const TOOLS: Tool[] = [
  {
    title: "Drishti",
    one: "Live LLM-driven trading signals for Delta crypto perpetuals: 15-min regime-aware cycles with a real-money executor.",
    live: "https://drishti-beryl.vercel.app",
    liveLabel: "Live",
    tags: ["Delta", "AI"],
    status: "live",
    cover: "/images/work/drishti/feed.png",
    detail: "/work/drishti",
  },
  {
    title: "Stocky AI",
    one: "Claude-driven Zerodha trading: ₹16.57L profit (+110%), Sharpe 2.29, 73% win rate.",
    long: [
      "Fine-tuned Claude 3.5 Sonnet and built a custom MCP server connecting it to Zerodha to trade the Indian stock market.",
      "₹16.57L profit (+110% ROI) over ~9 months, Sharpe 2.29, 73% win rate, ₹15L capital.",
    ],
    live: "https://stockai-red.vercel.app/",
    latest:
      "https://www.linkedin.com/posts/charandeep-kapoor_150-in-8-months-i-gave-stocky-15l-in-june-activity-7427296096374308865-HdkN",
    latestLabel: "Latest update",
    verified:
      "https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl",
    tags: ["Markets", "AI"],
    status: "verified",
    cover: "/images/stocky/stocky-terminal.png",
    detail: "/markets",
  },
  {
    title: "Timelock",
    one: "Oracle-less, liquidation-free DeFi perps: $7.3M volume, $2M TVL, 1k+ users.",
    live: "https://perps.timelock.trade/",
    liveLabel: "Perps",
    tags: ["Markets"],
    status: "live",
    cover: "/images/work/timelock/perps-terminal.jpg",
    detail: "/work/timelock",
  },
  {
    title: "Delta Support Audit",
    one: "Nightly RAG audit of Delta support articles for factual drift and coverage gaps.",
    live: "https://delta-support-audit.vercel.app/",
    liveLabel: "Live audit",
    tags: ["Delta", "AI"],
    status: "live",
    cover: "/images/work/delta-support-audit/cover.png",
    detail: "/work/delta-support-audit",
  },
  {
    title: "Second Brain",
    one: "Local-first memory for Claude Code · open source.",
    live: "/second-brain",
    liveLabel: "Live",
    github: "https://github.com/SirCharan/second-brain",
    tags: ["AI", "Tools"],
    status: "live",
    cover: "/images/work/second-brain/cover.png",
    detail: "/work/second-brain",
  },
  {
    title: "OpenWispr",
    one: "Say it. It's typed. Open-source dictation that never leaves your Mac: hold fn, speak, on-device Whisper pastes it at the cursor.",
    live: "/openwispr",
    liveLabel: "Live",
    github: "https://github.com/SirCharan/openwispr",
    tags: ["AI", "Tools"],
    status: "live",
    cover: "/images/work/openwispr/cover.png",
  },
  {
    title: "Lakshay",
    one: "Intraday AI signals for NSE F&O: 5-min cycles, Dhan data, paper track record.",
    live: "https://lakshya-cyan.vercel.app/",
    liveLabel: "Live",
    github: "https://github.com/SirCharan/lakshay",
    tags: ["Markets", "AI"],
    status: "live",
    cover: "/images/work/lakshay/cover.png",
    detail: "/work/lakshay",
  },
  {
    title: "Andrea's World",
    one: "A hand-built interactive 3D web world: craft, motion, and play.",
    live: "https://andrea-world.vercel.app",
    liveLabel: "Enter",
    tags: ["Tools"],
    status: "live",
    cover: "/images/work/andrea-world/cover.png",
    detail: "/work/andrea-world",
  },
  {
    title: "Voice-Powered Zerodha Trading",
    one: "Hands-free stock trades and backtests on Zerodha via MCP.",
    long: [
      "Voice-powered trading automation using Model Context Protocol to execute hands-free stock trades and backtests on Zerodha.",
    ],
    github: "https://github.com/SirCharan/Zerodha-MCP-Tradin",
    live:
      "https://www.linkedin.com/posts/charandeep-kapoor_itc-claude-zerodha-activity-7330161190741987329-Ge1d",
    liveLabel: "Demo",
    tags: ["Markets", "AI"],
    status: "archived",
  },
  {
    title: "Option Premium Calculator",
    one: "Live prices and real-time IV for options portfolio management.",
    github: "https://github.com/SirCharan/option-bloom-calculator",
    live: "https://option-premium-calculator.vercel.app/",
    tags: ["Tools"],
    status: "live",
  },
  {
    title: "Voice-Activated Delta Trading Bot",
    one: "Voice-activated crypto trading via Claude MCP + Delta Exchange API.",
    long: [
      'Voice-activated trading via Claude\'s MCP server + Delta Exchange API. "Buy 1000 rupees of Ethereum" then executed in under an hour of build time.',
    ],
    github: "https://github.com/SirCharan/Delta",
    live:
      "https://www.linkedin.com/posts/charandeep-kapoor_crypto-claude-vibecoding-activity-7334621565780721664-SDqO",
    liveLabel: "Demo",
    tags: ["Delta", "AI"],
    status: "archived",
  },
  {
    title: "Market Matters with CK",
    one: "ChatGPT wrapper for daily stock market updates and insights.",
    live: "https://chatgpt.com/share/684fbf8b-196c-800f-a41f-9502a50cc8a9",
    tags: ["Markets", "AI"],
    status: "archived",
  },
];

export const RESEARCH = [
  {
    title: "Options Pricing, Timelock Protocol",
    venue: "Protocol Docs",
    one:
      "Oracle-less option pricing: Black-Scholes adapted for crypto, implied volatility from Uniswap data, theta approximated via Dirac distributions.",
    href: "https://docs.timelock.trade/docs/protocol/mechanism/pricing",
  },
];

export const ACADEMICS = [
  { title: "B.Tech, IIT Kanpur", detail: "2018 – 2022" },
  { title: "JEE Advanced 2018", detail: "AIR 638 (99.96%ile)" },
  { title: "JEE Main 2018", detail: "AIR 272 (99.98%ile)" },
  { title: "CAT 2023", detail: "99.85%ile" },
  { title: "National Maths Olympiad", detail: "AIR 3" },
];

export const CERTIFICATIONS = [
  { title: "NTSE, KVPY Scholar", detail: "" },
  { title: "NISM Series VA", detail: "Mutual Fund Distributor" },
  { title: "NISM Series VIII", detail: "Equity Derivatives" },
  { title: "NISM Series XV", detail: "Research Analyst" },
];

// ── Case studies ─────────────────────────────────────────────────────────────
// Long-form project pages at /work/<slug>. `accent` selects the section
// visualization (see Viz3D). Content sourced from the live systems + docs.
export interface CaseStudyMetric {
  value: string;
  label: string;
  tone?: "pos" | "accent" | "neutral";
}
export interface CaseStudySection {
  heading: string;
  body: string[]; // paragraphs (may contain inline HTML links)
}
export interface CaseStudyLink {
  label: string;
  href: string;
}
export interface CaseStudy {
  slug: string;
  title: string;
  kicker: string;
  tagline: string;
  role: string;
  period: string;
  stack: string[];
  metrics: CaseStudyMetric[];
  sections: CaseStudySection[];
  links: CaseStudyLink[];
  /** Screenshots under /public/images/work/<slug>/, captured in Phase 4. */
  shots?: { src: string; alt: string }[];
  /** When no shots yet, render a captioned "live deployment" figure linking out. */
  shotsPending?: boolean;
  /** Section-accent visualization key handled by Viz3D. */
  accent?: "fractal" | "spiral" | "orbits" | "none";
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "drishti",
    title: "Drishti",
    kicker: "Creator · Live AI Trading Signals",
    tagline: "Live LLM signals · 15-min cycle · 8 markets · real capital.",
    role: "Creator, sole builder & operator",
    period: "Apr 2026 – Present",
    stack: [
      "Claude Opus 4.8",
      "Reasoning-first tool-calling",
      "Python",
      "systemd on VM",
      "Cloudflare R2",
      "Next.js / Vercel",
      "Delta Exchange API",
    ],
    metrics: [
      { value: "~64%", label: "Win rate (closed set)", tone: "pos" },
      { value: "8", label: "Perp markets", tone: "accent" },
      { value: "15 min", label: "Decision cycle", tone: "neutral" },
      { value: "99", label: "PageSpeed (landing)", tone: "accent" },
    ],
    sections: [
      {
        heading: "The idea",
        body: [
          "Drishti asks a frontier LLM one disciplined question every cycle: given everything the market is showing right now, is there an edge, and if so, where are entry, stop and target? The model reasons first, then emits a structured decision the system can act on.",
          "It runs a 15-minute, regime-aware cycle across 8 Delta crypto perpetual markets, with 30+ engineered features per asset (CVD, IV term structure, basis, global long/short, OI by exchange, Coinbase premium and more).",
        ],
      },
      {
        heading: "From signal to real orders",
        body: [
          "A live executor turns accepted signals into real, risk-managed orders on Delta India, reduce-only stop-loss and take-profit brackets, fixed sizing, a guardian process, and hard kill-switches.",
          "The publisher runs as a systemd service on a VM, writes snapshots to Cloudflare R2, and a Vercel front-end renders signals, the equity curve and closed-trade stats continuously.",
        ],
      },
      {
        heading: "What it demonstrates",
        body: [
          "Prompt and context engineering under real money, cost-aware model routing, and an operational loop that has to be right every 15 minutes, not just in a notebook.",
        ],
      },
    ],
    links: [
      { label: "Live dashboard", href: "https://drishti-beryl.vercel.app" },
      { label: "App + APK", href: "https://drishti-signals.vercel.app" },
      { label: "How it works", href: "https://drishti-explainer.vercel.app" },
      { label: "Research", href: "https://drishti-research.vercel.app" },
    ],
    shots: [
      { src: "/images/work/drishti/feed.png", alt: "Drishti live signal feed, direction, entry, stop, target per market" },
      { src: "/images/work/drishti/howitworks.png", alt: "How Drishti works, the 15-minute decision-to-execution cycle" },
    ],
    accent: "orbits",
  },
  {
    slug: "timelock",
    title: "Timelock Trade",
    kicker: "Founder · Oracle-less DeFi Derivatives",
    tagline: "Oracle-less DeFi perps · $7.3M vol · 1k+ users.",
    role: "Founder, led a team of 6 (tech, product, design, BD, marketing)",
    period: "Apr 2025 – Apr 2026",
    stack: [
      "Monad testnet",
      "Solidity",
      "Oracle-less pricing",
      "Black-Scholes (adapted)",
      "Uniswap-derived IV",
      "Next.js",
    ],
    metrics: [
      { value: "$7.3M", label: "Trading volume", tone: "pos" },
      { value: "$2M", label: "TVL", tone: "accent" },
      { value: "1,000+", label: "Active users", tone: "accent" },
      { value: "6", label: "Team led", tone: "neutral" },
    ],
    sections: [
      {
        heading: "The thesis",
        body: [
          "On-chain derivatives break in two places: they depend on price oracles that can be manipulated, and they liquidate users at the worst possible moment. Timelock removed both.",
          "\"Protected Perps\" let traders only realize profit; the downside is borne by liquidity providers who are paid a premium for it, a structurally different risk transfer than a standard perp.",
        ],
      },
      {
        heading: "The hard part: pricing without an oracle",
        body: [
          "Options were priced with a Black-Scholes model adapted for crypto, implied volatility derived from Uniswap pool data, and theta approximated via Dirac distributions, so the protocol could quote fair prices without trusting an external feed.",
          "The product spanned perps, options, prediction markets and binary options.",
        ],
      },
      {
        heading: "As a founder",
        body: [
          "I raised the idea, built the team of six across tech, product, design, BD and marketing, and drove it to $7.3M volume, $2M TVL and 1,000+ users on Monad testnet.",
        ],
      },
    ],
    links: [
      { label: "Perps", href: "https://perps.timelock.trade/" },
      { label: "Swap", href: "https://swap.timelock.trade/" },
      { label: "Docs", href: "https://docs.timelock.trade/docs" },
      {
        label: "Pricing mechanism",
        href: "https://docs.timelock.trade/docs/protocol/mechanism/pricing",
      },
    ],
    shots: [
      { src: "/images/work/timelock/perps-terminal.jpg", alt: "Timelock Protected Perps trading terminal on Monad testnet" },
      { src: "/images/work/timelock/protected-perps.jpg", alt: "Timelock Protected Perps, payoff structure: traders only profit, LPs earn premium for the downside" },
    ],
    accent: "spiral",
  },
  {
    slug: "delta-support-audit",
    title: "Delta Support Audit",
    kicker: "Builder · RAG Quality System",
    tagline: "Nightly RAG audit of support articles for factual drift.",
    role: "Builder & triager",
    period: "2026",
    stack: [
      "Next.js 15 / TypeScript",
      "OpenRouter → Claude Sonnet",
      "Upstash Redis + Vector",
      "BGE-large-en-v1.5 embeddings",
      "RAG",
      "Slack + Notion",
      "Vercel Cron",
    ],
    metrics: [
      { value: "344", label: "Articles audited", tone: "accent" },
      { value: "14/14", label: "P0 true-positives (trial)", tone: "pos" },
      { value: "~4 min", label: "Wall-clock / run", tone: "neutral" },
      { value: "$2.45", label: "Cost / run", tone: "neutral" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Support content drifts. Freshdesk articles quietly fall out of step with the product docs and guides that are the real source of truth, and nobody notices until a customer is misled.",
          "The system embeds 344 support articles (1,067 chunks) into a vector store and compares them against the canonical docs for contradictions and coverage gaps.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "RAG detectors classify each article for conflicts, contradictions and coverage gaps. P0 issues page a Slack channel; the full report lands in Notion. A Vercel cron runs the whole sweep at 04:00 IST.",
          "On a 100-article trial it caught 14/14 P0 issues (100% true-positive) with a combined P0+P1 false-positive rate of 5–9%, at $2.45 and four minutes per run.",
        ],
      },
    ],
    links: [
      { label: "Live audit", href: "https://delta-support-audit.vercel.app/" },
    ],
    shots: [
      {
        src: "/images/work/delta-support-audit/cover.png",
        alt: "Delta Support Audit, daily AI audit of Delta India support content with impact metrics",
      },
    ],
    accent: "fractal",
  },
  {
    slug: "andrea-world",
    title: "Andrea's World",
    kicker: "Creator · Interactive 3D Web",
    tagline:
      "A playful, hand-built interactive 3D world on the web, craft, motion, and play.",
    role: "Designer & Developer",
    period: "2026",
    stack: ["Next.js", "SVG / CSS 3D", "Motion", "Vercel"],
    metrics: [
      { value: "3D", label: "Interactive world", tone: "accent" },
      { value: "Web", label: "No install", tone: "neutral" },
      { value: "Live", label: "Shipped", tone: "pos" },
    ],
    sections: [
      {
        heading: "What it is",
        body: [
          "A small, joyful corner of the web, an explorable interactive world built for delight rather than data. It's the counterweight to the trading systems: proof that the same person who ships autonomous executors also cares about craft, motion and play.",
        ],
      },
    ],
    links: [{ label: "Enter the world", href: "https://andrea-world.vercel.app" }],
    shots: [
      {
        src: "/images/work/andrea-world/cover.png",
        alt: "Andrea's World, interactive 3D island with character, landmarks, and Linkin Park stage",
      },
    ],
    accent: "none",
  },
  {
    slug: "second-brain",
    title: "Second Brain",
    kicker: "Creator · Local-first memory for Claude Code",
    tagline: "The chat ends. The memory stays.",
    role: "Creator, sole builder, open source",
    period: "Jul 2026 – Present",
    stack: [
      "Claude Code plugin",
      "Model Context Protocol",
      "Markdown vault (Obsidian-compatible)",
      "Node.js / TypeScript",
      "Next.js / Vercel",
    ],
    metrics: [
      { value: "100%", label: "Local first", tone: "accent" },
      { value: "Markdown", label: "On your disk", tone: "neutral" },
      { value: "MCP", label: "Recall + capture", tone: "accent" },
      { value: "Apache-2.0", label: "Open source", tone: "neutral" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Every AI session starts from zero. You explain the same context, the model solves it, then the window closes and the reasoning is gone. Switch models or clear the chat and the memory walks away with it.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "Second Brain captures every Claude Code session into Markdown on your own machine, in an Obsidian-compatible vault. It recalls the relevant notes back into new prompts, and snapshots state before the context is compacted so nothing is lost.",
          "It installs as a Claude Code plugin (or a one-line install.sh) and runs entirely on your disk. No cloud, no lock-in.",
        ],
      },
      {
        heading: "Why it matters",
        body: [
          "Memory becomes an asset you own, not a session you rent. The longer you work, the more the vault compounds, and it moves with you across every model and machine.",
        ],
      },
    ],
    links: [
      { label: "Live", href: "https://charandeepkapoor.com/second-brain" },
      { label: "GitHub", href: "https://github.com/SirCharan/second-brain" },
    ],
    shots: [
      { src: "/images/work/second-brain/hero.png", alt: "Second Brain landing: the chat ends, the memory stays, with a live knowledge-graph" },
    ],
    accent: "fractal",
  },
  {
    slug: "lakshay",
    title: "Lakshay",
    kicker: "Creator · Intraday AI Signals for NSE F&O",
    tagline: "5-min AI signals for Indian futures, on a paper track record.",
    role: "Creator, sole builder & operator",
    period: "Jun 2026 – Present",
    stack: [
      "Claude via OpenRouter",
      "Dhan market data",
      "Python / systemd on VM",
      "ORB / VWAP / supertrend + options",
      "Kite (live-gated executor)",
      "Next.js / Vercel",
    ],
    metrics: [
      { value: "8", label: "NSE instruments", tone: "accent" },
      { value: "5 min", label: "Decision cycle", tone: "neutral" },
      { value: "09:15", label: "To 15:30 IST session", tone: "neutral" },
      { value: "Paper", label: "Track record mode", tone: "accent" },
    ],
    sections: [
      {
        heading: "What it is",
        body: [
          "Lakshay is the NSE sibling of Drishti: an intraday AI signal system for Indian stock-market futures. It runs 5-minute, regime-aware cycles through the trading session from 09:15 to a ~15:15 square-off, across NIFTY, BANKNIFTY and front-month equity futures.",
        ],
      },
      {
        heading: "How it decides",
        body: [
          "Each cycle builds features from Dhan data (ORB, VWAP, supertrend, EMA stack, RSI regime, volume) plus an options layer (PCR, max pain, option-chain blocks) and India VIX. Claude reasons over the evidence, grades its own conviction, and emits at most one signal per instrument with entry, stop and target.",
        ],
      },
      {
        heading: "Paper first, live-gated",
        body: [
          "The public dashboard shows a paper track record. Real orders are double-gated behind an explicit flag, so the system proves itself on paper before a rupee is at risk. A conservative risk gate (reward-to-risk floor, level-aware sides) filters every signal.",
        ],
      },
    ],
    links: [
      { label: "Live dashboard", href: "https://lakshya-cyan.vercel.app/" },
      { label: "GitHub", href: "https://github.com/SirCharan/lakshay" },
    ],
    shots: [
      { src: "/images/work/lakshay/cover.png", alt: "Lakshay dashboard: NSE F&O 5-min AI signals, win rate, per-asset performance and signals log" },
    ],
    accent: "orbits",
  },
];
