"use client";

import { useEffect, useRef } from "react";

interface GiscusCommentsProps {
  slug: string;
}

export function GiscusComments({ slug }: GiscusCommentsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "SirCharan/ck-dot-com");
    script.setAttribute("data-repo-id", "");
    script.setAttribute("data-category", "Blog Comments");
    script.setAttribute("data-category-id", "");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    ref.current.innerHTML = "";
    ref.current.appendChild(script);
  }, [slug]);

  return <div ref={ref} className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700" />;
}
