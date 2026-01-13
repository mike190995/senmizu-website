import React from 'react';
import { Helmet } from 'react-helmet-async';

interface CanonicalTagProps {
  path: string;
}

const CanonicalTag: React.FC<CanonicalTagProps> = ({ path }) => {
  const baseUrl = 'https://www.senmizu.com';
  const canonicalUrl = `${baseUrl}${path}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default CanonicalTag;
