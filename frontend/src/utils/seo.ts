/**
 * SEO Utility Functions for Ashwi Furniture
 * This file contains helper functions for SEO optimization
 */

export const SITE_NAME = 'Ashwi Furniture';
export const SITE_URL = 'https://ashwi-furniture.com';
export const SITE_DESCRIPTION = 'Discover premium quality furniture for your home at Ashwi Furniture. Shop living room, bedroom, dining room, office & outdoor furniture with free shipping on orders over $500.';
export const DEFAULT_IMAGE = `${SITE_URL}/images/og-image.jpg`;
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
