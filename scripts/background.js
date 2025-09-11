console.log("CCX AB background script loaded");

if (__IS_DEV__) {
  const ws = new WebSocket('ws://localhost:8080');
  ws.onopen = () => {
    console.log('Connected to WebSocket server');
  };
  ws.onmessage = (event) => {
    const { type, path } = JSON.parse(event.data);
    console.log('WebSocket message received:', { type, path }); // Debug log
    if (type === 'file-changed') {
      chrome.storage.local.get(['hotReloadEnabled', 'autoInject', 'lastInjectedScript'], async (data) => {
        const isHotReloadEnabled = data.hotReloadEnabled || false;
        console.log('Hot reload enabled:', isHotReloadEnabled); // Debug log
        if (!isHotReloadEnabled) {
          console.log('Hot reloading disabled, ignoring file change');
          return;
        }
        const { autoInject, lastInjectedScript } = data;
        const scriptData = autoInject?.scriptData || lastInjectedScript;
        if (scriptData && path === scriptData.src) {
          console.log('Matching script found, re-injecting:', scriptData.src); // Debug log
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tab) {
            const preferredTool = await new Promise(resolve => chrome.storage.local.get(['preferredTool'], data => resolve(data.preferredTool?.preferredTool)));
            chrome.tabs.sendMessage(tab.id, {
              action: 'injectScript',
              tool: autoInject?.tool || preferredTool,
              scriptData: { ...scriptData, src: `${scriptData.src}?t=${Date.now()}` }
            }, (response) => {
              console.log('Hot reload response:', response); // Debug log
              if (response?.success) {
                chrome.runtime.sendMessage({ action: 'updateStatus', message: `Script ${path} re-injected`, className: '' });
              } else {
                chrome.runtime.sendMessage({ action: 'updateStatus', message: `Hot reload failed: ${response?.error || 'Unknown error'}`, className: 'error' });
              }
            });
          } else {
            console.log('No active tab found for re-injection'); // Debug log
          }
        } else {
          console.log('No matching script found for path:', path); // Debug log
        }
      });
    }
  };
  ws.onerror = (error) => console.error('WebSocket error:', error);
  ws.onclose = () => console.log('WebSocket closed');
}

// Handle network event storage
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'storeNetworkEvent') {
    const { eventData } = request;
    chrome.storage.local.get([`vendorEvents_${eventData.vendor}`], (data) => {
      const events = data[`vendorEvents_${eventData.vendor}`] || [];
      events.push(eventData);
      // Limit to last 100 events to prevent storage overflow
      if (events.length > 100) events.shift();
      chrome.storage.local.set({ [`vendorEvents_${eventData.vendor}`]: events }, () => {
        console.log(`✅ Stored network event for ${eventData.vendor}`);
        // Notify open popups
        chrome.runtime.sendMessage({
          action: 'newEvent',
          event: eventData
        });
        sendResponse({ success: true });
      });
    });
  }
  return true;
});