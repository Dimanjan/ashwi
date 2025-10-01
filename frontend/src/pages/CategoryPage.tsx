import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { categoriesApi } from '../services/api';
import { Category, Product, ProductListResponse } from '../types';
import ProductCard from '../components/ProductCard';
import { generateCollectionSchema, generateBreadcrumbSchema } from '../utils/structuredData';

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

  if (error || !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-red-600">{error || 'Category not found'}</p>
      </div>
    );
  }

  const categoryUrl = `https://ashwi-furniture.com/category/${category.slug}`;
  const categoryTitle = `${category.name} Furniture - Shop Quality ${category.name} | Ashwi Furniture`;
  const categoryDescription = `${category.description} Browse ${category.product_count} products in our ${category.name} collection. Free shipping on orders over $500.`;
  const categoryImage = category.image || 'https://ashwi-furniture.com/images/og-image.jpg';

  // Generate structured data
  const collectionSchema = generateCollectionSchema(category, products.slice(0, 12));
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://ashwi-furniture.com/' },
    { name: category.name, url: categoryUrl },
  ]);

  return (
    <>
      <SEO
        title={categoryTitle}
        description={categoryDescription}
        keywords={`${category.name} furniture, ${category.name} decor, buy ${category.name} furniture online, quality ${category.name} furniture, affordable ${category.name} furniture`}
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

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{category.name} Furniture</h1>
          {category.description && (
            <p className="text-lg text-gray-600">{category.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">{category.product_count} products available</p>
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
      </div>
    </>
  );
};

export default CategoryPage;
