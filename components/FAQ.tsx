import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useTranslation } from '../translations';
import { useScrollReveal, getRevealClass } from '../hooks/useScrollReveal';

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const headingReveal = useScrollReveal();
  const faqReveal = useScrollReveal({ threshold: 0.05 });

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 md:py-16 bg-gradient-to-b from-blue-50/30 to-white/50 backdrop-blur-sm border-t border-gray-100 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div ref={headingReveal.ref} className={getRevealClass(headingReveal.isVisible, 'up')}>
          <SectionHeading
            title={t('faq.title')}
            subtitle={t('faq.subtitle')}
          />
        </div>

        <div ref={faqReveal.ref} className={`space-y-3 ${getRevealClass(faqReveal.isVisible, 'up')}`}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white/80 backdrop-blur-md rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-brand-accent/30 shadow-lg shadow-brand-accent/5'
                    : 'border-white/50 shadow-sm hover:shadow-md hover:border-gray-200'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start gap-4 p-5 md:p-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5 ${
                      isOpen
                        ? 'bg-brand-accent text-white rotate-0'
                        : 'bg-blue-50 text-brand-accent group-hover:bg-blue-100'
                    }`}
                  >
                    <HelpCircle size={18} />
                  </div>

                  <span
                    className={`flex-1 font-semibold text-sm md:text-base transition-colors duration-200 ${
                      isOpen ? 'text-brand-navy' : 'text-gray-700 group-hover:text-brand-navy'
                    }`}
                  >
                    {faq.q}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`text-gray-400 shrink-0 transition-transform duration-300 mt-0.5 ${
                      isOpen ? 'rotate-180 text-brand-accent' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 md:px-6 md:pb-6 pl-[68px] md:pl-[76px]">
                    <div className="text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className={`mt-10 text-center ${getRevealClass(faqReveal.isVisible, 'fade')}`}>
          <p className="text-gray-500 text-sm mb-3">
            Still have questions?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-accent transition-all shadow-lg hover:-translate-y-0.5 active:scale-95"
          >
            Contact Us Directly
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
