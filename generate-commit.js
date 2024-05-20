#!/usr/bin/env node

import { config } from "dotenv";
import chalk from "chalk";
import { exec } from "child_process";
config();

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateCommit(input) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Using the commit lint convention where "
    
    feat: Commits that introduce new features.
    fix: Commits that fix a bug.
    docs: Commits that add or update documentation.
    style: Commits that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.).
    refactor: Commits that neither fix a bug nor add a feature (code changes that improve the structure or design).
    perf: Commits that improve performance.
    test: Commits that add or update tests.
    build: Commits that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
    ci: Commits that affect continuous integration configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
    chore: Commits that update build tasks, package manager configs, and other non-production code changes.
    " , in all lowercase characters, write a commit message in a single sentence for : ${input}`;

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
