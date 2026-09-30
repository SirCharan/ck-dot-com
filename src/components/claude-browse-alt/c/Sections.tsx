import Link from "next/link";
import { FAQ, INSTALL, REPO, STEPS, MEASURED } from "@/components/claude-browse/data";
import { CopyButton } from "./CopyButton";
import {
  FigArchitecture, FigBars, FigBrowsers, FigCheck, FigCost, FigDoctor, FigExits,
  FigLedger, FigLs, FigNoise, FigReaper, FigReply, FigSequence, FigShift, FigShot,
} from "./Figures";

const fmt = (n: number) => n.toLocaleString("en-US");

const LINKS: [string, string][] = [["#why", "Problem"], ["#how", "How"], ["#proof", "Proof"], ["#trust", "Trust"], ["#start", "Start"]];

function GitHubMark() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className="wp-gh">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function Nav() {
  return (
    <header className="wp-nav">
      <div className="wp-wrap wp-nav-in">
        <a href="#top" className="wp-mark">claude-browse</a>
        <nav aria-label="Sections" className="wp-nav-links">
          {LINKS.map(([h, t]) => (
            <a key={h} href={h}>{t}</a>
          ))}
        </nav>
        <a className="wp-nav-gh" href={REPO}>
          <GitHubMark />
          <span>GitHub</span>
        </a>
        <CopyButton text={INSTALL} label="Copy install" done="Copied" size="sm" />
      </div>
    </header>
  );
}

function Head({ n, id, title, lede }: { n: string; id: string; title: string; lede: string }) {
  return (
    <header className="wp-head wp-r" id={id}>
      <div className="wp-sec-n">§ {n}</div>
      <h2>{title}</h2>
      <p className="wp-lede">{lede}</p>
    </header>
  );
}

function Cmd({ text }: { text: string }) {
  return (
    <div className="wp-cmd">
      <span aria-hidden="true">$</span>
      <code>{text}</code>
    </div>
  );
}

export function Hero() {
  return (
    <section className="wp-hero" id="top">
      <div className="wp-wrap">
        <div className="wp-docline">
          <span>claude-browse · a plugin for Claude Code</span>
          <span>rev. {MEASURED.date}</span>
        </div>
        <h1 className="wp-h1">
          Give Claude a browser.
          <span className="wp-h1-2">
            Keep your chat light.<span className="wp-caret" aria-hidden="true" />
          </span>
        </h1>
        <div className="wp-hero-2">
          <p className="wp-sub">A helper reads the web for you and sends back at most 12 lines. Your chat stays small and cheap.</p>
          <div className="wp-cta">
            <CopyButton text={INSTALL} />
            <a className="wp-link" href={REPO}>
              <GitHubMark /> Read the source
            </a>
          </div>
          <Cmd text={INSTALL} />
          <p className="wp-meta">MIT licence · no API key · macOS and Linux</p>
        </div>
      </div>
      <div className="wp-wrap">
        <FigArchitecture />
      </div>
    </section>
  );
}

export function Problem() {
  return (
    <section className="wp-sec">
      <div className="wp-wrap">
        <Head n="01" id="why" title="The problem: web pages are heavy" lede="When Claude reads a web page in your chat, the whole page lands in the chat." />
        <div className="wp-prose wp-r">
          <p>One Y Combinator news page is about {fmt(MEASURED.full)} tokens.</p>
          <p>A token is roughly a word, and tokens are what you pay for.</p>
          <p>Every later message re-sends the whole chat, pages included. So one page keeps costing you, message after message.</p>
        </div>
        <FigCost />
      </div>
    </section>
  );
}

export function Shift() {
  return (
    <section className="wp-sec">
      <div className="wp-wrap">
        <Head n="02" id="shift" title="The shift: send a helper, get a note back" lede="claude-browse sends a helper to read the page for you instead." />
        <div className="wp-prose wp-r">
          <p>The helper is a Sonnet sub-agent, a second Claude that works on the side.</p>
          <p>It opens a browser, reads and clicks, then writes you a short note. Your chat keeps the note and never sees the page.</p>
        </div>
        <FigShift />
      </div>
    </section>
  );
}

export function How() {
  return (
    <section className="wp-sec">
      <div className="wp-wrap">
        <Head n="03" id="how" title="How it works" lede="You ask with /browse. Here is what happens next, lane by lane." />
        <FigSequence />
        <h3 className="wp-h3 wp-r">Two ways to browse</h3>
        <p className="wp-p wp-r">Most questions use the private browser. Pick your own Chrome when a site needs your account.</p>
        <FigBrowsers />
        <h3 className="wp-h3 wp-r">One short reply</h3>
        <p className="wp-p wp-r">Every reply uses the same 5 keys and fits in 12 lines.</p>
        <FigReply />
      </div>
    </section>
  );
}

export function Proof() {
  const spec: [string, string][] = [
    ["Measured on", MEASURED.date],
    ["Page", "Y Combinator's news page"],
    ["Engine", MEASURED.version],
    ["Counts", "tokens, rounded"],
  ];
  return (
    <section className="wp-sec">
      <div className="wp-wrap">
        <Head n="04" id="proof" title="Proof: one page, measured" lede="Here is one real run on Y Combinator's news page, counted token by token." />
        <dl className="wp-spec wp-r">
          {spec.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="wp-stats wp-r">
          <div><b>{fmt(MEASURED.full)}</b><span>tokens in the whole page</span></div>
          <div><b>{fmt(MEASURED.compact)}</b><span>tokens the helper read</span></div>
          <div className="is-a"><b>{MEASURED.summary}</b><span>tokens your chat received</span></div>
          <div><b>{MEASURED.seconds} s</b><span>from question to answer</span></div>
        </div>
        <FigBars />
        <FigShot />
        <FigNoise />
      </div>
    </section>
  );
}

const PROMISES = [
  "Pages never enter your chat, only a reply of at most 12 lines.",
  "The private browser starts clean and sees none of your logins.",
  "Sites you did not allow are refused before the browser moves.",
  "The log keeps a short fingerprint of each page, never its words.",
  "Every browser window goes on the ledger, a list with a purpose and an owner.",
  "It is MIT open source and needs no API key.",
];

export function Trust() {
  return (
    <section className="wp-sec">
      <div className="wp-wrap">
        <Head n="05" id="trust" title="Trust: what it does, and what it never does" lede="Six promises, each one backed by a check in the code." />
        <ol className="wp-promises wp-r">
          {PROMISES.map((p, i) => (
            <li key={p}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <p>{p}</p>
            </li>
          ))}
        </ol>
        <h3 className="wp-h3 wp-r">The ledger</h3>
        <p className="wp-p wp-r">The ledger is a plain list of every window the helper opened. Run <code>browse ls</code> to read it and <code>browse reap</code> to close idle ones.</p>
        <FigLedger />
        <FigLs />
        <h3 className="wp-h3 wp-r">The reaper</h3>
        <p className="wp-p wp-r">The <code>browse reap</code> command is the cleanup step. Add <code>--dry-run</code> and it only prints its plan.</p>
        <FigReaper />
        <h3 className="wp-h3 wp-r">Exit codes</h3>
        <p className="wp-p wp-r">Every browse command ends with a number that says how it went.</p>
        <div className="wp-grid2">
          <FigExits />
          <FigCheck />
        </div>
      </div>
    </section>
  );
}

export function Start() {
  return (
    <section className="wp-sec">
      <div className="wp-wrap">
        <Head n="06" id="start" title="Start in 3 commands" lede="You need Claude Code on macOS or Linux, and no API key." />
        <ol className="wp-steps wp-r">
          {STEPS.map(([n, t, c]) => (
            <li key={n}>
              <span className="wp-step-n">{n}</span>
              <div>
                <h3>{t}</h3>
                <div className="wp-step-c">
                  <Cmd text={c} />
                  <CopyButton text={c} label="Copy" done="Copied" size="sm" />
                </div>
              </div>
            </li>
          ))}
        </ol>
        <FigDoctor />
        <h3 className="wp-h3 wp-r">Questions</h3>
        <div className="wp-faq wp-r">
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <div className="wp-close wp-r">
          <h2>Copy the command, run browse doctor, then ask.</h2>
          <Cmd text={INSTALL} />
          <CopyButton text={INSTALL} />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="wp-foot">
      <div className="wp-wrap wp-foot-in">
        <span>claude-browse · MIT licence</span>
        <a href={REPO}>GitHub</a>
        <Link href="/">by Charandeep Kapoor</Link>
      </div>
    </footer>
  );
}
