import type { ReactNode } from "react";

/**
 * Ephemeris layout primitives — the notebook grammar.
 *
 *  - <Rule>        a 0.5–1px hairline (bone @ low alpha). The ONLY divider.
 *  - <Caption>     a mono journal caption (Fig./Eq./date/coordinate).
 *  - <Figure>      a captioned/numbered block, journal-figure style.
 *  - <MetaGutter>  the persistent LEFT meta gutter: mono tags in the margin,
 *                  content to the right. Mobile collapses the rail to an
 *                  inline mono caption above the block.
 */

export function Rule({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-px w-full bg-[rgb(var(--bone)/0.11)] ${className}`}
    />
  );
}

export function Caption({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`num text-[11px] uppercase leading-relaxed tracking-[0.1em] text-[rgb(var(--bone-dim))] ${className}`}
    >
      {children}
    </p>
  );
}

export function Figure({
  label,
  caption,
  children,
  className = "",
}: {
  /** e.g. "Fig. 1" — rendered mono in the caption row */
  label?: string;
  caption?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`m-0 ${className}`}>
      {children}
      {(label || caption) && (
        <>
          <Rule className="mt-4" />
          <figcaption className="mt-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            {label && (
              <Caption className="text-[rgb(var(--bone))]">{label}</Caption>
            )}
            {caption && <Caption>{caption}</Caption>}
          </figcaption>
        </>
      )}
    </figure>
  );
}

/**
 * MetaGutter — asymmetric two-column layout with a mono meta rail on the left.
 * On < md the rail collapses to inline mono tags ABOVE the content.
 */
export function MetaGutter({
  meta,
  children,
  className = "",
}: {
  /** stacked mono tags: dates / coords / role tags / §-labels */
  meta: ReactNode[];
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-[9rem,1fr] ${className}`}
    >
      <div className="flex flex-row flex-wrap gap-x-4 gap-y-1 md:flex-col md:gap-y-2 md:pt-1">
        {meta.map((m, i) => (
          <Caption key={i}>{m}</Caption>
        ))}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
