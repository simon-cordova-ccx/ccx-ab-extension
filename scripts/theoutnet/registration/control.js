// TODO: NEED TO ADD LINKS FOR THE BUTTONS
// const URL_PATTERN = /^https:\/\/www\.theoutnet\.com\/(en-gb|en-au|de-de|en-de|en-be|fr-fr|ar-ae|it-it|ja-jp|ko-kr|zh-cn)\/shop(?:\/mens)?\/?$/;

// TODO: NEED TO SEND ATTRIBUTES WHEN:
//  CONTROL REACHES THE JUST IN SECTION
//  VARIANTS REACH THE VARIATION CHANGES

// /shop and /shop/mens

const LOG_ENABLED = true;

const TEST_META = {
  NUMBER: "web00716",
  VARIATION: "CONTROL",
};

const SELECTORS = {
  CONTAINER_JUST_IN: '[data-testid="whats-new-outer"]',
};

const customLog = function () {
  if (!LOG_ENABLED) return;

  const style = "background: #000; color: white; padding: 4px 8px; border-radius: 4px;";
  const parts = [];
  const values = [];

  for (var i = 0; i < arguments.length; i++) {
    var msg = arguments[i];
    if (msg instanceof Element) {
      parts.push("%o");
      values.push(msg);
    } else {
      parts.push("%c" + String(msg).toUpperCase());
      values.push(style);
    }
  }

  console.log(parts.join(" "), ...values);
};

const insersectElements = (element) => {
  window['optimizely'] = window['optimizely'] || [];

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      window.optimizely.push({
        type: 'user',
        attributes: {
          'web-00716': 'saw-just-in'
        }
      });
    }
  }, {
    threshold: 1.0
  });

  observer.observe(element);
}

const init = function () {
  try {
    customLog("🚀 INIT STARTED");

    document.body.classList.add("ccx-outnet-web-00716");

    console.log({ TEST_META });

    const utils = window.optimizely.get('utils');

    if (!utils || typeof utils.waitForElement !== 'function') {
      customLog("❌ Optimizely utility function waitForElement not available.");
      return;
    }

    // Wait for the JUST IN element to appear in the DOM, then apply the changes
    utils.waitForElement(SELECTORS.CONTAINER_JUST_IN).then(function (containerJustIn) {
      const justInParentTopLevelContainer = containerJustIn.parentNode.parentNode.parentNode;
      insersectElements(justInParentTopLevelContainer);
    });

    customLog("🎉 INIT COMPLETE");
  } catch (error) {
    console.error("[init] ❌ Error: " + error.message + "\nStack: " + error.stack);
  }
};

init();
