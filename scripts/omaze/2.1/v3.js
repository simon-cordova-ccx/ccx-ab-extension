(function () {
  const LOG_ENABLED = true;
  const TEST_ID = "2-3";
  const TEST_NAME = " Entries Page Content Hierarchy";
  const VARIATION = "variation-1";
  const CURRENT_URL = window.location.href;

  const SELECTORS = {
    CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS: '#enter-now-material-tab-buttons-design > [id*=nav-latest] [id*=subscription-tab-pane] [data-test="card-variant-subscription"]',
  }

  const STYLES = ``;

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
        msg.forEach(item => {
          if (item instanceof Element) {
            parts.push("%o");
            values.push(item);
          } else if (item && typeof item === "object" && "html" in item) {
            const wrapper = document.createElement("div");
            wrapper.innerHTML = item.html.trim();
            const el = wrapper.firstElementChild;
            parts.push("%o");
            values.push(el);
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

  const addStyles = (cssString = '', variation = 'control') => {
    if (!cssString) return;
    if (!variation) variation = 'control';
    const styleClass = 'ccx-styles-' + TEST_ID.toLowerCase() + '-' + variation.toLowerCase().replace(/\s+/g, '-') + '';

    // if styles for this variation already exist, don't add again
    if (document.querySelector('.' + styleClass)) return;

    const style = document.createElement('style');
    style.classList.add(styleClass);
    style.appendChild(document.createTextNode(cssString));
    document.head.appendChild(style);
  };

  const addBodyClass = (bodyClass) => {
    // If the class for this variation already exists, don't add again
    if (!document.querySelector('.' + bodyClass)) {
      document.body.classList.add(bodyClass); // Add class to the body element
      customLog('[init] Added class ' + bodyClass + ' to body');
    }
  }

  const waitForElements = (configs, callback) => {
    if (!configs || !Array.isArray(configs) || configs.length === 0) return;
    if (!window.DYO || !DYO.waitForElementAsync) return;

    const promises = configs.map(cfg => {
      const { selector, count } = cfg;
      return DYO.waitForElementAsync(selector, count, 100, 150)
        .then(elements => ({ selector, elements }));
    });

    Promise.all(promises)
      .then(results => {
        if (typeof callback === 'function') callback(results);
      })
      .catch(() => { });
  }

  const init = () => {
    try {
      customLog(TEST_ID + ' | ' + VARIATION + ' | ' + TEST_NAME);
      customLog('[init] Current URL: ' + CURRENT_URL);

      waitForElements(
        [
          { selector: SELECTORS.CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS, count: 3 },
        ],
        function (results) {
          const bodyClass = 'ccx-' + TEST_ID.toLowerCase() + '-' + VARIATION.toLowerCase().replace(/\s+/g, '-') + '';

          // Add styles
          addStyles(STYLES, VARIATION);
          addBodyClass(bodyClass);

          const CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS = results[0].elements;
          if (!CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS) return;

          customLog(CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS);

          CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS.forEach(card => {
            const lastChild = card.querySelector('.text-white > div:last-child');
            const lastChildStyles = "background: #FFDD00 !important; padding: 0.25rem 0.75rem !important;";
            lastChild.setAttribute("style", lastChildStyles);

            const lastChildIcon = lastChild.querySelector('svg');
            lastChildIcon.setAttribute("style", "display: none !important;");

            const backgroundColourContainer = lastChild.querySelector('div');
            backgroundColourContainer.setAttribute("style", "justify-content: center !important;");

            const textSpan = lastChild.querySelector('span');
            textSpan.setAttribute("style", "font-size: 13px !important;");
            textSpan.setAttribute("style", "color: #081F28 !important;");
          });
        }
      );

    } catch (error) {
      customLog(error);
    }
  }

  init();
})();