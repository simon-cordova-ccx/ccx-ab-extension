# 🚀 CCX AB Browser Extension

Welcome to the **CCX AB Browser Extension**, a powerful tool designed by [Creative CX](https://www.creative-cx.com/) to streamline A/B testing script injection for web developers and marketers. This Chrome extension detects A/B testing tools and injects custom scripts on supported webpages, styled with the sleek Creative CX branding (pink roundel icon and modern teal/dark blue UI).

## 📝 What Does It Do?

- **🔍 Auto-Detects A/B Tools**: Identifies tools like Dynamic Yield, Optimizely, Adobe Target, and AB Tasty on webpages.
- **⚡ Injects Custom Scripts**: Executes your scripts for specific clients and tests with a single click.
- **📢 Provides Clear Feedback**: Displays success, warning, or error messages in the popup and browser console with colorful, emoji-enhanced logs.
- **🎨 Modern UI**: Features a clean, Creative CX-inspired design with a teal (#00C4B4) and dark blue (#0A1D37) color scheme, Montserrat typography, and intuitive icons.

### 📝 How It Works (Simple Explanation)

1. **Navigate to a webpage** where you want to run an A/B testing script (e.g., `omaze.co.uk`, `davidlloyd.co.uk`, `allcleartravel.co.uk`, `heathrow.com`).
2. **Open the extension popup** by clicking the Creative CX pink roundel icon in the Chrome toolbar.
3. **Select an A/B testing tool** (e.g., Dynamic Yield, Optimizely, Adobe Target, AB Tasty) from the dropdown. The preferred tool is auto-selected based on the client’s domain.
4. **Choose your client and test**:
   - Select a client (e.g., `omaze`, `davidlloyd`, `allclear`, `heathrow`)—auto-selected based on the webpage URL.
   - Pick a test (e.g., `oz18`, `test1`) from the client’s folder structure.
   - Select a script (e.g., `v1.js`) to inject.
5. **Click "Inject"** to execute the script.
6. **Check the status**:
   - If the tool is detected, the script runs, and you’ll see a green success message in the popup and console (e.g., `✅ Script injected successfully!`).
   - If the tool isn’t found or multiple tools are present, a red error or orange warning appears in the popup.

## 🛠️ Technical Details

### Architecture
- **Content Script (`content.js`)**: Runs on webpages to detect A/B tools and handle script injection.
- **Detector Script (`detector.js`)**: Injected into the page context to check for global objects (e.g., `window.DY`, `window.optimizely`, `window.adobe.target`, `window.ABTasty`).
- **Popup (`popup.html`, `popup.css`, `popup.js`)**: Provides a modern UI for selecting tools, clients, tests, and scripts, styled with Creative CX’s teal and dark blue palette.
- **Background Script (`background.js`)**: Manages background tasks (currently minimal).
- **Configuration (`config.json`)**: Defines client-specific tool preferences and URL patterns (e.g., `allclear` prefers `abtasty` on `allcleartravel.co.uk`).

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
- ❌ `Failed to inject script [path]`
- ❌ `Failed to load config.json: [error]`

## 👀 How to Use It

1. **Install the Extension**:
   - Enable Developer mode in `chrome://extensions/`.
   - Click “Load unpacked” and select the `ccx-ab-extension/` folder.
2. **Open DevTools** (`F12` or `Ctrl+Shift+I`) to monitor console logs.
3. **Visit a supported page** (e.g., `allcleartravel.co.uk` with `window.ABTasty` set).
4. **Open the popup** (click the pink CCX icon).
5. **Select options and inject**:
   - The client and tool are auto-selected based on the URL (e.g., `allclear` and `AB Tasty`).
   - Choose a test and script, then click “Inject.”
6. **Verify**:
   - Check the popup for a green success message.
   - See the console for logs like `✅ Script scripts/allclear/test1/v1.js injected successfully`.

## 🧑‍💻 For Developers

### Adding a New Client
1. Add a folder under `scripts/` (e.g., `scripts/newclient/test1/v1.js`).
2. Update `config.json`:
   ```json
   {
     "client": "newclient",
     "preferredTool": "abtasty",
     "urlPattern": "newclient.com"
   }
   ```
3. Reload the extension and test.

### Adding a New A/B Tool
1. Update `toolIdentifiers` in `content.js`:
   ```javascript
   const toolIdentifiers = {
     newtool: { windowObject: 'newTool', messageType: 'NEWTOOL_FOUND' }
   };
   ```
2. Add detection in `detector.js`:
   ```javascript
   function detectNewTool() {
     if (typeof window.newTool !== "undefined") {
       window.postMessage({ type: "NEWTOOL_FOUND", tool: "newtool", ... }, "*");
       return true;
     }
     return false;
   }
   detectNewTool();
   ```
3. Add the tool to `popup.html` and `popup.js`.

### Debugging
- Check console logs in the webpage for detection and injection status.
- Inspect the popup’s console (`right-click popup > Inspect`) for UI errors.
- Verify `config.json` and icon paths in `manifest.json`.

## 💡 Need Help?

- **Issues**: Open an issue on the repository or contact the Creative CX team.
- **Contributing**: Add new tools, clients, or UI enhancements via pull requests.
- **Contact**: Visit [Creative CX](https://www.creative-cx.com/) for support.

**Enjoy optimizing with CCX AB! 🚀**