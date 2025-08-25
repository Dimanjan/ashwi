import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productsApi } from '../services/api';
import { Product } from '../types';
import { formatPriceNPR } from '../utils/currency';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const p = await productsApi.getBySlug(slug);
        setProduct(p);
      } catch (e: any) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-red-600">{error || 'Product not found'}</p>
      </div>
    );
  }

  const primaryImage = product.primary_image || product.images[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-4">
          {primaryImage ? (
            <img src={primaryImage.image_url || primaryImage.image} alt={primaryImage.alt_text || product.name} className="w-full h-96 object-cover rounded" />
          ) : (
            <div className="w-full h-96 bg-gray-100 rounded flex items-center justify-center text-gray-400">No image</div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.category?.name} {product.subcategory ? `• ${product.subcategory.name}` : ''}</p>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-primary-600">{formatPriceNPR(product.sale_price || product.price)}</span>
            {product.sale_price && (
              <span className="text-gray-500 line-through">{formatPriceNPR(product.price)}</span>
            )}
          </div>
          <p className="text-gray-800 mb-6">{product.short_description || product.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div>SKU: <span className="font-medium">{product.sku}</span></div>
            <div>Material: <span className="font-medium">{product.material}</span></div>
            <div>Finish: <span className="font-medium">{product.finish}</span></div>
            <div>Stock: <span className="font-medium">{product.stock_quantity}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 