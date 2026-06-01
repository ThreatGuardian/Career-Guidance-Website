import { UserProfile } from '../services/scoringEngine';
import { TopCareer } from '../services/careerMatching';

export interface AIReport {
  strengths: string[];
  developmentAreas: string[];
  learningStyle: string;
  careerFitNarrative: string;
  academicRecommendations: string[];
  conclusion: string;
}

export const generateCareerReport = async (
  userId: string,
  profile: UserProfile,
  topCareers: TopCareer[]
): Promise<AIReport> => {
  // 1. Check cache first
  const cacheKey = `ai_report_${userId}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached) as AIReport;
    } catch (e) {
      console.error('Failed to parse cached report', e);
    }
  }

  // 2. Call our secure backend endpoint
  try {
    const response = await fetch('/api/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        profile,
        topCareers
      })
    });

    if (!response.ok) {
      // Attempt to extract the error message from the backend
      let errorMsg = `Server error: ${response.status} ${response.statusText}`;
      try {
        const errData = await response.json();
        if (errData.error) errorMsg = errData.error;
      } catch (e) {} // Fallback to generic status text if not JSON
      
      throw new Error(errorMsg);
    }

    const reportJSON = await response.json() as AIReport;
    
    // Cache the result
    localStorage.setItem(cacheKey, JSON.stringify(reportJSON));
    
    return reportJSON;
  } catch (error: any) {
    console.error('Failed to generate AI report:', error);
    throw new Error(error.message || 'Failed to communicate with the server');
  }
};
