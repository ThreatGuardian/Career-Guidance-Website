import { GoogleGenAI, Modality } from "@google/genai";

// Initialize Gemini Client
// NOTE: In a real production app, ensure API_KEY is restricted or proxied.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const GeminiService = {
  /**
   * Streaming Chat with Search Grounding
   */
  chatStream: async function* (history: {role: string, parts: {text: string}[]}[], message: string) {
    try {
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: "You are 'Bhagwan AI', a senior career counsellor assistant for Bhagwan Pandekar. You provide empathetic, accurate, and scientific career guidance to Indian students and parents. You are helpful, concise, and professional. If asked about fees, refer them to the booking section.",
          tools: [{ googleSearch: {} }], // Phase 5: Grounding
        },
        history: history
      });

      const result = await chat.sendMessageStream({ message });
      
      for await (const chunk of result) {
        yield chunk;
      }
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      throw error;
    }
  },

  /**
   * Generate Career Roadmap
   */
  generateRoadmap: async (grade: string, interests: string, subjects: string) => {
    try {
        const prompt = `Create a step-by-step career roadmap for a student in Grade ${grade} who is interested in ${interests} and strong in ${subjects}. 
        Format the response in Markdown with clear headings like 'Immediate Steps', 'Entrance Exams', 'Degree Options', and 'Future Careers'. Keep it encouraging.`;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview', // Using Flash for speed/reasoning balance
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 1024 }, // Thinking for better planning
            }
        });
        return response.text;
    } catch (error) {
        console.error("Roadmap Gen Error:", error);
        throw error;
    }
  },

  /**
   * Phase 6: Text to Speech
   */
  speak: async (text: string): Promise<string | undefined> => {
    try {
        // Limit text length for TTS demo purposes
        const shortText = text.length > 300 ? text.substring(0, 300) + "..." : text;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: shortText }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' }, // Gentle voice
                    },
                },
            },
        });
        
        // Return base64 audio data
        return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    } catch (error) {
        console.error("TTS Error:", error);
        return undefined;
    }
  }
};