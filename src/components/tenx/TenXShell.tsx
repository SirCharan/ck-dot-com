"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { PROOF } from "@/components/spikes/proof";
import "@/tenx.css";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/track-record", label: "Track record" },
  { href: "/blog", label: "Writing" },
  { href: "/resume", label: "About" },
] as const;

export function TenXShell({
  children,
  progress = true,
}: {
  children: ReactNode;
  progress?: boolean;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.2 });
  const [navSolid, setNavSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <div className="tx">
      <div className="tx-ambient" aria-hidden />
      <div className="tx-grain" aria-hidden />
      {progress && !reduce && <motion.div className="tx-progress" style={{ scaleX }} />}

      <header className={`tx-nav${navSolid ? " tx-nav-solid" : ""}`}>
        <Link href="/" className="tx-nav-brand">
          <Image
            src="/images/signature-neon-trans.png"
            alt=""
            width={36}
            height={36}
            className="h-7 w-7 object-contain"
            aria-hidden
          />
          CK<span style={{ color: "var(--tx-go)" }}>.</span>
        </Link>

        <nav className="tx-nav-links tx-mono" aria-label="Primary">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={isActive(n.href) ? "tx-nav-active" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="tx-nav-end">
          <button
            type="button"
            className="tx-nav-burger tx-mono"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
          <a
            className="tx-btn tx-btn-go tx-btn-sm"
            href={PROOF.links.topmate}
            target="_blank"
            rel="noreferrer"
          >
            Book a call
          </a>
        </div>
      </header>

      {open && (
        <div className="tx-nav-sheet" role="dialog" aria-label="Mobile navigation">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="tx-mono">
              {n.label}
            </Link>
          ))}
          <a href={PROOF.links.topmate} target="_blank" rel="noreferrer" className="tx-btn tx-btn-go">
            Book a call
          </a>
        </div>
      )}

      <div className="tx-main">
        <main className="tx-page">{children}</main>

        <footer className="tx-section tx-contact" id="contact">
          <p className="tx-section-label tx-mono">Contact</p>
          <h2>
            Let&apos;s build something.{" "}
            <a href={PROOF.links.topmate} target="_blank" rel="noreferrer">
              Book a call ↗
            </a>
          </h2>
          <p className="tx-sub" style={{ marginTop: "0.75rem" }}>
            {PROOF.role}
          </p>
          <div className="tx-socials tx-mono">
            <a href={PROOF.links.twitter} target="_blank" rel="noreferrer">
              X / @yourasianquant
            </a>
            <a href={PROOF.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={PROOF.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <Link href="/blog">Writing</Link>
            <Link href="/work">Work</Link>
          </div>
          <div className="tx-sig">
            <Image
              src="/images/signature-neon-trans.png"
              alt="CK monogram"
              width={160}
              height={160}
              className="h-20 w-auto"
            />
            <p className="tx-footer-note tx-mono">
              © {new Date().getFullYear()} {PROOF.name}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
