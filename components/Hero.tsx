import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-white">
      {/* Abstract Animated Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-sm text-brand-slate font-medium mb-6 animate-fade-up opacity-0">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Accepting New Students
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-navy leading-relaxed mb-6 animate-fade-up opacity-0 stagger-1">
              योग्य दिशा, <br />
              <span className="text-brand-accent inline-block pt-2">उज्ज्वल भविष्य.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 font-medium mb-2 animate-fade-up opacity-0 stagger-2">
              Empowering Careers through Expert Guidance
            </p>
            
            <p className="text-gray-500 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed animate-fade-up opacity-0 stagger-3">
              Unlock your true potential with personalized career counseling, aptitude testing, and strategic planning based on 15+ years of expertise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-up opacity-0 stagger-4">
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, '#contact')}
                className="flex items-center justify-center gap-2 bg-brand-navy text-white px-8 py-3.5 rounded-lg font-medium hover:bg-brand-navy/90 hover:-translate-y-1 transition-all active:scale-95 shadow-lg shadow-brand-navy/25"
              >
                Book Consultation <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#services" 
                onClick={(e) => scrollToSection(e, '#services')}
                className="flex items-center justify-center gap-2 bg-white text-brand-navy border border-gray-200 px-8 py-3.5 rounded-lg font-medium hover:bg-gray-50 hover:-translate-y-1 transition-all shadow-sm"
              >
                Explore Services
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium text-gray-500 animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2 hover:text-brand-accent transition-colors cursor-default">
                <CheckCircle size={16} className="text-green-600" /> 5000+ Students Guided
              </div>
              <div className="flex items-center gap-2 hover:text-brand-accent transition-colors cursor-default">
                <CheckCircle size={16} className="text-green-600" /> Scientific Approach
              </div>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="flex-1 w-full max-w-lg md:max-w-none relative animate-fade-up opacity-0" style={{ animationDelay: '0.5s' }}>
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gray-200 animate-float">
             {/* Using a professional placeholder image representing counseling/education */}
              <img 
                src="https://picsum.photos/800/800?grayscale&blur=2" 
                alt="Career Counseling Session" 
                className="object-cover w-full h-full hover:scale-110 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent flex flex-col justify-end p-8">
                 <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg transform translate-y-4 max-w-xs hover:scale-105 transition-transform duration-300">
                    <p className="font-heading font-bold text-brand-navy text-lg">Bhagwan Pandekar</p>
                    <p className="text-sm text-gray-600">Senior Career Counsellor</p>
                 </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-accent rounded-xl -z-10 animate-pulse"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-brand-slate/20 rounded-xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;