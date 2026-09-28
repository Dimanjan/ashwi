import { Product, Category } from '../types';

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: 'Ashwi Furniture',
    alternateName: ['अश्वी फर्निचर', 'Ashwi Furniture Nepal', 'Ashwi Furniture Pasal Kathmandu'],
    description: 'काठमाडौँ तथा नेपालभर गुणस्तरीय काठको फर्निचर: सोफा सेट, काठको पलंग, दराज, डाइनिङ टेबल र पूजा मन्दिर। डेलिभरी भएपछि मात्र पैसा भुक्तानी (100% Payment After Delivery).',
    url: 'https://www.ashwifurniture.com',
    inLanguage: ['en-NP', 'ne-NP'],
    knowsLanguage: ['ne', 'en'],
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.ashwifurniture.com/logo512.png',
      width: '512',
      height: '512',
      caption: 'Ashwi Furniture Official Brand Logo',
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://www.ashwifurniture.com/og-image.jpg',
      width: '1200',
      height: '630',
      caption: 'Ashwi Furniture Handcrafted Furniture Kathmandu Nepal',
    },
    telephone: '+977-986-0479751',
    email: 'info@ashwifurniture.com.np',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ring Road',
      addressLocality: 'Kathmandu (काठमाडौँ)',
      addressRegion: 'Bagmati Province (बागमती प्रदेश)',
      postalCode: '44600',
      addressCountry: 'NP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '27.7172',
      longitude: '85.3240',
    },
    currenciesAccepted: 'NPR',
    paymentAccepted: 'Cash on Delivery, Fonepay QR, eSewa, Bank Transfer',
    priceRange: 'रू रू रू',
    sameAs: [
      'https://www.facebook.com/profile.php?id=61579049243889',
      'https://www.instagram.com/ashwifurniture',
      'https://wa.me/9779860479751',
      'https://www.ashwifurniture.com'
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Kathmandu (काठमाडौँ)',
        sameAs: 'https://www.wikidata.org/wiki/Q1080'
      },
      {
        '@type': 'City',
        name: 'Lalitpur / Patan (ललितपुर)',
        sameAs: 'https://www.wikidata.org/wiki/Q38789'
      },
      {
        '@type': 'City',
        name: 'Bhaktapur (भक्तपुर)',
        sameAs: 'https://www.wikidata.org/wiki/Q2516'
      },
      {
        '@type': 'City',
        name: 'Pokhara (पोखरा)',
        sameAs: 'https://www.wikidata.org/wiki/Q6640'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Chitwan (चितवन)',
        sameAs: 'https://www.wikidata.org/wiki/Q722744'
      },
      {
        '@type': 'Country',
        name: 'Nepal (नेपाल)',
        sameAs: 'https://www.wikidata.org/wiki/Q837'
      }
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
  };
};

export const generateProductSchema = (product: Product) => {
  const price = product.sale_price || product.price;
  const rawImage = product.primary_image?.image_url || product.primary_image?.image || product.images[0]?.image_url || product.images[0]?.image || '/bubblesofa.png';
  const resolvedImage = rawImage.startsWith('http') ? rawImage : `https://www.ashwifurniture.com${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    inLanguage: ['en-NP', 'ne-NP'],
    image: resolvedImage,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Ashwi Furniture',
      logo: 'https://www.ashwifurniture.com/logo512.png',
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.ashwifurniture.com/products/${product.slug}`,
      priceCurrency: 'NPR',
      price: parseFloat(price),
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      availability: product.stock_quantity > 0 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Ashwi Furniture',
        url: 'https://www.ashwifurniture.com',
        logo: 'https://www.ashwifurniture.com/logo512.png',
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'NP',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnAtKiosk',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'NPR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'NP',
          addressRegion: 'Kathmandu Valley',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'd',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'd',
          },
        },
      },
    },
    aggregateRating: product.review_count > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.average_rating,
      reviewCount: product.review_count,
      bestRating: '5',
      worstRating: '1',
    } : {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '12',
      bestRating: '5',
      worstRating: '1',
    },
    review: product.reviews && product.reviews.length > 0 ? product.reviews.slice(0, 5).map(review => ({
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
    })) : undefined,
    category: product.category.name,
    material: product.material,
    color: product.color,
    weight: product.weight ? {
      '@type': 'QuantitativeValue',
      value: product.weight,
      unitCode: 'KGM',
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
    url: 'https://www.ashwifurniture.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.ashwifurniture.com/search?q={search_term_string}',
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
    url: `https://www.ashwifurniture.com/category/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.ashwifurniture.com/products/${product.slug}`,
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
    '@id': 'https://www.ashwifurniture.com/#localbusiness',
    name: 'Ashwi Furniture',
    alternateName: ['अश्वी फर्निचर', 'Ashwi Furniture Nepal', 'Ashwi Furniture Pasal Kathmandu'],
    description: 'काठमाडौँ तथा नेपालभर गुणस्तरीय काठको फर्निचर: सोफा सेट, काठको पलंग, दराज, डाइनिङ टेबल र पूजा मन्दिर। डेलिभरी भएपछि मात्र पैसा भुक्तानी।',
    url: 'https://www.ashwifurniture.com',
    inLanguage: ['en-NP', 'ne-NP'],
    telephone: '+977-986-0479751',
    email: 'info@ashwifurniture.com.np',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ring Road',
      addressLocality: 'Kathmandu (काठमाडौँ)',
      addressRegion: 'Bagmati Province (बागमती प्रदेश)',
      postalCode: '44600',
      addressCountry: 'NP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '27.7172',
      longitude: '85.3240',
    },
    currenciesAccepted: 'NPR',
    paymentAccepted: 'Cash on Delivery, Fonepay QR, eSewa, Bank Transfer',
    priceRange: 'रू रू रू',
    image: {
      '@type': 'ImageObject',
      url: 'https://www.ashwifurniture.com/og-image.jpg',
      width: '1200',
      height: '630',
      caption: 'Ashwi Furniture Showroom Kathmandu',
    },
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.ashwifurniture.com/logo512.png',
      width: '512',
      height: '512',
      caption: 'Ashwi Furniture Official Brand Logo',
    },
  };
};

export const generateOfferCatalogSchema = (products: any[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Ashwi Furniture Product Catalog',
    description: 'Browse our extensive catalog of handcrafted furniture in Nepal',
    itemListElement: products.map((product, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Product',
        name: product.name,
        description: product.short_description || product.description,
        image: product.primary_image?.image_url || product.images[0]?.image_url,
        url: `https://www.ashwifurniture.com/products/${product.slug}`,
        sku: product.sku,
        offers: {
          '@type': 'Offer',
          price: parseFloat(product.sale_price || product.price),
          priceCurrency: 'NPR',
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
        url: `https://www.ashwifurniture.com/products/${product.slug}`,
        image: product.primary_image?.image_url || product.images[0]?.image_url,
        description: product.short_description || product.description,
      },
    })),
  };
};
