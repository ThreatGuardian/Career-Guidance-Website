import careerData from '../data/career_database.json';
import { UserProfile } from './scoringEngine';

export interface TopCareer {
  id: string;
  career: string;
  category: string;
  match: number;
}

export const CareerMatching = {
  matchCareers: (userProfile: UserProfile): TopCareer[] => {
    const { riasec, personality, skills } = userProfile;
    
    // Map user's full personality names back to DB tags for easier lookup
    const userPersonalityForDB: Record<string, number> = {
      'O': personality.Openness,
      'C': personality.Conscientiousness,
      'E': personality.Extraversion,
      'A': personality.Agreeableness,
      'N_low': personality.EmotionalStability
    };

    const matches: TopCareer[] = careerData.careers.map((career) => {
      // 1. RIASEC Similarity (50% weight)
      // career.riasec contains an array like ["I", "R", "C"]
      let riasecScore = 0;
      if (career.riasec && career.riasec.length > 0) {
        let sum = 0;
        career.riasec.forEach((trait) => {
          sum += (riasec[trait] || 0);
        });
        riasecScore = sum / career.riasec.length;
      } else {
        riasecScore = 50; // Fallback
      }

      // 2. Personality Similarity (30% weight)
      // career.personality_traits contains an array like ["O", "C", "N_low"]
      let personalityScore = 0;
      if (career.personality_traits && career.personality_traits.length > 0) {
        let sum = 0;
        career.personality_traits.forEach((trait) => {
          sum += (userPersonalityForDB[trait] || 0);
        });
        personalityScore = sum / career.personality_traits.length;
      } else {
        personalityScore = 50; // Fallback
      }

      // 3. Skills Similarity (20% weight)
      // Combine career.preferred_skills and career.work_style
      let skillsScore = 50; // Default baseline if no overlap is found (don't penalize unassessed skills)
      const careerTags = [
        ...(career.preferred_skills || []),
        ...(career.work_style || [])
      ];
      
      if (careerTags.length > 0) {
        let overlapCount = 0;
        let overlapSum = 0;
        careerTags.forEach((tag) => {
          if (skills[tag] !== undefined) {
            overlapSum += skills[tag];
            overlapCount++;
          }
        });
        // Only override the 50% baseline if we actually found overlapping skills assessed
        if (overlapCount > 0) {
          skillsScore = overlapSum / overlapCount;
        }
      }

      const totalMatch = Math.round((riasecScore * 0.5) + (personalityScore * 0.3) + (skillsScore * 0.2));

      return {
        id: career.id,
        career: career.name,
        category: career.category,
        match: Math.min(100, Math.max(0, totalMatch)) // clamp 0-100 just in case
      };
    });

    // Sort descending by match percentage
    matches.sort((a, b) => b.match - a.match);

    // Return Top 10 careers
    return matches.slice(0, 10);
  }
};
