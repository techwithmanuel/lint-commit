# Lint Commit

### Description

This CLI tool helps automate the process of generating commit messages and managing a Git repository. It guides the user through initializing a Git repository (if not already initialized), selecting files to commit, generating AI-assisted commit messages, and optionally pushing changes to a remote repository.

### Features

- Initialize a new Git repository if not already initialized
- Select files to commit from the list of changed files
- Generate AI-assisted commit messages using the Google Generative AI API
- Optionally push changes to the remote repository

### Prerequisites

- Node.js (v14.x or later)
- Git installed on your system
- GitHub CLI (`gh`) installed
- Google Generative AI API key

## Installation

#### 1. Set up environment variables:
   Create a `.env` file in the root directory and add your Google Generative AI API key:

```bash
GEMINI_API_KEY=your_gemini_api_key
```

#### 2. You can use this tool without installation via `npx`:

```bash
npx lint-commit
```

#### 3. Alternatively, you can clone this repository and run the script locally:

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
