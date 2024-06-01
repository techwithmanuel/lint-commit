#!/usr/bin/env node

import fs from "fs";
import os from "os";
import path from "path";

const configFilePath = path.join(os.homedir(), ".lint-commit");

export function getApiKey() {
  if (fs.existsSync(configFilePath)) {
    return fs.readFileSync(configFilePath, "utf-8").trim();
  } else {
    console.error(
      "API Key not found. Please register your API Key using 'lint-commit register GEMINI_API_KEY'."
    );
    process.exit(1);
  }
}
