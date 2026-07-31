/**
 * Résumé data: read from /content/resume.md (the single master source).
 * Same gray-matter pattern as src/lib/blog.ts. Server-only — /resume is a
 * server component, and scripts/build-resume.ts reads it directly.
 *
 * Content budget lives in src/data/resume.test.ts. The résumé must fit one A4
 * page; the test is the tripwire that fails when content creeps back.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const RESUME_PATH = path.join(process.cwd(), "content", "resume.md");

export interface ResumeContact {
  email: string;
  /** Empty until ck supplies one — an empty value omits the row entirely. */
  phone: string;
  location: string;
  site: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export interface ResumeSystem {
  name: string;
  href: string;
  line: string;
}

export interface ResumeRole {
  company: string;
  position: string;
  duration: string;
  /** Detailed roles carry bullets; older roles collapse to a single `one` line. */
  bullets?: string[];
  one?: string;
}

export interface ResumeSkillGroup {
  group: string;
  items: string[];
}

export interface ResumeLedgerRow {
  title: string;
  detail: string;
}

export interface Resume {
  name: string;
  title: string;
  contact: ResumeContact;
  profile: string;
  systems: ResumeSystem[];
  experience: ResumeRole[];
  skills: ResumeSkillGroup[];
  academics: ResumeLedgerRow[];
  certifications: ResumeLedgerRow[];
}

function read(): Resume {
  const file = fs.readFileSync(RESUME_PATH, "utf8");
  const { data, content } = matter(file);
  return { ...(data as Omit<Resume, "profile">), profile: content.trim() };
}

export const RESUME: Resume = read();

/** Flat skill count — the rail budget the test guards. */
export function skillCount(r: Resume = RESUME): number {
  return r.skills.reduce((n, g) => n + g.items.length, 0);
}
