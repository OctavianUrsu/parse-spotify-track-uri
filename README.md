# Parse Spotify Track URI

This project processes Spotify data and writes batches of track URIs to JSON files.

## Project Structure

```
.gitignore
batches/
data.json
index.js
index.test.js
package.json
```

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd parse-spotify-track-uri
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Usage

1. Place your Spotify data in the `data.json` file in the root directory. The data should be an array of objects, each containing a `spotify_track_uri` field.

2. Run the script to process the data:
   ```sh
   node index.js
   ```

3. The processed data will be written to the `batches` directory in batches of 100 URIs per file.

## Testing

To run the tests, use the following command:
```sh
npm test
```

## Project Files

- **index.js**: Contains the main logic for processing Spotify data and writing batches to files.
- **index.test.js**: Contains unit tests for the `processSpotifyData` function.
- **data.json**: The input file containing Spotify data to be processed.
- **batches/**: The directory where the output batch files will be written.
- **package.json**: Contains project metadata and dependencies.
- **.gitignore**: Specifies files and directories to be ignored by Git.

## License

This project is licensed under the ISC License.
