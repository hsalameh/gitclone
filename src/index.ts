#!/usr/bin/env node

import {
  createDirNameFromBranchName,
  getGitRemoteUrl,
  gitClone,
} from "./gitclone.js";

const args = process.argv.slice(2);

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
