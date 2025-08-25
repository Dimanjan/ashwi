import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoriesApi, productsApi } from '../services/api';
import { Category, Product, ProductListResponse } from '../types';
import ProductCard from '../components/ProductCard';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const cat = await categoriesApi.getBySlug(slug);
        setCategory(cat);
        const resp: ProductListResponse = await categoriesApi.getProducts(slug, { page: 1, ordering: '-created_at' });
        setProducts(resp.results);
      } catch (e: any) {
        setError('Failed to load category');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Category: {category?.name || slug}</h1>
        {category?.description && (
          <p className="text-gray-600 mt-1">{category.description}</p>
        )}
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage; 