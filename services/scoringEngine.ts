import assessmentData from '../data/career_assessment.json';

export interface UserProfile {
  riasec: Record<string, number>;
  personality: Record<string, number>;
  skills: Record<string, number>;
  reliability?: {
    score: number;
    level: 'High' | 'Medium' | 'Low';
  };
  hollandCode?: string;
  stanineScore?: number;
}

export const ScoringEngine = {
  calculateScores: (answers: Record<string, number>, timeTakenSeconds: number = 250): UserProfile => {
    const riasecRaw: Record<string, { sum: number; count: number }> = {};
    const personalityRaw: Record<string, { sum: number; count: number }> = {};
    const skillsRaw: Record<string, { sum: number; count: number }> = {};

    assessmentData.assessment.sections.forEach((section) => {
      section.questions.forEach((q) => {
        const answer = answers[q.id];
        if (answer === undefined) return;

        if (section.section_id === 'S1') {
          // RIASEC
          const tag = q.tags.find((t) => ['R', 'I', 'A', 'S', 'E', 'C'].includes(t));
          if (tag) {
            if (!riasecRaw[tag]) riasecRaw[tag] = { sum: 0, count: 0 };
            riasecRaw[tag].sum += answer;
            riasecRaw[tag].count += 1;
          }
        } else if (section.section_id === 'S2') {
          // Big5 (Personality)
          const traitTag = q.tags.find((t) => ['O', 'C', 'E', 'A', 'N'].includes(t));
          if (traitTag) {
            let score = answer;
            // Handle reverse scoring (e.g. Neuroticism -> Emotional Stability)
            if (q.tags.includes('reverse_scored')) {
              score = 6 - answer;
            }
            if (!personalityRaw[traitTag]) personalityRaw[traitTag] = { sum: 0, count: 0 };
            personalityRaw[traitTag].sum += score;
            personalityRaw[traitTag].count += 1;
          }
        } else if (section.section_id === 'S3') {
          // Skills & Inclinations
          // tags look like ["SKL", "verbal_communication"]
          const specificTag = q.tags.length > 1 ? q.tags[1] : null;
          if (specificTag) {
            if (!skillsRaw[specificTag]) skillsRaw[specificTag] = { sum: 0, count: 0 };
            skillsRaw[specificTag].sum += answer;
            skillsRaw[specificTag].count += 1;
          }
        }
      });
    });

    // Helper to normalize sum to a 0-100 percentage based on question count
    const normalize = (raw: Record<string, { sum: number; count: number }>): Record<string, number> => {
      const result: Record<string, number> = {};
      for (const [key, data] of Object.entries(raw)) {
        const minPossible = data.count * 1;
        const maxPossible = data.count * 5;
        if (maxPossible === minPossible) {
          result[key] = 100;
        } else {
          result[key] = Math.round(((data.sum - minPossible) / (maxPossible - minPossible)) * 100);
        }
      }
      return result;
    };

    const riasec = normalize(riasecRaw);
    const personalityTemp = normalize(personalityRaw);
    const skills = normalize(skillsRaw);
    
    // Map Personality codes to full names and ensure N maps to EmotionalStability
    const personality = {
      Openness: personalityTemp['O'] || 0,
      Conscientiousness: personalityTemp['C'] || 0,
      Extraversion: personalityTemp['E'] || 0,
      Agreeableness: personalityTemp['A'] || 0,
      EmotionalStability: personalityTemp['N'] || 0, 
    };

    // --- RELIABILITY ENGINE ---
    let reliabilityScore = 100;
    const answerValues = Object.values(answers);
    const totalAnswers = answerValues.length;

    // 1. Variance Check (Straight-lining)
    if (totalAnswers > 0) {
      const mean = answerValues.reduce((a, b) => a + b, 0) / totalAnswers;
      const variance = answerValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / totalAnswers;
      if (variance < 0.5) {
        reliabilityScore -= 50; // Heavy penalty for straight-lining (e.g., all 5s)
      } else if (variance < 1.0) {
        reliabilityScore -= 20; // Moderate penalty for low variance
      }
    }

    // 2. Time Check
    if (timeTakenSeconds < 120) {
      reliabilityScore -= 50; // Extremely fast completion
    } else if (timeTakenSeconds < 240) {
      reliabilityScore -= 20; // Medium fast completion
    }

    // 3. Repeating Patterns Check
    let repeatingSequences = 0;
    for (let i = 0; i < totalAnswers - 3; i++) {
      if (
        answerValues[i] === answerValues[i+2] && 
        answerValues[i+1] === answerValues[i+3] &&
        answerValues[i] !== answerValues[i+1]
      ) {
        repeatingSequences++;
      }
    }
    if (repeatingSequences > 5) {
      reliabilityScore -= 30;
    }

    // Ensure bounds
    reliabilityScore = Math.max(0, Math.min(100, Math.round(reliabilityScore)));
    
    let reliabilityLevel: 'High' | 'Medium' | 'Low' = 'High';
    if (reliabilityScore < 60) reliabilityLevel = 'Low';
    else if (reliabilityScore < 85) reliabilityLevel = 'Medium';

    const reliability = { score: reliabilityScore, level: reliabilityLevel };

    // --- HOLLAND CODE ---
    const hollandCode = Object.entries(riasec)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0])
      .join('');

    // --- STANINE SCORE ---
    const getAverage = (obj: Record<string, number>) => {
      const values = Object.values(obj);
      return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    };
    
    const skillsAvg = getAverage(skills);
    const riasecAvg = getAverage(riasec);
    const personalityAvg = getAverage(personality);
    
    const percentile = (skillsAvg * 0.4) + (riasecAvg * 0.3) + (personalityAvg * 0.3);
    
    let stanineScore = 5;
    if (percentile < 4) stanineScore = 1;
    else if (percentile < 11) stanineScore = 2;
    else if (percentile < 23) stanineScore = 3;
    else if (percentile < 40) stanineScore = 4;
    else if (percentile < 60) stanineScore = 5;
    else if (percentile < 77) stanineScore = 6;
    else if (percentile < 89) stanineScore = 7;
    else if (percentile < 96) stanineScore = 8;
    else stanineScore = 9;

    return { riasec, personality, skills, reliability, hollandCode, stanineScore };
  }
};
