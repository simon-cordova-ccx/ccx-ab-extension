console.log("🔍 CCX AB content script loaded at", new Date().toISOString());

// Map of A/B tools to their global window objects
const toolIdentifiers = {
  dynamicyield: { windowObjects: ['DY', 'DYO'], messageType: 'DY_FOUND' },
  optimizely: { windowObject: 'optimizely', messageType: 'OPTIMIZELY_FOUND' },
  adobetarget: { windowObject: 'adobe.target', messageType: 'ADOBE_TARGET_FOUND' },
  abtasty: { windowObject: 'ABTasty', messageType: 'ABTASTY_FOUND' }
};

// Function to inject detector.js into the webpage's context
function injectDetectorScript() {
  try {
    if (document.querySelector(`script[src="${chrome.runtime.getURL("scripts/page/detector.js")}"]`)) {
      console.log("ℹ️ detector.js already injected");
      return;
    }
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("scripts/page/detector.js");
    script.onload = () => {
      console.log("✅ detector.js injected successfully");
      script.remove();
    };
    script.onerror = () => {
      console.error("❌ Failed to inject detector.js");
    };
    (document.head || document.documentElement).appendChild(script);
  } catch (error) {
    console.error("❌ Error injecting detector.js:", error.message);
  }
}

// Function to load client configuration
async function loadConfig() {
  try {
    const response = await fetch(chrome.runtime.getURL("scripts/config.json"));
    const config = await response.json();
    return config;
  } catch (error) {
    console.error("❌ Failed to load config.json:", error.message);
    return { toolPriority: [] };
  }
}

// Function to determine preferred tool based on URL
async function getPreferredTool(detectedTools) {
  const config = await loadConfig();
  let preferredTool = detectedTools[0] || null;
  let matchedClient = null;

  // Get current URL
  const url = window.location.href;
  console.log(`Current page URL: ${url}`);

  // Find client by matching URL pattern
  for (const entry of config.toolPriority) {
    if (url.includes(entry.urlPattern)) {
      matchedClient = entry.client;
      if (detectedTools.includes(entry.preferredTool)) {
        preferredTool = entry.preferredTool;
      }
      break;
    }
  }

  console.log(`Matched client: ${matchedClient || 'none'}, Preferred tool: ${preferredTool || 'none'}`);
  return { preferredTool, allTools: detectedTools };
}

// Function to detect A/B testing tool with polling
function detectABTool(tool, callback, maxAttempts = 30, interval = 1000) {
  console.log(`Starting detection for ${tool}`);
  let attempts = 0;
  const toolConfig = toolIdentifiers[tool];

  if (!toolConfig) {
    console.log(`❌ Unknown A/B tool: ${tool}`);
    callback(false);
    return;
  }

  function checkTool() {
    const listener = (event) => {
      if (event.source !== window || !event.data || event.data.type !== toolConfig.messageType) return;
      console.log(`✅ ${tool} detected (using ${event.data.detectedObject})`);
      window.removeEventListener("message", listener);
      callback(true);
    };

    window.addEventListener("message", listener);
    if (attempts < maxAttempts) {
      attempts++;
      console.log(`⏳ Waiting for ${tool} detection, attempt ${attempts}/${maxAttempts}`);
      setTimeout(checkTool, interval);
    } else {
      console.log(`❌ ${tool} not detected after ${maxAttempts} attempts`);
      window.removeEventListener("message", listener);
      callback(false);
    }
  }

  injectDetectorScript();
  checkTool();
}

// Function to inject a script from a file or content
function injectScript(scriptData, callback) {
  try {
    const script = document.createElement("script");
    if (scriptData.type === "file" && scriptData.src) {
      script.src = chrome.runtime.getURL(scriptData.src);
      script.onload = () => {
        console.log(`✅ Script ${scriptData.src} injected successfully`);
        script.remove();
        callback({ success: true });
      };
      script.onerror = () => {
        console.error(`❌ Failed to inject script ${scriptData.src}`);
        callback({ success: false, error: `Failed to load script ${scriptData.src}` });
      };
    } else if (scriptData.type === "inline" && scriptData.content) {
      script.textContent = scriptData.content;
      console.log("✅ Inline script injected successfully");
      callback({ success: true });
    } else {
      throw new Error("Invalid script data: missing src or content");
    }
    (document.head || document.documentElement).appendChild(script);
    if (scriptData.type === "inline") script.remove();
  } catch (error) {
    console.error("❌ Script injection failed:", error.message);
    callback({ success: false, error: error.message });
  }
}

// Auto-detect A/B tools on page load
(function () {
  injectDetectorScript();
  const detectedTools = [];
  window.addEventListener("message", async (event) => {
    if (event.source !== window || !event.data || !Object.values(toolIdentifiers).some(config => config.messageType === event.data.type)) return;
    const detectedTool = event.data.tool;
    if (!detectedTools.includes(detectedTool)) {
      detectedTools.push(detectedTool);
      // console.log(`🚀 ${detectedTool} is available! Functions:`, event.data.functions);
      const { preferredTool, allTools } = await getPreferredTool(detectedTools);
      console.log(`✅ Storing detectedTools: ${allTools}, preferredTool: ${preferredTool}`);
      chrome.storage.local.set({ detectedTools: allTools, preferredTool }, () => {
        console.log("🧠 Stored detectedTools and preferredTool");
      });
    }
  });
})();

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message from popup:", request);
  if (request.action === "detectTool") {
    chrome.storage.local.get(["detectedTools", "preferredTool"], (data) => {
      if (data.detectedTools && data.detectedTools.includes(request.tool)) {
        console.log(`ℹ️ Using stored detection for ${request.tool}`);
        sendResponse({ detected: true });
      } else {
        detectABTool(request.tool, (isToolPresent) => {
          sendResponse({ detected: isToolPresent });
        });
      }
    });
  } else if (request.action === "injectScript") {
    chrome.storage.local.get(["detectedTools", "preferredTool"], (data) => {
      if (data.detectedTools && data.detectedTools.includes(request.tool)) {
        injectScript(request.scriptData, (result) => {
          sendResponse(result);
        });
      } else {
        detectABTool(request.tool, (isToolPresent) => {
          if (isToolPresent) {
            injectScript(request.scriptData, (result) => {
              sendResponse(result);
            });
          } else {
            sendResponse({ success: false, error: `A/B tool ${request.tool} not found` });
          }
        });
      }
    });
  } else {
    console.log(`❌ Unknown action: ${request.action}`);
    sendResponse({ error: `Unknown action: ${request.action}` });
  }
  return true;
});

// Listen for tool detection messages (for debugging)
window.addEventListener("message", (event) => {
  if (event.source !== window || !event.data || !Object.values(toolIdentifiers).some(config => config.messageType === event.data.type)) return;
  // console.log(`🚀 ${event.data.type.replace('_FOUND', '')} is available! Functions:`, event.data.functions);
  console.log(`✅ You can now run ${event.data.type.replace('_FOUND', '')}-dependent code!`);
});