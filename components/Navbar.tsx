import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { NavLink } from '../types';

interface NavbarProps {
  onHomeClick?: () => void;
  isBookingMode?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Blog', href: '#blog' },
  { label: 'Downloads', href: '#downloads' },
  { label: 'Resources', href: '#resources' },
  { label: 'About', href: '#about' },
];

const Navbar: React.FC<NavbarProps> = ({ onHomeClick, isBookingMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (isBookingMode && onHomeClick) {
      onHomeClick();
      // Use setTimeout to allow view to switch before scrolling
      if (href !== '#hero') {
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
        // Normal behavior if on home page
        if(href === '#hero') {
           window.scrollTo({ top: 0, behavior: 'smooth'});
        } else {
           const element = document.querySelector(href);
           element?.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isBookingMode ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')} 
            className="flex items-center gap-2 text-brand-navy group text-left"
          >
            <div className={`p-2 rounded-lg transition-colors ${isScrolled || isBookingMode ? 'bg-brand-navy/10' : 'bg-white/90'}`}>
              <GraduationCap className="w-8 h-8 text-brand-navy" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl md:text-2xl leading-none">Bhagwan Pandekar</span>
              <span className="text-xs md:text-sm text-brand-slate font-medium">Career Counsellor</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-medium text-sm lg:text-base hover:text-brand-accent transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-brand-accent after:transition-all hover:after:w-full ${
                    isScrolled || isBookingMode ? 'text-gray-700' : 'text-gray-800' 
                }`}
              >
                {link.label}
              </a>
            ))}
            {!isBookingMode && (
              <a 
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="bg-brand-navy hover:bg-brand-accent text-white px-5 py-2 rounded-full font-medium transition-colors shadow-lg shadow-brand-navy/20 text-sm ml-2"
              >
                Consult Now
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-brand-navy hover:bg-gray-100 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 animate-in slide-in-from-top-2">
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  className="text-gray-700 font-medium py-2 hover:text-brand-accent hover:pl-2 transition-all"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
              {!isBookingMode && (
                <a 
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="bg-brand-navy text-white text-center py-3 rounded-lg font-medium mt-2"
                >
                  Consult Now
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;