// --- Config ---
const SELECTORS = {
  container: 'main #main-content'
};

const BODY_CLASS = 'ccx-heathrow-hex21-v1';
const WAIT_INTERVAL = 300;
const MAX_ATTEMPTS = 30;

// --- Utilities ---
const waitForElement = (selector, interval = WAIT_INTERVAL, maxAttempts = MAX_ATTEMPTS) =>
  new Promise((resolve, reject) => {
    let attempt = 0;
    const check = () => {
      const el = document.querySelector(selector);
      if (el) return resolve(el);
      if (++attempt >= maxAttempts) return reject(new Error(`Element not found: ${selector}`));
      setTimeout(check, interval);
    };
    check();
  });

// --- Main flow ---
(async () => {
  try {
    const container = await waitForElement(SELECTORS.container);

    // Apply row-reverse layout
    container.style.flexDirection = 'row-reverse';
    container.style.marginTop = '2rem';

    // Add body class
    document.body.classList.add(BODY_CLASS);

    console.log('Container found, row-reverse applied, and body class added.');
  } catch (err) {
    console.warn('Initialization error:', err);
  }
})();
