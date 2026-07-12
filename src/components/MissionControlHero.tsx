import { getCycle } from "@/lib/cycle";
import { MissionControlPanel } from "./MissionControlPanel";

/**
 * Mission-Control hero — the ground-up "Apollo, modernised" landing hero.
 *
 * Two planes: identity (left) + a live telemetry readout of ck's real trading
 * machine (right). Server component: the decision comes from getCycle() —
 * Drishti's public R2 snapshot via ISR when configured, else the committed
 * decision-cycle.json (the render contract). The motion (Phase 2) lives in the
 * client MissionControlPanel; JS-off / reduced-motion get the full static panel.
 */

const RANGE = "AI systems · DeFi derivatives · MCP tooling · writing";

const TICKERS: { n: string; l: string; cite?: boolean }[] = [
  { n: "64%", l: "Drishti win · live" },
  { n: "$7.3M", l: "Timelock volume" },
  { n: "21", l: "Delta MCP tools" },
  { n: "+150%", l: "Stocky · verified", cite: true },
];

export async function MissionControlHero() {
  const { cycle: c, live, asOf } = await getCycle();
  const year = new Date().getFullYear();
  return (
    <section
      className="mc relative left-1/2 w-screen -translate-x-1/2 border-y border-[rgb(var(--rule))]"
      aria-label="Mission control"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        {/* identity */}
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-[rgb(var(--mute))]">
            <span aria-hidden className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-accent align-middle" />
            {RANGE}
          </p>
          <h1 className="mt-3 font-grotesk text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink">
            Charandeep Kapoor
          </h1>
          <p className="mt-4 max-w-[40ch] text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.5] text-[rgb(var(--mute))]">
            I build AI that trades real capital — it decides with Claude and{" "}
            <span className="text-ink">executes real orders</span>. Product &amp; AI engineer at Delta
            Exchange, Bombay.
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
            {TICKERS.map((t) => (
              <li key={t.l}>
                <div className="font-grotesk text-[clamp(1.25rem,2.4vw,1.75rem)] font-bold tabular-nums text-ink">
                  {t.n}
                  {t.cite && (
                    <a href="#fn-stocky" aria-describedby="fn-stocky" className="text-[rgb(var(--faint))] hover:text-accent">
                      <sup className="ml-0.5 text-[10px]">1</sup>
                    </a>
                  )}
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-[rgb(var(--faint))]">{t.l}</div>
              </li>
            ))}
          </ul>

          <nav aria-label="Primary" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-[rgb(var(--mute))]">
            <a href="#work" className="border-b-2 border-[rgb(var(--line-hi))] pb-0.5 text-ink hover:text-accent">
              Selected work ↓
            </a>
            <a href="/track-record" className="hover:text-ink">Track record</a>
            <a href="#contact" className="hover:text-ink">Book a call</a>
          </nav>
        </div>

        {/* telemetry */}
        <MissionControlPanel c={c} live={live} asOf={asOf} />
      </div>
      <p
        id="fn-stocky"
        className="mx-auto max-w-6xl px-6 pb-6 font-mono text-[11px] text-[rgb(var(--faint))]"
      >
        <span className="text-[rgb(var(--mute))]">1</span> Stocky returns externally verified via a
        public Sensibull PnL page. Figures as of {year}.
      </p>
    </section>
  );
}
