import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { COMMAND, COMPARE, DOCTOR, FAQ, INSTALL, LEDGER, MEASURED, NOISE, REPO, STEPS, SUMMARY } from "@/components/claude-browse/data";
import { CopyButton } from "./Client";
import { HeroScene, SceneFill, SceneLeave, SceneReap, SceneReturn, SceneWall } from "./Scenes";
import { CostChart, Flow, Fingerprint, ModeIcon, Num, SiteGate, SizeBars, Timeline } from "./Charts";

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
    <header className="cb-head cb-r">
      <span className="cb-k">{k}</span>
      <h2 id={`${id}-h`} className="cb-h2">{title}</h2>
      {lead ? <p className="cb-lead">{lead}</p> : null}
    </header>
  );
}

function Sec({ id, alt, children }: { id: string; alt?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={`cb-sec${alt ? " cb-alt" : ""}`} aria-labelledby={`${id}-h`}>
      <div className="cb-wrap">{children}</div>
    </section>
  );
}

function Chapter({ n, title, children, scene, flip }: { n: string; title: string; children: ReactNode; scene: ReactNode; flip?: boolean }) {
  return (
    <article className={`cb-ch cb-r${flip ? " is-flip" : ""}`}>
      <div className="cb-ch-scene">{scene}</div>
      <div className="cb-ch-copy">
        <span className="cb-ch-n">Chapter {n}</span>
        <h3 className="cb-h3">{title}</h3>
        {children}
      </div>
    </article>
  );
}

export function Nav({ stars }: { stars: number | null }) {
  const links: [string, string][] = [["story", "Story"], ["how", "How it works"], ["proof", "Proof"], ["trust", "Trust"], ["start", "Start"]];
  return (
    <nav className="cb-nav" aria-label="Main">
      <div className="cb-wrap cb-nav-in">
        <a href="#top" className="cb-brand">claude-browse</a>
        <ul className="cb-nav-links">
          {links.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
        </ul>
        <div className="cb-nav-right">
          <a href={REPO} className="cb-gh" aria-label={stars ? `claude-browse on GitHub, ${fmt(stars)} stars` : "claude-browse on GitHub"}>
            <GitHubIcon /><span>GitHub</span>
            {stars ? <span className="cb-stars">{fmt(stars)}</span> : null}
          </a>
          <CopyButton small />
        </div>
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <section className="cb-hero" id="top">
      <div className="cb-wrap cb-hero-grid">
        <div className="cb-hero-t">
          <span className="cb-k">Open source plugin for Claude Code</span>
          <h1 className="cb-h1">Give Claude a browser.<br />Keep your chat <em>light</em>.</h1>
          <p className="cb-lead">A helper opens the web for Claude, reads the pages, and hands back a short note. Your chat stays small and cheap.</p>
          <div className="cb-actions">
            <CopyButton />
            <a className="cb-btn cb-btn-ghost" href={REPO}><GitHubIcon />Read the source on GitHub</a>
          </div>
          <code className="cb-cmd"><b>$</b> {INSTALL}</code>
          <ul className="cb-meta"><li>MIT licence</li><li>No API key</li><li>macOS and Linux</li></ul>
        </div>
        <div className="cb-hero-art"><HeroScene /></div>
      </div>
      <div className="cb-wrap">
        <dl className="cb-stats cb-r">
          <div><dt>Page to note</dt><dd><Num n={MEASURED.full} /> <span>to</span> <Num n={MEASURED.summary} /> <small>tokens</small></dd></div>
          <div><dt>One full run</dt><dd><Num n={MEASURED.seconds} /> <small>seconds</small></dd></div>
          <div><dt>Longest note</dt><dd><Num n={12} /> <small>lines</small></dd></div>
        </dl>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <Sec id="story">
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
    </Sec>
  );
}

function Steps({ steps, acc }: { steps: [string, ReactNode?][]; acc?: boolean }) {
  return (
    <ol className={`cb-list${acc ? " is-with" : ""}`}>
      {steps.map(([t, badge], i) => (
        <li key={t} style={{ "--i": i } as CSSProperties}>
          <span className="cb-list-n" aria-hidden>{i + 1}</span>
          <span>{t}</span>
          {badge ? <b className="cb-badge">{badge}</b> : null}
        </li>
      ))}
    </ol>
  );
}

const KEYS: [string, string][] = [
  ["RESULT", "the answer"],
  ["KEY DATA", "the facts and numbers"],
  ["SOURCES", "where it looked"],
  ["ARTIFACTS", "files it saved"],
  ["SESSION | BLOCKERS", "which window, and what got in the way"],
];

export function Split() {
  return (
    <Sec id="split" alt>
      <Head id="split" k="Side by side" title={<>A helper reads the page. <em>Your chat gets the answer.</em></>} lead="You ask Claude the way you always do. A second, smaller Claude (a sub-agent) does the browsing and reports back." />
      <div className="cb-two">
        <div className="cb-card cb-r">
          <span className="cb-tag cb-tag-mute">Without</span>
          <Steps steps={[
            ["You ask a question that needs the web"],
            ["Claude opens the page itself"],
            ["The whole page lands in your chat", <><Num n={MEASURED.full} /> tokens</>],
            ["It is re-sent with every later message"],
          ]} />
          <p className="cb-small">The page becomes part of the chat for good.</p>
        </div>
        <div className="cb-card cb-note-card cb-r">
          <span className="cb-tag">With claude-browse</span>
          <Steps acc steps={[
            ["You ask with /browse"],
            ["A helper (a Sonnet sub-agent) opens a browser"],
            ["It reads and clicks. The pages stay with it."],
            ["It sends back 12 lines at most"],
            ["Your chat keeps only the reply", <><Num n={MEASURED.summary} /> tokens</>],
          ]} />
          <p className="cb-small">The page never enters your chat. Only the short reply does.</p>
        </div>
      </div>
      <div className="cb-two">
        <div className="cb-card cb-r">
          <h3 className="cb-h4">Every reply has the same 5 parts</h3>
          <ul className="cb-anat">
            {KEYS.map(([k, d]) => <li key={k}><code>{k}</code><span>{d}</span></li>)}
          </ul>
        </div>
        <figure className="cb-card cb-r">
          <h3 className="cb-h4">One real run, start to finish</h3>
          <Timeline />
          <figcaption>Only the start and end times were measured. The steps show order, not length.</figcaption>
        </figure>
      </div>
    </Sec>
  );
}

export function How() {
  return (
    <Sec id="how">
      <Head id="how" k="How it works" title={<>One question, one trip, <em>one short note.</em></>} lead="You ask in your chat as usual. The web work happens next door, and only the note comes back." />
      <Flow />
      <div className="cb-card cb-r cb-gap">
        <h3 className="cb-h4">Two ways to browse</h3>
        <div className="cb-modes">
          <div><ModeIcon /><b>Private browser</b><span className="cb-pill">default</span><p>A hidden browser that starts clean. It sees none of your logins.</p></div>
          <div><ModeIcon own /><b>Your own Chrome</b><p>The Chrome you already use, signed in. Pick it for sites that need your account.</p></div>
        </div>
      </div>
      <div className="cb-scroll cb-r">
        <table className="cb-table">
          <thead><tr><th scope="col"><span className="cb-vh">Question</span></th><th scope="col">Private browser</th><th scope="col">Your own Chrome</th></tr></thead>
          <tbody>{COMPARE.map(([q, a, b]) => <tr key={q}><th scope="row">{q}</th><td>{a}</td><td>{b}</td></tr>)}</tbody>
        </table>
      </div>
    </Sec>
  );
}

export function Proof() {
  return (
    <Sec id="proof" alt>
      <Head id="proof" k="Proof" title={<>One real page, <em>weighed three ways.</em></>} lead={`You ask for the top story on Y Combinator's news page. Here is what each part weighed on ${MEASURED.date}.`} />
      <SizeBars />
      <p className="cb-ratio cb-r"><b><Num n={RATIO} suffix="x" /></b><span>The note your chat gets is about {RATIO} times smaller than the whole page.</span></p>
      <div className="cb-proof">
        <figure className="cb-card cb-r">
          <Image src="/images/claude-browse/hn.webp" width={1200} height={760} alt="Y Combinator's news page as the helper saw it on 30 Sep 2026, with the top story at number 1." className="cb-shot" />
          <figcaption>What the helper saw. It read the page as a map of clickable parts.</figcaption>
          <pre className="cb-term cb-noise" aria-label="First lines of the page map the helper read"><code>{NOISE.slice(0, 16).join("\n")}</code></pre>
        </figure>
        <figure className="cb-card cb-note-card cb-r">
          <p className="cb-note-cmd"><b>you</b> {COMMAND}</p>
          <pre className="cb-term cb-reply"><code>{SUMMARY.map(([k, v], i) => <span key={i} className="cb-line">{k ? <b>{k}</b> : null}{v}{"\n"}</span>)}</code></pre>
          <figcaption>What your chat got: the whole reply, unedited. {SUMMARY.length} lines, about {MEASURED.summary} tokens.</figcaption>
        </figure>
      </div>
      <div className="cb-two cb-two-wide">
        <div className="cb-r">
          <h3 className="cb-h3">Why a small note matters later</h3>
          <p className="cb-lead">Each new message carries the whole chat again. A page in your chat gets paid for over and over.</p>
        </div>
        <CostChart />
      </div>
    </Sec>
  );
}

export function Trust() {
  return (
    <Sec id="trust">
      <Head id="trust" k="Trust" title={<>You can see every window, <em>and close it.</em></>} />
      <Chapter n="04" title="Every browser window has a name tag." scene={<SceneWall />} flip>
        <p>A ledger, which is a simple record, tracks each browser window. It notes the purpose, the owner, which browser it uses, the allowed sites and the last use. Type <code>browse ls</code> to see them all. Nothing runs where you cannot see it.</p>
      </Chapter>
      <Chapter n="05" title="Idle windows get swept away." scene={<SceneReap />}>
        <p>Type <code>browse reap</code> to close the windows nobody is using. Add <code>--dry-run</code> first, and it only shows what it would close. Windows still at work stay open. In the real run below, it found 4 windows from an older version.</p>
      </Chapter>
      <div className="cb-three">
        <div className="cb-card cb-r">
          <SiteGate />
          <h3 className="cb-h4">Only the sites you name</h3>
          <p>Name the sites when you start. Any other site is refused (exit code 3) before the browser moves.</p>
        </div>
        <div className="cb-card cb-r">
          <Fingerprint />
          <h3 className="cb-h4">A fingerprint, not the words</h3>
          <p>The log keeps a short fingerprint of each page. It never stores what the page said.</p>
        </div>
        <div className="cb-card cb-r">
          <pre className="cb-term cb-doctor"><code>{DOCTOR.split("\n").map((l) => <span key={l} className={l.startsWith("WARN") ? "is-warn" : "is-pass"}>{l}{"\n"}</span>)}</code></pre>
          <h3 className="cb-h4">A quick health check</h3>
          <p><code>browse doctor</code> checks each part of your setup. When something is off, it prints the fix.</p>
        </div>
      </div>
      <figure className="cb-r cb-ledger">
        <figcaption>Real output from <code>browse ls</code> and <code>browse reap</code></figcaption>
        <pre className="cb-term"><code>{LEDGER}</code></pre>
      </figure>
    </Sec>
  );
}

export function Start() {
  const titles = ["Add the plugin", "Check your setup", "Ask your first question"];
  return (
    <Sec id="start" alt>
      <Head id="start" k="Start" title={<>Three steps to <em>your first answer.</em></>} lead="It is free, open source, and needs no API key. It works on macOS and Linux." />
      <ol className="cb-steps">
        {STEPS.map(([n, , cmd], i) => (
          <li key={n} className="cb-r">
            <span className="cb-step-n">{n}</span>
            <div>
              <h3 className="cb-h4">{titles[i]}</h3>
              <div className="cb-step-cmd"><code>{cmd}</code><CopyButton small text={cmd} label="Copy command" /></div>
            </div>
          </li>
        ))}
      </ol>
      <h3 className="cb-h3 cb-r cb-faq-h">Questions</h3>
      <div className="cb-faq">
        {FAQ.map(([q, a]) => (
          <details key={q} className="cb-r">
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </Sec>
  );
}

export function Close() {
  return (
    <section className="cb-close" aria-labelledby="close">
      <div className="cb-wrap">
        <h2 id="close" className="cb-h1 cb-r">Keep your chat light.<br /><em>Give Claude a browser.</em></h2>
        <p className="cb-lead cb-r">Copy the install line, run browse doctor, then ask your first question.</p>
        <div className="cb-close-row cb-r">
          <code className="cb-cmd"><b>$</b> {INSTALL}</code>
          <CopyButton />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="cb-foot">
      <div className="cb-wrap cb-foot-in">
        <span className="cb-brand">claude-browse</span>
        <span>MIT licence</span>
        <a href={REPO}>GitHub</a>
        <a href="#start">Install</a>
        <Link href="/">by Charandeep Kapoor</Link>
      </div>
    </footer>
  );
}
