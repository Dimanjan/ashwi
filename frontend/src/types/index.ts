export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  is_active: boolean;
  product_count: number;
  created_at: string;
  updated_at: string;
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  is_active: boolean;
  category: Category;
  category_id: number;
  product_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  image: string;
  image_url: string;
  alt_text: string;
  is_primary: boolean;
  order: number;
  created_at: string;
}

export interface ProductReview {
  id: number;
  customer_name: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  is_approved: boolean;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  category: Category;
  subcategory: Subcategory;
  category_id: number;
  subcategory_id: number;
  short_description: string;
  description: string;
  price: string;
  sale_price: string | null;
  cost_price: string | null;
  stock_quantity: number;
  low_stock_threshold: number;
  material: string;
  finish: string;
  dimensions_length: number | null;
  dimensions_width: number | null;
  dimensions_height: number | null;
  weight: number | null;
  color: string;
  features: string[];
  specifications: Record<string, any>;
  is_active: boolean;
  is_featured: boolean;
  is_bestseller: boolean;
  meta_title: string;
  meta_description: string;
  images: ProductImage[];
  primary_image: ProductImage | null;
  reviews: ProductReview[];
  average_rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export interface CategoryListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
}

export interface SubcategoryListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Subcategory[];
}

export interface FilterOptions {
  category?: string;
  subcategory?: string;
  material?: string;
  min_price?: number;
  max_price?: number;
  on_sale?: boolean;
  in_stock?: boolean;
  is_featured?: boolean;
  is_bestseller?: boolean;
  ordering?: string;
  search?: string;
  page?: number;
} 