import type { ReactNode } from "react";
import { TenXShell } from "@/components/tenx/TenXShell";
import { TenXPageIntro } from "@/components/tenx/TenXPageIntro";

/**
 * Site shell for dark app routes — now TenX (Grok), not Mission-Control (Claude).
 * Existing pages keep importing PageShell / PageIntro; they get the TenX system.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return <TenXShell>{children}</TenXShell>;
}

export function PageIntro({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return <TenXPageIntro kicker={kicker} title={title} lede={lede} />;
}
