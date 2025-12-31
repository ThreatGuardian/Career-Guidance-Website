import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Linkedin, Eye, Lock, LayoutDashboard } from 'lucide-react';

interface ContactProps {
  onAdminClick?: () => void;
  isLoggedIn?: boolean;
}

const Contact: React.FC<ContactProps> = ({ onAdminClick, isLoggedIn }) => {
  const [viewCount, setViewCount] = useState<number>(15420);

  useEffect(() => {
    // Simple local simulation for view counter
    const stored = localStorage.getItem('site_views');
    const initial = stored ? parseInt(stored) : 15420;
    const newCount = initial + 1;
    setViewCount(newCount);
    localStorage.setItem('site_views', newCount.toString());
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="contact" className="bg-brand-navy text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-heading font-bold mb-6">Bhagwan Pandekar</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Guiding students towards a brighter future with expert career counseling and aptitude testing.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent hover:-translate-y-1 transition-all duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent hover:-translate-y-1 transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent hover:-translate-y-1 transition-all duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-white/20 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#hero" onClick={(e) => scrollToSection(e, '#hero')} className="text-gray-300 hover:text-white hover:pl-2 transition-all block">Home</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="text-gray-300 hover:text-white hover:pl-2 transition-all block">Services</a></li>
              <li><a href="#blog" onClick={(e) => scrollToSection(e, '#blog')} className="text-gray-300 hover:text-white hover:pl-2 transition-all block">Blog</a></li>
              <li><a href="#downloads" onClick={(e) => scrollToSection(e, '#downloads')} className="text-gray-300 hover:text-white hover:pl-2 transition-all block">Downloads</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-6 border-b border-white/20 pb-2 inline-block">Contact Us</h4>
            {/* Using grid-cols-1 on very small screens to ensure no overlap, md+ uses 2 cols */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              
              <div className="flex items-start gap-5 group">
                <div className="bg-brand-accent/20 p-3 rounded-lg shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                  <Phone className="text-brand-accent group-hover:text-white transition-colors" size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-400">Call Us</p>
                  <p className="font-medium text-lg text-white">+91 98223 73298</p>
                  <p className="text-sm text-gray-400 mt-1">Mon - Sat, 10am - 7pm</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="bg-brand-accent/20 p-3 rounded-lg shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                  <MessageCircle className="text-brand-accent group-hover:text-white transition-colors" size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-400">WhatsApp</p>
                  <p className="font-medium text-lg text-white">+91 98223 73298</p>
                  <a href="#" className="text-sm text-brand-accent hover:underline mt-1 inline-block">Chat Now</a>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="bg-brand-accent/20 p-3 rounded-lg shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                  <Mail className="text-brand-accent group-hover:text-white transition-colors" size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-400">Email</p>
                  {/* break-all ensures it wraps on tiny screens, break-words for normal wrapping */}
                  <p className="font-medium text-white break-all md:break-words">bhagwanpandekar@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="bg-brand-accent/20 p-3 rounded-lg shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                  <MapPin className="text-brand-accent group-hover:text-white transition-colors" size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-medium text-white">
                    Bavdhan, Pune - 411021
                  </p>
                  <a href="#" className="text-sm text-brand-accent hover:underline mt-1 inline-block">Get Directions</a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Copyright & View Counter */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Bhagwan Pandekar. All Rights Reserved.</p>
          <div className="flex gap-4 items-center">
            {onAdminClick && (
              <button 
                onClick={onAdminClick} 
                className={`flex items-center gap-1 transition-colors ${isLoggedIn ? 'text-brand-accent hover:text-white font-bold' : 'hover:text-white'}`}
              >
                {isLoggedIn ? <LayoutDashboard size={12} /> : <Lock size={12} />} 
                {isLoggedIn ? 'Dashboard' : 'Admin'}
              </button>
            )}
            <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-default">
              <Eye size={14} className="text-brand-accent animate-pulse" />
              <span>Site Visits: <span className="font-mono text-white font-medium">{viewCount.toLocaleString()}</span></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;