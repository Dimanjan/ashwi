import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: object | object[];
}

const DEFAULT_OG_IMAGE = 'https://www.ashwifurniture.com/og-image.jpg';
const FALLBACK_LOGO = 'https://www.ashwifurniture.com/logo512.png';

const SEO: React.FC<SEOProps> = ({
  title = 'Ashwi Furniture - Handcrafted Furniture in Kathmandu, Nepal | काठको फर्निचर | Pay After Delivery',
  description = 'काठमाडौँ तथा नेपालभर गुणस्तरीय काठको फर्निचर: सोफा सेट, काठको पलंग (beds), दराज (wardrobes), डाइनिङ टेबल र पूजा मन्दिर। 100% Payment After Delivery across Kathmandu, Lalitpur & Bhaktapur. Call/WhatsApp 9860479751.',
  keywords = 'furniture in Kathmandu, furniture Nepal, kaath ko palang, sasto furniture kathmandu, palang design nepal, daraj ko price nepal, ghar ko mandir nepal, sofa set rate nepal, फर्निचर, काठको पलंग, सोफा सेट, दराज, पूजा मन्दिर, डाइनिङ टेबल, Ashwi Furniture',
  image = DEFAULT_OG_IMAGE,
  url = 'https://www.ashwifurniture.com',
  type = 'website',
  author = 'Ashwi Furniture',
  publishedTime,
  modifiedTime,
  canonicalUrl,
  noindex = false,
  nofollow = false,
  structuredData,
}) => {
  const siteTitle = title.includes('Ashwi') ? title : `${title} | Ashwi Furniture`;
  
  // Normalize image to guaranteed absolute URL for WhatsApp / Facebook / Twitter / Viber link previews
  const resolvedImage = React.useMemo(() => {
    if (!image) return DEFAULT_OG_IMAGE;
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    const cleanPath = image.startsWith('/') ? image : `/${image}`;
    return `https://www.ashwifurniture.com${cleanPath}`;
  }, [image]);

  const imageType = resolvedImage.endsWith('.png') 
    ? 'image/png' 
    : resolvedImage.endsWith('.webp') 
    ? 'image/webp' 
    : 'image/jpeg';
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Robots Meta Tags */}
      {(noindex || nofollow) && (
        <meta 
          name="robots" 
          content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} 
        />
      )}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Ashwi Furniture" />
      <meta property="og:locale" content="en_NP" />
      <meta property="og:locale:alternate" content="ne_NP" />
      
      {/* Primary Link Preview Image (Product / Page image or Default Branded Card) */}
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:secure_url" content={resolvedImage} />
      <meta property="og:image:type" content={imageType} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={siteTitle} />
      
      {/* Fallback Brand Logo for platforms supporting secondary square icons */}
      <meta property="og:image" content={FALLBACK_LOGO} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:type" content="image/png" />
      
      {/* Link source tag for legacy mobile chat preview scrapers */}
      <link rel="image_src" href={resolvedImage} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={siteTitle} />
      <meta name="twitter:creator" content="@ashwifurniture" />
      
      {/* Geo Location Tags for Local Nepal Ranking */}
      <meta name="geo.region" content="NP-BA" />
      <meta name="geo.placename" content="Kathmandu, Lalitpur, Bhaktapur, Nepal" />
      <meta name="geo.position" content="27.7172;85.3240" />
      <meta name="ICBM" content="27.7172, 85.3240" />
      
      {/* Article Tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      
      {/* Additional SEO Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English, Nepali" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
