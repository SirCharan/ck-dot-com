import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'Person' | 'WebSite' | 'Article' | 'Organization';
  data: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    };

    return JSON.stringify(baseData);
  };

  return (
    <Helmet>
      <script type="application/ld+json">{getStructuredData()}</script>
    </Helmet>
  );
};

export default StructuredData; 