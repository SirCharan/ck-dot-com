import cycle from "@/data/decision-cycle.json";

/**
 * Mission-Control hero — the ground-up "Apollo, modernised" landing hero.
 *
 * Two planes: identity (left) + a live telemetry readout of ck's real trading
 * machine (right). This is the Phase-1 STATIC end-state — no motion, no live
 * fetch. It reads every value from src/data/decision-cycle.json (the committed
 * render contract), so a later ISR feed can swap the data without touching the
 * markup. Renders fully with JS off. Motion (Phase 2) and the live feed
 * (Phase 3) layer on top of exactly this.
 */

type Cycle = typeof cycle;

const RANGE = "AI systems · DeFi derivatives · MCP tooling · writing";

const TICKERS: { n: string; l: string; cite?: boolean }[] = [
  { n: "64%", l: "Drishti win · live" },
  { n: "$7.3M", l: "Timelock volume" },
  { n: "21", l: "Delta MCP tools" },
  { n: "+150%", l: "Stocky · verified", cite: true },
];

function pct(v: number) {
  return `${Math.round(v * 100)}%`;
}

function Bar({ label, value, display }: { label: string; value: number; display: string }) {
  const w = Math.max(4, Math.min(100, Math.round(value * 100)));
  return (
    <div className="grid grid-cols-[88px_1fr_auto] items-center gap-3 text-[12px]">
      <span className="font-mono uppercase tracking-[0.12em] text-[rgb(var(--faint))]">{label}</span>
      <span className="h-[6px] overflow-hidden rounded-full bg-[rgb(var(--raised))]" role="presentation">
        <span className="block h-full rounded-full bg-accent" style={{ width: `${w}%` }} />
      </span>
      <span className="font-mono tabular-nums text-ink">{display}</span>
    </div>
  );
}

function TelemetryPanel({ c }: { c: Cycle }) {
  const rrScaled = Math.min(1, c.rr / 3); // 3.0 R:R fills the bar
  return (
    <div className="rounded-2xl border border-[rgb(var(--rule))] border-t-[rgb(var(--line-hi))] bg-[rgb(var(--panel))]">
      <div className="flex items-center justify-between border-b border-[rgb(var(--rule))] px-4 py-3 font-mono text-[11px] tracking-[0.06em] text-[rgb(var(--faint))]">
        <span>telemetry · {c.asset} cycle</span>
        <span className="flex items-center gap-2 text-accent">
          <span aria-hidden className="inline-block h-[7px] w-[7px] rounded-full bg-accent" />
          nominal · next <span className="tabular-nums text-ink">03:41</span>
        </span>
      </div>
      <div className="space-y-3 px-4 pt-4">
        <Bar label="conviction" value={c.conviction} display={c.conviction.toFixed(2)} />
        <Bar label="win rate" value={c.winRateAgg} display={pct(c.winRateAgg)} />
        <Bar label="R:R" value={rrScaled} display={c.rr.toFixed(2)} />
      </div>
      <div className="mt-4 border-t border-[rgb(var(--rule))] px-4 py-4">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[13px]">
          <span className="rounded-md bg-accent px-2.5 py-1 font-semibold uppercase tracking-[0.04em] text-[rgb(var(--bg))]">
            ▸ {c.direction} {c.asset.replace("USD", "")}
          </span>
          <span className="text-[rgb(var(--mute))]">
            e <span className="tabular-nums text-ink">{c.entry.toLocaleString()}</span> · sl{" "}
            <span className="tabular-nums text-ink">{c.stop.toLocaleString()}</span> · tp{" "}
            <span className="tabular-nums text-ink">{c.target.toLocaleString()}</span>
          </span>
        </div>
        <p className="mt-3 max-w-[46ch] font-serif text-[14px] leading-[1.6] text-[rgb(var(--mute))]">
          {c.reasoning}
        </p>
        <div className="mt-3 font-mono text-[12px] text-[rgb(var(--faint))]">
          burn armed ·{" "}
          {c.resolved ? (
            <span className={c.result.outcome === "win" ? "text-positive" : "text-neg"}>
              resolved {c.result.r > 0 ? "+" : ""}
              {c.result.r}R
            </span>
          ) : (
            <span className="text-amber">pending</span>
          )}{" "}
          · latest archived cycle, replayed
        </div>
      </div>
    </div>
  );
}

export function MissionControlHero() {
  const c = cycle as Cycle;
  const year = new Date().getFullYear();
  return (
    <section
      className="mc relative left-1/2 w-screen -translate-x-1/2 border-y border-[rgb(var(--rule))]"
      aria-label="Mission control"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        {/* identity */}
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
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
                  {t.cite && <sup className="ml-0.5 text-[10px] text-accent">1</sup>}
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-[rgb(var(--faint))]">{t.l}</div>
              </li>
            ))}
          </ul>

          <nav aria-label="Primary" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-[rgb(var(--mute))]">
            <a href="#work" className="border-b-2 border-accent pb-0.5 text-ink hover:text-accent">
              Selected work ↓
            </a>
            <a href="/track-record" className="hover:text-ink">Track record</a>
            <a href="#contact" className="hover:text-ink">Book a call</a>
          </nav>
        </div>

        {/* telemetry */}
        <TelemetryPanel c={c} />
      </div>
      <p className="sr-only">
        ¹ Stocky returns externally verified via a public Sensibull PnL page. Figure {year}.
      </p>
    </section>
  );
}
