import fetch from 'node-fetch';

export const generateCareerReportFromGroq = async (profile, topCareers) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY not configured on server');
  }

  const prompt = `You are a professional, encouraging career counsellor. Based on the following assessment data, generate a comprehensive career report. 
Do not claim certainty or use deterministic phrases like "You are destined to become...". Instead use phrasing like "You may be well suited for...", "Your profile suggests...", etc. Maintain a non-medical, professional tone.

CRITICAL INSTRUCTION: You MUST NOT generate or include any RIASEC scores, personality scores, Stanine scores, reliability scores, career match percentages, or rankings. These will be handled by the scoring engine. Focus exclusively on qualitative narratives.

USER PROFILE:
RIASEC Scores (0-100%): ${JSON.stringify(profile.riasec)}
Personality Traits (0-100%): ${JSON.stringify(profile.personality)}
Top Skills & Inclinations: ${JSON.stringify(profile.skills)}
Top 10 Career Matches: ${JSON.stringify(topCareers.map(c => c.career))}

Respond EXACTLY with a JSON object in this format (no markdown, no extra text):
{
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "developmentAreas": ["area 1", "area 2"],
  "learningStyle": "A short paragraph on how the user learns best",
  "academicRecommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
  "careerFitNarrative": "A paragraph explaining how the user's specific traits align with the recommended careers",
  "conclusion": "A 2-3 sentence concluding summary and encouragement."
}`;

  try {
    // using global fetch available in Node 18+
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
      // Simple timeout handling via AbortController if needed could go here
    });

    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data || !data.choices || !data.choices[0]) {
      throw new Error('Invalid response structure from Groq API');
    }

    const reportText = data.choices[0].message.content;
    const reportJSON = JSON.parse(reportText);
    
    return reportJSON;
  } catch (error) {
    console.error('Groq Service Error:', error.message);
    throw error;
  }
};
