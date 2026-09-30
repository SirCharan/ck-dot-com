import Image from "next/image";
import type { ReactNode } from "react";
import { COMMAND, COMPARE, DOCTOR, FAQ, INSTALL, LEDGER, MEASURED, NOISE, REPO, STEPS, SUMMARY } from "@/components/claude-browse/data";
import { ProofBars, TokenChart } from "./Charts";
import { CopyButton } from "./CopyButton";
import { EngineFlow, Guardrails, Pipeline, ReplyShape, RunTimeline } from "./Flows";
import { GitHubIcon } from "./Hero";
import { fmt } from "./util";

function Head({ n, k, title, children }: { n: string; k: string; title: string; children?: ReactNode }) {
  return (
    <div className="ra-head ra-rv">
      <p className="ra-kicker"><span>{n}</span>{k}</p>
      <h2 className="ra-h2">{title}</h2>
      {children && <div className="ra-body">{children}</div>}
    </div>
  );
}

function Term({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`ra-term ${className}`}>
      <div className="ra-term-h" aria-hidden="true"><i /><i /><i /><span>{title}</span></div>
      <div className="ra-term-b">{children}</div>
    </div>
  );
}

function Reply() {
  return (
    <Term title="reply in your chat">
      {SUMMARY.map(([k, v], i) => <div key={i} className="ra-ln">{k && <b>{k}</b>}{v}</div>)}
    </Term>
  );
}

export function Pain() {
  return (
    <section className="ra-sec" id="problem">
      <div className="ra-wrap">
        <Head n="01" k="The problem" title="Every page Claude reads stays in your chat.">
          <p>When Claude opens a page itself, the whole page lands in your chat. One news page is about {fmt(MEASURED.full)} tokens.</p>
          <p>Every later message sends the whole chat again, pages included. So each page makes every next message slower and more costly.</p>
        </Head>
        <div className="ra-split">
          <figure className="ra-noise ra-rv">
            <figcaption className="ra-chart-h"><span>One page, as Claude reads it</span><span className="ra-pill ra-pill-warn">+{fmt(MEASURED.full)} tokens</span></figcaption>
            <pre aria-label="The first lines of the page map, mostly links and cells">{NOISE.slice(0, 22).join("\n")}</pre>
            <p className="ra-noise-more">and hundreds more lines, kept for the rest of the chat</p>
          </figure>
          <TokenChart />
        </div>
      </div>
    </section>
  );
}

export function Shift() {
  return (
    <section className="ra-sec ra-sec-alt">
      <div className="ra-wrap">
        <Head n="02" k="The shift" title="Send a helper. Get back 12 lines.">
          <p>claude-browse hands the reading to a helper: a second Claude, Sonnet, that works on its own. It opens a browser, reads and clicks, then writes a short reply.</p>
          <p>The pages stay with the helper. Your chat gets the answer and nothing else.</p>
        </Head>
        <Pipeline />
        <ReplyShape />
      </div>
    </section>
  );
}

export function How() {
  return (
    <section className="ra-sec" id="how">
      <div className="ra-wrap">
        <Head n="03" k="How it works" title="Two ways to browse. One question decides.">
          <p>By default the helper uses a private, hidden browser that starts clean. If a site needs your account, it can use your own Chrome instead.</p>
        </Head>
        <div className="ra-split">
          <EngineFlow />
          <RunTimeline />
        </div>
        <div className="ra-tablewrap ra-rv">
          <table className="ra-table">
            <caption className="ra-sr">Private browser compared with your own Chrome</caption>
            <thead><tr><th scope="col" /><th scope="col">Private browser</th><th scope="col">Your own Chrome</th></tr></thead>
            <tbody>{COMPARE.map(([k, a, b]) => <tr key={k}><th scope="row">{k}</th><td>{a}</td><td>{b}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const STATS: [string, string, string][] = [
  [fmt(MEASURED.full), "tokens", "The whole page, if Claude read it"],
  [fmt(MEASURED.summary), "tokens", "What your chat got back"],
  [String(MEASURED.seconds), "seconds", "The whole run, ask to answer"],
];

export function Proof() {
  return (
    <section className="ra-sec ra-sec-alt" id="proof">
      <div className="ra-wrap">
        <Head n="04" k="Proof" title="One real page, measured.">
          <p>We asked for the top story on Y Combinator&apos;s news page on {MEASURED.date}, with {MEASURED.version}. The reply is about {Math.round(MEASURED.full / MEASURED.summary)} times smaller than the page.</p>
        </Head>
        <dl className="ra-band ra-rv">
          {STATS.map(([v, u, d]) => <div key={d}><dt>{d}</dt><dd><b>{v}</b><span>{u}</span></dd></div>)}
        </dl>
        <ProofBars />
        <div className="ra-split ra-rv">
          <figure className="ra-shot">
            <Image src="/images/claude-browse/hn.webp" width={1200} height={760} sizes="(max-width: 900px) 100vw, 560px" alt="Y Combinator's news page on 30 Sep 2026, the page the helper read" />
            <figcaption className="ra-cap">What the helper saw. It stays with the helper.</figcaption>
          </figure>
          <div>
            <Reply />
            <p className="ra-cap">What your chat got, unedited. The command was <code>{COMMAND}</code></p>
          </div>
        </div>
      </div>
    </section>
  );
}

const lsPart = LEDGER.split("\n\n")[0].split("\n");
const LHEAD = lsPart[1].split(/\s{2,}/);
const LROWS = lsPart.slice(2).map((l) => l.split(/\s{2,}/));
const REAP = LEDGER.split("\n\n")[1];

export function Trust() {
  return (
    <section className="ra-sec" id="safety">
      <div className="ra-wrap">
        <Head n="05" k="Safety" title="It goes only where you say. Then it cleans up.">
          <p>Three simple rules sit between the helper and the web. A ledger, a written list, records every browser window it opens.</p>
        </Head>
        <Guardrails />
        <div className="ra-ledger ra-rv">
          <div className="ra-chart-h">
            <span><span className="ra-live" aria-hidden="true" />The ledger · <code>browse ls</code></span>
            <span className="ra-pill ra-pill-dim">Real output</span>
          </div>
          <div className="ra-tablewrap">
            <table className="ra-table ra-table-mono">
              <thead><tr>{LHEAD.map((h) => <th key={h} scope="col">{h.toLowerCase()}</th>)}</tr></thead>
              <tbody>
                {LROWS.map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, i) => <td key={i}>{i === 7 ? <span className="ra-pill ra-pill-warn">{c.replace("-", " ")}</span> : c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="ra-cap">Each row is a window: its purpose, owner, engine and last use. These 4 run an older browser version, so they are flagged.</p>
        </div>
        <Term title="browse reap, dry run first" className="ra-rv">
          <pre>{REAP}</pre>
        </Term>
        <p className="ra-cap">A dry run lists what would close. Nothing closes until you run it for real.</p>
      </div>
    </section>
  );
}

const DOC = DOCTOR.split("\n").map((l) => {
  const [head, fix] = l.split(" | fix: ");
  return { s: head.slice(0, 4), t: head.slice(5), fix };
});

export function Start() {
  const extra = [
    <p key="1" className="ra-cap">Adds the plugin to Claude Code from GitHub. No API key.</p>,
    <Term key="2" title="browse doctor">
      {DOC.map((d) => (
        <div key={d.t} className="ra-ln"><b className={d.s === "PASS" ? "ra-ok" : "ra-warn"}>{d.s}</b> {d.t}{d.fix && <span className="ra-fix"> fix: {d.fix}</span>}</div>
      ))}
    </Term>,
    <Reply key="3" />,
  ];
  return (
    <section className="ra-sec ra-sec-alt" id="start">
      <div className="ra-wrap">
        <Head n="06" k="Start" title="Three steps to your first answer." />
        <ol className="ra-steps">
          {STEPS.map(([n, t, cmd], i) => (
            <li key={n} className="ra-step ra-rv">
              <span className="ra-step-n">{n}</span>
              <div className="ra-step-b">
                <b>{t}</b>
                <div className="ra-cmd"><code>{cmd}</code><CopyButton text={cmd} label="Copy" variant="small" /></div>
                {extra[i]}
                {i === 1 && <p className="ra-cap">A WARN line tells you the fix. The Chrome line only matters for the logged-in mode. CDP is how programs talk to Chrome, and daemons are windows left running.</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="ra-sec" id="faq">
      <div className="ra-wrap ra-faq">
        <Head n="07" k="Questions" title="Short answers." />
        <div className="ra-rv">
          {FAQ.map(([q, a]) => (
            <details key={q} className="ra-q">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className="ra-close">
      <div className="ra-wrap">
        <h2 className="ra-h2">Install it, then ask Claude your first question.</h2>
        <div className="ra-cmd ra-cmd-lg">
          <code>{INSTALL}<span className="ra-cursor" aria-hidden="true" /></code>
          <CopyButton text={INSTALL} label="Copy install command" />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="ra-foot">
      <div className="ra-wrap ra-foot-in">
        <span className="ra-mark"><span className="ra-mark-dot" aria-hidden="true" />claude-browse</span>
        <span>MIT licence</span>
        <a href={REPO}><GitHubIcon /> GitHub</a>
        <a href="/">by Charandeep Kapoor</a>
      </div>
    </footer>
  );
}
