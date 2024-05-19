#!/usr/bin/env node

import { config } from "dotenv";
import chalk from "chalk";
config();

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateCommit(input) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Using the commit lint convention, in all lowercase characters, write a commit message in a single sentence for : ${input}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.log(chalk.red(`${error}`));
    process.exit(1);
  }
}
