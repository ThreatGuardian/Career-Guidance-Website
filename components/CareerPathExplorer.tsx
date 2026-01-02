import React, { useState } from 'react';
import { CAREER_FLOW_DATA } from './CareerFlowData';
import { ArrowRight, ArrowLeft, CheckCircle2, BookOpen, Clock, Trophy, RotateCcw, MapPin } from 'lucide-react';

const CareerPathExplorer: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['root']);
  const currentNodeId = history[history.length - 1];
  const currentNode = CAREER_FLOW_DATA[currentNodeId];

  const handleOptionClick = (nextId: string) => {
    setHistory([...history, nextId]);
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
    }
  };

  const handleReset = () => {
    setHistory(['root']);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header / Breadcrumbs */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 overflow-x-auto pb-2 no-scrollbar">
          {history.map((id, index) => {
            const node = CAREER_FLOW_DATA[id];
            const isLast = index === history.length - 1;
            return (
              <React.Fragment key={id}>
                <span className={`${isLast ? 'font-bold text-brand-navy' : 'text-gray-400'}`}>
                  {node.label}
                </span>
                {!isLast && <ArrowRight size={14} className="text-gray-300 flex-shrink-0" />}
              </React.Fragment>
            );
          })}
        </div>
        
        {history.length > 1 && (
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 text-xs font-medium text-brand-accent hover:text-brand-navy transition-colors"
          >
            <RotateCcw size={14} /> Start Over
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl overflow-hidden relative min-h-[400px] transition-all duration-500">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

        <div className="p-8 md:p-10 relative z-10">
          
          {/* Back Button */}
          {history.length > 1 && (
            <button 
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-gray-500 hover:text-brand-navy transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-brand-navy transition-colors">
                <ArrowLeft size={16} />
              </div>
              <span className="text-sm font-medium">Back</span>
            </button>
          )}

          {/* Current Node Title & Desc */}
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">{currentNode.label}</h2>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">{currentNode.description}</p>
          </div>

          {/* Options Grid (if not leaf) */}
          {currentNode.next && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              {currentNode.next.map((nextId) => {
                const nextNode = CAREER_FLOW_DATA[nextId];
                if (!nextNode) return null;
                return (
                  <button
                    key={nextId}
                    onClick={() => handleOptionClick(nextId)}
                    className="group text-left p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-accent/30 transition-all relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-brand-navy mb-2">{nextNode.label}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{nextNode.description}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-accent group-hover:text-white transition-all transform group-hover:translate-x-1">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Leaf Node Details (Career Info) */}
          {currentNode.type === 'career' && currentNode.data && (
            <div className="animate-in zoom-in-95 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Exams Card */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <BookOpen size={20} />
                    </div>
                    <h4 className="font-bold text-lg text-brand-navy">Entrance Exams</h4>
                  </div>
                  <ul className="space-y-2">
                    {currentNode.data.exams?.map((exam, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                        {exam}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Duration Card */}
                <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                      <Clock size={20} />
                    </div>
                    <h4 className="font-bold text-lg text-brand-navy">Duration</h4>
                  </div>
                  <p className="text-gray-700 font-medium text-lg">{currentNode.data.duration}</p>
                </div>

                {/* Skills Card */}
                <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                      <Trophy size={20} />
                    </div>
                    <h4 className="font-bold text-lg text-brand-navy">Key Skills</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentNode.data.skills?.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-orange-200 text-orange-800 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcomes Card */}
                <div className="bg-green-50/50 border border-green-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                      <CheckCircle2 size={20} />
                    </div>
                    <h4 className="font-bold text-lg text-brand-navy">Career Outcomes</h4>
                  </div>
                  <ul className="space-y-2">
                    {currentNode.data.outcomes?.map((outcome, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 size={14} className="text-green-500" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-200 text-center">
                <p className="text-gray-600 mb-4">Want to know more about colleges and admission process?</p>
                <a href="#contact" className="inline-flex items-center gap-2 text-brand-accent font-bold hover:underline">
                  Book a Counseling Session <ArrowRight size={16} />
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CareerPathExplorer;