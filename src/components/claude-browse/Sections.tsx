import Link from "next/link";
import { COMPARE, DOCTOR, FAQ, LEDGER, MEASURED, REPO, STEPS } from "./data";
import { InstallRow } from "./Hero";

const n = (v: number) => v.toLocaleString("en-US");

export function WorksWith() {
  return (
    <section className="cb-wrap cb-section cb-section-tight cb-r">
      <div className="cb-works" aria-label="Runs with">
        <span>Claude Code</span>
        <span>Claude Sonnet</span>
        <span>agent-browser</span>
        <span>browser-harness</span>
        <span>macOS</span>
        <span>Linux</span>
      </div>
    </section>
  );
}

export function Proof() {
  return (
    <section className="cb-wrap cb-section cb-section-tight cb-r">
      <div className="cb-proof">
        <div>
          <div className="n">
            <em>≈{MEASURED.summary}</em> tokens
          </div>
          <div className="l">reached your main model</div>
        </div>
        <div>
          <div className="n">{MEASURED.seconds} s</div>
          <div className="l">one page, end to end</div>
        </div>
        <div>
          <div className="n">12 lines</div>
          <div className="l">max reply to your main model</div>
        </div>
      </div>
    </section>
  );
}

export function Measured() {
  const rows: [string, number, boolean][] = [
    ["Full snapshot", MEASURED.full, false],
    ["Compact interactive", MEASURED.compact, false],
    ["What you read", MEASURED.summary, true],
  ];
  return (
    <section id="measured" className="cb-wrap cb-section cb-r">
      <div className="cb-head">
        <span className="cb-k">Measured</span>
        <h2 className="cb-h2">
          Same page. <em>Three sizes.</em> <span className="tail">Hacker News front page, {MEASURED.date}.</span>
        </h2>
      </div>
      <div className="cb-measured">
        <div className="cb-shot" aria-label="The Hacker News front page, with the three sizes marked">
          <div className="cb-shot-bar">
            <span className="cb-y">Y</span>
            <span className="cb-shot-url">news.ycombinator.com</span>
          </div>
          <div className="cb-shot-img">
            <img src="/images/claude-browse/hn.webp" alt="" width={1200} height={760} loading="lazy" />
            {rows.map(([l, v, go]) => (
              <div
                key={l}
                className={`cb-size${go ? " is-go" : ""}`}
                style={{ height: `${Math.max((v / MEASURED.full) * 100, 4)}%` }}
              >
                <span>
                  {l} · ≈{n(v)} tokens
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="cb-bars">
            {rows.map(([l, v, go]) => (
              <div className={`cb-bar${go ? " is-go" : ""}`} key={l}>
                <span className="l">{l}</span>
                <span className="t">
                  <span className="f" style={{ width: `${Math.max((v / MEASURED.full) * 100, 1.2)}%` }} />
                </span>
                <span className="v">≈{n(v)}</span>
              </div>
            ))}
          </div>
          <p className="cb-body" style={{ marginTop: 28 }}>
            Sonnet reads the page. Your main model reads the reply. The difference is what you stop paying for on
            every later turn.
          </p>
          <p className="cb-legend">
            {MEASURED.version} · characters divided by four · one page, one run
          </p>
        </div>
      </div>
    </section>
  );
}

export function Engines() {
  return (
    <section id="engines" className="cb-wrap cb-section cb-r">
      <div className="cb-feature">
        <div className="cb-feature-text">
          <span className="cb-k">Engines</span>
          <h2 className="cb-h2" style={{ marginTop: 14 }}>
            Two engines. <em>One command.</em> <span className="tail">The router picks, and the summary says which.</span>
          </h2>
          <p className="cb-body">
            <b>agent-browser</b> runs an isolated headless daemon and returns snapshots with @e refs.{" "}
            <b>browser-harness</b> drives the Chrome you are signed in to. The router picks.
          </p>
        </div>
        <div className="cb-glass">
          <table className="cb-table">
            <thead>
              <tr>
                <th />
                <th className="is-go">agent-browser</th>
                <th>browser-harness</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([k, a, b]) => (
                <tr key={k}>
                  <td>{k}</td>
                  <td>{a}</td>
                  <td>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Ledger() {
  const html = LEDGER.replace(/^\$ (.*)$/gm, "<b>$ $1</b>")
    .replace(/version-mismatch/g, "<i>version-mismatch</i>")
    .replace(/^(would close .*)$/gm, "<u>$1</u>");
  return (
    <section id="ledger" className="cb-wrap cb-section cb-r">
      <div className="cb-feature is-flip">
        <div className="cb-feature-text">
          <span className="cb-k">Ledger</span>
          <h2 className="cb-h2" style={{ marginTop: 14 }}>
            Every session <em>leaves a record</em>.{" "}
            <span className="tail">Purpose, owner, engine, allowed domains, last use.</span>
          </h2>
          <p className="cb-body">
            <code>browse ls</code> names each session, its task and its owner. <code>browse reap</code> closes the
            idle ones, deletes orphan files and flags a stale binary. <code>--dry-run</code> shows the list first.
          </p>
        </div>
        <pre className="cb-term" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  );
}

export function Bento() {
  const doctor = DOCTOR.split("\n")
    .slice(0, 4)
    .map((l) => l.replace(/^(PASS|WARN)/, "<i>$1</i>"))
    .join("\n");
  return (
    <section className="cb-wrap cb-section cb-r">
      <div className="cb-bento">
        <div className="cb-cell">
          <h3>Read 12 lines, not the page</h3>
          <p>One shape every time.</p>
          <div className="cb-chips">
            {["RESULT", "KEY DATA", "SOURCES", "ARTIFACTS", "SESSION", "BLOCKERS"].map((k) => (
              <span key={k}>{k}</span>
            ))}
          </div>
        </div>
        <div className="cb-cell">
          <h3>Stay inside the allowlist</h3>
          <p>Off-list domains are refused before the browser moves.</p>
          <div className="cb-mini">
            $ browse run ab-smoke open https://evil.com{"\n"}
            <i>policy: evil.com not in allowed_domains</i>
            {"\n"}exit 3
          </div>
        </div>
        <div className="cb-cell">
          <h3>Reap what you forgot</h3>
          <p>Idle daemons close. Orphan files go. Stale binaries get flagged.</p>
          <div className="cb-mini">
            $ browse reap --idle-hours 4 --dry-run{"\n"}
            <i>would close</i> kayak (idle 10d 15h){"\n"}reap: closed 1, orphans removed 6, flagged 4, dry-run
          </div>
        </div>
        <div className="cb-cell">
          <h3>Check the machine</h3>
          <p>What is installed, what is reachable, what to fix.</p>
          <div className="cb-mini" dangerouslySetInnerHTML={{ __html: `$ browse doctor\n${doctor}` }} />
        </div>
      </div>
    </section>
  );
}

export function Install() {
  return (
    <section id="install" className="cb-wrap cb-section cb-center cb-r">
      <span className="cb-k">Install</span>
      <h2 className="cb-h2" style={{ marginTop: 14 }}>
        Three commands to the first run.
      </h2>
      <div className="cb-steps">
        {STEPS.map(([num, t, c]) => (
          <div className="cb-step" key={num}>
            <span className="n">{num}</span>
            <span className="t">{t}</span>
            <code>{c}</code>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="cb-wrap cb-section cb-r">
      <div className="cb-head">
        <span className="cb-k">Questions</span>
        <h2 className="cb-h2">Fair questions.</h2>
      </div>
      <div className="cb-faq">
        {FAQ.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Close() {
  return (
    <section className="cb-wrap cb-section cb-center cb-close cb-r">
      <h2 className="cb-h2">
        Let a sub-agent
        <br className="cb-br" />
        <em>read the web</em>.
      </h2>
      <InstallRow center />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="cb-foot">
      <div className="cb-wrap cb-foot-in">
        <span className="cb-brand">claude-browse</span>
        <span>MIT</span>
        <span>Python stdlib</span>
        <a href={REPO}>GitHub</a>
        <span className="grow" />
        <Link href="/">by Charandeep Kapoor</Link>
      </div>
    </footer>
  );
}
