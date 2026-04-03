import React from 'react';
import { useWishlistStore } from '../store/wishlistStore';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, clearWishlist } = useWishlistStore();

  return (
    <div className="bg-[#f1f4f1] min-h-screen py-12">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-[#132A13] flex items-center gap-3">
            <Heart size={32} className="text-[#D4AF37]" fill="#D4AF37" /> My Wishlist
          </h1>
          {wishlist.length > 0 && (
            <button 
              onClick={clearWishlist}
              className="text-[#132A13] hover:text-red-600 font-bold text-sm underline underline-offset-4"
            >
              Clear All
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-green-100 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={48} className="text-[#D4AF37]" />
            </div>
            <h2 className="text-2xl font-bold text-[#132A13] mb-3">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Save items you like to find them easily later!</p>
            <Link to="/products" className="inline-flex items-center gap-2 bg-[#132A13] text-white font-bold px-8 py-3 rounded-full hover:bg-[#D4AF37] transition-all transform hover:scale-105">
              Start Exploring <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
