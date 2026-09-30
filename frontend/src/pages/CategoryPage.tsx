import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { categoriesApi } from '../services/api';
import { Category, Product, ProductListResponse } from '../types';
import ProductCard from '../components/ProductCard';
import OptimizedImage from '../components/OptimizedImage';
import { generateCollectionSchema, generateBreadcrumbSchema } from '../utils/structuredData';
import { trackEvent } from '../utils/telemetry';

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
        trackEvent('category_view', { category_name: cat.name, category_slug: slug, product_count: resp.results.length });
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

  if (error || !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-red-600">{error || 'Category not found'}</p>
      </div>
    );
  }

  const categoryUrl = `https://www.ashwifurniture.com/category/${category.slug}`;
  const categoryTitle = `${category.name} Furniture Kathmandu Nepal | Ashwi Furniture - Pay After Delivery`;
  const categoryDescription = `${category.description} Explore handcrafted ${category.name} collection at Ashwi Furniture Kathmandu. 100% Payment After Delivery & free valley doorstep delivery. Call/WhatsApp 9860479751.`;
  const rawCatImg = category.image || '/og-image.jpg';
  const categoryImage = rawCatImg.startsWith('http') ? rawCatImg : `https://www.ashwifurniture.com${rawCatImg.startsWith('/') ? '' : '/'}${rawCatImg}`;

  // Generate structured data
  const collectionSchema = generateCollectionSchema(category, products.slice(0, 12));
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.ashwifurniture.com/' },
    { name: category.name, url: categoryUrl },
  ]);

  return (
    <>
      <SEO
        title={categoryTitle}
        description={categoryDescription}
        keywords={`${category.name} furniture, ${category.name} price in nepal, furniture kathmandu, kaath ko ${category.name.toLowerCase()}, sasto furniture nepal, buy ${category.name} furniture online, pay after delivery nepal`}
        image={categoryImage}
        url={categoryUrl}
        type="website"
        canonicalUrl={categoryUrl}
        structuredData={[collectionSchema, breadcrumbSchema]}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="hover:text-primary-600">Home</a></li>
            <li>/</li>
            <li className="font-medium text-gray-900">{category.name}</li>
          </ol>
        </nav>

        <div className="mb-8">
          {category.image && (
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6 shadow-md border border-gray-100">
              <OptimizedImage 
                src={category.image} 
                alt={`${category.name} hero`}
                className="w-full h-full object-cover"
                priority={true}
              />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{category.name} Furniture</h1>
          {category.description && (
            <p className="text-lg text-gray-600 max-w-3xl">{category.description}</p>
          )}
          <p className="text-sm font-semibold text-primary-600 mt-2">{category.product_count} products available in Nepal</p>
        </div>

        {products.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
            <p className="text-gray-500 mt-2">Check back soon for new arrivals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Localized Category Buying Advice & SEO Content Block */}
        <section className="mt-16 bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-xs">
          <div className="max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              Buying {category.name} Furniture in Kathmandu, Nepal
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              At Ashwi Furniture, every piece of {category.name.toLowerCase()} furniture is crafted using seasoned hardwood timbers such as Sisau (Sheesham) and Sal (Sakhuwa), built specifically to withstand the humidity shifts and climate of Kathmandu Valley. Whether you reside in an apartment in Lalitpur or an independent home in Bhaktapur, our team delivers and provides complimentary room assembly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-gray-100 my-6">
              <div className="text-xs">
                <span className="font-bold text-gray-900 block mb-1">100% Pay After Delivery</span>
                <span className="text-gray-500">Inspect the joinery, finish, and cushioning before paying.</span>
              </div>
              <div className="text-xs">
                <span className="font-bold text-gray-900 block mb-1">Valley Doorstep Delivery</span>
                <span className="text-gray-500">Free delivery and setup across Kathmandu, Lalitpur, and Bhaktapur.</span>
              </div>
              <div className="text-xs">
                <span className="font-bold text-gray-900 block mb-1">Direct Workshop Support</span>
                <span className="text-gray-500">Direct WhatsApp access to master joiners for custom dimensions.</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="text-xs text-gray-500">
                Want detailed comparisons? Read our in-depth{' '}
                <Link to="/guides" className="text-primary-600 font-bold hover:underline">
                  Furniture Buying Guides
                </Link>
                .
              </div>
              <div className="flex gap-3">
                <a
                  href="tel:+9779860479751"
                  onClick={() => trackEvent('phone_call_click', { location: 'category_footer' })}
                  className="text-xs font-bold text-gray-700 hover:text-primary-600"
                >
                  📞 9860479751
                </a>
                <span className="text-gray-300">·</span>
                <a
                  href={`https://wa.me/9779860479751?text=Hi%20Ashwi%20Furniture,%20I%20am%20browsing%20${encodeURIComponent(category.name)}%20furniture`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'category_footer' })}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  💬 WhatsApp Order
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CategoryPage;
