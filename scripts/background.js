console.log("CCX AB background script loaded");

if (process.env.NODE_ENV === 'development') {
  const ws = new WebSocket('ws://localhost:8080');
  ws.onopen = () => {
    console.log('Connected to WebSocket server');
  };
  ws.onmessage = (event) => {
    const { type, path } = JSON.parse(event.data);
    if (type === 'file-changed') {
      console.log(`Background: Detected file change: ${path}`);
      chrome.storage.local.get(['autoInject', 'lastInjectedScript'], async (data) => {
        const { autoInject, lastInjectedScript } = data;
        const scriptData = autoInject?.scriptData || lastInjectedScript;
        if (scriptData && path === scriptData.src) {
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tab) {
            chrome.tabs.sendMessage(tab.id, {
              action: 'injectScript',
              tool: autoInject?.tool || chrome.storage.local.get('preferredTool').preferredTool,
              scriptData: { ...scriptData, src: `${scriptData.src}?t=${Date.now()}` }
            }, (response) => {
              console.log('Hot reload response:', response);
              if (response?.success) {
                chrome.runtime.sendMessage({ action: 'updateStatus', message: `Script ${path} re-injected`, className: '' });
              } else {
                chrome.runtime.sendMessage({ action: 'updateStatus', message: `Hot reload failed: ${response?.error || 'Unknown error'}`, className: 'error' });
              }
            });
          }
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