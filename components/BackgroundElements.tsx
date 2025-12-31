import React from 'react';
import { Compass, GraduationCap, BrainCircuit, BookOpen, Target, Lightbulb } from 'lucide-react';

const BackgroundElements: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Soft Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 via-white to-gray-50/50"></div>
      
      {/* Top Right Blob */}
      <div className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] bg-brand-accent/5 rounded-full blur-3xl animate-blob"></div>
      
      {/* Bottom Left Blob */}
      <div className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] bg-brand-navy/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      {/* --- Floating "Watermark" Icons --- */}
      
      {/* 1. Compass (Direction) - Top Left */}
      <div className="absolute top-[15%] left-[5%] opacity-[0.03] animate-spin-slow">
        <Compass size={300} className="text-brand-navy" />
      </div>

      {/* 2. Brain (Psychology/Mind) - Middle Right */}
      <div className="absolute top-[40%] right-[5%] opacity-[0.04] animate-drift">
        <BrainCircuit size={400} className="text-brand-accent" />
      </div>

      {/* 3. Grad Cap (Success) - Bottom Left */}
      <div className="absolute bottom-[10%] left-[10%] opacity-[0.03] animate-drift-reverse">
        <GraduationCap size={350} className="text-brand-navy" />
      </div>

      {/* 4. Target (Goals) - Top Center (Subtle) */}
      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 opacity-[0.02] animate-float">
        <Target size={200} className="text-brand-slate" />
      </div>

      {/* 5. Book (Knowledge) - Bottom Right */}
      <div className="absolute bottom-[20%] right-[15%] opacity-[0.03] animate-float" style={{ animationDelay: '2s' }}>
        <BookOpen size={250} className="text-brand-accent" />
      </div>
      
      {/* 6. Lightbulb (Ideas) - Middle Left */}
      <div className="absolute top-[60%] left-[5%] opacity-[0.02] animate-drift" style={{ animationDelay: '1s' }}>
        <Lightbulb size={200} className="text-brand-navy" />
      </div>

      {/* Geometric Lines overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.1]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default BackgroundElements;