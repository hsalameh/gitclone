# @hsalameh/gitclone

A command that clones a given branch of an existing git repo and puts the clone next to the existing repo.

## Installation

Install the package globally using npm (compatible with Windows, Linux, and macOS):

```bash
npm install -g @hsalameh/gitclone
```

## Usage

### Clone a Branch

```bash
gitclone [branch-name]
```

#### Description

Clone the current repository to a new directory named after the cloned branch. If a directory with that name already exists, a number is appended to make it unique. The new clone is placed in the parent directory of the current repository.

#### Options

- `[branch-name]` - Specify the branch to clone. If omitted, the current branch is cloned.

#### Examples

- `gitclone` - Clone the current branch and append a number if the directory already exists.
- `gitclone feature` - Clone the 'feature' branch and append a number if the directory already exists.

## Features

- Cross-platform support (Windows, Linux, macOS).
- Automatically determines the repository root and parent directory.
- Provides meaningful error messages for common Git issues.

## License

MIT
