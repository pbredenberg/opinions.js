#!/usr/bin/env node

import { promises as fs } from "fs";
import { join } from "path";
import minimist from "minimist";
import { select, confirm } from "@inquirer/prompts";

interface InstallOptions {
  path: string;
  force: boolean;
}

async function showHelp(): Promise<void> {
  console.log(`
opinions - Opinionated project setup tool

Commands:
  install [--path <directory>] [--force]  Install bundled files into the specified directory
                                         (defaults to current directory)
  help                                   Show this help message

Options:
  --path <directory>                     Target directory to install files into
  --force                               Skip confirmation prompts
  --help                                Show this help message
  `);
}

async function copyFile(sourcePath: string, targetPath: string): Promise<void> {
  const content = await fs.readFile(sourcePath, "utf-8");
  await fs.writeFile(targetPath, content);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

async function installFiles(options: InstallOptions): Promise<void> {
  const sourceDir = join(__dirname, "..", "stuff");
  const targetDir = options.path;

  try {
    // Ensure target directory exists
    await fs.mkdir(targetDir, { recursive: true });

    // Read all files from source directory
    const files = await fs.readdir(sourceDir);

    // If not forcing, show confirmation prompt
    if (!options.force) {
      const shouldProceed = await confirm({
        message: `Install files to ${targetDir}?`,
        default: true,
      });

      if (!shouldProceed) {
        console.log("Installation cancelled.");
        return;
      }
    }

    // Copy each file
    for (const file of files) {
      const sourcePath = join(sourceDir, file);
      const targetPath = join(targetDir, file);

      await copyFile(sourcePath, targetPath);
    }

    console.log("Installation completed successfully!");
  } catch (error) {
    console.error(
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
  }
}

export async function main(): Promise<void> {
  const argv = minimist(process.argv.slice(2), {
    string: ["path"],
    boolean: ["force", "help"],
    default: { path: ".", force: false, help: false },
  });

  const command = argv._[0] || "help";

  if (argv.help || command === "help") {
    await showHelp();
    return;
  }

  if (command === "install") {
    await installFiles({
      path: argv.path,
      force: argv.force,
    });
    return;
  }

  console.error(`Unknown command: ${command}`);
  await showHelp();
  process.exit(1);
}

// Run the CLI if this file is being run directly
if (require.main === module) {
  main().catch((error) => {
    console.error(
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
  });
}
