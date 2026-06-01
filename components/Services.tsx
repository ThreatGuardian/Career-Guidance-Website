import React from 'react';
import SectionHeading from './SectionHeading';
import { 
  BrainCircuit, 
  Map, 
  UserCheck, 
  BookOpen, 
  Users, 
  Briefcase,
  ArrowRight,
  MessageCircle,
  Clock,
  ListChecks,
  ClipboardCheck,
  Route
} from 'lucide-react';
import { ServiceItem } from '../types';
import { useTranslation } from '../translations';
import { useScrollReveal, getRevealClass } from '../hooks/useScrollReveal';

interface ServicesProps {
  onBookClick?: () => void;
}

const Services: React.FC<ServicesProps> = ({ onBookClick }) => {
  const { t } = useTranslation();
  const headingReveal = useScrollReveal();
  const card1Reveal = useScrollReveal();
  const card2Reveal = useScrollReveal();
  const modulesReveal = useScrollReveal();

  const services: { title: string; description: string; icon: any }[] = [
    { title: t('services.stream'), description: t('services.stream_desc'), icon: Map },
    { title: t('services.personality'), description: t('services.personality_desc'), icon: UserCheck },
    { title: t('services.study'), description: t('services.study_desc'), icon: BookOpen },
    { title: t('services.parent'), description: t('services.parent_desc'), icon: Users },
    { title: t('services.business'), description: t('services.business_desc'), icon: Briefcase },
  ];

  return (
    <section id="services" className="py-12 md:py-16 bg-white/60 backdrop-blur-sm border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div ref={headingReveal.ref} className={getRevealClass(headingReveal.isVisible, 'up')}>
          <SectionHeading 
            title={t('services.title')} 
            subtitle={t('services.subtitle')}
          />
        </div>

        {/* How It Works - 3 Step Process */}
        <div className="mb-16">
          <h3 className="text-center text-lg font-heading font-semibold text-brand-slate mb-10">{t('how.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 relative max-w-4xl mx-auto">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-brand-accent/20 via-brand-accent/40 to-brand-accent/20 z-0"></div>

            {[
              { icon: ListChecks, title: t('how.step1_title'), desc: t('how.step1_desc'), num: '1' },
              { icon: ClipboardCheck, title: t('how.step2_title'), desc: t('how.step2_desc'), num: '2' },
              { icon: Route, title: t('how.step3_title'), desc: t('how.step3_desc'), num: '3' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-brand-accent/20 flex items-center justify-center mb-4 shadow-md group-hover:border-brand-accent group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <step.icon size={28} className="text-brand-accent" />
                </div>
                <div className="absolute -top-2 -right-1 md:right-auto md:left-[calc(50%+16px)] w-6 h-6 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center shadow-sm">
                  {step.num}
                </div>
                <h4 className="font-heading font-bold text-brand-navy text-base mb-2">{step.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[240px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Service Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Option 1: Just Counselling */}
          <div ref={card1Reveal.ref} className={getRevealClass(card1Reveal.isVisible, 'left')}>
            <div className="group relative bg-white/90 backdrop-blur rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl hover:border-brand-accent/30 hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light rounded-bl-full -mr-8 -mt-8 group-hover:bg-brand-accent/10 transition-colors duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-50 text-brand-navy rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-navy group-hover:text-white transition-all duration-300 shadow-sm group-hover:scale-110 group-hover:rotate-3">
                  <MessageCircle size={28} />
                </div>
                
                <h3 className="text-2xl font-heading font-bold text-brand-navy mb-3 group-hover:text-brand-accent transition-colors">
                  {t('services.counselling_title')}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed min-h-[80px]">
                  {t('services.counselling_desc')}
                </p>
                
                <ul className="space-y-3 mb-8 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <Clock size={16} className="text-brand-accent" /> 
                    <span>{t('services.counselling_duration')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                     <UserCheck size={16} className="text-brand-accent" />
                     <span>{t('services.counselling_interaction')}</span>
                  </li>
                </ul>

                <button 
                  onClick={onBookClick}
                  className="w-full py-3.5 rounded-xl border-2 border-brand-navy text-brand-navy font-bold hover:bg-brand-navy hover:text-white transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.97]"
                >
                  {t('services.counselling_cta')} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Option 2: Complete Package */}
          <div ref={card2Reveal.ref} className={getRevealClass(card2Reveal.isVisible, 'right')}>
            <div className="group relative bg-gradient-to-br from-brand-navy to-blue-900 text-white rounded-3xl p-8 shadow-2xl hover:shadow-brand-accent/40 hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full">
              {/* Animated Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-brand-navy transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <BrainCircuit size={28} />
                  </div>
                  <div className="px-3 py-1 bg-brand-accent/30 border border-brand-accent/50 rounded-full text-xs font-semibold uppercase tracking-wider animate-pulse">
                    {t('services.assessment_badge')}
                  </div>
                </div>
                
                <h3 className="text-2xl font-heading font-bold mb-3">
                  {t('services.assessment_title')}
                </h3>
                
                <p className="text-blue-100 mb-6 leading-relaxed min-h-[80px]">
                  {t('services.assessment_desc')}
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-8 text-sm text-blue-100">
                   <div className="bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors">{t('services.assessment_test')}</div>
                   <div className="bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors">{t('services.assessment_report')}</div>
                   <div className="bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors">{t('services.assessment_analysis')}</div>
                   <div className="bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors">{t('services.assessment_parent')}</div>
                </div>

                <button 
                  onClick={onBookClick}
                  className="w-full py-3.5 rounded-xl bg-white text-brand-navy font-bold hover:bg-brand-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-[0.97]"
                >
                  {t('services.assessment_cta')} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>
        
        {/* Other Services Grid */}
        <div ref={modulesReveal.ref} className={getRevealClass(modulesReveal.isVisible, 'up')}>
          <h3 className="text-2xl font-heading font-bold text-brand-navy mb-8 pl-2 border-l-4 border-brand-accent">
            {t('services.specialized')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-white/80 backdrop-blur rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/50 relative overflow-hidden"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-bl-full -mr-4 -mt-4 group-hover:bg-brand-accent/10 transition-colors duration-500"></div>
                
                <div className="w-14 h-14 bg-brand-navy/5 text-brand-navy rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-navy group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-brand-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;