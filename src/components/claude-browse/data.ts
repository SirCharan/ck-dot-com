/* Every value here is real output or a real measurement from 30 Sep 2026. Do not invent. */

export const REPO = "https://github.com/SirCharan/claude-browse";
export const INSTALL =
  "claude plugin marketplace add SirCharan/claude-browse && claude plugin install claude-browse";
export const COMMAND = '/browse "top story on Hacker News, with points"';

export const MEASURED = { full: 6400, compact: 3350, summary: 90, seconds: 11, date: "30 Sep 2026", version: "agent-browser 0.38.1" };

/* The whole reply the main model received, unedited. */
export const SUMMARY: [string, string][] = [["RESULT:", " The current top story on Hacker News is \"Livenerf: Has Opus 5.5 been nerfed yet?\", with 561 points and 239 comments."], ["KEY DATA:", ""], ["", "- Title: Livenerf: Has Opus 5.5 been nerfed yet?"], ["", "- Points: 561"], ["", "- Comments: 239"], ["", "- Linked URL: https://github.com/ninjahawk/livenerf"], ["SOURCES:", " https://news.ycombinator.com"], ["ARTIFACTS:", " none"], ["SESSION:", " ab-hn-top (ab, closed) | BLOCKERS: none"]];

/* First lines of the compact snapshot Sonnet read on the same page. */
export const NOISE: string[] = ["- link [ref=e101]", "- link \"Hacker News\" [ref=e102]", "- link \"new\" [ref=e103]", "- link \"past\" [ref=e104]", "- link \"comments\" [ref=e105]", "- link \"ask\" [ref=e106]", "- link \"show\" [ref=e107]", "- link \"jobs\" [ref=e108]", "- link \"submit\" [ref=e109]", "- link \"login\" [ref=e110]", "- cell \"1.\" [ref=e10]", "- link [ref=e261]", "- cell \"Livenerf: Has Opus 5.5 been nerfed yet? (github.com/ninjahawk)\" [ref=e11]", "  - link \"Livenerf: Has Opus 5.5 been nerfed yet?\" [ref=e111]", "  - link \"github.com/ninjahawk\" [ref=e112]", "- cell \"563 points by bryan0 9 hours ago | hide | 239 comments\" [ref=e12]", "  - link \"bryan0\" [ref=e113]", "  - link \"9 hours ago\" [ref=e262]", "  - link \"hide\" [ref=e114]", "  - link \"239 comments\" [ref=e115]", "- cell \"2.\" [ref=e13]", "- link [ref=e263]", "- cell \"September 2026: The world today, as seen by one Polish guy (tomwojcik.com)\" [ref=e", "  - link \"September 2026: The world today, as seen by one Polish guy\" [ref=e116]", "  - link \"tomwojcik.com\" [ref=e117]", "- cell \"25 points by marjancek 1 hour ago | hide | 1 comment\" [ref=e15]", "  - link \"marjancek\" [ref=e118]", "  - link \"1 hour ago\" [ref=e264]", "  - link \"hide\" [ref=e119]", "  - link \"1 comment\" [ref=e120]", "- cell \"3.\" [ref=e16]", "- link [ref=e265]", "- cell \"Solving Factorio Quality (exyr.org)\" [ref=e17]", "  - link \"Solving Factorio Quality\" [ref=e121]", "  - link \"exyr.org\" [ref=e122]", "- cell \"43 points by laurenth 2 hours ago | hide | 12 comments\" [ref=e18]", "  - link \"laurenth\" [ref=e123]", "  - link \"2 hours ago\" [ref=e266]", "  - link \"hide\" [ref=e124]", "  - link \"12 comments\" [ref=e125]"];

export const LEDGER = "$ browse ls\nNAME        STACK          PURPOSE           OWNER     AGE      IDLE     PID    STATE\ndefault     agent-browser  legacy (unknown)  6e2be8ee  7d 16h   7d 16h   74432  version-mismatch\ney-book     agent-browser  legacy (unknown)  6e2be8ee  10d 15h  10d 15h  81395  version-mismatch\nkayak       agent-browser  legacy (unknown)  6e2be8ee  10d 15h  10d 15h  81228  version-mismatch\netihad-bcn  agent-browser  legacy (unknown)  6e2be8ee  10d 15h  10d 15h  80833  version-mismatch\n\n$ browse reap --dry-run --restart-mismatch\nwould close default (version mismatch)\nwould close etihad-bcn (version mismatch)\nwould close ey-book (version mismatch)\nwould close kayak (version mismatch)\nreap: closed 4, orphans removed 0, flagged 4, dry-run";

export const DOCTOR = "PASS agent-browser 0.38.1\nPASS browser-harness on PATH\nWARN Chrome CDP 9222 not reachable | fix: start Chrome with --remote-debugging-port=9222\nPASS ledger ok\nWARN version-mismatched daemons: default, etihad-bcn, ey-book, kayak | fix: browse reap --restart-mismatch\nPASS /Users/ck/.claude-browse writable";

export const COMPARE: [string, string, string][] = [
  ["Where it runs", "A hidden browser just for the helper", "The Chrome you already have open"],
  ["Sees your logins", "No. It starts clean", "Yes. Whatever you are signed in to"],
  ["How it reads pages", "A structured map of the page, not pixels", "Talks to Chrome directly"],
  ["Sites it can visit", "Only the ones you allow", "Any, with a warning"],
  ["Best for", "Public pages, checks, research", "Sites that need your account"],
];

export const FAQ: [string, string][] = [
  ["Is it free?", "Yes. It is open source under the MIT licence and needs no extra API key. It runs inside the Claude Code you already use."],
  ["Which browser does it use?", "By default a private, hidden browser that starts clean. If a site needs your account, it can use your own Chrome instead."],
  ["Can it see my passwords or logins?", "Only in the \"your own Chrome\" mode, and only what that Chrome is already signed in to. The private browser sees nothing of yours."],
  ["What if a window gets left open?", "Run browse ls to see every window and browse reap to close the idle ones. Add --dry-run to see the list before anything closes."],
  ["Can I keep it to certain sites?", "Yes. Name the sites when you start. Anything else is refused before the browser moves."],
];

export const STEPS: [string, string, string][] = [
  ["01", "Add the plugin", INSTALL],
  ["02", "Check your setup", "browse doctor"],
  ["03", "Ask your first question", COMMAND],
];
