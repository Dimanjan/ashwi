import React from 'react';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
}

/**
 * High-performance image component:
 * 1. Serves modern WebP variant if available via <picture>
 * 2. Falls back seamlessly to optimized in-place JPEG/PNG
 * 3. Native lazy loading & async decoding (zero main-thread blocking)
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  ...props
}) => {
  if (!src) {
    return <div className={`bg-gray-100 flex items-center justify-center text-gray-400 ${className}`}>No image</div>;
  }

  // Detect local raster images that have generated WebP counterparts
  const isLocalRaster = src.startsWith('/') && /\.(jpe?g|png)$/i.test(src);
  const webpSrc = isLocalRaster ? src.replace(/\.(jpe?g|png)$/i, '.webp') : null;

  return (
    <picture className="contents">
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={className}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;
