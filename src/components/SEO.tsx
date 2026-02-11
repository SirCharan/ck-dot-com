import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  keywords?: string[];
}

const SEO = ({
  title = "Charandeep Kapoor | Crypto, Quant Finance & Mathematics Expert",
  description = "Charandeep Kapoor - 6+ years in crypto, quant finance & product. Creator of Stocky AI (100%+ ROI). Essays on protected perps, DeFi, trading psychology. Expert in algorithmic trading, blockchain, mathematical finance.",
  canonicalUrl = "https://charandeepkapoor.com",
  ogImage = "https://charandeepkapoor.com/og-image.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  keywords = ["Charandeep Kapoor", "crypto expert", "quantitative finance", "algorithmic trading", "blockchain", "DeFi", "Stocky AI", "protected perps", "trading psychology", "mathematical finance"],
}: SEOProps) => {
  const keywordsString = keywords.join(", ");

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Charandeep Kapoor Portfolio" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@yourasianquant" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO; 