import React, { useState } from 'react';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuthStore();
  const { addToCart } = useCartStore();
  const { toggleWishlist, wishlist } = useWishlistStore();
  const navigate = useNavigate();
  
  const isInWishlist = wishlist.some(item => item._id === product._id);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(product._id, 1);
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    } finally {
      setIsAdding(false);
    }
  };

  // Mock fake original price and rating logic just for UI layout
  const origPrice = (product.price * 1.5).toFixed(2);
  const discount = Math.round(((origPrice - product.price) / origPrice) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col pt-3 relative active:scale-95 transform">

      {/* Discount Badge */}
      <div className="absolute top-0 left-0 bg-[#D4AF37] text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10 w-auto">
        ◆ {discount}% Off
      </div>

      {/* Wishlist Button */}
      <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className={`p-1.5 rounded-full shadow-md transition-all active:scale-95 ${
            isInWishlist ? 'bg-white text-[#D4AF37]' : 'bg-white text-gray-400 hover:text-[#004700]'
          }`}
        >
          <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Image Area */}
      <div className="h-44 flex items-center justify-center p-4 bg-white relative overflow-hidden group-hover:bg-gray-50 transition cursor-pointer">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=300&q=80'}
          alt={product.name}
          onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=300&q=80'; }}
          className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 border-t border-gray-100 bg-white">
        <div className="mb-2 cursor-pointer flex-1">
          <h3 className="text-sm text-gray-700 line-clamp-2 leading-snug">{product.name}</h3>

          {/* Star Ratings Placeholder */}
          <div className="flex text-[#D4AF37] mt-1 space-x-0.5">
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <Star size={12} className="text-gray-300" fill="currentColor" />
          </div>
        </div>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <span className="text-sm font-bold text-gray-800">₹{product.price.toFixed(2)}</span>
            <br />
            <span className="text-[11px] text-gray-400 line-through">₹{origPrice}</span>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className="bg-[#D4AF37] hover:bg-[#004700] text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer flex items-center justify-center gap-1 transition disabled:opacity-75"
          >
            {isAdding ? (
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
            ) : (
              <>Buy Now ▼</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
