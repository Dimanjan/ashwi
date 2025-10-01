import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { subcategoriesApi } from '../services/api';
import { Subcategory, Product, ProductListResponse } from '../types';
import ProductCard from '../components/ProductCard';
import { generateBreadcrumbSchema } from '../utils/structuredData';

const SubcategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const sub = await subcategoriesApi.getBySlug(slug);
        setSubcategory(sub);
        const resp: ProductListResponse = await subcategoriesApi.getProducts(slug, { page: 1, ordering: '-created_at' });
        setProducts(resp.results);
      } catch (e: any) {
        setError('Failed to load subcategory');
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

  if (error || !subcategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-red-600">{error || 'Subcategory not found'}</p>
      </div>
    );
  }

  const subcategoryUrl = `https://ashwi-furniture.com/subcategory/${subcategory.slug}`;
  const subcategoryTitle = `${subcategory.name} - ${subcategory.category.name} Furniture | Ashwi Furniture`;
  const subcategoryDescription = `${subcategory.description} Shop ${subcategory.product_count} quality ${subcategory.name} products. Free shipping on orders over $500.`;
  const subcategoryImage = subcategory.image || subcategory.category.image || 'https://ashwi-furniture.com/images/og-image.jpg';

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://ashwi-furniture.com/' },
    { name: subcategory.category.name, url: `https://ashwi-furniture.com/category/${subcategory.category.slug}` },
    { name: subcategory.name, url: subcategoryUrl },
  ]);

  return (
    <>
      <SEO
        title={subcategoryTitle}
        description={subcategoryDescription}
        keywords={`${subcategory.name}, ${subcategory.category.name} furniture, ${subcategory.name} furniture, buy ${subcategory.name} online`}
        image={subcategoryImage}
        url={subcategoryUrl}
        type="website"
        canonicalUrl={subcategoryUrl}
        structuredData={[breadcrumbSchema]}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="hover:text-primary-600">Home</a></li>
            <li>/</li>
            <li><a href={`/category/${subcategory.category.slug}`} className="hover:text-primary-600">{subcategory.category.name}</a></li>
            <li>/</li>
            <li className="font-medium text-gray-900">{subcategory.name}</li>
          </ol>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{subcategory.name}</h1>
          {subcategory.description && (
            <p className="text-lg text-gray-600">{subcategory.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">{subcategory.product_count} products available</p>
        </div>

        {products.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 text-lg">No products found in this subcategory.</p>
            <p className="text-gray-500 mt-2">Check back soon for new arrivals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SubcategoryPage;
