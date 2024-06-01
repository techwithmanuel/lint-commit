#!/usr/bin/env node

import chalk from "chalk";
import { exec } from "child_process";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey } from "./store-api-key.js";

const genAI = new GoogleGenerativeAI(getApiKey());

export async function generateCommit(input) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Using the commit lint convention where, in all lowercase characters, write a commit message for this git diff text summarizing all the changes, the text: "${input}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    exec("git reset");
    console.log(chalk.red(`${error}`));
    process.exit(1);
  }
}
