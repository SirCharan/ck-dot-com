"use client";

import { useEffect, useState } from "react";

/**
 * Renders children only after mount — server + first client render are identical
 * (nothing), so purely presentational data/date-driven widgets can't trigger a
 * hydration mismatch. Use for SSR-non-critical viz (e.g. the P&L calendar).
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted ? children : fallback}</>;
}
