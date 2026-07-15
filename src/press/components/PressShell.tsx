"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { PROOF } from "@/press/lib/proof";
import "@/press/tokens.css";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/track-record", label: "Track record" },
  { href: "/blog", label: "Writing" },
  { href: "/resume", label: "About" },
] as const;

export function PressShell({
  children,
  bare = false,
}: {
  children: ReactNode;
  bare?: boolean;
}) {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const active = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <div className="press">
      <div className="press-atmos" aria-hidden />
      <div className="press-grain" aria-hidden />

      <header className={`press-nav${solid ? " is-solid" : ""}`}>
        <Link href="/" className="press-brand">
          CK<span>.</span>
        </Link>
        <nav className="press-nav-links" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={active(n.href) ? "is-active" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
          <button
            type="button"
            className="press-nav-burger press-mono"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
          <a
            className="press-btn press-btn-go press-btn-sm"
            href={PROOF.socials.topmate}
            target="_blank"
            rel="noreferrer"
          >
            Book a call
          </a>
        </div>
      </header>

      {open && (
        <div className="press-sheet">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
      )}

      <div className="press-main">
        {bare ? children : <div className="press-page">{children}</div>}
        <footer className="press-foot">
          <h2>
            Build with me.{" "}
            <a href={PROOF.socials.topmate} target="_blank" rel="noreferrer">
              Book a call
            </a>
          </h2>
          <p className="press-foot-meta">{PROOF.role}</p>
          <div className="press-socials press-mono">
            <a href={PROOF.socials.twitter} target="_blank" rel="noreferrer">
              X
            </a>
            <a href={PROOF.socials.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={PROOF.socials.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <Link href="/blog">Writing</Link>
            <Link href="/work">Work</Link>
          </div>
          <p className="press-copy press-mono">
            © {new Date().getFullYear()} {PROOF.name}
          </p>
        </footer>
      </div>
    </div>
  );
}

export function PressFrame({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="press-frame">
      <p className="press-frame-k press-serif">{kicker}</p>
      <h1>{title}</h1>
      <p className="press-frame-lede press-serif">{lede}</p>
    </header>
  );
}
