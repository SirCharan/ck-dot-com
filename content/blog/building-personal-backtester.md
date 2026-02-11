---
title: "Building a Personal Backtester"
date: "2026-02-05"
slug: "building-personal-backtester"
excerpt: "Why I built my own backtesting engine instead of using off-the-shelf tools."
tags: ["quant", "python", "backtesting", "trading"]
---

Most retail quant traders start with backtrader, zipline, or one of the cloud platforms. I chose to build my own. Here's why.

## Limitations of Existing Frameworks

1. **Over-abstraction** — Many engines hide execution logic in ways that make realistic simulation hard
2. **Crypto support** — Native support for perpetuals, funding, and on-chain data is often an afterthought
3. **Custom metrics** — I wanted to track things like drawdown duration, regime-adjusted Sharpe, and factor exposures

## Core Design Choices

### Event-driven vs vectorized

I went event-driven. Vectorized backtests are faster but can obscure look-ahead bias and make realistic fill modeling difficult.

### Data model

Each bar is a first-class object with:

- OHLCV
- Volume profile (when available)
- Funding rate (for perps)
- Custom tags (e.g., `pre_halving`, `post_etf_approval`)

### Fees and slippage

Every trade incurs:

- Maker/taker fee from the exchange
- Slippage modeled as a function of order size and average spread

Without these, backtests are fairy tales.

## Lessons Learned

- Start simple: a loop over bars with a minimal strategy interface
- Add complexity only when you hit a wall
- The 80/20: 80% of the value came from 20% of the features

## Open Questions

Could this be open-sourced? Perhaps. The plumbing is generic; the strategies are not.
