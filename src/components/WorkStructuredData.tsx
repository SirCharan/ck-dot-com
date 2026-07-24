import type { CaseStudy } from "@/data/site";

const SITE_URL = "https://charandeepkapoor.com";

export function WorkStructuredData({ cs }: { cs: CaseStudy }) {
  const url = `${SITE_URL}/work/${cs.slug}`;

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: cs.title,
    url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    description: cs.tagline,
    sameAs: cs.links.map((l) => l.href),
    author: {
      "@type": "Person",
      name: "Charandeep Kapoor",
      url: SITE_URL,
    },
    ...(cs.shots?.[0] && { image: `${SITE_URL}${cs.shots[0].src}` }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
      { "@type": "ListItem", position: 3, name: cs.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
