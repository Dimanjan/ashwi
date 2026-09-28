/**
 * SEO Utility Functions for Ashwi Furniture
 * This file contains helper functions for SEO optimization
 */

export const SITE_NAME = 'Ashwi Furniture';
export const SITE_NAME_NE = 'अश्वी फर्निचर';
export const SITE_URL = 'https://www.ashwifurniture.com';
export const SITE_DESCRIPTION = 'काठमाडौँ तथा नेपालभर गुणस्तरीय काठको फर्निचर: सोफा सेट, काठको पलंग (beds), दराज (wardrobes), डाइनिङ टेबल र पूजा मन्दिर। 100% Payment After Delivery across Kathmandu, Lalitpur & Bhaktapur. Call/WhatsApp 9860479751.';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
export const BRAND_LOGO = `${SITE_URL}/logo512.png`;
export const TWITTER_HANDLE = '@ashwifurniture';


/**
 * Generate a clean, SEO-friendly title
 */
export const generatePageTitle = (title?: string): string => {
  if (!title) {
    return `${SITE_NAME} - Quality Home Furniture & Decor`;
  }
  
  // If title already includes the site name, return as is
  if (title.includes(SITE_NAME)) {
    return title;
  }
  
  // Append site name to title
  return `${title} | ${SITE_NAME}`;
};

/**
 * Truncate description to a safe length for meta tags
 */
export const truncateDescription = (description: string, maxLength: number = 160): string => {
  if (description.length <= maxLength) {
    return description;
  }
  
  return description.substring(0, maxLength - 3).trim() + '...';
};

/**
 * Generate keywords from an array
 */
export const generateKeywords = (...keywords: string[]): string => {
  return keywords.filter(Boolean).join(', ');
};

/**
 * Get absolute URL
 */
export const getAbsoluteUrl = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${SITE_URL}/${cleanPath}`;
};

/**
 * Generate image URL for social sharing
 */
export const getSocialImageUrl = (imageUrl?: string): string => {
  if (!imageUrl) {
    return DEFAULT_IMAGE;
  }
  
  // If it's already an absolute URL, return it
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Otherwise, make it absolute
  return getAbsoluteUrl(imageUrl);
};
