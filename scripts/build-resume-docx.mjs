/**
 * Build the ATS fallback résumé: public/charandeep-kapoor-resume.docx
 *
 *   npm run resume:docx
 *
 * Reads the same master as the web page and the PDF (content/resume.md), so the
 * three artifacts cannot drift.
 *
 * Deliberately SINGLE COLUMN with standard fonts and real heading styles. The
 * PDF is two-column (ck's choice) and keeps a linear text layer, but some ATS
 * portals still mangle columns, so this file is the plain one that always parses.
 */

import {
  AlignmentType,
  Document,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  Tab,
  TabStopType,
  TextRun,
} from "docx";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "charandeep-kapoor-resume.docx");

const { data: R, content } = matter(fs.readFileSync(path.join(ROOT, "content", "resume.md"), "utf8"));
const profile = content.trim();

const FONT = "Arial"; // A metrically boring, universally parseable face. ATS first.
const BULLET = "resume-bullet";

/** Section heading. A real Heading style so parsers see document structure. */
const heading = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 20, font: FONT })],
  });

/** Body line. */
const body = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: opts.after ?? 60 },
    children: [new TextRun({ text, size: opts.size ?? 19, font: FONT, color: "222222" })],
  });

/**
 * "Bold left <tab> right" on one line.
 *
 * Uses a real right TAB STOP plus a `<w:tab/>` run, NOT a PositionalTab: a
 * positional tab is pure layout, so text extraction concatenates the two
 * strings ("B.Tech, IIT Kanpur2018 - 2022"), which is precisely the mangling
 * this ATS file exists to avoid. A real tab extracts as whitespace.
 */
const RIGHT_EDGE = 10546; // page width minus both margins, in DXA
const rowWithRight = (leftRuns, right) =>
  new Paragraph({
    spacing: { before: 120, after: 20 },
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_EDGE }],
    children: [
      ...leftRuns,
      new TextRun({
        font: FONT,
        size: 18,
        color: "444444",
        children: [new Tab(), right],
      }),
    ],
  });

const bullet = (text) =>
  new Paragraph({
    numbering: { reference: BULLET, level: 0 },
    spacing: { after: 40 },
    children: [new TextRun({ text, size: 19, font: FONT, color: "222222" })],
  });

// Literal email and location on purpose: the PDF shows a friendly "Email"
// label, but an ATS can only parse the address if the text is actually present.
const contactLine = [
  R.contact.location,
  R.contact.phone,
  R.contact.email,
  R.contact.site,
  R.contact.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
  R.contact.github.replace(/^https?:\/\/(www\.)?/, ""),
  R.contact.twitter.replace(/^https?:\/\/(www\.)?/, ""),
]
  .filter(Boolean)
  .join("  |  ");

const children = [
  new Paragraph({
    spacing: { after: 0 },
    children: [new TextRun({ text: R.name, bold: true, size: 40, font: FONT })],
  }),
  new Paragraph({
    spacing: { after: 60 },
    children: [new TextRun({ text: R.title, size: 22, font: FONT, color: "333333" })],
  }),
  new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: contactLine, size: 17, font: FONT, color: "444444" })],
  }),

  heading("Summary"),
  body(profile),

  heading("Selected systems"),
  ...R.systems.flatMap((s) => [
    rowWithRight(
      [new TextRun({ text: s.name, bold: true, size: 20, font: FONT })],
      s.hrefLabel ?? s.href.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    ),
    // A bare "verified" label is useless to a parser, so the DOCX carries the URL.
    body(s.proof ? `${s.line} (${s.proof.label}: ${s.proof.href.replace(/^https?:\/\//, "")})` : s.line),
  ]),

  heading("Experience"),
  ...R.experience.flatMap((role) => {
    const head = rowWithRight(
      [
        new TextRun({ text: role.company, bold: true, size: 20, font: FONT }),
        new TextRun({ text: `, ${role.position}`, size: 19, font: FONT, color: "333333" }),
      ],
      role.duration,
    );
    if (role.bullets?.length) return [head, ...role.bullets.map(bullet)];
    return [head, body(role.one)];
  }),

  heading("Skills"),
  ...R.skills.map((g) =>
    new Paragraph({
      spacing: { after: 50 },
      children: [
        new TextRun({ text: `${g.group}: `, bold: true, size: 19, font: FONT }),
        new TextRun({ text: g.items.join(", "), size: 19, font: FONT, color: "222222" }),
      ],
    }),
  ),

  heading("Education & honours"),
  ...R.academics.map((a) =>
    rowWithRight([new TextRun({ text: a.title, size: 19, font: FONT })], a.detail),
  ),

  heading("Certifications"),
  ...R.certifications.map((c) =>
    rowWithRight(
      [new TextRun({ text: c.title, size: 19, font: FONT })],
      c.detail,
    ),
  ),
];

const doc = new Document({
  creator: R.name,
  title: `${R.name} — Résumé`,
  description: R.title,
  numbering: {
    config: [
      {
        reference: BULLET,
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 360, hanging: 180 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          // A4 in DXA (1440 = 1in). 12mm margins, matching the PDF.
          size: { width: 11906, height: 16838 },
          margin: { top: 680, right: 680, bottom: 680, left: 680 },
        },
      },
      children,
    },
  ],
});

const buf = await Packer.toBuffer(doc);
fs.writeFileSync(OUT, buf);
console.log(`wrote ${path.relative(ROOT, OUT)} — ${Math.round(buf.length / 1024)}KB`);
