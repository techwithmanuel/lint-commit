#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { exec } from "child_process";

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

function execute(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(chalk.red(`Error executing command: ${error.message}`));
        reject(error);
        return;
      }

      if (stderr) {
        console.error(chalk.red(`Error in command output: ${stderr}`));
        reject(new Error(stderr));
        return;
      }

      resolve(stdout);
    });
  });
}

async function createGitCommit() {
  console.log(chalk.green("✨ Initialized CLI"));

  const initGit = await inquirer.prompt({
    name: "git_initialized",
    type: "list",
    message: "Have you initialized a git repository?",
    choices: ["Yes", "No"],
  });

  if (initGit.git_initialized === "No") {
    await execute("git init");

    const repoName = await inquirer.prompt({
      name: "repo_name",
      type: "input",
      message: "Enter the repository name:",
    });

    const repoVisibility = await inquirer.prompt({
      name: "repo_visibility",
      type: "list",
      message: "Do you want the repository to be public or private?",
      choices: ["Public", "Private"],
    });

    const visibilityFlag =
      repoVisibility.repo_visibility === "Public" ? "" : "--private";
    await execute(`gh repo create ${repoName.repo_name} ${visibilityFlag}`);
  } else {
    console.log(chalk.blue("Git repository already initialized."));
  }

  const file = await inquirer.prompt({
    name: "file_location",
    type: "input",
    message: "Which file(s) should be committed?",
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
    message: `Enter a commit message (${commit.message_type}):`,
    default() {
      return "new commit";
    },
  });

  await execute(
    `git commit -m "${commit.message_type}: ${commitContent.message}"`
  );

  const spinner = createSpinner("Processing...").start();

  await sleep(1000);

  spinner.success({
    text: "✨ Commit created successfully",
  });
  console.log(
    `Run ${chalk.cyan("git push")} to push the commits to the remote repository`
  );
}

createGitCommit();
