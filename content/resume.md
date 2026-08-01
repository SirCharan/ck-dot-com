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
    href: https://drishtisignals.in
    line: >-
      Live LLM signals on Delta crypto perpetuals, 3,600+ users. A 15-minute
      regime-aware Claude cycle across 8 markets, with a risk-managed live
      executor.
  - name: Stocky
    href: https://charandeepkapoor.com/markets
    hrefLabel: charandeepkapoor.com/markets
    line: >-
      Fine-tuned Claude on a custom Zerodha MCP and let it trade Indian F&O for
      a year. ₹15L to ₹31.57L, +110%, Sharpe 2.29, 73% win rate.
    # Optional trailing link. Renders as an anchor on the web page and the PDF;
    # the DOCX appends the bare URL, since a label alone is useless to a parser.
    proof:
      label: verified
      href: https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl
  - name: OpenWispr
    href: https://charandeepkapoor.com/openwispr
    hrefLabel: charandeepkapoor.com/openwispr
    line: >-
      Open-source dictation for macOS. Hold fn, speak, and on-device Whisper
      pastes the text at the cursor. Audio never leaves the machine.
  - name: Second Brain
    href: https://charandeepkapoor.com/second-brain
    hrefLabel: charandeepkapoor.com/second-brain
    line: >-
      Local-first memory for Claude Code. A file-backed vault plus hooks that
      capture each session and recall it in the next. Open source.

experience:
  - company: Delta Exchange
    position: AI Product Manager
    duration: Apr 2026 – Present
    bullets:
      - Own the AI and LLM surface across the trading, signals and research stack.
      - "Product for perpetual futures and options: design, growth and quant tooling."
  - company: Timelock Trade
    position: Founder
    duration: Apr 2025 – Apr 2026
    bullets:
      - "Bootstrapped a decentralized house of finance: perps, options, prediction and binary markets, oracle-less and liquidation-free by design."
      - $7.3M trading volume, $2M TVL, 1,000+ users on Monad testnet.
      - Led 6 across engineering, product, design, BD and marketing.
  - company: Diffusion Labs
    position: Product Manager
    duration: Dec 2023 – Apr 2025
    bullets:
      - "0-to-1 lead for DeFi protocols: prediction markets to liquidation-free lending."
      - Scaled Methlab to 20,000+ users and $50M TVL in 6 months with a team of 15.
      - Launched Puff, a +EV prediction marketplace. $75M market cap, $2.5M ARR.
  - company: Delta Exchange
    position: Product & Growth Consultant
    duration: Jun 2023 – Jul 2024
    bullets:
      - Ran live algos on BTC and ETH. ATM short straddles returned 2,860% in a year; a refined MACD returned 100% over two.
      - Grew YouTube 3K to 25K subscribers in six months; led education and socials.
  - company: Stader Labs
    position: Analyst
    duration: Mar 2023 – Nov 2023
    one: On-chain analytics and treasury optimization for multi-chain staking.
  - company: Heru Finance
    position: Trader & Investment Analyst
    duration: May 2022 – Feb 2023
    one: Ran a $1M fund at 30%+ delta-neutral yields; hedged $5M+ of exposure.

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
  # All three sittings, positionally matched, in one row rather than three.
  - title: CAT 2022 · 2023 · 2024
    detail: 99.79 · 99.85 · 98.85%ile
  - title: National Maths Olympiad
    detail: AIR 3

certifications:
  # Three NISM series in one positionally-matched row, as with CAT above. Frees
  # rail height so the whole résumé can carry larger type on one page.
  - title: NISM Series VA · VIII · XV
    detail: Mutual Funds · Equity Derivatives · Research Analyst
  - title: NTSE, KVPY
    detail: Scholar
---

AI Product Manager at Delta Exchange, India's largest crypto derivatives exchange, where I own the LLM surface across trading, signals and research.
