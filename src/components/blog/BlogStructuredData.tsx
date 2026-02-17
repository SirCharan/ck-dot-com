import type { BlogPost } from "@/lib/blog";

const SITE_URL = "https://charandeepkapoor.com";

interface BlogStructuredDataProps {
  post: BlogPost;
  slug: string;
}

export function BlogStructuredData({ post, slug }: BlogStructuredDataProps) {
  const url = `${SITE_URL}/blog/${slug}`;
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.title,
    url,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Charandeep Kapoor",
      url: SITE_URL,
      jobTitle: "Crypto & Quant Finance Expert",
    },
    publisher: {
      "@type": "Organization",
      name: "Charandeep Kapoor",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    },
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(post.tags && post.tags.length > 0 && { keywords: post.tags.join(", ") }),
    isAccessibleForFree: true,
    inLanguage: "en-US",
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Writings",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
    </>
  );
}
