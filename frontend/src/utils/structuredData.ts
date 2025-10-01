import { Product, Category } from '../types';

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: 'Ashwi Furniture',
    description: 'Premium quality furniture for your home - living room, bedroom, dining room, office & outdoor furniture',
    url: 'https://ashwi-furniture.com',
    logo: 'https://ashwi-furniture.com/logo.png',
    image: 'https://ashwi-furniture.com/images/store-front.jpg',
    telephone: '+1-555-FURNITURE',
    email: 'info@ashwi-furniture.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Furniture Street',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US',
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '10:00',
        closes: '17:00',
      },
    ],
  };
};

export const generateProductSchema = (product: Product) => {
  const price = product.sale_price || product.price;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.primary_image?.image_url || product.images[0]?.image_url,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Ashwi Furniture',
    },
    offers: {
      '@type': 'Offer',
      url: `https://ashwi-furniture.com/products/${product.slug}`,
      priceCurrency: 'USD',
      price: parseFloat(price),
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      availability: product.stock_quantity > 0 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Ashwi Furniture',
      },
    },
    aggregateRating: product.review_count > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.average_rating,
      reviewCount: product.review_count,
      bestRating: '5',
      worstRating: '1',
    } : undefined,
    review: product.reviews?.slice(0, 5).map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.customer_name,
      },
      datePublished: review.created_at,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.comment,
      name: review.title,
    })),
    category: product.category.name,
    material: product.material,
    color: product.color,
    weight: product.weight ? {
      '@type': 'QuantitativeValue',
      value: product.weight,
      unitCode: 'LBR',
    } : undefined,
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const generateWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ashwi Furniture',
    url: 'https://ashwi-furniture.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ashwi-furniture.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

export const generateCollectionSchema = (category: Category, products: Product[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} Furniture`,
    description: category.description,
    url: `https://ashwi-furniture.com/category/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://ashwi-furniture.com/products/${product.slug}`,
      })),
    },
  };
};

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://ashwi-furniture.com/#localbusiness',
    name: 'Ashwi Furniture',
    description: 'Premium quality furniture store offering living room, bedroom, dining room, office & outdoor furniture',
    url: 'https://ashwi-furniture.com',
    telephone: '+1-555-FURNITURE',
    email: 'info@ashwi-furniture.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Furniture Street',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.7128',
      longitude: '-74.0060',
    },
    priceRange: '$$',
    image: 'https://ashwi-furniture.com/images/store-front.jpg',
    logo: 'https://ashwi-furniture.com/logo.png',
  };
};

export const generateOfferCatalogSchema = (products: any[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Ashwi Furniture Product Catalog',
    description: 'Browse our extensive catalog of premium furniture for every room in your home',
    itemListElement: products.map((product, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Product',
        name: product.name,
        description: product.short_description || product.description,
        image: product.primary_image?.image_url || product.images[0]?.image_url,
        url: `https://ashwi-furniture.com/products/${product.slug}`,
        sku: product.sku,
        offers: {
          '@type': 'Offer',
          price: parseFloat(product.sale_price || product.price),
          priceCurrency: 'USD',
          availability: product.stock_quantity > 0 
            ? 'https://schema.org/InStock' 
            : 'https://schema.org/OutOfStock',
        },
      },
    })),
  };
};

export const generateItemListSchema = (products: any[], listName: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        url: `https://ashwi-furniture.com/products/${product.slug}`,
        image: product.primary_image?.image_url || product.images[0]?.image_url,
        description: product.short_description || product.description,
      },
    })),
  };
};
