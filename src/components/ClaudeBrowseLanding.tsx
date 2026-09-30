"use client";

import { useEffect, useRef, useState } from "react";

const REPO = "https://github.com/SirCharan/claude-browse";
const INSTALL =
  "claude plugin marketplace add SirCharan/claude-browse && claude plugin install claude-browse";

/* Real output from one run on 30 Sep 2026. Not edited. */
const SUMMARY = [
  ["RESULT:", " The current top story on Hacker News is \"Livenerf: Has Opus 5.5 been nerfed yet?\", with 561 points and 239 comments."],
  ["KEY DATA:", ""],
  ["", "- Title: Livenerf: Has Opus 5.5 been nerfed yet?"],
  ["", "- Points: 561"],
  ["", "- Comments: 239"],
  ["", "- Linked URL: https://github.com/ninjahawk/livenerf"],
  ["SOURCES:", " https://news.ycombinator.com"],
  ["ARTIFACTS:", " none"],
  ["SESSION:", " ab-hn-top (ab, closed) | BLOCKERS: none"],
];

/* First lines of the real compact snapshot of the same page. */
const NOISE = `- link [ref=e101]
- link "Hacker News" [ref=e102]
- link "new" [ref=e103]
- link "past" [ref=e104]
- link "comments" [ref=e105]
- link "ask" [ref=e106]
- link "show" [ref=e107]
- link "jobs" [ref=e108]
- link "submit" [ref=e109]
- link "login" [ref=e110]
- cell "1." [ref=e10]
- link [ref=e261]
- cell "Livenerf: Has Opus 5.5 been nerfed yet? (github.com/ninjahawk)" [ref=e11]
  - link "Livenerf: Has Opus 5.5 been nerfed yet?" [ref=e111]
  - link "github.com/ninjahawk" [ref=e112]
- cell "563 points by bryan0 9 hours ago | hide | 239 comments" [ref=e12]
  - link "bryan0" [ref=e113]
  - link "9 hours ago" [ref=e262]
  - link "hide" [ref=e114]
  - link "239 comments" [ref=e115]
- cell "2." [ref=e13]
- link [ref=e263]
- cell "September 2026: The world today, as seen by one Polish guy (tomwojcik.com)" [ref=e
  - link "September 2026: The world today, as seen by one Polish guy" [ref=e116]
  - link "tomwojcik.com" [ref=e117]
- cell "25 points by marjancek 1 hour ago | hide | 1 comment" [ref=e15]
  - link "marjancek" [ref=e118]
  - link "1 hour ago" [ref=e264]
  - link "hide" [ref=e119]
  - link "1 comment" [ref=e120]
- cell "3." [ref=e16]
- link [ref=e265]
- cell "Solving Factorio Quality (exyr.org)" [ref=e17]
  - link "Solving Factorio Quality" [ref=e121]
  - link "exyr.org" [ref=e122]
- cell "43 points by laurenth 2 hours ago | hide | 12 comments" [ref=e18]
  - link "laurenth" [ref=e123]
  - link "2 hours ago" [ref=e266]
  - link "hide" [ref=e124]
  - link "12 comments" [ref=e125]`.split("\n");

const LEDGER = `$ browse ls
NAME        STACK          PURPOSE           OWNER     AGE      IDLE     PID    STATE
default     agent-browser  legacy (unknown)  6e2be8ee  7d 16h   7d 16h   74432  version-mismatch
ey-book     agent-browser  legacy (unknown)  6e2be8ee  10d 15h  10d 15h  81395  version-mismatch
kayak       agent-browser  legacy (unknown)  6e2be8ee  10d 15h  10d 15h  81228  version-mismatch
etihad-bcn  agent-browser  legacy (unknown)  6e2be8ee  10d 15h  10d 15h  80833  version-mismatch

$ browse reap --dry-run --restart-mismatch
would close default (version mismatch)
would close etihad-bcn (version mismatch)
would close ey-book (version mismatch)
would close kayak (version mismatch)
reap: closed 4, orphans removed 0, flagged 4, dry-run`;

const COMPARE: [string, string, string][] = [
  ["Runs in", "Its own headless daemon", "The Chrome you already have open"],
  ["Sees your logins", "No. Clean profile", "Yes. Whatever that Chrome is signed in to"],
  ["Page as", "Accessibility tree with @e refs", "CDP helpers, page_info, js"],
  ["Domain allowlist", "Enforced, exit 3", "Advisory only"],
  ["Picked when", "Public pages, checks, scraping", "You say \"my Chrome\" or the site needs your session"],
];

const STEPS: [string, string, string][] = [
  ["01", "Install the plugin", INSTALL],
  ["02", "Check the machine", "browse doctor"],
  ["03", "Browse from any session", "/browse \"top story on Hacker News, with points\""],
];

const FAQ: [string, string][] = [
  [
    "Does it see my logged-in sites?",
    "Only when the router picks browser-harness, which attaches to your real Chrome over CDP. The default engine, agent-browser, starts from a clean profile and sees nothing of yours.",
  ],
  [
    "What does the ledger actually stop?",
    "Forgotten windows. Each session records its task, the Claude session that opened it, the engine, the domains it may visit and when it was last used. browse ls shows them, browse reap closes the ones nobody is using.",
  ],
  [
    "Will the reaper kill something it should not?",
    "It closes a daemon through agent-browser first, signals only a process that ps confirms is agent-browser, skips headed and profiled sessions unless you pass --force, and never touches the browsers directory. Run --dry-run first; it changes nothing.",
  ],
  [
    "Which models are involved?",
    "Your main Claude Code model plans and reads the summary. A Sonnet sub-agent browses. Nothing else, and no key to add.",
  ],
  [
    "How do I take it out again?",
    "claude plugin uninstall claude-browse. Run browse reap first if you want live daemons closed and their state files removed.",
  ],
];

const CSS = `
.cbl { --cbl-w: var(--p-max); }
.cbl.is-js .cbl-up { opacity: 0; transform: translateY(14px); transition: opacity .55s ease, transform .55s ease; }
.cbl.is-js .cbl-up.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .cbl .cbl-up { opacity: 1; transform: none; transition: none; } }

.cbl-k { font-family: var(--press-mono); font-size: .68rem; letter-spacing: .16em; text-transform: uppercase; color: var(--p-metal); margin: 0 0 1rem; }
.cbl-h { font-family: var(--press-serif); font-weight: 500; letter-spacing: -.028em; line-height: 1.02; margin: 0 0 1rem; color: var(--p-ink); }
.cbl-h em { font-style: normal; color: var(--p-go); }
.cbl-sub { color: var(--p-mute); font-size: 1.08rem; line-height: 1.55; max-width: 38rem; margin: 0 0 2rem; }

.cbl-hero { max-width: var(--cbl-w); margin: 0 auto; padding: clamp(3rem, 9vw, 6.5rem) clamp(1.1rem, 4vw, 2.5rem) clamp(2.5rem, 6vw, 4rem); }
.cbl-hero .cbl-h { font-size: clamp(2.4rem, 6.2vw, 4.9rem); max-width: 24ch; }
.cbl-install { display: flex; flex-wrap: wrap; gap: .6rem; align-items: stretch; max-width: 46rem; }
.cbl-cmd { flex: 1 1 22rem; display: flex; align-items: center; gap: .6rem; border: 1px solid var(--p-line); background: var(--p-elev); border-radius: 6px; padding: .8rem .95rem; font-family: var(--press-mono); font-size: .82rem; line-height: 1.45; color: var(--p-ink); overflow-wrap: anywhere; }
.cbl-cmd b { color: var(--p-go); font-weight: 500; }
.cbl-meta { font-family: var(--press-mono); font-size: .72rem; color: var(--p-faint); margin: .9rem 0 0; display: flex; flex-wrap: wrap; gap: .4rem 1.1rem; }
.cbl-meta a { color: var(--p-mute); text-decoration: none; border-bottom: 1px solid var(--p-line); }
.cbl-meta a:hover { color: var(--p-ink); }

.cbl-split { display: grid; grid-template-columns: 1fr; gap: 1rem; margin-top: clamp(2.5rem, 6vw, 4rem); align-items: stretch; }
@media (min-width: 900px) { .cbl-split { grid-template-columns: 1.05fr auto 1fr; } }
.cbl-pane { position: relative; border: 1px solid var(--p-line); border-radius: 8px; background: var(--p-elev); overflow: hidden; display: flex; flex-direction: column; min-height: 22rem; max-height: 26rem; }
.cbl-pane-h { display: flex; justify-content: space-between; gap: 1rem; padding: .7rem .95rem; border-bottom: 1px solid var(--p-line); font-family: var(--press-mono); font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; color: var(--p-faint); }
.cbl-pane-f { margin-top: auto; padding: .7rem .95rem; border-top: 1px solid var(--p-line); font-family: var(--press-mono); font-size: .74rem; color: var(--p-mute); display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
.cbl-pane-f strong { color: var(--p-ink); font-weight: 500; font-size: 1.05rem; }
.cbl-noise { position: relative; flex: 1 1 auto; height: 19rem; min-height: 0; overflow: hidden; padding: .8rem .95rem 0; font-family: var(--press-mono); font-size: .66rem; line-height: 1.55; color: var(--p-faint); white-space: pre; }
.cbl-noise-roll { animation: cbl-roll 28s linear infinite; }
@keyframes cbl-roll { from { transform: translateY(0); } to { transform: translateY(-50%); } }
@media (prefers-reduced-motion: reduce) { .cbl-noise-roll { animation: none; } }
.cbl-noise::after { content: ""; position: absolute; inset: auto 0 0 0; height: 45%; background: linear-gradient(to bottom, transparent, var(--p-elev)); pointer-events: none; }
.cbl-arrow { display: flex; align-items: center; justify-content: center; font-family: var(--press-mono); font-size: .7rem; letter-spacing: .14em; text-transform: uppercase; color: var(--p-metal); padding: .5rem 0; }
@media (min-width: 900px) { .cbl-arrow { writing-mode: vertical-rl; transform: rotate(180deg); padding: 0 .4rem; } }
.cbl-pane.is-out { border-color: color-mix(in srgb, var(--p-go) 55%, var(--p-line)); box-shadow: 0 0 0 1px color-mix(in srgb, var(--p-go) 18%, transparent), 0 30px 60px -40px color-mix(in srgb, var(--p-go) 45%, transparent); }
.cbl-sum { flex: 1; padding: .9rem .95rem; font-family: var(--press-mono); font-size: .78rem; line-height: 1.6; color: var(--p-ink); white-space: pre-wrap; overflow-wrap: anywhere; }
.cbl-sum b { color: var(--p-go); font-weight: 500; }

.cbl-section { max-width: var(--cbl-w); margin: 0 auto; padding: clamp(3.5rem, 9vw, 6.5rem) clamp(1.1rem, 4vw, 2.5rem); border-top: 1px solid var(--p-line); }
.cbl-section .cbl-h { font-size: clamp(1.9rem, 4.2vw, 3rem); max-width: 22ch; }

.cbl-math { display: grid; grid-template-columns: 1fr; gap: 1rem; align-items: center; }
@media (min-width: 720px) { .cbl-math { grid-template-columns: 1fr auto 1fr; } }
.cbl-big { border: 1px solid var(--p-line); border-radius: 8px; background: var(--p-elev); padding: 1.6rem 1.5rem 1.3rem; }
.cbl-big .n { font-family: var(--press-serif); font-size: clamp(3rem, 7vw, 5.2rem); line-height: 1; letter-spacing: -.03em; color: var(--p-ink); }
.cbl-big.is-go .n { color: var(--p-go); }
.cbl-big .l { font-family: var(--press-mono); font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; color: var(--p-faint); margin-top: .9rem; }
.cbl-big .d { color: var(--p-mute); font-size: .92rem; margin-top: .35rem; }
.cbl-vs { text-align: center; font-family: var(--press-serif); font-style: italic; color: var(--p-faint); font-size: 1.1rem; }
.cbl-note { font-family: var(--press-mono); font-size: .72rem; color: var(--p-faint); margin: 1.1rem 0 0; max-width: 46rem; line-height: 1.6; }

.cbl-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
.cbl-table { width: 100%; border-collapse: collapse; font-size: .92rem; min-width: 30rem; }
@media (max-width: 640px) { .cbl-table { font-size: .82rem; } .cbl-table th, .cbl-table td { padding: .7rem .6rem; } }
.cbl-table th, .cbl-table td { text-align: left; padding: .85rem .9rem; border-top: 1px solid var(--p-line); vertical-align: top; }
.cbl-table th { font-family: var(--press-mono); font-size: .68rem; letter-spacing: .14em; text-transform: uppercase; color: var(--p-faint); font-weight: 500; border-top: 0; }
.cbl-table th.is-go { color: var(--p-go); }
.cbl-table td:first-child { color: var(--p-mute); font-size: .84rem; width: 9rem; }
.cbl-table td:nth-child(2) { color: var(--p-ink); }
.cbl-table td:nth-child(3) { color: var(--p-mute); }

.cbl-term { border: 1px solid var(--p-line); border-radius: 8px; background: var(--p-bg); padding: 1rem 1.1rem; font-family: var(--press-mono); font-size: .74rem; line-height: 1.6; color: var(--p-mute); white-space: pre; overflow-x: auto; }
.cbl-term b { color: var(--p-ink); font-weight: 500; }
.cbl-term i { font-style: normal; color: var(--p-metal); }
.cbl-term u { text-decoration: none; color: var(--p-go); }

.cbl-steps { display: grid; grid-template-columns: 1fr; gap: .8rem; }
@media (min-width: 760px) { .cbl-steps { grid-template-columns: repeat(3, 1fr); } }
.cbl-step { border: 1px solid var(--p-line); border-radius: 8px; background: var(--p-elev); padding: 1.2rem 1.2rem 1.1rem; display: flex; flex-direction: column; gap: .6rem; }
.cbl-step .num { font-family: var(--press-serif); color: var(--p-metal); font-size: 1.4rem; }
.cbl-step .t { font-family: var(--press-serif); font-size: 1.25rem; color: var(--p-ink); }
.cbl-step code { font-family: var(--press-mono); font-size: .76rem; color: var(--p-mute); background: var(--p-bg); border: 1px solid var(--p-line); border-radius: 5px; padding: .55rem .65rem; overflow-wrap: anywhere; margin-top: auto; }

.cbl-faq details { border-top: 1px solid var(--p-line); }
.cbl-faq details:last-child { border-bottom: 1px solid var(--p-line); }
.cbl-faq summary { cursor: pointer; list-style: none; padding: 1.1rem 0; font-family: var(--press-serif); font-size: 1.2rem; color: var(--p-ink); display: flex; justify-content: space-between; gap: 1rem; }
.cbl-faq summary::-webkit-details-marker { display: none; }
.cbl-faq summary::after { content: "+"; color: var(--p-go); font-family: var(--press-mono); }
.cbl-faq details[open] summary::after { content: "\\2013"; }
.cbl-faq p { margin: 0 0 1.2rem; color: var(--p-mute); line-height: 1.6; max-width: 46rem; }

.cbl-close { text-align: left; padding-bottom: 0; overflow: hidden; }
.cbl-close .cbl-h { font-size: clamp(2.4rem, 6vw, 4.6rem); max-width: 16ch; }
.cbl-mark { font-family: var(--press-serif); font-size: clamp(3rem, 11.5vw, 10.5rem); line-height: .85; letter-spacing: -.04em; color: transparent; -webkit-text-stroke: 1px var(--p-line); margin: clamp(2rem, 6vw, 4rem) 0 -0.12em; user-select: none; white-space: nowrap; }
`;

function useReveal() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(".cbl-up"));
    el.classList.add("is-js");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-in")),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    nodes.forEach((n) => io.observe(n));
    const all = window.setTimeout(() => nodes.forEach((n) => n.classList.add("is-in")), 1000);
    return () => {
      io.disconnect();
      window.clearTimeout(all);
    };
  }, []);
  return root;
}

function Copy({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="press-btn press-btn-go"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {
          /* clipboard blocked: the text is selectable */
        }
      }}
      aria-live="polite"
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}

function Install() {
  return (
    <div className="cbl-install">
      <code className="cbl-cmd">
        <b>$</b>
        <span>{INSTALL}</span>
      </code>
      <Copy text={INSTALL} />
    </div>
  );
}

export function ClaudeBrowseLanding() {
  const root = useReveal();
  return (
    <div className="cbl" ref={root}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="cbl-hero">
        <p className="cbl-k">Open source · Claude Code plugin · MIT</p>
        <h1 className="cbl-h">
          Sonnet reads the page.
          <br />
          <em>You read five lines.</em>
        </h1>
        <p className="cbl-sub">
          claude-browse hands every browse in Claude Code to a Sonnet sub-agent. The page, the clicks,
          the retries and the screenshots stay with it. Your main model gets a summary of at most twelve
          lines, and your context stays small.
        </p>
        <Install />
        <p className="cbl-meta">
          <a href={REPO}>Star on GitHub</a>
          <span>Python stdlib · macOS and Linux</span>
          <span>agent-browser 0.38+ · browser-harness optional</span>
        </p>

        <div className="cbl-split">
          <div className="cbl-pane">
            <div className="cbl-pane-h">
              <span>What Sonnet read</span>
              <span>news.ycombinator.com</span>
            </div>
            <div className="cbl-noise" aria-hidden>
              <div className="cbl-noise-roll">{[...NOISE, ...NOISE].join("\n")}</div>
            </div>
            <div className="cbl-pane-f">
              <span>full snapshot, one page</span>
              <span>
                <strong>≈6,400</strong> tokens
              </span>
            </div>
          </div>
          <div className="cbl-arrow">/browse</div>
          <div className="cbl-pane is-out">
            <div className="cbl-pane-h">
              <span>What you read</span>
              <span>11 s later</span>
            </div>
            <pre className="cbl-sum">
              {SUMMARY.map(([k, v], i) => (
                <span key={i}>
                  {k ? <b>{k}</b> : null}
                  {v}
                  {"\n"}
                </span>
              ))}
            </pre>
            <div className="cbl-pane-f">
              <span>the whole reply, unedited</span>
              <span>
                <strong>≈90</strong> tokens
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="cbl-section">
        <div className="cbl-up">
          <p className="cbl-k">The honest math</p>
          <h2 className="cbl-h">One page in. Five lines out.</h2>
          <p className="cbl-sub">
            Every turn after a browse re-sends whatever the browse put in the context. Keep the page out
            and the tax never starts.
          </p>
          <div className="cbl-math">
            <div className="cbl-big">
              <div className="n">≈6,400</div>
              <div className="l">tokens, the page</div>
              <div className="d">Accessibility snapshot of one Hacker News front page.</div>
            </div>
            <div className="cbl-vs">against</div>
            <div className="cbl-big is-go">
              <div className="n">≈90</div>
              <div className="l">tokens, what you read</div>
              <div className="d">The nine-line summary above, the only thing that reached the main model.</div>
            </div>
          </div>
          <p className="cbl-note">
            Measured 30 Sep 2026 with agent-browser 0.38.1. The compact interactive snapshot of the same
            page is about 3,350 tokens. Counts are characters divided by four. One page, one run, no
            average claimed.
          </p>
        </div>
      </section>

      <section className="cbl-section">
        <div className="cbl-up">
          <p className="cbl-k">How it routes</p>
          <h2 className="cbl-h">Two engines. One decision.</h2>
          <p className="cbl-sub">
            Vercel&apos;s agent-browser is the default: fast, isolated, cheap to read. browser-use&apos;s
            browser-harness is for the times a site needs the Chrome you are already signed in to. The
            Sonnet agent picks, and it says which one it used.
          </p>
          <div className="cbl-scroll">
            <table className="cbl-table">
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

      <section className="cbl-section">
        <div className="cbl-up">
          <p className="cbl-k">The ledger</p>
          <h2 className="cbl-h">Every window has a name.</h2>
          <p className="cbl-sub">
            I found four browser daemons on my laptop that had been running for ten days, on a binary
            three versions old, and nothing could tell me why. Now each session records its task, the
            Claude session that opened it, the engine, the domains it may visit and when it was last
            used. This is the real output from that laptop.
          </p>
          <pre
            className="cbl-term"
            dangerouslySetInnerHTML={{
              __html: LEDGER.replace(/^\$ (.*)$/gm, "<b>$ $1</b>")
                .replace(/version-mismatch/g, "<i>version-mismatch</i>")
                .replace(/^(would close .*)$/gm, "<u>$1</u>"),
            }}
          />
        </div>
      </section>

      <section className="cbl-section">
        <div className="cbl-up">
          <p className="cbl-k">Install</p>
          <h2 className="cbl-h">Running in three steps.</h2>
          <div className="cbl-steps">
            {STEPS.map(([n, t, c]) => (
              <div className="cbl-step" key={n}>
                <span className="num">{n}</span>
                <span className="t">{t}</span>
                <code>{c}</code>
              </div>
            ))}
          </div>
          <p className="cbl-note">
            After that the browse-router skill sends any browsing request to the Sonnet agent on its own.
            browse ls and browse reap are there when you want to look under the desk.
          </p>
        </div>
      </section>

      <section className="cbl-section">
        <div className="cbl-up cbl-faq">
          <p className="cbl-k">Fair questions</p>
          <h2 className="cbl-h">Fair questions.</h2>
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cbl-section cbl-close">
        <div className="cbl-up">
          <p className="cbl-k">Ready when you are</p>
          <h2 className="cbl-h">
            Browse everything. <em>Read five lines.</em>
          </h2>
          <Install />
          <p className="cbl-meta">
            <a href={REPO}>GitHub</a>
            <a href={`${REPO}#readme`}>Install guide</a>
            <span>MIT</span>
          </p>
        </div>
        <div className="cbl-mark" aria-hidden>
          claude-browse
        </div>
      </section>
    </div>
  );
}
