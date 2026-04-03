import React from 'react';
import { Link } from 'react-router-dom';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const Footer = () => {
  return (
    <footer className="w-full font-sans">
      {/* Main Footer Section */}
      <div className="bg-[#166534] pt-10 pb-6 text-white text-sm">
        <div className="max-w-[1200px] mx-auto px-4">
          
          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-10">
            <a href="#" className="h-10 w-10 min-w-[40px] rounded-full bg-[#D4AF37] flex items-center justify-center hover:bg-[#eaf5ef] hover:text-[#166534] transition shadow-[0_0_10px_rgba(167,144,87,0.5)]">
              <FacebookIcon />
            </a>
            <a href="#" className="h-10 w-10 min-w-[40px] rounded-full bg-[#D4AF37] flex items-center justify-center hover:bg-[#eaf5ef] hover:text-[#166534] transition shadow-[0_0_10px_rgba(167,144,87,0.5)]">
              <InstagramIcon />
            </a>
            <a href="#" className="h-10 w-10 min-w-[40px] rounded-full bg-[#D4AF37] flex items-center justify-center hover:bg-[#eaf5ef] hover:text-[#166534] transition shadow-[0_0_10px_rgba(167,144,87,0.5)]">
              <TwitterIcon />
            </a>
            <a href="#" className="h-10 w-10 min-w-[40px] rounded-full bg-[#D4AF37] flex items-center justify-center hover:bg-[#eaf5ef] hover:text-[#166534] transition shadow-[0_0_10px_rgba(167,144,87,0.5)]">
              <YoutubeIcon />
            </a>
            <a href="#" className="h-10 w-10 min-w-[40px] rounded-full bg-[#D4AF37] flex items-center justify-center hover:bg-[#eaf5ef] hover:text-[#166534] transition shadow-[0_0_10px_rgba(167,144,87,0.5)]">
              <LinkedinIcon />
            </a>
          </div>

          {/* Details Section */}
          <div className="text-center mb-10">
            <h3 className="text-[#D4AF37] font-bold tracking-wider mb-4">OUR DETAILS</h3>
            <p className="text-gray-100 max-w-3xl mx-auto leading-relaxed text-[13px]">
              GREEN FSP – One-stop destination for all agricultural products & services 
              with trusted quality agri products, expert guidance & nationwide delivery.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center pb-8 border-b border-[#D4AF37]/40">
            {/* Column 1 */}
            <div>
              <h4 className="text-[#D4AF37] font-bold mb-4">ABOUT US</h4>
              <ul className="space-y-2 text-[13px] text-gray-200">
                <li><Link to="/about" className="hover:text-white transition">About</Link></li>
                <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link to="/support" className="hover:text-white transition">Help & Support</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-[#D4AF37] font-bold mb-4">IMPORTANT LINKS</h4>
              <ul className="space-y-2 text-[13px] text-gray-200">
                <li><Link to="/dashboard" className="hover:text-white transition">Become a Seller</Link></li>
                <li><Link to="/track-order" className="hover:text-white transition">Track Order</Link></li>
                <li><Link to="/login" className="hover:text-white transition">Seller Login</Link></li>
                <li><Link to="/knowledge" className="hover:text-white transition">Knowledge</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-[#D4AF37] font-bold mb-4">OUR POLICY</h4>
              <ul className="space-y-2 text-[13px] text-gray-200">
                <li><Link to="/policy/return" className="hover:text-white transition">Return Policy</Link></li>
                <li><Link to="/policy/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link to="/policy/shipping" className="hover:text-white transition">Shipping Policy</Link></li>
                <li><Link to="/policy/terms" className="hover:text-white transition">Terms & Condition | Disclaimer</Link></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="text-[#D4AF37] font-bold mb-4">CATEGORIES</h4>
              <ul className="space-y-2 text-[13px] text-gray-200">
                <li><Link to="/products?category=Seeds" className="hover:text-white transition">Seeds</Link></li>
                <li><Link to="/products?category=Fertilizers" className="hover:text-white transition">Fertilizers</Link></li>
                <li><Link to="/products?category=Growth Promoters" className="hover:text-white transition">Growth Promoters</Link></li>
                <li><Link to="/products?category=Micronutrients" className="hover:text-white transition">Micronutrients</Link></li>
              </ul>
            </div>
          </div>

          {/* Copyright section */}
          <div className="pt-6 text-center text-gray-300 text-[12px]">
            &copy; 2022-2026 GREEN FSP. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
