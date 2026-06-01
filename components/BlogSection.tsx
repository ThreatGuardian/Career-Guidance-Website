import React from 'react';
import SectionHeading from './SectionHeading';
import { BlogPost } from '../types';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useTranslation } from '../translations';
import { useScrollReveal, getRevealClass } from '../hooks/useScrollReveal';

interface BlogSectionProps {
  posts: BlogPost[];
  onViewPost: (post: BlogPost) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts, onViewPost }) => {
  const { t } = useTranslation();
  const headingReveal = useScrollReveal();
  const cardsReveal = useScrollReveal({ threshold: 0.05 });

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-12 md:py-16 bg-transparent border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div ref={headingReveal.ref} className={getRevealClass(headingReveal.isVisible, 'up')}>
          <SectionHeading 
            title={t('blog.title')} 
            subtitle={t('blog.subtitle')}
          />
        </div>

        <div ref={cardsReveal.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className={`bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full group border border-white/50 ${
                cardsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {post.imageUrl && (
                <div className="h-48 overflow-hidden relative cursor-pointer" onClick={() => onViewPost(post)}>
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-navy shadow-sm">
                    {post.category}
                  </div>
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                </div>
                <h3 
                  className="text-xl font-heading font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-brand-accent transition-colors cursor-pointer"
                  onClick={() => onViewPost(post)}
                >
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <button 
                  onClick={() => onViewPost(post)}
                  className="text-brand-accent font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto group/btn"
                >
                  {t('blog.read_more')} <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;