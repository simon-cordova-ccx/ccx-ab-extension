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