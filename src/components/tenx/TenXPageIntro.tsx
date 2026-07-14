/** Shared page intro for TenX dark routes — replaces Claude PageIntro. */
export function TenXPageIntro({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="tx-page-intro">
      <p className="tx-section-label tx-mono">{kicker}</p>
      <h1 className="tx-page-title">{title}</h1>
      <p className="tx-sub tx-serif">{lede}</p>
    </section>
  );
}
