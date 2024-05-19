import { config } from "dotenv";
config();

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateCommit(input) {
  // For text-only input, use the gemini-pro model
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Using the commit lint convention, write a commit message in a single sentence for : ${input}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    throw new Error(error);
  }
}
