#!/usr/bin/env node

import chalk from "chalk";
import { intro, select, text, confirm, spinner } from "@clack/prompts";
import { exec } from "child_process";
import { checkGitStatus } from "./changed-files.js";
import { gitDiffForFile } from "./file-changes.js";
import { generateCommit } from "./generate-commit.js";

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

function execute(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, _) => {
      if (error) {
        console.error(chalk.red(`Error executing command: ${error.message}`));
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

async function createGitCommit() {
  const files = checkGitStatus();
  try {
    intro(chalk.green("✨ Initialized CLI"));

    const initGit = await select({
      message: "Have you initialized a git repository?",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    });

    if (initGit === "No") {
      await execute("git init");

      const repoName = await text({
        message: "Enter the repository name:",
      });

      const repoVisibility = await select({
        message: "Do you want the repository to be public or private?",
        options: [
          { label: "Public", value: "Public" },
          { label: "Private", value: "Private" },
        ],
      });

      const visibilityFlag = repoVisibility === "Public" ? "" : "--private";
      await execute(`gh repo create ${repoName} ${visibilityFlag}`);
    } else {
      console.log(chalk.blue("🗂️  Git repository already initialized."));
    }

    if (files.length < 1) {
      console.log(chalk.red("There are currently no files to commit"));
      process.exit(1);
    }

    const file = await select({
      message: "Which file should be committed?",
      options: files.map((file) => ({ label: file, value: file })),
    });

    const fileChanges = await gitDiffForFile(file);
    const fileName = file;

    await execute(`git add ${file}`);

    if (fileChanges && fileName) {
      try {
        const s = spinner();
        s.start("Generating Commit Message...");

        await sleep(3000);

        const AIGeneratedCommitMessage = await generateCommit(
          `Changes for ${fileName}\n${fileChanges}`
        );

        if (!AIGeneratedCommitMessage) {
          console.log(
            chalk.red("An error occured while generating the commit message")
          );
          process.exit(1);
        } else {
          await execute(`git commit -m "${AIGeneratedCommitMessage}"`);

          s.stop(
            chalk.green(
              `Commit ${chalk.blue(
                `"${AIGeneratedCommitMessage}"`
              )} generated successfully`
            )
          );
        }
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

  const pushInit = await confirm({
    message: "Would you like to push to your remote repository?",
  });

  if (pushInit) {
    const s = spinner();
    s.start("Syncing...");

    await sleep(1000);
    await execute("git push");

    s.stop(chalk.green("Pushed successfully"));
  } else {
    console.log(`Run ${chalk.cyan("git push")} to push to your repository`);
  }
}

await createGitCommit();
