import { HERO, SITE } from "@/data/site";
import { GodsEye } from "./GodsEye";
import { Hero3D } from "./Hero3D";
import { StatTiles } from "./StatTiles";

// The 3-body WebGL backdrop is the primary hero visual. GodsEye (the SVG
// isometric surface) is kept available behind this flag — flip to true to
// restore it instead of / alongside the 3D scene.
const SHOW_GODSEYE = false;

export function Hero() {
  return (
    <section className="relative pt-12 pb-12 md:pt-16 md:pb-16">
      <Hero3D />
      {SHOW_GODSEYE && <GodsEye />}
      <div className="relative z-10">
        <p className="kicker mb-5">
          {HERO.kicker} · {new Date().getFullYear()}
        </p>
        <h1 className="display text-5xl leading-[1.02] text-ink md:text-7xl">
          {SITE.name}
        </h1>
        <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-ink/85 md:text-xl">
          {HERO.lede}
        </p>
        <StatTiles />
      </div>
    </section>
  );
}
