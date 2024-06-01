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
- Google Generative AI API key : [Google AI Studio](https://ai.google.dev/aistudio)

## Installation

#### 1. Install lint-commit globally:

```bash
npm install -g lint-commit
```

#### 2. Register your GEMINI_API_KEY:

```bash
lint-commit register
```

#### 3. Alternatively, you can clone this repository and run the script locally:

```bash
git clone https://github.com/techwithmanuel/lint-commit.git
cd lint-commit
npm install
node register.js
node index.js
```

## How to get your Gemini API Key

#### 1. Sign in to [Google AI Studio](https://aistudio.google.com/app/prompts/new_chat?pli=1)

#### 2. Select `Get API key` on the side menu

#### 3. Select `Create API key` then follow the prompt to create the key

#### 4. Once done, copy the key, run this command after installing lint-commit

```
lint-commit register
```

#### Then enter the key

## Usage

Once you've installed and resgitered your `GEMINI_API_KEY`, To get started with lint-commit, simply run:

```bash
lint-commit
```

Follow the prompts to initialize a git repository, add files, and create a commit with a commitlint-conformant message.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Create a new Pull Request.

## Contact

For any questions or suggestions, please open an issue.
