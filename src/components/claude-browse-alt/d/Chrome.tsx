import Link from "next/link";
import { REPO } from "@/components/claude-browse/data";

const LINKS: [string, string][] = [
  ["#how", "How it works"],
  ["#proof", "Proof"],
  ["#windows", "Windows"],
  ["#safety", "Safety"],
  ["#start", "Install"],
];

export function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function Nav() {
  return (
    <header className="ss-nav">
      <div className="ss-wrap ss-nav-in">
        <a href="#top" className="ss-mark">
          <span className="ss-mark-dot" aria-hidden="true" />
          claude-browse
        </a>
        <nav aria-label="Sections" className="ss-nav-links">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="ss-nav-end">
          <a href={REPO} className="ss-nav-gh">
            <GitHubIcon />
            <span>GitHub</span>
          </a>
          <a href="#start" className="ss-btn ss-btn-sm">
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="ss-foot">
      <div className="ss-wrap ss-foot-in">
        <span className="ss-mark">
          <span className="ss-mark-dot" aria-hidden="true" />
          claude-browse
        </span>
        <span>MIT licence</span>
        <a href={REPO}>GitHub</a>
        <span>
          by <Link href="/">Charandeep Kapoor</Link>
        </span>
      </div>
    </footer>
  );
}
