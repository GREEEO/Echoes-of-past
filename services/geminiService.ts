
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStory = async (ancestry: string, locationName: string, context: string): Promise<string> => {
  const prompt = `
    Player Ancestry: ${ancestry}
    Location: ${locationName}
    Historical Context: ${context}

    Based on the information above, tell me a compelling, first-person story.
    Speak as the NPC elder of this land. The story should be about how the player's ancestors fought and struggled here.
    Make the story vivid, atmospheric, and about 3-4 paragraphs long.
    Focus on the emotions, the strategies, and the visceral reality of the conflict.
    Do not break character.
  `;
  
  const systemInstruction = "You are a wise elder and master storyteller in a historical, open-world game. You recount tales of the past to the player, who is a descendant of the people you speak of. Your stories should be vivid, emotional, and told in the first person as if you are a character in the world. Focus on the struggles, bravery, and strategies of the ancestors.";

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.8,
            topP: 0.95,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating story from Gemini API:", error);
    return "The winds of time are howling, and the spirits are silent. I cannot recall the tale at this moment. Try again when the air is clearer.";
  }
};
