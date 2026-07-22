import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell, PageIntro } from "@/components/PageShell";
import { ProofOfWork } from "@/components/ProofOfWork";
import { Research } from "@/components/Research";
import { TOOLS } from "@/data/site";

export const metadata: Metadata = {
  title: "Proof of Work",
  description:
    "Live projects and research by Charandeep Kapoor: AI trading systems, MCP servers, options tooling, and protocol research across crypto and Indian equities.",
};

// Flagship plates, in display order (first spans two rows via .press-ships).
const FEATURED = ["Drishti", "Stocky AI", "Timelock", "Second Brain"]
  .map((title) => TOOLS.find((t) => t.title === title))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));

export default function WorkPage() {
  return (
    <PageShell>
      <PageIntro
        kicker="Proof of work"
        title="Things I've shipped"
        lede="Live products and trading systems on real capital. Not mockups, not vapor."
      />

      <section className="press-section" id="featured">
        <h2>Featured</h2>
        <p className="press-section-sub press-serif">
          Four systems I keep pointing people to.
        </p>
        <div className="press-ships">
          {FEATURED.map((t, i) => (
            <Link key={t.title} href={t.detail ?? t.live ?? "#"} className="press-plate">
              {t.cover && (
                <div className="press-plate-media">
                  <Image
                    src={t.cover}
                    alt={`${t.title} preview`}
                    fill
                    sizes={i === 0 ? "(min-width:900px) 55vw, 100vw" : "(min-width:900px) 40vw, 100vw"}
                    priority={i === 0}
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
              )}
              <div className="press-plate-body">
                <h3>{t.title}</h3>
                <p>{t.one}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ProofOfWork />
      <Research />
    </PageShell>
  );
}
