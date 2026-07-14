import Link from "next/link";

export function SpikeTopbar({
  variant,
  label,
}: {
  variant: "cinematic" | "kinetic" | "playground";
  label: string;
}) {
  return (
    <div className="spike-topbar spike-mono">
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link href="/">← Compare</Link>
        <span style={{ color: "rgba(232,238,245,0.35)" }}>|</span>
        <span style={{ color: "#3dfb86" }}>{label}</span>
      </div>
      <div style={{ display: "flex", gap: "0.85rem" }}>
        <Link href="/v/cinematic" style={{ opacity: variant === "cinematic" ? 1 : 0.55 }}>
          A
        </Link>
        <Link href="/v/kinetic" style={{ opacity: variant === "kinetic" ? 1 : 0.55 }}>
          B
        </Link>
        <Link href="/v/playground" style={{ opacity: variant === "playground" ? 1 : 0.55 }}>
          C
        </Link>
      </div>
    </div>
  );
}
