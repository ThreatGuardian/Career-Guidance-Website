import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-3 relative inline-block">
        {title}
      </h2>
      <div className={`flex items-center gap-1.5 mt-2 mb-4 ${centered ? 'justify-center' : 'justify-start'}`}>
        <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
        <span className="w-16 h-1 rounded-full bg-gradient-to-r from-brand-accent to-brand-accent/30"></span>
      </div>
      {subtitle && (
        <p className="mt-2 text-brand-slate text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;