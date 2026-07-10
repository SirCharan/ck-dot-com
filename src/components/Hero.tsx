import { HERO, SITE } from "@/data/site";
import { Hero3D } from "./Hero3D";
import { StatTiles } from "./StatTiles";
import { Caption, MetaGutter } from "./lab/Primitives";
import { CrosshairCursor } from "./lab/CrosshairCursor";

/**
 * Ephemeris hero — band composition, journal-figure style.
 *
 *  1. A full-bleed sim band (ink-void-2) with 80–96px of vertical air holds the
 *     live three-body integration and NOTHING else. Eq. 1 sits faint in the
 *     left margin.
 *  2. The band's lower hairline + a mono Fig. 1 caption divide it from the copy.
 *  3. Below: the display heading (Space Grotesk) + serif intro, with a left
 *     meta gutter of mono tags. Never centred, never over the canvas.
 */
export function Hero() {
  const year = new Date().getFullYear();

  return (
    <section className="pt-10 md:pt-14">
      {/* 1 — full-bleed sim band */}
      <div
        data-testid="hero-sim-band"
        className="relative left-1/2 w-screen -translate-x-1/2 border-y border-[rgb(var(--bone)/0.1)] bg-[rgb(var(--ink-void-2))]"
      >
        {/* Eq. 1 — faint, in the left margin */}
        <div className="pointer-events-none absolute left-4 top-1/2 hidden max-w-[8rem] -translate-y-1/2 md:block lg:left-8">
          <p className="num text-[10px] leading-[1.7] tracking-tight text-[rgb(var(--bone)/0.2)]">
            Eq. 1
            <br />
            r&#776;&#8305; = &minus;G &Sigma;&#8323;&#8322;&#8331;&#8305;&#8318; m&#11330; (r&#8305;&minus;r&#11330;) / |r&#8305;&minus;r&#11330;|&sup3;
          </p>
        </div>
        <div className="relative mx-auto h-[58vh] min-h-[360px] w-full max-w-6xl px-6 py-8 md:h-[68vh] md:py-10">
          <div className="relative h-full w-full">
            <Hero3D />
            <CrosshairCursor label="3-body" />
          </div>
        </div>
      </div>

      {/* 2 — Fig. 1 caption (band's bottom border is the hairline) */}
      <Caption className="mt-3">
        Fig. 1 — Restricted three-body problem · live integration · RK4 ·
        dt=0.008
      </Caption>

      {/* 3 — heading + serif intro, left meta gutter */}
      <MetaGutter
        className="mt-10 md:mt-16"
        meta={[
          `§ 00 / index`,
          HERO.kicker,
          `19.08°N · 72.88°E`,
          `${year}`,
        ]}
      >
        <h1 className="display text-[3rem] leading-[1.04] text-[rgb(var(--bone))] md:text-[4.875rem]">
          {SITE.name}
        </h1>
        <p className="mt-6 max-w-[64ch] font-serif text-[1.25rem] leading-[1.6] text-[rgb(var(--bone)/0.86)]">
          {HERO.lede}
        </p>
        <StatTiles />
      </MetaGutter>
    </section>
  );
}
