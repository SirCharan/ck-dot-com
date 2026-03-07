"use client";

import { useEffect, useRef } from "react";

const REMARK_HOST = "/remark42";
const SITE_ID = "charandeepkapoor";

declare global {
  interface Window {
    remark_config: { host: string; site_id: string; components?: string[] };
    REMARK42?: { destroy: () => void };
  }
}

export function Remark42Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.remark_config = { host: REMARK_HOST, site_id: SITE_ID };

    const script = document.createElement("script");
    script.src = `${REMARK_HOST}/web/embed.mjs`;
    script.type = "module";
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      script.remove();
      window.REMARK42?.destroy();
    };
  }, []);

  return (
    <div ref={ref} className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div id="remark42" />
    </div>
  );
}
