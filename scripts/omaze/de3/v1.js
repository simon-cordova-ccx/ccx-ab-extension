const LOG_ENABLED = true;
const TEST_NAME = "OZDE3 | Omaze DE3: Cart Signup/Login CTA";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const registerURL = 'https://omaze.de/account/register?return_to=/cart';
const loginURL = 'https://omaze.de/account/login?return_to=/cart';

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
  ORIGINAL_LOGIN_ELEMENT: 'form#begin-checkout cart-login-widget a[href*=login]',
  ORIGINAL_REGISTER_ELEMENT: 'form#begin-checkout cart-login-widget a[href*=register]',
  ORIGINAL_TEXT_ELEMENT: 'form#begin-checkout cart-login-widget .flex.flex-col div[class*=text-]',
  ORIGINAL_PAYPAL_ELEMENT: 'form#begin-checkout cart-login-widget > div > div.flex.flex-col.gap-6 > button',
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

const handleOriginalLoginElement = (loginElement) => {
  if (!loginElement) return;

  customLog('[handleOriginalLoginElement] Changing text content...');
  loginElement.textContent = 'Benutzerkonto erstellen';
  customLog('[handleOriginalLoginElement] Changed text content:', loginElement);

  loginElement.setAttribute('href', registerURL);
}

const handleOriginalRegisterElement = (registerElement) => {
  if (!registerElement) return;

  customLog('[handleOriginalRegisterElement] Changing text content...');
  registerElement.textContent = 'In dein Konto einloggen';
  customLog('[handleOriginalRegisterElement] Changed text content:', registerElement);

  customLog('[handleOriginalRegisterElement] Changing href attribute...');
  registerElement.setAttribute('href', loginURL);
  customLog('[handleOriginalRegisterElement] Changed href attribute:', registerElement);

  registerElement.classList.add('ccx-link');
  customLog('[handleOriginalRegisterElement] Added ccx-link class');
}

const handleOriginalTextElement = (textElement) => {
  if (!textElement) return;
  customLog('[handleOriginalTextElement] Changing text content...');
  textElement.textContent = 'Du hast schon ein Konto?';
  customLog('[handleOriginalTextElement] Changed text content:', textElement);
}

const handleOriginalPayPalElement = (payPalElement) => {
  if (!payPalElement) return;
  customLog('[handleOriginalPayPalElement] Changing text content...');

  // Get the image element
  const imgElement = payPalElement.querySelector('img');

  // Remove the text content from the element
  payPalElement.innerHTML = '';

  // Add the image element back to the element
  payPalElement.appendChild(imgElement);

  // Create a new text node with the desired text
  const textNode = document.createTextNode(' Mit PayPal registrieren');

  // Add the text node to the element
  payPalElement.appendChild(textNode);

  customLog('[handleOriginalPayPalElement] Changed text content:', payPalElement);
}

async function init() {
  customLog(TEST_NAME + ' | ' + SOURCE_TYPE + ' | ' + VARIATION);
  customLog('[init] Current URL: ' + CURRENT_URL);
  customLog('[init] Environment: ' + ENVIRONMENT);

  document.body.classList.add('omaze-oz-de-3-v1');
  customLog('[init] Added class omaze-oz-de-3-v1 to body');
  try {
    customLog('[init] Waiting for elements...');
    Promise.all([
      DYO.waitForElementAsync(selectors.ORIGINAL_LOGIN_ELEMENT, 1, 100, 50),
      DYO.waitForElementAsync(selectors.ORIGINAL_REGISTER_ELEMENT, 1, 100, 50),
      DYO.waitForElementAsync(selectors.ORIGINAL_TEXT_ELEMENT, 1, 100, 50),
      DYO.waitForElementAsync(selectors.ORIGINAL_PAYPAL_ELEMENT, 1, 100, 50)
    ]).then(([originalLoginElement, originalRegisterElement, originalTextElement, originalPayPalElement]) => {
      // Proceed once all three elements are available
      console.log('All elements loaded', originalLoginElement[0], originalRegisterElement[0], originalTextElement[0], originalPayPalElement[0]);

      handleOriginalLoginElement(originalLoginElement[0]);

      handleOriginalRegisterElement(originalRegisterElement[0]);

      handleOriginalTextElement(originalTextElement[0]);

      handleOriginalPayPalElement(originalPayPalElement[0]);

      addStyles(styles);

    }).catch(error => {
      console.error('One or more elements failed to load:', error);
    });

  } catch (error) {
    console.error(error.message);
  }
}

init();
