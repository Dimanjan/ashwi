import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
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

  // Structured data for home page and visible FAQ section (Bilingual SEO for Nepali & Global Audience)
  const faqs = [
    {
      question: 'Where is Ashwi Furniture located and where do you deliver in Nepal? (अश्वी फर्निचर कहाँ छ?)',
      answer: 'Ashwi Furniture is based in Kathmandu, Nepal. We provide free doorstep delivery and professional assembly across the entire Kathmandu Valley (Kathmandu, Lalitpur/Patan, and Bhaktapur) within 24 to 72 hours, and secure transport to Pokhara, Chitwan, Butwal, and all major cities in Nepal.'
    },
    {
      question: 'How does payment work at Ashwi Furniture? (भुक्तानी नीति कस्तो छ?)',
      answer: 'We operate on a 100% Payment After Delivery model (डेलिभरी पश्चात मात्र भुक्तानी)! You do not pay advance money for standard catalog furniture. You only pay after our delivery team brings your furniture to your home and you inspect its finishing and comfort. We accept Cash on Delivery, Fonepay QR (फोनपे), eSewa (इसेवा), and bank transfers.'
    },
    {
      question: 'How do I place an order or inquire about furniture? (अर्डर कसरी गर्ने?)',
      answer: 'You can order directly through our website, call us directly at 9860479751, or message us on WhatsApp at +977-986-0479751. Our team responds promptly with fabric swatches, custom dimensions, and delivery schedules.'
    },
    {
      question: 'Can I customize dimensions, fabric, and wood finishes? (साइज र रङ्ग कस्टमाइज मिल्छ?)',
      answer: 'Yes! All Ashwi Furniture products—including curved bubble sofas, modern platform beds (काठको पलंग / khat), storage wardrobes (3-door sliding daraz / दराज), dining tables, and wooden home mandirs (काठको पूजा मन्दिर)—can be tailored to your room dimensions and interior color palette.'
    },
    {
      question: 'What materials, timber, and warranties are provided? (काठ र वारेन्टी कस्तो छ?)',
      answer: 'We handcraft our furniture using seasoned solid Sal wood (साखुवा काठ), Sheesham/Sissoo (सिसौ), high-resilience memory foam, and premium stain-resistant bouclé/velvet fabrics. All solid frame furniture includes a 5 to 10-year structural frame warranty.'
    },
    {
      question: 'What if I am not satisfied with the furniture upon delivery? (सामान मन परेन भने के हुन्छ?)',
      answer: 'Because of our 100% payment-after-delivery guarantee, if a delivered item does not match your expectations during delivery inspection, you are under zero obligation to keep or pay for it. Customer trust and satisfaction in Nepal is our highest priority.'
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
        title="Ashwi Furniture Kathmandu | Handcrafted Furniture Nepal - काठको फर्निचर | Pay After Delivery"
        description="काठमाडौँ तथा नेपालभर गुणस्तरीय काठको फर्निचर: सोफा सेट, काठको पलंग (beds), दराज (wardrobes), डाइनिङ टेबल र पूजा मन्दिर। 100% Payment After Delivery across Kathmandu, Lalitpur & Bhaktapur. Call/WhatsApp 9860479751."
        keywords="furniture in Kathmandu, furniture Nepal, bubble sofa Kathmandu, wooden bed price Nepal, daraz wardrobe Nepal, home mandir Nepal, tea table Kathmandu, kaath ko palang, sasto furniture kathmandu, palang design nepal, daraj ko price nepal, ghar ko mandir nepal, sofa set rate nepal, khat ko price kathmandu, furniture pasal kathmandu, sissoo wood furniture nepal, फर्निचर, काठको पलंग, सोफा सेट, दराज, पूजा मन्दिर, डाइनिङ टेबल, Ashwi Furniture"
        url="https://www.ashwifurniture.com/"
        image="https://www.ashwifurniture.com/og-image.jpg"
        type="website"
        canonicalUrl="https://www.ashwifurniture.com/"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-primary-700 bg-opacity-70 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-primary-500 shadow-sm">
                  <span>✨ १००% डेलिभरी भएपछि मात्र भुक्तानी (Pay After Delivery)</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Transform Your Home with
                  <span className="block text-primary-200">Handcrafted Furniture</span>
                </h1>
                <p className="text-lg md:text-xl text-primary-100 mb-4 max-w-lg">
                  काठमाडौँमा उच्च फिनिसिङ भएको काठको फर्निचर। Beautiful solid wood furniture handcrafted in Kathmandu, Nepal.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium text-primary-200 mb-8 max-w-lg">
                  <span className="bg-primary-700 bg-opacity-60 px-2.5 py-1 rounded">🚚 उपत्यकाभित्र निःशुल्क डेलिभरी</span>
                  <span className="bg-primary-700 bg-opacity-60 px-2.5 py-1 rounded">🛡️ ५-१० वर्ष वारेन्टी</span>
                  <span className="bg-primary-700 bg-opacity-60 px-2.5 py-1 rounded">📞 ९८६०४७९७५१</span>
                </div>
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
                        <OptimizedImage 
                          src={category.image} 
                          alt={`${category.name} collection`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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

        {/* Frequently Asked Questions (GEO & SEO Optimized) */}
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-primary-600 font-bold bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
                Help & Information
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-3 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about ordering handcrafted furniture in Kathmandu with payment after delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, idx) => (
                <article key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2.5 flex items-start gap-2">
                    <span className="text-primary-600 text-xl font-black">Q.</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center bg-primary-50 rounded-2xl p-6 border border-primary-100">
              <p className="text-gray-800 font-medium text-sm">
                Have more questions or need immediate customization assistance?
              </p>
              <div className="mt-3 flex items-center justify-center gap-4">
                <a
                  href="tel:+9779860479751"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                >
                  <span>📞 Call: 9860479751</span>
                </a>
                <a
                  href="https://wa.me/9779860479751"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
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
