/** Shared real proof for spike landings — never invent numbers. */
export const STOCKY_VERIFIED =
  "https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl";

export const PROOF = {
  name: "Charandeep Kapoor",
  role: "AI Product Manager & Engineer · Delta Exchange",
  ledeOptions: {
    cinematic: "I build AI that trades real markets — verified, live, unfakeable.",
    kinetic: "Systems that move capital. Design that moves people.",
    playground: "Engineer. Designer. Slightly unhinged about both.",
  },
  stats: [
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
      value: "73%",
      label: "Win rate",
      sub: "Stocky · verified",
      href: STOCKY_VERIFIED,
    },
    {
      value: "$7.3M",
      label: "Timelock volume",
      sub: "$2M TVL · 1k+ users",
      href: "https://perps.timelock.trade/",
    },
  ],
  links: {
    topmate: "https://topmate.io/charandeep_kapoor",
    twitter: "https://x.com/yourasianquant",
    github: "https://github.com/SirCharan",
    linkedin: "https://www.linkedin.com/in/charandeep-kapoor/",
    drishti: "https://drishti-beryl.vercel.app",
    timelock: "https://perps.timelock.trade/",
    track: "/track-record",
    work: "/work",
    blog: "/blog",
  },
  projects: [
    {
      title: "Drishti",
      line: "Live LLM signals on crypto perps · real capital",
      href: "https://drishti-beryl.vercel.app",
    },
    {
      title: "Stocky",
      line: "Claude traded Indian F&O for a year · verified +110%",
      href: STOCKY_VERIFIED,
    },
    {
      title: "Timelock",
      line: "Oracle-less DeFi perps · founded end-to-end",
      href: "https://perps.timelock.trade/",
    },
  ],
} as const;
