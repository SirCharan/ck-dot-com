import { getTrackRecord } from "@/lib/trackRecord";
import { HeroEquityView } from "./HeroEquityCurve";

/**
 * Mission-Control hero — "Apollo" language. Two planes: identity (left) + ck's
 * REAL live Dhan equity curve + a machine schematic (right). Oversized neon-green
 * name, amber eyebrow, serif lede, decluttered proof tickers. Async server
 * component: fetches the live Dhan track record (ISR) and passes it to a sync
 * view, so the whole tree renders server-side / JS-off.
 */

const RANGE = "AI PRODUCT MANAGER & ENGINEER · DELTA EXCHANGE";
const STOCKY_VERIFIED = "https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl";

const TICKERS: { n: string; l: string; href?: string }[] = [
  { n: "64%", l: "Drishti win · live" },
  { n: "$7.3M", l: "Timelock volume" },
  { n: "21", l: "Delta MCP tools" },
  { n: "+150%", l: "Stocky · verified", href: STOCKY_VERIFIED },
];

export async function MissionControlHero() {
  const data = await getTrackRecord();
  return (
    <section
      className="mc relative left-1/2 w-screen -translate-x-1/2 border-y border-[rgb(var(--rule))]"
      aria-label="Mission control"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        {/* identity */}
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[rgb(var(--warn))]">
            <span aria-hidden className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-[rgb(var(--warn))] align-middle" />
            {RANGE}
          </p>
          <h1
            className="mt-3 font-grotesk text-[clamp(2.6rem,6vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-accent"
            style={{ textShadow: "0 0 26px rgb(var(--accent) / 0.28)" }}
          >
            Charandeep Kapoor
          </h1>
          <p className="mt-5 max-w-[44ch] font-serif text-[clamp(1.15rem,1.9vw,1.5rem)] leading-[1.45] text-ink">
            I build AI that trades markets — <span className="text-accent">and makes money</span>.
          </p>
          <p className="mt-3 max-w-[44ch] font-serif text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.5] text-[rgb(var(--mute))]">
            AI Product Manager &amp; Engineer at Delta Exchange. I ship trading systems, DeFi
            derivatives and tooling — from Bangalore.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {TICKERS.map((t) => {
              const val = <span className="font-grotesk text-[1.05rem] font-bold tabular-nums text-ink">{t.n}</span>;
              return (
                <li key={t.l} className="font-mono text-[11px] text-[rgb(var(--faint))]">
                  {t.href ? (
                    <a href={t.href} className="hover:text-accent">
                      {val} <span className="align-middle">{t.l} ↗</span>
                    </a>
                  ) : (
                    <>
                      {val} <span className="align-middle">{t.l}</span>
                    </>
                  )}
                </li>
              );
            })}
          </ul>

          <nav aria-label="Primary" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-[rgb(var(--mute))]">
            <a href="/#work" className="border-b-2 border-accent pb-0.5 text-ink hover:text-accent">
              See the work ↓
            </a>
            <a href="/#writing" className="border-b border-[rgb(var(--line-hi))] pb-0.5 hover:text-ink">
              Read the essays
            </a>
            <a href="https://x.com/yourasianquant" className="hover:text-ink">@yourasianquant</a>
          </nav>
        </div>

        {/* real Dhan curve + machine schematic */}
        <HeroEquityView data={data} />
      </div>
    </section>
  );
}
