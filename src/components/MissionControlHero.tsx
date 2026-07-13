import { getTrackRecord } from "@/lib/trackRecord";
import { HeroEquityView } from "./HeroEquityCurve";

/**
 * Mission-Control hero — "Apollo" language. Two planes: identity (left, with a
 * founder/quant/AI-engineer credentials line) + ck's REAL live Dhan equity
 * curve (right). Oversized neon-green name, amber eyebrow, serif lede. Async
 * server component: fetches the live Dhan track record (ISR) and passes it to a
 * sync view, so the whole tree renders server-side / JS-off.
 */

const RANGE = "FOUNDER · EX-QUANT · AI ENGINEER";

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
          <p className="mt-5 max-w-[46ch] font-serif text-[clamp(1.15rem,1.9vw,1.5rem)] leading-[1.45] text-ink">
            I build AI that trades markets — <span className="text-accent">and makes money</span>.
          </p>
          <p className="mt-4 max-w-[48ch] font-serif text-[clamp(1.02rem,1.5vw,1.2rem)] leading-[1.55] text-[rgb(var(--mute))]">
            Founder of{" "}
            <a href="https://perps.timelock.trade/" className="text-ink underline decoration-[rgb(var(--accent)/0.5)] underline-offset-4 hover:text-accent">
              Timelock
            </a>{" "}
            &amp;{" "}
            <a href="/markets" className="text-ink underline decoration-[rgb(var(--accent)/0.5)] underline-offset-4 hover:text-accent">
              Stocky
            </a>
            {" "}· ex–hedge-fund quant · now{" "}
            <span className="text-ink">AI Product Manager &amp; Engineer at Delta Exchange</span>.
          </p>

          <nav aria-label="Primary" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-[rgb(var(--mute))]">
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
