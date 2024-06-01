#!/usr/bin/env node

import chalk from "chalk";
import { exec } from "child_process";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey } from "./store-api-key.js";

const genAI = new GoogleGenerativeAI(getApiKey());

export async function generateCommit(input) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Using the commit lint convention where "Types:

    feat: A new feature for the user. Example: feat: add user login functionality
    fix: A bug fix. Example: fix: resolve login error on mobile devices
    docs: Documentation only changes. Example: docs: update README with installation instructions
    style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.). Example: style: fix indentation in user controller
    refactor: A code change that neither fixes a bug nor adds a feature. Example: refactor: optimize user data retrieval logic
    perf: A code change that improves performance. Example: perf: reduce memory usage in image processing
    test: Adding missing tests or correcting existing tests. Example: test: add unit tests for user service
    build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm). Example: build: update npm dependencies to latest versions
    ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs). Example: ci: update Travis CI configuration to Node 14
    chore: Other changes that don't modify src or test files. Example: chore: update contributor guidelines
    revert: Reverts a previous commit. Example: revert: revert commit abc123 (fix login error)
    Scope: Optional. A scope may be provided to describe the section of the codebase affected. Example: feat(auth): add OAuth2 authentication
    
    Subject: The subject line should be concise and describe what the commit does. Example: fix: resolve crash when adding a new user
    
    Body: Optional. The body provides additional context about the commit. It explains what and why versus how. Example: fix: resolve crash when adding a new user. The crash was caused by a null pointer exception when the user data was incomplete. Added a null check to prevent the crash.
    
    Footer: Optional. The footer is for references to issues or breaking changes. Example: BREAKING CHANGE: The user creation API now requires the email field." , in all lowercase characters, write a commit message for this git diff text summarizing all the changes, the text: "${input}"`;

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
