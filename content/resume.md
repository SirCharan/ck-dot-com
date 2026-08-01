---
# Master source for the résumé. Drives:
#   /resume (app/resume/page.tsx)  ·  public/charandeep-kapoor-resume.pdf  ·  .docx
# Budget is enforced by src/data/resume.test.ts — it fails if content creeps back
# past what fits on one A4 page. Edit here, never in the page component.
name: Charandeep Kapoor
title: AI Product Manager & Engineer
contact:
  email: charandeepkapoor3@gmail.com
  phone: ""
  location: India
  site: charandeepkapoor.com
  linkedin: https://www.linkedin.com/in/charandeep-kapoor/
  github: https://github.com/SirCharan
  twitter: https://x.com/yourasianquant

systems:
  - name: Drishti
    href: https://drishti-beryl.vercel.app
    line: >-
      Live LLM signal system on Delta crypto perpetuals. Claude runs a
      15-minute, regime-aware cycle across 8 markets; an executor places
      reduce-only stop and limit orders behind a daily loss breaker.
  - name: Stocky
    href: https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl
    line: >-
      Fine-tuned Claude on a custom Zerodha MCP and let it trade Indian F&O for
      a year. ₹15L to ₹31.57L, +110%, Sharpe 2.29, 73% win rate.
    # Optional trailing link. Renders as an anchor on the web page and the PDF;
    # the DOCX appends the bare URL, since a label alone is useless to a parser.
    proof:
      label: verified
      href: https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl

experience:
  - company: Delta Exchange
    position: AI Product Manager
    duration: Apr 2026 – Present
    bullets:
      - Own the AI and LLM surface across the trading, signals and research stack.
      - Product for perpetual futures and options, covering design, growth and quant tooling.
  - company: Timelock Trade
    position: Founder
    duration: Apr 2025 – Apr 2026
    bullets:
      - Bootstrapped a decentralized house of finance, perps and options through prediction and binary markets, oracle-less and liquidation-free by design.
      - $7.3M trading volume, $2M TVL, 1,000+ users on Monad testnet (perps.timelock.trade).
      - Led 6 people across engineering, product, design, business development and marketing.
  - company: Diffusion Labs
    position: Product Manager
    duration: Dec 2023 – Apr 2025
    bullets:
      - 0-to-1 lead for DeFi protocols, from prediction markets to liquidation-free lending.
      - Scaled Methlab to 20,000+ users and $50M TVL in 6 months, directing a 15-person team.
      - Launched Puff, a positive-EV prediction marketplace. $75M market cap, $2.5M ARR.
  - company: Delta Exchange
    position: Product & Growth
    duration: Jun 2023 – Jul 2024
    bullets:
      - Ran live algos on BTC and ETH. ATM short straddles returned 2,860% in a year; a refined MACD returned 100% over two.
      - Led education and socials, growing YouTube from 3K to 25K subscribers in six months.
  - company: Stader Labs
    position: Analyst
    duration: Mar 2023 – Nov 2023
    one: On-chain analytics and treasury optimization for multi-chain staking.
  - company: Heru Finance
    position: Trader & Investment Analyst
    duration: May 2022 – Feb 2023
    one: Ran a $500K fund targeting 30%+ delta-neutral yields; hedged over $5M of portfolio exposure.
  - company: Tykhe Block Ventures
    position: VC Analyst
    duration: Mar 2022 – Nov 2023
    one: Technical due diligence on DeFi protocols; advised NFTPerp on derivative pricing.

skills:
  - group: AI & LLM
    items:
      - Agentic AI, multi-step tool-calling
      - LLM systems in production (Claude)
      - Prompt & context engineering
      - MCP, RAG, cost-aware routing
  - group: Markets
    items:
      - Perpetual futures & options
      - Options pricing (Black-Scholes)
      - Risk management
  - group: Build
    items:
      - TypeScript / Next.js
      - Python
      - Solidity
  - group: Product
    items:
      - 0-to-1 delivery
      - Team leadership

academics:
  - title: B.Tech, IIT Kanpur
    detail: 2018 – 2022
  - title: JEE Advanced 2018
    detail: AIR 638 (99.96%ile)
  - title: JEE Main 2018
    detail: AIR 272 (99.98%ile)
  - title: CAT 2023
    detail: 99.85%ile
  - title: National Maths Olympiad
    detail: AIR 3

certifications:
  - title: NISM Series VA
    detail: Mutual Fund Distributor
  - title: NISM Series VIII
    detail: Equity Derivatives
  - title: NISM Series XV
    detail: Research Analyst
  - title: NTSE, KVPY
    detail: Scholar
---

AI Product Manager at Delta Exchange, India's largest crypto derivatives exchange, where I own the LLM surface across trading, signals and research. I build the systems as well as the roadmap: Claude-driven agents that place real orders, size real risk, and carry a year of verified P&L behind them.
