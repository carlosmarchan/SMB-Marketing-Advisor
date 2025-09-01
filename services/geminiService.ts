
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a detailed explanation for a specific marketing strategy.
 * @param strategyName The name of the marketing strategy.
 * @returns A string containing the AI-generated explanation.
 */
export const getStrategyDetails = async (strategyName: string): Promise<string> => {
  const prompt = `As a marketing expert advising a coffee shop owner, provide a concise and actionable overview for implementing "${strategyName}". 
  
  Structure your response as follows:
  - **What It Is:** A brief, one-sentence explanation.
  - **Why It Matters:** 2-3 key benefits for a coffee shop, in bullet points.
  - **First Steps:** 3 practical, easy-to-understand first steps a busy owner can take.
  
  Keep the tone encouraging and straightforward.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching strategy details from Gemini:", error);
    return "Sorry, I couldn't fetch the details for this strategy. Please check your connection or API key and try again.";
  }
};

/**
 * Generates a custom marketing plan based on user input.
 * @param shopDescription A description of the coffee shop.
 * @param selectedStrategies A list of marketing strategies to focus on.
 * @returns A string containing the AI-generated marketing plan.
 */
export const generateMarketingPlan = async (shopDescription: string, selectedStrategies: string[]): Promise<string> => {
  if (selectedStrategies.length === 0) {
    return "Please select at least one marketing area to focus on.";
  }
  
  const prompt = `You are a world-class marketing consultant specializing in the coffee shop industry. Your client has a coffee shop with the following identity: "${shopDescription}".
  
  They want creative and actionable marketing ideas focusing on these specific areas: ${selectedStrategies.join(', ')}.
  
  Please generate a tailored marketing plan. For each selected area, provide 3-5 specific, creative, and practical ideas. Use markdown for formatting, with clear headings for each section. The tone should be inspiring, professional, and highly practical for a small business owner.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating marketing plan from Gemini:", error);
    return "I'm having trouble brewing up ideas right now. Please ensure your API key is configured correctly and try again shortly.";
  }
};
