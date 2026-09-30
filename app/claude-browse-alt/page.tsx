import Link from "next/link";

export const metadata = { title: "claude-browse landing alternatives", robots: { index: false } };

const ALTS: [string, string, string][] = [
  ["a", "Receipt", "Linear / Steel. Product-first dark, mono-forward. Signature: animated cost meter, charts and flowcharts."],
  ["b", "Storyboard", "Browser Use / Raycast. Warm editorial dark, big serif. Signature: five chapters, each an animated scene."],
  ["c", "Whitepaper", "Warp / Cognition. Light paper, dot grid, mono display. Signature: numbered figures, sequence diagram, state machine."],
  ["d", "Split screen", "Claude Code / Cursor. Every section is a before/after pair with a mini chart."],
];

export default function AltIndex() {
  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px", fontFamily: "ui-sans-serif, system-ui", lineHeight: 1.5 }}>
      <h1 style={{ fontSize: 28, margin: 0 }}>claude-browse: four landing alternatives</h1>
      <p style={{ opacity: 0.7, marginTop: 8 }}>Built from scratch from the same facts and the same study. Pick sections across them.</p>
      <ol style={{ padding: 0, listStyle: "none", marginTop: 32, display: "grid", gap: 20 }}>
        {ALTS.map(([slug, name, blurb]) => (
          <li key={slug} style={{ border: "1px solid rgba(127,127,127,.35)", borderRadius: 12, padding: 20 }}>
            <Link href={`/claude-browse-alt/${slug}`} style={{ fontSize: 20, fontWeight: 600, textDecoration: "none" }}>
              {slug.toUpperCase()} · {name}
            </Link>
            <p style={{ margin: "6px 0 0", opacity: 0.75 }}>{blurb}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
