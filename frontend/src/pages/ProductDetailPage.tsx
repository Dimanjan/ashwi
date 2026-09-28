import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { productsApi } from '../services/api';
import { Product } from '../types';
import { formatPriceNPR } from '../utils/currency';
import { generateProductSchema, generateBreadcrumbSchema } from '../utils/structuredData';
import { trackProductView, trackEvent } from '../utils/telemetry';

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
        trackProductView({ name: p.name, slug: p.slug, price: p.sale_price || p.price });
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
  const productImage = primaryImage?.image_url || primaryImage?.image || 'https://www.ashwifurniture.com/default-product.jpg';
  const productUrl = `https://www.ashwifurniture.com/products/${product.slug}`;
  
  // Generate structured data
  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.ashwifurniture.com/' },
    { name: product.category.name, url: `https://www.ashwifurniture.com/category/${product.category.slug}` },
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

            {/* Direct Order & Inquiry Actions */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/9779820150789?text=${encodeURIComponent(`Hi Ashwi Furniture, I am interested in ordering/inquiring about ${product.name} (SKU: ${product.sku}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_order_click', { product_slug: product.slug, product_name: product.name, price: product.sale_price || product.price })}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors shadow flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>Order via WhatsApp</span>
                </a>
                <a
                  href="tel:+9779820150789"
                  onClick={() => trackEvent('phone_call_click', { location: 'product_detail', product_slug: product.slug })}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors shadow flex items-center justify-center gap-2"
                >
                  <span>Call to Order</span>
                </a>
              </div>
              <div className="mt-3 text-xs text-gray-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>✓ Payment only after delivery</span>
                <span>•</span>
                <span>✓ Free delivery inside Kathmandu Valley</span>
                <span>•</span>
                <span>✓ Custom dimensions available</span>
              </div>
            </div>
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
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-semibold">Customer Reviews</h2>
              <p className="text-sm text-gray-500 mt-1">Verified customer feedback and ratings</p>
            </div>
          </div>

          {/* Existing Reviews */}
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6 mb-8">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.title}</h3>
                      <p className="text-sm text-gray-600">{review.customer_name}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-400 text-lg' : 'text-gray-300 text-lg'}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mb-8 italic">No reviews yet for this product. Be the first to review!</p>
          )}

          {/* Write a Review Section */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave a Customer Review</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const customer_name = formData.get('name') as string;
                const email = formData.get('email') as string;
                const title = formData.get('title') as string;
                const comment = formData.get('comment') as string;
                const rating = parseInt(formData.get('rating') as string, 10) || 5;

                if (!customer_name || !email || !comment) return;

                const { reviewsApi } = await import('../services/api');
                const created = await reviewsApi.create(product.slug, {
                  customer_name,
                  email,
                  title: title || 'Great Quality!',
                  comment,
                  rating
                });

                setProduct({
                  ...product,
                  reviews: [created, ...(product.reviews || [])],
                  review_count: (product.review_count || 0) + 1
                });
                form.reset();
                alert('Thank you! Your review has been submitted.');
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Your Name</label>
                  <input required name="name" type="text" placeholder="e.g. Ramesh Karki" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Email</label>
                  <input required name="email" type="email" placeholder="e.g. ramesh@gmail.com" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Rating</label>
                  <select name="rating" defaultValue="5" className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-500 outline-none">
                    <option value="5">★★★★★ (5 Stars - Excellent)</option>
                    <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                    <option value="3">★★★☆☆ (3 Stars - Average)</option>
                    <option value="2">★★☆☆☆ (2 Stars - Below Average)</option>
                    <option value="1">★☆☆☆☆ (1 Star - Poor)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Review Headline</label>
                <input name="title" type="text" placeholder="e.g. Outstanding comfort and craftsmanship" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Your Review</label>
                <textarea required name="comment" rows={3} placeholder="Write your honest experience with this furniture..." className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"></textarea>
              </div>
              <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors shadow">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
