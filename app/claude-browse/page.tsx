import type { Metadata } from "next";
import { githubStars } from "@/lib/githubStars";
import { Motion } from "@/components/claude-browse/Client";
import { Close, Footer, Hero, How, Nav, Onboard, Proof, Split, Start, Story, Trust, Example } from "@/components/claude-browse/Sections";

const TITLE = "Claude Browse: give Claude a browser, keep your chat light";
const DESCRIPTION =
  "Claude Browse is a free Claude Code plugin. A helper reads web pages for Claude and sends back a short note, so your chat stays small. MIT, no API key.";
const URL = "https://charandeepkapoor.com/claude-browse";
const OG_IMAGE = { url: "/claude-browse/opengraph-image", width: 1200, height: 630, alt: "Claude Browse: 6,400 tokens read, 90 tokens kept" };

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/claude-browse" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/claude-browse", siteName: "Charandeep Kapoor", type: "website", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE.url] },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Claude Browse",
  description: DESCRIPTION,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  license: "https://opensource.org/licenses/MIT",
  url: URL,
  codeRepository: "https://github.com/SirCharan/claude-browse",
  author: { "@type": "Person", name: "Charandeep Kapoor", url: "https://charandeepkapoor.com" },
};

export default async function ClaudeBrowsePage() {
  const stars = await githubStars("SirCharan/claude-browse");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <Motion />
      <Nav stars={stars} />
      <main>
        <Hero />
        <Example />
        <Onboard />
        <Story />
        <Split />
        <How />
        <Proof />
        <Trust />
        <Start />
        <Close />
      </main>
      <Footer />
    </>
  );
}
