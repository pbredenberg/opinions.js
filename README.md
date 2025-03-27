# Opinions

An project setup tool that helps you maintain consistent project configurations across your codebases.

## Installation

```bash
npm install -g opinions
```

## Usage

### Install Command

The `install` command copies bundled configuration files into your project:

```bash
opinions install [--path <directory>]
```

Options:

- `--path`: Target directory to install files into (defaults to current directory)

### Help

To see available commands and options:

```bash
opinions --help
```

## What's Included

Currently bundled files:

- `.editorconfig`: Editor configuration for consistent coding styles

## Development

This project is built with:

- TypeScript
- Minimist (CLI argument parsing)
- @inquirer/prompts (Interactive prompts)
- Node.js

### Development Setup

```bash
# Install dependencies
npm install

# Link the package globally for development
npm run link

# Start TypeScript in watch mode
npm run dev
```

### Release Process

This project uses conventional commits and automated versioning. Here's how to release:

1. **Commit Changes**
   Use conventional commits for your changes:

   ```bash
   # Format:
   type(scope): description

   # Examples:
   git commit -m "feat: add new editorconfig settings"
   git commit -m "fix: handle file permission errors"
   git commit -m "docs: update README with new commands"
   ```

   Commit Types:

   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes
   - `refactor`: Code refactoring
   - `perf`: Performance improvements
   - `test`: Adding or modifying tests
   - `build`: Build system changes
   - `ci`: CI configuration changes
   - `chore`: Other changes
   - `revert`: Reverting changes

2. **Version Bumping**

   ```bash
   # For patch releases (0.0.X)
   npm run release:patch

   # For minor releases (0.X.0)
   npm run release:minor

   # For major releases (X.0.0)
   npm run release:major

   # Or let standard-version determine the version based on commits
   npm run release
   ```

   This will:

   - Bump the version in package.json
   - Generate/update CHANGELOG.md
   - Create a git tag
   - Create a commit with the changes

3. **Publishing**

   ```bash
   # First, make sure you're logged in to npm
   npm login

   # Then publish
   npm run publish
   ```

   The publish process will:

   - Run tests
   - Build the project
   - Check for uncommitted changes
   - Check for unpushed commits
   - Check for outdated dependencies
   - Publish to npm
   - Push to git
   - Create a GitHub release

4. **Complete Release Example**

   ```bash
   # 1. Make your changes and commit them
   git add .
   git commit -m "feat: add new configuration options"

   # 2. Bump version and generate changelog
   npm run release:minor

   # 3. Review the changes
   git diff

   # 4. Push changes
   git push --follow-tags

   # 5. Publish to npm
   npm run publish
   ```

## License

MIT
