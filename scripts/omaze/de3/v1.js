const LOG_ENABLED = true;

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

const registerURL = 'https://omaze.de/account/register?return_to=/cart';
const loginURL = 'https://omaze.de/account/login?return_to=/cart';

addStyles(styles);

let originalLoginLinkHref;
let originalRegisterLinkHref;

const originalLoginLinkElement = document.querySelector('form#begin-checkout cart-login-widget a[href*=login]');
customLog('[originalLoginLinkElement] Found original login link element:', originalLoginLinkElement);

const originalRegisterLinkElement = document.querySelector('form#begin-checkout cart-login-widget a[href*=register]');
customLog('[originalRegisterLinkElement] Found original register link element:', originalRegisterLinkElement);

const originalTextElement = document.querySelector('form#begin-checkout cart-login-widget .flex.flex-col div[class*=text-]');
customLog('[originalTextElement] Found original text element:', originalTextElement);

if (originalLoginLinkElement) {
    // originalLoginLinkHref = originalLoginLinkElement.getAttribute('href');
    // customLog('[originalLoginLinkHref] Original login link href:', originalLoginLinkHref);

    customLog('[originalLoginLinkElement] Changing text content...');
    originalLoginLinkElement.textContent = 'Benutzerkonto erstellen';
    customLog('[originalLoginLinkElement] Changed text content:', originalLoginLinkElement);

    originalLoginLinkElement.setAttribute('href', registerURL);
}

if (originalTextElement) {
    customLog('[originalTextElement] Changing text content...');
    originalTextElement.textContent = 'Du hast schon ein Konto?';
    customLog('[originalTextElement] Changed text content:', originalTextElement);
}



if (originalRegisterLinkElement) {

    originalRegisterLinkHref = originalRegisterLinkElement.getAttribute('href');
    customLog('[originalLoginLinkHref] Original login link href:', originalLoginLinkHref);

    customLog('[originalRegisterLinkElement] Changing text content...');
    originalRegisterLinkElement.textContent = 'In dein Konto einloggen';
    customLog('[originalRegisterLinkElement] Changed text content:', originalRegisterLinkElement);

    customLog('[originalRegisterLinkElement] Changing href attribute...');
    originalRegisterLinkElement.setAttribute('href', loginURL);
    customLog('[originalRegisterLinkElement] Changed href attribute:', originalRegisterLinkElement);
    
    originalRegisterLinkElement.classList.add('ccx-link');
    customLog('[originalRegisterLinkElement] Added ccx-link class');
}
