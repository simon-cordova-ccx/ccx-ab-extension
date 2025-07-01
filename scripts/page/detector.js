(function () {
  // Detect Dynamic Yield
  function detectDynamicYield() {
    const DYObjects = ['DY', 'DYO'];
    const detected = DYObjects.find(obj => typeof window[obj] !== "undefined");
    if (detected) {
      window.postMessage({
        type: "DY_FOUND",
        tool: "dynamicyield",
        functions: Object.keys(window[detected] || {}),
        detectedObject: detected
      }, "*");
      return true;
    }
    return false;
  }

  // Detect Optimizely
  function detectOptimizely() {
    if (typeof window.optimizely !== "undefined") {
      window.postMessage({
        type: "OPTIMIZELY_FOUND",
        tool: "optimizely",
        functions: Object.keys(window.optimizely || {}),
        detectedObject: "optimizely"
      }, "*");
      return true;
    }
    return false;
  }

  // Run all detections
  detectDynamicYield();
  detectOptimizely();
})();