# 🚀 CCX AB Extension

Welcome to **CCX AB Browser Extension**!  
This extension helps you detect and interact with A/B testing tools on supported web pages.

## 📝 What Does It Do?

- **🔍 Detects** if your chosen A/B testing tool (like Dynamic Yield, Adobe Target, etc.) is available in the correct window context.
- **⚡ Injects** your custom scripts when you visit supported pages.
- **📢 Notifies** you (via the browser console) when your selected tool is ready to use, using clear and colorful logs for easy debugging.


### 📝 How It Works (Simple Explanation)

1. **Navigate to any webpage** where you want to run or test your A/B tool script.
2. **Open the extension popup** by clicking the extension icon in your browser.
3. **Choose the A/B testing tool** (like Dynamic Yield, Optimizely, etc.) from a dropdown.
4. **Drill down through folders:**  
   - Select the client,  
   - then the test,  
   - then the test variation,  
   - or as many levels as your folder structure requires.
5. **Pick the script file** you want to run for that specific variation or context.
6. **Click "Inject"** to start the process.
7. **The extension checks** if the selected A/B tool is present on the page.
8. **If the tool is detected**, your chosen script is injected and executed.  
   - You’ll see a confirmation in both the popup and the browser console.
9. **If the tool isn’t found**, you’ll get a clear message in the popup so you know why nothing happened.

---

## 🛠️ How It Works

1. **Script Injection**  
   The extension injects your chosen script into the page to help detect and work with your selected A/B testing tool.

2. **Tool Detection**  
   It checks if the A/B testing tool is present:
   - If found: ✅ You’ll see a success message in the console.
   - If not: ⏳ It keeps checking every few seconds until your tool appears.

3. **Console Messages**  
   - ⏳ *Injecting script...*
   - ✅ *Script injected successfully!*
   - ❌ *Script injection failed!*
   - 🚀 *Your A/B tool is available!*
   - ✅ *You can now run your tool-dependent code!*

## 👀 How to See It in Action

1. **Install the Extension** in your browser (using developer mode).
2. **Open the Console** (Press `F12` or `Ctrl+Shift+I`).
3. **Visit a supported page** that uses your A/B testing tool.
4. **Watch for messages** — you’ll see icons and updates as the extension works!

## 🧑‍💻 For Developers

- **Main files:**
  - `content.js`: Handles script injection and tool detection.
  - `inject.js`: Checks for the presence of your selected tool.
  - `manifest.json`: Extension configuration.

- **Custom scripts:** Place your scripts in the `scripts/` folder, organized by tool, client, test, and variation as needed.

- **Tool selection:** Future updates will let you choose which A/B testing tool to target (e.g., Dynamic Yield, Adobe Target, etc.).

## 💡 Need Help?

If you have questions or want to add more features, just open an issue or contribute!

**Enjoy using CCX AB! 🚀**
