import React from 'react';
import SEO from '../components/SEO';
import { CpuChipIcon, CodeBracketIcon, ChatBubbleLeftRightIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const TechnologyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Technology & AI Solutions - Ashwi Furniture"
        description="Discover how Ashwi Furniture leverages cutting-edge AI technology and web development solutions from Sajedar to provide exceptional customer experience and 24/7 support."
        keywords="AI technology, chatbot solutions, web development, customer support automation, Sajedar, Ashwi Furniture technology"
        url="https://ashwi-furniture.com/technology"
        type="website"
        canonicalUrl="https://ashwi-furniture.com/technology"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Technology & AI Solutions
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Powered by advanced AI technology and modern web development, 
                we deliver exceptional customer experiences 24/7.
              </p>
            </div>
          </div>
        </section>

        {/* Technology Partnership */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Technology Partnership
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Ashwi Furniture has partnered with Sajedar, a leading AI Agent Builder Agency, 
                to bring you cutting-edge technology solutions that enhance your shopping experience.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-8">
                  <img 
                    src="/sajedar-logo.webp" 
                    alt="Sajedar - AI Agent Builder Agency" 
                    className="h-16 w-auto"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Sajedar</h3>
                    <p className="text-gray-600">AI Agent Builder Agency</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Technology Partner
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        AI Solutions
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CpuChipIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Customer Support</h4>
                      <p className="text-gray-600">
                        Our intelligent chatbot provides instant responses to customer inquiries, 
                        product questions, and support requests 24/7.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <ChatBubbleLeftRightIcon className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Facebook Messenger Integration</h4>
                      <p className="text-gray-600">
                        Seamless customer engagement through Facebook Messenger, 
                        allowing customers to interact with us on their preferred platform.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CodeBracketIcon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Modern Web Development</h4>
                      <p className="text-gray-600">
                        Our website is built with React, TypeScript, and modern web technologies 
                        for optimal performance and user experience.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <GlobeAltIcon className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">SEO Optimization</h4>
                      <p className="text-gray-600">
                        Advanced SEO implementation ensures our website ranks well in search engines, 
                        making it easier for customers to find us.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a 
                    href="https://www.sajedar.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    title="Visit Sajedar - AI Agent Builder Agency"
                  >
                    <span>Learn More About Sajedar</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technology Stack</h3>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CpuChipIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">AI & Machine Learning</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Advanced AI algorithms power our chatbot responses and customer service automation.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <CodeBracketIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">React & TypeScript</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Modern web development with React and TypeScript for robust, scalable applications.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <ChatBubbleLeftRightIcon className="w-4 h-4 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">Social Media Integration</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Seamless integration with Facebook Messenger and other social platforms.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <GlobeAltIcon className="w-4 h-4 text-orange-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">SEO & Performance</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Optimized for search engines and fast loading times for better user experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Benefits of Our Technology Partnership
              </h2>
              <p className="text-lg text-gray-600">
                How our partnership with Sajedar enhances your shopping experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Availability</h3>
                <p className="text-gray-600">
                  Our AI chatbot is always available to help with your questions, 
                  even outside business hours.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Responses</h3>
                <p className="text-gray-600">
                  Get immediate answers to your questions without waiting for human support.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Seamless Experience</h3>
                <p className="text-gray-600">
                  Smooth integration across all platforms ensures consistent service quality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Experience Our Technology
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Try our AI chatbot or explore our website to see how technology enhances your furniture shopping experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Shop Now
              </a>
              <a
                href="https://www.sajedar.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Learn About Sajedar
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TechnologyPage;
