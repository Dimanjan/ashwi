# Performance Optimization Guide for Ashwi Furniture

## Overview
This guide covers performance optimizations implemented to improve Core Web Vitals and overall site speed.

## Core Web Vitals

### 1. Largest Contentful Paint (LCP)
**Target: < 2.5 seconds**

#### Optimizations Implemented:
- ✅ Image lazy loading with `loading="lazy"` attribute
- ✅ Preconnect to external domains (fonts, CDNs)
- ✅ DNS prefetch for third-party resources
- ✅ Optimized font loading strategy

#### Recommended Improvements:
- [ ] Implement responsive images with `srcset`
- [ ] Convert images to WebP format
- [ ] Use CDN for image delivery
- [ ] Implement critical CSS inlining
- [ ] Optimize largest image (hero section)

### 2. First Input Delay (FID)
**Target: < 100 milliseconds**

#### Optimizations Implemented:
- ✅ Code splitting with React Router
- ✅ Lazy loading of components
- ✅ Minimized JavaScript execution

#### Recommended Improvements:
- [ ] Implement web workers for heavy computations
- [ ] Defer non-critical JavaScript
- [ ] Optimize event handlers
- [ ] Use requestIdleCallback for non-essential tasks

### 3. Cumulative Layout Shift (CLS)
**Target: < 0.1**

#### Optimizations Implemented:
- ✅ Fixed dimensions for images where possible
- ✅ Consistent component structure
- ✅ Proper loading states

#### Recommended Improvements:
- [ ] Add explicit width/height to all images
- [ ] Reserve space for dynamic content
- [ ] Use font-display: swap carefully
- [ ] Avoid inserting content above existing content

## Image Optimization

### Current Implementation:
- Lazy loading enabled
- Alt text for all images
- Image optimization in ProductCard

### Recommended Improvements:

```jsx
// 1. Implement responsive images
<img
  src={product.image}
  srcSet={`
    ${product.image_sm} 320w,
    ${product.image_md} 640w,
    ${product.image_lg} 1024w
  `}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt={product.name}
  loading="lazy"
/>

// 2. Use WebP with fallback
<picture>
  <source srcSet={product.image_webp} type="image/webp" />
  <source srcSet={product.image} type="image/jpeg" />
  <img src={product.image} alt={product.name} loading="lazy" />
</picture>

// 3. Implement blur-up technique
<img
  src={product.image}
  style={{ background: `url(${product.thumbnail_base64})` }}
  loading="lazy"
/>
```

## JavaScript Optimization

### Code Splitting

```jsx
// Lazy load heavy components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

## Caching Strategy

### Service Worker (Recommended)

```javascript
// Register service worker in index.tsx
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
```

### HTTP Caching Headers

```apache
# .htaccess (already configured)
# Static assets: 1 year
# HTML: no cache
# CSS/JS: 1 month
```

## Network Optimization

### 1. Reduce HTTP Requests
- ✅ Bundling with webpack
- ✅ CSS in JS (Tailwind)
- [ ] Sprite sheets for icons
- [ ] Inline critical CSS

### 2. Compression
- ✅ Gzip compression configured
- [ ] Brotli compression (server-side)

### 3. CDN Implementation
```
Recommended CDN providers:
- Cloudflare
- AWS CloudFront
- Vercel Edge Network
```

## Font Optimization

### Current Implementation:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### Recommended Improvements:

```css
/* Self-host fonts for better performance */
@font-face {
  font-family: 'Your Font';
  src: url('/fonts/your-font.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
}

/* Or use font-display: optional for critical fonts */
@font-face {
  font-display: optional;
}
```

## React Performance Optimization

### Memoization

```jsx
// Memoize expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Memoize components
const MemoizedComponent = React.memo(MyComponent);
```

### Virtualization for Long Lists

```jsx
import { FixedSizeList } from 'react-window';

function ProductList({ products }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={products.length}
      itemSize={200}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <ProductCard product={products[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}
```

## Database Query Optimization

### API Response Optimization
- Implement pagination for large datasets
- Use field filtering to reduce payload
- Cache frequently accessed data
- Implement database indexing

## Monitoring Performance

### Tools to Use:

1. **Lighthouse** (built into Chrome DevTools)
   ```bash
   lighthouse https://ashwi-furniture.com --view
   ```

2. **WebPageTest**
   - Comprehensive performance testing
   - Multiple location testing
   - Connection throttling

3. **Google PageSpeed Insights**
   - Real-world performance data
   - Core Web Vitals metrics
   - Optimization suggestions

4. **Chrome DevTools Performance Tab**
   - Record runtime performance
   - Analyze frame rates
   - Identify bottlenecks

### Real User Monitoring (RUM)

```javascript
// Implement Web Vitals reporting
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics endpoint
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## Performance Checklist

### Before Launch:
- [ ] Run Lighthouse audit (score > 90)
- [ ] Test on slow 3G connection
- [ ] Test on low-end mobile devices
- [ ] Verify all images are optimized
- [ ] Check bundle size (< 200KB initial load)
- [ ] Implement critical CSS
- [ ] Configure CDN
- [ ] Set up performance monitoring
- [ ] Test Core Web Vitals in Search Console

### Monthly Monitoring:
- [ ] Review Core Web Vitals data
- [ ] Check bundle size growth
- [ ] Monitor API response times
- [ ] Review error logs
- [ ] Test on new devices/browsers

## Performance Budget

Set and enforce performance budgets:

```javascript
// In your build process
module.exports = {
  budgets: [
    {
      path: '/bundle.js',
      maxSize: '200KB',
    },
    {
      path: '/image/*',
      maxSize: '300KB',
    },
  ],
};
```

## Advanced Optimizations

### 1. HTTP/2 Server Push
```
Preload critical resources using server push
```

### 2. Resource Hints
```html
<link rel="preload" href="/critical.css" as="style" />
<link rel="prefetch" href="/next-page.js" />
<link rel="prerender" href="/next-page" />
```

### 3. Progressive Web App (PWA)
- Implement service worker
- Add offline functionality
- Enable "Add to Home Screen"
- Cache API responses

## Conclusion

Performance is an ongoing process. Regularly monitor, test, and optimize based on real user data and changing requirements.

### Key Metrics to Track:
- Core Web Vitals (LCP, FID, CLS)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)
- Speed Index
- Bundle Size

### Resources:
- [Web.dev Performance](https://web.dev/performance/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit#optimizing-performance)
- [Core Web Vitals](https://web.dev/vitals/)
