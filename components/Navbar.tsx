import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, Globe } from 'lucide-react';
import { NavLink } from '../types';
import { useTranslation, Language } from '../translations';

interface NavbarProps {
  onHomeClick?: () => void;
  isBookingMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick, isBookingMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();

  const navLinks: NavLink[] = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.blog'), href: '#blog' },
    { label: t('nav.downloads'), href: '#downloads' },
    { label: t('nav.resources'), href: '#resources' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.faq'), href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const handleClick = () => setLangOpen(false);
    setTimeout(() => document.addEventListener('click', handleClick), 0);
    return () => document.removeEventListener('click', handleClick);
  }, [langOpen]);

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

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'hi', label: 'हिंदी', flag: 'हिं' },
    { code: 'mr', label: 'मराठी', flag: 'मरा' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled || isBookingMode 
          ? 'bg-white/70 backdrop-blur-xl shadow-sm border-b border-white/20 py-2 supports-[backdrop-filter]:bg-white/60' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
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
          <nav className="hidden md:flex items-center gap-5 lg:gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-medium text-sm lg:text-base hover:text-brand-accent transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-brand-accent after:transition-all hover:after:w-full ${
                    isScrolled || isBookingMode ? 'text-gray-700' : 'text-gray-800' 
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-sm font-medium hover:bg-brand-accent/10 ${
                  isScrolled || isBookingMode
                    ? 'border-gray-200 text-gray-700 bg-white/80'
                    : 'border-white/40 text-gray-800 bg-white/60 backdrop-blur-sm'
                }`}
                aria-label="Select language"
              >
                <Globe size={15} className="text-brand-accent" />
                <span>{languages.find(l => l.code === language)?.flag}</span>
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[140px] animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-medium flex items-center justify-between gap-3 transition-colors ${
                        language === lang.code
                          ? 'bg-brand-navy/5 text-brand-navy'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{lang.label}</span>
                      {language === lang.code && (
                        <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {!isBookingMode && (
              <a 
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="bg-brand-navy hover:bg-brand-accent text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-brand-navy/20 text-sm ml-1 hover:-translate-y-0.5 active:scale-95"
              >
                {t('nav.consult')}
              </a>
            )}
          </nav>

          {/* Mobile: Language + Menu */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen); }}
                className="p-2 text-brand-navy hover:bg-gray-100 rounded-md flex items-center gap-1"
                aria-label="Select language"
              >
                <Globe size={18} className="text-brand-accent" />
                <span className="text-xs font-bold">{languages.find(l => l.code === language)?.flag}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[130px] animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                        language === lang.code ? 'bg-brand-navy/5 text-brand-navy' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="p-2 text-brand-navy hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-lg border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link, i) => (
                <a 
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 font-medium py-3 px-3 hover:text-brand-accent hover:bg-brand-accent/5 rounded-lg transition-all"
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.label}
                </a>
              ))}
              {!isBookingMode && (
                <a 
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="bg-brand-navy text-white text-center py-3 rounded-lg font-medium mt-2 hover:bg-brand-accent transition-colors active:scale-[0.98]"
                >
                  {t('nav.consult')}
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