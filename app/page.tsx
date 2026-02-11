"use client";

import dynamic from "next/dynamic";

// Lazy-load the heavy Index page to avoid blocking
const Index = dynamic(() => import("@/views/Index"), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--deep-bg)" }}
    >
      <div className="text-gray-400 font-orbitron animate-pulse">Loading...</div>
    </div>
  ),
});

export default function Home() {
  return <Index />;
}
