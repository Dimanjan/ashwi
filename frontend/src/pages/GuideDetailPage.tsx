import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GUIDES } from '../data/guidesData';
import { productsApi } from '../services/api';
import { Product } from '../types';
import { trackEvent } from '../utils/telemetry';
import { 
  ClockIcon, 
  ShareIcon, 
  CheckCircleIcon,
  ChevronDownIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const GuideDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = GUIDES.find(g => g.slug === slug);
  const [copied, setCopied] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (!guide) return;
    const fetchRelated = async () => {
      try {
        const response = await productsApi.getAll();
        const matched = response.results.filter(p => guide.relatedProductSlugs.includes(p.slug));
        setRelatedProducts(matched);
      } catch (err) {
        console.error('Failed to load related products:', err);
      }
    };
    fetchRelated();
  }, [guide]);

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  const shareUrl = `https://www.ashwifurniture.com/guides/${guide.slug}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: guide.title,
        text: guide.excerpt,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
    trackEvent('guide_share_click', { slug: guide.slug });
  };

  // Structured Data JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    image: `https://www.ashwifurniture.com${guide.heroImage}`,
    datePublished: guide.publishedDate,
    dateModified: guide.updatedDate,
    author: {
      '@type': 'Organization',
      name: guide.author,
      url: 'https://www.ashwifurniture.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ashwi Furniture',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.ashwifurniture.com/logo512.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': shareUrl
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.ashwifurniture.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: 'https://www.ashwifurniture.com/guides'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: shareUrl
      }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 sm:py-12">
      <Helmet>
        <title>{guide.metaTitle}</title>
        <meta name="description" content={guide.metaDescription} />
        <meta name="keywords" content={guide.targetKeywords.join(', ')} />
        <link rel="canonical" href={shareUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={guide.metaTitle} />
        <meta property="og:description" content={guide.metaDescription} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:image" content={`https://www.ashwifurniture.com${guide.heroImage}`} />
        <meta property="og:type" content="article" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={guide.metaTitle} />
        <meta name="twitter:description" content={guide.metaDescription} />
        <meta name="twitter:image" content={`https://www.ashwifurniture.com${guide.heroImage}`} />

        {/* Schema Scripts */}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 flex items-center space-x-2">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/guides" className="hover:text-primary-600 transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-[200px] sm:max-w-md">{guide.title}</span>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link 
            to="/guides" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            <span>Back to All Guides</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Article Content */}
          <main className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-xs">
            {/* Meta Header */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
              <span className="bg-primary-50 text-primary-700 font-semibold px-2.5 py-0.5 rounded-full">
                {guide.category}
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon className="w-3.5 h-3.5" />
                {guide.readingTime}
              </span>
              <span>·</span>
              <span>Updated on {guide.updatedDate}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              {guide.title}
            </h1>

            {/* Lead Excerpt */}
            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-100 mb-8">
              {guide.excerpt}
            </p>

            {/* Hero Image */}
            <div className="mb-10 rounded-xl overflow-hidden border border-gray-100 bg-gray-100">
              <img 
                src={guide.heroImage} 
                alt={guide.title} 
                className="w-full h-auto max-h-[480px] object-cover" 
              />
            </div>

            {/* Sections */}
            <div className="space-y-10 text-gray-800 leading-relaxed">
              {guide.sections.map(section => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-4 pb-2 border-b border-gray-100">
                    {section.heading}
                  </h2>
                  <div className="space-y-4 text-sm sm:text-base text-gray-700">
                    {section.content.map((p, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* FAQs Accordion Section */}
            {guide.faqs && guide.faqs.length > 0 && (
              <section className="mt-14 pt-8 border-t border-gray-100">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {guide.faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div 
                        key={idx} 
                        className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-colors"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full p-4 text-left flex justify-between items-center gap-4 text-sm sm:text-base font-semibold text-gray-900 hover:text-primary-600"
                        >
                          <span>{faq.question}</span>
                          <ChevronDownIcon className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-primary-600' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="p-4 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Trust Footnote */}
            <div className="mt-12 bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex items-start gap-3">
              <CheckCircleIcon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-emerald-900">
                <span className="font-bold">Ashwi Quality Guarantee:</span> Every piece of furniture mentioned in this guide is available with <span className="font-bold underline">100% Payment After Delivery</span> across Kathmandu, Lalitpur, and Bhaktapur. You check the joinery, wood seasoning, and finish in your home before paying.
              </div>
            </div>

            {/* Social Share / Action Bar */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ShareIcon className="w-4 h-4 text-gray-500" />
                  <span>{copied ? 'Link Copied!' : 'Share Guide'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <a 
                  href="tel:+9779860479751"
                  onClick={() => trackEvent('phone_call_click', { location: 'guide_bottom' })}
                  className="text-xs font-semibold text-gray-700 hover:text-primary-600"
                >
                  📞 Call 9860479751
                </a>
                <span className="text-gray-300">·</span>
                <a 
                  href={`https://wa.me/9779860479751?text=Hi%20Ashwi%20Furniture,%20I%20read%20the%20guide%20${encodeURIComponent(guide.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'guide_bottom' })}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
            {/* Table of Contents */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 pb-2 border-b border-gray-100">
                In This Guide
              </h3>
              <nav className="space-y-2.5">
                {guide.sections.map((sec, idx) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block text-xs font-medium text-gray-600 hover:text-primary-600 hover:translate-x-0.5 transition-all leading-snug"
                  >
                    <span className="text-gray-400 mr-1.5">{idx + 1}.</span>
                    {sec.heading}
                  </a>
                ))}
              </nav>
            </div>

            {/* Direct Workshop Hotline Card */}
            <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-900 shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                Direct Carpenter Advice
              </span>
              <h4 className="text-base font-bold mt-3 mb-2">
                Have a specific question about your room layout?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Send your room dimensions or floor photo to our Kathmandu workshop technicians on WhatsApp for instant guidance.
              </p>
              <a
                href={`https://wa.me/9779860479751?text=Hi%20Ashwi%20Furniture,%20I%20have%20a%20question%20regarding%20${encodeURIComponent(guide.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'guide_sidebar' })}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <span>💬</span> WhatsApp Our Workshop
              </a>
            </div>

            {/* Matching Products Featured in this Guide */}
            {relatedProducts.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  Featured Products
                </h3>
                <div className="space-y-4">
                  {relatedProducts.map(p => {
                    const img = p.primary_image?.image_url || p.images?.[0]?.image_url || '/ashwi-logo-transparent.png';
                    const priceStr = p.sale_price ? `Rs. ${parseFloat(p.sale_price).toLocaleString()} NPR` : `Rs. ${parseFloat(p.price).toLocaleString()} NPR`;
                    return (
                      <Link
                        key={p.slug}
                        to={`/products/${p.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <img 
                          src={img} 
                          alt={p.name}
                          className="w-14 h-14 object-cover rounded-lg bg-gray-100 border border-gray-100 shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-primary-600 truncate transition-colors">
                            {p.name}
                          </p>
                          <p className="text-xs font-extrabold text-primary-600 mt-0.5">
                            {priceStr}
                          </p>
                          <span className="text-[10px] text-emerald-600 font-medium">
                            Pay After Delivery
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default GuideDetailPage;
