import React from 'react';
import { ArrowRight, CheckCircle, GraduationCap, Brain, Target, Compass, BookOpen, TrendingUp } from 'lucide-react';
import CounterAnimation from './CounterAnimation';

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

      {/* Floating Translucent Icons - Left Side */}
      <div className="hidden lg:block absolute left-[5%] top-1/2 -translate-y-1/2 space-y-8 pointer-events-none">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 backdrop-blur-sm border border-blue-200/30 flex items-center justify-center animate-float" style={{ animationDelay: '0s' }}>
          <GraduationCap className="text-blue-400/60" size={28} />
        </div>
        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 backdrop-blur-sm border border-purple-200/30 flex items-center justify-center ml-8 animate-float" style={{ animationDelay: '1s' }}>
          <Brain className="text-purple-400/60" size={24} />
        </div>
        <div className="w-12 h-12 rounded-xl bg-green-500/10 backdrop-blur-sm border border-green-200/30 flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
          <Target className="text-green-400/60" size={20} />
        </div>
      </div>

      {/* Floating Translucent Icons - Right Side */}
      <div className="hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 space-y-8 pointer-events-none">
        <div className="w-12 h-12 rounded-xl bg-orange-500/10 backdrop-blur-sm border border-orange-200/30 flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
          <Compass className="text-orange-400/60" size={20} />
        </div>
        <div className="w-14 h-14 rounded-2xl bg-pink-500/10 backdrop-blur-sm border border-pink-200/30 flex items-center justify-center mr-8 animate-float" style={{ animationDelay: '1.5s' }}>
          <BookOpen className="text-pink-400/60" size={24} />
        </div>
        <div className="w-16 h-16 rounded-2xl bg-teal-500/10 backdrop-blur-sm border border-teal-200/30 flex items-center justify-center animate-float" style={{ animationDelay: '2.5s' }}>
          <TrendingUp className="text-teal-400/60" size={28} />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          {/* Text Content */}
          <div className="w-full">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-sm text-sm text-brand-slate font-medium mb-6 animate-fade-up opacity-0 hover:bg-white/60 transition-colors">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              Accepting New Students
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-navy leading-relaxed mb-6 animate-fade-up opacity-0 stagger-1">
              योग्य दिशा, <br />
              <span className="text-brand-accent inline-block pt-2">उज्ज्वल भविष्य.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 font-medium mb-2 animate-fade-up opacity-0 stagger-2">
              Empowering Careers through Expert Guidance
            </p>
            
            <p className="text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed animate-fade-up opacity-0 stagger-3">
              Unlock your true potential with personalized career counseling, aptitude testing, and strategic planning based on 15+ years of expertise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0 stagger-4">
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

            <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500 animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2 hover:text-brand-accent transition-colors cursor-default">
                <CheckCircle size={16} className="text-green-600" /> 
                <span className="flex gap-1">
                  <CounterAnimation end={5000} suffix="+" duration={2500} /> Students Guided
                </span>
              </div>
              <div className="flex items-center gap-2 hover:text-brand-accent transition-colors cursor-default">
                <CheckCircle size={16} className="text-green-600" /> Scientific Approach
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;