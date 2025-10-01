import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FunnelIcon, Squares2X2Icon, Bars3Icon } from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';
import { productsApi, categoriesApi } from '../services/api';
import { Product, Category, FilterOptions } from '../types';
import SEO from '../components/SEO';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
// const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filters, setFilters] = useState<FilterOptions>({
    category: searchParams.get('category') || undefined,
    subcategory: searchParams.get('subcategory') || undefined,
    material: searchParams.get('material') || undefined,
    min_price: searchParams.get('min_price') ? parseFloat(searchParams.get('min_price')!) : undefined,
    max_price: searchParams.get('max_price') ? parseFloat(searchParams.get('max_price')!) : undefined,
    on_sale: searchParams.get('on_sale') === 'true',
    in_stock: searchParams.get('in_stock') === 'true',
    is_featured: searchParams.get('is_featured') === 'true',
    is_bestseller: searchParams.get('is_bestseller') === 'true',
    ordering: searchParams.get('ordering') || undefined,
    search: searchParams.get('search') || undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData] = await Promise.all([
          categoriesApi.getAll(),
// subcategoriesApi.getAll(),
        ]);
        setCategories(categoriesData);
// setSubcategories(subcategoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productsApi.getAll({
          ...filters,
          page: currentPage,
        });
        setProducts(response.results);
        setTotalCount(response.count);
        setPageSize(response.results.length);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, currentPage]);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    setCurrentPage(1);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({});
    setCurrentPage(1);
    setSearchParams({});
  };

  const totalPages = Math.ceil(totalCount / (pageSize || totalCount || 1));

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Shop All Furniture - Quality Home Furniture | Ashwi Furniture"
        description="Browse our complete collection of premium furniture products for your home. Living room, bedroom, dining room, office & outdoor furniture. Free shipping on orders over $500."
        keywords="furniture, home furniture, buy furniture online, quality furniture, affordable furniture, furniture store"
        url="https://ashwi-furniture.com/products"
        type="website"
        canonicalUrl="https://ashwi-furniture.com/products"
      />
      
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">
            {totalCount} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                >
                  <FunnelIcon className="h-5 w-5" />
                </button>
              </div>

              <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
                  <select
                    value={filters.category || ''}
                    onChange={(e) => updateFilters({ category: e.target.value || undefined })}
                    className="w-full input-field"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.slug} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Material Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Material</h3>
                  <select
                    value={filters.material || ''}
                    onChange={(e) => updateFilters({ material: e.target.value || undefined })}
                    className="w-full input-field"
                  >
                    <option value="">All Materials</option>
                    <option value="wood">Wood</option>
                    <option value="metal">Metal</option>
                    <option value="fabric">Fabric</option>
                    <option value="leather">Leather</option>
                    <option value="plastic">Plastic</option>
                    <option value="glass">Glass</option>
                    <option value="marble">Marble</option>
                    <option value="mixed">Mixed Materials</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={filters.min_price || ''}
                      onChange={(e) => updateFilters({ min_price: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full input-field"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={filters.max_price || ''}
                      onChange={(e) => updateFilters({ max_price: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full input-field"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.on_sale || false}
                      onChange={(e) => updateFilters({ on_sale: e.target.checked })}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">On Sale</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.in_stock || false}
                      onChange={(e) => updateFilters({ in_stock: e.target.checked })}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">In Stock</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.is_featured || false}
                      onChange={(e) => updateFilters({ is_featured: e.target.checked })}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.is_bestseller || false}
                      onChange={(e) => updateFilters({ is_bestseller: e.target.checked })}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Bestsellers</span>
                  </label>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full btn-secondary"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {totalCount} products {totalPages > 1 ? `(Page ${currentPage} of ${totalPages})` : ''}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Sort */}
                  <select
                    value={filters.ordering || ''}
                    onChange={(e) => updateFilters({ ordering: e.target.value || undefined })}
                    className="input-field w-40"
                  >
                    <option value="">Sort by</option>
                    <option value="name">Name A-Z</option>
                    <option value="-name">Name Z-A</option>
                    <option value="price">Price Low to High</option>
                    <option value="-price">Price High to Low</option>
                    <option value="-created_at">Newest First</option>
                    <option value="created_at">Oldest First</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600'}`}
                    >
                      <Squares2X2Icon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600'}`}
                    >
                      <Bars3Icon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            currentPage === page
                              ? 'bg-primary-600 text-white'
                              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductsPage; 
