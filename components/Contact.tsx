import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Linkedin, Eye, Lock, LayoutDashboard, Send, Loader2, CheckCircle } from 'lucide-react';
import { InquiryService } from '../services/api';

interface ContactProps {
  onAdminClick?: () => void;
  isLoggedIn?: boolean;
}

const Contact: React.FC<ContactProps> = ({ onAdminClick, isLoggedIn }) => {
  const [viewCount, setViewCount] = useState<number>(15420);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

    setIsSubmitting(true);
    try {
      await InquiryService.create({
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
        date: new Date().toLocaleDateString(),
        isRead: false
      });
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
    <footer id="contact" className="bg-brand-navy text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          
          {/* Left Column: Contact Info & Brand */}
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-heading font-bold mb-4">Bhagwan Pandekar</h3>
              <p className="text-gray-300 leading-relaxed max-w-md">
                Guiding students towards a brighter future with expert career counseling and scientific aptitude testing. Join us to discover your potential.
              </p>
            </div>

            <div className="grid gap-8">
              <div className="flex items-start gap-5 group">
                <div className="bg-brand-accent/20 p-3 rounded-lg shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                  <Phone className="text-brand-accent group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call for Appointments</p>
                  <p className="font-medium text-xl text-white">+91 98223 73298</p>
                  <p className="text-sm text-gray-400 mt-1">Mon - Sat, 10am - 7pm</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="bg-brand-accent/20 p-3 rounded-lg shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                  <Mail className="text-brand-accent group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Address</p>
                  <p className="font-medium text-white break-all">bhagwanpandekar@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="bg-brand-accent/20 p-3 rounded-lg shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                  <MapPin className="text-brand-accent group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Visit Us</p>
                  <p className="font-medium text-white max-w-xs">
                    Office No 4, 1st Floor, Crystal Plaza, Bavdhan, Pune - 411021
                  </p>
                </div>
              </div>
            </div>

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

          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8 text-gray-800 shadow-xl">
            <h4 className="text-xl font-bold text-brand-navy mb-2">Send us a Message</h4>
            <p className="text-gray-500 mb-6 text-sm">Have a question? Fill the form below and we'll get back to you.</p>
            
            {submitStatus === 'success' ? (
              <div className="h-64 flex flex-col items-center justify-center text-center animate-in fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="text-green-600 w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Message Sent!</h3>
                <p className="text-gray-500">We will contact you shortly.</p>
                <button onClick={() => setSubmitStatus('idle')} className="mt-4 text-brand-accent text-sm font-semibold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent outline-none transition-colors"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent outline-none transition-colors"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message / Query</label>
                  <textarea 
                    required 
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent outline-none transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-navy text-white font-bold py-3.5 rounded-xl hover:bg-brand-accent transition-all shadow-lg hover:shadow-brand-accent/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Links & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Bhagwan Pandekar. All Rights Reserved.</p>
          <div className="flex gap-6 items-center flex-wrap justify-center">
            <a href="#hero" onClick={(e) => scrollToSection(e, '#hero')} className="hover:text-white transition-colors">Home</a>
            <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-white transition-colors">Services</a>
            <a href="#blog" onClick={(e) => scrollToSection(e, '#blog')} className="hover:text-white transition-colors">Blog</a>
            
            {onAdminClick && (
              <button 
                onClick={onAdminClick} 
                className={`flex items-center gap-1 transition-colors ml-4 ${isLoggedIn ? 'text-brand-accent hover:text-white font-bold' : 'hover:text-white'}`}
              >
                {isLoggedIn ? <LayoutDashboard size={12} /> : <Lock size={12} />} 
                {isLoggedIn ? 'Dashboard' : 'Admin'}
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