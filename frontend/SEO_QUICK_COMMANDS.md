# SEO Quick Commands & Testing

## 🚀 Build & Deploy

```bash
# Build for production
npm run build

# Run locally to test
npm start

# Serve production build
npm install -g serve
serve -s build
```

## 🧪 Testing SEO Implementation

### 1. Lighthouse Audit
```bash
# Using Chrome DevTools:
# 1. Open Chrome DevTools (F12)
# 2. Go to "Lighthouse" tab
# 3. Select categories (Performance, SEO, Accessibility)
# 4. Click "Generate report"

# Or use CLI:
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

### 2. Validate Structured Data
```bash
# Visit Google's Rich Results Test:
# https://search.google.com/test/rich-results

# Or Schema.org Validator:
# https://validator.schema.org/

# Test specific pages:
# - Homepage
# - Product page
# - Category page
```

### 3. Mobile-Friendly Test
```bash
# Visit Google's Mobile-Friendly Test:
# https://search.google.com/test/mobile-friendly

# Test your deployed site URL
```

### 4. PageSpeed Insights
```bash
# Visit PageSpeed Insights:
# https://pagespeed.web.dev/

# Enter your site URL and click "Analyze"
```

## 📊 Checking Meta Tags

### View Page Meta Tags
```javascript
// In browser console on any page:
console.log(document.title);
console.log(document.querySelector('meta[name="description"]')?.content);
console.log(document.querySelector('meta[property="og:title"]')?.content);
```

### View Structured Data
```javascript
// In browser console:
const scripts = document.querySelectorAll('script[type="application/ld+json"]');
scripts.forEach((script, i) => {
  console.log(`Schema ${i + 1}:`, JSON.parse(script.textContent));
});
```

## 🔍 Search Console Commands

### Submit Sitemap
```bash
# 1. Go to Google Search Console
# 2. Navigate to "Sitemaps" in the sidebar
# 3. Enter: sitemap.xml
# 4. Click "Submit"
```

### Request Indexing
```bash
# 1. Go to Google Search Console
# 2. Use the URL Inspection tool (top bar)
# 3. Enter the URL
# 4. Click "Request Indexing"
```

## 📈 Analytics Setup

### Google Analytics 4
```bash
# 1. Go to analytics.google.com
# 2. Create a property
# 3. Get Measurement ID (G-XXXXXXXXXX)
# 4. Add to index.html or use react-ga4
```

### Google Tag Manager
```bash
# 1. Go to tagmanager.google.com
# 2. Create container
# 3. Get GTM-XXXXXX code
# 4. Add to index.html
```

## 🛠 SEO Tools Commands

### Install SEO Tools Globally
```bash
# Lighthouse
npm install -g lighthouse

# Sitemap generator (for future dynamic sitemap)
npm install -g sitemap-generator-cli

# Link checker
npm install -g broken-link-checker
```

### Run Tools
```bash
# Lighthouse audit
lighthouse http://localhost:3000 --output html --output-path report.html

# Check for broken links
blc http://localhost:3000 -ro

# Generate sitemap (for production)
# sitemap-generator https://ashwi-furniture.com --file public/sitemap.xml
```

## 📝 Content Testing

### Check Title Length
```javascript
// In browser console:
const title = document.title;
console.log(`Title: "${title}" (${title.length} characters)`);
console.log(title.length <= 60 ? '✅ Good length' : '❌ Too long');
```

### Check Description Length
```javascript
// In browser console:
const desc = document.querySelector('meta[name="description"]')?.content;
console.log(`Description: "${desc}" (${desc?.length} characters)`);
console.log(desc?.length >= 150 && desc?.length <= 160 ? '✅ Good length' : '⚠️ Check length');
```

## 🖼 Image Optimization

### Check Image Sizes
```bash
# Install imagemin-cli
npm install -g imagemin-cli

# Optimize images
imagemin public/images/* --out-dir=public/images/optimized

# Convert to WebP
npm install -g webp-converter-cli
webp public/images/*.jpg public/images/*.png
```

### Check Image Alt Tags
```javascript
// In browser console:
const images = document.querySelectorAll('img');
const missingAlt = Array.from(images).filter(img => !img.alt);
console.log(`Images without alt: ${missingAlt.length}/${images.length}`);
missingAlt.forEach(img => console.log(img.src));
```

## 🔐 Security Headers Check

### Test Headers
```bash
# Using curl
curl -I https://ashwi-furniture.com

# Check specific headers
curl -I https://ashwi-furniture.com | grep -i "x-frame-options\|x-content-type-options\|x-xss-protection"
```

## 📱 Mobile Testing

### Test Responsive Design
```bash
# Using Chrome DevTools Device Mode:
# 1. Open DevTools (F12)
# 2. Click device icon (Ctrl+Shift+M)
# 3. Test different device sizes
```

### Core Web Vitals
```javascript
// Install web-vitals
npm install web-vitals

// In your app (already in reportWebVitals.ts):
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## �� Schema Validation

### Validate All Schemas
```bash
# Visit each page and use browser console:
const schemas = document.querySelectorAll('script[type="application/ld+json"]');
schemas.forEach((schema, i) => {
  const data = JSON.parse(schema.textContent);
  console.log(`Schema ${i + 1} (${data['@type']}):`, data);
});
```

## 📊 Quick SEO Checklist Commands

### Run Full Check
```bash
# Create a quick check script:
cat > check-seo.sh << 'SCRIPT'
#!/bin/bash
echo "🔍 Running SEO Checks..."
echo ""
echo "1. Build check..."
npm run build
echo ""
echo "2. Check sitemap..."
curl -s http://localhost:3000/sitemap.xml | head -20
echo ""
echo "3. Check robots.txt..."
curl -s http://localhost:3000/robots.txt
echo ""
echo "✅ Manual checks needed:"
echo "   - Run Lighthouse audit"
echo "   - Validate structured data"
echo "   - Test mobile-friendliness"
SCRIPT

chmod +x check-seo.sh
./check-seo.sh
```

## 🔄 Regular Maintenance Commands

### Weekly Checks
```bash
# Check for broken links
blc http://localhost:3000 -ro

# Run Lighthouse
lighthouse http://localhost:3000 --view

# Check build size
npm run build && du -sh build/
```

### Monthly Audits
```bash
# Full Lighthouse audit
lighthouse http://localhost:3000 --output html --output-path lighthouse-report.html

# Check all pages
# (manually or create script to test all routes)
```

## 📚 Resources & Documentation Links

```bash
# Google Search Console
open https://search.google.com/search-console

# PageSpeed Insights
open https://pagespeed.web.dev/

# Schema Validator
open https://validator.schema.org/

# Mobile-Friendly Test
open https://search.google.com/test/mobile-friendly

# Rich Results Test
open https://search.google.com/test/rich-results
```

## 💡 Pro Tips

### Quick Browser Console Checks
```javascript
// Check all meta tags
Array.from(document.querySelectorAll('meta')).forEach(tag => {
  console.log(tag.getAttribute('name') || tag.getAttribute('property'), 
              ':', tag.getAttribute('content'));
});

// Check all links
console.log('Internal links:', 
  Array.from(document.querySelectorAll('a[href^="/"]')).length);
console.log('External links:', 
  Array.from(document.querySelectorAll('a[href^="http"]')).length);

// Check heading hierarchy
['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
  const count = document.querySelectorAll(tag).length;
  if (count > 0) console.log(`${tag}: ${count}`);
});
```

## 🎯 One-Liner Quick Checks

```bash
# Check if sitemap exists
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/sitemap.xml

# Check if robots.txt exists
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/robots.txt

# Check build size
npm run build 2>&1 | grep "File sizes"

# Count TypeScript files
find src -name "*.tsx" -o -name "*.ts" | wc -l

# Check for console.logs (should remove before production)
grep -r "console.log" src/ | wc -l
```

---

**Keep this file handy for quick SEO testing and maintenance!** 🚀
