import { getTrackRecord } from "@/lib/trackRecord";
import { HeroEquityView } from "./HeroEquityCurve";
import { HeroReveal } from "./mc/HeroReveal";

/**
 * Mission-Control hero — "Apollo" language, now a FULL-VIEWPORT landing screen.
 * Two planes on a 12-col grid at lg (identity 7 / live Dhan curve 5); stacks to
 * one auto-height column below lg. Fills calc(100svh - header) so it's the whole
 * first screen. Oversized neon-green name, amber eyebrow, serif lede, credentials
 * line. Async server component: fetches the live Dhan track record (ISR) and
 * passes it into HeroReveal as server children, so the SVG curve renders
 * server-side / JS-off while the entrance stagger runs on the client.
 */

const RANGE = "FOUNDER · EX-QUANT · AI ENGINEER";

export async function MissionControlHero() {
  const data = await getTrackRecord();
  return (
    <section
      className="mc relative left-1/2 w-screen -translate-x-1/2 border-b border-[rgb(var(--rule))]"
      aria-label="Mission control"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:min-h-[calc(100svh-var(--hdr))] lg:grid-cols-12 lg:gap-16 lg:py-10">
        {/* identity */}
        <HeroReveal className="lg:col-span-7">
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[rgb(var(--warn))]">
            <span aria-hidden className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-[rgb(var(--warn))] align-middle" style={{ boxShadow: "0 0 8px rgb(var(--warn) / 0.8)" }} />
            {RANGE}
          </p>
          <h1
            className="mt-4 font-grotesk text-[clamp(2.9rem,7vw,5.5rem)] font-extrabold leading-[0.93] tracking-[-0.035em] text-accent"
            style={{ textShadow: "0 0 30px rgb(var(--accent) / 0.3)" }}
          >
            Charandeep Kapoor
          </h1>
          <p className="mt-6 max-w-[46ch] font-serif text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.45] text-ink">
            I build AI that trades markets — <span className="text-accent">and makes money</span>.
          </p>
          <p className="mt-4 max-w-[52ch] font-serif text-[clamp(1.02rem,1.5vw,1.2rem)] leading-[1.55] text-[rgb(var(--mute))]">
            Founder of{" "}
            <a href="https://perps.timelock.trade/" className="text-ink underline decoration-[rgb(var(--accent)/0.5)] underline-offset-4 transition-colors hover:text-accent">
              Timelock
            </a>{" "}
            &amp;{" "}
            <a href="/markets" className="text-ink underline decoration-[rgb(var(--accent)/0.5)] underline-offset-4 transition-colors hover:text-accent">
              Stocky
            </a>
            {" "}· ex–hedge-fund quant · now{" "}
            <span className="text-ink">AI Product Manager &amp; Engineer at Delta Exchange</span>.
          </p>

          <nav aria-label="Primary" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-[rgb(var(--mute))]">
            <a href="/#writing" className="border-b border-[rgb(var(--line-hi))] pb-0.5 transition-colors hover:text-ink">
              Read the essays
            </a>
            <a href="https://x.com/yourasianquant" className="transition-colors hover:text-ink">@yourasianquant</a>
          </nav>
        </HeroReveal>

        {/* real live Dhan curve */}
        <HeroReveal className="lg:col-span-5" delayChildren={0.35}>
          <HeroEquityView data={data} />
        </HeroReveal>
      </div>

      {/* scroll cue — full-height hero signals there's more below */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="mc-scrollcue text-[rgb(var(--faint))]">
          <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="10" cy="9" r="2.5" fill="rgb(var(--accent))" className="mc-scrollcue-dot" />
        </svg>
      </div>
    </section>
  );
}
