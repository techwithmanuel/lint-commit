# Lint Commit

A basic command line tool for creating commit messages that follow the [commitlint](https://commitlint.js.org/) convention. This tool helps streamline the process of writing commit messages by guiding the user through a series of prompts.

## Features

- Initializes a git repository if one isn't already present.
- Creates a new GitHub repository if needed.
- Adds specified files to the staging area.
- Prompts for commit message type and content.
- Commits changes with a properly formatted commit message.
- Provides feedback on the commit process.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [Git](https://git-scm.com/) installed and configured.
- [GitHub CLI (gh)](https://cli.github.com/) installed and authenticated.

## Installation

You can use this tool without installation via `npx`:

```bash
npx lint-commit
```

Alternatively, you can clone this repository and run the script locally:

```bash
git clone https://github.com/techwithmanuel/lint-commit.git
cd lint-commit
npm install
node index.js
```

### Usage

To get started with lint-commit, simply run:

```bash
npx lint-commit
```

Follow the prompts to initialize a git repository, add files, and create a commit with a commitlint-conformant message.

### Examples

#### Initializing a Git Repository and Committing Changes

1. Run npx lint-commit.
2. If prompted, choose to initialize a new git repository.
3. Enter the repository name and select visibility (public or private).
4. Specify the files to commit (default is src).
5. Select the type of commit message (e.g., feat, fix, docs, etc.).
6. Enter a commit message.
7. The tool will add the files, create a commit, and display a success message.

### Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Create a new Pull Request.

### Acknowledgements

- [chalk](https://github.com/chalk/chalk) for terminal string styling.
- [inquirer](https://github.com/SBoudrias/Inquirer.js) for interactive prompts.
- [nanospinner](https://github.com/usmanyunusov/nanospinner) for CLI spinners.

### Contact

For any questions or suggestions, please open an issue.
