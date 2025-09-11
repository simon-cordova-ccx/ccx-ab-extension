import { minify } from 'terser';

console.log("CCX AB Extension popup initialized at", new Date().toISOString());

// Define IS_DEV with fallback
const IS_DEV = typeof __IS_DEV__ !== 'undefined' ? __IS_DEV__ : false;

document.addEventListener("DOMContentLoaded", () => {
  const abToolSelect = document.getElementById("ab-tool");
  const clientSelect = document.getElementById("client");
  const testSelect = document.getElementById("test");
  const scriptSelect = document.getElementById("script");
  const injectButton = document.getElementById("inject-button");
  const copyButton = document.getElementById("copy-button");
  const statusDiv = document.getElementById("status");
  const hotReloadStatus = document.getElementById("hot-reload-status");
  const reinjectButton = document.getElementById("reinject-button");
  const hotReloadToggle = document.getElementById("hot-reload-toggle");

  // Show dev-only elements in development mode
  if (IS_DEV) {
    document.body.classList.add('dev-mode');
    hotReloadToggle.parentElement.style.display = 'block';
    reinjectButton.style.display = 'block';
    hotReloadStatus.style.display = 'block';
  } else {
    hotReloadToggle.parentElement.style.display = 'none';
    reinjectButton.style.display = 'none';
    hotReloadStatus.style.display = 'none';
  }

  // Load and set initial hot reload state
  chrome.storage.local.get(['hotReloadEnabled'], (data) => {
    const isHotReloadEnabled = data.hotReloadEnabled || false;
    hotReloadToggle.checked = isHotReloadEnabled;
    console.log('Loaded hot reload state:', isHotReloadEnabled);
  });

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
        name: 'liberty',
        tests: [
          {
            name: 'L01',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/liberty/L01/v1.js' } }
            ]
          }
        ]
      },
      {
        name: 'omaze',
        tests: [
          {
            name: 'de1',
            scripts: [
              { name: 'new_control.js', script: { type: 'file', src: 'scripts/omaze/de1/new_control.js' } },
              { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/de1/v1.js' } }
            ]
          },
          {
            name: 'de2',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/de2/v1.js' } }
            ]
          },
          {
            name: 'de3',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/de3/v1.js' } },
              { name: 'v2.js', script: { type: 'file', src: 'scripts/omaze/de3/v2.js' } }
            ]
          },
          {
            name: 'de5',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/de5/v1.js' } },
              { name: 'v2.js', script: { type: 'file', src: 'scripts/omaze/de5/v2.js' } }
            ]
          },
          {
            name: 'oz18',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/oz18/v1.js' } }
            ]
          },
          {
            name: 'oz19',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/oz19/v1.js' } }
            ]
          },
          {
            name: 'oz20',
            scripts: [
              { name: 'new_control.js', script: { type: 'file', src: 'scripts/omaze/oz20/new_control.js' } },
              { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/oz20/v1.js' } }
            ]
          },
          {
            name: 'oz21',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/oz21/v1.js' } }
            ]
          },
          {
            name: 'oz22',
            scripts: [
              { name: 'v1_payg.js', script: { type: 'file', src: 'scripts/omaze/oz22/v1_payg.js' } },
              { name: 'v1_subs.js', script: { type: 'file', src: 'scripts/omaze/oz22/v1_subs.js' } }
            ]
          },
          {
            name: 'oz23',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/oz23/v1.js' } },
              { name: 'v2.js', script: { type: 'file', src: 'scripts/omaze/oz23/v2.js' } }
            ]
          },
          {
            name: 'oz25',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/omaze/oz25/v1.js' } },
              { name: 'v2.js', script: { type: 'file', src: 'scripts/omaze/oz25/v2.js' } }
            ]
          },
          {
            name: 'oz26',
            scripts: [
              { name: 'code_for_all_variants.js', script: { type: 'file', src: 'scripts/omaze/oz26/code_for_all_variants.js' } }
            ]
          }
        ]
      },
      {
        name: 'theoutnet',
        tests: [
          {
            name: 'web-00716',
            scripts: [
              { name: 'v1.js', script: { type: 'file', src: 'scripts/theoutnet/registration/v1.js' } }
            ]
          }
        ]
      }
    ]
  };

  // Load client configuration
  async function loadConfig() {
    try {
      const response = await fetch(chrome.runtime.getURL("scripts/config.json"));
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
    option.textContent = client.name.charAt(0).toUpperCase() + client.name.slice(1);
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
    const selectedClient = clientSelect.value;
    testSelect.innerHTML = '<option value="">Select Test</option>';
    scriptSelect.innerHTML = '<option value="">Select Script</option>';
    injectButton.disabled = true;
    copyButton.disabled = true;
    reinjectButton.disabled = true;
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
    reinjectButton.disabled = true;
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
    reinjectButton.disabled = !scriptSelect.value;
  });

  // Auto-select detected tool and check for multiple tools
  chrome.storage.local.get(["detectedTools", "preferredTool"], (data) => {
    const detectedTools = data.detectedTools || [];
    let preferredTool = data.preferredTool || "";
    if (!preferredTool && detectedTools.length > 0) {
      preferredTool = detectedTools[0]; // Fall back to first detected if no preferred
    }
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
      copyButton.disabled = !scriptSelect.value;
      reinjectButton.disabled = !scriptSelect.value;
    } else {
      console.log("No detected tool found in storage");
      injectButton.disabled = true;
      copyButton.disabled = true;
      reinjectButton.disabled = true;
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
        if (!tabs || !tabs[0]) {
          console.error("❌ No active tab found");
          statusDiv.textContent = "Error: No active tab found.";
          statusDiv.className = "error";
          injectButton.disabled = true;
          copyButton.disabled = true;
          reinjectButton.disabled = true;
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
            reinjectButton.disabled = true;
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
            reinjectButton.disabled = !scriptSelect.value;
          } else {
            injectButton.disabled = true;
            copyButton.disabled = true;
            reinjectButton.disabled = true;
            statusDiv.textContent = `${selectedTool} not found on this page.`;
            statusDiv.className = "error";
          }
        });
      });
    } else {
      injectButton.disabled = true;
      copyButton.disabled = true;
      reinjectButton.disabled = true;
      statusDiv.textContent = "Please select an A/B testing tool.";
      statusDiv.className = "";
    }
  });

  // Handle inject button click
  injectButton.addEventListener("click", () => {
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

      // Ensure content script is injected
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['scripts/content.js']
      }, () => {
        if (chrome.runtime.lastError) {
          console.error("❌ Failed to inject content script:", chrome.runtime.lastError.message);
          statusDiv.textContent = `Error: ${chrome.runtime.lastError.message}`;
          statusDiv.className = "error";
          return;
        }

        // Store auto-inject selection and last injected script
        chrome.storage.local.set({
          autoInject: {
            tool: selectedTool,
            scriptData: selectedScript,
            url: tabs[0].url
          },
          lastInjectedScript: selectedScript
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
  });

  // Handle reinject button click
  reinjectButton.addEventListener('click', () => {
    chrome.storage.local.get('lastInjectedScript', (data) => {
      if (data.lastInjectedScript) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: 'injectScript',
              tool: abToolSelect.value,
              scriptData: { ...data.lastInjectedScript, src: `${data.lastInjectedScript.src}?t=${Date.now()}` }
            }, (response) => {
              if (response?.success) {
                statusDiv.textContent = 'Script re-injected successfully!';
                statusDiv.className = '';
              } else {
                statusDiv.textContent = `Re-injection failed: ${response?.error || 'Unknown error'}`;
                statusDiv.className = 'error';
              }
            });
          }
        });
      } else {
        statusDiv.textContent = 'No script previously injected.';
        statusDiv.className = 'error';
      }
    });
  });

  // Handle copy button click
  copyButton.addEventListener("click", async () => {
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

  // Listen for status updates from background
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateStatus') {
      hotReloadStatus.textContent = request.message;
      hotReloadStatus.className = request.className;
    }
  });

  // Toggle hot reloading
  hotReloadToggle.addEventListener('change', () => {
    const isEnabled = hotReloadToggle.checked;
    chrome.storage.local.set({ hotReloadEnabled: isEnabled }, () => {
      console.log('Hot reload toggled to:', isEnabled);
      hotReloadStatus.textContent = isEnabled ? 'Hot reloading enabled' : 'Hot reloading disabled';
      hotReloadStatus.className = isEnabled ? '' : 'warning';
    });
  });

  // Function to load and display events with type filter
  function loadEvents() {
    const vendor = document.getElementById('event-vendor').value;
    const eventTypeFilter = document.getElementById('event-type-filter').value;
    chrome.storage.local.get([`vendorEvents_${vendor}`], (data) => {
      const events = data[`vendorEvents_${vendor}`] || [];
      const eventLogsDiv = document.getElementById('event-logs');
      eventLogsDiv.innerHTML = '';

      events.forEach(event => {
        try {
          if (vendor === 'optimizely') {
            const body = JSON.parse(event.body);
            const eventData = body.visitors?.[0]?.snapshots?.[0]?.events || [];
            if (eventData.length > 0) {
              const filteredEvents = eventTypeFilter === 'all' ? eventData : eventData.filter(e => e.y === eventTypeFilter);
              if (filteredEvents.length > 0) {
                filteredEvents.forEach((eventItem, index) => {
                  const eventDiv = document.createElement('div');
                  eventDiv.className = 'event-log-item optimizely-event';
                  const headerDiv = document.createElement('div');
                  headerDiv.className = 'event-header';
                  headerDiv.textContent = `Event ${index + 1}`;
                  eventDiv.appendChild(headerDiv);
                  const detailsDiv = document.createElement('div');
                  detailsDiv.className = 'event-details';
                  const rows = [
                    { label: 'Timestamp', value: new Date(eventItem.t).toISOString() },
                    { label: 'Type', value: eventItem.y || 'N/A' },
                    { label: 'Key', value: eventItem.k || 'N/A' }
                  ];
                  rows.forEach(row => {
                    const rowDiv = document.createElement('div');
                    rowDiv.className = 'event-row';
                    const labelSpan = document.createElement('span');
                    labelSpan.className = 'event-label';
                    labelSpan.textContent = `${row.label}: `;
                    const valueSpan = document.createElement('span');
                    valueSpan.className = 'event-value';
                    valueSpan.textContent = row.value;
                    rowDiv.appendChild(labelSpan);
                    rowDiv.appendChild(valueSpan);
                    detailsDiv.appendChild(rowDiv);
                  });
                  if (Object.keys(eventItem.p || {}).length > 0) {
                    const paramsDiv = document.createElement('div');
                    paramsDiv.className = 'event-row';
                    const paramsLabel = document.createElement('span');
                    paramsLabel.className = 'event-label';
                    paramsLabel.textContent = 'Params: ';
                    const paramsValue = document.createElement('span');
                    paramsValue.className = 'event-value';
                    paramsValue.textContent = JSON.stringify(eventItem.p);
                    paramsDiv.appendChild(paramsLabel);
                    paramsDiv.appendChild(paramsValue);
                    detailsDiv.appendChild(paramsDiv);
                  }
                  if (Object.keys(eventItem.a || {}).length > 0) {
                    const attrsDiv = document.createElement('div');
                    attrsDiv.className = 'event-row';
                    const attrsLabel = document.createElement('span');
                    attrsLabel.className = 'event-label';
                    attrsLabel.textContent = 'Attributes: ';
                    const attrsValue = document.createElement('span');
                    attrsValue.className = 'event-value';
                    attrsValue.textContent = JSON.stringify(eventItem.a);
                    attrsDiv.appendChild(attrsLabel);
                    attrsDiv.appendChild(attrsValue);
                    detailsDiv.appendChild(attrsDiv);
                  }
                  eventDiv.appendChild(detailsDiv);
                  eventLogsDiv.appendChild(eventDiv);
                });
              } else {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event-log-item';
                eventDiv.textContent = `No events found for type: ${eventTypeFilter}`;
                eventLogsDiv.appendChild(eventDiv);
              }
            } else {
              const eventDiv = document.createElement('div');
              eventDiv.className = 'event-log-item';
              eventDiv.textContent = 'No events found in visitors[0].snapshots[0].events';
              eventLogsDiv.appendChild(eventDiv);
            }
          } else if (vendor === 'dynamicyield') {
            const eventData = [event];
            if (eventData.length > 0) {
              const filteredEvents = eventTypeFilter === 'all' ? eventData : eventData.filter(e => e.name === eventTypeFilter);
              if (filteredEvents.length > 0) {
                filteredEvents.forEach((eventItem, index) => {
                  const eventDiv = document.createElement('div');
                  eventDiv.className = 'event-log-item dynamicyield-event';
                  const headerDiv = document.createElement('div');
                  headerDiv.className = 'event-header';
                  headerDiv.textContent = `Custom Event ${index + 1}`;
                  eventDiv.appendChild(headerDiv);
                  const detailsDiv = document.createElement('div');
                  detailsDiv.className = 'event-details';
                  const rows = [
                    { label: 'Timestamp', value: eventItem.timestamp },
                    { label: 'Name', value: eventItem.name || 'N/A' },
                    { label: 'Traffic Source', value: eventItem.tsrc || 'N/A' },
                    { label: 'URL', value: eventItem.urlProp || 'N/A' }
                  ];
                  rows.forEach(row => {
                    const rowDiv = document.createElement('div');
                    rowDiv.className = 'event-row';
                    const labelSpan = document.createElement('span');
                    labelSpan.className = 'event-label';
                    labelSpan.textContent = `${row.label}: `;
                    const valueSpan = document.createElement('span');
                    valueSpan.className = 'event-value';
                    valueSpan.textContent = row.value;
                    rowDiv.appendChild(labelSpan);
                    rowDiv.appendChild(valueSpan);
                    detailsDiv.appendChild(rowDiv);
                  });
                  eventDiv.appendChild(detailsDiv);
                  eventLogsDiv.appendChild(eventDiv);
                });
              } else {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event-log-item';
                eventDiv.textContent = `No events found for name: ${eventTypeFilter}`;
                eventLogsDiv.appendChild(eventDiv);
              }
            }
          }
        } catch (e) {
          const eventDiv = document.createElement('div');
          eventDiv.className = 'event-log-item';
          eventDiv.textContent = `Error parsing event body: ${e.message}`;
          eventLogsDiv.appendChild(eventDiv);
        }
      });
      console.log(`Loaded ${events.length} events for ${vendor}, filtered by ${eventTypeFilter}`);
    });
  }

  // Populate event type filter with vendor-specific types
  function populateEventTypeFilter() {
    const eventTypeFilter = document.getElementById('event-type-filter');
    const vendor = document.getElementById('event-vendor').value;
    eventTypeFilter.innerHTML = '';
    if (vendor === 'optimizely') {
      const optimizelyEventTypes = ['all', 'client_activation', 'view_activated', 'other', 'conversion', 'revenue'];
      optimizelyEventTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ');
        eventTypeFilter.appendChild(option);
      });
    } else if (vendor === 'dynamicyield') {
      chrome.storage.local.get(['vendorEvents_dynamicyield'], (data) => {
        const events = data['vendorEvents_dynamicyield'] || [];
        const uniqueNames = ['all', ...new Set(events.map(e => e.name))];
        uniqueNames.forEach(name => {
          const option = document.createElement('option');
          option.value = name;
          option.textContent = name.charAt(0).toUpperCase() + name.slice(1);
          eventTypeFilter.appendChild(option);
        });
        eventTypeFilter.value = 'all';
      });
    }
    eventTypeFilter.value = 'all';
  }

  // Function to clear events
  function clearEvents() {
    const vendor = document.getElementById('event-vendor').value;
    chrome.storage.local.remove(`vendorEvents_${vendor}`, () => {
      const eventLogsDiv = document.getElementById('event-logs');
      eventLogsDiv.innerHTML = '';
      console.log(`Cleared events for ${vendor}`);
      statusDiv.textContent = `Events cleared for ${vendor}.`;
      statusDiv.className = '';
      populateEventTypeFilter();
    });
  }

  // Event listeners for event viewer
  document.getElementById('refresh-events').addEventListener('click', () => {
    console.log("Refresh button clicked");
    loadEvents();
  });
  document.getElementById('event-vendor').addEventListener('change', () => {
    populateEventTypeFilter();
    loadEvents();
  });
  document.getElementById('event-type-filter').addEventListener('change', loadEvents);
  document.getElementById('clear-events').addEventListener('click', clearEvents);

  // Initialize event viewer on popup load
  populateEventTypeFilter();
  loadEvents();
});