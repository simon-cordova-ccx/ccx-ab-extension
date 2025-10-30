
const LOG_ENABLED = true;
const TEST_NAME = "OZDE-10 | Trust Pilot on the Entries Page";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const SELECTORS = {
  controlTrophyContainer: '#enter-now-material-tab-buttons-design > [id*=nav-latest] > div:first-child > div:last-child'
}

const images = {
  trustPilotMobile: 'https://cdn-eu.dynamicyield.com/api/9880449/images/138f5401d080.png',
  trustPilotDesktop: 'https://cdn-eu.dynamicyield.com/api/9880449/images/14bc53a8f11b.png',
}

const styles = `
  .ccx-container {
    gap: 0 !important;
    display: flex;
    flex-flow: column;
    margin: 0 auto !important;
    justify-content: center;
    align-items: center;
  }
  .ccx-container > div {
    margin: 0 !important;
  }
  .ccx-container img {
    max-width: 273px;
  }

  /* Default: mobile image (for small screens) */
  .ccx-trustpilot-container img {
    content: url('https://cdn-eu.dynamicyield.com/api/9880449/images/138f5401d080.png');
    width: 122px;
    height: 78px;
  }

  /* For desktop (768px and wider) */
  @media (min-width: 768px) {
    .ccx-container {
      flex-flow: row;
      align-items: initial;
    }
    .ccx-trustpilot-container img {
      content: url('https://cdn-eu.dynamicyield.com/api/9880449/images/14bc53a8f11b.png');
      width: auto;
      height: auto;
    }
  }
`;

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

const addStyles = (css) => {
  customLog('[addStyles] Starting the addStyles function...');

  if (!css) return;

  if (!css) {
    customLog('[addStyles] No CSS provided');
    return;
  }

  // Check if the style tag already exists
  if (document.querySelector('.ccx-styles-de10-v1')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  // Create a new <style> element
  const style = document.createElement('style');
  style.classList.add('ccx-styles-de10-v1');
  style.appendChild(document.createTextNode(css));

  // Append the style tag to the document head
  document.head.appendChild(style);
  customLog('Custom styles added.');
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

    document.body.classList.add('ccx-omaze-de10-v1');
    customLog('[init] Added class ccx-omaze-de10-v1 to body');

    waitForElements(
      [
        { selector: SELECTORS.controlTrophyContainer, count: 1 }
      ],
      function (results) {
        console.log(results);
        addStyles(styles);

        const CONTROL_TROPHY_CONTAINER = results[0].elements[0];
        if (!CONTROL_TROPHY_CONTAINER) {
          customLog('[init] Trophy Container not found');
          return;
        } else {
          customLog('[init] Trophy Container found');
        }

        // Create the wrapper
        const wrapper = document.createElement('div');
        wrapper.classList.add('ccx-container');

        // Insert wrapper before the target element
        CONTROL_TROPHY_CONTAINER.parentNode.insertBefore(wrapper, CONTROL_TROPHY_CONTAINER);

        // Move the target element inside
        wrapper.appendChild(CONTROL_TROPHY_CONTAINER);

        // Create the Trustpilot container
        const trustpilotContainer = document.createElement('div');
        trustpilotContainer.classList.add('ccx-trustpilot-container');

        // Create the image element
        const trustpilotImage = document.createElement('img');
        trustpilotImage.src = images.trustPilotDesktop;
        trustpilotImage.alt = 'Trustpilot rating';
        trustpilotImage.loading = 'lazy';

        // Append the image to the new container
        trustpilotContainer.appendChild(trustpilotImage);

        // Insert Trustpilot container after the CONTROL_TROPHY_CONTAINER
        CONTROL_TROPHY_CONTAINER.insertAdjacentElement('afterend', trustpilotContainer);

        customLog('[init] Trustpilot container with image added');
      }
    );

  } catch (error) {
    customLog(error.message);
  }
}

init();
