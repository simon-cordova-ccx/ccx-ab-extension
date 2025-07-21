import { minify } from 'terser';

console.log("CCX AB Extension popup initialized at", new Date().toISOString());

document.addEventListener("DOMContentLoaded", () => {
  const abToolSelect = document.getElementById("ab-tool");
  const clientSelect = document.getElementById("client");
  const testSelect = document.getElementById("test");
  const scriptSelect = document.getElementById("script");
  const injectButton = document.getElementById("inject-button");
  const copyButton = document.getElementById("copy-button");
  const statusDiv = document.getElementById("status");

  // Static folder structure
  const folderStructure = {
    clients: [
      {
        name: 'allclear',
        tests: [
          {
            name: 'test1',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/allclear/test1/v1.js' } }
            ]
          }
        ]
      },
      {
        name: 'davidlloyd',
        tests: [
          {
            name: 'test1',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/davidlloyd/test1/v1.js' } }
            ]
          }
        ]
      },
      {
        name: 'heathrow',
        tests: [
          {
            name: 'test1',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/heathrow/test1/v1.js' } }
            ]
          }
        ]
      },
      {
        name: 'omaze',
        tests: [
          {
            name: 'oz18',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/oz18/v1.js' } },
              // { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/de1/v1.js' } }
            ]
          },
          {
            name: 'de1',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/de1/v1.js' } }
            ]
          },
          {
            name: 'oz20',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/oz20/v1.js' } }
            ]
          },
          {
            name: 'oz21',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/oz21/v1.js' } }
            ]
          }
        ]
      }
    ]
  };

  // Load client configuration
    async function loadConfig() {
    console.log("Loading client configuration...");
    try {
      const response = await fetch(chrome.runtime.getURL("scripts/config.json"));
      console.log("Received response:", response);
      if (!response.ok) {
        throw new Error(`Failed to load config: ${response.statusText}`);
      }
      const config = await response.json();
      console.log("Loaded config:", config);
      return config;
    } catch (error) {
      console.error("❌ Failed to load config.json:", error.message);
      statusDiv.textContent = "Error: Failed to load configuration.";
      statusDiv.className = "error";
      return { toolPriority: [] };
    }
  }

  // Match URL to client
  async function matchClientByUrl(url) {
    const config = await loadConfig();
    for (const entry of config.toolPriority) {
      if (url && url.includes(entry.urlPattern)) {
        return entry.client;
      }
    }
    return null;
  }

  // Populate client dropdown and pre-select based on URL
  console.log("Populating client dropdown with:", folderStructure);
  folderStructure.clients.forEach(client => {
    const option = document.createElement("option");
    option.value = client.name;
    option.textContent = client.name;
    clientSelect.appendChild(option);
  });

  // Pre-select client based on URL
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    if (!tabs || !tabs[0] || !tabs[0].url) {
      console.warn("⚠️ No active tab or URL found, skipping client pre-selection");
      statusDiv.textContent = "No active tab found. Please select a client manually.";
      statusDiv.className = "warning";
      return;
    }
    const url = tabs[0].url;
    console.log(`Current tab URL: ${url}`);
    try {
      const matchedClient = await matchClientByUrl(url);
      if (matchedClient && clientSelect.querySelector(`option[value="${matchedClient}"]`)) {
        console.log(`Pre-selecting client: ${matchedClient}`);
        clientSelect.value = matchedClient;
        // Trigger change event to populate test dropdown
        const event = new Event("change");
        clientSelect.dispatchEvent(event);
      } else {
        console.log("No client matched for URL");
      }
    } catch (error) {
      console.error("❌ Error matching client by URL:", error.message);
      statusDiv.textContent = "Error matching client. Please select a client manually.";
      statusDiv.className = "error";
    }
  });

  // Handle client selection
  clientSelect.addEventListener("change", () => {
    console.log("Client selection changed:", clientSelect.value);
    const selectedClient = clientSelect.value;
    testSelect.innerHTML = '<option value="">Select Test</option>';
    scriptSelect.innerHTML = '<option value="">Select Script</option>';
    injectButton.disabled = true;
    copyButton.disabled = true;
    if (selectedClient) {
      const client = folderStructure.clients.find(c => c.name === selectedClient);
      if (client) {
        client.tests.forEach(test => {
          const option = document.createElement("option");
          option.value = test.name;
          option.textContent = test.name;
          testSelect.appendChild(option);
        });
      }
    }
  });

  // Handle test selection
  testSelect.addEventListener("change", () => {
    const selectedClient = clientSelect.value;
    const selectedTest = testSelect.value;
    scriptSelect.innerHTML = '<option value="">Select Script</option>';
    injectButton.disabled = true;
    copyButton.disabled = true;
    if (selectedClient && selectedTest) {
      const client = folderStructure.clients.find(c => c.name === selectedClient);
      const test = client.tests.find(t => t.name === selectedTest);
      if (test) {
        test.scripts.forEach(script => {
          const option = document.createElement("option");
          option.value = JSON.stringify(script.script);
          option.textContent = script.name;
          scriptSelect.appendChild(option);
        });
      }
    }
  });

  // Handle script selection
  scriptSelect.addEventListener("change", () => {
    const hasSelection = abToolSelect.value && scriptSelect.value;
    injectButton.disabled = !hasSelection;
    copyButton.disabled = !scriptSelect.value;
  });

  // Auto-select detected tool and check for multiple tools
  chrome.storage.local.get(["detectedTools", "preferredTool"], (data) => {
    const detectedTools = data.detectedTools || [];
    let toolToSelect = data.preferredTool || "";
    if (!toolToSelect && detectedTools.length > 0) {
      toolToSelect = detectedTools[0]; // Fallback to first detected tool
    }
    if (toolToSelect && abToolSelect.querySelector(`option[value="${toolToSelect}"]`)) {
      console.log(`Auto-selecting tool: ${toolToSelect}`);
      abToolSelect.value = toolToSelect;
      if (detectedTools.length > 1) {
        const otherTools = detectedTools.filter(tool => tool !== toolToSelect);
        statusDiv.textContent = `${toolToSelect} detected. Warning: Other tools (${otherTools.join(", ")}) also present.`;
        statusDiv.className = "warning";
      } else {
        statusDiv.textContent = `${toolToSelect} detected. Please select a script.`;
        statusDiv.className = "";
      }
      injectButton.disabled = !scriptSelect.value;
      copyButton.disabled = !scriptSelect.value;
    } else {
      console.log("No tool to select");
      injectButton.disabled = true;
      copyButton.disabled = true;
      statusDiv.textContent = "Please select an A/B testing tool.";
    }
  });

  // Handle tool selection (manual override)
  abToolSelect.addEventListener("change", () => {
    const selectedTool = abToolSelect.value;
    console.log(`Manually selected tool: ${selectedTool}`);
    if (selectedTool) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs || !tabs[0]) {
          console.error("❌ No active tab found");
          statusDiv.textContent = "Error: No active tab found.";
          statusDiv.className = "error";
          injectButton.disabled = true;
          copyButton.disabled = true;
          return;
        }
        console.log(`Sending detectTool message to tab ${tabs[0].id}`);
        chrome.tabs.sendMessage(tabs[0].id, { action: "detectTool", tool: selectedTool }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("❌ Error sending message:", chrome.runtime.lastError.message);
            statusDiv.textContent = `Error: ${chrome.runtime.lastError.message}`;
            statusDiv.className = "error";
            injectButton.disabled = true;
            copyButton.disabled = true;
            return;
          }
          console.log("Received response:", response);
          if (response && response.detected) {
            chrome.storage.local.set({ preferredTool: selectedTool }, () => {
              console.log("🧠 Stored manually selected tool:", selectedTool);
            });
            chrome.storage.local.get("detectedTools", (data) => {
              const detectedTools = data.detectedTools || [];
              if (detectedTools.length > 1) {
                const otherTools = detectedTools.filter(tool => tool !== selectedTool);
                statusDiv.textContent = `${selectedTool} detected. Warning: Other tools (${otherTools.join(", ")}) also present. Please select a script.`;
                statusDiv.className = "warning";
              } else {
                statusDiv.textContent = `${selectedTool} detected. Please select a script.`;
                statusDiv.className = "";
              }
            });
            injectButton.disabled = !scriptSelect.value;
            copyButton.disabled = !scriptSelect.value;
          } else {
            injectButton.disabled = true;
            copyButton.disabled = true;
            statusDiv.textContent = `${selectedTool} not found on this page.`;
            statusDiv.className = "error";
          }
        });
      });
    } else {
      injectButton.disabled = true;
      copyButton.disabled = true;
      statusDiv.textContent = "Please select an A/B testing tool.";
      statusDiv.className = "";
    }
  });

  // Handle inject button click
  injectButton.addEventListener("click", () => {
    console.log("Inject button clicked");
    const selectedTool = abToolSelect.value;
    const selectedScript = scriptSelect.value ? JSON.parse(scriptSelect.value) : null;
    console.log(`Injecting script for ${selectedTool}:`, selectedScript);
    if (!selectedTool || !selectedScript) {
      statusDiv.textContent = "Error: Please select a tool and script.";
      statusDiv.className = "error";
      return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || !tabs[0]) {
        console.error("❌ No active tab found");
        statusDiv.textContent = "Error: No active tab found.";
        statusDiv.className = "error";
        return;
      }

      // --- Store auto-inject selection here ---
      chrome.storage.local.set({
        autoInject: {
          tool: selectedTool,
          scriptData: selectedScript,
          url: tabs[0].url // or use a pattern if you want
        }
      });

      chrome.tabs.sendMessage(tabs[0].id, { action: "injectScript", tool: selectedTool, scriptData: selectedScript }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("❌ Error sending message:", chrome.runtime.lastError.message);
          statusDiv.textContent = `Error: ${chrome.runtime.lastError.message}`;
          statusDiv.className = "error";
          return;
        }
        console.log("Injection response:", response);
        if (response && response.success) {
          statusDiv.textContent = "Script injected successfully!";
          statusDiv.className = "";
        } else {
          statusDiv.textContent = `Injection failed: ${response?.error || 'Unknown error'}`;
          statusDiv.className = "error";
        }
      });
    });
  });

  // Handle copy button click
  copyButton.addEventListener("click", async () => {
    console.log("Copy button clicked");
    const selectedScript = scriptSelect.value ? JSON.parse(scriptSelect.value) : null;
    if (!selectedScript || selectedScript.type !== "file" || !selectedScript.src) {
      statusDiv.textContent = "Error: No valid script selected.";
      statusDiv.className = "error";
      return;
    }

    try {
      const response = await fetch(chrome.runtime.getURL(selectedScript.src));
      if (!response.ok) {
        throw new Error(`Failed to fetch script: ${response.statusText}`);
      }
      const scriptContent = await response.text();
      const minified = await minify(scriptContent, { mangle: true, compress: true });
      if (minified.error) {
        console.error("❌ Minification failed:", minified.error);
        statusDiv.textContent = `Error: Minification failed - ${minified.error.message}`;
        statusDiv.className = "error";
        return;
      }

      await navigator.clipboard.writeText(minified.code);
      console.log(`✅ Copied minified script: ${selectedScript.src}`);
      statusDiv.textContent = "Minified script copied to clipboard!";
      statusDiv.className = "";
    } catch (error) {
      console.error("❌ Copy failed:", error.message);
      statusDiv.textContent = `Error: Failed to copy script - ${error.message}`;
      statusDiv.className = "error";
    }
  });
});