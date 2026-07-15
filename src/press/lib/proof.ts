export const STOCKY_VERIFIED =
  "https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl";

export const PROOF = {
  name: "Charandeep Kapoor",
  role: "AI Product Manager & Engineer · Delta Exchange",
  lede: "Using AI to build a money printing machine.",
  socials: {
    topmate: "https://topmate.io/charandeep_kapoor",
    twitter: "https://x.com/yourasianquant",
    linkedin: "https://www.linkedin.com/in/charandeep-kapoor/",
    github: "https://github.com/SirCharan",
    telegram: "https://t.me/charandeep_kapoor",
  },
  tickets: [
    {
      value: "+110%",
      label: "Stocky ROI",
      sub: "₹15L → ₹31.57L · verified",
      href: STOCKY_VERIFIED,
    },
    {
      value: "2.29",
      label: "Sharpe",
      sub: "Stocky · full year",
      href: STOCKY_VERIFIED,
    },
    {
      value: "$7.3M",
      label: "Timelock vol",
      sub: "$2M TVL · 1k+ users",
      href: "https://perps.timelock.trade/",
    },
  ],
  ships: [
    {
      title: "Drishti",
      line: "Live LLM signals · real capital on Delta",
      href: "/work/drishti",
      cover: "/images/work/drishti/equity-curve.png",
      alt: "Drishti equity curve and stats",
    },
    {
      title: "Stocky",
      line: "Claude traded Indian F&O for a year · verified",
      href: "/markets",
      cover: "/images/stocky/stocky-terminal.png",
      alt: "Stocky terminal",
    },
    {
      title: "Timelock",
      line: "Oracle-less DeFi perps · founded end to end",
      href: "/work/timelock",
      cover: "/images/work/timelock/perps-terminal.jpg",
      alt: "Timelock trading terminal",
    },
  ],
} as const;
