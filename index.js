const fs = require("fs").promises;
const path = require("path");

async function processSpotifyData() {
  const trackURIs = new Set();
  const batchesDir = path.join(__dirname, "batches");

  try {
    await fs.mkdir(batchesDir, { recursive: true });

    const data = await fs.readFile("data.json", "utf8");
    const spotifyData = JSON.parse(data);

    for (const dataSet of spotifyData) {
      trackURIs.add(dataSet.spotify_track_uri);
    }

    const trackURIsArray = Array.from(trackURIs);
    let batchCount = 0;

    for (let i = 0; i < trackURIsArray.length; i += 100) {
      const batch = trackURIsArray.slice(i, i + 100);
      await fs.writeFile(
        path.join(batchesDir, `batch${batchCount}.json`),
        JSON.stringify(batch)
      );
      console.log(
        `Data written to ${path.join(batchesDir, `batch${batchCount}.json`)}`
      );
      batchCount++;
    }
  } catch (err) {
    console.error("Error processing Spotify data:", err);
  }
}

module.exports = processSpotifyData;

processSpotifyData();
