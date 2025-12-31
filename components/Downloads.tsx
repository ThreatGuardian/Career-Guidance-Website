import React from 'react';
import SectionHeading from './SectionHeading';
import { ResourceItem } from '../types';
import { FileText, Download, File, Presentation } from 'lucide-react';

interface DownloadsProps {
  resources: ResourceItem[];
}

const Downloads: React.FC<DownloadsProps> = ({ resources }) => {
  if (resources.length === 0) return null;

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-500" size={24} />;
      case 'ppt': return <Presentation className="text-orange-500" size={24} />;
      default: return <File className="text-blue-500" size={24} />;
    }
  };

  return (
    <section id="downloads" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="References & Downloads" 
          subtitle="Access presentations, brochures, and detailed guides."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {resources.map((res) => (
            <div 
              key={res.id} 
              className="border border-gray-100 rounded-xl p-5 hover:border-brand-accent/30 hover:shadow-lg transition-all flex items-start gap-4 group bg-gray-50 hover:bg-white"
            >
              <div className="bg-white p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                {getFileIcon(res.fileType)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-brand-navy truncate pr-2">{res.title}</h4>
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">{res.description}</p>
                <div className="flex items-center gap-3">
                   <span className="text-xs font-mono bg-gray-200 px-2 py-0.5 rounded text-gray-600 uppercase">{res.fileType}</span>
                   {res.fileSize && <span className="text-xs text-gray-400">{res.fileSize}</span>}
                </div>
              </div>
              <a 
                href={res.downloadUrl} 
                download
                className="p-2 text-gray-400 hover:text-brand-accent hover:bg-blue-50 rounded-full transition-colors self-center"
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