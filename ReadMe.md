# 🚀 CCX AB Browser Extension

Welcome to the **CCX AB Browser Extension**, a powerful tool designed by [Creative CX](https://www.creative-cx.com/) to streamline A/B testing script injection for web developers and marketers. This Chrome extension detects A/B testing tools and injects custom scripts on supported webpages, styled with the sleek Creative CX branding (pink roundel icon and modern teal/dark blue UI).

## 📝 What Does It Do?

- **🔍 Auto-Detects A/B Tools**: Identifies tools like Dynamic Yield, Optimizely, Adobe Target, and AB Tasty on webpages.
- **⚡ Injects Custom Scripts**: Executes your scripts for specific clients, tests, and variations with a single click.
- **📋 Copies Minified Code**: Copies minified script code to the clipboard for easy sharing or debugging.
- **📢 Provides Clear Feedback**: Displays success (green), warning (yellow), or error (red) messages in the popup and browser console with emoji-enhanced logs.
- **🎨 Modern UI**: Features a clean, Creative CX-inspired design with a teal (#00C4B4) and dark blue (#0A1D37) color scheme, Montserrat typography, and intuitive Font Awesome icons.

### 📝 How It Works (Simple Explanation)

1. **Navigate to a webpage** where you want to run an A/B testing script (e.g., `omaze.co.uk`, `davidlloyd.co.uk`, `allcleartravel.co.uk`, `heathrowexpress.com`).
2. **Open the extension popup** by clicking the Creative CX pink roundel icon in the Chrome toolbar.
3. **Select an A/B testing tool** (e.g., Dynamic Yield, Optimizely, Adobe Target, AB Tasty) from the dropdown. The preferred tool is auto-selected based on the client’s domain.
4. **Choose your client, test, and script**:
   - Select a client (e.g., `omaze`, `davidlloyd`, `allclear`, `heathrow`)—auto-selected based on the webpage URL.
   - Pick a test (e.g., `oz18`, `test1`) from the client’s folder structure.
   - Select a script (e.g., `v1.js`) to inject or copy.
5. **Click "Inject" or "Copy"**:
   - **Inject**: Executes the script if the selected tool is detected on the page.
   - **Copy Variation Code**: Copies the minified script to the clipboard using Terser.
6. **Check the status**:
   - Success: Green message (e.g., `Script injected successfully!` or `Minified script copied to clipboard!`).
   - Warning: Yellow message if multiple tools are detected (e.g., `dynamicyield detected. Warning: Other tools (optimizely) also present.`).
   - Error: Red message if the tool isn’t found, no active tab exists, or script loading fails (e.g., `AB Tasty not found on this page.`).

## 🛠️ Technical Details

### Architecture
- **Content Script (`content.js`)**: Runs on webpages to detect A/B tools and handle script injection using `chrome.scripting.executeScript`.
- **Detector Script (`scripts/page/detector.js`)**: Injected into the page context to check for global objects (e.g., `window.DY`, `window.optimizely`, `window.adobe.target`, `window.ABTasty`).
- **Popup (`popup.html`, `popup.css`, `popup.js`)**: Provides a modern UI for selecting tools, clients, tests, and scripts. Uses Terser for minification and a static client list for reliability.
- **Background Script (`background.js`)**: Manages background tasks (currently minimal, e.g., storing detected tools).
- **Configuration (`config.json`)**: Defines client-specific tool preferences and URL patterns (e.g., `omaze` prefers `dynamicyield` on `omaze.co.uk`).
- **Build Process**: Uses Rollup with Terser to bundle `popup.js` into `dist/popup/popup.js`, ensuring browser compatibility.

### Folder Structure
Scripts are organized in `scripts/[client]/[test]/[script].js`:
```
└── 📁scripts
    └── 📁allclear
        └── 📁test1
            ├── v1.js
    └── 📁davidlloyd
        └── 📁test1
            ├── v1.js
    └── 📁heathrow
        └── 📁test1
            ├── v1.js
    └── 📁omaze
        └── 📁oz18
            ├── v1.js
    └── 📁page
        ├── detector.js
    ├── background.js
    ├── config.json
    ├── content.js
```

### Supported A/B Tools
- **Dynamic Yield**: Detected via `window.DY` or `window.DYO`.
- **Optimizely**: Detected via `window.optimizely`.
- **Adobe Target**: Detected via `window.adobe.target`.
- **AB Tasty**: Detected via `window.ABTasty`.

### Console Messages
- ⏳ `Waiting for [tool] detection, attempt X/30`
- ✅ `[tool] detected (using [object])`
- 🚀 `[tool] is available! Functions: [function list]`
- ✅ `Script [path] injected successfully`
- ✅ `Copied minified script: [path]`
- ❌ `Failed to inject script: [error]`
- ❌ `Failed to load config.json: [error]`
- ⚠️ `No active tab or URL found, skipping client pre-selection`
- ❌ `Error matching client by URL: [error]`

## 👀 How to Use It

1. **Install the Extension**:
   - Enable Developer mode in `chrome://extensions/`.
   - Click “Load unpacked” and select the `dist/` folder after building.
2. **Open DevTools** (`F12` or `Ctrl+Shift+I`) to monitor console logs.
3. **Visit a supported page** (e.g., `omaze.co.uk` with `window._dy_geo` set for Dynamic Yield).
4. **Open the popup** (click the pink CCX icon).
5. **Select options and inject/copy**:
   - The client (e.g., `omaze`) and tool (e.g., `dynamicyield`) are auto-selected based on the URL.
   - Choose a test (e.g., `oz18`) and script (e.g., `v1.js`), then click “Inject” or “Copy Variation Code.”
6. **Verify**:
   - Check the popup for a green success message (e.g., `Script injected successfully!`).
   - See the console for logs like `✅ Script scripts/omaze/oz18/v1.js injected successfully` or `✅ Copied minified script: scripts/omaze/oz18/v1.js`.
   - Pasted minified code example: `const a="Hello";console.log(a);` for `const myLongVariableName = "Hello"; console.log(myLongVariableName);`.

## 🧑‍💻 For Developers

### Setup and Build
1. **Install Node.js** (v16+ recommended).
2. **Clone the repository**:
   ```bash
   git clone https://github.com/simon-cordova-ccx/ccx-ab-extension.git
   cd ccx-ab-extension
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Build the extension**:
   ```bash
   npm run build
   ```
   This runs:
   - `clean`: Removes and recreates the `dist/` folder.
   - `copy`: Copies `icons/`, `popup/`, `scripts/`, and `manifest.json` to `dist/`.
   - `bundle`: Bundles `popup.js` with Terser into `dist/popup/popup.js` using Rollup.
5. **Load in Chrome**:
   - Go to `chrome://extensions/`, enable Developer mode, and load the `dist/` folder.
6. **Verify**:
   - Check `dist/` folder structure matches the expected layout (see **Folder Structure**).
   - Test on supported URLs (e.g., `https://omaze.co.uk`).

### Adding a New Client
1. Add a folder under `scripts/` (e.g., `scripts/newclient/test1/v1.js`).
2. Update the static `folderStructure` in `popup.js`:
   ```javascript
   {
     name: 'newclient',
     tests: [
       { name: 'test1', scripts: [{ name: 'v1.js', script: { type: 'file', src: 'scripts/newclient/test1/v1.js' } }] }
     ]
   }
   ```
3. Update `config.json`:
   ```json
   {
     "client": "newclient",
     "preferredTool": "abtasty",
     "urlPattern": "newclient.com"
   }
   ```
4. Rebuild and reload:
   ```bash
   npm run build
   ```

### Adding a New A/B Tool
1. Update `toolIdentifiers` in `content.js`:
   ```javascript
   const toolIdentifiers = {
     newtool: { windowObject: 'newTool', messageType: 'NEWTOOL_FOUND' }
   };
   ```
2. Add detection in `scripts/page/detector.js`:
   ```javascript
   function detectNewTool() {
     if (typeof window.newTool !== "undefined") {
       window.postMessage({ type: "NEWTOOL_FOUND", tool: "newtool", functions: Object.keys(window.newTool) }, "*");
       return true;
     }
     return false;
   }
   detectNewTool();
   ```
3. Add the tool to `popup.html`:
   ```html
   <option value="newtool">New Tool</option>
   ```
4. Rebuild and test.

### Debugging
- **Popup Issues**: Right-click the popup, select “Inspect,” and check the Console for errors (e.g., `❌ Failed to load config.json`).
- **Injection/Copy Issues**: Open DevTools on the webpage (`F12`) and check logs for detection (`✅ [tool] detected`) or injection errors (`❌ Failed to inject script`).
- **No Pre-selection**: Verify `config.json` URL patterns (e.g., `omaze.co.uk`) and test with `console.log(url)` in `popup.js`.
- **Build Issues**: Run `npm run build` and check for Rollup errors.
- **Non-Webpage Contexts**: On `chrome://` URLs, expect a yellow warning: `No active tab found. Please select a client manually.`

### Recent Changes
- **Switched to Terser**: Replaced `babel-minify` with Terser for reliable minification, resolving Node.js dependency issues (`assert`, circular dependencies, `this` undefined).
- **Static Client List**: Replaced `chrome.runtime.getPackageDirectoryEntry` with a static `folderStructure` in `popup.js` for robust client dropdown population, fixing `TypeError: No matching signature`.
- **Improved Error Handling**: Enhanced `chrome.tabs.query` to handle missing tabs gracefully, showing yellow warnings (e.g., `No active tab found`) in non-webpage contexts.
- **Removed `index.js`**: Deleted outdated Parcel build artifact using `babel-minify`, cleaning up the project structure.
- **Fixed URL Matching**: Updated `config.json` to ensure accurate client pre-selection (e.g., `omaze` for `omaze.co.uk`).

## 💡 Need Help?
- **Issues**: Open an issue on [GitHub](https://github.com/simon-cordova-ccx/ccx-ab-extension/issues).
- **Contributing**: Add new tools, clients, or UI enhancements via pull requests.
- **Contact**: Visit [Creative CX](https://www.creative-cx.com/) for support.

**Enjoy optimizing with CCX AB! 🚀**