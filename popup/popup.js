console.log("CCX AB Extension popup initialized at", new Date().toISOString());

document.addEventListener("DOMContentLoaded", () => {
  const abToolSelect = document.getElementById("ab-tool");
  const clientSelect = document.getElementById("client");
  const testSelect = document.getElementById("test");
  const scriptSelect = document.getElementById("script");
  const injectButton = document.getElementById("inject-button");
  const statusDiv = document.getElementById("status");

  // Dynamically generate folder structure
  function generateFolderStructure(callback) {
    chrome.runtime.getPackageDirectoryEntry(root => {
      root.getDirectory("scripts", {}, scriptsDir => {
        scriptsDir.createReader().readEntries(clientEntries => {
          const folderStructure = { clients: [] };
          let clientsProcessed = 0;

          if (clientEntries.length === 0) {
            callback(folderStructure);
            return;
          }

          clientEntries.forEach(clientEntry => {
            if (!clientEntry.isDirectory || ['content.js', 'background.js', 'page'].includes(clientEntry.name)) {
              clientsProcessed++;
              if (clientsProcessed === clientEntries.length) callback(folderStructure);
              return;
            }

            const client = { name: clientEntry.name, tests: [] };
            clientEntry.createReader().readEntries(testEntries => {
              let testsProcessed = 0;

              if (testEntries.length === 0) {
                clientsProcessed++;
                folderStructure.clients.push(client);
                if (clientsProcessed === clientEntries.length) callback(folderStructure);
                return;
              }

              testEntries.forEach(testEntry => {
                if (!testEntry.isDirectory) {
                  testsProcessed++;
                  if (testsProcessed === testEntries.length) {
                    clientsProcessed++;
                    folderStructure.clients.push(client);
                    if (clientsProcessed === clientEntries.length) callback(folderStructure);
                  }
                  return;
                }

                const test = { name: testEntry.name, scripts: [] };
                testEntry.createReader().readEntries(scriptEntries => {
                  scriptEntries.forEach(scriptEntry => {
                    if (scriptEntry.isFile && scriptEntry.name.endsWith('.js')) {
                      test.scripts.push({
                        name: scriptEntry.name,
                        script: {
                          type: "file",
                          src: `scripts/${clientEntry.name}/${testEntry.name}/${scriptEntry.name}`
                        }
                      });
                    }
                  });
                  testsProcessed++;
                  client.tests.push(test);
                  if (testsProcessed === testEntries.length) {
                    clientsProcessed++;
                    folderStructure.clients.push(client);
                    if (clientsProcessed === clientEntries.length) callback(folderStructure);
                  }
                });
              });
            });
          });
        });
      }, err => {
        console.error("❌ Failed to read scripts directory:", err);
        statusDiv.textContent = "Error: Failed to read scripts directory.";
        statusDiv.className = "error";
        callback({ clients: [] });
      });
    });
  }

  // Load client configuration
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

  // Match URL to client
  async function matchClientByUrl(url) {
    const config = await loadConfig();
    for (const entry of config.toolPriority) {
      if (url.includes(entry.urlPattern)) {
        return entry.client;
      }
    }
    return null;
  }

  // Populate client dropdown and pre-select based on URL
  generateFolderStructure(folderStructure => {
    console.log("Generated folder structure:", folderStructure);
    folderStructure.clients.forEach(client => {
      const option = document.createElement("option");
      option.value = client.name;
      option.textContent = client.name;
      clientSelect.appendChild(option);
    });

    // Pre-select client based on URL
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (!tabs[0] || !tabs[0].url) {
        console.error("❌ No active tab or URL found");
        return;
      }
      const url = tabs[0].url;
      console.log(`Current tab URL: ${url}`);
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
    });
  });

  // Handle client selection
  clientSelect.addEventListener("change", () => {
    const selectedClient = clientSelect.value;
    testSelect.innerHTML = '<option value="">Select Test</option>';
    scriptSelect.innerHTML = '<option value="">Select Script</option>';
    injectButton.disabled = true;
    if (selectedClient) {
      generateFolderStructure(folderStructure => {
        const client = folderStructure.clients.find(c => c.name === selectedClient);
        if (client) {
          client.tests.forEach(test => {
            const option = document.createElement("option");
            option.value = test.name;
            option.textContent = test.name;
            testSelect.appendChild(option);
          });
        }
      });
    }
  });

  // Handle test selection
  testSelect.addEventListener("change", () => {
    const selectedClient = clientSelect.value;
    const selectedTest = testSelect.value;
    scriptSelect.innerHTML = '<option value="">Select Script</option>';
    injectButton.disabled = true;
    if (selectedClient && selectedTest) {
      generateFolderStructure(folderStructure => {
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
      });
    }
  });

  // Handle script selection
  scriptSelect.addEventListener("change", () => {
    injectButton.disabled = !abToolSelect.value || !scriptSelect.value;
  });

  // Auto-select detected tool and check for multiple tools
  chrome.storage.local.get(["detectedTools", "preferredTool"], (data) => {
    const detectedTools = data.detectedTools || [];
    const preferredTool = data.preferredTool || "";
    if (preferredTool && abToolSelect.querySelector(`option[value="${preferredTool}"]`)) {
      console.log(`Auto-selecting preferred tool: ${preferredTool}`);
      abToolSelect.value = preferredTool;
      if (detectedTools.length > 1) {
        const otherTools = detectedTools.filter(tool => tool !== preferredTool);
        statusDiv.textContent = `${preferredTool} detected. Warning: Other tools (${otherTools.join(", ")}) also present. Please select a script.`;
        statusDiv.className = "warning";
      } else {
        statusDiv.textContent = `${preferredTool} detected. Please select a script.`;
        statusDiv.className = "";
      }
      injectButton.disabled = !scriptSelect.value;
    } else {
      console.log("No detected tool found in storage");
      injectButton.disabled = true;
      statusDiv.textContent = "Please select an A/B testing tool.";
      statusDiv.className = "";
    }
  });

  // Handle tool selection (manual override)
  abToolSelect.addEventListener("change", () => {
    const selectedTool = abToolSelect.value;
    console.log(`Manually selected tool: ${selectedTool}`);
    if (selectedTool) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0]) {
          console.error("❌ No active tab found");
          statusDiv.textContent = "Error: No active tab found.";
          statusDiv.className = "error";
          injectButton.disabled = true;
          return;
        }
        console.log(`Sending detectTool message to tab ${tabs[0].id}`);
        chrome.tabs.sendMessage(tabs[0].id, { action: "detectTool", tool: selectedTool }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("❌ Error sending message:", chrome.runtime.lastError.message);
            statusDiv.textContent = `Error: ${chrome.runtime.lastError.message}`;
            statusDiv.className = "error";
            injectButton.disabled = true;
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
          } else {
            injectButton.disabled = true;
            statusDiv.textContent = `${selectedTool} not found on this page.`;
            statusDiv.className = "error";
          }
        });
      });
    } else {
      injectButton.disabled = true;
      statusDiv.textContent = "Please select an A/B testing tool.";
      statusDiv.className = "";
    }
  });

  // Handle inject button click
  injectButton.addEventListener("click", () => {
    const selectedTool = abToolSelect.value;
    const selectedScript = scriptSelect.value ? JSON.parse(scriptSelect.value) : null;
    console.log(`Injecting script for ${selectedTool}:`, selectedScript);
    if (!selectedScript) {
      statusDiv.textContent = "Error: No script selected.";
      statusDiv.className = "error";
      return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]) {
        console.error("❌ No active tab found");
        statusDiv.textContent = "Error: No active tab found.";
        statusDiv.className = "error";
        return;
      }
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
          statusDiv.textContent = `Injection failed: ${response.error}`;
          statusDiv.className = "error";
        }
      });
    });
  });
});