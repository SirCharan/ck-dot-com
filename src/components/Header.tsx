import Link from "next/link";

const NAV = [
  { label: "Writings", href: "/blog" },
  { label: "Tools", href: "#tools" },
  { label: "Research", href: "#research" },
  { label: "About", href: "#about" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-bg/90 backdrop-blur-sm border-b border-rule">
      <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="display text-lg text-ink hover:text-accent transition-colors"
        >
          Charandeep Kapoor
        </Link>
        <nav className="flex items-center gap-5 text-sm text-mute">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-ink transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
