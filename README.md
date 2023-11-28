# Create Chrome Extension

This Create Chrome extension (CCHEX) allows users to generate a minimalistic chrome extension. This example extension changes the background color of a webpage by clicking a button in the extension's popup.

## Features

- Changes the background color of the current webpage to light blue upon button click.
- Utilizes Chrome extension APIs to interact with the active tab.

## Installation

1. npm i -g cchex
2. cchex

## Installation in chrome browser

2. Open Google Chrome and go to `chrome://extensions/`.
3. Enable Developer Mode by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the folder containing the extension's files.

## Usage

1. After installing the extension, click on the extension icon in the Chrome toolbar to open the popup.
2. Click the "Change Background" button in the popup.
3. Watch as the background color of the current webpage changes to light blue.

## File Structure

- `manifest.json`: Contains metadata about the extension, permissions, and scripts.
- `popup.html`: HTML file for the extension popup.
- `popup.js`: JavaScript file handling popup functionality.
- `content.js`: Content script injected into webpages to change the background color.
- `service-worker.js`: Service worker script for background tasks (unused in this simple example).

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).