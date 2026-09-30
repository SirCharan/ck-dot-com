import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { COMMAND, COMPARE, DOCTOR, FAQ, INSTALL, LEDGER, MEASURED, NOISE, REPO, STEPS, SUMMARY } from "@/components/claude-browse/data";
import { CopyButton } from "./Client";
import { HeroScene, SceneFill, SceneLeave, SceneReap, SceneReturn, SceneWall } from "./Scenes";
import { CostChart, Flow, Fingerprint, ModeIcon, Sequence, SiteGate, SizeBars } from "./Charts";

const fmt = (n: number) => n.toLocaleString("en-US");
const RATIO = Math.round(MEASURED.full / MEASURED.summary);

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

function Head({ k, title, lead, id }: { k: string; title: ReactNode; lead?: string; id: string }) {
  return (
    <header className="sb-head sb-r">
      <span className="sb-k">{k}</span>
      <h2 id={id} className="sb-h2">{title}</h2>
      {lead ? <p className="sb-lead">{lead}</p> : null}
    </header>
  );
}

function Chapter({ n, title, children, scene, flip }: { n: string; title: string; children: ReactNode; scene: ReactNode; flip?: boolean }) {
  return (
    <article className={`sb-ch sb-r${flip ? " is-flip" : ""}`}>
      <div className="sb-ch-scene">{scene}</div>
      <div className="sb-ch-copy">
        <span className="sb-ch-n">Chapter {n}</span>
        <h3 className="sb-h3">{title}</h3>
        {children}
      </div>
    </article>
  );
}

export function Nav() {
  const links: [string, string][] = [["story", "Story"], ["how", "How it works"], ["proof", "Proof"], ["trust", "Trust"], ["start", "Start"]];
  return (
    <nav className="sb-nav" aria-label="Main">
      <div className="sb-wrap sb-nav-in">
        <a href="#top" className="sb-brand">claude-browse</a>
        <ul className="sb-nav-links">
          {links.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
        </ul>
        <div className="sb-nav-right">
          <a href={REPO} className="sb-gh" aria-label="claude-browse on GitHub"><GitHubIcon /><span>GitHub</span></a>
          <CopyButton small label="Copy install" />
        </div>
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <section className="sb-hero" id="top">
      <div className="sb-wrap sb-hero-grid">
        <div className="sb-hero-t">
          <span className="sb-k">Open source plugin for Claude Code</span>
          <h1 className="sb-h1">Give Claude a browser.<br />Keep your chat <em>light</em>.</h1>
          <p className="sb-lead">A helper opens the web for Claude, reads the pages, and hands back a short note. Your chat stays small and cheap.</p>
          <div className="sb-actions">
            <CopyButton />
            <a className="sb-btn sb-btn-ghost" href={REPO}><GitHubIcon />Read the source</a>
          </div>
          <code className="sb-cmd"><b>$</b> {INSTALL}</code>
          <ul className="sb-meta"><li>MIT licence</li><li>No API key</li><li>macOS and Linux</li></ul>
        </div>
        <div className="sb-hero-art"><HeroScene /></div>
      </div>
      <div className="sb-wrap">
        <dl className="sb-stats">
          <div><dt>Page to note</dt><dd>{fmt(MEASURED.full)} <span>to</span> {MEASURED.summary} <small>tokens</small></dd></div>
          <div><dt>One full run</dt><dd>{MEASURED.seconds} <small>seconds</small></dd></div>
          <div><dt>Longest note</dt><dd>12 <small>lines</small></dd></div>
        </dl>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section className="sb-sec" aria-labelledby="story">
      <div className="sb-wrap">
        <Head id="story" k="The story" title={<>Web pages are heavy. <em>Your chat should not carry them.</em></>} />
        <Chapter n="01" title="Your chat fills up with pages." scene={<SceneFill />}>
          <p>When Claude reads a web page itself, the whole page lands in your chat. One news page is about {fmt(MEASURED.full)} tokens. A token is roughly a word, and tokens are what you pay for. Every later message sends the whole chat again, pages included.</p>
        </Chapter>
        <Chapter n="02" title="A helper goes out instead." scene={<SceneLeave />} flip>
          <p>With claude-browse, Claude sends a helper. The helper is a second, smaller Claude (Sonnet) with its own browser. It opens the page, reads it, and clicks where it needs to. None of that reading happens in your chat.</p>
        </Chapter>
        <Chapter n="03" title="It comes back with a short note." scene={<SceneReturn />}>
          <p>The helper returns a note of 12 lines at most. It says what it found, the key facts, the sources and any problems. The pages stay behind. In the measured run, the note was about {MEASURED.summary} tokens.</p>
        </Chapter>
      </div>
    </section>
  );
}

const ANATOMY: [string, string][] = [
  ["RESULT", "The answer, in one line."],
  ["KEY DATA", "The facts behind the answer."],
  ["SOURCES", "The pages it used."],
  ["ARTIFACTS", "Files it saved, like screenshots."],
  ["SESSION | BLOCKERS", "Which window it used, and what got in the way."],
];

export function How() {
  return (
    <section className="sb-sec sb-alt" aria-labelledby="how">
      <div className="sb-wrap">
        <Head id="how" k="How it works" title={<>One question, one trip, <em>one short note.</em></>} lead="You ask in your chat as usual. The web work happens next door, and only the note comes back." />
        <Flow />
        <div className="sb-two">
          <div className="sb-card sb-r">
            <h3 className="sb-h4">What the note holds</h3>
            <ol className="sb-anat">
              {ANATOMY.map(([key, text]) => <li key={key}><code>{key}</code><span>{text}</span></li>)}
            </ol>
            <p className="sb-small">Five parts, never more than 12 lines in all.</p>
          </div>
          <div className="sb-card sb-r">
            <h3 className="sb-h4">Two ways to browse</h3>
            <div className="sb-modes">
              <div><ModeIcon /><b>Private browser</b><span className="sb-pill">default</span><p>A hidden browser that starts clean. It sees none of your logins.</p></div>
              <div><ModeIcon own /><b>Your own Chrome</b><p>The Chrome you already use, signed in. Pick it for sites that need your account.</p></div>
            </div>
          </div>
        </div>
        <div className="sb-scroll sb-r">
          <table className="sb-table">
            <thead><tr><th scope="col"><span className="sb-vh">Question</span></th><th scope="col">Private browser</th><th scope="col">Your own Chrome</th></tr></thead>
            <tbody>{COMPARE.map(([q, a, b]) => <tr key={q}><th scope="row">{q}</th><td>{a}</td><td>{b}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Proof() {
  return (
    <section className="sb-sec" aria-labelledby="proof">
      <div className="sb-wrap">
        <Head id="proof" k="Proof" title={<>One real page, <em>weighed three ways.</em></>} lead={`You ask for the top story on Y Combinator's news page. Here is what each part weighed on ${MEASURED.date}.`} />
        <SizeBars />
        <p className="sb-ratio sb-r"><b>{RATIO}x</b><span>The note your chat gets is about {RATIO} times smaller than the whole page.</span></p>
        <div className="sb-proof">
          <figure className="sb-card sb-r">
            <Image src="/images/claude-browse/hn.webp" width={1200} height={760} alt="Y Combinator's news page as the helper saw it on 30 Sep 2026, with the top story at number 1." className="sb-shot" />
            <figcaption>What the helper saw. It read the page as a map of clickable parts.</figcaption>
            <pre className="sb-term sb-noise" aria-label="First lines of the page map the helper read"><code>{NOISE.slice(0, 16).join("\n")}</code></pre>
          </figure>
          <figure className="sb-card sb-note-card sb-r">
            <p className="sb-note-cmd"><b>you</b> {COMMAND}</p>
            <pre className="sb-term sb-reply"><code>{SUMMARY.map(([k, v], i) => <span key={i} className="sb-line">{k ? <b>{k}</b> : null}{v}{"\n"}</span>)}</code></pre>
            <figcaption>What your chat got: the whole reply, unedited. {SUMMARY.length} lines, about {MEASURED.summary} tokens.</figcaption>
          </figure>
        </div>
        <div className="sb-two sb-two-wide">
          <div className="sb-r">
            <h3 className="sb-h3">One run, step by step</h3>
            <p className="sb-lead">Only the note crosses back into your chat. The page and its map stay with the helper.</p>
          </div>
          <Sequence />
        </div>
        <div className="sb-two sb-two-wide">
          <div className="sb-r">
            <h3 className="sb-h3">Why a small note matters later</h3>
            <p className="sb-lead">Each new message carries the whole chat again. A page in your chat gets paid for over and over.</p>
          </div>
          <CostChart />
        </div>
      </div>
    </section>
  );
}

export function Trust() {
  return (
    <section className="sb-sec sb-alt" aria-labelledby="trust">
      <div className="sb-wrap">
        <Head id="trust" k="Trust" title={<>You can see every window, <em>and close it.</em></>} />
        <Chapter n="04" title="Every browser window has a name tag." scene={<SceneWall />} flip>
          <p>A ledger, which is a simple record, tracks each browser window. It notes the purpose, the owner, which browser it uses, the allowed sites and the last use. Type <code>browse ls</code> to see them all. Nothing runs where you cannot see it.</p>
        </Chapter>
        <Chapter n="05" title="Idle windows get swept away." scene={<SceneReap />}>
          <p>Type <code>browse reap</code> to close the windows nobody is using. Add <code>--dry-run</code> first, and it only shows what it would close. Windows still at work stay open. In the real run below, it found 4 windows from an older version.</p>
        </Chapter>
        <div className="sb-three">
          <div className="sb-card sb-r">
            <SiteGate />
            <h3 className="sb-h4">Only the sites you name</h3>
            <p>Name the sites when you start. Any other site is refused (exit code 3) before the browser moves.</p>
          </div>
          <div className="sb-card sb-r">
            <Fingerprint />
            <h3 className="sb-h4">A fingerprint, not the words</h3>
            <p>The log keeps a short fingerprint of each page. It never stores what the page said.</p>
          </div>
          <div className="sb-card sb-r">
            <pre className="sb-term sb-doctor"><code>{DOCTOR.split("\n").map((l) => <span key={l} className={l.startsWith("WARN") ? "is-warn" : "is-pass"}>{l}{"\n"}</span>)}</code></pre>
            <h3 className="sb-h4">A quick health check</h3>
            <p><code>browse doctor</code> checks each part of your setup. When something is off, it prints the fix.</p>
          </div>
        </div>
        <figure className="sb-r sb-ledger">
          <figcaption>Real output from <code>browse ls</code> and <code>browse reap</code></figcaption>
          <pre className="sb-term"><code>{LEDGER}</code></pre>
        </figure>
      </div>
    </section>
  );
}

export function Start() {
  const titles = ["Add the plugin", "Check your setup", "Ask your first question"];
  return (
    <section className="sb-sec" aria-labelledby="start">
      <div className="sb-wrap">
        <Head id="start" k="Start" title={<>Three steps to <em>your first answer.</em></>} lead="It is free, open source, and needs no API key. It works on macOS and Linux." />
        <ol className="sb-steps">
          {STEPS.map(([n, , cmd], i) => (
            <li key={n} className="sb-r">
              <span className="sb-step-n">{n}</span>
              <div>
                <h3 className="sb-h4">{titles[i]}</h3>
                <div className="sb-step-cmd"><code>{cmd}</code><CopyButton small text={cmd} label="Copy" /></div>
              </div>
            </li>
          ))}
        </ol>
        <h3 className="sb-h3 sb-r sb-faq-h">Questions</h3>
        <div className="sb-faq">
          {FAQ.map(([q, a]) => (
            <details key={q} className="sb-r">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Close() {
  return (
    <section className="sb-close" aria-labelledby="close">
      <div className="sb-wrap">
        <h2 id="close" className="sb-h1 sb-r">Keep your chat light.<br /><em>Give Claude a browser.</em></h2>
        <p className="sb-lead sb-r">Copy the install line, run browse doctor, then ask your first question.</p>
        <div className="sb-close-row sb-r">
          <code className="sb-cmd"><b>$</b> {INSTALL}</code>
          <CopyButton />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="sb-foot">
      <div className="sb-wrap sb-foot-in">
        <span className="sb-brand">claude-browse</span>
        <span>MIT licence</span>
        <a href={REPO}>GitHub</a>
        <Link href="/">by Charandeep Kapoor</Link>
      </div>
    </footer>
  );
}
