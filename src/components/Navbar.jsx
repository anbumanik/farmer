import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, MapPin, Search, ChevronDown, CircleUserRound, LayoutDashboard, Truck, LogOut, Menu, X, Sprout, Headset, LogIn } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { cart } = useCartStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isLorryArrived, setIsLorryArrived] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [language, setLanguage] = useState('EN');
  const [langOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleTrackClick = (e) => {
    e.preventDefault();
    setIsTrackOrderOpen(true);
    setIsLorryArrived(false);
    setTimeout(() => {
      setIsLorryArrived(true);
    }, 2000);
  };

  const navLinks = [
    "SEEDS", "CROP NUTRITION", "CROP PROTECTION", "GARDEN CARE", 
    "BUY 1 GET 1 FREE", "SUPER COMBO", "AGRI EQUIPMENT", "IRRIGATION", "TOP BRANDS"
  ];

  return (
    <>
      <nav className={`bg-white sticky top-0 z-40 w-full shadow-md flex flex-col transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        {/* Top Green Bar */}
        <div className="bg-[#166534] text-white text-xs py-1 px-4 md:px-8 flex justify-between items-center hide-on-mobile">
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#D4AF37] transition text-sm font-medium group">
            <Sprout size={14} className="animate-sprout group-hover:text-[#D4AF37]" /> Become a Seller
          </div>
          <div className="flex items-center gap-1 bg-[#D4AF37] text-white rounded px-3 py-1 font-bold cursor-pointer hover:bg-yellow-600 transition group">
            <Headset size={14} className="animate-ring" /> Call To Order: +918825518989
          </div>
        </div>

        {/* Promo Top Strip under Top bar */}
        <div className="bg-gray-50 flex justify-center py-1.5 border-b border-gray-200 hide-on-mobile text-xs font-semibold gap-4 overflow-hidden">
           <span className="bg-[#eaf5ef] text-[#166534] px-3 py-1 rounded-full border border-[#166534]/20 border-dashed animate-pulse">Get Free Delivery on Purchase Above ₹499.</span>
        </div>

        {/* Main Navbar */}
        <div className="max-w-[1400px] w-full mx-auto px-4 py-3 flex items-center justify-between gap-4 lg:gap-8">
          
          <div className="flex items-center gap-4">
            {/* Hamburger Icon for Mobile */}
            <button className="lg:hidden text-[#166534]" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>

            {/* Logo & Location */}
            <div className="flex items-center lg:gap-6 flex-shrink-0 animate-fade-in">
              <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                <img src="/logo.png" alt="GREEN FSP" className="h-12 w-12 object-contain rounded-full" />
                <span className="hidden sm:flex flex-col leading-tight">
                  <span className="text-[#D4AF37] text-lg font-extrabold tracking-tight">GREEN</span>
                  <span className="text-[#166534] text-sm font-black tracking-widest">FSP</span>
                </span>
              </Link>
              
              <div className="hidden lg:flex items-start gap-1 text-[11px] ml-4 text-gray-600">
                <MapPin size={16} className="text-[#D4AF37] mt-0.5 animate-bounce" style={{ animationDuration: '2s'}} />
                <div className="leading-tight">
                  <span className="block text-gray-400">Deliver to Location not detected</span>
                  <span className="font-semibold text-gray-700 cursor-pointer hover:text-[#D4AF37]">Update location</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-[650px] relative h-10 border-2 border-[#166534]/20 focus-within:border-[#D4AF37] rounded-md bg-white transition-colors duration-300">
            <div className="flex items-center bg-gray-50 rounded-l-md px-3 border-r border-[#166534]/20 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
              All <ChevronDown size={14} className="ml-1" />
            </div>
            <input 
              type="text" 
              placeholder="Search for seeds, fertilizers & more..." 
              className="w-full px-3 h-full outline-none text-sm placeholder-gray-400 bg-transparent"
            />
            <button className="px-4 text-white bg-[#166534] hover:bg-[#D4AF37] transition-colors rounded-r-sm flex items-center justify-center">
              <Search size={18} />
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-5 text-[11px] font-medium text-gray-600 ml-auto">
            
            <Link to="/dashboard" className="hidden lg:flex flex-col items-center gap-1 hover:text-[#D4AF37] transition-colors cursor-pointer group">
              <div className="relative">
                <LayoutDashboard size={22} className="text-[#166534] group-hover:text-[#D4AF37] transition-colors group-hover:scale-110 transform transition-transform" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#D4AF37] rounded-full animate-ping opacity-75"></span>
              </div>
              <span>Seller</span>
            </Link>
            
            <button onClick={handleTrackClick} className="hidden sm:flex flex-col items-center gap-1 hover:text-[#D4AF37] transition-colors cursor-pointer group">
              <Truck size={22} className="text-[#166534] group-hover:text-[#D4AF37] transition-colors transform group-hover:translate-x-1" />
              <span>Track Order</span>
            </button>

            <Link to="/cart" className="flex flex-col items-center gap-1 hover:text-[#D4AF37] transition-colors cursor-pointer relative group">
               <div className="relative transform group-hover:scale-110 transition-transform">
                 <ShoppingBag size={22} className="text-[#166534] group-hover:text-[#D4AF37] group-hover:rotate-6 transition-all duration-300" />
                 <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                   {cart?.length || 0}
                 </span>
               </div>
               <span>Cart</span>
            </Link>

            {isAuthenticated ? (
              <div className="relative group cursor-pointer">
                <div className="flex flex-col items-center gap-1 hover:text-[#D4AF37] transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#166534] to-[#1a7a40] text-white flex items-center justify-center font-bold text-xs shadow-md group-hover:ring-2 group-hover:ring-[#D4AF37] transition-all">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[#166534] font-bold max-w-[60px] truncate">{user?.name}</span>
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 border border-gray-100 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div onClick={() => setIsAuthModalOpen(true)} className="flex flex-col items-center gap-1 hover:text-[#D4AF37] transition-colors cursor-pointer group">
                <LogIn size={22} className="text-[#166534] group-hover:text-[#D4AF37] group-hover:translate-x-1 transform transition-transform duration-300" />
                <span>Login</span>
              </div>
            )}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(p => !p)}
                className={`flex items-center gap-1 text-[11px] font-bold text-[#166534] px-2 py-1 rounded border-2 transition-all duration-300 ${
                  langOpen ? 'border-[#166534] lang-spin' : 'border-[#166534]/40 hover:border-[#166534]'
                }`}
              >
                <span>{language === 'EN' ? '🇬🇧' : '🇮🇳'}</span>
                <span>{language}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-white rounded-lg shadow-xl border border-[#166534]/20 overflow-hidden z-50">
                  {[{ code: 'EN', label: 'English', flag: '🇬🇧' }, { code: 'TA', label: 'தமிழ்', flag: '🇮🇳' }].map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold transition-colors ${
                        language === l.code ? 'bg-[#166534] text-white' : 'text-gray-700 hover:bg-[#eaf5ef] hover:text-[#166534]'
                      }`}
                    >
                      <span>{l.flag}</span><span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sub-Navbar / Categories (Desktop) */}
        <div className="border-t border-b border-gray-200 bg-[#166534] hidden lg:block shadow-inner">
          <div className="max-w-[1400px] w-full mx-auto px-4 overflow-x-auto hide-scrollbar">
            <ul className="flex items-center justify-center gap-8 whitespace-nowrap text-[13px] font-bold text-white py-3">
              {navLinks.map((link) => (
                <li key={link} className="relative group">
                  <Link to={`/products?category=${link}`} className="hover:text-[#D4AF37] transition-colors tracking-wide">
                    {link}
                  </Link>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative flex w-4/5 max-w-sm flex-col bg-white h-full shadow-2xl animate-slide-right">
            <div className="flex items-center justify-between p-4 border-b bg-[#166534] text-white">
              <span className="text-xl font-bold text-[#D4AF37]">GREEN FSP</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
            </div>
            <div className="overflow-y-auto p-4 flex-1">
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Categories</h3>
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <li key={link} onClick={() => setIsMobileMenuOpen(false)}>
                      <Link to={`/products?category=${link}`} className="block text-gray-800 font-medium hover:text-[#D4AF37] active:scale-95 transition-transform">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t pt-4 space-y-4">
                 <button onClick={() => { setIsMobileMenuOpen(false); handleTrackClick({preventDefault:()=>{} }); }} className="flex items-center gap-3 text-gray-800 font-medium">
                   <Truck size={20} className="text-[#166534]" /> Track Order
                 </button>
                 <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-800 font-medium">
                   <Store size={20} className="text-[#166534]" /> Become a Seller
                 </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Track Order Animation Modal */}
      {isTrackOrderOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsTrackOrderOpen(false)}></div>
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 animate-fade-in-up">
            <button onClick={() => setIsTrackOrderOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 z-10"><X size={24} /></button>
            
            <div className="bg-[#eaf5ef] p-6 text-center border-b-4 border-[#166534] relative overflow-hidden">
               {/* Lorry Animation container */}
               <div className="w-full h-16 relative mt-4 border-b-2 border-dashed border-[#166534]/30">
                 <div className={`absolute bottom-0 text-[#166534] transition-all duration-[2000ms] ease-in-out ${isLorryArrived ? 'left-[80%]' : 'left-0'}`}>
                   <Truck size={40} className={`transform ${isLorryArrived ? 'scale-110 text-[#D4AF37]' : ''} transition-all`} />
                 </div>
               </div>
               <h3 className="text-xl font-bold mt-4 text-[#166534]">
                 {isLorryArrived ? 'Ready to Track!' : 'Fetching Delivery System...'}
               </h3>
            </div>

            <div className={`p-6 transition-all duration-500 ${isLorryArrived ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-gray-600 mb-4 text-sm">Enter your tracking ID or Mobile number to trace your order instantly.</p>
              <div className="flex flex-col gap-3">
                <input 
                  type="text" 
                  placeholder="Order ID / Mobile Number" 
                  className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#D4AF37] outline-none rounded-xl transition-colors"
                />
                <button className="w-full bg-[#166534] text-white font-bold py-3 rounded-xl hover:bg-[#D4AF37] hover:shadow-lg transition-all active:scale-95">
                   Track Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-on-mobile { @media (max-width: 768px) { display: none !important; } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes slideRight { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .animate-slide-right { animation: slideRight 0.3s ease-out forwards; }
        
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }

        @keyframes langBorderSpin {
          0%   { border-color: #166534; box-shadow: 0 0 0 0 rgba(22,101,52,0.5); }
          50%  { border-color: #D4AF37; box-shadow: 0 0 8px 2px rgba(212,175,55,0.4); }
          100% { border-color: #166534; box-shadow: 0 0 0 0 rgba(22,101,52,0.5); }
        }
        .lang-spin { animation: langBorderSpin 1s ease-in-out infinite; }

        @keyframes sproutPop {
          0%,100% { transform: scale(1) rotate(0deg); }
          30%     { transform: scale(1.3) rotate(-10deg); }
          60%     { transform: scale(1.1) rotate(8deg); }
        }
        .animate-sprout { animation: sproutPop 2.5s ease-in-out infinite; }

        @keyframes ringShake {
          0%,100% { transform: rotate(0deg); }
          10%,30% { transform: rotate(-15deg); }
          20%,40% { transform: rotate(15deg); }
          50%     { transform: rotate(0deg); }
        }
        .animate-ring { animation: ringShake 2s ease-in-out infinite; transform-origin: top center; }
      `}} />
    </>
  );
};

export default Navbar;
