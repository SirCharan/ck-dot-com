import { MEASURED } from "@/components/claude-browse/data";

export const fmt = (n: number) => n.toLocaleString("en-US");
export const pad = (n: number) => String(n).padStart(2, "0");
export const MSGS = Array.from({ length: 10 }, (_, i) => i + 1);
/* Illustrative: every message reads one page like the measured one. */
export const PER_OFF = MEASURED.full;
export const PER_ON = MEASURED.summary;
/* Tokens sent in total: each message re-sends the chat so far. */
export const sent = (per: number, n: number) => (per * n * (n + 1)) / 2;
