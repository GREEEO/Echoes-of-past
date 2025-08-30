import { GoogleGenAI, Type } from "@google/genai";
import { StorySegment } from "../types";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    story: {
      type: Type.STRING,
      description: "A long, detailed, and immersive chapter of the story. It should be at least 800 words, focusing on rich descriptions, character emotions, and strategic depth.",
    },
    choices: {
      type: Type.ARRAY,
      description: "An array of 3-4 distinct and meaningful choices for the player. These should be concise action statements.",
      items: {
        type: Type.STRING,
      },
    },
  },
  required: ["story", "choices"],
};


export const generateStorySegment = async (
  ancestry: string,
  locationName: string,
  context: string,
  conversationHistory: StorySegment[]
): Promise<StorySegment | null> => {

  const historyPrompt = conversationHistory.map(segment => `\n\n--- PREVIOUSLY ---\n${segment.story}\n--- END OF PREVIOUSLY ---`).join('');

  let prompt;
  if (conversationHistory.length === 0) {
    prompt = `
      You are the starting point of an epic, interactive saga.
      The player is a descendant of the ${ancestry}. They are in the ${locationName}.
      The historical context is: ${context}.

      Begin the story. Speak as the NPC elder of this land.
      Write the first chapter of a long and detailed saga about how the player's ancestors fought and struggled here.
      This chapter should be immersive, atmospheric, and substantial (aim for at least 800 words).
      Introduce the setting, the main characters (the ancestors), and the initial conflict.
      Conclude this first chapter by presenting the player with 3-4 distinct and meaningful choices that will set the course for the rest of the saga.
      The choices should be concise action statements from the player's perspective.
    `;
  } else {
    prompt = `
      Continue the epic, interactive saga about the ${ancestry} in ${locationName}.
      The story so far:
      ${historyPrompt}

      The player has just made a choice that led to this point. Now, write the next chapter of the story.
      This chapter must be a direct consequence of the unfolding events.
      Make it long, detailed, and immersive (aim for at least 800 words).
      Deepen the plot, develop the characters, and raise the stakes.
      Conclude this chapter by presenting the player with 3-4 new, distinct, and meaningful choices to continue their journey.
      The choices should be concise action statements from the player's perspective.
    `;
  }
  
  const systemInstruction = "You are a master storyteller and game master for an epic, choice-driven historical saga. Your task is to generate long, detailed, and immersive story chapters that respond to player choices. You MUST ALWAYS conclude each chapter with a set of new choices for the player to make. You must respond in the specified JSON format.";

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.85,
            topP: 0.95,
            responseMimeType: 'application/json',
            responseSchema: schema,
        }
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    if (parsed.story && Array.isArray(parsed.choices)) {
      return parsed as StorySegment;
    }
    console.error("Parsed JSON does not match StorySegment schema:", parsed);
    return null;
  } catch (error) {
    console.error("Error generating story segment from Gemini API:", error);
    return {
      story: "The winds of time are howling, and the spirits are silent. The thread of this tale has been lost to the gale. Perhaps we can try to find it again?",
      choices: ["Try to recall the story again."],
    };
  }
};
