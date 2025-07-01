(function () {
  const DYObjects = ['DY', 'DYO'];
  const detected = DYObjects.find(obj => typeof window[obj] !== "undefined");
  if (detected) {
    window.postMessage({
      type: "DY_FOUND",
      functions: Object.keys(window[detected] || {}),
      detectedObject: detected
    }, "*");
  }
})();
