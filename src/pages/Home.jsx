import React, { useEffect, useState, useRef, memo } from 'react';
import { ArrowRight, Truck, Shield, Headphones, MessageCircle, ChevronDown, Plus, Minus, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard';

// ─── CountUp Component ──────────────────────────────────────────────────────
const CountUp = memo(({ end, duration = 2500, suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let v = 0;
    const step = end / (duration / 16);
    const t = setInterval(() => {
      v += step;
      if (v >= end) { setCount(end); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [started, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
});

// ─── FAQ Item Component ────────────────────────────────────────────────────────
const FAQItem = memo(({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`border-2 rounded-2xl transition-all duration-300 ${isOpen ? 'border-[#132A13] bg-white shadow-md' : 'border-green-100 bg-white/50 hover:border-green-300'}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <span className={`text-[17px] font-bold transition-colors duration-300 ${isOpen ? 'text-[#132A13]' : 'text-[#0d1e0d]'}`}>{faq.q}</span>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#132A13] text-white rotate-180' : 'bg-green-100 text-[#132A13]'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-60 opacity-100 pb-5 px-5' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-600 leading-relaxed font-medium">{faq.a}</p>
      </div>
    </div>
  );
});

// ─── Scroll Reveal Hook ─────────────────────────────────────────────────────
const useReveal = (threshold = 0.2) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

// ─── Exclusive Card Component ───────────────────────────────────────────────
const ExclusiveRow = memo(({ exc, idx }) => {
  const [ref, visible] = useReveal(0.15);
  const isEven = idx % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 transition-all duration-1000 ease-out
        ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}
        ${visible ? 'opacity-100 translate-x-0' : isEven ? 'opacity-0 translate-x-20' : 'opacity-0 -translate-x-20'}`}
    >
      {/* Image */}
      <div className="w-full md:w-1/2">
        <div className="rounded-3xl overflow-hidden shadow-2xl relative group">
          <img
            src={exc.img}
            alt={exc.title}
            loading="lazy"
            className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-110 transition duration-700"
            onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80'; }}
          />
          <div className="absolute top-4 left-4 bg-[#D4AF37] text-white font-bold px-4 py-1 rounded-full shadow-lg">
            {exc.badge}
          </div>
        </div>
      </div>
      {/* Text */}
      <div className="w-full md:w-1/2 px-4">
        <h3 className="text-3xl md:text-4xl font-extrabold text-[#132A13] mb-6 leading-tight">{exc.title}</h3>
        <p className="text-gray-700 text-lg mb-8 leading-relaxed">{exc.desc}</p>
        <Link to="/products" className="inline-flex items-center gap-2 border-2 border-[#132A13] text-[#132A13] font-bold px-8 py-3 rounded-full hover:bg-[#132A13] hover:text-white transition-all duration-300 group">
          Explore Product <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
});

// ─── Main Home Component ────────────────────────────────────────────────────
const Home = () => {
  const { products, fetchProducts, isLoading } = useProductStore();
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const heroBanners = [
    { img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80', title: 'High Quality Seeds', subtitle: 'Rich and Sweet Yield', badge: '#1 Agriculture Platform' },
    { img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80', title: 'Advanced Fertilizers', subtitle: 'Boost Your Crop Growth', badge: '100% Organic Options' },
    { img: 'https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&w=1200&q=80', title: 'Crop Protection', subtitle: 'Safe and Secure Harvests', badge: 'Verified Pesticides' },
    { img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80', title: 'Modern Equipment', subtitle: 'Empower Your Farming', badge: 'Heavy Duty Tools' },
    { img: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1200&q=80', title: 'Irrigation Solutions', subtitle: 'Save Water, Grow More', badge: 'Smart Farming' },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveBanner(p => (p + 1) % heroBanners.length), 5000);
    return () => clearInterval(t);
  }, []);

  const categories = [
    { name: 'SEEDS', link: 'SEEDS', bg: 'bg-gradient-to-tr from-[#132A13] to-[#0d1e0d]', icon: '🌱' },
    { name: 'CROP NUTRITION', link: 'CROP NUTRITION', bg: 'bg-gradient-to-tr from-[#132A13] to-[#0d1e0d]', icon: '🧪' },
    { name: 'CROP PROTECTION', link: 'CROP PROTECTION', bg: 'bg-gradient-to-tr from-[#D4AF37] to-[#b8962c]', icon: '🛡️' },
    { name: 'GARDEN CARE', link: 'GARDEN CARE', bg: 'bg-gradient-to-tr from-[#132A13] to-[#0d1e0d]', icon: '🧑‍🌾' },
    { name: 'BOGO OFFERS', link: 'BUY 1 GET 1 FREE', bg: 'bg-gradient-to-tr from-[#D4AF37] to-[#b8962c]', icon: '🎁' },
    { name: 'SUPER COMBO', link: 'SUPER COMBO', bg: 'bg-gradient-to-tr from-[#132A13] to-[#0d1e0d]', icon: '📦' },
    { name: 'AGRI EQUIPMENT', link: 'AGRI EQUIPMENT', bg: 'bg-gradient-to-tr from-[#132A13] to-[#0d1e0d]', icon: '🚜' },
    { name: 'IRRIGATION', link: 'IRRIGATION', bg: 'bg-gradient-to-tr from-[#132A13] to-[#0d1e0d]', icon: '💦' },
  ];

  const exclusives = [
    { img: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80', title: 'Premium Hybrid Seeds', badge: 'Top Pick', desc: 'Get the highest quality hybrid seeds with minimum 95% germination rate. Perfectly calibrated and matched for your local soil conditions, ensuring a reliable and abundant harvest every single season.' },
    { img: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=800&q=80', title: 'Organic Nutrition Mix', badge: 'Massive Offer', desc: 'Boost your crops naturally with our perfectly blended organic fertilizers. Rich in micronutrients and bio-stimulants, this mix dramatically improves soil health and yield volume.' },
    { img: 'https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&w=800&q=80', title: 'Advanced Crop Protection', badge: 'Protect', desc: 'Keep your yields safe from unpredictable pests and diseases. Our extensive range of certified organic and chemical protectors shield your crops at all vulnerable stages of growth.' },
    { img: 'https://images.unsplash.com/photo-1596701062351-be999e4a8ea5?auto=format&fit=crop&w=800&q=80', title: 'Precision Irrigation', badge: 'Save Water', desc: 'Optimize your water usage with our next-generation drip and sprinkler systems. Reduce water waste by up to 50% while ensuring uniform moisture for all your crops.' }
  ];

  const brands = [
    { name: 'Farmigo Agro', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80' },
    { name: 'Harvidh Green', logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=100&q=80' },
    { name: 'Vermi Veda', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=100&q=80' },
    { name: 'NACL Industries', logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=100&q=80' },
    { name: 'Dhanuka', logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=100&q=80' },
    { name: 'IFFCO Organic', logo: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=100&q=80' },
  ];

  return (
    <div className="bg-[#f1f4f1] min-h-screen font-sans overflow-hidden">

      {/* ── Hero Slider ── */}
      <div className="w-full relative bg-[#132A13] h-[450px] md:h-[600px] overflow-hidden">
        <div className="flex h-full transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${activeBanner * 100}%)` }}>
          {heroBanners.map((b, idx) => (
            <div key={idx} className="min-w-full h-full relative flex items-center">
              <div className="px-6 sm:px-10 lg:px-24 z-10 max-w-3xl">
                <div className="inline-block bg-[#D4AF37] text-[#132A13] font-extrabold px-3 py-1 rounded text-sm sm:text-lg mb-6 shadow-xl">{b.badge}</div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#eaf5ef] mb-4 leading-tight drop-shadow-lg">
                  {b.title},<br /><span className="text-[#D4AF37]">{b.subtitle}</span>
                </h1>
                <p className="text-gray-200 mb-8 max-w-xl text-sm md:text-lg">Empowering farmers with premium agriculture setups, advanced crop nutrition, and trusted delivery across the nation.</p>
                <Link to="/products" className="bg-[#D4AF37] text-white text-lg font-bold px-10 py-4 rounded shadow-[0_10px_20px_rgba(212,175,55,0.4)] hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-3 group">
                  Shop Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              <div className="absolute right-0 h-full w-[60%] hidden md:block">
                <img src={b.img} loading="lazy" className="h-full w-full object-cover rounded-l-[100px] shadow-2xl" alt="" onError={e => { e.target.style['display'] = 'none'; }} />
                <div className="absolute inset-0 bg-gradient-to-r from-[#132A13] via-[#132A13]/80 to-transparent" />
              </div>
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
          {heroBanners.map((_, idx) => (
            <button key={idx} onClick={() => setActiveBanner(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${idx === activeBanner ? 'w-10 bg-[#D4AF37]' : 'w-3 bg-white/50 hover:bg-white'}`} />
          ))}
        </div>
      </div>

      {/* ── Feature Strip ── */}
      <div className="bg-white py-8 border-b-4 border-[#132A13] shadow-md relative z-20 -mt-6 mx-4 rounded-xl md:mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row justify-around items-center gap-6">
          {[{ icon: <Headphones size={32} />, label: 'FARMER SUPPORT' }, { icon: <Shield size={32} />, label: 'SAFE PAYMENT' }, { icon: <Truck size={32} />, label: 'FAST DELIVERY' }].map(f => (
            <div key={f.label} className="flex items-center gap-4 text-[#132A13] font-bold text-lg md:text-xl group">
              <div className="bg-[#f0f7f0] p-4 rounded-full group-hover:scale-110 transition-transform">{f.icon}</div> {f.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="max-w-[1400px] mx-auto px-4 py-16 text-center">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-1 w-12 bg-[#D4AF37]" />
          <h2 className="text-3xl font-extrabold text-[#132A13] uppercase tracking-wide section-title">Essential Categories</h2>
          <div className="h-1 w-12 bg-[#D4AF37]" />
        </div>
        <div className="flex overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory px-4 touch-pan-x gap-6 lg:justify-center">
          {categories.map((cat, idx) => (
            <Link to={`/products?category=${encodeURIComponent(cat.link)}`} key={idx}
              className="flex flex-col items-center w-28 shrink-0 snap-center group coin-container cursor-pointer">
              <div className={`coin w-28 h-28 rounded-full ${cat.bg} p-1 mb-4 shadow-[0_8px_20px_rgba(19,42,19,0.3)] transition-all duration-700 flex items-center justify-center text-4xl text-white`}>
                <div className="w-full h-full rounded-full border-2 border-white/20 flex items-center justify-center bg-black/10">{cat.icon}</div>
              </div>
              <span className="text-xs font-extrabold text-[#132A13] uppercase leading-snug tracking-wider bg-white px-3 py-1 rounded-full shadow-sm mt-3 group-hover:bg-[#132A13] group-hover:text-white transition-colors duration-300">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── TODAY OFFERS ── */}
      <div className="bg-[#132A13] py-16 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex justify-between items-end mb-10 px-2">
            <div>
              <div className="inline-block bg-[#D4AF37] text-white text-xs font-bold px-3 py-1 rounded-full mb-3 animate-pulse uppercase tracking-wider">LIMITED TIME DEALS</div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-2 section-title">Today's Offers</h2>
              <p className="text-white/80 font-medium text-lg">Exclusive agricultural deals refreshed every day — Grab them now!</p>
            </div>
            <Link to="/products?category=BUY 1 GET 1 FREE" className="hidden sm:inline-flex items-center gap-2 bg-[#D4AF37] text-white font-bold px-6 py-2 rounded-full hover:bg-yellow-500 transition shadow-lg group">View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-24"><div className="animate-spin rounded-full h-14 w-14 border-b-4 border-[#D4AF37]" /></div>
          ) : (
            <div className="relative group/marquee">
              {/* Scroll Container for Manual Control & Mobile */}
              <div className="overflow-x-auto hide-scrollbar snap-x touch-pan-x cursor-grab active:cursor-grabbing pb-6">
                <div className="flex gap-4 md:gap-8 marquee-track-reverse">
                  {/* Duplicating items for seamless marquee loop */}
                  {[...products.slice(6, 14), ...products.slice(6, 14)].map((p, idx) => (
                    <div key={`${p._id}-${idx}`} className="w-[260px] md:w-[320px] shrink-0 snap-center transform hover:-translate-y-2 transition-transform duration-500">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Indicators (visible on group hover) */}
              <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between pointer-events-none opacity-0 group-hover/marquee:opacity-100 transition-opacity duration-300">
                <div className="bg-black/20 backdrop-blur-md p-3 rounded-full text-white/50"><ChevronDown size={24} className="rotate-90" /></div>
                <div className="bg-black/20 backdrop-blur-md p-3 rounded-full text-white/50"><ChevronDown size={24} className="-rotate-90" /></div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden px-4">
            <Link to="/products" className="inline-flex items-center gap-2 bg-[#D4AF37] text-white font-bold w-full justify-center py-4 rounded-xl hover:bg-yellow-500 transition shadow-lg">See All Offers</Link>
          </div>
        </div>
      </div>

      {/* ── Today's Offers Feature Strip ── */}
      <div className="bg-[#f0f7f0] py-6 border-b border-[#132A13]/10">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-wrap justify-around items-center gap-6">
            {[
              { icon: <Truck size={32} strokeWidth={1.8} className="text-black" />, label: 'COD Available' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>, label: 'Easy Exchange' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>, label: 'Assured Quality' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>, label: 'Handpicked' },
            ].map(f => (
              <div key={f.label} className="flex flex-col items-center gap-2 group">
                <div className="group-hover:scale-125 transition-transform duration-300">{f.icon}</div>
                <span className="text-xs font-bold text-black uppercase tracking-wide">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Platform Exclusives ── */}
      <div className="bg-[#f0f7f0] py-16 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center text-[#132A13] mb-16 tracking-widest uppercase section-title">Platform Exclusives</h2>
          <div className="space-y-16">
            {exclusives.map((exc, idx) => (
              <ExclusiveRow key={idx} exc={exc} idx={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Best Selling ── */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#132A13] mb-2 section-title">Best Selling</h2>
              <p className="text-gray-500 font-medium text-lg">Top picked products loved by farmers!</p>
            </div>
            <Link to="/products" className="hidden sm:inline-flex items-center gap-2 bg-[#D4AF37] text-white font-bold px-6 py-2 rounded-full hover:bg-yellow-600 transition">View All <ArrowRight size={18} /></Link>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#132A13]" /></div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {products.slice(0, 12).map(p => (
                <div key={p._id} className="transform hover:-translate-y-2 transition-transform duration-300">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 bg-[#132A13] text-white font-bold px-8 py-3 rounded-full hover:bg-[#D4AF37] transition">View All</Link>
          </div>
        </div>
      </div>


      {/* ── Stats Counter (above Brands) ── */}
      <div id="stats-section" className="py-14" style={{ background: 'linear-gradient(135deg, #0d1e0d 0%, #132A13 50%, #1a3d1a 100%)' }}>
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { end: 40, label: 'Agri Brands' },
              { end: 3000, label: 'Agri Seller Community', duration: 3000 },
              { end: 600, label: 'Products', duration: 2500 },
              { end: 19000, label: 'Pincodes Delivery', duration: 3500 },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center justify-center group">
                <h3 className="text-4xl md:text-6xl font-black mb-2 text-[#D4AF37] drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CountUp end={s.end} duration={s.duration || 2500} />
                </h3>
                <div className="h-0.5 w-10 bg-[#D4AF37]/50 mx-auto mb-2 rounded-full" />
                <p className="text-sm font-semibold text-white/90 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ (Frequently Asked Questions) ── */}
      <div className="bg-[#f0f7f0] py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#132A13] uppercase section-title mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 font-medium tracking-wide">Everything you need to know about GREEN FSP</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "How can I track my order?", a: "You can track your order by clicking the 'Track Order' button in the navbar and entering your Order ID or mobile number. You'll see real-time updates of your delivery status!" },
              { q: "What is GREEN FSP?", a: "GREEN FSP is a premium agricultural marketplace connecting farmers with high-quality seeds, fertilizers, and equipment from verified brands and sellers." },
              { q: "How do I become a seller?", a: "Growing your business with us is easy! Click on 'Become a Seller' in the top bar, fill in your farm details, and our team will get in touch with you within 24 hours." },
              { q: "Is cash on delivery available?", a: "Yes! We provide Cash on Delivery (COD) for most locations across India to ensure a safe and trustworthy shopping experience for our farmers." }
            ].map((faq, idx) => (
              <FAQItem key={idx} faq={faq} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Floating AI Assistant ── */}
      <div className="fixed bottom-8 right-8 z-[100] group">
        <div className="absolute -inset-2 bg-green-200 rounded-full animate-ping opacity-25 group-hover:opacity-50"></div>
        <button className="relative w-14 h-14 bg-[#132A13] hover:bg-[#D4AF37] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(19,42,19,0.4)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 transform group-hover:scale-110 group-active:scale-95 border-2 border-white">
          <Bot size={28} className="animate-bounce" style={{ animationDuration: '3s' }} />
        </button>
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-green-100 text-[#132A13] font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
          How can I help you today?
        </div>
      </div>

      {/* ── Trusted Top Brands Marquee ── */}
      <div className="bg-white py-16 border-t border-b border-[#132A13]/20 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-4 mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-[#132A13] uppercase section-title">Trusted Top Brands</h2>
        </div>
        <div className="marquee-track flex items-center">
          {[...brands, ...brands, ...brands, ...brands, ...brands].map((brand, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center mx-6 sm:mx-10 shrink-0 w-32 group">
                <div className="h-20 w-20 bg-white border-2 border-gray-200 rounded-full mb-4 shadow-sm flex items-center justify-center overflow-hidden group-hover:border-[#D4AF37] transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  <img
                    src={brand.logo}
                    className="w-full h-full object-cover"
                    alt={brand.name}
                    onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=100&q=80'; }}
                  />
                </div>
                <span className="text-sm text-[#132A13] font-extrabold text-center uppercase tracking-wide group-hover:text-[#D4AF37] transition-colors">{brand.name}</span>
              </div>
              <div className="text-[#D4AF37] text-2xl flex items-center mx-2 animate-pulse">★</div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Coin flip */
        .coin-container:hover .coin { transform: rotateY(180deg); }

        /* Section Title Animation */
        @keyframes titleSlideIn {
          0%   { opacity: 0; transform: translateY(24px) scale(0.97); letter-spacing: 0.3em; }
          60%  { opacity: 1; transform: translateY(-4px) scale(1.01); letter-spacing: inherit; }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .section-title {
          animation: titleSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          background: linear-gradient(90deg, currentColor 0%, #D4AF37 50%, currentColor 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleSlideIn 0.8s ease-out forwards, shimmer 3s linear 0.8s infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* Marquee */
        .marquee-track {
          width: max-content;
          animation: marqueeRight 35s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marqueeRight {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-track-reverse {
          width: max-content;
          animation: marqueeLeft 40s linear infinite;
        }
        .marquee-track-reverse:hover, .marquee-track-reverse:active { animation-play-state: paused; }
        @keyframes marqueeLeft {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      ` }} />
    </div>
  );
};

export default memo(Home);
