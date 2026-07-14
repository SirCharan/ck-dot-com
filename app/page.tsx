import type { Metadata } from "next";
import Link from "next/link";
import "@/spikes.css";

export const metadata: Metadata = {
  title: "CK · pick a vibe (WOW spikes)",
  description:
    "Three homepage directions for charandeepkapoor.com — cinematic, kinetic, playful. Preview only; production untouched.",
  robots: { index: false, follow: false },
};

const VARIANTS = [
  {
    href: "/v/cinematic",
    tag: "Version A",
    title: "Cinematic AI lab",
    swatch: "spike-swatch-a",
    body: "Full-viewport entrance, gradient name, breathing orb, proof stats as hero. Premium dark with one huge first impression — the “film trailer” site.",
    cta: "Open cinematic →",
  },
  {
    href: "/v/kinetic",
    tag: "Version B",
    title: "Maximal kinetic",
    swatch: "spike-swatch-b",
    body: "Scroll-story panels, rainbow gradient type, progress bar, magnetic chips. Agency / Awwwards energy — motion every scroll beat.",
    cta: "Open kinetic →",
  },
  {
    href: "/v/playground",
    tag: "Version C",
    title: "Playful engineer",
    swatch: "spike-swatch-c",
    body: "Terminal that types real proof, tappable metric toys, easter-egg curiosity score. Personality-first — fun without faking the numbers.",
    cta: "Open playground →",
  },
] as const;

export default function CompareBoard() {
  return (
    <div className="spike-board">
      <div className="spike-board-inner">
        <p
          className="spike-mono"
          style={{
            color: "#3dfb86",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontSize: "0.72rem",
          }}
        >
          WOW track · isolated preview · production untouched
        </p>
        <h1>Which website should Charandeep be?</h1>
        <p style={{ maxWidth: "40rem", color: "rgba(232,238,245,0.65)", lineHeight: 1.55, margin: 0 }}>
          Three full homepage directions. Same real metrics (Stocky +110%, Timelock, Drishti). Different
          personality. Pick with your girlfriend — winner becomes the full-site overhaul on this branch.
        </p>
        <p
          className="spike-mono"
          style={{ marginTop: "1rem", fontSize: "0.75rem", color: "rgba(232,238,245,0.4)" }}
        >
          Branch <code>wow/triple-spike</code> · Vercel project <code>ck-dot-com-wow</code> · not{" "}
          <code>ck-dot-com-six</code>
        </p>

        <div className="spike-card-grid">
          {VARIANTS.map((v) => (
            <Link key={v.href} href={v.href} className="spike-pick-card">
              <div className={`spike-swatch ${v.swatch}`} aria-hidden />
              <div className="tag spike-mono">{v.tag}</div>
              <h2>{v.title}</h2>
              <p>{v.body}</p>
              <div className="cta spike-mono">{v.cta}</div>
            </Link>
          ))}
        </div>

        <p
          style={{
            marginTop: "3rem",
            fontSize: "0.85rem",
            color: "rgba(232,238,245,0.4)",
            maxWidth: "36rem",
          }}
        >
          After you pick (or hybrid notes like “A hero + C toys”), the full site — track record, work,
          résumé, motion system — gets rebuilt in that language on a follow-up wow branch.
        </p>
      </div>
    </div>
  );
}
