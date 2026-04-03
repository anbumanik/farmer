import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#f1f4f1] px-4 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#D4AF37] blur-3xl opacity-20 rounded-full animate-pulse"></div>
        <AlertTriangle size={100} className="text-[#D4AF37] relative z-10 animate-bounce" />
      </div>
      
      <h1 className="text-8xl font-black text-[#132A13] mb-4">404</h1>
      <h2 className="text-3xl font-extrabold text-[#132A13] mb-6 uppercase tracking-widest">Page Not Found</h2>
      
      <p className="text-gray-600 max-w-md mb-10 text-lg font-medium">
        Oops! The field you're looking for doesn't exist or has been harvested. Let's get you back to familiar grounds.
      </p>
      
      <Link 
        to="/" 
        className="flex items-center gap-3 bg-[#132A13] text-white font-bold px-10 py-4 rounded-full shadow-2xl hover:bg-[#D4AF37] hover:scale-105 active:scale-95 transition-all duration-300 group"
      >
        <Home size={22} className="group-hover:-translate-y-1 transition-transform" /> 
        Return Home
      </Link>
      
      <button 
        onClick={() => window.history.back()}
        className="mt-6 flex items-center gap-2 text-[#132A13] font-bold hover:text-[#D4AF37] transition-colors"
      >
        <ArrowLeft size={18} /> Go Back
      </button>
    </div>
  );
};

export default NotFound;
