"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"div"> & { delay?: number };

export function FadeIn({ delay = 0, children, ...rest }: Props) {
  const reduced = useReducedMotion();
  // Reduced-motion (or any context without IntersectionObserver, e.g. jsdom):
  // render the final visible state so content is never stuck at opacity 0.
  if (reduced) {
    const { className, style, id } = rest as {
      className?: string;
      style?: React.CSSProperties;
      id?: string;
    };
    return (
      <div className={className} style={style} id={id}>
        {children as React.ReactNode}
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.22, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
