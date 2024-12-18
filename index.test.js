const fs = require("fs").promises;
const path = require("path");
const processSpotifyData = require("./index");

jest.mock("fs", () => ({
  promises: {
    mkdir: jest.fn(),
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

describe("processSpotifyData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should process Spotify data and write batches to files", async () => {
    const mockData = JSON.stringify([
      { spotify_track_uri: "uri1" },
      { spotify_track_uri: "uri2" },
      { spotify_track_uri: "uri3" },
    ]);

    fs.readFile.mockResolvedValue(mockData);

    await processSpotifyData();

    const batchesDir = path.join(__dirname, "batches");

    expect(fs.mkdir).toHaveBeenCalledWith(batchesDir, { recursive: true });
    expect(fs.readFile).toHaveBeenCalledWith("data.json", "utf8");
    expect(fs.writeFile).toHaveBeenCalledTimes(1);
    expect(fs.writeFile).toHaveBeenCalledWith(
      path.join(batchesDir, "batch0.json"),
      JSON.stringify(["uri1", "uri2", "uri3"])
    );
  });

  it("should handle errors gracefully", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    fs.readFile.mockRejectedValue(new Error("File read error"));

    await processSpotifyData();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error processing Spotify data:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
