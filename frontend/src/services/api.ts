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

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<CategoryListResponse>('/categories/');
    return response.data.results;
  },
  
  getBySlug: async (slug: string): Promise<Category> => {
    const response = await api.get<Category>(`/categories/${slug}/`);
    return response.data;
  },
  
  getProducts: async (slug: string, filters?: FilterOptions): Promise<ProductListResponse> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    const response = await api.get<ProductListResponse>(`/categories/${slug}/products/?${params}`);
    return response.data;
  },
};

// Subcategories API
export const subcategoriesApi = {
  getAll: async (): Promise<Subcategory[]> => {
    const response = await api.get<SubcategoryListResponse>('/subcategories/');
    return response.data.results;
  },
  
  getBySlug: async (slug: string): Promise<Subcategory> => {
    const response = await api.get<Subcategory>(`/subcategories/${slug}/`);
    return response.data;
  },
  
  getProducts: async (slug: string, filters?: FilterOptions): Promise<ProductListResponse> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    const response = await api.get<ProductListResponse>(`/subcategories/${slug}/products/?${params}`);
    return response.data;
  },
};

// Products API
export const productsApi = {
  getAll: async (filters?: FilterOptions): Promise<ProductListResponse> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    const response = await api.get<ProductListResponse>(`/products/?${params}`);
    return response.data;
  },
  
  getBySlug: async (slug: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${slug}/`);
    return response.data;
  },
  
  getFeatured: async (): Promise<ProductListResponse> => {
    const response = await api.get<ProductListResponse>('/products/featured/');
    return response.data;
  },
  
  getBestsellers: async (): Promise<ProductListResponse> => {
    const response = await api.get<ProductListResponse>('/products/bestsellers/');
    return response.data;
  },
  
  getOnSale: async (): Promise<ProductListResponse> => {
    const response = await api.get<ProductListResponse>('/products/on_sale/');
    return response.data;
  },
  
  search: async (query: string): Promise<ProductListResponse> => {
    const response = await api.get<ProductListResponse>(`/products/search/?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};

// Reviews API
export const reviewsApi = {
  getByProduct: async (productSlug: string): Promise<ProductReview[]> => {
    const response = await api.get<ProductReview[]>(`/products/${productSlug}/reviews/`);
    return response.data;
  },
  
  create: async (productSlug: string, review: Omit<ProductReview, 'id' | 'is_approved' | 'created_at'>): Promise<ProductReview> => {
    const response = await api.post<ProductReview>(`/products/${productSlug}/reviews/`, review);
    return response.data;
  },
};

export default api; 