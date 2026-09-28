import axios from 'axios';
import { 
  Product, 
  ProductListResponse, 
  Category, 
  CategoryListResponse,
  Subcategory,
  SubcategoryListResponse,
  ProductReview,
  FilterOptions
} from '../types';
import { KNOWN_CATEGORIES, KNOWN_SUBCATEGORIES } from '../data/knownCategories';
import { KNOWN_PRODUCTS } from '../data/knownProducts';

// Configurable API base URL: defaults to empty relative '/api' or environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE || 
  (typeof window !== 'undefined' && (window as any).__API_BASE_URL__) || 
  '';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 2500, // Short timeout so offline/metered experience never hangs
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to get local stored reviews
const getLocalReviews = (productSlug: string): ProductReview[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`ashwi_reviews_${productSlug}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalReview = (productSlug: string, review: ProductReview): void => {
  if (typeof window === 'undefined') return;
  try {
    const existing = getLocalReviews(productSlug);
    existing.unshift(review);
    localStorage.setItem(`ashwi_reviews_${productSlug}`, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save review locally', e);
  }
};

// In-memory cache for dynamic backend products
let cachedBackendProducts: Product[] = [];
let backendFetched = false;

// Async function to safely attempt fetching future additions from backend
const fetchFutureBackendProducts = async (): Promise<Product[]> => {
  if (!API_BASE_URL) return [];
  if (backendFetched && cachedBackendProducts.length > 0) {
    return cachedBackendProducts;
  }
  try {
    const res = await api.get<ProductListResponse>('/products/');
    if (res.data && Array.isArray(res.data.results)) {
      cachedBackendProducts = res.data.results;
      backendFetched = true;
      return cachedBackendProducts;
    }
  } catch {
    // Backend offline or unreachable - gracefully fall back to local static catalog
  }
  return [];
};

// Combine known products with any new backend products (deduplicating by slug)
const getCombinedProducts = async (): Promise<Product[]> => {
  const backendProducts = await fetchFutureBackendProducts();
  if (backendProducts.length === 0) {
    return KNOWN_PRODUCTS;
  }
  
  const productMap = new Map<string, Product>();
  // Add known products first
  KNOWN_PRODUCTS.forEach(p => productMap.set(p.slug, p));
  // Overlay backend products (new items or edits)
  backendProducts.forEach(p => productMap.set(p.slug, p));
  
  return Array.from(productMap.values());
};

// Filter & Sort helper
const applyFilters = (products: Product[], filters?: FilterOptions): Product[] => {
  if (!filters) return products;
  
  let result = [...products];

  if (filters.category) {
    const catLower = filters.category.toLowerCase();
    result = result.filter(p => 
      p.category.slug.toLowerCase() === catLower || 
      p.category.name.toLowerCase() === catLower
    );
  }

  if (filters.subcategory) {
    const subcatLower = filters.subcategory.toLowerCase();
    result = result.filter(p => 
      p.subcategory && (
        p.subcategory.slug.toLowerCase() === subcatLower || 
        p.subcategory.name.toLowerCase() === subcatLower
      )
    );
  }

  if (filters.material) {
    const matLower = filters.material.toLowerCase();
    result = result.filter(p => p.material.toLowerCase() === matLower);
  }

  if (filters.min_price !== undefined) {
    result = result.filter(p => {
      const price = parseFloat(p.sale_price || p.price);
      return price >= (filters.min_price || 0);
    });
  }

  if (filters.max_price !== undefined) {
    result = result.filter(p => {
      const price = parseFloat(p.sale_price || p.price);
      return price <= (filters.max_price || Infinity);
    });
  }

  if (filters.on_sale) {
    result = result.filter(p => p.sale_price && parseFloat(p.sale_price) < parseFloat(p.price));
  }

  if (filters.in_stock) {
    result = result.filter(p => p.stock_quantity > 0);
  }

  if (filters.is_featured) {
    result = result.filter(p => p.is_featured);
  }

  if (filters.is_bestseller) {
    result = result.filter(p => p.is_bestseller);
  }

  if (filters.search) {
    const query = filters.search.toLowerCase().trim();
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.short_description.toLowerCase().includes(query) ||
      p.category.name.toLowerCase().includes(query) ||
      (p.subcategory && p.subcategory.name.toLowerCase().includes(query)) ||
      p.material.toLowerCase().includes(query) ||
      p.color.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query)
    );
  }

  // Ordering
  if (filters.ordering) {
    switch (filters.ordering) {
      case 'price':
        result.sort((a, b) => parseFloat(a.sale_price || a.price) - parseFloat(b.sale_price || b.price));
        break;
      case '-price':
        result.sort((a, b) => parseFloat(b.sale_price || b.price) - parseFloat(a.sale_price || a.price));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case '-name':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case '-created_at':
      default:
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }
  }

  return result;
};

// Paginate helper
const paginate = (items: Product[], page: number = 1, pageSize: number = 12): ProductListResponse => {
  const total = items.length;
  const startIndex = (page - 1) * pageSize;
  const paginated = items.slice(startIndex, startIndex + pageSize);

  return {
    count: total,
    next: startIndex + pageSize < total ? `?page=${page + 1}` : null,
    previous: page > 1 ? `?page=${page - 1}` : null,
    results: paginated,
  };
};

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    // If backend is configured, attempt to merge any future categories
    if (API_BASE_URL) {
      try {
        const res = await api.get<CategoryListResponse>('/categories/');
        if (res.data && Array.isArray(res.data.results)) {
          const map = new Map<string, Category>();
          KNOWN_CATEGORIES.forEach(c => map.set(c.slug, c));
          res.data.results.forEach(c => map.set(c.slug, c));
          return Array.from(map.values());
        }
      } catch {
        // Fall back seamlessly to static categories
      }
    }
    return KNOWN_CATEGORIES;
  },
  
  getBySlug: async (slug: string): Promise<Category> => {
    const found = KNOWN_CATEGORIES.find(c => c.slug.toLowerCase() === slug.toLowerCase());
    if (found) return found;

    if (API_BASE_URL) {
      try {
        const response = await api.get<Category>(`/categories/${slug}/`);
        return response.data;
      } catch {
        // Continue to throw error below
      }
    }
    throw new Error(`Category not found: ${slug}`);
  },
  
  getProducts: async (slug: string, filters?: FilterOptions): Promise<ProductListResponse> => {
    const all = await getCombinedProducts();
    const filtered = applyFilters(all, { ...filters, category: slug });
    return paginate(filtered, filters?.page || 1, 12);
  },
};

// Subcategories API
export const subcategoriesApi = {
  getAll: async (): Promise<Subcategory[]> => {
    if (API_BASE_URL) {
      try {
        const res = await api.get<SubcategoryListResponse>('/subcategories/');
        if (res.data && Array.isArray(res.data.results)) {
          const map = new Map<string, Subcategory>();
          KNOWN_SUBCATEGORIES.forEach(s => map.set(s.slug, s));
          res.data.results.forEach(s => map.set(s.slug, s));
          return Array.from(map.values());
        }
      } catch {
        // Fall back
      }
    }
    return KNOWN_SUBCATEGORIES;
  },
  
  getBySlug: async (slug: string): Promise<Subcategory> => {
    const found = KNOWN_SUBCATEGORIES.find(s => s.slug.toLowerCase() === slug.toLowerCase());
    if (found) return found;

    if (API_BASE_URL) {
      try {
        const response = await api.get<Subcategory>(`/subcategories/${slug}/`);
        return response.data;
      } catch {
        // Continue
      }
    }
    throw new Error(`Subcategory not found: ${slug}`);
  },
  
  getProducts: async (slug: string, filters?: FilterOptions): Promise<ProductListResponse> => {
    const all = await getCombinedProducts();
    const filtered = applyFilters(all, { ...filters, subcategory: slug });
    return paginate(filtered, filters?.page || 1, 12);
  },
};

// Products API
export const productsApi = {
  getAll: async (filters?: FilterOptions): Promise<ProductListResponse> => {
    const all = await getCombinedProducts();
    const filtered = applyFilters(all, filters);
    return paginate(filtered, filters?.page || 1, 12);
  },
  
  getBySlug: async (slug: string): Promise<Product> => {
    const all = await getCombinedProducts();
    const found = all.find(p => p.slug.toLowerCase() === slug.toLowerCase());
    if (found) {
      // Merge with any locally stored reviews
      const localReviews = getLocalReviews(slug);
      if (localReviews.length > 0) {
        return {
          ...found,
          reviews: [...localReviews, ...found.reviews],
          review_count: found.review_count + localReviews.length,
        };
      }
      return found;
    }

    if (API_BASE_URL) {
      try {
        const response = await api.get<Product>(`/products/${slug}/`);
        return response.data;
      } catch {
        // Continue
      }
    }
    throw new Error(`Product not found: ${slug}`);
  },
  
  getFeatured: async (): Promise<ProductListResponse> => {
    const all = await getCombinedProducts();
    const featured = all.filter(p => p.is_featured);
    return paginate(featured, 1, 8);
  },
  
  getBestsellers: async (): Promise<ProductListResponse> => {
    const all = await getCombinedProducts();
    const bestsellers = all.filter(p => p.is_bestseller);
    return paginate(bestsellers, 1, 8);
  },
  
  getOnSale: async (): Promise<ProductListResponse> => {
    const all = await getCombinedProducts();
    const onSale = all.filter(p => p.sale_price && parseFloat(p.sale_price) < parseFloat(p.price));
    return paginate(onSale, 1, 8);
  },
  
  search: async (query: string): Promise<ProductListResponse> => {
    const all = await getCombinedProducts();
    const matched = applyFilters(all, { search: query });
    return paginate(matched, 1, 24);
  },
};

// Reviews API
export const reviewsApi = {
  getByProduct: async (productSlug: string): Promise<ProductReview[]> => {
    const product = KNOWN_PRODUCTS.find(p => p.slug.toLowerCase() === productSlug.toLowerCase());
    const initialReviews = product ? product.reviews : [];
    const local = getLocalReviews(productSlug);
    
    if (API_BASE_URL) {
      try {
        const response = await api.get<ProductReview[]>(`/products/${productSlug}/reviews/`);
        if (Array.isArray(response.data)) {
          return [...local, ...response.data];
        }
      } catch {
        // Fall back
      }
    }
    return [...local, ...initialReviews];
  },
  
  create: async (productSlug: string, reviewData: Omit<ProductReview, 'id' | 'is_approved' | 'created_at'>): Promise<ProductReview> => {
    const newReview: ProductReview = {
      id: Date.now(),
      customer_name: reviewData.customer_name,
      email: reviewData.email,
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      is_approved: true,
      created_at: new Date().toISOString(),
    };

    // Store in browser storage immediately
    saveLocalReview(productSlug, newReview);

    // If backend is reachable, post it as well
    if (API_BASE_URL) {
      try {
        await api.post(`/products/${productSlug}/reviews/`, reviewData);
      } catch (e) {
        // Backend offline, stored locally
      }
    }

    return newReview;
  },
};

export default api;