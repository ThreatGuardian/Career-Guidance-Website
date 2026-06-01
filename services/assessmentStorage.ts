// Assessment Storage Service — localStorage helpers for assessment progress

export interface AssessmentProgress {
  answers: Record<string, number>; // e.g. { "S1Q01": 4, "S1Q02": 3 }
  currentSection: number;
  currentQuestion: number;
  startedAt: string;
  completedAt: string | null;
  timeTaken: number; // seconds elapsed
  userId: string; // phone number or uid
}

const STORAGE_KEY = 'career_assessment_progress';
const TOTAL_QUESTIONS = 55;

export const AssessmentStorage = {
  saveProgress: (data: AssessmentProgress): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save assessment progress:', e);
    }
  },

  loadProgress: (): AssessmentProgress | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      return JSON.parse(stored) as AssessmentProgress;
    } catch (e) {
      console.error('Failed to load assessment progress:', e);
      return null;
    }
  },

  clearProgress: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear assessment progress:', e);
    }
  },

  isComplete: (answers: Record<string, number>): boolean => {
    return Object.keys(answers).length >= TOTAL_QUESTIONS;
  },

  getAnsweredCount: (answers: Record<string, number>): number => {
    return Object.keys(answers).length;
  },

  getReliabilityData: (progress: AssessmentProgress) => {
    return {
      startedAt: progress.startedAt,
      completedAt: progress.completedAt,
      timeTaken: progress.timeTaken,
      totalAnswered: Object.keys(progress.answers).length,
      totalQuestions: TOTAL_QUESTIONS,
      completionRate: Math.round((Object.keys(progress.answers).length / TOTAL_QUESTIONS) * 100),
    };
  },
};
