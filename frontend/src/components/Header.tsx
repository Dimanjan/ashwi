import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { categoriesApi } from '../services/api';
import { Category } from '../types';
import { trackEvent } from '../utils/telemetry';

const Header: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.getAll();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Announcement & Contact Bar */}
      <div className="bg-gray-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="hidden sm:inline">✨ Cash on delivery across Kathmandu Valley</span>
            <span className="sm:hidden">✨ Payment after delivery</span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="tel:+9779860479751" 
              onClick={() => trackEvent('phone_call_click', { location: 'header_top' })}
              className="hover:text-primary-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>📞</span> 9860479751
            </a>
            <span className="text-gray-600">|</span>
            <a 
              href="https://wa.me/9779860479751" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'header_top' })}
              className="text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Ashwi Furniture</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
              All Products
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Direct Call Action */}
            <a
              href="tel:+9779860479751"
              onClick={() => trackEvent('phone_call_click', { location: 'header_main' })}
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full border border-primary-200 hover:bg-primary-100 transition-colors"
              title="Call Ashwi Furniture"
            >
              <span>📞</span>
              <span>9860479751</span>
            </a>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search furniture..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </form>

            {/* Shopping Bag */}
            <button className="p-2 text-gray-700 hover:text-primary-600 transition-colors">
              <ShoppingBagIcon className="h-6 w-6" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}

              {/* Mobile Quick Contact */}
              <div className="pt-2 border-t border-gray-100 flex gap-2">
                <a
                  href="tel:+9779860479751"
                  onClick={() => trackEvent('phone_call_click', { location: 'header_mobile' })}
                  className="flex-1 bg-primary-600 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-1"
                >
                  📞 9860479751
                </a>
                <a
                  href="https://wa.me/9779860479751"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'header_mobile' })}
                  className="flex-1 bg-green-600 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-1"
                >
                  WhatsApp
                </a>
              </div>
            </nav>
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search furniture..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 