// Paths served by next.config.js rewrites to other Vercel projects. Next <Link> would
// prefetch ?_rsc= for these and 404, so they must render as plain <a>.
const REWRITTEN = ["/openwispr", "/second-brain", "/andrea-world", "/remark42"];

export function isRewritten(href: string): boolean {
  return REWRITTEN.some((p) => href === p || href.startsWith(`${p}/`));
}
