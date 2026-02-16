"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "var(--deep-bg)", color: "white" }}
    >
      <h1 className="font-orbitron text-4xl font-bold mb-4">Error</h1>
      <p className="text-gray-400 mb-6">Something went wrong.</p>
      <button
        onClick={reset}
        className="font-orbitron text-sm uppercase tracking-wider text-[var(--neon-purple)] hover:text-[var(--neon-cyan)] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
