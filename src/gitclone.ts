import { execSync } from "child_process";
import path from "path";
import fs from "fs";

/**
 * Create a directory name from a branch name.
 * Mainly replace '/' with '-'
 */
export function createDirNameFromBranchName(input: string): string {
  return input.replace(/\//g, "-");
}

/**
 * Function to get the git remote URL of origin and return it
 */
export function getGitRemoteUrl(): string {
  try {
    return execSync("git config --get remote.origin.url", {
      encoding: "utf-8",
    }).trim();
  } catch (error) {
    throw new Error(
      "Failed to get git remote URL. Make sure you are in a git repository."
    );
  }
}

export function getCurrentBranchName(): string {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD", {
      encoding: "utf-8",
    }).trim();
  } catch (error) {
    throw new Error(
      "Failed to get current branch name. Make sure you are in a git repository."
    );
  }
}

export function getCurrentRepoRootDir(): string {
  try {
    return execSync("git rev-parse --show-toplevel", {
      encoding: "utf-8",
    }).trim();
  } catch (error) {
    throw new Error(
      "Failed to get repository root directory. Make sure you are in a git repository."
    );
  }
}

export function getReposParentPath(): string {
  const rootDir = getCurrentRepoRootDir();
  return path.dirname(rootDir); // Use path.dirname to get the parent directory
}

export function getUniqueDirName(
  baseDirName: string,
  parentPath: string
): string {
  let uniqueDirName = baseDirName;
  let counter = 1;
  const fullPath = () => path.join(parentPath, uniqueDirName);

  while (fs.existsSync(fullPath())) {
    uniqueDirName = `${baseDirName}-${counter}`;
    counter++;
  }

  return uniqueDirName;
}

export function gitClone(branchName: string) {
  const branchNameToUse =
    branchName === undefined || branchName.trim() === ""
      ? getCurrentBranchName()
      : branchName;
  const dirName = createDirNameFromBranchName(branchNameToUse);
  const reposParentPath = getReposParentPath();
  const uniqueDirName = getUniqueDirName(dirName, reposParentPath);

  const remoteUrl = getGitRemoteUrl();
  const cloneCommand = `git -C "${reposParentPath}" clone --branch ${branchNameToUse} ${remoteUrl} ${uniqueDirName}`;
  try {
    console.log(
      `Cloning branch '${branchNameToUse}' into directory '${dirName}'...`
    );
    execSync(cloneCommand, { stdio: "inherit" });
    console.log("Clone completed successfully.");
  } catch (error) {
    throw new Error(`Failed to clone repository: ${(error as Error).message}`);
  }
}
