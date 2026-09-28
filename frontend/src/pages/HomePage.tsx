import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { productsApi, categoriesApi } from '../services/api';
import { Product, Category } from '../types';
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema, 
  generateLocalBusinessSchema, 
  generateFAQSchema 
} from '../utils/structuredData';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestsellerProducts, setBestsellerProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featured, bestsellers, categoriesData] = await Promise.all([
          productsApi.getFeatured(),
          productsApi.getBestsellers(),
          categoriesApi.getAll(),
        ]);
        
        setFeaturedProducts(featured.results.slice(0, 4));
        setBestsellerProducts(bestsellers.results.slice(0, 4));
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Structured data for home page
  const faqs = [
    {
      question: 'Where is Ashwi Furniture located in Nepal?',
      answer: 'Ashwi Furniture is located in Kathmandu, Nepal, offering home delivery across Kathmandu Valley and shipping across all provinces of Nepal.'
    },
    {
      question: 'What is the payment policy at Ashwi Furniture?',
      answer: 'We take payment only after delivery! You can inspect your furniture upon delivery and pay via Cash on Delivery, Fonepay, or bank transfer.'
    },
    {
      question: 'Do you offer custom furniture design?',
      answer: 'Yes, we customize sofas, beds, wardrobes (daraz), dining tables, and wooden mandirs according to your preferred dimensions, timber type, and fabric.'
    },
    {
      question: 'Is there a warranty on your furniture?',
      answer: 'Yes, all our solid wood and framed furniture pieces come with a 5 to 10 year structural warranty against defects.'
    }
  ];

  const structuredData = [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateLocalBusinessSchema(),
    generateFAQSchema(faqs)
  ];

  return (
    <>
      <SEO
        title="Ashwi Furniture Kathmandu | Handcrafted Furniture Nepal - Pay After Delivery"
        description="Discover luxury curved bubble sofas, solid wood king beds, wardrobes (daraz), dining tables & wooden mandirs at Ashwi Furniture Kathmandu. Pay only after delivery!"
        keywords="furniture in Kathmandu, furniture Nepal, bubble sofa Kathmandu, wooden bed price Nepal, daraz wardrobe Nepal, home mandir Nepal, tea table Kathmandu, Ashwi Furniture"
        url="https://ashwi-furniture.com/"
        type="website"
        canonicalUrl="https://ashwi-furniture.com/"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-primary-700 bg-opacity-60 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-primary-500">
                  <span>✨ 100% Payment After Delivery</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Transform Your Home with
                  <span className="block text-primary-200">Handcrafted Furniture</span>
                </h1>
                <p className="text-xl text-primary-100 mb-8 max-w-lg">
                  Beautiful furniture with high finishing in Kathmandu, Nepal. We take payment only after delivery, ensuring complete peace of mind.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/products"
                    className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    Shop All Furniture
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/category/living-room"
                    className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                  >
                    Living Room Collection
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-500 rounded-2xl transform rotate-3 opacity-50"></div>
                  <div className="relative bg-white rounded-2xl p-8 shadow-2xl text-gray-900 border border-gray-100">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🤝</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Payment After Delivery
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Inspect your furniture thoroughly at your home before paying. Complete trust and satisfaction guaranteed.
                      </p>
                      <div className="inline-flex items-center space-x-2 text-primary-600 font-semibold text-sm bg-primary-50 px-4 py-2 rounded-lg">
                        <span>🚚 Free Delivery in Kathmandu Valley</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our wide range of furniture categories to find the perfect pieces for every room in your home.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="group block"
                >
                  <div className="bg-gray-50 rounded-lg p-8 text-center hover:bg-primary-50 transition-colors shadow-sm hover:shadow-md">
                    <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden group-hover:bg-primary-200 transition-colors border-2 border-primary-200">
                      {category.image ? (
                        <img 
                          src={category.image} 
                          alt={`${category.name} collection`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-3xl">
                          {category.name === 'Living Room' && '🛋️'}
                          {category.name === 'Bedroom' && '🛏️'}
                          {category.name === 'Dining Room' && '🍽️'}
                          {category.name === 'Office' && '💼'}
                          {category.name === 'Outdoor' && '🌳'}
                          {category.name.includes('Mandir') && '🛕'}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <span className="text-primary-600 font-medium">
                      {category.product_count} Products
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>


        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Featured Products
                </h2>
                <p className="text-lg text-gray-600">
                  Handpicked furniture pieces that combine style and functionality
                </p>
              </div>
              <Link
                to="/products?is_featured=true"
                className="text-primary-600 hover:text-primary-700 font-semibold flex items-center"
              >
                View All
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>


        {/* Bestsellers */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Customer Favorites
                </h2>
                <p className="text-lg text-gray-600">
                  Our most popular products loved by customers
                </p>
              </div>
              <Link
                to="/products?is_bestseller=true"
                className="text-primary-600 hover:text-primary-700 font-semibold flex items-center"
              >
                View All
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have created their dream homes with our furniture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Start Shopping
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/category/living-room"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Living Room Collection
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default HomePage;
