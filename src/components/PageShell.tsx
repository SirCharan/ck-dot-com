import type { ReactNode } from "react";
import { PressShell, PressFrame } from "@/press/components/PressShell";
import { pressSans, pressSerif, pressMono } from "@/press/fonts";

/** Dark routes use PROOF PRESS shell (greenfield). */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className={`${pressSans.variable} ${pressSerif.variable} ${pressMono.variable}`}>
      <PressShell>{children}</PressShell>
    </div>
  );
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
  return <PressFrame kicker={kicker} title={title} lede={lede} />;
}
