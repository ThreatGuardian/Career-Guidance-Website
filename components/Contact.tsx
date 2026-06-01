import React, { useEffect, useState, useRef } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Eye, Lock, LayoutDashboard, Send, Loader2, CheckCircle } from 'lucide-react';
import { InquiryService } from '../services/api';
import type { InquiryItem } from '../types';
import { useTranslation } from '../translations';
import { useScrollReveal, getRevealClass } from '../hooks/useScrollReveal';

interface ContactProps {
  onAdminClick?: () => void;
  isLoggedIn?: boolean;
  onInquiryCreated?: (inquiry: InquiryItem) => void;
}

// Simple phone validation for Indian numbers
const isValidPhone = (phone: string): boolean => /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));

const Contact: React.FC<ContactProps> = ({ onAdminClick, isLoggedIn, onInquiryCreated }) => {
  const { t } = useTranslation();
  const [viewCount, setViewCount] = useState<number>(15420);
  const infoReveal = useScrollReveal();
  const formReveal = useScrollReveal();
  
  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [phoneError, setPhoneError] = useState('');
  
  // Debounce ref
  const lastSubmitRef = useRef<number>(0);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.name || !formData.phone || !formData.message) return;

    // Phone validation
    if (!isValidPhone(formData.phone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }
    setPhoneError('');

    // Debounce: prevent double-submit within 3 seconds
    const now = Date.now();
    if (now - lastSubmitRef.current < 3000) return;
    lastSubmitRef.current = now;

    setIsSubmitting(true);
    try {
      const created = await InquiryService.create({
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
        date: new Date().toLocaleDateString(),
        isRead: false
      });

      // Update global inquiries list if parent provided a handler
      if (onInquiryCreated) {
        onInquiryCreated(created);
      }

      setSubmitStatus('success');
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="bg-brand-navy text-white pt-12 pb-8 md:pt-16 md:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          
          {/* Left Column: Contact Info & Brand */}
          <div ref={infoReveal.ref} className={`space-y-12 ${getRevealClass(infoReveal.isVisible, 'left')}`}>
            <div>
              <h3 className="text-3xl font-heading font-bold mb-4">{t('contact.name')}</h3>
              <p className="text-gray-300 leading-relaxed max-w-md">
                {t('contact.tagline')}
              </p>
            </div>

            <div className="grid gap-8">
              <div className="flex items-start gap-5 group">
                <div className="bg-brand-accent/20 p-3 rounded-lg shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <Phone className="text-brand-accent group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{t('contact.phone_label')}</p>
                  <p className="font-medium text-xl text-white">{t('contact.phone')}</p>
                  <p className="text-sm text-gray-400 mt-1">{t('contact.hours')}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="bg-brand-accent/20 p-3 rounded-lg shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <Mail className="text-brand-accent group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{t('contact.email_label')}</p>
                  <p className="font-medium text-white break-all">bhagwanpandekar@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="bg-brand-accent/20 p-3 rounded-lg shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <MapPin className="text-brand-accent group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{t('contact.address_label')}</p>
                  <p className="font-medium text-white max-w-xs">
                    {t('contact.address')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="#" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent hover:-translate-y-1 transition-all duration-300 active:scale-90">
                <Facebook size={20} />
              </a>
              <a href="#" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent hover:-translate-y-1 transition-all duration-300 active:scale-90">
                <Instagram size={20} />
              </a>
              <a href="#" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent hover:-translate-y-1 transition-all duration-300 active:scale-90">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div ref={formReveal.ref} className={`${getRevealClass(formReveal.isVisible, 'right')}`}>
            <div className="bg-white rounded-2xl p-6 md:p-8 text-gray-800 shadow-xl">
              <h4 className="text-xl font-bold text-brand-navy mb-2">{t('contact.form_title')}</h4>
              <p className="text-gray-500 mb-6 text-sm">{t('contact.form_subtitle')}</p>
              
              {submitStatus === 'success' ? (
                <div className="h-64 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="text-green-600 w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{t('contact.success_title')}</h3>
                  <p className="text-gray-500">{t('contact.success_msg')}</p>
                  <button onClick={() => setSubmitStatus('idle')} className="mt-4 text-brand-accent text-sm font-semibold hover:underline">{t('contact.send_another')}</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t('contact.name_label')}</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all hover:bg-white"
                      placeholder={t('contact.name_placeholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t('contact.phone_input_label')}</label>
                    <input 
                      required 
                      type="tel" 
                      value={formData.phone}
                      onChange={e => { setFormData({...formData, phone: e.target.value}); setPhoneError(''); }}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all hover:bg-white ${phoneError ? 'border-red-300' : 'border-gray-200'}`}
                      placeholder={t('contact.phone_placeholder')}
                      pattern="[6-9][0-9]{9}"
                      title="Enter a valid 10-digit Indian phone number"
                    />
                    {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t('contact.message_label')}</label>
                    <textarea 
                      required 
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all resize-none hover:bg-white"
                      placeholder={t('contact.message_placeholder')}
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-brand-navy text-white font-bold py-3.5 rounded-xl hover:bg-brand-accent transition-all shadow-lg hover:shadow-brand-accent/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait active:scale-[0.98] hover:-translate-y-0.5"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                    {isSubmitting ? t('contact.sending') : t('contact.send')}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Footer Links & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-sm text-gray-500">
          <p>{t('contact.copyright', { year: new Date().getFullYear().toString() })}</p>
          <div className="flex gap-6 items-center flex-wrap justify-center">
            <a href="#hero" onClick={(e) => scrollToSection(e, '#hero')} className="hover:text-white transition-colors">{t('nav.home')}</a>
            <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-white transition-colors">{t('nav.services')}</a>
            <a href="#blog" onClick={(e) => scrollToSection(e, '#blog')} className="hover:text-white transition-colors">{t('nav.blog')}</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, '#faq')} className="hover:text-white transition-colors">{t('nav.faq')}</a>
            
            {onAdminClick && (
              <button 
                onClick={onAdminClick} 
                className={`flex items-center gap-1 transition-colors ml-4 ${isLoggedIn ? 'text-brand-accent hover:text-white font-bold' : 'hover:text-white'}`}
              >
                {isLoggedIn ? <LayoutDashboard size={12} /> : <Lock size={12} />} 
                {isLoggedIn ? t('contact.dashboard') : t('contact.admin')}
              </button>
            )}
            
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10 cursor-default">
              <Eye size={12} className="text-brand-accent" />
              <span className="font-mono text-xs">{viewCount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;