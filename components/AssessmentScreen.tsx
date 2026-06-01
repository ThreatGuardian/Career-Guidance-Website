import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronLeft,
  RotateCcw,
  Send,
  Loader2,
  Brain,
  Compass,
  Lightbulb,
} from 'lucide-react';
import assessmentData from '../data/career_assessment.json';
import { AssessmentStorage, AssessmentProgress } from '../services/assessmentStorage';

interface AssessmentScreenProps {
  userId: string;
  onComplete: (progress: AssessmentProgress) => void;
  onBack: () => void;
}

// Flatten questions with section info
interface FlatQuestion {
  id: string;
  text: string;
  tags: string[];
  sectionIndex: number;
  sectionId: string;
  sectionTitle: string;
  sectionDescription: string;
  sectionFramework: string;
  questionIndexInSection: number;
  globalIndex: number;
}

const SCALE_LABELS: Record<number, string> = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly Agree',
};

const SECTION_ICONS = [Compass, Brain, Lightbulb];

const AssessmentScreen: React.FC<AssessmentScreenProps> = ({ userId, onComplete, onBack }) => {
  const { assessment } = assessmentData;
  
  // Flatten all questions
  const allQuestions: FlatQuestion[] = React.useMemo(() => {
    const questions: FlatQuestion[] = [];
    let globalIndex = 0;
    assessment.sections.forEach((section, sectionIndex) => {
      section.questions.forEach((q, qIndex) => {
        questions.push({
          id: q.id,
          text: q.text,
          tags: q.tags,
          sectionIndex,
          sectionId: section.section_id,
          sectionTitle: section.title,
          sectionDescription: section.description,
          sectionFramework: section.framework,
          questionIndexInSection: qIndex,
          globalIndex,
        });
        globalIndex++;
      });
    });
    return questions;
  }, [assessment]);

  const totalQuestions = allQuestions.length;

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [startedAt, setStartedAt] = useState<string>('');
  const [elapsed, setElapsed] = useState(0); // seconds
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  const currentQuestion = allQuestions[currentIndex];
  const currentSectionIndex = currentQuestion.sectionIndex;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
  const unansweredCount = totalQuestions - answeredCount;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  // Check for saved progress on mount
  useEffect(() => {
    const saved = AssessmentStorage.loadProgress();
    if (saved && saved.userId === userId && Object.keys(saved.answers).length > 0) {
      setShowResumePrompt(true);
    } else {
      initFreshAssessment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initFreshAssessment = () => {
    const now = new Date().toISOString();
    setStartedAt(now);
    setCurrentIndex(0);
    setAnswers({});
    setElapsed(0);
    setShowResumePrompt(false);
    startTimer();
  };

  const resumeAssessment = () => {
    const saved = AssessmentStorage.loadProgress()!;
    setAnswers(saved.answers);
    setCurrentIndex(saved.currentQuestion);
    setStartedAt(saved.startedAt);
    setElapsed(saved.timeTaken);
    setShowResumePrompt(false);
    startTimer();
  };

  // Timer
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Autosave on changes
  useEffect(() => {
    if (!startedAt || showResumePrompt) return;
    
    const progress: AssessmentProgress = {
      answers,
      currentSection: currentSectionIndex,
      currentQuestion: currentIndex,
      startedAt,
      completedAt: null,
      timeTaken: elapsed,
      userId,
    };
    AssessmentStorage.saveProgress(progress);
  }, [answers, currentIndex, elapsed, startedAt, userId, currentSectionIndex, showResumePrompt]);

  // Format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Navigation
  const goNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      questionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentIndex, totalQuestions]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      questionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentIndex]);

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  // Answer selection
  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setHasInteracted(true);
    
    // Auto-advance after a short delay
    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => goNext(), 350);
    }
  };

  // Submit
  const handleSubmit = () => {
    if (unansweredCount > 0) {
      setShowSubmitConfirm(true);
      return;
    }
    doSubmit();
  };

  const doSubmit = () => {
    setIsSubmitting(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const completedAt = new Date().toISOString();
    const progress: AssessmentProgress = {
      answers,
      currentSection: currentSectionIndex,
      currentQuestion: currentIndex,
      startedAt,
      completedAt,
      timeTaken: elapsed,
      userId,
    };

    AssessmentStorage.saveProgress(progress);

    // Brief delay for animation
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete(progress);
    }, 1000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showResumePrompt || showSubmitConfirm) return;
      
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (answers[currentQuestion.id]) goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        handleAnswer(parseInt(e.key));
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, answers, goNext, goPrev, showResumePrompt, showSubmitConfirm, currentQuestion.id]);

  // Get section progress
  const getSectionProgress = (sectionIdx: number) => {
    const section = assessment.sections[sectionIdx];
    const sectionQuestions = section.questions;
    const answered = sectionQuestions.filter((q) => answers[q.id] !== undefined).length;
    return { answered, total: sectionQuestions.length };
  };

  // Resume Prompt
  if (showResumePrompt) {
    const saved = AssessmentStorage.loadProgress()!;
    const savedAnswered = Object.keys(saved.answers).length;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <RotateCcw size={28} className="text-brand-accent" />
          </div>
          <h2 className="text-xl font-heading font-bold text-brand-navy mb-3">
            Resume Assessment?
          </h2>
          <p className="text-gray-600 text-sm mb-2">
            You have a saved assessment in progress.
          </p>
          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-sm text-left space-y-1">
            <p className="text-gray-600"><strong className="text-brand-navy">{savedAnswered}</strong> of {totalQuestions} questions answered</p>
            <p className="text-gray-600">Time spent: <strong className="text-brand-navy">{formatTime(saved.timeTaken)}</strong></p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={resumeAssessment}
              className="w-full py-3 rounded-xl bg-brand-navy text-white font-semibold flex items-center justify-center gap-2 hover:bg-brand-accent transition-all active:scale-[0.98] shadow-lg"
            >
              Resume Assessment <ArrowRight size={18} />
            </button>
            <button
              onClick={() => {
                AssessmentStorage.clearProgress();
                initFreshAssessment();
              }}
              className="w-full py-3 rounded-xl bg-white text-gray-600 font-medium border-2 border-gray-200 hover:border-red-300 hover:text-red-600 transition-all"
            >
              Start Fresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-white flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Row 1: Back + Timer + Progress counter */}
          <div className="flex items-center justify-between py-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-gray-500 hover:text-brand-navy transition-colors text-sm"
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Exit</span>
            </button>

            <h1 className="font-heading font-bold text-brand-navy text-sm sm:text-base truncate px-2">
              {assessment.title}
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                <Clock size={14} />
                <span className="font-mono font-medium">{formatTime(elapsed)}</span>
              </div>
            </div>
          </div>

          {/* Row 2: Section tabs */}
          <div className="flex gap-2 pb-3">
            {assessment.sections.map((section, idx) => {
              const prog = getSectionProgress(idx);
              const SectionIcon = SECTION_ICONS[idx];
              const isActive = idx === currentSectionIndex;
              const isCompleted = prog.answered === prog.total;

              return (
                <button
                  key={section.section_id}
                  onClick={() => {
                    // Jump to first question of this section
                    let targetIdx = 0;
                    for (let i = 0; i < idx; i++) {
                      targetIdx += assessment.sections[i].questions.length;
                    }
                    goToQuestion(targetIdx);
                  }}
                  className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all border ${
                    isActive
                      ? 'bg-brand-navy text-white border-brand-navy shadow-md'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <SectionIcon size={16} className={isActive ? 'text-white/80' : ''} />
                  <span className="hidden sm:inline truncate">{section.title}</span>
                  <span className="ml-auto text-[10px] font-bold opacity-70">
                    {prog.answered}/{prog.total}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Row 3: Progress bar */}
          <div className="pb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-gray-400 font-medium">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span className="text-[11px] text-gray-400 font-medium">
                {progressPercent}% complete
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-accent to-emerald-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex items-start justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-2xl w-full" ref={questionRef}>
          {/* Section header (show on first question of each section) */}
          {currentQuestion.questionIndexInSection === 0 && (
            <div className="mb-8 p-5 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                {React.createElement(SECTION_ICONS[currentSectionIndex], {
                  size: 22,
                  className: 'text-brand-accent',
                })}
                <h2 className="font-heading font-bold text-brand-navy text-lg">
                  Section {currentSectionIndex + 1}: {currentQuestion.sectionTitle}
                </h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed ml-[34px]">
                {currentQuestion.sectionDescription}
              </p>
              <div className="ml-[34px] mt-2 text-xs text-gray-400">
                Framework: {currentQuestion.sectionFramework}
              </div>
            </div>
          )}

          {/* Question Card */}
          <div
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 p-6 sm:p-8 transition-all duration-300"
            key={currentQuestion.id}
            style={{ animation: 'fadeSlideIn 0.3s ease-out' }}
          >
            {/* Question number */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 rounded-xl bg-brand-navy text-white text-sm font-bold flex items-center justify-center shadow-md">
                {currentIndex + 1}
              </span>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                {currentQuestion.sectionTitle} &middot; Q{currentQuestion.questionIndexInSection + 1}
              </div>
            </div>

            {/* Question text */}
            <h3 className="text-lg sm:text-xl font-medium text-gray-800 leading-relaxed mb-8">
              {currentQuestion.text}
            </h3>

            {/* Likert Scale */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((value) => {
                const isSelected = answers[currentQuestion.id] === value;
                return (
                  <button
                    key={value}
                    onClick={() => handleAnswer(value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 group active:scale-[0.98] ${
                      isSelected
                        ? 'bg-brand-navy/5 border-brand-accent text-brand-navy shadow-md'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-brand-accent/40 hover:bg-blue-50/30 hover:shadow-sm'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 transition-all font-bold text-sm ${
                        isSelected
                          ? 'bg-brand-accent border-brand-accent text-white shadow-sm'
                          : 'border-gray-300 text-gray-400 group-hover:border-brand-accent/50'
                      }`}
                    >
                      {isSelected ? <CheckCircle size={20} /> : value}
                    </div>
                    <span className={`text-sm sm:text-base font-medium ${isSelected ? 'text-brand-navy' : ''}`}>
                      {SCALE_LABELS[value]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Keyboard hint */}
            <p className="text-[11px] text-gray-400 text-center mt-5 hidden sm:block">
              Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono">1-5</kbd> to answer
              &middot; <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono">←</kbd> <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono">→</kbd> to navigate
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6 gap-4">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:border-brand-navy hover:text-brand-navy disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Question dot navigator (mini) */}
            <div className="hidden sm:flex items-center gap-1 flex-1 justify-center max-w-xs overflow-hidden px-2">
              {allQuestions.slice(
                Math.max(0, currentIndex - 4),
                Math.min(totalQuestions, currentIndex + 5)
              ).map((q) => (
                <button
                  key={q.id}
                  onClick={() => goToQuestion(q.globalIndex)}
                  className={`w-2.5 h-2.5 rounded-full transition-all shrink-0 ${
                    q.globalIndex === currentIndex
                      ? 'w-6 bg-brand-accent'
                      : answers[q.id] !== undefined
                      ? 'bg-emerald-400'
                      : 'bg-gray-300'
                  }`}
                  title={`Question ${q.globalIndex + 1}`}
                />
              ))}
            </div>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-600/20"
              >
                <Send size={18} />
                Submit
              </button>
            ) : (
              <button
                onClick={goNext}
                disabled={!answers[currentQuestion.id]}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-navy text-white font-medium hover:bg-brand-accent disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-brand-navy/20"
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>

          {/* Answered count (mobile) */}
          <div className="mt-4 text-center text-xs text-gray-400 sm:hidden">
            {answeredCount} of {totalQuestions} answered
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center" style={{ animation: 'fadeSlideIn 0.25s ease-out' }}>
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <AlertTriangle size={28} className="text-amber-600" />
            </div>
            <h3 className="font-heading font-bold text-brand-navy text-lg mb-2">
              Incomplete Assessment
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              You have <strong className="text-red-600">{unansweredCount} unanswered question{unansweredCount !== 1 ? 's' : ''}</strong>. 
              Submitting now may affect the accuracy of your career report.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="w-full py-3 rounded-xl bg-brand-navy text-white font-semibold transition-all hover:bg-brand-accent active:scale-[0.98] shadow-lg"
              >
                Review Answers
              </button>
              <button
                onClick={() => {
                  setShowSubmitConfirm(false);
                  doSubmit();
                }}
                className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:border-red-300 hover:text-red-600 transition-all"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submitting Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-xl z-[100] flex items-center justify-center">
          <div className="text-center">
            <Loader2 size={48} className="text-brand-accent animate-spin mx-auto mb-4" />
            <h3 className="font-heading font-bold text-brand-navy text-xl mb-2">Saving Your Responses</h3>
            <p className="text-gray-500 text-sm">This will only take a moment...</p>
          </div>
        </div>
      )}

      {/* CSS for fadeSlideIn animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AssessmentScreen;
