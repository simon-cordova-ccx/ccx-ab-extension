const LOG_ENABLED = false;

const TEST_META = {
  NUMBER: "DE1",
  VARIATION: "NEW CONTROL",
  UTM_SOURCE: "",
};

const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.indexOf("staging") !== -1;
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const SELECTORS = {
  ORIGINAL_CONTAINER: "#enter-now-material-tab-buttons-design",
  SHOPIFY_CONTAINERS: "main .shopify-section > div",
  NAV_BUTTON_FIRST: "#enter-now-material-tab-buttons-design nav button:nth-child(1)",
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

const waitForElement = async function (selector, minElements = 1, interval = 100, maxRetries = 10) {
  customLog("🔍 Waiting for element: " + selector);
  await DYO.waitForElementAsync(selector, minElements, interval, maxRetries);
  const foundElement = document.querySelector(selector);
  customLog("✅ Element ready:", foundElement);
  return foundElement;
};

const hideAllContainers = function () {
  customLog("🚫 Hiding all Shopify containers...");
  const containers = document.querySelectorAll(SELECTORS.SHOPIFY_CONTAINERS);
  customLog("🔢 Containers found: " + containers.length);
  containers.forEach(function (container, index) {
    customLog("➡️ Hiding container #" + (index + 1) + " with ID: " + container.id);
    container.classList.add("d-none");
    container.setAttribute("style", "display: none !important;");
  });
};

const showCorrectContainer = function () {
  customLog("🎯 Attempting to show original main container...");
  const originalMainContainer = document.querySelector(SELECTORS.ORIGINAL_CONTAINER);
  if (originalMainContainer) {
    customLog("✅ Original container found:", originalMainContainer);
    originalMainContainer.classList.remove("d-none");
    originalMainContainer.setAttribute("style", "display: block !important;");
  } else {
    customLog("❌ Original container not found!");
  }
};

const init = async function () {
  try {
    customLog("🚀 INIT STARTED");
    customLog("🔧 Test meta: " + TEST_META.NUMBER + " - " + TEST_META.UTM_SOURCE + " - " + TEST_META.VARIATION + " - Environment: " + ENVIRONMENT);

    hideAllContainers();

    customLog("⏳ Waiting for original main container...");
    await waitForElement(SELECTORS.ORIGINAL_CONTAINER);

    const firstNavButton = await waitForElement(SELECTORS.NAV_BUTTON_FIRST);

    if (firstNavButton) {
      customLog("👆 Clicking second nav button...");
      setTimeout(() => {
        firstNavButton.click();
        customLog("✅ Second nav button clicked");
      }, 500);
    }

    showCorrectContainer();

    document.body.classList.add("omaze-de1-new-control");
    customLog("🎉 INIT COMPLETE");
  } catch (error) {
    console.error("[init] ❌ Error: " + error.message + "\nStack: " + error.stack);
  }
};

init();
