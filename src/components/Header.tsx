"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/data/site";

const NAV = [
  { label: "Writings", href: "/blog" },
  { label: "Delta", href: "/delta" },
  { label: "Markets", href: "/markets" },
  { label: "Projects", href: "/work" },
  { label: "About", href: "/#about" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="glass sticky top-0 z-30 border-b border-rule">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-3.5">
        <Link
          href="/"
          className="display text-lg text-ink transition-colors hover:text-accent"
        >
          {SITE.name}
        </Link>
        <nav className="-mr-2 flex items-center gap-2 overflow-x-auto pl-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV.map((item) => {
            const active =
              item.href.startsWith("/") &&
              !item.href.includes("#") &&
              (pathname === item.href || pathname.startsWith(item.href + "/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="pill"
                data-active={active}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
