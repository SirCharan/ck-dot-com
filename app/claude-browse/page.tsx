import type { Metadata } from "next";
import { PressShell } from "@/press/components/PressShell";
import { ClaudeBrowseLanding } from "@/components/ClaudeBrowseLanding";

const DESCRIPTION =
  "claude-browse is an open-source Claude Code plugin. A Sonnet sub-agent does the browsing so the main model reads a summary of twelve lines or fewer.";

export const metadata: Metadata = {
  title: "claude-browse, browsing from Claude Code",
  description: DESCRIPTION,
  alternates: { canonical: "/claude-browse" },
  openGraph: {
    title: "claude-browse, browsing from Claude Code",
    description: DESCRIPTION,
    url: "/claude-browse",
    type: "website",
  },
};

export default function ClaudeBrowsePage() {
  return (
    <PressShell>
      <ClaudeBrowseLanding />
    </PressShell>
  );
}
