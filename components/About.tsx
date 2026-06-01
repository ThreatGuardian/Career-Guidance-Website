import React from 'react';
import { Award, Clock, BookOpen, User } from 'lucide-react';
import CounterAnimation from './CounterAnimation';
import { useTranslation } from '../translations';
import { useScrollReveal, getRevealClass } from '../hooks/useScrollReveal';

const About: React.FC = () => {
  const { t } = useTranslation();
  const imageReveal = useScrollReveal();
  const contentReveal = useScrollReveal();
  const cardsReveal = useScrollReveal();

  return (
    <section id="about" className="py-12 md:py-16 bg-gradient-to-br from-white/70 via-blue-50/30 to-white/70 backdrop-blur-sm relative overflow-hidden border-t border-gray-100">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 bg-brand-navy h-32 rounded-r-full opacity-20"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-20 w-64 h-64 bg-brand-navy/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div ref={contentReveal.ref} className={`max-w-4xl mx-auto text-center ${getRevealClass(contentReveal.isVisible, 'up')}`}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-4">
            {t('about.title')}
          </h2>
          <h3 className="text-xl text-brand-slate font-medium mb-8">
            {t('about.subtitle')}
          </h3>
          
          <div className="space-y-6 text-gray-600 leading-relaxed bg-white/50 p-8 rounded-3xl backdrop-blur-sm border border-white/40 text-left shadow-sm">
            <p>{t('about.para1')}</p>
            <p>{t('about.para2')}</p>
          </div>

          <div ref={cardsReveal.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
            {[
              { icon: Award, title: t('about.certified'), desc: t('about.certified_desc'), gradient: 'from-blue-500 to-indigo-600' },
              { icon: Clock, title: <><CounterAnimation end={15} suffix="+" duration={2000} /> {t('about.years_title')}</>, desc: t('about.years_desc'), gradient: 'from-emerald-500 to-teal-600' },
              { icon: User, title: t('about.personalized'), desc: t('about.personalized_desc'), gradient: 'from-orange-500 to-red-500' },
              { icon: BookOpen, title: t('about.holistic'), desc: t('about.holistic_desc'), gradient: 'from-purple-500 to-pink-500' },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-start gap-4 p-6 bg-white/70 backdrop-blur-sm rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 shadow-sm hover:-translate-y-1 border border-white/50 ${
                  cardsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`bg-gradient-to-br ${item.gradient} p-3 rounded-xl w-12 h-12 flex items-center justify-center shadow-md`}>
                  <item.icon className="text-white shrink-0" size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;