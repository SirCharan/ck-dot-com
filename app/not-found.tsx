import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "var(--deep-bg)", color: "white" }}
    >
      <h1 className="font-orbitron text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-400 mb-6">Page not found.</p>
      <Link
        href="/"
        className="font-orbitron text-sm uppercase tracking-wider text-[var(--neon-purple)] hover:text-[var(--neon-cyan)] transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
