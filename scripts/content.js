// scripts/content.js
console.log("CCX AB content script loaded at", new Date().toISOString());

const toolIdentifiers = {
  dynamicyield: { scriptPath: "scripts/page/detector.js", messageType: "DY_FOUND" },
  optimizely: { windowObject: "optimizely", messageType: "OPTIMIZELY_FOUND" }
};

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
      (document.head || document.documentElement).appendChild(script);
    } else {
      throw new Error("Invalid script data: only file-based scripts are supported due to CSP");
    }
  } catch (error) {
    console.error("❌ Script injection failed:", error.message);
    callback({ success: false, error: error.message });
  }
}

function detectABToolFileInjection(tool, callback) {
  const toolConfig = toolIdentifiers[tool];
  if (!toolConfig || !toolConfig.scriptPath) {
    console.log(`❌ Unsupported A/B tool or missing detector script: ${tool}`);
    callback(false);
    return;
  }

  injectScript({ type: "file", src: toolConfig.scriptPath }, (result) => {
    if (!result.success) callback(false);
  });

  const onMessage = (event) => {
    if (event.source !== window || !event.data || event.data.type !== toolConfig.messageType) return;
    window.removeEventListener("message", onMessage);
    console.log(`🚀 ${tool} detected via file injection (${event.data.detectedObject})`);
    callback(true);
  };

  window.addEventListener("message", onMessage);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message from popup:", request);
  if (request.action === "detectTool") {
    detectABToolFileInjection(request.tool, (isToolPresent) => {
      sendResponse({ detected: isToolPresent });
    });
  } else if (request.action === "injectScript") {
    detectABToolFileInjection(request.tool, (isToolPresent) => {
      if (isToolPresent) {
        injectScript(request.scriptData, (result) => {
          sendResponse(result);
        });
      } else {
        sendResponse({ success: false, error: `A/B tool ${request.tool} not found` });
      }
    });
  } else {
    console.log(`❌ Unknown action: ${request.action}`);
    sendResponse({ error: `Unknown action: ${request.action}` });
  }
  return true;
});

window.addEventListener("message", (event) => {
  if (event.source !== window || !event.data || !Object.values(toolIdentifiers).some(config => config.messageType === event.data.type)) return;
  console.log(`🚀 ${event.data.type.replace('_FOUND', '')} is available! Functions:`, event.data.functions);
  console.log(`✅ You can now run ${event.data.type.replace('_FOUND', '')}-dependent code!`);
});
