import React, { useState } from 'react';
import { BrainCircuit, Sparkles, ArrowRight, CheckCircle2, X, Loader2 } from 'lucide-react';
import { CAREER_PATHS } from './ResourceData';

const questions = [
  {
    id: 1,
    text: "What's your favorite way to solve a problem?",
    options: [
      { text: "Analyze data and find logical patterns", type: "eng" },
      { text: "Understand the people involved and help them", type: "med" },
      { text: "Look at the financial or business impact", type: "comm" },
      { text: "Debate the rules and find a fair solution", type: "law" }
    ]
  },
  {
    id: 2,
    text: "Which school subject do you actually enjoy?",
    options: [
      { text: "Mathematics & Physics", type: "eng" },
      { text: "Biology & Human Anatomy", type: "med" },
      { text: "Economics & Accounts", type: "comm" },
      { text: "History, Pol. Science or Literature", type: "arts" }
    ]
  },
  {
    id: 3,
    text: "In a group project, what role do you take?",
    options: [
      { text: "The Builder: I make things work", type: "eng" },
      { text: "The Leader: I manage the team & goals", type: "comm" },
      { text: "The Creative: I design how it looks", type: "arts" },
      { text: "The Protector: I ensure we follow rules", type: "def" }
    ]
  },
  {
    id: 4,
    text: "What kind of work environment excites you?",
    options: [
      { text: "A tech lab or construction site", type: "eng" },
      { text: "A hospital or clinic helping patients", type: "med" },
      { text: "A corporate office or boardroom", type: "comm" },
      { text: "A courtroom or legal firm", type: "law" }
    ]
  }
];

const AICareerMatch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); // 0 = Intro, 1..n = Questions, 99 = Loading, 100 = Result
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  const handleStart = () => {
    setIsOpen(true);
    setStep(0);
    setAnswers([]);
  };

  const handleOptionClick = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (step < questions.length) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    setStep(99); // Loading
    
    // Simple logic: Find the most frequent type
    // In a real app, this would call the Gemini API
    setTimeout(() => {
      const counts: Record<string, number> = {};
      finalAnswers.forEach(a => counts[a] = (counts[a] || 0) + 1);
      
      const topType = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      const matchedCareer = CAREER_PATHS.find(c => c.id === topType) || CAREER_PATHS[0];
      
      setResult(matchedCareer);
      setStep(100);
    }, 2000);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Liquid Background */}
      <div className="absolute inset-0 bg-brand-navy">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-brand-accent/20 rounded-full blur-[80px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-sm font-medium mb-6 shadow-lg shadow-blue-900/20">
              <Sparkles size={16} className="text-yellow-400" />
              <span>AI-Powered Discovery</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Confused about your future? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-brand-accent">Let AI find your path.</span>
            </h2>
            <p className="text-blue-100/80 text-lg mb-8 max-w-xl leading-relaxed">
              Take our 2-minute personality analysis. Our AI evaluates your interests, strengths, and logic to recommend the best career for you.
            </p>
            <button 
              onClick={handleStart}
              className="group relative bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/20 shadow-xl transition-all hover:scale-105 hover:shadow-brand-accent/20 flex items-center gap-3 mx-auto md:mx-0 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <BrainCircuit size={24} className="text-brand-accent" />
              <span>Start AI Analysis</span>
              <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
            </button>
          </div>

          <div className="flex-1 flex justify-center w-full">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.5)]">
              {/* Glass Reflection/Shine */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-white/30 to-transparent rounded-[2rem] pointer-events-none z-0"></div>
              
              {/* Mock Chat Interface */}
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-accent to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                    <BrainCircuit size={20} />
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 text-blue-50 p-4 rounded-2xl rounded-tl-none text-sm shadow-sm">
                    Hello! I'm your AI Career Guide. Ready to discover your potential?
                  </div>
                </div>
                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-inner">
                    <div className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_12px_rgba(74,222,128,0.8)]"></div>
                  </div>
                  <div className="bg-brand-accent/30 backdrop-blur-md border border-brand-accent/30 text-white p-4 rounded-2xl rounded-tr-none text-sm shadow-sm">
                    Yes, help me choose!
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-accent to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                    <BrainCircuit size={20} />
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 text-blue-50 p-4 rounded-2xl rounded-tl-none text-sm shadow-sm">
                    Analyzing your profile... 
                    <div className="flex gap-1.5 mt-3">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* QUIZ MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-lg animate-in fade-in duration-300">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-20 bg-white/50 p-2 rounded-full hover:bg-white/80"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-10 relative z-10">
              {/* Step 0: Intro */}
              {step === 0 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-accent">
                    <BrainCircuit size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-2">AI Career Analysis</h3>
                  <p className="text-gray-500 mb-8">We'll ask you 4 simple questions to understand your mindset.</p>
                  <button 
                    onClick={() => setStep(1)}
                    className="bg-brand-navy text-white px-8 py-3 rounded-xl font-medium hover:bg-brand-accent transition-colors"
                  >
                    Let's Begin
                  </button>
                </div>
              )}

              {/* Steps 1-4: Questions */}
              {step > 0 && step <= questions.length && (
                <div className="animate-in slide-in-from-right-8 duration-300">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-sm font-bold text-brand-accent uppercase tracking-wider">Question {step} of {questions.length}</span>
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-accent transition-all duration-500"
                        style={{ width: `${(step / questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-8 leading-snug">
                    {questions[step - 1].text}
                  </h3>

                  <div className="grid gap-4">
                    {questions[step - 1].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(option.type)}
                        className="text-left p-5 rounded-xl border-2 border-gray-100 hover:border-brand-accent hover:bg-blue-50 transition-all group"
                      >
                        <span className="font-medium text-gray-700 group-hover:text-brand-navy text-lg">{option.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 99: Loading */}
              {step === 99 && (
                <div className="text-center py-12">
                  <Loader2 size={48} className="animate-spin text-brand-accent mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Analyzing your responses...</h3>
                  <p className="text-gray-500">Matching with 50+ career paths</p>
                </div>
              )}

              {/* Step 100: Result */}
              {step === 100 && result && (
                <div className="text-center animate-in zoom-in-95 duration-300">
                  <div className="inline-block p-3 rounded-full bg-green-100 text-green-600 mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-brand-navy mb-2">It's a Match!</h2>
                  <p className="text-gray-500 mb-8">Based on your personality, you are best suited for:</p>

                  <div className="bg-gradient-to-br from-brand-navy to-blue-900 text-white p-8 rounded-2xl shadow-xl mb-8 transform hover:scale-105 transition-transform cursor-pointer">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <result.icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{result.category}</h3>
                    <p className="text-blue-200 text-sm line-clamp-2">{result.description}</p>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button 
                      onClick={() => {
                        setIsOpen(false);
                        document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-brand-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-accent/90 transition-colors"
                    >
                      Explore {result.category} Details
                    </button>
                    <button 
                      onClick={handleStart}
                      className="text-gray-500 hover:text-brand-navy px-6 py-3 font-medium"
                    >
                      Retake Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AICareerMatch;