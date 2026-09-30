import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GUIDES } from '../data/guidesData';
import { trackEvent } from '../utils/telemetry';
import { BookOpenIcon, ClockIcon, ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const GuidesIndexPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...Array.from(new Set(GUIDES.map(g => g.category)))];

  const filteredGuides = GUIDES.filter(g => {
    const matchesCategory = selectedCategory === 'All' || g.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.targetKeywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-8 sm:py-12">
      <Helmet>
        <title>Furniture Buying & Care Guides Nepal | Ashwi Furniture</title>
        <meta 
          name="description" 
          content="Practical furniture guides for Kathmandu Valley homes. Learn about Sisau vs Sal wood, hydraulic storage beds, sliding wardrobes, curved sofas, and home mandir Vastu." 
        />
        <link rel="canonical" href="https://www.ashwifurniture.com/guides" />
        <meta property="og:title" content="Furniture Buying & Care Guides Nepal | Ashwi Furniture" />
        <meta property="og:description" content="Practical furniture guides for Kathmandu Valley homes. Learn about Sisau vs Sal wood, hydraulic storage beds, sliding wardrobes, curved sofas, and home mandir Vastu." />
        <meta property="og:url" content="https://www.ashwifurniture.com/guides" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs */}
        <nav className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 flex items-center space-x-2">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary-600">Guides & Resources</span>
        </nav>

        {/* Page Hero */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-xs mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-4">
            <BookOpenIcon className="w-4 h-4" />
            <span>Topical Authority & Knowledge Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Furniture Buying, Sizing & Care Guides for Nepali Homes
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
            Direct, practical advice straight from our Kathmandu carpentry workshops. No AI fluff, no generic sales talk - just clear facts on timber seasoning, room dimensions, gas pistons, and Vastu rules.
          </p>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    trackEvent('guide_category_filter', { category: cat });
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary-600 text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search guides..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
              <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map(guide => (
            <article 
              key={guide.slug}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <Link 
                to={`/guides/${guide.slug}`} 
                className="relative block h-48 overflow-hidden bg-gray-100"
                onClick={() => trackEvent('guide_card_click', { slug: guide.slug })}
              >
                <img 
                  src={guide.heroImage} 
                  alt={guide.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                  {guide.category}
                </span>
              </Link>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <ClockIcon className="w-3.5 h-3.5" />
                    <span>{guide.readingTime}</span>
                    <span>·</span>
                    <span>Updated {guide.updatedDate}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-3">
                    <Link to={`/guides/${guide.slug}`}>
                      {guide.title}
                    </Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">By {guide.author}</span>
                  <Link 
                    to={`/guides/${guide.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 group-hover:text-primary-700"
                  >
                    <span>Read Guide</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Contact / Direct Advice Banner */}
        <div className="mt-16 bg-slate-900 text-white rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              Need Custom Furniture Dimensions or Timber Advice?
            </h3>
            <p className="text-sm text-slate-300">
              Speak directly with our workshop craftsmen in Kathmandu. We provide free site measurement visits and 100% Payment After Delivery.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a 
              href="tel:+9779860479751"
              onClick={() => trackEvent('phone_call_click', { location: 'guides_banner' })}
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <span>📞</span> Call 9860479751
            </a>
            <a 
              href="https://wa.me/9779860479751?text=Hi%20Ashwi%20Furniture,%20I%20read%20your%20guides%20and%20have%20a%20question"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'guides_banner' })}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <span>💬</span> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidesIndexPage;
