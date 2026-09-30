"use client";

import { useRef, useState } from "react";

const REPO = "https://github.com/SirCharan/claude-browse";
const INSTALL = [
  "claude plugin marketplace add SirCharan/claude-browse",
  "claude plugin install claude-browse",
];

const FLOW = [
  { name: "Main model", line: "Sends one task and reads one summary." },
  { name: "Sonnet agent", line: "Clicks, reads and retries on the page." },
  { name: "Engine", line: "agent-browser or browser-harness runs the browser." },
  { name: "Summary", line: "Twelve lines or fewer go back up." },
];

const LEDGER_HEAD = ["NAME", "STACK", "PURPOSE", "OWNER", "URL", "IDLE", "STATE"];
const LEDGER_ROWS = [
  ["hn-top", "agent-browser", "read top story", "sess-4f2a", "news.ycombinator.com", "2m", "live"],
  ["gh-issues", "browser-harness", "triage own issues", "sess-91c0", "github.com", "11m", "live"],
  ["docs-old", "agent-browser", "check api page", "sess-0b7e", "docs.example.com", "3h", "stale binary"],
];

const COMPARE_HEAD = ["", "agent-browser", "browser-harness"];
const COMPARE_ROWS = [
  ["Isolation", "Separate profile per daemon", "None. Uses your own Chrome"],
  ["Login state", "Starts logged out", "Your existing logins"],
  ["Speed", "Fast, local daemon", "Slower, drives a full browser over CDP"],
  ["Best for", "Public pages, scraping, checks", "Sites that need your session"],
  ["Daemon", "Yes, one per session", "Attaches to Chrome you already run"],
];

const FACTS = [
  { v: "2", l: "Engines, one router" },
  { v: "MIT", l: "Licence" },
  { v: "12 lines", l: "Max summary to the main model" },
  { v: "1", l: "Session ledger with a reaper" },
];

const FAQ = [
  {
    q: "Does it see my logged-in sites?",
    a: "Only through browser-harness, which attaches to your real Chrome over CDP and so sees whatever that browser is signed in to. agent-browser starts from a clean profile and does not.",
  },
  {
    q: "What does the ledger stop?",
    a: "Lost and duplicate sessions. Every session is recorded with its task, owner, engine, allowed domains and last use, so you can see what is running and why. Domain allowlists are enforced for agent-browser only. browser-harness gives no structured output to check against.",
  },
  {
    q: "How does reaping work?",
    a: "The reaper reads the ledger. It closes daemons that have been idle too long, deletes state files whose daemon is gone, and flags daemons running an older binary than the CLI. Profiled or headed sessions are skipped unless you force it, since closing them can lose a login.",
  },
  {
    q: "Which models run?",
    a: "Your main Claude Code model plans and reads the summary. A Sonnet sub-agent does the browsing. No other model is involved.",
  },
  {
    q: "How do I uninstall?",
    a: "Run claude plugin uninstall claude-browse. Run browse reap first if you want live daemons closed and their state files removed.",
  },
];

function Table({ head, rows, caption, sample }: { head: string[]; rows: string[][]; caption: string; sample?: boolean }) {
  return (
    <div className={`cbl-scroll${sample ? " cbl-sample" : ""}`}>
      <table className="cbl-table press-mono">
        <caption className="cbl-caption">{caption}</caption>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ClaudeBrowseLanding() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(INSTALL.join("\n"));
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <style>{`
.cbl-install{border:1px solid var(--p-line);border-radius:8px;background:var(--p-elev);padding:1rem 1.15rem;max-width:40rem}
.cbl-install pre{margin:0;font-size:.85rem;line-height:1.7;white-space:pre-wrap;overflow-wrap:anywhere}
.cbl-install pre span{color:var(--p-faint);user-select:none}
.cbl-tickets{grid-template-columns:repeat(2,1fr)}@media (min-width:900px){.cbl-tickets{grid-template-columns:repeat(4,1fr)}}@media (max-width:480px){.cbl-tickets{grid-template-columns:1fr}}
.cbl-hero{padding:0 0 clamp(2.5rem,6vw,4rem)}
.cbl-flow{display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem;position:relative;padding-top:2.25rem}
.cbl-bound{position:absolute;top:0;left:calc(25% + .375rem);width:calc(50% - .75rem);border:1px dashed var(--p-metal);border-bottom:0;border-radius:6px 6px 0 0;height:1.8rem;text-align:center;font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--p-metal);line-height:1.8rem}
.cbl-node{border:1px solid var(--p-line);border-radius:6px;background:var(--p-elev);padding:1rem}
.cbl-node.is-noise{border-color:var(--p-metal)}
.cbl-node h3{margin:0 0 .35rem;font-size:1rem}
.cbl-node p{margin:0;color:var(--p-mute);font-size:.88rem;line-height:1.45}
.cbl-scroll{overflow-x:auto}
.cbl-table{border-collapse:collapse;width:100%;min-width:34rem;font-size:.8rem}
.cbl-table th,.cbl-table td{text-align:left;padding:.6rem .8rem;border-bottom:1px solid var(--p-line);white-space:nowrap;font-weight:400}
.cbl-table thead th{color:var(--p-faint);font-size:.7rem;letter-spacing:.08em}
.cbl-table tbody th{color:var(--p-ink);font-weight:600}
.cbl-caption{caption-side:bottom;text-align:left;padding:.6rem .8rem 0;color:var(--p-faint);font-size:.75rem}
.cbl-faq details{border-bottom:1px solid var(--p-line);padding:.9rem 0}
.cbl-faq summary{cursor:pointer;font-weight:600;list-style:none}
.cbl-faq summary::-webkit-details-marker{display:none}
.cbl-faq summary::before{content:"+";display:inline-block;width:1.25rem;color:var(--p-go)}
.cbl-faq details[open] summary::before{content:"-"}
.cbl-faq p{margin:.6rem 0 0 1.25rem;color:var(--p-mute);line-height:1.55;max-width:42rem}
@media (max-width:640px){.cbl-flow{grid-template-columns:1fr;padding-top:0}.cbl-bound{position:static;width:auto;height:auto;border:1px dashed var(--p-metal);border-radius:6px;padding:.3rem;order:1;line-height:1.4}.cbl-node:nth-child(2){order:0}.cbl-node:nth-child(3){order:2}.cbl-node:nth-child(4){order:3}.cbl-node:nth-child(5){order:4}
.cbl-table{table-layout:fixed;min-width:0;font-size:.8rem}.cbl-table th,.cbl-table td{padding:.45rem .4rem;white-space:normal;overflow-wrap:anywhere}.cbl-table th:first-child{width:28%}.cbl-sample .cbl-table{table-layout:auto;min-width:34rem}.cbl-sample .cbl-table th,.cbl-sample .cbl-table td{white-space:nowrap;padding:.6rem .8rem}}
`}</style>

      <div className="cbl-hero">
        <div className="cbl-install">
          <pre className="press-mono">
            {INSTALL.map((c) => (
              <div key={c}>
                <span>$ </span>
                {c}
              </div>
            ))}
          </pre>
        </div>
        <div className="press-hero-actions">
          <button type="button" className="press-btn press-btn-go" onClick={copy}>
            Copy install commands
          </button>
          <a className="press-btn press-btn-ghost" href={REPO} target="_blank" rel="noreferrer">
            View on GitHub
          </a>
          <span className="press-mono" role="status" aria-live="polite" style={{ alignSelf: "center", fontSize: "0.8rem", color: "var(--p-go)" }}>
            {copied ? "Copied" : ""}
          </span>
        </div>
      </div>

      <section className="press-section" id="flow">
        <h2>How a browse call flows</h2>
        <p className="press-section-sub press-serif">
          The page is read twice, clicked many times, and never shown to the main model.
        </p>
        <div className="cbl-flow">
          <div className="cbl-bound press-mono">page noise stays here</div>
          {FLOW.map((n, i) => (
            <div key={n.name} className={`cbl-node${i === 1 || i === 2 ? " is-noise" : ""}`}>
              <h3>{n.name}</h3>
              <p>{n.line}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="press-section" id="ledger">
        <h2>The ledger</h2>
        <p className="press-section-sub press-serif">
          Every live session is on record. browse ls prints the list.
        </p>
        <div className="press-ledger">
          <Table sample head={LEDGER_HEAD} rows={LEDGER_ROWS} caption="Sample output" />
        </div>
      </section>

      <section className="press-section" id="engines">
        <h2>Two engines</h2>
        <p className="press-section-sub press-serif">
          The router picks per task. You can also name one.
        </p>
        <div className="press-ledger">
          <Table head={COMPARE_HEAD} rows={COMPARE_ROWS} caption="agent-browser and browser-harness compared" />
        </div>
      </section>

      <section className="press-section" id="facts">
        <div className="press-tickets cbl-tickets">
          {FACTS.map((f) => (
            <div key={f.l} className="press-ticket">
              <div className="press-ticket-val press-mono">{f.v}</div>
              <div className="press-ticket-label">{f.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="press-section" id="faq">
        <h2>Questions</h2>
        <div className="cbl-faq">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="press-section" id="get">
        <a className="press-plate" href={REPO} target="_blank" rel="noreferrer" style={{ minHeight: "9rem" }}>
          <div className="press-plate-body">
            <h3>Read the source on GitHub</h3>
            <p className="press-mono">SirCharan/claude-browse · MIT licence</p>
          </div>
        </a>
      </section>
    </>
  );
}
