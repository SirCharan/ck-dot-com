import Link from "next/link";
import { COMPARE, FAQ, LEDGER, MEASURED, REPO } from "./data";
import { InstallRow } from "./Hero";
import { InstallStepper, SafePanel } from "./Panels";

const n = (v: number) => v.toLocaleString("en-US");

export function WorksWith() {
  return (
    <section className="cb-wrap cb-section cb-section-tight cb-r">
      <div className="cb-works" aria-label="Works with">
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

function Flow() {
  const turns = [1, 2, 3, 4];
  const cost = (i: number, per: number) => n(i * per);
  return (
    <div className="cb-flow" aria-label="Four messages, with and without claude-browse">
      <div className="cb-flow-col">
        <div className="cb-flow-h">Without claude-browse</div>
        {turns.map((i) => (
          <div className={`cb-msg cb-m${i}`} key={i}>
            <span className="who">message {i}</span>
            <span className="blocks">
              {turns.slice(0, i).map((k) => (
                <span className="blk" key={k} />
              ))}
            </span>
            <span className="cost">{cost(i, MEASURED.full)} tokens paid so far</span>
          </div>
        ))}
        <p className="cb-flow-cap">The page rides along with every message after it.</p>
      </div>
      <div className="cb-flow-col is-go">
        <div className="cb-flow-h">With claude-browse</div>
        {turns.map((i) => (
          <div className={`cb-msg cb-m${i}`} key={i}>
            <span className="who">message {i}</span>
            <span className="blocks">
              <span className="blk is-go" />
            </span>
            <span className="cost">{cost(i, MEASURED.summary)} tokens paid so far</span>
          </div>
        ))}
        <p className="cb-flow-cap">Only the short reply rides along.</p>
      </div>
    </div>
  );
}

export function Problem() {
  const cards: [string, string][] = [
    [
      "A page is a lot of text",
      `One Y Combinator news page is about ${n(MEASURED.full)} tokens. A token is roughly a word, and tokens are what you pay for.`,
    ],
    ["Your chat keeps all of it", "Every new message re-sends the whole conversation, pages included."],
    ["So everything after gets slower and pricier", "One browse becomes a tax on every reply that follows it."],
  ];
  return (
    <section id="problem" className="cb-wrap cb-section cb-r">
      <div className="cb-head">
        <span className="cb-k">The problem</span>
        <h2 className="cb-h2">
          Every page you open stays in the chat.{" "}
          <span className="tail">And you pay for it again on every message.</span>
        </h2>
      </div>
      <Flow />
      <div className="cb-problem">
        {cards.map(([t, b]) => (
          <div className="cb-cell" key={t}>
            <h3>{t}</h3>
            <p>{b}</p>
          </div>
        ))}
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
          <div className="l">is all your chat receives from one page</div>
        </div>
        <div>
          <div className="n">{MEASURED.seconds} seconds</div>
          <div className="l">from question to answer</div>
        </div>
        <div>
          <div className="n">12 lines</div>
          <div className="l">is the longest reply allowed</div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps: [string, string][] = [
    ["You ask", "Type /browse and a question, in any Claude Code session."],
    ["A helper opens a browser", "A Sonnet sub-agent loads the page, clicks and reads. Your chat waits."],
    ["It writes back, briefly", "At most 12 lines: the answer, the key facts, the sources."],
    ["The pages are thrown away", "Only the short reply enters your chat."],
  ];
  return (
    <section id="how" className="cb-wrap cb-section cb-r">
      <div className="cb-head">
        <span className="cb-k">How it works</span>
        <h2 className="cb-h2">
          You ask. A helper browses. You get <em>the short version</em>.
        </h2>
      </div>
      <div className="cb-feature">
        <ol className="cb-steplist">
          {steps.map(([t, b], i) => (
            <li key={t}>
              <span className="num">0{i + 1}</span>
              <span className="t">{t}</span>
              <span className="b">{b}</span>
            </li>
          ))}
        </ol>
        <div>
          <p className="cb-subhead">Two ways to browse</p>
          <div className="cb-glass">
            <table className="cb-table">
              <thead>
                <tr>
                  <th />
                  <th className="is-go">A private browser</th>
                  <th>Your own Chrome</th>
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
          <p className="cb-legend">The helper picks one for each task, and tells you which it used.</p>
        </div>
      </div>
    </section>
  );
}

export function Measured() {
  const rows: [string, number, boolean][] = [
    ["The whole page", MEASURED.full, false],
    ["Just the clickable parts", MEASURED.compact, false],
    ["What your chat received", MEASURED.summary, true],
  ];
  return (
    <section id="measured" className="cb-wrap cb-section cb-r">
      <div className="cb-head">
        <span className="cb-k">Measured</span>
        <h2 className="cb-h2">
          One page, <em>measured</em>. <span className="tail">The same Y Combinator news page, three sizes.</span>
        </h2>
      </div>
      <div className="cb-measured">
        <div className="cb-shot" aria-label="The Y Combinator news page, with the three sizes marked">
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
            The helper reads the whole page. Your chat only gets the answer. That gap is what you stop paying for.
          </p>
          <p className="cb-legend">
            {MEASURED.date} · {MEASURED.version} · one page, one run · tokens counted as characters divided by four
          </p>
        </div>
      </div>
    </section>
  );
}

export function Windows() {
  const html = LEDGER.replace(/^\$ (.*)$/gm, "<b>$ $1</b>")
    .replace(/version-mismatch/g, "<i>version-mismatch</i>")
    .replace(/^(would close .*)$/gm, "<u>$1</u>");
  return (
    <section id="windows" className="cb-wrap cb-section cb-r">
      <div className="cb-feature is-flip">
        <div className="cb-feature-text">
          <span className="cb-k">Always know what is open</span>
          <h2 className="cb-h2" style={{ marginTop: 14 }}>
            Every browser window is <em>on record</em>.{" "}
            <span className="tail">Who opened it, why, and when it was last used.</span>
          </h2>
          <p className="cb-body">
            One command lists every window the helper opened. Another closes the ones nobody is using, and shows
            you the list first if you ask.
          </p>
        </div>
        <pre className="cb-term" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  );
}

export function Safe() {
  return (
    <section id="safe" className="cb-wrap cb-section cb-r">
      <div className="cb-head">
        <span className="cb-k">Built to be safe</span>
        <h2 className="cb-h2">
          It stays where you point it. <span className="tail">And it cleans up after itself.</span>
        </h2>
      </div>
      <SafePanel />
    </section>
  );
}

export function Install() {
  return (
    <section id="install" className="cb-wrap cb-section cb-center cb-r">
      <span className="cb-k">Install</span>
      <h2 className="cb-h2" style={{ marginTop: 14 }}>
        Three commands. <em>Two minutes.</em>
      </h2>
      <InstallStepper />
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="cb-wrap cb-section cb-r">
      <div className="cb-head">
        <span className="cb-k">Questions</span>
        <h2 className="cb-h2">Things people ask.</h2>
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
        Let a helper do <em>the browsing</em>.
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
        <span>No API key</span>
        <a href={REPO}>GitHub</a>
        <span className="grow" />
        <Link href="/">by Charandeep Kapoor</Link>
      </div>
    </footer>
  );
}
