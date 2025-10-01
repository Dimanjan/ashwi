import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import { productsApi } from '../services/api';
import { Product, ProductListResponse } from '../types';
import ProductCard from '../components/ProductCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage: React.FC = () => {
  const query = useQuery();
  const q = query.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const run = async () => {
      if (!q) {
        setProducts([]);
        return;
      }
      setLoading(true);
      try {
        const resp: ProductListResponse = await productsApi.search(q);
        setProducts(resp.results);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [q]);

  const searchTitle = q ? `Search Results for "${q}" | Ashwi Furniture` : 'Search Products | Ashwi Furniture';
  const searchDescription = q 
    ? `Found ${products.length} results for "${q}". Browse our collection of quality furniture for your home.`
    : 'Search our extensive collection of quality furniture for your home. Find the perfect pieces for every room.';
  const searchUrl = `https://ashwi-furniture.com/search${q ? `?q=${encodeURIComponent(q)}` : ''}`;

  return (
    <>
      <SEO
        title={searchTitle}
        description={searchDescription}
        url={searchUrl}
        type="website"
        noindex={true}  // Typically we don't want search result pages indexed
        canonicalUrl={q ? undefined : 'https://ashwi-furniture.com/products'}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="hover:text-primary-600">Home</a></li>
            <li>/</li>
            <li className="font-medium text-gray-900">Search</li>
          </ol>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {q ? `Search Results for "${q}"` : 'Search Products'}
          </h1>
          {!loading && products.length > 0 && (
            <p className="text-gray-600">Found {products.length} product{products.length !== 1 ? 's' : ''}</p>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        )}
        
        {!loading && !q && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 text-lg">Enter a search term to find products</p>
          </div>
        )}
        
        {!loading && q && products.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 text-lg">No products found for "{q}"</p>
            <p className="text-gray-500 mt-2">Try different keywords or browse our categories</p>
            <div className="mt-6">
              <a href="/products" className="text-primary-600 hover:text-primary-700 font-semibold">
                View All Products →
              </a>
            </div>
          </div>
        )}
        
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
