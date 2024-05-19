import { execSync } from "child_process";

export function gitDiffForFile(fileName) {
  try {
    const diffOutput = execSync(`git diff --minimal --unified=0 ${fileName}`)
      .toString()
      .trim();
    return diffOutput;
  } catch (error) {
    console.error(`Error executing git diff: ${error}`);
  }
}
