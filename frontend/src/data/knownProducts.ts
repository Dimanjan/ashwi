import { Product } from '../types';
import { KNOWN_CATEGORIES, KNOWN_SUBCATEGORIES } from './knownCategories';

export const KNOWN_PRODUCTS: Product[] = [
  // 1. Bubble Sofa
  {
    id: 1,
    name: 'Luxury Bubble Curved Sofa',
    slug: 'luxury-bubble-curved-sofa',
    sku: 'ASHWI-BUBBLE-01',
    category: KNOWN_CATEGORIES[0],
    subcategory: KNOWN_SUBCATEGORIES[0],
    category_id: 1,
    subcategory_id: 101,
    short_description: 'Contemporary sculptural bubble curved sofa with premium high-density boucle fabric.',
    description: 'The Luxury Bubble Curved Sofa is an iconic modern centerpiece designed for supreme comfort and aesthetic beauty. Upholstered in premium textured boucle fabric, its rounded silhouette cradles you in relaxation. Built on an engineered hardwood inner frame with high-resilience memory foam cushioning.',
    price: '95000',
    sale_price: '82000',
    cost_price: null,
    stock_quantity: 8,
    low_stock_threshold: 2,
    material: 'fabric',
    finish: 'matte',
    dimensions_length: 230,
    dimensions_width: 95,
    dimensions_height: 78,
    weight: 52,
    color: 'Cream White',
    features: [
      'Sculptural curved organic design',
      'High-resilience foam core with pocket spring support',
      'Stain-resistant luxury boucle fabric',
      'Solid kiln-dried hardwood internal frame',
      'Pay only after delivery anywhere in Kathmandu Valley'
    ],
    specifications: {
      'Frame Material': 'Solid Sal Wood & Plywood',
      'Upholstery': 'Premium Textured Boucle',
      'Seating Capacity': '3-4 Persons',
      'Warranty': '5 Years Frame Warranty'
    },
    is_active: true,
    is_featured: true,
    is_bestseller: true,
    meta_title: 'Luxury Bubble Curved Sofa | Ashwi Furniture Kathmandu',
    meta_description: 'Buy Luxury Bubble Curved Sofa in Nepal. Handcrafted with plush boucle fabric, high-density foam & solid frame. Cash on delivery across Kathmandu.',
    images: [
      {
        id: 1001,
        image: '/bubblesofa.png',
        image_url: '/bubblesofa.png',
        alt_text: 'Luxury Bubble Curved Sofa in modern living room',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1001,
      image: '/bubblesofa.png',
      image_url: '/bubblesofa.png',
      alt_text: 'Luxury Bubble Curved Sofa in modern living room',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [
      {
        id: 1,
        customer_name: 'Suman Shrestha',
        email: 'suman@example.com',
        rating: 5,
        title: 'Outstanding quality and comfort',
        comment: 'The finishing is superb. Delivered promptly in Lalitpur and paid after checking everything. Highly recommended!',
        is_approved: true,
        created_at: '2024-06-15T10:00:00Z'
      }
    ],
    average_rating: 5.0,
    review_count: 1,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2025-01-10T00:00:00Z'
  },

  // 2. Tufted Chesterfield Sofa
  {
    id: 2,
    name: 'Royal Tufted Chesterfield Sofa',
    slug: 'royal-tufted-chesterfield-sofa',
    sku: 'ASHWI-TUFT-02',
    category: KNOWN_CATEGORIES[0],
    subcategory: KNOWN_SUBCATEGORIES[0],
    category_id: 1,
    subcategory_id: 101,
    short_description: 'Deep button-tufted classic Chesterfield sofa with hand-rolled arms and velvet finish.',
    description: 'A timeless masterwork of classical furniture design. Deep hand-buttoned diamond tufting across the backrest and rolled armrests gives this sofa an aristocratic elegance. Fitted with durable high-density foam cushions and solid wooden turned feet.',
    price: '88000',
    sale_price: '76000',
    cost_price: null,
    stock_quantity: 6,
    low_stock_threshold: 2,
    material: 'fabric',
    finish: 'polished',
    dimensions_length: 220,
    dimensions_width: 90,
    dimensions_height: 80,
    weight: 58,
    color: 'Deep Teal / Gray',
    features: [
      'Hand-crafted deep diamond tufting',
      'Solid turned wood legs with brass castor accents',
      'Ultra-soft heavy duty velvet fabric',
      'High-grade pocket spring seating suspension'
    ],
    specifications: {
      'Frame': 'Seasoned Teak & Sal Wood',
      'Fabric': 'High GSM Velvet',
      'Tufting': 'Traditional Hand-Tucked'
    },
    is_active: true,
    is_featured: true,
    is_bestseller: false,
    meta_title: 'Royal Tufted Chesterfield Sofa | Ashwi Furniture Nepal',
    meta_description: 'Order handcrafted Royal Tufted Chesterfield Sofa in Nepal. Elegant button tufting, velvet finish & 5-year frame warranty. Pay after delivery.',
    images: [
      {
        id: 1002,
        image: '/tuftedsofa.png',
        image_url: '/tuftedsofa.png',
        alt_text: 'Royal Tufted Chesterfield Sofa',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1002,
      image: '/tuftedsofa.png',
      image_url: '/tuftedsofa.png',
      alt_text: 'Royal Tufted Chesterfield Sofa',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [
      {
        id: 2,
        customer_name: 'Pooja Thapa',
        email: 'pooja@example.com',
        rating: 5,
        title: 'Looks even better than the pictures',
        comment: 'Very royal feel and extremely comfortable. Fits perfectly in our living room in Baneshwor.',
        is_approved: true,
        created_at: '2024-07-20T12:00:00Z'
      }
    ],
    average_rating: 5.0,
    review_count: 1,
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2025-01-12T00:00:00Z'
  },

  // 3. Cloud Sofa
  {
    id: 3,
    name: 'Cloud Modular Sectional Sofa',
    slug: 'cloud-modular-sectional-sofa',
    sku: 'ASHWI-CLOUD-03',
    category: KNOWN_CATEGORIES[0],
    subcategory: KNOWN_SUBCATEGORIES[0],
    category_id: 1,
    subcategory_id: 101,
    short_description: 'Ultra-deep plush cloud sofa designed with feather-touch cushioning and modular flexibility.',
    description: 'Engineered for the ultimate sink-in lounging experience. The Cloud Sofa features oversized proportions, relaxed tailoring, and down-blend layered cushioning that feels like floating. Removable, machine-washable slipcovers for easy maintenance.',
    price: '115000',
    sale_price: '98000',
    cost_price: null,
    stock_quantity: 5,
    low_stock_threshold: 2,
    material: 'fabric',
    finish: 'matte',
    dimensions_length: 260,
    dimensions_width: 105,
    dimensions_height: 82,
    weight: 65,
    color: 'Pure White / Oatmeal',
    features: [
      'Sink-in softness with multi-layer high resilience foam',
      'Removable washable slipcovers',
      'Extra-wide 105cm deep lounge seating',
      'Corner-blocked reinforced hardwood frame'
    ],
    specifications: {
      'Seating Feel': 'Plush & Deep Lounge',
      'Cover': 'Heavy Linen Blend'
    },
    is_active: true,
    is_featured: true,
    is_bestseller: true,
    meta_title: 'Cloud Modular Sectional Sofa | Ashwi Furniture',
    meta_description: 'Experience pure cloud comfort with the Cloud Modular Sectional Sofa in Nepal. Oversized, ultra-comfortable, free home delivery in Kathmandu.',
    images: [
      {
        id: 1003,
        image: '/cloudsofa.png',
        image_url: '/cloudsofa.png',
        alt_text: 'Cloud Modular Sectional Sofa in living room',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1003,
      image: '/cloudsofa.png',
      image_url: '/cloudsofa.png',
      alt_text: 'Cloud Modular Sectional Sofa in living room',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.9,
    review_count: 8,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2025-01-15T00:00:00Z'
  },

  // 4. Cocoon Cozy Sofa
  {
    id: 4,
    name: 'Cocoon Ergonomic Curved Sofa',
    slug: 'cocoon-ergonomic-curved-sofa',
    sku: 'ASHWI-COCOON-04',
    category: KNOWN_CATEGORIES[0],
    subcategory: KNOWN_SUBCATEGORIES[0],
    category_id: 1,
    subcategory_id: 101,
    short_description: 'Organic wrapped embrace design with integrated lumbar contour and designer upholstery.',
    description: 'Wrap yourself in comfort with the Cocoon Curved Sofa. Designed with continuous smooth curves that cradle the body, this statement piece adds architectural drama and inviting warmth to any interior setting.',
    price: '85000',
    sale_price: '74000',
    cost_price: null,
    stock_quantity: 7,
    low_stock_threshold: 2,
    material: 'fabric',
    finish: 'matte',
    dimensions_length: 215,
    dimensions_width: 88,
    dimensions_height: 76,
    weight: 48,
    color: 'Sand Beige',
    features: [
      'Sculpted continuous backrest and arm contour',
      'Ultra-dense orthopedically supportive foam',
      'Textured designer fabric'
    ],
    specifications: {
      'Frame': 'Kiln-Dried Hardwood',
      'Fabric': 'Breathable Microfiber Weave'
    },
    is_active: true,
    is_featured: false,
    is_bestseller: true,
    meta_title: 'Cocoon Ergonomic Curved Sofa | Ashwi Furniture',
    meta_description: 'Buy Cocoon Ergonomic Curved Sofa online at Ashwi Furniture Kathmandu. Pay only after delivery.',
    images: [
      {
        id: 1004,
        image: '/cocoonsofa.png',
        image_url: '/cocoonsofa.png',
        alt_text: 'Cocoon Ergonomic Curved Sofa',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1004,
      image: '/cocoonsofa.png',
      image_url: '/cocoonsofa.png',
      alt_text: 'Cocoon Ergonomic Curved Sofa',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.8,
    review_count: 5,
    created_at: '2024-01-18T00:00:00Z',
    updated_at: '2025-01-18T00:00:00Z'
  },

  // 5. Echo Modern Sofa
  {
    id: 5,
    name: 'Echo Minimalist Low-Profile Sofa',
    slug: 'echo-minimalist-low-profile-sofa',
    sku: 'ASHWI-ECHO-05',
    category: KNOWN_CATEGORIES[0],
    subcategory: KNOWN_SUBCATEGORIES[0],
    category_id: 1,
    subcategory_id: 101,
    short_description: 'Clean Scandinavian-inspired low profile sofa with floating metal or concealed wood legs.',
    description: 'The Echo Sofa embodies modern Japandi minimalism. With crisp clean lines, slim track arms, and perfectly balanced seat density, it creates a serene and spacious feel in any contemporary apartment or home.',
    price: '72000',
    sale_price: '64000',
    cost_price: null,
    stock_quantity: 10,
    low_stock_threshold: 3,
    material: 'fabric',
    finish: 'matte',
    dimensions_length: 205,
    dimensions_width: 85,
    dimensions_height: 72,
    weight: 44,
    color: 'Slate Gray',
    features: [
      'Minimalist low-profile Japandi silhouette',
      'Dual layer high-resilience foam',
      'Compact footprint perfect for modern Kathmandu apartments'
    ],
    specifications: {
      'Style': 'Modern Scandinavian / Japandi',
      'Frame': 'Treated Solid Wood'
    },
    is_active: true,
    is_featured: false,
    is_bestseller: false,
    meta_title: 'Echo Minimalist Low-Profile Sofa | Ashwi Furniture Nepal',
    meta_description: 'Modern Echo low-profile 3-seater sofa for urban apartments in Nepal. Quality finishing and pay-on-delivery guarantee.',
    images: [
      {
        id: 1005,
        image: '/echosofa.png',
        image_url: '/echosofa.png',
        alt_text: 'Echo Minimalist Low-Profile Sofa',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1005,
      image: '/echosofa.png',
      image_url: '/echosofa.png',
      alt_text: 'Echo Minimalist Low-Profile Sofa',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.7,
    review_count: 4,
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2025-01-20T00:00:00Z'
  },

  // 6. Butterfly Accent Lounge Chair
  {
    id: 6,
    name: 'Butterfly Iconic Modern Lounge Chair',
    slug: 'butterfly-iconic-modern-lounge-chair',
    sku: 'ASHWI-BFLY-06',
    category: KNOWN_CATEGORIES[0],
    subcategory: KNOWN_SUBCATEGORIES[1],
    category_id: 1,
    subcategory_id: 102,
    short_description: 'Sculptural butterfly wing armchair with ergonomic wrap-around comfort and premium upholstery.',
    description: 'A striking statement armchair featuring graceful sweeping wing contours that provide neck and arm support while serving as a sculptural work of art in your living room or study. Available in multiple designer colorways.',
    price: '38000',
    sale_price: '32000',
    cost_price: null,
    stock_quantity: 12,
    low_stock_threshold: 3,
    material: 'mixed',
    finish: 'polished',
    dimensions_length: 85,
    dimensions_width: 82,
    dimensions_height: 98,
    weight: 22,
    color: 'Mustard / Emerald / Ivory',
    features: [
      'Ergonomic wing contour for full back support',
      'Reinforced steel & wood hybrid inner frame',
      'Durable stain-resistant designer velvet upholstery'
    ],
    specifications: {
      'Frame': 'Steel-Reinforced Wood Frame',
      'Weight Capacity': '160 kg'
    },
    is_active: true,
    is_featured: true,
    is_bestseller: true,
    meta_title: 'Butterfly Modern Lounge Chair | Ashwi Furniture',
    meta_description: 'Shop Butterfly Iconic Accent Lounge Chair in Nepal. Handcrafted with high finishing and cash after delivery guarantee.',
    images: [
      {
        id: 1006,
        image: '/butterflysofa1.png',
        image_url: '/butterflysofa1.png',
        alt_text: 'Butterfly Iconic Modern Lounge Chair front view',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 1007,
        image: '/butterflysofa2.png',
        image_url: '/butterflysofa2.png',
        alt_text: 'Butterfly Lounge Chair angled perspective',
        is_primary: false,
        order: 2,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 1008,
        image: '/butterflysofa3.png',
        image_url: '/butterflysofa3.png',
        alt_text: 'Butterfly Lounge Chair detail view',
        is_primary: false,
        order: 3,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1006,
      image: '/butterflysofa1.png',
      image_url: '/butterflysofa1.png',
      alt_text: 'Butterfly Iconic Modern Lounge Chair',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [
      {
        id: 3,
        customer_name: 'Anil Karki',
        email: 'anil@example.com',
        rating: 5,
        title: 'Perfect reading chair',
        comment: 'Super comfortable and the fabric feels very rich. Fast delivery to Pokhara.',
        is_approved: true,
        created_at: '2024-08-10T14:30:00Z'
      }
    ],
    average_rating: 5.0,
    review_count: 1,
    created_at: '2024-01-22T00:00:00Z',
    updated_at: '2025-01-22T00:00:00Z'
  },

  // 7. Cuddle Nest Armchair
  {
    id: 7,
    name: 'Cuddle Nest Swivel Armchair',
    slug: 'cuddle-nest-swivel-armchair',
    sku: 'ASHWI-NEST-07',
    category: KNOWN_CATEGORIES[0],
    subcategory: KNOWN_SUBCATEGORIES[1],
    category_id: 1,
    subcategory_id: 102,
    short_description: 'Cozy 360-degree swivel circular cuddle chair with plush surrounding cushion.',
    description: 'Experience full relaxation with the Cuddle Nest Swivel Armchair. The circular tub design wraps around you with dense supportive padding and a 360-degree silent bearing swivel base. Perfect for cozy reading nooks or bedside lounging.',
    price: '42000',
    sale_price: '36000',
    cost_price: null,
    stock_quantity: 9,
    low_stock_threshold: 2,
    material: 'fabric',
    finish: 'matte',
    dimensions_length: 92,
    dimensions_width: 90,
    dimensions_height: 75,
    weight: 28,
    color: 'Warm Oatmeal',
    features: [
      'Smooth 360-degree heavy duty steel swivel mechanism',
      'Wrap-around barrel nest comfort',
      'Premium plush texture fabric'
    ],
    specifications: {
      'Swivel': '360 Heavy Duty Bearing',
      'Base': 'Hidden Non-Scratch Metal Ring'
    },
    is_active: true,
    is_featured: true,
    is_bestseller: false,
    meta_title: 'Cuddle Nest Swivel Armchair | Ashwi Furniture Nepal',
    meta_description: 'Circular swivel cuddle armchair with plush upholstery. Buy online at Ashwi Furniture with payment after delivery.',
    images: [
      {
        id: 1009,
        image: '/cuddlenestarmchair.png',
        image_url: '/cuddlenestarmchair.png',
        alt_text: 'Cuddle Nest Swivel Armchair',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1009,
      image: '/cuddlenestarmchair.png',
      image_url: '/cuddlenestarmchair.png',
      alt_text: 'Cuddle Nest Swivel Armchair',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.8,
    review_count: 6,
    created_at: '2024-01-25T00:00:00Z',
    updated_at: '2025-01-25T00:00:00Z'
  },

  // 8. Pokemon Character Lounge Accent Chair
  {
    id: 8,
    name: 'Pokemon Cozy Lounge Accent Chair',
    slug: 'pokemon-cozy-lounge-accent-chair',
    sku: 'ASHWI-POKE-08',
    category: KNOWN_CATEGORIES[0],
    subcategory: KNOWN_SUBCATEGORIES[1],
    category_id: 1,
    subcategory_id: 102,
    short_description: 'Fun, whimsical and ultra-comfortable accent armchair with delightful character styling.',
    description: 'Bring joyful energy and irresistible comfort to kids rooms, game rooms, or study spaces. Crafted with soft velvet fleece touch fabric and high-density supportive foam that holds its shape through years of use.',
    price: '28000',
    sale_price: '24000',
    cost_price: null,
    stock_quantity: 15,
    low_stock_threshold: 4,
    material: 'fabric',
    finish: 'matte',
    dimensions_length: 75,
    dimensions_width: 75,
    dimensions_height: 70,
    weight: 16,
    color: 'Vibrant Yellow / Multi',
    features: [
      'Playful character design loved by all ages',
      'Child-safe rounded edges with zero sharp hardware',
      'Super-soft hypoallergenic plush upholstery'
    ],
    specifications: {
      'Safety': 'Rounded Corners & Child-Safe Materials',
      'Foam': 'Hypoallergenic Virgin Foam'
    },
    is_active: true,
    is_featured: false,
    is_bestseller: true,
    meta_title: 'Pokemon Cozy Lounge Accent Chair | Ashwi Furniture',
    meta_description: 'Fun and cozy character armchair for kids and teens in Kathmandu. Quality craftsmanship, pay after delivery.',
    images: [
      {
        id: 1010,
        image: '/pokemonarmchair.png',
        image_url: '/pokemonarmchair.png',
        alt_text: 'Pokemon Cozy Lounge Accent Chair',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1010,
      image: '/pokemonarmchair.png',
      image_url: '/pokemonarmchair.png',
      alt_text: 'Pokemon Cozy Lounge Accent Chair',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.9,
    review_count: 11,
    created_at: '2024-01-28T00:00:00Z',
    updated_at: '2025-01-28T00:00:00Z'
  },

  // 9. High Back Wing Chair
  {
    id: 9,
    name: 'Executive High Back Wing Chair',
    slug: 'executive-high-back-wing-chair',
    sku: 'ASHWI-HIGH-09',
    category: KNOWN_CATEGORIES[0],
    subcategory: KNOWN_SUBCATEGORIES[1],
    category_id: 1,
    subcategory_id: 102,
    short_description: 'Ergonomic high-back wing chair with tailored lumbar support and solid wooden legs.',
    description: 'Designed for comfortable long reading sessions and sophisticated living spaces. Tall contoured backrest supports your neck and shoulders, while flared side wings provide acoustic coziness and classic charm.',
    price: '45000',
    sale_price: '39000',
    cost_price: null,
    stock_quantity: 8,
    low_stock_threshold: 2,
    material: 'mixed',
    finish: 'polished',
    dimensions_length: 88,
    dimensions_width: 82,
    dimensions_height: 110,
    weight: 26,
    color: 'Charcoal Gray',
    features: [
      'Full height 110cm orthopedic back support',
      'Solid hardwood tapered legs',
      'Heavy-duty commercial grade upholstery'
    ],
    specifications: {
      'Legs': 'Solid Teak Stained Wood',
      'Back Height': '110 cm'
    },
    is_active: true,
    is_featured: false,
    is_bestseller: false,
    meta_title: 'Executive High Back Wing Chair | Ashwi Furniture',
    meta_description: 'Buy Executive High Back Wing Chair in Kathmandu, Nepal. Handcrafted solid wooden legs & ergonomic support.',
    images: [
      {
        id: 1011,
        image: '/highbackchair.png',
        image_url: '/highbackchair.png',
        alt_text: 'Executive High Back Wing Chair',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1011,
      image: '/highbackchair.png',
      image_url: '/highbackchair.png',
      alt_text: 'Executive High Back Wing Chair',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.8,
    review_count: 3,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2025-02-01T00:00:00Z'
  },

  // 10. Modern Velvet Ottoman
  {
    id: 10,
    name: 'Modern Velvet Accent Ottoman',
    slug: 'modern-velvet-accent-ottoman',
    sku: 'ASHWI-OTTO-10',
    category: KNOWN_CATEGORIES[0],
    subcategory: KNOWN_SUBCATEGORIES[3],
    category_id: 1,
    subcategory_id: 104,
    short_description: 'Plush velvet round ottoman footstool with gold brass accent base.',
    description: 'Versatile, stylish, and practical. Works seamlessly as an extra seat, footrest, or coffee table companion. High resilience cushioning wrapped in silky soft velvet with an electroplated brushed gold base.',
    price: '18000',
    sale_price: '14500',
    cost_price: null,
    stock_quantity: 14,
    low_stock_threshold: 4,
    material: 'mixed',
    finish: 'glossy',
    dimensions_length: 60,
    dimensions_width: 60,
    dimensions_height: 42,
    weight: 9,
    color: 'Emerald Green / Blush Pink',
    features: [
      'Brushed metallic gold accent plinth base',
      'Dual use as coffee stool or footrest',
      'Dense shape-holding foam interior'
    ],
    specifications: {
      'Base': 'Rust-Proof Electroplated Stainless Steel Ring',
      'Weight Capacity': '120 kg'
    },
    is_active: true,
    is_featured: false,
    is_bestseller: true,
    meta_title: 'Modern Velvet Accent Ottoman | Ashwi Furniture',
    meta_description: 'Round velvet ottoman with gold metal base in Nepal. Pay after delivery in Kathmandu.',
    images: [
      {
        id: 1012,
        image: '/ottoman.png',
        image_url: '/ottoman.png',
        alt_text: 'Modern Velvet Accent Ottoman',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1012,
      image: '/ottoman.png',
      image_url: '/ottoman.png',
      alt_text: 'Modern Velvet Accent Ottoman',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.9,
    review_count: 7,
    created_at: '2024-02-05T00:00:00Z',
    updated_at: '2025-02-05T00:00:00Z'
  },

  // 11. Upholstered Bed Bench
  {
    id: 11,
    name: 'Cushioned End-of-Bed Ottoman Bench',
    slug: 'cushioned-end-of-bed-ottoman-bench',
    sku: 'ASHWI-BENCH-11',
    category: KNOWN_CATEGORIES[1],
    subcategory: KNOWN_SUBCATEGORIES[3],
    category_id: 2,
    subcategory_id: 104,
    short_description: 'Elegant bedroom bench with piped cushioning and solid timber legs.',
    description: 'Positioned at the foot of your bed or along your entryway, this cushioned bench adds hotel-suite luxury and convenient seating. Sturdily built from kiln-dried solid hardwood with tailored upholstery.',
    price: '26000',
    sale_price: '22000',
    cost_price: null,
    stock_quantity: 8,
    low_stock_threshold: 2,
    material: 'wood',
    finish: 'natural',
    dimensions_length: 130,
    dimensions_width: 45,
    dimensions_height: 48,
    weight: 18,
    color: 'Ivory Boucle / Natural Wood',
    features: [
      'Comfortable 130cm seating width',
      'Solid wood structural legs with floor protectors',
      'Pairs perfectly with king and queen beds'
    ],
    specifications: {
      'Wood Type': 'Seasoned Sisau / Teak',
      'Weight Capacity': '200 kg'
    },
    is_active: true,
    is_featured: false,
    is_bestseller: false,
    meta_title: 'End of Bed Ottoman Bench | Ashwi Furniture Kathmandu',
    meta_description: 'Luxury upholstered bed bench in Nepal. High finishing, custom wood colors, pay after delivery.',
    images: [
      {
        id: 1013,
        image: '/bedbench.png',
        image_url: '/bedbench.png',
        alt_text: 'Cushioned End-of-Bed Ottoman Bench',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1013,
      image: '/bedbench.png',
      image_url: '/bedbench.png',
      alt_text: 'Cushioned End-of-Bed Ottoman Bench',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.8,
    review_count: 4,
    created_at: '2024-02-08T00:00:00Z',
    updated_at: '2025-02-08T00:00:00Z'
  },

  // 12. Solid Teak Wood Bed
  {
    id: 12,
    name: 'Heritage Solid Wood King Bed',
    slug: 'heritage-solid-wood-king-bed',
    sku: 'ASHWI-BED-12',
    category: KNOWN_CATEGORIES[1],
    subcategory: KNOWN_SUBCATEGORIES[4],
    category_id: 2,
    subcategory_id: 201,
    short_description: 'Masterfully crafted solid wood king bed with natural grain finish and solid timber slats.',
    description: 'Crafted from hand-selected 100% seasoned solid timber, this bed combines clean contemporary geometric design with traditional mortise-and-tenon strength. Built to last generations with zero squeaks.',
    price: '75000',
    sale_price: '68000',
    cost_price: null,
    stock_quantity: 6,
    low_stock_threshold: 2,
    material: 'wood',
    finish: 'stained',
    dimensions_length: 210,
    dimensions_width: 190,
    dimensions_height: 100,
    weight: 75,
    color: 'Walnut Brown',
    features: [
      '100% seasoned solid timber construction',
      'Heavy-duty solid cross-beam support (no squeaks guaranteed)',
      'Smooth hand-sanded satin polyurethane seal',
      'Includes solid wooden slat system'
    ],
    specifications: {
      'Timber': 'Premium Seasoned Sisau / Sal Wood',
      'Mattress Size': 'King (6x6.5 ft or 6x6 ft compatible)',
      'Warranty': '10 Years Structural Warranty'
    },
    is_active: true,
    is_featured: true,
    is_bestseller: true,
    meta_title: 'Heritage Solid Wood King Bed Price in Nepal | Ashwi Furniture',
    meta_description: 'Buy Solid Wood King Bed in Kathmandu. Handcrafted seasoned timber, zero squeaks, 10-year warranty, cash after delivery.',
    images: [
      {
        id: 1014,
        image: '/bed.jpeg',
        image_url: '/bed.jpeg',
        alt_text: 'Heritage Solid Wood King Bed',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1014,
      image: '/bed.jpeg',
      image_url: '/bed.jpeg',
      alt_text: 'Heritage Solid Wood King Bed',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [
      {
        id: 4,
        customer_name: 'Bikash Adhikari',
        email: 'bikash@example.com',
        rating: 5,
        title: 'Solid as a rock',
        comment: 'Extremely sturdy wood, finish is top class. The installation team set it up in 20 minutes.',
        is_approved: true,
        created_at: '2024-09-01T11:00:00Z'
      }
    ],
    average_rating: 5.0,
    review_count: 1,
    created_at: '2024-02-12T00:00:00Z',
    updated_at: '2025-02-12T00:00:00Z'
  },

  // 13. Hydraulic Storage Bed
  {
    id: 13,
    name: 'Smart Hydraulic Lift Storage Bed',
    slug: 'smart-hydraulic-lift-storage-bed',
    sku: 'ASHWI-BED-13',
    category: KNOWN_CATEGORIES[1],
    subcategory: KNOWN_SUBCATEGORIES[4],
    category_id: 2,
    subcategory_id: 201,
    short_description: 'Effortless gas-lift hydraulic storage double bed with upholstered cushioned headboard.',
    description: 'Maximize your bedroom space effortlessly. German-engineered heavy-duty gas pistons lift the mattress platform with one finger, revealing massive dust-proof storage for extra blankets, quilts, and seasonal luggage.',
    price: '89000',
    sale_price: '79000',
    cost_price: null,
    stock_quantity: 7,
    low_stock_threshold: 2,
    material: 'mixed',
    finish: 'matte',
    dimensions_length: 215,
    dimensions_width: 185,
    dimensions_height: 105,
    weight: 85,
    color: 'Warm Walnut & Gray Cushion',
    features: [
      'Effortless gas-strut hydraulic lift mechanism',
      'Over 900 liters of dust-sealed under-bed storage',
      'Padded cushioned headboard for comfortable reading',
      'Sturdy steel inner lifting frame'
    ],
    specifications: {
      'Mechanism': 'Heavy Duty Hydraulic Gas Pistons (1200N)',
      'Storage Capacity': 'Full bed area box storage',
      'Headboard': 'High Density Foam Upholstered'
    },
    is_active: true,
    is_featured: true,
    is_bestseller: true,
    meta_title: 'Hydraulic Storage Bed Price in Nepal | Ashwi Furniture',
    meta_description: 'Order Hydraulic Lift Storage Bed in Kathmandu Nepal. Massive storage, easy gas lift, payment on delivery.',
    images: [
      {
        id: 1015,
        image: '/bed_with_storage.jpeg',
        image_url: '/bed_with_storage.jpeg',
        alt_text: 'Smart Hydraulic Lift Storage Bed',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1015,
      image: '/bed_with_storage.jpeg',
      image_url: '/bed_with_storage.jpeg',
      alt_text: 'Smart Hydraulic Lift Storage Bed',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.9,
    review_count: 9,
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2025-02-15T00:00:00Z'
  },

  // 14. 3-Door Solid Wood Wardrobe (Daraz)
  {
    id: 14,
    name: 'Classic 3-Door Wooden Wardrobe (Daraz)',
    slug: 'classic-3-door-wooden-wardrobe-daraz',
    sku: 'ASHWI-DRZ-14',
    category: KNOWN_CATEGORIES[1],
    subcategory: KNOWN_SUBCATEGORIES[5],
    category_id: 2,
    subcategory_id: 202,
    short_description: 'Spacious 3-door solid wood wardrobe with hanging rails, deep shelves, and security drawers.',
    description: 'The quintessential Nepali wardrobe (daraz) built with modern durability and classical aesthetics. Features full-length coat hanging sections, partitioned shelving, lockable secret security drawers, and smooth soft-close German hinges.',
    price: '68000',
    sale_price: '59000',
    cost_price: null,
    stock_quantity: 5,
    low_stock_threshold: 2,
    material: 'wood',
    finish: 'stained',
    dimensions_length: 150,
    dimensions_width: 60,
    dimensions_height: 200,
    weight: 90,
    color: 'Teak Walnut Finish',
    features: [
      'Multi-compartment organizer: hanging rails + 5 shelves',
      'Dual lockable inner security drawers with keys',
      'Anti-termite treated engineered hardwood construction',
      'Smooth soft-closing hydraulic door hinges'
    ],
    specifications: {
      'Height': '200 cm (6.5 ft)',
      'Locks': 'Brass Finish Security Locks with 2 Keys',
      'Hinges': 'Soft-Close Concealed Hinges'
    },
    is_active: true,
    is_featured: false,
    is_bestseller: true,
    meta_title: 'Wooden Wardrobe (Daraz) Price in Nepal | Ashwi Furniture',
    meta_description: 'Buy 3-Door Wooden Wardrobe (Daraz) in Kathmandu. Termite treated, secure locks, free delivery & payment after delivery.',
    images: [
      {
        id: 1016,
        image: '/daraz.jpeg',
        image_url: '/daraz.jpeg',
        alt_text: 'Classic 3-Door Wooden Wardrobe Daraz',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1016,
      image: '/daraz.jpeg',
      image_url: '/daraz.jpeg',
      alt_text: 'Classic 3-Door Wooden Wardrobe Daraz',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.8,
    review_count: 6,
    created_at: '2024-02-18T00:00:00Z',
    updated_at: '2025-02-18T00:00:00Z'
  },

  // 15. Wardrobe with Integrated Dressing Mirror
  {
    id: 15,
    name: 'Executive Wardrobe with Integrated Dressing Mirror',
    slug: 'executive-wardrobe-with-integrated-dressing-mirror',
    sku: 'ASHWI-DRZ-15',
    category: KNOWN_CATEGORIES[1],
    subcategory: KNOWN_SUBCATEGORIES[5],
    category_id: 2,
    subcategory_id: 202,
    short_description: 'All-in-one wardrobe and dressing table combination with full-length mirror and cosmetic drawers.',
    description: 'An ingenious all-in-one solution for bedrooms. Combines wardrobe clothes storage with an integrated vanity dresser, full-length dressing mirror, jewelry shelves, and soft-closing cosmetics drawers.',
    price: '78000',
    sale_price: '69000',
    cost_price: null,
    stock_quantity: 4,
    low_stock_threshold: 2,
    material: 'mixed',
    finish: 'glossy',
    dimensions_length: 180,
    dimensions_width: 60,
    dimensions_height: 205,
    weight: 105,
    color: 'Walnut & Frost White',
    features: [
      'Full-length 5mm bevelled edge silver glass dressing mirror',
      'Built-in vanity shelf with partitioned makeup drawers',
      'Spacious hanger wardrobe & overhead luggage loft'
    ],
    specifications: {
      'Mirror': 'Full-Length 5mm Distortion-Free Glass',
      'Storage': 'Wardrobe + 3 Drawers + Open Shelves'
    },
    is_active: true,
    is_featured: true,
    is_bestseller: false,
    meta_title: 'Wardrobe with Dressing Table Combo Nepal | Ashwi Furniture',
    meta_description: 'Modern Daraz with Dressing Mirror in Kathmandu Nepal. Custom sizes, payment after inspection on delivery.',
    images: [
      {
        id: 1017,
        image: '/daraj_with_dressing.jpeg',
        image_url: '/daraj_with_dressing.jpeg',
        alt_text: 'Wardrobe with Integrated Dressing Mirror',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1017,
      image: '/daraj_with_dressing.jpeg',
      image_url: '/daraj_with_dressing.jpeg',
      alt_text: 'Wardrobe with Integrated Dressing Mirror',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.9,
    review_count: 5,
    created_at: '2024-02-20T00:00:00Z',
    updated_at: '2025-02-20T00:00:00Z'
  },

  // 16. Modern Dressing Table with Mirror
  {
    id: 16,
    name: 'Contemporary Vanity Dressing Table',
    slug: 'contemporary-vanity-dressing-table',
    sku: 'ASHWI-DRS-16',
    category: KNOWN_CATEGORIES[1],
    subcategory: KNOWN_SUBCATEGORIES[6],
    category_id: 2,
    subcategory_id: 203,
    short_description: 'Sleek vanity table with illuminated mirror, soft-close velvet lined drawers, and stool.',
    description: 'Transform your morning routine with our Contemporary Vanity Dressing Table. Features multiple smooth-gliding drawers for makeup, skincare, and jewelry, paired with a pristine distortion-free mirror and cushioned matching stool.',
    price: '34000',
    sale_price: '29000',
    cost_price: null,
    stock_quantity: 8,
    low_stock_threshold: 2,
    material: 'wood',
    finish: 'polished',
    dimensions_length: 100,
    dimensions_width: 45,
    dimensions_height: 140,
    weight: 32,
    color: 'Warm Wood / White Accent',
    features: [
      'High-clarity bevelled vanity mirror',
      'Smooth telescopic ball-bearing drawer sliders',
      'Includes matching padded vanity stool',
      'Compact footprint suitable for any bedroom'
    ],
    specifications: {
      'Drawers': '3 Soft-Close Drawers',
      'Included': 'Dressing Table + Mirror + Stool'
    },
    is_active: true,
    is_featured: false,
    is_bestseller: true,
    meta_title: 'Dressing Table Price in Nepal | Ashwi Furniture Kathmandu',
    meta_description: 'Buy Modern Dressing Table with Mirror in Nepal. Free installation in Kathmandu, payment after delivery.',
    images: [
      {
        id: 1018,
        image: '/dressing_table.jpg',
        image_url: '/dressing_table.jpg',
        alt_text: 'Contemporary Vanity Dressing Table',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1018,
      image: '/dressing_table.jpg',
      image_url: '/dressing_table.jpg',
      alt_text: 'Contemporary Vanity Dressing Table',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.8,
    review_count: 8,
    created_at: '2024-02-22T00:00:00Z',
    updated_at: '2025-02-22T00:00:00Z'
  },

  // 17. Tiered Wooden Shoe Rack
  {
    id: 17,
    name: 'Multi-Tier Wooden Entryway Shoe Rack',
    slug: 'multi-tier-wooden-entryway-shoe-rack',
    sku: 'ASHWI-SHOE-17',
    category: KNOWN_CATEGORIES[1],
    subcategory: KNOWN_SUBCATEGORIES[7],
    category_id: 2,
    subcategory_id: 204,
    short_description: 'Ventilated 4-tier wooden shoe organizer with top utility shelf for keys and decor.',
    description: 'Keep your entryway tidy and clutter-free. Crafted with slatted ventilated shelves that allow natural airflow, preventing odors and keeping footwear organized. Solid wood build ensures longevity.',
    price: '16000',
    sale_price: '13500',
    cost_price: null,
    stock_quantity: 15,
    low_stock_threshold: 4,
    material: 'wood',
    finish: 'natural',
    dimensions_length: 80,
    dimensions_width: 32,
    dimensions_height: 90,
    weight: 14,
    color: 'Natural Honey Teak',
    features: [
      'Holds up to 16-20 pairs of shoes',
      'Ventilated slatted shelves for fresh airflow',
      'Sturdy solid wood top shelf for keys and decor'
    ],
    specifications: {
      'Capacity': '16-20 Pairs',
      'Shelves': '4 Tiers'
    },
    is_active: true,
    is_featured: false,
    is_bestseller: false,
    meta_title: 'Wooden Shoe Rack Price in Nepal | Ashwi Furniture',
    meta_description: 'Buy Multi-Tier Wooden Shoe Rack in Kathmandu Nepal. Termite-proof, holds 20 pairs, payment on delivery.',
    images: [
      {
        id: 1019,
        image: '/shoe_rack.jpeg',
        image_url: '/shoe_rack.jpeg',
        alt_text: 'Multi-Tier Wooden Entryway Shoe Rack',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1019,
      image: '/shoe_rack.jpeg',
      image_url: '/shoe_rack.jpeg',
      alt_text: 'Multi-Tier Wooden Entryway Shoe Rack',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.7,
    review_count: 5,
    created_at: '2024-02-25T00:00:00Z',
    updated_at: '2025-02-25T00:00:00Z'
  },

  // 18. Shoe Rack Bench with Cushion Top
  {
    id: 18,
    name: 'Shoe Rack Entryway Bench with Cushion Top',
    slug: 'shoe-rack-entryway-bench-with-cushion-top',
    sku: 'ASHWI-SHOE-18',
    category: KNOWN_CATEGORIES[1],
    subcategory: KNOWN_SUBCATEGORIES[7],
    category_id: 2,
    subcategory_id: 204,
    short_description: 'Dual-purpose entryway bench with comfortable cushioned seating and hidden shoe storage shelves.',
    description: 'The ultimate entryway convenience. Sit down comfortably while putting on or taking off your shoes. Features a thick padded foam cushion on top with 2 tiers of sturdy shoe storage underneath.',
    price: '22000',
    sale_price: '18500',
    cost_price: null,
    stock_quantity: 11,
    low_stock_threshold: 3,
    material: 'mixed',
    finish: 'stained',
    dimensions_length: 95,
    dimensions_width: 35,
    dimensions_height: 48,
    weight: 16,
    color: 'Walnut Wood & Charcoal Cushion',
    features: [
      'Comfortable high-density foam seat cushion',
      'Solid wood frame supports up to 180 kg seated weight',
      'Dual bottom shoe storage compartments'
    ],
    specifications: {
      'Weight Capacity': '180 kg',
      'Cushion': 'Removable Zip Cover'
    },
    is_active: true,
    is_featured: true,
    is_bestseller: true,
    meta_title: 'Shoe Rack Bench with Cushion Price in Nepal | Ashwi Furniture',
    meta_description: 'Entryway shoe bench with comfortable cushion top in Kathmandu. Pay after delivery, handcrafted finish.',
    images: [
      {
        id: 1020,
        image: '/shoe_rack_with_tops.jpeg',
        image_url: '/shoe_rack_with_tops.jpeg',
        alt_text: 'Shoe Rack Entryway Bench with Cushion Top',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1020,
      image: '/shoe_rack_with_tops.jpeg',
      image_url: '/shoe_rack_with_tops.jpeg',
      alt_text: 'Shoe Rack Entryway Bench with Cushion Top',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.9,
    review_count: 8,
    created_at: '2024-02-28T00:00:00Z',
    updated_at: '2025-02-28T00:00:00Z'
  },

  // 19. Minimalist Solid Wood Tea Table
  {
    id: 19,
    name: 'Minimalist Solid Wood Center Tea Table',
    slug: 'minimalist-solid-wood-center-tea-table',
    sku: 'ASHWI-TEA-19',
    category: KNOWN_CATEGORIES[0],
    subcategory: KNOWN_SUBCATEGORIES[2],
    category_id: 1,
    subcategory_id: 103,
    short_description: 'Handcrafted solid wood low center table with smooth bevelled perimeter and warm grain finish.',
    description: 'A handsome coffee and tea table built from solid hardwood. Its warm natural grain finish highlights the organic character of the wood, making it an inviting focal point for conversations and tea time.',
    price: '24000',
    sale_price: '19500',
    cost_price: null,
    stock_quantity: 12,
    low_stock_threshold: 3,
    material: 'wood',
    finish: 'natural',
    dimensions_length: 110,
    dimensions_width: 55,
    dimensions_height: 45,
    weight: 18,
    color: 'Natural Teak Wood',
    features: [
      '100% solid timber construction',
      'Waterproof heat-resistant polyurethane clear coat',
      'Bevelled child-friendly rounded edges'
    ],
    specifications: {
      'Wood': 'Seasoned Teak Wood',
      'Finish': 'Satin Clear Polyurethane'
    },
    is_active: true,
    is_featured: false,
    is_bestseller: true,
    meta_title: 'Wooden Tea Table / Center Table Price in Nepal | Ashwi Furniture',
    meta_description: 'Solid wooden tea table in Kathmandu Nepal. Water-resistant finish, pay after delivery.',
    images: [
      {
        id: 1021,
        image: '/tea_table.jpeg',
        image_url: '/tea_table.jpeg',
        alt_text: 'Minimalist Solid Wood Center Tea Table',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1021,
      image: '/tea_table.jpeg',
      image_url: '/tea_table.jpeg',
      alt_text: 'Minimalist Solid Wood Center Tea Table',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.8,
    review_count: 5,
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2025-03-01T00:00:00Z'
  },

  // 20. Tea Table with Rack
  {
    id: 20,
    name: 'Modern Coffee Table with Lower Storage Rack',
    slug: 'modern-coffee-table-with-lower-storage-rack',
    sku: 'ASHWI-TEA-20',
    category: KNOWN_CATEGORIES[0],
    subcategory: KNOWN_SUBCATEGORIES[2],
    category_id: 1,
    subcategory_id: 103,
    short_description: 'Dual-deck coffee table with lower slatted rack for books, magazines, and remotes.',
    description: 'Style meets function. This coffee table features an expansive tabletop for serving coffee and snacks, along with a spacious lower magazine shelf to keep your living room neat and organized.',
    price: '28000',
    sale_price: '23000',
    cost_price: null,
    stock_quantity: 9,
    low_stock_threshold: 2,
    material: 'wood',
    finish: 'stained',
    dimensions_length: 120,
    dimensions_width: 60,
    dimensions_height: 46,
    weight: 22,
    color: 'Rich Walnut',
    features: [
      'Dual-level storage for tidy living room',
      'Reinforced cross-braced solid legs',
      'Scratch and water resistant protective polish'
    ],
    specifications: {
      'Top Thickness': '25 mm Solid Wood',
      'Shelf Clearance': '24 cm'
    },
    is_active: true,
    is_featured: false,
    is_bestseller: false,
    meta_title: 'Coffee Table with Storage Rack Nepal | Ashwi Furniture',
    meta_description: 'Buy Coffee Table with Lower Magazine Rack in Kathmandu. Solid wood, pay after delivery.',
    images: [
      {
        id: 1022,
        image: '/tea_table_with_rack.jpeg',
        image_url: '/tea_table_with_rack.jpeg',
        alt_text: 'Modern Coffee Table with Lower Storage Rack',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1022,
      image: '/tea_table_with_rack.jpeg',
      image_url: '/tea_table_with_rack.jpeg',
      alt_text: 'Modern Coffee Table with Lower Storage Rack',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.7,
    review_count: 4,
    created_at: '2024-03-05T00:00:00Z',
    updated_at: '2025-03-05T00:00:00Z'
  },

  // 21. Contemporary Double-Deck Tea Table
  {
    id: 21,
    name: 'Contemporary Double-Deck Geometric Tea Table',
    slug: 'contemporary-double-deck-geometric-tea-table',
    sku: 'ASHWI-TEA-21',
    category: KNOWN_CATEGORIES[0],
    subcategory: KNOWN_SUBCATEGORIES[2],
    category_id: 1,
    subcategory_id: 103,
    short_description: 'Striking architectural double-deck center table with geometric side pillars and deep storage.',
    description: 'Make a design statement with this geometric dual-tier tea table. Combining architectural clean angles with practical functionality, it provides ample display space for artifacts, books, and tea sets.',
    price: '31000',
    sale_price: '26000',
    cost_price: null,
    stock_quantity: 8,
    low_stock_threshold: 2,
    material: 'wood',
    finish: 'stained',
    dimensions_length: 120,
    dimensions_width: 65,
    dimensions_height: 48,
    weight: 25,
    color: 'Dark Walnut Finish',
    features: [
      'Geometric architectural pillar structure',
      'Generous surface area for entertaining guests',
      'Solid heavy-base stability'
    ],
    specifications: {
      'Material': 'High-Density Treated Hardwood',
      'Load Capacity': '90 kg'
    },
    is_active: true,
    is_featured: true,
    is_bestseller: false,
    meta_title: 'Double Deck Tea Table Kathmandu | Ashwi Furniture',
    meta_description: 'Contemporary geometric coffee & tea table with storage shelf in Nepal. Handcrafted with high finishing.',
    images: [
      {
        id: 1023,
        image: '/tea_table_with_rack_2.jpeg',
        image_url: '/tea_table_with_rack_2.jpeg',
        alt_text: 'Contemporary Double-Deck Geometric Tea Table',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1023,
      image: '/tea_table_with_rack_2.jpeg',
      image_url: '/tea_table_with_rack_2.jpeg',
      alt_text: 'Contemporary Double-Deck Geometric Tea Table',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.9,
    review_count: 6,
    created_at: '2024-03-08T00:00:00Z',
    updated_at: '2025-03-08T00:00:00Z'
  },

  // 22. Handcrafted Wooden Home Temple (Mandir)
  {
    id: 22,
    name: 'Handcrafted Sacred Wooden Home Mandir',
    slug: 'handcrafted-sacred-wooden-home-mandir',
    sku: 'ASHWI-MNDR-22',
    category: KNOWN_CATEGORIES[5],
    subcategory: KNOWN_SUBCATEGORIES[10],
    category_id: 6,
    subcategory_id: 601,
    short_description: 'Traditional handcrafted wooden puja mandir with carved shikhara dome, diya tray, and drawers.',
    description: 'Consecrate your home with this sacred wooden temple. Meticulously hand-carved by seasoned Nepali woodcraft artisans with auspicious motifs, a top shikhara dome, pull-out brass-lined diya extension tray, and dedicated storage drawers for puja essentials.',
    price: '48000',
    sale_price: '42000',
    cost_price: null,
    stock_quantity: 6,
    low_stock_threshold: 2,
    material: 'wood',
    finish: 'stained',
    dimensions_length: 75,
    dimensions_width: 50,
    dimensions_height: 125,
    weight: 35,
    color: 'Teak Gold Antique Stained',
    features: [
      'Traditional hand-carved dome and pillars',
      'Pull-out incense and diya burner tray',
      'Dual drawers with brass bell handles for samagri storage',
      'Treated against moisture and insect damage'
    ],
    specifications: {
      'Wood': 'Seasoned Teak / Sisau Wood',
      'Carving': 'Handmade Traditional Carvings',
      'Features': 'Extension Diya Slider'
    },
    is_active: true,
    is_featured: true,
    is_bestseller: true,
    meta_title: 'Wooden Mandir for Home in Nepal | Ashwi Furniture',
    meta_description: 'Buy Handcrafted Wooden Mandir / Pooja Unit in Kathmandu Nepal. Traditional carved temple, payment after delivery.',
    images: [
      {
        id: 1024,
        image: '/mandir_alone.png',
        image_url: '/mandir_alone.png',
        alt_text: 'Handcrafted Sacred Wooden Home Mandir',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1024,
      image: '/mandir_alone.png',
      image_url: '/mandir_alone.png',
      alt_text: 'Handcrafted Sacred Wooden Home Mandir',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [
      {
        id: 5,
        customer_name: 'Radhika Sharma',
        email: 'radhika@example.com',
        rating: 5,
        title: 'Very spiritual and beautifully carved',
        comment: 'The woodwork and finishing are magnificent. It brings so much positive energy into our home.',
        is_approved: true,
        created_at: '2024-08-25T09:00:00Z'
      }
    ],
    average_rating: 5.0,
    review_count: 1,
    created_at: '2024-03-12T00:00:00Z',
    updated_at: '2025-03-12T00:00:00Z'
  },

  // 23. Grand Family Home Temple Mandir
  {
    id: 23,
    name: 'Grand Family Puja Mandir with Storage Cabinet',
    slug: 'grand-family-puja-mandir-with-storage-cabinet',
    sku: 'ASHWI-MNDR-23',
    category: KNOWN_CATEGORIES[5],
    subcategory: KNOWN_SUBCATEGORIES[10],
    category_id: 6,
    subcategory_id: 601,
    short_description: 'Spacious floor-standing family puja mandir with integrated 2-door cabinet and bell accents.',
    description: 'A grand devotional sanctuary for family daily prayers and festive celebrations. Standing tall with ornate pillar arches, hanging brass bells, an expansive sanctum for multiple deities, and a generous lower cabinet to store puja vessels and holy books.',
    price: '72000',
    sale_price: '64000',
    cost_price: null,
    stock_quantity: 4,
    low_stock_threshold: 1,
    material: 'wood',
    finish: 'polished',
    dimensions_length: 105,
    dimensions_width: 55,
    dimensions_height: 165,
    weight: 55,
    color: 'Heritage Mahogany',
    features: [
      'Expansive sanctum suitable for large deity idols',
      'Lower double-door cabinet for utensils and books',
      'Integrated brass hanging bells and diya tray',
      'Solid base designed for lifetime devotional use'
    ],
    specifications: {
      'Wood': 'Selected Seasoned Hardwood',
      'Height': '165 cm (5.4 ft)',
      'Cabinet': 'Double Door Lower Cabinet'
    },
    is_active: true,
    is_featured: true,
    is_bestseller: false,
    meta_title: 'Grand Family Puja Mandir Price Nepal | Ashwi Furniture',
    meta_description: 'Large floor-standing wooden temple for home in Kathmandu. Traditional craftsmanship, cash on delivery.',
    images: [
      {
        id: 1025,
        image: '/mandir_family_praying.png',
        image_url: '/mandir_family_praying.png',
        alt_text: 'Grand Family Puja Mandir with Storage Cabinet',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1025,
      image: '/mandir_family_praying.png',
      image_url: '/mandir_family_praying.png',
      alt_text: 'Grand Family Puja Mandir with Storage Cabinet',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.9,
    review_count: 4,
    created_at: '2024-03-15T00:00:00Z',
    updated_at: '2025-03-15T00:00:00Z'
  },

  // 24. Solid Wood Extendable Dining Table
  {
    id: 24,
    name: 'Solid Wood Extendable Dining Table',
    slug: 'solid-wood-extendable-dining-table',
    sku: 'ASHWI-DINE-24',
    category: KNOWN_CATEGORIES[2],
    subcategory: KNOWN_SUBCATEGORIES[8],
    category_id: 3,
    subcategory_id: 301,
    short_description: 'Seats 6 to 8 people with smooth concealed butterfly extension leaf.',
    description: 'Perfect for everyday family dinners and festive gatherings. The concealed butterfly leaf smoothly extends the table from 6 to 8 seats in seconds. Solid wood construction with protective food-safe satin lacquer.',
    price: '72000',
    sale_price: '64000',
    cost_price: null,
    stock_quantity: 6,
    low_stock_threshold: 2,
    material: 'wood',
    finish: 'stained',
    dimensions_length: 180,
    dimensions_width: 90,
    dimensions_height: 75,
    weight: 42,
    color: 'Walnut Finish',
    features: [
      'Concealed butterfly leaf extension (extends to 220cm)',
      'Seats 6-8 people comfortably',
      'Food-safe stain and scratch resistant seal',
      'Sturdy solid timber legs'
    ],
    specifications: {
      'Capacity': '6-8 Persons',
      'Extended Length': '220 cm'
    },
    is_active: true,
    is_featured: true,
    is_bestseller: true,
    meta_title: 'Extendable Dining Table Price Nepal | Ashwi Furniture',
    meta_description: 'Buy Solid Wood Extendable Dining Table in Nepal. Seats 6 to 8, pay after delivery.',
    images: [
      {
        id: 1026,
        image: '/tea_table_with_rack_2.jpeg',
        image_url: '/tea_table_with_rack_2.jpeg',
        alt_text: 'Solid Wood Extendable Dining Table',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1026,
      image: '/tea_table_with_rack_2.jpeg',
      image_url: '/tea_table_with_rack_2.jpeg',
      alt_text: 'Solid Wood Extendable Dining Table',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.8,
    review_count: 5,
    created_at: '2024-03-18T00:00:00Z',
    updated_at: '2025-03-18T00:00:00Z'
  },

  // 25. L-Shaped Executive Office Desk
  {
    id: 25,
    name: 'Executive L-Shaped Office Desk',
    slug: 'executive-l-shaped-office-desk',
    sku: 'ASHWI-OFC-25',
    category: KNOWN_CATEGORIES[3],
    subcategory: KNOWN_SUBCATEGORIES[9],
    category_id: 4,
    subcategory_id: 401,
    short_description: 'Ergonomic corner workstation with cable management grommets and lockable file drawers.',
    description: 'Designed for high productivity and clean workspace aesthetics. Ample room for dual monitors, laptops, and paperwork, featuring integrated cable organizers and a lockable 3-drawer filing cabinet pedestal.',
    price: '42000',
    sale_price: '36000',
    cost_price: null,
    stock_quantity: 10,
    low_stock_threshold: 3,
    material: 'mixed',
    finish: 'matte',
    dimensions_length: 150,
    dimensions_width: 120,
    dimensions_height: 75,
    weight: 38,
    color: 'Warm Teak & Black Frame',
    features: [
      'L-shaped corner layout maximizes floor space',
      'Dual cable management pass-through grommets',
      'Integrated lockable 3-drawer storage pedestal'
    ],
    specifications: {
      'Frame': 'Powder Coated Heavy Gauge Steel',
      'Top': 'Scratch & Heat Resistant Melamine Hardwood'
    },
    is_active: true,
    is_featured: false,
    is_bestseller: false,
    meta_title: 'Executive L-Shaped Office Desk in Nepal | Ashwi Furniture',
    meta_description: 'Buy L-shaped computer desk in Kathmandu. Perfect for home office and executive cabins.',
    images: [
      {
        id: 1027,
        image: '/tea_table.jpeg',
        image_url: '/tea_table.jpeg',
        alt_text: 'Executive L-Shaped Office Desk',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1027,
      image: '/tea_table.jpeg',
      image_url: '/tea_table.jpeg',
      alt_text: 'Executive L-Shaped Office Desk',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.8,
    review_count: 3,
    created_at: '2024-03-20T00:00:00Z',
    updated_at: '2025-03-20T00:00:00Z'
  },

  // 26. Outdoor Wicker Patio Set
  {
    id: 26,
    name: 'All-Weather Wicker Patio Lounge Set',
    slug: 'all-weather-wicker-patio-lounge-set',
    sku: 'ASHWI-OUT-26',
    category: KNOWN_CATEGORIES[4],
    subcategory: KNOWN_SUBCATEGORIES[10],
    category_id: 5,
    subcategory_id: 501,
    short_description: 'UV-resistant resin wicker set with 4 cushioned chairs and tempered glass coffee table.',
    description: 'Transform your patio, balcony, or garden into a resort-like retreat. Hand-woven from high-density all-weather resin wicker over rust-proof powder-coated aluminum framing, accompanied by water-repellent cushions.',
    price: '58000',
    sale_price: '49000',
    cost_price: null,
    stock_quantity: 7,
    low_stock_threshold: 2,
    material: 'mixed',
    finish: 'natural',
    dimensions_length: 120,
    dimensions_width: 120,
    dimensions_height: 75,
    weight: 34,
    color: 'Weathered Grey / Beige Cushions',
    features: [
      'UV-treated fade-resistant synthetic wicker',
      'Rust-proof aluminum structural frames',
      'Tempered safety glass tabletop',
      'Water-repellent washable cushion covers'
    ],
    specifications: {
      'Included': '4 Armchairs + 1 Glass Table + Cushions',
      'Weather Resistance': '100% Outdoor Rain & Sun Safe'
    },
    is_active: true,
    is_featured: false,
    is_bestseller: true,
    meta_title: 'Outdoor Garden Patio Furniture Set Nepal | Ashwi Furniture',
    meta_description: 'Weather-resistant outdoor wicker patio set with 4 chairs and table in Kathmandu. Pay after delivery.',
    images: [
      {
        id: 1028,
        image: '/butterflysofa1.png',
        image_url: '/butterflysofa1.png',
        alt_text: 'All-Weather Wicker Patio Lounge Set',
        is_primary: true,
        order: 1,
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    primary_image: {
      id: 1028,
      image: '/butterflysofa1.png',
      image_url: '/butterflysofa1.png',
      alt_text: 'All-Weather Wicker Patio Lounge Set',
      is_primary: true,
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    reviews: [],
    average_rating: 4.9,
    review_count: 6,
    created_at: '2024-03-22T00:00:00Z',
    updated_at: '2025-03-22T00:00:00Z'
  }
];
