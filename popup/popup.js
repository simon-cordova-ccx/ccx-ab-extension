console.log("CCX AB Extension popup initialized at", new Date().toISOString());

document.addEventListener("DOMContentLoaded", () => {
  const abToolSelect = document.getElementById("ab-tool");
  const clientSelect = document.getElementById("client");
  const testSelect = document.getElementById("test");
  const variationSelect = document.getElementById("variation");
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
            if (!clientEntry.isDirectory || ['content.js', 'background.js'].includes(clientEntry.name)) {
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

                const test = { name: testEntry.name, variations: [] };
                testEntry.createReader().readEntries(variationEntries => {
                  let variationsProcessed = 0;

                  if (variationEntries.length === 0) {
                    testsProcessed++;
                    client.tests.push(test);
                    if (testsProcessed === testEntries.length) {
                      clientsProcessed++;
                      folderStructure.clients.push(client);
                      if (clientsProcessed === clientEntries.length) callback(folderStructure);
                    }
                    return;
                  }

                  variationEntries.forEach(variationEntry => {
                    if (!variationEntry.isDirectory) {
                      variationsProcessed++;
                      if (variationsProcessed === variationEntries.length) {
                        testsProcessed++;
                        client.tests.push(test);
                        if (testsProcessed === testEntries.length) {
                          clientsProcessed++;
                          folderStructure.clients.push(client);
                          if (clientsProcessed === clientEntries.length) callback(folderStructure);
                        }
                      }
                      return;
                    }

                    const variation = { name: variationEntry.name, scripts: [] };
                    variationEntry.createReader().readEntries(scriptEntries => {
                      scriptEntries.forEach(scriptEntry => {
                        if (scriptEntry.isFile && scriptEntry.name.endsWith('.js')) {
                          variation.scripts.push({
                            name: scriptEntry.name,
                            script: {
                              type: "file",
                              src: `scripts/${clientEntry.name}/${testEntry.name}/${variationEntry.name}/${scriptEntry.name}`
                            }
                          });
                        }
                      });
                      variationsProcessed++;
                      test.variations.push(variation);
                      if (variationsProcessed === variationEntries.length) {
                        testsProcessed++;
                        client.tests.push(test);
                        if (testsProcessed === testEntries.length) {
                          clientsProcessed++;
                          folderStructure.clients.push(client);
                          if (clientsProcessed === clientEntries.length) callback(folderStructure);
                        }
                      }
                    });
                  });
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

  // Populate client dropdown
  generateFolderStructure(folderStructure => {
    console.log("Generated folder structure:", folderStructure);
    folderStructure.clients.forEach(client => {
      const option = document.createElement("option");
      option.value = client.name;
      option.textContent = client.name;
      clientSelect.appendChild(option);
    });
  });

  // Handle client selection
  clientSelect.addEventListener("change", () => {
    const selectedClient = clientSelect.value;
    testSelect.innerHTML = '<option value="">Select Test</option>';
    variationSelect.innerHTML = '<option value="">Select Variation</option>';
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
    variationSelect.innerHTML = '<option value="">Select Variation</option>';
    scriptSelect.innerHTML = '<option value="">Select Script</option>';
    injectButton.disabled = true;
    if (selectedClient && selectedTest) {
      generateFolderStructure(folderStructure => {
        const client = folderStructure.clients.find(c => c.name === selectedClient);
        const test = client.tests.find(t => t.name === selectedTest);
        if (test) {
          test.variations.forEach(variation => {
            const option = document.createElement("option");
            option.value = variation.name;
            option.textContent = variation.name;
            variationSelect.appendChild(option);
          });
        }
      });
    }
  });

  // Handle variation selection
  variationSelect.addEventListener("change", () => {
    const selectedClient = clientSelect.value;
    const selectedTest = testSelect.value;
    const selectedVariation = variationSelect.value;
    scriptSelect.innerHTML = '<option value="">Select Script</option>';
    injectButton.disabled = true;
    if (selectedClient && selectedTest && selectedVariation) {
      generateFolderStructure(folderStructure => {
        const client = folderStructure.clients.find(c => c.name === selectedClient);
        const test = client.tests.find(t => t.name === selectedTest);
        const variation = test.variations.find(v => v.name === selectedVariation);
        if (variation) {
          variation.scripts.forEach(script => {
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

  // Handle tool selection
  abToolSelect.addEventListener("change", () => {
    const selectedTool = abToolSelect.value;
    console.log(`Selected tool: ${selectedTool}`);
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
            injectButton.disabled = !scriptSelect.value;
            statusDiv.textContent = `${selectedTool} detected. Ready to inject script.`;
            statusDiv.className = "";
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