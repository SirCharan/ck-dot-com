import Link from "next/link";
import { TenXShell } from "@/components/tenx/TenXShell";

export default function NotFound() {
  return (
    <TenXShell progress={false}>
      <section className="tx-page-intro" style={{ minHeight: "50vh", paddingTop: "4rem" }}>
        <p className="tx-section-label tx-mono">404</p>
        <h1 className="tx-page-title">Page not found</h1>
        <p className="tx-sub tx-serif">That route doesn&apos;t exist — or it moved.</p>
        <div className="tx-section-cta">
          <Link href="/" className="tx-btn tx-btn-go">
            Home
          </Link>
          <Link href="/work" className="tx-btn tx-btn-ghost">
            Work
          </Link>
        </div>
      </section>
    </TenXShell>
  );
}
