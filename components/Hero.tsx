import React from 'react';
import { ArrowRight, CheckCircle, GraduationCap, Brain, Target, Compass, BookOpen, TrendingUp, ChevronDown, ShieldCheck, School, Award } from 'lucide-react';
import CounterAnimation from './CounterAnimation';
import { useTranslation } from '../translations';
import { useScrollReveal, getRevealClass } from '../hooks/useScrollReveal';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const titleReveal = useScrollReveal({ threshold: 0.1 });
  const ctaReveal = useScrollReveal({ threshold: 0.1 });
  const statsReveal = useScrollReveal({ threshold: 0.1 });

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-white">
      {/* Abstract Animated Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Side (Moved from About) */}
          <div className="w-full lg:w-5/12 animate-fade-up">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 bg-brand-navy rounded-2xl rotate-3 opacity-10 scale-105 animate-pulse"></div>
              <img 
                src="/images/counseller.png" 
                alt="Bhagwan Pandekar - Career Counsellor" 
                className="relative rounded-2xl shadow-xl w-full h-auto object-cover aspect-[3/4] hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
                width={400}
                height={533}
              />
              <div className="absolute -bottom-8 -right-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-white/50 animate-fade-up delay-300">
                <p className="text-brand-accent font-heading font-bold text-3xl">
                  <CounterAnimation end={15} suffix="+" duration={2000} />
                </p>
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">{t('about.years')}</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div ref={titleReveal.ref} className={`w-full ${getRevealClass(titleReveal.isVisible, 'up')}`}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-sm text-sm text-brand-slate font-medium mb-6 hover:bg-white/60 transition-colors">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                {t('hero.badge')}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-navy leading-relaxed mb-6">
                {t('hero.title_line1')} <br />
                <span className="text-brand-accent inline-block pt-2">{t('hero.title_line2')}</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 font-medium mb-4">
                {t('hero.subtitle')}
              </p>
              
              <p className="text-gray-500 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            <div ref={ctaReveal.ref} className={`w-full ${getRevealClass(ctaReveal.isVisible, 'up')}`}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="flex items-center justify-center gap-2 bg-brand-navy text-white px-8 py-3.5 rounded-lg font-medium hover:bg-brand-navy/90 hover:-translate-y-1 transition-all active:scale-95 shadow-lg shadow-brand-navy/25"
                >
                  {t('hero.cta_book')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#services" 
                  onClick={(e) => scrollToSection(e, '#services')}
                  className="flex items-center justify-center gap-2 bg-white text-brand-navy border border-gray-200 px-8 py-3.5 rounded-lg font-medium hover:bg-gray-50 hover:-translate-y-1 transition-all shadow-sm active:scale-95"
                >
                  {t('hero.cta_explore')}
                </a>
              </div>
            </div>

            <div ref={statsReveal.ref} className={`w-full ${getRevealClass(statsReveal.isVisible, 'fade')}`}>
              <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap justify-center lg:justify-start gap-6 text-sm font-medium text-gray-500 w-full" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2 hover:text-brand-accent transition-colors cursor-default">
                  <CheckCircle size={16} className="text-green-600" /> 
                  <span className="flex gap-1">
                    <CounterAnimation end={5000} suffix="+" duration={2500} /> {t('hero.stat_students')}
                  </span>
                </div>
                <div className="flex items-center gap-2 hover:text-brand-accent transition-colors cursor-default">
                  <CheckCircle size={16} className="text-green-600" /> {t('hero.stat_science')}
                </div>
              </div>

              {/* Trust Strip */}
              <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100">
                  <ShieldCheck size={14} className="text-brand-accent" />
                  <span>Certified Career Counsellor</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100">
                  <School size={14} className="text-brand-accent" />
                  <span>Trusted by 100+ Schools</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100">
                  <Award size={14} className="text-brand-accent" />
                  <span>NCERT-aligned Approach</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center mt-8 animate-bounce">
        <a 
          href="#services" 
          onClick={(e) => scrollToSection(e, '#services')}
          className="text-gray-400 hover:text-brand-accent transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={28} strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
};

export default Hero;