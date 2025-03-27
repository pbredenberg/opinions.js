import { main } from "../index";

// Mock process.exit
const mockExit = jest.spyOn(process, "exit").mockImplementation((code) => {
  throw new Error(`process.exit(${code})`);
});

// Mock fs promises
jest.mock("fs", () => ({
  promises: {
    mkdir: jest.fn(),
    readdir: jest.fn(),
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

// Mock @inquirer/prompts
jest.mock("@inquirer/prompts", () => ({
  confirm: jest.fn(),
}));

describe("opinions CLI", () => {
  // Get the mocked fs promises
  const mockFs = jest.requireMock("fs").promises;
  const mockConfirm = jest.requireMock("@inquirer/prompts")
    .confirm as jest.Mock;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    mockExit.mockClear();

    // Default mock implementations
    mockFs.mkdir.mockResolvedValue(undefined);
    mockFs.readdir.mockResolvedValue([".editorconfig"]);
    mockFs.readFile.mockResolvedValue("test content");
    mockFs.writeFile.mockResolvedValue(undefined);
    mockConfirm.mockResolvedValue(true);
  });

  afterAll(() => {
    mockExit.mockRestore();
  });

  it("should show help message when no command is provided", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    await main();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("opinions - Opinionated project setup tool")
    );
  });

  it("should install files when install command is provided", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    process.argv = ["node", "opinions", "install"];

    await main();

    expect(mockFs.mkdir).toHaveBeenCalledWith(".", { recursive: true });
    expect(mockFs.readdir).toHaveBeenCalled();
    expect(mockFs.readFile).toHaveBeenCalled();
    expect(mockFs.writeFile).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Copied"));
  });

  it("should respect the --path option", async () => {
    const targetPath = "./test-dir";
    process.argv = ["node", "opinions", "install", "--path", targetPath];

    await main();

    expect(mockFs.mkdir).toHaveBeenCalledWith(targetPath, { recursive: true });
  });

  it("should skip confirmation when --force is provided", async () => {
    process.argv = ["node", "opinions", "install", "--force"];

    await main();

    expect(mockConfirm).not.toHaveBeenCalled();
  });

  it("should handle errors gracefully", async () => {
    const error = new Error("Test error");
    mockFs.mkdir.mockRejectedValue(error);
    const consoleSpy = jest.spyOn(console, "error");

    // Expect the error to be thrown
    await expect(main()).rejects.toThrow("process.exit(1)");

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error: Test error")
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
