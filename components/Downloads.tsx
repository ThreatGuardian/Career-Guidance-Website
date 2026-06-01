import React from 'react';
import SectionHeading from './SectionHeading';
import { ResourceItem } from '../types';
import { FileText, Download, File, Presentation } from 'lucide-react';
import { useTranslation } from '../translations';
import { useScrollReveal, getRevealClass } from '../hooks/useScrollReveal';

interface DownloadsProps {
  resources: ResourceItem[];
}

const Downloads: React.FC<DownloadsProps> = ({ resources }) => {
  const { t } = useTranslation();
  const headingReveal = useScrollReveal();
  const cardsReveal = useScrollReveal({ threshold: 0.05 });

  if (resources.length === 0) return null;

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-500" size={24} />;
      case 'ppt': return <Presentation className="text-orange-500" size={24} />;
      default: return <File className="text-blue-500" size={24} />;
    }
  };

  return (
    <section id="downloads" className="py-12 md:py-16 bg-white/50 backdrop-blur-sm border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div ref={headingReveal.ref} className={getRevealClass(headingReveal.isVisible, 'up')}>
          <SectionHeading 
            title={t('downloads.title')} 
            subtitle={t('downloads.subtitle')}
          />
        </div>

        <div ref={cardsReveal.ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {resources.map((res, index) => (
            <div 
              key={res.id} 
              className={`border border-white/50 rounded-xl p-5 hover:border-brand-accent/30 hover:shadow-lg transition-all duration-500 flex items-start gap-4 group bg-white/70 hover:bg-white backdrop-blur active:scale-[0.99] ${
                cardsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white p-3 rounded-lg shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                {getFileIcon(res.fileType)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-brand-navy truncate pr-2">{res.title}</h4>
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">{res.description}</p>
                <div className="flex items-center gap-3">
                   <span className="text-xs font-mono bg-gray-200/80 px-2 py-0.5 rounded text-gray-600 uppercase">{res.fileType}</span>
                   {res.fileSize && <span className="text-xs text-gray-400">{res.fileSize}</span>}
                </div>
              </div>
              <a 
                href={res.downloadUrl} 
                download
                className="p-2 text-gray-400 hover:text-brand-accent hover:bg-blue-50 rounded-full transition-all self-center hover:scale-110 active:scale-95"
                title="Download File"
              >
                <Download size={20} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Downloads;