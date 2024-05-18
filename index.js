#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { exec } from "child_process";

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

function execute(command) {
  exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }

    if (stderr) {
      consol.error(`Error in command output: ${stderr}`);
      return;
    }

    return;
  });
}

async function createGitCommit() {
  console.log(chalk.green("✨ Initialized CLI"));

  const initGit = await inquirer.prompt({
    name: "git_initialized",
    type: "list",
    message: "Have you initialized a git repository",
    choices: ["Yes", "No"],
  });

  if (initGit.git_initialized === "Yes") {
  } else if (initGit.git_initialized === "No") {
    await execute("git init");
  }

  const file = await inquirer.prompt({
    name: "file_location",
    type: "input",
    message: "Which file(s) should be committed",
    default() {
      return "src";
    },
  });

  await execute(`git add ${file.file_location}`);

  const commit = await inquirer.prompt({
    name: "message_type",
    type: "list",
    message: "Select a commit message type",
    choices: [
      "build",
      "chore",
      "ci",
      "docs",
      "feat",
      "fix",
      "perf",
      "refactor",
      "revert",
      "style",
      "test",
    ],
  });

  const commitContent = await inquirer.prompt({
    name: "message",
    type: "input",
    message: `Which a commit message (${commit.message_type})`,
    default() {
      return "new commit";
    },
  });

  await execute(
    `git commit -m "${commit.message_type}: ${commitContent.message}"`
  );

  const spinner = createSpinner("Processing...").start();

  await sleep;

  spinner.success({
    text: "✨ Commit created successfully",
  });
}

await createGitCommit();
