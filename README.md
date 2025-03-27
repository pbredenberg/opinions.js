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
- Clipanion (CLI framework)
- Node.js

## License

MIT
