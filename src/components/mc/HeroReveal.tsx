"use client";

import { Children, isValidElement } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Client-side entrance stagger for the hero. Takes server-rendered JSX as
 * `children` (so the async Dhan curve + SVG stay server-rendered / JS-off) and
 * animates each direct child in sequence on load. Under prefers-reduced-motion
 * it renders children in their final visible state with no animation.
 *
 * Note: each direct child is wrapped in a motion.div item — pass block-level
 * children (they keep their own mt-* spacing via margin collapse through the
 * zero-margin wrapper).
 */
const container: Variants = {
  hidden: {},
  show: (delayChildren: number) => ({
    transition: { staggerChildren: 0.09, delayChildren },
  }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function HeroReveal({
  children,
  className,
  delayChildren = 0.05,
}: {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
}) {
  const reduced = useReducedMotion();
  const kids = Children.toArray(children).filter((c) => isValidElement(c) || typeof c === "string");

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={container}
      custom={delayChildren}
      initial="hidden"
      animate="show"
    >
      {kids.map((child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
