const LOG_ENABLED = true;
const TEST_NAME = "OZDE3 | Omaze DE3: Cart Signup/Login CTA";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 2";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const styles = `
  .ccx-link {
    height: 56px;
    opacity: 1;
    font-family: Gellix;
    font-weight: 500;
    font-size: 15px !important;
    vertical-align: middle;
    margin: 0 auto;
    width: 100% !important;
    display: flex !important;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
    border: 1px solid #0090B1 !important;
    color: #0090B1 !important;
    border-radius: 9999px !important;
    padding-left: 2rem !important;
    padding-right: 2rem !important;
    padding-top: .75rem !important;
    padding-bottom: .75rem !important;
    text-align: center !important;
    text-decoration: none;
    max-width: 20rem !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
`;

const selectors = {
  ORIGINAL_REGISTER_ELEMENT: 'form#begin-checkout cart-login-widget a[href*=register]',
}

const customLog = (...messages) => {
  if (!LOG_ENABLED) return;

  const style = "background: #000; color: white; padding: 4px 8px; border-radius: 4px;";
  const parts = [];
  const values = [];

  messages.forEach(msg => {
    if (msg instanceof Element) {
      parts.push("%o");
      values.push(msg);
    } else {
      // Wrap each text message with %c to apply the style
      parts.push("%c" + String(msg).toUpperCase());
      values.push(style);
    }
  });

  // Join parts with spaces so the log is more readable
  console.log(parts.join(" "), ...values);
};

const addStyles = (css) => {
  customLog('[addStyles] Starting the addStyles function...');

  if (!css) {
    customLog('[addStyles] No CSS provided');
    return;
  }

  // Check if the style tag already exists
  if (document.querySelector('.ccx-styles-de3-v1')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  // Create a new <style> element
  const style = document.createElement('style');
  customLog('[addStyles] Created new style element:', style);
  style.classList.add('ccx-styles-de3-v1');
  style.appendChild(document.createTextNode(css));
  customLog('[addStyles] Added CSS to style element:', style);

  // Append the style tag to the document head
  document.head.appendChild(style);
  customLog('[addStyles] Custom styles added.');
};

const handleOriginalRegisterElement = (registerElement) => {
  if (!registerElement) return;

  registerElement.classList.add('ccx-link');
  customLog('[handleOriginalRegisterElement] Added ccx-link class');
}

async function init() {
  customLog(TEST_NAME + ' | ' + SOURCE_TYPE + ' | ' + VARIATION);
  customLog('[init] Current URL: ' + CURRENT_URL);
  customLog('[init] Environment: ' + ENVIRONMENT);

  document.body.classList.add('omaze-oz-de-3-v2');
  customLog('[init] Added class omaze-oz-de-3-v2 to body');
  try {
    customLog('[init] Waiting for elements...');
    Promise.all([
      DYO.waitForElementAsync(selectors.ORIGINAL_REGISTER_ELEMENT, 1, 100, 50),
    ]).then(([originalRegisterElement]) => {
      // Proceed once all three elements are available
      console.log('All elements loaded', originalRegisterElement[0]);

      handleOriginalRegisterElement(originalRegisterElement[0]);

      addStyles(styles);

    }).catch(error => {
      console.error('One or more elements failed to load:', error);
    });

  } catch (error) {
    console.error(error.message);
  }
}

init();
