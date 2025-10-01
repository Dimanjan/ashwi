import { Helmet } from 'react-helmet-async';

/**
 * PreloadResources Component
 * Preloads critical resources for better performance and Core Web Vitals
 */
const PreloadResources: React.FC = () => {
  return (
    <Helmet>
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Preload critical fonts (example) */}
      {/* <link 
        rel="preload" 
        href="/fonts/your-font.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      /> */}
    </Helmet>
  );
};

export default PreloadResources;
