import Link from "next/link";
import { PressShell } from "@/press/components/PressShell";
import { pressSans, pressSerif, pressMono } from "@/press/fonts";

export default function NotFound() {
  return (
    <div className={`${pressSans.variable} ${pressSerif.variable} ${pressMono.variable}`}>
      <PressShell>
        <header className="press-frame">
          <p className="press-frame-k">404</p>
          <h1>Not found</h1>
          <p className="press-frame-lede press-serif">That route is empty.</p>
          <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.65rem" }}>
            <Link href="/" className="press-btn press-btn-go">
              Home
            </Link>
            <Link href="/work" className="press-btn press-btn-ghost">
              Work
            </Link>
          </div>
        </header>
      </PressShell>
    </div>
  );
}
