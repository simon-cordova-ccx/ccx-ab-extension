const LOG_ENABLED = false;
const TEST_NAME = "OZ29 | OZ29 - Subs Cancellation Friction on Cancel Click";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "CONTROL";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

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
            // Single DOM element
            parts.push("%o");
            values.push(msg);

        } else if (Array.isArray(msg)) {
            // Handle arrays
            msg.forEach(item => {
                if (item instanceof Element) {
                    parts.push("%o");
                    values.push(item);
                } else if (item && typeof item === "object" && "html" in item) {
                    // Object with HTML string
                    const wrapper = document.createElement("div");
                    wrapper.innerHTML = item.html.trim();
                    const el = wrapper.firstElementChild;

                    parts.push("%o");
                    values.push(el);

                    // Log other props (e.g., entriesAmount)
                    const { html, ...rest } = item;
                    if (Object.keys(rest).length > 0) {
                        parts.push("%O");
                        values.push(rest);
                    }
                } else {
                    parts.push("%O");
                    values.push(item);
                }
            });

        } else if (msg && typeof msg === "object" && "html" in msg) {
            // Single object with HTML string
            const wrapper = document.createElement("div");
            wrapper.innerHTML = msg.html.trim();
            const el = wrapper.firstElementChild;

            parts.push("%o");
            values.push(el);

            const { html, ...rest } = msg;
            if (Object.keys(rest).length > 0) {
                parts.push("%O");
                values.push(rest);
            }

        } else {
            // Normal text/objects
            if (typeof msg === "string") {
                parts.push("%c" + msg.toUpperCase());
                values.push(style);
            } else {
                parts.push("%O");
                values.push(msg);
            }
        }
    });

    console.log(parts.join(" "), ...values);
};

const waitForElements = (configs, callback) => {
  customLog('[waitForElements] Starting to wait for elements...');

  if (!configs || !Array.isArray(configs) || configs.length === 0) {
    customLog('[waitForElements] No configs provided.');
    return;
  }

  if (!window.DYO || !DYO.waitForElementAsync) {
    customLog('[waitForElements] DYO.waitForElementAsync is not available.');
    return;
  }

  // Create promises for each config
  const promises = configs.map(cfg => {
    const { selector, count } = cfg;
    return DYO.waitForElementAsync(selector, count, 100, 150)
      .then(elements => {
        customLog('[' + 'waitForElements' + '] Found ' + elements.length + ' for ' + selector);
        return { selector, elements };
      });
  });

  Promise.all(promises)
    .then(results => {
      // customLog('[waitForElements] All elements found:', results);
      if (typeof callback === 'function') callback(results);
    })
    .catch(error => {
      customLog('[waitForElements] Some selectors not found within timeout.', error);
    });
}

const init = () => {
    try {
        customLog(TEST_NAME + ' | ' + VARIATION);
        customLog('[init] Current URL: ' + CURRENT_URL);

        document.body.classList.add('ccx-omaze-oz29-control');
        customLog('[init] Added class ccx-omaze-oz29-control to body');

        waitForElements(
            [
                { selector: '[onclick*=cancelSubscription]', count: 1 },
            ],
            function (results) {
                customLog(results);
                const CONTROL_CANCEL_SUBSCRIPTION_LINK = results[0]?.elements[0];

                if (CONTROL_CANCEL_SUBSCRIPTION_LINK) {
                    CONTROL_CANCEL_SUBSCRIPTION_LINK.addEventListener('click', (e) => {
                        try {
                            const eventName = 'oz29_control_cancel_subscription_click';
                            DY.API('event', {
                                name: eventName,
                            });
                            customLog('[oz29] DY event sent: ' + eventName);
                        } catch (err) {
                            customLog('[oz29] DY tracking failed', err);
                        }
                    });
                }
            }
        );

    } catch (error) {
        customLog(error.message);
    }
}

init();
