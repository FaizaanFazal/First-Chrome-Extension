# Chrome Extension for Quora Questions Fetching

This Chrome extension allows you to fetch and display the list of questions on any Quora page, with a manual "Fetch Questions" button and adjustable text size for comfortable reading.

## Features

- **Fetch Questions on Demand**: Click "Fetch Questions" in the popup to scrape and display all question titles on the current Quora page.
- **Adjustable Text Size**: Increase or decrease the font size of the question list using the **A⁻** and **A⁺** controls.
- **Persistent Settings**: Your preferred font size is saved automatically and applied every time you open the popup.
- **SPA Navigation Support**: Works seamlessly with Quora’s single-page-app routing (content script reinjection on navigation).
- **Options Page**: Configure the default font size in the dedicated Options page. (not implemented yet)

## Installation

1. **Clone the repository**  
   ```bash
   git clone <repository-url>
   cd chrome-extension-quora-questions
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Build the extension**  
   - For development (watch + copy):  
     ```bash
     npm run dev
     ```  
   - For production:  
     ```bash
     npm run build
     ```

4. **Load unpacked in Chrome**  
   1. Open `chrome://extensions` in your browser.  
   2. Enable **Developer mode** (toggle in the top right).  
   3. Click **Load unpacked** and select the `dist/` folder in this project.

## Usage

1. Navigate to any Quora page (e.g., a question listing or search results).  
2. Click the extension icon in the Chrome toolbar.  
3. In the popup:  
   - Click **Fetch Questions** to scrape and list all question titles.  
   - Use **A⁻** / **A⁺** to adjust the font size.  
4. To set a new default font size permanently, open the **Options** page:  
   - Right-click the extension icon → **Options**.  
   - Use the slider to choose your preferred default size, then click **Save**.

## Project Structure

```
chrome-extension-quora-questions/
├── public/                # Static assets
│   ├── manifest.json      # Chrome MV3 manifest
│   ├── popup.html         # Popup HTML wrapper
│   ├── options.html       # Options page wrapper
│   └── icons/             # Extension icons (not implemented yet)
├── src/                   # TypeScript & React source
│   ├── background.ts      # MV3 service worker (SPA reinjection)
│   ├── content.ts         # Content script (scrapes Quora)
│   ├── popup/             # React popup UI
│   │   └── index.tsx
│   └── options/           # React options UI
│       └── index.tsx
├── tsup.config.ts         # Bundler configuration
├── tsconfig.json          # TypeScript compiler options
├── package.json           # NPM scripts & dependencies
└── dist/                  # Bundled output (generated)
```

## Development

- **Watch Mode**: `npm run dev` bundles your code and copies static files on every change.  
- **Build**: `npm run build` produces a minified, production-ready `dist/` folder.  
- After each build, reload the extension at `chrome://extensions` to test changes.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for bug fixes, improvements, or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
