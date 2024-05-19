import { execSync } from "child_process";

export function checkGitStatus() {
  const statusOutput = execSync("git status").toString().trim();
  const lines = statusOutput.split("\n");

  let files = [];

  let isModifiedSection = false;
  let isUntrackedSection = false;

  lines.forEach((line) => {
    if (line.startsWith("Changes not staged for commit:")) {
      isModifiedSection = true;
      isUntrackedSection = false;
    } else if (line.startsWith("Untracked files:")) {
      isModifiedSection = false;
      isUntrackedSection = true;
    } else if (line.trim().startsWith("(")) {
      // Skip lines with git instructions
      return;
    } else if (isModifiedSection && line.trim().startsWith("modified:")) {
      files.push(line.trim().split(":")[1].trim());
    } else if (isUntrackedSection && !line.startsWith("no changes added")) {
      files.push(line.trim());
    }
  });

  // Filter out empty strings
  files = files.filter((file) => file !== "");

  return files;
}
