import React, { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, fetchCart, updateQuantity, removeFromCart, clearCart, isLoading } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <ShoppingBag size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Please login to view your cart</h2>
        <p className="text-gray-500 mb-8 max-w-md">You need to have an account to add items to your cart and place orders.</p>
        <button onClick={() => navigate('/')} className="bg-[#D4AF37] text-white px-6 py-3 rounded-full font-medium hover:bg-[#004700]">
          Return Home
        </button>
      </div>
    );
  }

  const handleUpdateQty = (productId, currentQty, amount) => {
    const newQty = currentQty + amount;
    if (newQty < 1) return;
    updateQuantity(productId, newQty);
  };

  const handleCheckout = () => {
    toast.success('Proceeding to checkout...');
    // implement checkout logic here (create order)
  };

  const totalItemPrice = cart?.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0) || 0;
  const deliveryFee = totalItemPrice > 500 ? 0 : 50;
  const finalTotal = totalItemPrice + (cart?.length > 0 ? deliveryFee : 0);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
          </div>
        ) : !cart || cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={48} className="text-[#D4AF37]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any fresh produce to your cart yet.</p>
            <Link to="/products" className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-bold hover:bg-[#004700] shadow-md">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="flex-1">
              <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                  <h2 className="text-xl font-bold text-gray-800">Cart Items ({cart.length})</h2>
                  <button onClick={clearCart} className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1">
                    <Trash2 size={16} /> Clear All
                  </button>
                </div>

                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    item.product && (
                      <li key={item.product._id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50 transition">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1 w-full flex flex-col sm:flex-row justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{item.product.name}</h3>
                            <p className="text-sm text-[#D4AF37] font-medium mt-1">{item.product.category}</p>
                            <p className="text-lg font-bold text-gray-700 mt-2">₹{item.product.price} <span className="text-sm font-normal text-gray-500">/ kg</span></p>
                          </div>

                          <div className="flex items-center gap-6 mt-4 sm:mt-0">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => handleUpdateQty(item.product._id, item.quantity, -1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-4 py-1 text-gray-900 font-medium border-x border-gray-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQty(item.product._id, item.quantity, 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">₹{item.product.price * item.quantity}</p>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product._id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2"
                              title="Remove item"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96">
              <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">₹{totalItemPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-gray-900">
                      {deliveryFee === 0 ? <span className="text-[#D4AF37] font-bold">Free</span> : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-extrabold text-[#004700]">₹{finalTotal}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-gray-500 text-center mt-2">Add ₹{500 - totalItemPrice} more for FREE delivery!</p>
                  )}
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#D4AF37] hover:bg-[#004700] text-white font-bold py-4 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={20} />
                </button>

                <div className="mt-4 text-center">
                  <Link to="/products" className="text-[#D4AF37] font-medium hover:underline">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
