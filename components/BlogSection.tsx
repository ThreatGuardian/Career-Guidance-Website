import React from 'react';
import SectionHeading from './SectionHeading';
import { BlogPost } from '../types';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
  onViewPost: (post: BlogPost) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts, onViewPost }) => {

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Career Insights & Articles" 
          subtitle="Latest trends, guidance, and educational news curated for you."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group"
            >
              {post.imageUrl && (
                <div className="h-48 overflow-hidden relative cursor-pointer" onClick={() => onViewPost(post)}>
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-navy">
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
                  className="text-brand-accent font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto"
                >
                  Read Full Article <ArrowRight size={16} />
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