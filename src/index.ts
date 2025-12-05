#!/usr/bin/env node

import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { gitClone } from "./gitclone.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);

if (args.length === 1 && args[0] === "--version") {
  const packageJsonPath = join(__dirname, "../package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
  console.log(`gitclone version: ${packageJson.version}`);
  process.exit(0);
}

if (args.length === 1 && args[0] === "--help") {
  console.log(`
Usage: gitclone [branch-name]

Description:
  Clone the current repository to a new directory named after the cloned branch.
  If a directory with that name already exists, a number is appended to make it unique.
  The new clone is placed in the parent directory of the current repository.

Options:
  [branch-name]   Specify the branch to clone. If omitted, the current branch is cloned.

Examples:
  gitclone          Clone the current branch and append a number if the directory already exists.
  gitclone feature  Clone the 'feature' branch and append a number if the directory already exists.
`);

  process.exit(0);
}
try {
  gitClone(args[0]);
  process.exit(0);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("An unknown error occurred.");
  }
  process.exit(1);
}
