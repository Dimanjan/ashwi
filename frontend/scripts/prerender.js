#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const buildDir = path.join(rootDir, 'build');
const indexHtmlPath = path.join(buildDir, 'index.html');
const catalogPath = path.join(rootDir, 'public', 'catalog.json');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ build/index.html not found! Please run react-scripts build first.');
  process.exit(1);
}

const template = fs.readFileSync(indexHtmlPath, 'utf8');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const products = catalog.products;

console.log(`🚀 Starting static pre-rendering for ${products.length} products and categories...`);

// Helper to replace meta tag content safely
function replaceMeta(html, propertyOrName, value, attr = 'property') {
  const regex = new RegExp(`(<meta\\s+${attr}=["']${propertyOrName}["']\\s+content=["'])[^"']*(["'])`, 'i');
  if (regex.test(html)) {
    return html.replace(regex, `$1${value}$2`);
  }
  return html.replace('</head>', `  <meta ${attr}="${propertyOrName}" content="${value}" />\n</head>`);
}

function replaceTitle(html, title) {
  return html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
             .replace(/(<meta\s+name=["']title["']\s+content=["'])[^"']*(["'])/i, `$1${title}$2`);
}

function replaceCanonical(html, url) {
  const regex = /(<link\s+rel=["']canonical["']\s+href=["'])[^"']*(["'])/i;
  if (regex.test(html)) {
    return html.replace(regex, `$1${url}$2`);
  }
  return html.replace('</head>', `  <link rel="canonical" href="${url}" />\n</head>`);
}

function injectSchema(html, schemaObj) {
  const scriptTag = `  <script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n  </script>\n</head>`;
  return html.replace('</head>', scriptTag);
}

function replaceRoot(html, innerContent) {
  return html.replace(/<div id="root">[\s\S]*?<\/div>\s*<\/body>/i, `<div id="root">\n${innerContent}\n    </div>\n  </body>`);
}

// 1. Pre-render Products
let renderedProducts = 0;
for (const p of products) {
  const targetDir = path.join(buildDir, 'products', p.slug);
  fs.mkdirSync(targetDir, { recursive: true });

  const url = `https://www.ashwifurniture.com/products/${p.slug}`;
  const title = `${p.name} - ${p.category} | Ashwi Furniture Kathmandu Nepal`;
  const desc = `${p.name} in Kathmandu, Nepal. Handcrafted with ${p.material} finish in ${p.color}. Price: Rs. ${(p.sale_price_npr || p.price_npr).toLocaleString()} NPR. 100% Payment After Delivery across Kathmandu Valley. Direct Call/WhatsApp: 9860479751.`;
  const imgUrl = p.image_url || 'https://www.ashwifurniture.com/og-image.jpg';

  let html = template;
  html = replaceTitle(html, title);
  html = replaceMeta(html, 'description', desc, 'name');
  html = replaceMeta(html, 'keywords', `${p.name}, ${p.category}, kaath ko palang, sofa set nepal, daraj nepal, furniture kathmandu, pay after delivery, 9860479751`, 'name');
  html = replaceCanonical(html, url);

  // Open Graph
  html = replaceMeta(html, 'og:title', title);
  html = replaceMeta(html, 'og:description', desc);
  html = replaceMeta(html, 'og:url', url);
  html = replaceMeta(html, 'og:image', imgUrl);
  html = replaceMeta(html, 'og:image:secure_url', imgUrl);
  html = replaceMeta(html, 'og:type', 'product');

  // Twitter
  html = replaceMeta(html, 'twitter:title', title, 'name');
  html = replaceMeta(html, 'twitter:description', desc, 'name');
  html = replaceMeta(html, 'twitter:image', imgUrl, 'name');

  // Product Schema JSON-LD
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: desc,
    image: imgUrl,
    sku: p.sku,
    brand: {
      '@type': 'Brand',
      name: 'Ashwi Furniture',
      logo: 'https://www.ashwifurniture.com/logo512.png'
    },
    offers: {
      '@type': 'Offer',
      url: url,
      priceCurrency: 'NPR',
      price: p.sale_price_npr || p.price_npr,
      availability: p.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Ashwi Furniture',
        url: 'https://www.ashwifurniture.com'
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'NP',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnAtKiosk',
        returnFees: 'https://schema.org/FreeReturn'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'NPR'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'NP',
          addressRegion: 'Kathmandu Valley'
        }
      }
    }
  };
  html = injectSchema(html, schema);

  // Pre-rendered Semantic DOM for zero-JS bots and fast rendering
  const rootContent = `
      <header style="padding: 16px 24px; border-bottom: 1px solid #e2e8f0; font-family: system-ui, sans-serif;">
        <nav>
          <a href="/" style="font-weight: bold; color: #1e293b; text-decoration: none;">Ashwi Furniture</a> &gt; 
          <a href="/category/${p.category.toLowerCase().replace(/\\s+/g, '-')}" style="color: #7c3aed; text-decoration: none;">${p.category}</a> &gt; 
          <span style="color: #64748b;">${p.name}</span>
        </nav>
      </header>
      <main style="max-width: 1000px; margin: 0 auto; padding: 24px; font-family: system-ui, sans-serif; line-height: 1.6;">
        <div style="display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-start;">
          <div style="flex: 1 1 400px; text-align: center;">
            <img src="${imgUrl}" alt="${p.name} - Handcrafted Furniture in Kathmandu Nepal" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
          </div>
          <div style="flex: 1 1 450px;">
            <span style="background: #f3e8ff; color: #7c3aed; font-size: 0.8rem; font-weight: bold; padding: 4px 10px; rounded-full: 9999px; text-transform: uppercase;">${p.category}</span>
            <h1 style="font-size: 2rem; margin: 12px 0 8px; color: #0f172a;">${p.name}</h1>
            <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 16px;">SKU: ${p.sku} | Color: ${p.color} | Finish: ${p.finish}</p>
            <div style="margin-bottom: 20px;">
              <span style="font-size: 2rem; font-weight: 800; color: #7c3aed;">Rs. ${(p.sale_price_npr || p.price_npr).toLocaleString()}</span>
              ${p.sale_price_npr ? `<span style="font-size: 1.2rem; color: #94a3b8; text-decoration: line-through; margin-left: 12px;">Rs. ${p.price_npr.toLocaleString()}</span>` : ''}
              <span style="display: block; font-size: 0.85rem; color: #16a34a; font-weight: 600; margin-top: 4px;">✓ In Stock - Pay Only After Home Delivery</span>
            </div>
            <p style="color: #334155; font-size: 1.05rem; margin-bottom: 24px;">
              Premium handcrafted ${p.category.toLowerCase()} furniture for homes in Kathmandu, Lalitpur, and Bhaktapur.
            </p>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <h3 style="margin-top: 0; font-size: 1rem; color: #1e293b;">Key Highlights & Dimensions:</h3>
              <ul style="padding-left: 20px; margin-bottom: 0; color: #475569; font-size: 0.95rem;">
                ${(p.features || []).map(f => `<li>${f}</li>`).join('\n                ')}
                ${p.dimensions ? `<li>Dimensions: ${p.dimensions.length_inches || ''} x ${p.dimensions.width_inches || ''} x ${p.dimensions.height_inches || ''} inches</li>` : ''}
              </ul>
            </div>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <a href="tel:+9779860479751" style="background: #7c3aed; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">📞 Call: 9860479751</a>
              <a href="https://wa.me/9779860479751?text=Hi%20Ashwi%20Furniture,%20I%20am%20interested%20in%20${encodeURIComponent(p.name)}" style="background: #16a34a; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">WhatsApp Order</a>
            </div>
          </div>
        </div>
      </main>
  `;

  html = replaceRoot(html, rootContent);
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  fs.writeFileSync(path.join(buildDir, 'products', `${p.slug}.html`), html, 'utf8');
  renderedProducts++;
}

console.log(`✅ Pre-rendered ${renderedProducts} individual product pages.`);

// 2. Pre-render Categories
const categories = [
  { slug: 'living-room', name: 'Living Room', desc: 'Luxury curved bubble sofas, Chesterfields, armchairs, and solid wood coffee tables in Kathmandu.' },
  { slug: 'bedroom', name: 'Bedroom', desc: 'Solid wood king & queen beds, hydraulic storage beds, sliding wardrobes (daraz), and vanity dressing tables in Nepal.' },
  { slug: 'dining-room', name: 'Dining Room', desc: 'Solid Sheesham hardwood dining tables and cushioned chair sets in Kathmandu, Nepal.' },
  { slug: 'mandir', name: 'Mandir & Pooja Units', desc: 'Handcrafted wooden home mandirs and sacred puja temples in Kathmandu, Nepal.' },
  { slug: 'office', name: 'Office', desc: 'Ergonomic study desks, executive workstations, and wooden office furniture in Nepal.' },
  { slug: 'outdoor', name: 'Outdoor', desc: 'All-weather wicker patio lounge sets and garden furniture in Nepal.' }
];

let renderedCategories = 0;
for (const cat of categories) {
  const targetDir = path.join(buildDir, 'category', cat.slug);
  fs.mkdirSync(targetDir, { recursive: true });

  const url = `https://www.ashwifurniture.com/category/${cat.slug}`;
  const title = `${cat.name} Furniture in Kathmandu Nepal | Ashwi Furniture - Pay After Delivery`;
  const catProducts = products.filter(p => p.category.toLowerCase().replace(/\\s+/g, '-') === cat.slug);

  let html = template;
  html = replaceTitle(html, title);
  html = replaceMeta(html, 'description', cat.desc, 'name');
  html = replaceCanonical(html, url);
  html = replaceMeta(html, 'og:title', title);
  html = replaceMeta(html, 'og:description', cat.desc);
  html = replaceMeta(html, 'og:url', url);

  const rootContent = `
      <header style="padding: 16px 24px; border-bottom: 1px solid #e2e8f0; font-family: system-ui, sans-serif;">
        <nav>
          <a href="/" style="font-weight: bold; color: #1e293b; text-decoration: none;">Ashwi Furniture</a> &gt; 
          <span style="color: #64748b;">${cat.name}</span>
        </nav>
      </header>
      <main style="max-width: 1100px; margin: 0 auto; padding: 24px; font-family: system-ui, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.2rem; color: #0f172a; margin-top: 0;">${cat.name} Furniture in Kathmandu, Nepal</h1>
        <p style="font-size: 1.1rem; color: #475569; margin-bottom: 32px;">${cat.desc} 100% Payment After Delivery across Kathmandu Valley.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
          ${catProducts.map(p => `
            <article style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; background: #ffffff;">
              <img src="${p.image_url}" alt="${p.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;" />
              <h2 style="font-size: 1.15rem; margin: 12px 0 6px;"><a href="/products/${p.slug}" style="color: #0f172a; text-decoration: none;">${p.name}</a></h2>
              <p style="font-size: 1.25rem; font-weight: 800; color: #7c3aed; margin: 0 0 12px;">Rs. ${(p.sale_price_npr || p.price_npr).toLocaleString()} NPR</p>
              <a href="/products/${p.slug}" style="display: inline-block; background: #f3e8ff; color: #7c3aed; font-weight: 600; padding: 8px 16px; border-radius: 6px; text-decoration: none;">View Details</a>
            </article>
          `).join('')}
        </div>
      </main>
  `;

  html = replaceRoot(html, rootContent);
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  fs.writeFileSync(path.join(buildDir, 'category', `${cat.slug}.html`), html, 'utf8');
  renderedCategories++;
}

console.log(`✅ Pre-rendered ${renderedCategories} category landing pages.`);
console.log('🎉 Static pre-rendering successfully completed!');
