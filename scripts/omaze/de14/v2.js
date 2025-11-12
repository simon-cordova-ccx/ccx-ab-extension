(function () {
  const LOG_ENABLED = true;
  const TEST_ID = "DE14";
  const TEST_NAME = "";
  const VARIATION = "variation-2";
  const CURRENT_URL = window.location.href;
  const SOURCE_TYPE = "NO SOURCE";
  const IS_STAGING_ENV = CURRENT_URL.includes('staging');

  const SELECTORS = {
    CONTROL_FORM_CART_LOGIN_WIDGET: '#begin-checkout > .grid > div:nth-child(2) cart-login-widget',
  }

  const STYLES = `
  #begin-checkout cart-login-widget [issubscriptionpurchase] {
    display: none !important;
  }
  .ccx-info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  .ccx-right-text {
    font-family: Gellix;
    font-weight: 700;
    font-size: 30px;
    line-height: 100%;
    letter-spacing: 0;
    color: #081F28;
  }
  .ccx-button {
    width: 303px;
    max-width: 100%;
    height: 51px;
    gap: 8px;
    opacity: 1;
    background: #FFDD00;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    line-height: 120%;
    text-align: center;
    color: #081F28;
    border-radius: 9999px !important;
    margin: 0 auto;
    margin-bottom: 1rem;
  }

  .ccx-available-payments-text {
    font-family: Gellix;
    font-weight: 500;
    color: #081F28;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0;
    text-align: center;
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

const createCCXContainerElement = (CONTROL_FORM_CART_LOGIN_WIDGET) => {
  // Create the container div
  const container = document.createElement('div');
  container.classList.add('ccx-container');
  CONTROL_FORM_CART_LOGIN_WIDGET.insertAdjacentElement('afterbegin', container);
  console.log('[CCX] Created .ccx-container and inserted at top.');

  // Create the info element with two spans
  const infoElement = document.createElement('div');
  infoElement.classList.add('ccx-info');

  const leftSpan = document.createElement('span');
  leftSpan.classList.add('ccx-left-text');
  leftSpan.textContent = 'Bestellsumme:';

  const rightSpan = document.createElement('span');
  rightSpan.classList.add('ccx-right-text');

  const totalPriceElement = CONTROL_FORM_CART_LOGIN_WIDGET.querySelector('.total-price strong.text-3xl');
  if (totalPriceElement) {
    rightSpan.textContent = totalPriceElement.textContent.trim();
    console.log('[CCX] Found total price element:', totalPriceElement.textContent.trim());
  } else {
    rightSpan.textContent = '—';
    console.warn('[CCX] Total price element not found.');
  }

  infoElement.appendChild(leftSpan);
  infoElement.appendChild(rightSpan);
  container.appendChild(infoElement);
  console.log('[CCX] Added .ccx-info with left and right spans.');

  // Create the button
  const button = document.createElement('a');
  button.classList.add('ccx-button');
  button.href = 'https://omaze.de/account/register?return_to=/cart';
  button.textContent = 'Weiter';
  container.appendChild(button);
  console.log('[CCX] Added "Weiter" button.');

  const firstElement = CONTROL_FORM_CART_LOGIN_WIDGET.querySelector('[issubscriptionpurchase] > div:last-of-type > p');
  const secondElement = CONTROL_FORM_CART_LOGIN_WIDGET.querySelector('#begin-checkout > .grid > div:nth-child(2) cart-login-widget [issubscriptionpurchase] > div:last-of-type > div:last-of-type');

  if (firstElement) {
    container.appendChild(firstElement);
    firstElement.classList.add('ccx-available-payments-text')
    console.log('[CCX] Appended first element (<p>) to the container.');
  } else {
    console.warn('[CCX] First element (<p>) not found.');
  }

  if (secondElement) {
    container.appendChild(secondElement);
    console.log('[CCX] Appended second element (<div>) to the container.');
  } else {
    console.warn('[CCX] Second element (<div>) not found.');
  }

  console.log('[CCX] Container build complete.');
};


  const init = () => {
    try {
      customLog(TEST_ID + ' | ' + VARIATION + ' | ' + TEST_NAME);
      customLog('[init] Current URL: ' + CURRENT_URL);

      waitForElements(
        [
          { selector: SELECTORS.CONTROL_FORM_CART_LOGIN_WIDGET, count: 1 },
        ],
        function (results) {
          const bodyClass = 'ccx-' + TEST_ID.toLowerCase() + '-' + VARIATION.toLowerCase().replace(/\s+/g, '-') + '';
          console.log(bodyClass);
          // if the class for this variation already exists, don't add again
          if (document.querySelector('.' + bodyClass)) return;
          document.body.classList.add(bodyClass); // Add class to the body element
          customLog('[init] Added class ' + bodyClass + ' to body');

          // Add styles
          addStyles(STYLES, VARIATION);
          addBodyClass(bodyClass);

          const CONTROL_FORM_CART_LOGIN_WIDGET = results[0].elements[0];
          if (!CONTROL_FORM_CART_LOGIN_WIDGET) return;

          customLog(CONTROL_FORM_CART_LOGIN_WIDGET);

          createCCXContainerElement(CONTROL_FORM_CART_LOGIN_WIDGET);
        }
      );

    } catch (error) {
      customLog(error);
    }
  }

  init();
})();