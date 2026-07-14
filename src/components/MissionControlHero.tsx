import Link from "next/link";
import { getTrackRecord } from "@/lib/trackRecord";
import { SITE } from "@/data/site";
import { HeroEquityView } from "./HeroEquityCurve";
import { HeroReveal } from "./mc/HeroReveal";

/**
 * Mission-Control hero — full-viewport identity + live Dhan curve.
 * Credentials as mono chips; primary Book a call CTA.
 */

const RANGE = "FOUNDER · EX-QUANT · AI ENGINEER";

export async function MissionControlHero() {
  const data = await getTrackRecord();
  return (
    <section
      className="mc relative left-1/2 w-screen -translate-x-1/2 border-b border-[rgb(var(--rule))]"
      aria-label="Mission control"
    >
      <div className="mx-auto grid max-w-[var(--mc-shell)] items-center gap-10 px-6 py-16 md:px-8 lg:min-h-[calc(100svh-var(--hdr))] lg:grid-cols-12 lg:gap-12 lg:py-10">
        <HeroReveal className="lg:col-span-7">
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[rgb(var(--warn))]">
            <span
              aria-hidden
              className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-[rgb(var(--warn))] align-middle"
              style={{ boxShadow: "0 0 8px rgb(var(--warn) / 0.8)" }}
            />
            {RANGE}
          </p>
          <h1
            className="mt-4 font-grotesk text-[clamp(2.9rem,7vw,5.5rem)] font-extrabold leading-[0.93] tracking-[-0.035em] text-accent"
            style={{ textShadow: "0 0 30px rgb(var(--accent) / 0.3)" }}
          >
            Charandeep Kapoor
          </h1>
          <p className="mt-6 max-w-[46ch] font-serif text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.45] text-ink">
            I build AI that trades markets — <span className="text-accent">for real</span>.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[12.5px] text-[rgb(var(--mute))]">
            <a
              href="https://perps.timelock.trade/"
              className="text-ink underline decoration-[rgb(var(--accent)/0.45)] underline-offset-4 transition-colors hover:text-accent"
            >
              Timelock
            </a>
            <span className="text-[rgb(var(--faint))]" aria-hidden>
              ·
            </span>
            <Link
              href="/markets"
              className="text-ink underline decoration-[rgb(var(--accent)/0.45)] underline-offset-4 transition-colors hover:text-accent"
            >
              Stocky
            </Link>
            <span className="text-[rgb(var(--faint))]" aria-hidden>
              ·
            </span>
            <span>ex-quant</span>
            <span className="text-[rgb(var(--faint))]" aria-hidden>
              ·
            </span>
            <span className="text-ink">Delta Exchange</span>
          </div>

          <nav aria-label="Primary" className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={SITE.socials.topmate}
              className="rounded-md bg-accent px-3.5 py-2 font-mono text-[13px] text-[rgb(var(--bg))] transition-opacity hover:opacity-90"
            >
              Book a call
            </a>
            <a
              href="/#writing"
              className="border-b border-[rgb(var(--line-hi))] pb-0.5 font-mono text-[13px] text-[rgb(var(--mute))] transition-colors hover:text-ink"
            >
              Read the essays
            </a>
            <a
              href="https://x.com/yourasianquant"
              className="font-mono text-[13px] text-[rgb(var(--mute))] transition-colors hover:text-ink"
            >
              @yourasianquant
            </a>
          </nav>
        </HeroReveal>

        <HeroReveal className="lg:col-span-5" delayChildren={0.35}>
          <HeroEquityView data={data} />
        </HeroReveal>
      </div>

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
