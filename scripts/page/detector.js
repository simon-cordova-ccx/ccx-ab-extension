(function () {
  const toolIdentifiers = {
    dynamicyield: { windowObjects: ['DY', 'DYO'], messageType: 'DY_FOUND' },
    optimizely: { windowObject: 'optimizely', messageType: 'OPTIMIZELY_FOUND' }
  };

  for (const [tool, config] of Object.entries(toolIdentifiers)) {
    const detected = config.windowObjects 
      ? config.windowObjects.find(obj => typeof window[obj] !== "undefined")
      : typeof window[config.windowObject] !== "undefined" ? config.windowObject : null;
    
    if (detected) {
      window.postMessage({
        type: config.messageType,
        tool: tool,
        functions: Object.keys(window[detected] || {}),
        detectedObject: detected
      }, "*");
      break; // Stop after detecting the first tool
    }
  }
})();