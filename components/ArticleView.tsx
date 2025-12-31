import React, { useEffect } from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';

interface ArticleViewProps {
  post: BlogPost;
  onBack: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ post, onBack }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Article Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] w-full bg-gray-900">
        {post.imageUrl ? (
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-navy">
            <span className="text-white/20 font-bold text-6xl">Article</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="absolute top-0 left-0 w-full p-6">
           <button 
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all font-medium border border-white/10"
          >
            <ArrowLeft size={18} /> Back to Blog
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full container mx-auto px-4 md:px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-brand-accent text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight shadow-sm">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/10 rounded-full">
                   <User size={14} />
                </div>
                <span>By <span className="text-white font-medium">{post.author}</span></span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="p-1.5 bg-white/10 rounded-full">
                   <Calendar size={14} />
                </div>
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          
          {/* Excerpt / Lead */}
          <div className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed mb-10 border-l-4 border-brand-accent pl-6 italic">
            {post.excerpt}
          </div>

          {/* Main Body */}
          <div className="prose prose-lg prose-blue max-w-none text-gray-800 leading-8 whitespace-pre-line mb-12">
            {post.content}
          </div>

          {/* Footer of Article */}
          <div className="border-t border-gray-100 pt-8 flex justify-between items-center">
             <div className="flex items-center gap-2 text-gray-500 text-sm">
               <Tag size={16} />
               <span>Filed under: <strong>{post.category}</strong></span>
             </div>
             
             <button className="flex items-center gap-2 text-brand-navy font-bold hover:text-brand-accent transition-colors">
               <Share2 size={18} /> Share Article
             </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ArticleView;