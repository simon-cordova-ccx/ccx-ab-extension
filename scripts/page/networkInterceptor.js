(function () {
  console.log("NetworkInterceptor loaded at", new Date().toISOString()); // Debug injection
  const originalFetch = window.fetch;
  window.fetch = async function (url, options) {
    console.log("Fetch intercepted:", { url, method: options?.method || 'GET' }); // Debug all fetches
    if (url.includes('logx.optimizely.com')) {
      const eventData = {
        type: 'NETWORK_EVENT',
        vendor: 'optimizely',
        timestamp: new Date().toISOString(),
        url: url,
        method: options?.method || 'GET',
        headers: options?.headers ? JSON.parse(JSON.stringify(options.headers)) : {},
        body: options?.body ? await (async () => {
          try {
            const text = await options.body.text();
            return text.length > 0 ? text : null;
          } catch (e) {
            console.error("Failed to read body:", e);
            return null;
          }
        })() : null
      };
      console.log('✅ Intercepted Optimizely Request:', eventData);
      window.postMessage(eventData, window.location.origin);
    }
    return originalFetch.apply(this, arguments);
  };

  const originalXHR = window.XMLHttpRequest;
  window.XMLHttpRequest = function () {
    const xhr = new originalXHR();
    const open = xhr.open;
    xhr.open = function (method, url) {
      console.log("XHR intercepted:", { method, url }); // Debug all XHRs
      if (url.includes('logx.optimizely.com')) {
        console.log('✅ Intercepted Optimizely XHR:', { method, url });
        const send = xhr.send;
        xhr.send = function (body) {
          console.log('XHR Body:', body);
          send.apply(this, arguments);
        };
      }
      return open.apply(this, arguments);
    };
    return xhr;
  };
})();