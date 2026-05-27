export const SITE = {
  name: "Charandeep Kapoor",
  handle: "yourasianquant",
  email: "",
  location: "Bombay",
  socials: {
    linkedin: "https://www.linkedin.com/in/charandeep-kapoor/",
    twitter: "https://x.com/yourasianquant",
    telegram: "https://t.me/charandeep_kapoor",
    github: "https://github.com/SirCharan",
    calendly: "https://calendly.com/charan-kapoor/30min",
  },
} as const;

export const HERO = {
  lede:
    "I build perpetuals, write about how exchanges work, and run a Claude-driven trading system.",
  kicker: "Bombay",
} as const;

export const BIO = {
  paragraphs: [
    "Six years across product, research, and VC in crypto and stock markets — currently founder of Timelock Trade, building leverage without liquidations. Earlier at Diffusion Labs, Delta Exchange, Stader, Heru, Tykhe.",
    "I blend math and finance to ship DeFi products and quant strategies — taking concepts to functional tools that live at the intersection of models and markets.",
  ],
  highlights: [
    "Founder, Timelock Trade — perpetuals, options, prediction markets — oracle-less and liquidation-free.",
    "Fine-tuned Claude 3.5 Sonnet to run a Zerodha trading system — 150%+ ROI, Sharpe 2.29, 73% win rate on ₹15L capital.",
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
    company: "Timelock Trade",
    position: "Founder / Product",
    duration: "Apr 2025 – Present",
    one:
      "Bootstrapped Timelock and led 6 across tech, product, design, BD and marketing.",
    bullets: [
      { html: "House of Finance (perps, options, prediction markets, binary options) — decentralized, oracle-less, liquidation-free." },
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
      { html: 'Launched <a href="https://puffthedragon.xyz/">Puff</a>, a +EV prediction marketplace — $75M market cap, $2.5M revenue.' },
    ],
  },
  {
    company: "Delta Exchange",
    position: "Product & Growth",
    duration: "Jun 2023 – Jul 2024",
    one: "Led socials and education; traded live algos on BTC and ETH.",
    bullets: [
      { html: '<strong>BTC ATM Short Straddles</strong> — 2,860% return in 1 year (<a href="https://www.delta.exchange/blog/the-algo-trading-strategy-which-made-2860-returns-in-the-past-2-years">blog</a>).' },
      { html: '<strong>Refined MACD</strong> — 100% in 2 years (<a href="https://www.delta.exchange/blog/optimising-returns-pairing-ma-crossovers-with-a-trend-indicator?category=all">blog</a>).' },
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
}

export const TOOLS: Tool[] = [
  {
    title: "Stocky AI",
    one: "Claude-driven Zerodha trading — 150%+ ROI, Sharpe 2.29, 73% win rate.",
    long: [
      "Fine-tuned Claude 3.5 Sonnet and built a custom MCP server connecting it to Zerodha to trade the Indian stock market.",
      "150%+ ROI over 9 months, Sharpe 2.29, 73% win rate, ₹15L capital.",
    ],
    live: "https://stockai-red.vercel.app/",
    latest:
      "https://www.linkedin.com/posts/charandeep-kapoor_150-in-8-months-i-gave-stocky-15l-in-june-activity-7427296096374308865-HdkN",
    latestLabel: "Latest update",
    verified:
      "https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl",
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
  },
  {
    title: "Option Premium Calculator",
    one: "Live prices and real-time IV for options portfolio management.",
    github: "https://github.com/SirCharan/option-bloom-calculator",
    live: "https://option-premium-calculator.vercel.app/",
  },
  {
    title: "Voice-Activated Delta Trading Bot",
    one: "Voice-activated crypto trading via Claude MCP + Delta Exchange API.",
    long: [
      'Voice-activated trading via Claude\'s MCP server + Delta Exchange API. "Buy 1000 rupees of Ethereum" → executed in under an hour of build time.',
    ],
    github: "https://github.com/SirCharan/Delta",
    live:
      "https://www.linkedin.com/posts/charandeep-kapoor_crypto-claude-vibecoding-activity-7334621565780721664-SDqO",
    liveLabel: "Demo",
  },
  {
    title: "Market Matters with CK",
    one: "ChatGPT wrapper for daily stock market updates and insights.",
    live: "https://chatgpt.com/share/684fbf8b-196c-800f-a41f-9502a50cc8a9",
  },
];

export const RESEARCH = [
  {
    title: "Options Pricing — Timelock Protocol",
    venue: "Protocol Docs",
    one:
      "Oracle-less option pricing — Black-Scholes adapted for crypto, implied volatility from Uniswap data, theta approximated via Dirac distributions.",
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
