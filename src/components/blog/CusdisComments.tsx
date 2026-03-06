"use client";

import { useEffect, useRef } from "react";

interface CusdisCommentsProps {
  slug: string;
  title: string;
}

const SITE_URL = "https://charandeepkapoor.com";

export function CusdisComments({ slug, title }: CusdisCommentsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    container.innerHTML = "";

    const thread = document.createElement("div");
    thread.id = "cusdis_thread";
    thread.setAttribute("data-host", "https://cusdis.com");
    thread.setAttribute("data-app-id", "99848197-f68d-422a-8459-b5ba806dae98");
    thread.setAttribute("data-page-id", slug);
    thread.setAttribute("data-page-url", `${SITE_URL}/blog/${slug}`);
    thread.setAttribute("data-page-title", title);
    container.appendChild(thread);

    const script = document.createElement("script");
    script.src = "https://cusdis.com/js/cusdis.es.js";
    script.async = true;
    script.defer = true;
    container.appendChild(script);
  }, [slug, title]);

  return <div ref={ref} className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700" />;
}
