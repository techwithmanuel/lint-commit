#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { exec } from "child_process";
import { checkGitStatus } from "./changed-files.js";
import { gitDiffForFile } from "./file-changes.js";
import { generateCommit } from "./generate-commit.js";

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
  const files = checkGitStatus();
  try {
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
      console.log(chalk.blue("🗂️  Git repository already initialized."));
    }

    const file = await inquirer.prompt({
      name: "file_location",
      type: "list",
      message: "Which file should be committed?",
      choices: files,
    });

    const fileChanges = await gitDiffForFile(file.file_location);
    const fileName = file.file_location;

    await execute(`git add ${file.file_location}`);

    if (fileChanges && fileName) {
      try {
        const spinner = createSpinner("Generating Commit Message...").start();

        await sleep(3000);

        const AIGeneratedCommitMessage =
          await generateCommit(`Changes for ${fileName}
    ${fileChanges}`);

        await execute(`git commit -m "${AIGeneratedCommitMessage}}"`);

        spinner.success({
          text: `✨ Commit "${AIGeneratedCommitMessage}" generated successfully`,
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  } catch (error) {
    console.error(
      chalk.red(`Failed to complete the operation: ${error.message}`)
    );
    process.exit(1);
  }

  const pushInit = await inquirer.prompt({
    name: "value",
    type: "list",
    message: "Would you like to push to your remote repository ?",
    choices: ["Yes", "No"],
  });

  if (pushInit.value === "Yes") {
    const spinner = createSpinner("Generating Commit Message...").start();

    await sleep(1000);
    await execute("git push");

    spinner.success({
      text: "Pushed successfully",
    });
  } else if (pushInit.value === "No") {
    console.log(
      `😅 No problems, run ${chalk.cyan("git push")} to push to your repository`
    );
  }
}

await createGitCommit();
