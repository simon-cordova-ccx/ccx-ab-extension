const LOG_ENABLED = true;
const TEST_NAME = "OZ-9 | MM LP Winner Testimonial";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";
const CLASS_STYLE = 'ccx-styles-de9-v1';
const CLASS_BODY = 'ccx-omaze-de9-v1';
const SELECTORS = {
  controlLogoLink: '#main-nav .logo-container a',
  controlBadgeLink: '.logo-center a',
  controlBurgerMenu: '.navbar-toggler.btn-hamburger'
};

// Waits for DOM elements to be available
const waitForElements = (configs, callback) => {
  customLog('[waitForElements] Starting to wait for elements...');
  if (!configs || !Array.isArray(configs) || configs.length === 0) {
    throw new Error('[waitForElements] No configs provided.');
  }
  if (!window.DYO || !DYO.waitForElementAsync) {
    throw new Error('[waitForElements] DYO.waitForElementAsync is not available.');
  }
  if (typeof callback !== 'function') {
    throw new Error('[waitForElements] Callback must be a function.');
  }

  const promises = configs.map(({ selector, count }) =>
    DYO.waitForElementAsync(selector, count, 100, 150)
      .then(elements => {
        customLog('[waitForElements] Found ' + elements.length + ' for ' + selector);
        return { selector, elements };
      })
  );

  return Promise.all(promises).then(callback);
};

// Custom logging function for debugging
const customLog = (...messages) => {
  if (!LOG_ENABLED) return;

  const style = `
        background: linear-gradient(90deg, #6a6971, #2a1f60);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
    `;

  const parts = [];
  const values = [];

  messages.forEach(msg => {
    if (msg instanceof Element) {
      parts.push("%o");
      values.push(msg);
    } else if (Array.isArray(msg)) {
      msg.forEach(item => processLogItem(item, parts, values, style));
    } else if (msg && typeof msg === "object" && "html" in msg) {
      processLogItem(msg, parts, values, style);
    } else {
      parts.push(typeof msg === "string" ? "%c" + msg.toUpperCase() : "%O");
      values.push(typeof msg === "string" ? style : msg);
    }
  });

  console.log(parts.join(" "), ...values);
};

// Main initialisation function for de9 experiment
const init = () => {
  try {
    customLog(TEST_NAME + ' | ' + VARIATION + ' | URL: ' + CURRENT_URL);
    document.body.classList.add(CLASS_BODY);

    waitForElements(
      [{ selector: SELECTORS.controlLogoLink, count: 1 }],
      (results) => {
        console.log(results[0]?.elements);

        const CONTROL_MAIN_NAV_LINK = results[0]?.elements[0];

        if (CONTROL_MAIN_NAV_LINK) {
          customLog('[init] Main Nav Link found');
          CONTROL_MAIN_NAV_LINK.removeAttribute('href');
          CONTROL_MAIN_NAV_LINK.style.cursor = 'initial';
        } else {
          customLog('[init] Main Nav not found');
        }
      }
    );
    
    waitForElements(
      [{ selector: SELECTORS.controlBadgeLink, count: 1 }],
      (results) => {
        console.log(results[0]?.elements);

        const CONTROL_MAIN_NAV_BADGE_LINK = results[0]?.elements[0];

        if (CONTROL_MAIN_NAV_BADGE_LINK) {
          customLog('[init] Main Nav Badge Link found');
          CONTROL_MAIN_NAV_BADGE_LINK.removeAttribute('href');
          CONTROL_MAIN_NAV_BADGE_LINK.style.cursor = 'initial'
        } else {
          customLog('[init] Main Nav Badge Link not found');
        }
      }
    );
    
    waitForElements(
      [{ selector: SELECTORS.controlBurgerMenu, count: 1 }],
      (results) => {
        console.log(results[0]?.elements);

        const CONTROL_MAIN_NAV_BURGER_MENU = results[0]?.elements[0];

        if (CONTROL_MAIN_NAV_BURGER_MENU) {
          customLog('[init] Main Nav Burger Menu found');
          CONTROL_MAIN_NAV_BURGER_MENU.style.visibility = 'hidden';
        } else {
          customLog('[init] Main Nav Burger Menu not found');
        }
      }
    );

  } catch (error) {
    customLog('[init] Error: ' + error.message);
  }
};

init();