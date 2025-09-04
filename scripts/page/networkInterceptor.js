(function () {
  const originalFetch = window.fetch;
  window.fetch = async function (url, options) {
    // Check if the request is to the Optimizely events endpoint
    if (url === 'https://logx.optimizely.com/v1/events') {
      const eventData = {
        type: 'NETWORK_EVENT',
        vendor: 'optimizely',
        timestamp: new Date().toISOString(),
        url: url,
        method: options?.method || 'GET',
        headers: options?.headers ? JSON.parse(JSON.stringify(options.headers)) : {},
        body: options?.body ? JSON.stringify(options.body) : null
      };
      console.log('✅ Intercepted Optimizely Request:', eventData);
      
      // Send event data to content script
      window.postMessage(eventData, '*');
    }
    // Call the original fetch
    return originalFetch.apply(this, arguments);
  };
})();