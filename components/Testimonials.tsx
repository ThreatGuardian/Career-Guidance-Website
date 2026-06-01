import React, { useState, useEffect, useCallback } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useTranslation } from '../translations';
import { useScrollReveal, getRevealClass } from '../hooks/useScrollReveal';

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const headingReveal = useScrollReveal();
  const cardsReveal = useScrollReveal({ threshold: 0.05 });

  const testimonials = [
    {
      name: t('testimonials.t1_name'),
      role: t('testimonials.t1_role'),
      text: t('testimonials.t1_text'),
      rating: 5,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      name: t('testimonials.t2_name'),
      role: t('testimonials.t2_role'),
      text: t('testimonials.t2_text'),
      rating: 5,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      name: t('testimonials.t3_name'),
      role: t('testimonials.t3_role'),
      text: t('testimonials.t3_text'),
      rating: 5,
      color: 'from-orange-500 to-red-500',
    },
    {
      name: t('testimonials.t4_name'),
      role: t('testimonials.t4_role'),
      text: t('testimonials.t4_text'),
      rating: 4,
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: t('testimonials.t5_name'),
      role: t('testimonials.t5_role'),
      text: t('testimonials.t5_text'),
      rating: 5,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      name: t('testimonials.t6_name'),
      role: t('testimonials.t6_role'),
      text: t('testimonials.t6_text'),
      rating: 5,
      color: 'from-amber-500 to-orange-600',
    },
  ];

  // Show 3 at a time on desktop, 1 on mobile
  const totalSlides = testimonials.length;

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((activeIndex + i) % totalSlides);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white/40 to-blue-50/40 backdrop-blur-sm border-t border-gray-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-navy/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div ref={headingReveal.ref} className={getRevealClass(headingReveal.isVisible, 'up')}>
          <SectionHeading
            title={t('testimonials.title')}
            subtitle={t('testimonials.subtitle')}
          />
        </div>

        <div
          ref={cardsReveal.ref}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${getRevealClass(cardsReveal.isVisible, 'up')}`}>
            {visibleIndices.map((idx, position) => {
              const item = testimonials[idx];
              const initials = item.name
                .split(' ')
                .map((w) => w[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={`${idx}-${position}`}
                  className={`bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col relative overflow-hidden group ${
                    position > 0 ? 'hidden md:flex' : 'flex'
                  }`}
                >
                  {/* Quote watermark */}
                  <div className="absolute top-4 right-4 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity">
                    <Quote size={80} />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                      />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base flex-1 mb-6 relative z-10">
                    "{item.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div
                      className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}
                    >
                      {initials}
                    </div>
                    <div>
                      <p className="font-bold text-brand-navy text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand-navy hover:border-brand-navy hover:shadow-md transition-all active:scale-90"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? 'w-8 bg-brand-accent'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand-navy hover:border-brand-navy hover:shadow-md transition-all active:scale-90"
              aria-label="Next testimonials"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
