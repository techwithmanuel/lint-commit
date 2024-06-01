#!/usr/bin/env node

import { text } from "@clack/prompts";
import fs from "fs";
import os from "os";
import path from "path";

const configFilePath = path.join(os.homedir(), ".lint-commit");

async function registerApiKey() {
  const apiKey = await text({
    message: "Enter your Gemini API Key:",
  });

  fs.writeFileSync(configFilePath, apiKey);
  console.log("API Key registered successfully!");
}

registerApiKey();
