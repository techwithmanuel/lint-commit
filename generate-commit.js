#!/usr/bin/env node

import { config } from "dotenv";
import chalk from "chalk";
config();

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateCommit(input) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Using the commit lint convention where "build:
    Changes to build system or dependencies (e.g., \`gulp\`, \`npm\`).
    Example: \`build: update webpack to version 5\`
    
    chore:
    Routine tasks or maintenance (e.g., config changes).
    Example: \`chore: update dependencies\`
    
    ci:
    Changes to CI configuration or scripts (e.g., \`Travis\`).
    Example: \`ci: add GitHub Actions workflow\`
    
    docs:
    Documentation changes only.
    Example: \`docs: update README\`
    
    feat:
    New feature implementation.
    Example: \`feat: add user authentication\`
    
    fix:
    Bug fixes.
    Example: \`fix: resolve login issue\`
    
    perf:
    Performance improvements.
    Example: \`perf: optimize image loading\`
    
    refactor:
    Code changes that do not add features or fix bugs.
    Example: \`refactor: simplify user service\`
    
    revert:
    Reverts a previous commit.
    Example: \`revert: undo feature addition\`
    
    style:
    Changes that do not affect logic (e.g., formatting).
    Example: \`style: fix linting issues\`
    
    test:
    Adding or modifying tests.
    Example: \`test: add unit tests for login\" , in all lowercase characters, write a commit message in a single sentence for : ${input}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.log(chalk.red(`${error}`));
    process.exit(1);
  }
}
