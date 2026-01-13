import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useCanonicalTag = () => {
  const location = useLocation();

  useEffect(() => {
    const canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', `https://www.senmizu.com${location.pathname}`);
    }
  }, [location]);
};

export default useCanonicalTag;