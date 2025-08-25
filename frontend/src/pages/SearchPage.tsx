import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Search results for: {q || 'All'}</h1>
      {loading && <p className="text-gray-600">Searching...</p>}
      {!loading && products.length === 0 && (
        <p className="text-gray-600">No products found.</p>
      )}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage; 