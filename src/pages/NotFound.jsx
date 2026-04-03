import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#f1f4f1] px-4 text-center">
      <div className="relative mb-12 transform hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-[#D4AF37] blur-[120px] opacity-30 rounded-full"></div>
        <div className="relative bg-white/20 backdrop-blur-md p-10 rounded-full border border-white/30 shadow-2xl">
          <AlertTriangle size={120} className="text-[#D4AF37] animate-bounce" />
        </div>
      </div>
      
      <h1 className="text-9xl font-black text-[#132A13] mb-2 tracking-tighter select-none">404</h1>
      <h2 className="text-3xl font-extrabold text-[#0d1e0d] mb-6 uppercase tracking-widest bg-gradient-to-r from-[#132A13] to-[#D4AF37] bg-clip-text text-transparent italic">The Field is Empty!</h2>
      
      <p className="text-gray-600 max-w-lg mb-12 text-xl font-medium leading-relaxed italic opacity-80 px-4">
        "Even the best farmers get lost sometimes." <br />
        It seems you've wandered into an unplanted field. Let's get you back to the home farm.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <Link 
          to="/" 
          className="flex items-center gap-3 bg-[#132A13] text-white font-black px-12 py-5 rounded-2xl shadow-[0_15px_30px_rgba(19,42,19,0.3)] hover:bg-[#D4AF37] hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] hover:-translate-y-2 active:scale-95 transition-all duration-500 group"
        >
          <Home size={24} className="group-hover:-rotate-12 transition-transform" /> 
          RETURN TO HOME
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-3 text-[#132A13] font-black border-4 border-[#132A13] px-12 py-4 rounded-2xl hover:bg-[#132A13] hover:text-white transition-all duration-300"
        >
          GO BACK
        </button>
      </div>
    </div>
  );
};

export default NotFound;
