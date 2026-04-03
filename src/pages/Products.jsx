import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard';
import { Search, Filter, ShoppingBag } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { products, fetchProducts, isLoading } = useProductStore();

  const categories = [
    'All', 'SEEDS', 'CROP NUTRITION', 'CROP PROTECTION', 'GARDEN CARE', 
    'BUY 1 GET 1 FREE', 'SUPER COMBO', 'AGRI EQUIPMENT', 'IRRIGATION', 'TOP BRANDS'
  ];

  useEffect(() => {
    // When URL params change or on load
    setActiveCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

  useEffect(() => {
    fetchProducts(activeCategory, searchTerm);
  }, [activeCategory, fetchProducts]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(activeCategory, searchTerm);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Animated Banner Header */}
      <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1200&q=80" 
          alt="Products Banner" 
          className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#166534]/90 via-[#166534]/60 to-transparent flex items-center">
          <div className="px-6 md:px-16 animate-fade-in-up w-full">
            <div className="bg-[#D4AF37] text-white text-xs font-bold inline-block px-3 py-1 rounded-sm mb-3">EXPERIENCE THE BEST</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-wide drop-shadow-md">
              {activeCategory === 'All' ? 'All Farm Products' : activeCategory}
            </h1>
            <p className="text-gray-200 mt-2 max-w-lg">Find the highest quality products directly from trusted sources and verified farmers, equipped to scale your yield.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <div className="w-full md:w-64 flex-shrink-0 space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Filter size={20} className="text-[#D4AF37]"/> Categories
              </h3>
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-300 transform active:scale-95 ${
                        activeCategory === category 
                          ? 'bg-[#166534] text-white font-bold shadow-md' 
                          : 'text-gray-600 hover:bg-[#eaf5ef] hover:text-[#166534] font-medium'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="mb-8 relative transition-all active:scale-[0.99]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] shadow-sm font-medium"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
              </div>
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#D4AF37] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#166534] transition active:scale-95"
              >
                Search
              </button>
            </form>

            {/* Products Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#166534]"></div>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-100 mt-4 animate-fade-in-up">
                <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-6">
                  <ShoppingBag size={40} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">We couldn't find any products in this category at the moment.</p>
                <button 
                  onClick={() => {setSearchTerm(''); handleCategoryChange('All');}}
                  className="bg-[#166534] text-white font-bold px-6 py-3 rounded-full hover:bg-[#D4AF37] active:scale-95 transition-all"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
