import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { productsApi } from '../services/api';
import { Product } from '../types';
import { formatPriceNPR } from '../utils/currency';
import { generateProductSchema, generateBreadcrumbSchema } from '../utils/structuredData';

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
  const productImage = primaryImage?.image_url || primaryImage?.image || 'https://ashwi-furniture.com/default-product.jpg';
  const productUrl = `https://ashwi-furniture.com/products/${product.slug}`;
  
  // Generate structured data
  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://ashwi-furniture.com/' },
    { name: product.category.name, url: `https://ashwi-furniture.com/category/${product.category.slug}` },
    { name: product.name, url: productUrl },
  ]);

  // Generate SEO meta description
  const metaDescription = product.meta_description || 
    `${product.short_description || product.description.slice(0, 150)}. ${product.material} material, ${product.finish} finish. Price: ${formatPriceNPR(product.sale_price || product.price)}. ${product.stock_quantity > 0 ? 'In stock' : 'Out of stock'} at Ashwi Furniture.`;

  const metaTitle = product.meta_title || 
    `${product.name} - ${product.category.name} | Ashwi Furniture`;

  const keywords = `${product.name}, ${product.category.name}, ${product.subcategory?.name || ''}, ${product.material}, ${product.color}, furniture, home furniture, buy furniture online`;

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords={keywords}
        image={productImage}
        url={productUrl}
        type="product"
        canonicalUrl={productUrl}
        structuredData={[productSchema, breadcrumbSchema]}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="hover:text-primary-600">Home</a></li>
            <li>/</li>
            <li><a href={`/category/${product.category.slug}`} className="hover:text-primary-600">{product.category.name}</a></li>
            {product.subcategory && (
              <>
                <li>/</li>
                <li><a href={`/subcategory/${product.subcategory.slug}`} className="hover:text-primary-600">{product.subcategory.name}</a></li>
              </>
            )}
            <li>/</li>
            <li className="font-medium text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-4">
            {primaryImage ? (
              <img 
                src={primaryImage.image_url || primaryImage.image} 
                alt={primaryImage.alt_text || product.name}
                className="w-full h-96 object-cover rounded" 
                loading="lazy"
              />
            ) : (
              <div className="w-full h-96 bg-gray-100 rounded flex items-center justify-center text-gray-400">No image</div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.category?.name} {product.subcategory ? `• ${product.subcategory.name}` : ''}</p>
            
            {/* Rating and Reviews */}
            {product.review_count > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.round(product.average_rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.average_rating.toFixed(1)} ({product.review_count} {product.review_count === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            )}
            
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-primary-600">
                {formatPriceNPR(product.sale_price || product.price)}
              </span>
              {product.sale_price && (
                <>
                  <span className="text-gray-500 line-through">{formatPriceNPR(product.price)}</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                    Save {Math.round((1 - parseFloat(product.sale_price) / parseFloat(product.price)) * 100)}%
                  </span>
                </>
              )}
            </div>
            
            <p className="text-gray-800 mb-6">{product.short_description || product.description}</p>
            
            {/* Specifications */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <h2 className="text-lg font-semibold mb-3">Product Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>SKU: <span className="font-medium">{product.sku}</span></div>
                <div>Material: <span className="font-medium">{product.material}</span></div>
                <div>Finish: <span className="font-medium">{product.finish}</span></div>
                <div>Color: <span className="font-medium">{product.color}</span></div>
                {product.dimensions_length && (
                  <div>
                    Dimensions: <span className="font-medium">
                      {product.dimensions_length} x {product.dimensions_width} x {product.dimensions_height} inches
                    </span>
                  </div>
                )}
                {product.weight && (
                  <div>Weight: <span className="font-medium">{product.weight} lbs</span></div>
                )}
                <div>
                  Stock: <span className={`font-medium ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock_quantity > 0 ? `${product.stock_quantity} available` : 'Out of stock'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-lg font-semibold mb-3">Key Features</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Full Description */}
        {product.description && (
          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <div className="text-gray-700 whitespace-pre-line">
              {product.description}
            </div>
          </div>
        )}
        
        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{review.title}</h3>
                      <p className="text-sm text-gray-600">{review.customer_name}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetailPage;
