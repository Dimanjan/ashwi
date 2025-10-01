import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  data: object | object[];
}

/**
 * StructuredData Component
 * Renders JSON-LD structured data for SEO
 */
const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(Array.isArray(data) ? data : [data], null, 2)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
