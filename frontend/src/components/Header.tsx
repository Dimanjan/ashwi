import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
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
      trackEvent('search_submit', { query: searchQuery.trim() });
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const getShortName = (name: string): string => {
    if (name.includes('Mandir')) return 'Mandir';
    return name;
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100 sticky top-0 z-50 transition-all">
      {/* Sleek Top Announcement & Contact Bar */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1 px-4 border-b border-slate-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">100% Payment After Delivery</span>
            <span className="text-slate-600 select-none">·</span>
            <span className="text-slate-400 hidden sm:inline">Kathmandu, Lalitpur, Bhaktapur</span>
          </div>
          <div className="flex items-center space-x-3">
            <a 
              href="tel:+9779860479751" 
              onClick={() => trackEvent('phone_call_click', { location: 'header_top' })}
              className="hover:text-white font-medium flex items-center gap-1 transition-colors"
            >
              <span className="text-[10px]">📞</span> 9860479751
            </a>
            <span className="text-slate-700 select-none">·</span>
            <a 
              href="https://wa.me/9779860479751" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'header_top' })}
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Clean Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group shrink-0 py-1">
            <picture>
              <source srcSet="/ashwi-logo-transparent.webp" type="image/webp" />
              <img 
                src="/ashwi-logo-transparent.png" 
                alt="Ashwi Furniture" 
                className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105"
                width="36"
                height="32"
              />
            </picture>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-gray-900 tracking-tight leading-none">Ashwi</span>
              <span className="text-[9px] tracking-widest uppercase font-semibold text-primary-600 leading-tight">Furniture</span>
            </div>
          </Link>

          {/* Desktop Navigation with Dot Separators & Refined Typography */}
          <nav className="hidden lg:flex items-center">
            <Link 
              to="/" 
              className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              Home
            </Link>
            
            <span className="text-gray-300 text-xs select-none mx-0.5">·</span>
            
            <Link 
              to="/products" 
              className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              All Products
            </Link>

            {categories.map((category) => (
              <React.Fragment key={category.slug}>
                <span className="text-gray-300 text-xs select-none mx-0.5">·</span>
                <Link
                  to={`/category/${category.slug}`}
                  className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors whitespace-nowrap"
                >
                  {getShortName(category.name)}
                </Link>
              </React.Fragment>
            ))}

            <span className="text-gray-300 text-xs select-none mx-0.5">·</span>

            <Link
              to="/guides"
              className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors whitespace-nowrap"
            >
              Guides
            </Link>
          </nav>

          {/* Search and Direct Actions */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Expandable Compact Search Input */}
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-28 sm:w-36 md:w-44 focus:w-56 h-8 text-xs pl-7 pr-2.5 rounded-full border border-gray-200 bg-gray-50/90 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
              />
              <MagnifyingGlassIcon className="h-3.5 w-3.5 text-gray-400 absolute left-2.5 pointer-events-none" />
            </form>

            {/* Subtle WhatsApp Quick Pill */}
            <a
              href="https://wa.me/9779860479751"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'header_main' })}
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full transition-colors shrink-0"
              title="Chat directly on WhatsApp"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Chat</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Dot Indicators */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-3 bg-white animate-fadeIn">
            <nav className="flex flex-col space-y-1">
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                Home
              </Link>
              <Link
                to="/products"
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  {category.name}
                </Link>
              ))}
              <Link
                to="/guides"
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                Furniture Guides
              </Link>

              {/* Mobile Quick Contact Bar */}
              <div className="pt-2.5 mt-2 border-t border-gray-100 flex gap-2">
                <a
                  href="tel:+9779860479751"
                  onClick={() => trackEvent('phone_call_click', { location: 'header_mobile' })}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>📞</span> Call 9860479751
                </a>
                <a
                  href="https://wa.me/9779860479751"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'header_mobile' })}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-center py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>💬</span> WhatsApp
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
