import { Category, Subcategory } from '../types';

export const KNOWN_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Living Room',
    slug: 'living-room',
    description: 'Transform your living space with our handcrafted luxury sofas, coffee tables, armchairs, and ottomans.',
    image: '/bubblesofa.png',
    is_active: true,
    product_count: 14,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Create a restful haven with our premium wooden beds, hydraulic storage beds, wardrobes (daraz), and vanity tables.',
    image: '/bed_with_storage.jpeg',
    is_active: true,
    product_count: 7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Dining Room',
    slug: 'dining-room',
    description: 'Solid wood dining tables, modern dining chairs, and bespoke dining sets for memorable family meals.',
    image: '/tea_table_with_rack_2.jpeg',
    is_active: true,
    product_count: 3,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Office',
    slug: 'office',
    description: 'Ergonomic office desks, comfortable workstations, and functional filing cabinets for modern workspaces.',
    image: '/tea_table.jpeg',
    is_active: true,
    product_count: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: 'Outdoor',
    slug: 'outdoor',
    description: 'Durable weather-resistant patio furniture sets and outdoor lounge chairs for gardens and terraces.',
    image: '/butterflysofa1.png',
    is_active: true,
    product_count: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 6,
    name: 'Mandir & Pooja Units',
    slug: 'mandir',
    description: 'Beautifully sculpted wooden home temples and mandirs crafted with traditional Nepali craftsmanship.',
    image: '/mandir_alone.png',
    is_active: true,
    product_count: 3,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  }
];

export const KNOWN_SUBCATEGORIES: Subcategory[] = [
  // Living Room
  {
    id: 101,
    name: 'Sofas',
    slug: 'sofas',
    description: 'Modern curved sofas, tufted couches, and modular living room sets.',
    image: '/bubblesofa.png',
    is_active: true,
    category: KNOWN_CATEGORIES[0],
    category_id: 1,
    product_count: 5,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 102,
    name: 'Accent Chairs & Armchairs',
    slug: 'accent-chairs',
    description: 'Statement armchairs, cuddle swivel chairs, and high back wing chairs.',
    image: '/cuddlenestarmchair.png',
    is_active: true,
    category: KNOWN_CATEGORIES[0],
    category_id: 1,
    product_count: 4,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 103,
    name: 'Coffee & Tea Tables',
    slug: 'coffee-tables',
    description: 'Solid wood tea tables with shelf storage, glass top, and minimalist finishes.',
    image: '/tea_table_with_rack.jpeg',
    is_active: true,
    category: KNOWN_CATEGORIES[0],
    category_id: 1,
    product_count: 3,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 104,
    name: 'Ottomans & Benches',
    slug: 'ottomans-benches',
    description: 'Versatile cushioned ottomans, footstools, and entry benches.',
    image: '/ottoman.png',
    is_active: true,
    category: KNOWN_CATEGORIES[0],
    category_id: 1,
    product_count: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },

  // Bedroom
  {
    id: 201,
    name: 'Beds',
    slug: 'beds',
    description: 'Solid wood king & queen beds, hydraulic storage beds, and platform frames.',
    image: '/bed_with_storage.jpeg',
    is_active: true,
    category: KNOWN_CATEGORIES[1],
    category_id: 2,
    product_count: 3,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 202,
    name: 'Wardrobes & Daraz',
    slug: 'wardrobes',
    description: 'Spacious wardrobes, 3-door daraz, and wardrobe with dressing mirror.',
    image: '/daraz.jpeg',
    is_active: true,
    category: KNOWN_CATEGORIES[1],
    category_id: 2,
    product_count: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 203,
    name: 'Dressing & Vanity Tables',
    slug: 'dressing-tables',
    description: 'Modern makeup dressing tables with LED mirrors and storage drawers.',
    image: '/dressing_table.jpg',
    is_active: true,
    category: KNOWN_CATEGORIES[1],
    category_id: 2,
    product_count: 1,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 204,
    name: 'Shoe Racks',
    slug: 'shoe-racks',
    description: 'Space-efficient shoe racks with cushioned seating benches for entryways.',
    image: '/shoe_rack_with_tops.jpeg',
    is_active: true,
    category: KNOWN_CATEGORIES[1],
    category_id: 2,
    product_count: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },

  // Dining Room
  {
    id: 301,
    name: 'Dining Tables',
    slug: 'dining-tables',
    description: 'Extendable and solid hardwood dining tables for 6 to 8 persons.',
    image: '/tea_table_with_rack_2.jpeg',
    is_active: true,
    category: KNOWN_CATEGORIES[2],
    category_id: 3,
    product_count: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },

  // Office
  {
    id: 401,
    name: 'Desks & Workstations',
    slug: 'desks',
    description: 'Ergonomic study desks, L-shaped computer desks, and cable management tables.',
    image: '/tea_table.jpeg',
    is_active: true,
    category: KNOWN_CATEGORIES[3],
    category_id: 4,
    product_count: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },

  // Outdoor
  {
    id: 501,
    name: 'Patio Sets',
    slug: 'patio-sets',
    description: 'All-weather rattan and wicker outdoor lounge sets with plush cushions.',
    image: '/butterflysofa1.png',
    is_active: true,
    category: KNOWN_CATEGORIES[4],
    category_id: 4,
    product_count: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },

  // Mandir
  {
    id: 601,
    name: 'Wooden Mandir',
    slug: 'wooden-mandir',
    description: 'Sacred wooden temples for home puja with drawers, diya tray, and bell carvings.',
    image: '/mandir_alone.png',
    is_active: true,
    category: KNOWN_CATEGORIES[5],
    category_id: 6,
    product_count: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  }
];
