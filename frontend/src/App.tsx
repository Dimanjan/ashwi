import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import SubcategoryPage from './pages/SubcategoryPage';
import SearchPage from './pages/SearchPage';
import TechnologyPage from './pages/TechnologyPage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/subcategory/:slug" element={<SubcategoryPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/technology" element={<TechnologyPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
