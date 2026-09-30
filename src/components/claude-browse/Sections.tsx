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
      <p className="cb-works-cap">Runs on the Claude Code you already have. No key to add.</p>
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
          <div className="l">what your main model read from one page</div>
        </div>
        <div>
          <div className="n">{MEASURED.seconds} s</div>
          <div className="l">one Hacker News front page, end to end</div>
        </div>
        <div>
          <div className="n">4 daemons</div>
          <div className="l">found idle for 10 days on one laptop</div>
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
          One Hacker News front page, <em>three sizes</em>. <span className="tail">One page, one run.</span>
        </h2>
      </div>
      <div className="cb-bars">
        {rows.map(([l, v, go]) => (
          <div className={`cb-bar${go ? " is-go" : ""}`} key={l}>
            <span className="l">{l}</span>
            <span className="t">
              <span className="f" style={{ width: `${Math.max((v / MEASURED.full) * 100, 1.2)}%` }} />
            </span>
            <span className="v">≈{n(v)} tokens</span>
          </div>
        ))}
      </div>
      <p className="cb-legend">
        Measured {MEASURED.date} with {MEASURED.version} · counts are characters divided by four · the summary is the whole reply, unedited
      </p>
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
            <b>agent-browser</b> is the default. It runs an isolated headless daemon and returns accessibility
            snapshots with @e refs, so the agent acts on elements instead of guessing selectors.
          </p>
          <p className="cb-body">
            <b>browser-harness</b> drives the Chrome you are already signed in to, over CDP. The router picks it when
            you say so or when the page needs your login.
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
            I found 4 browser daemons on my laptop that had run for 10 days on a binary three versions old. Nothing
            could say why.
          </p>
          <p className="cb-body">
            Now <code>browse ls</code> lists every session with its task and the Claude session that opened it.{" "}
            <code>browse reap</code> closes the idle ones, deletes orphan state files and flags a stale binary. Run it
            with <code>--dry-run</code> first; it changes nothing.
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
          <p>The sub-agent returns one shape every time, so the main model never parses a page.</p>
          <div className="cb-chips">
            {["RESULT", "KEY DATA", "SOURCES", "ARTIFACTS", "SESSION", "BLOCKERS"].map((k) => (
              <span key={k}>{k}</span>
            ))}
          </div>
        </div>
        <div className="cb-cell">
          <h3>Stay inside the allowlist</h3>
          <p>Each session names the domains it may visit. Anything else is refused before the browser moves.</p>
          <div className="cb-mini">
            $ browse run ab-smoke open https://evil.com{"\n"}
            <i>policy: evil.com not in allowed_domains</i>
            {"\n"}exit 3
          </div>
        </div>
        <div className="cb-cell">
          <h3>Reap what you forgot</h3>
          <p>Idle daemons close. Orphan state files go. A daemon on an older binary than the CLI gets flagged.</p>
          <div className="cb-mini">
            $ browse reap --idle-hours 4 --dry-run{"\n"}
            <i>would close</i> kayak (idle 10d 15h){"\n"}reap: closed 1, orphans removed 6, flagged 4, dry-run
          </div>
        </div>
        <div className="cb-cell">
          <h3>Check the machine</h3>
          <p>One command tells you what is installed, what is reachable and what to fix.</p>
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
      <p className="cb-sub">Install claude-browse and run your first /browse.</p>
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
