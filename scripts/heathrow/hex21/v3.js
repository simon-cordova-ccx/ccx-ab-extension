// --- Config ---
const SELECTORS = {
  container: 'main > .max-w-limit section:nth-child(1) > div:last-child > div:last-child',
  title: 'main > .max-w-limit section:nth-child(1) > div:last-child > div:last-child h1',
  ul: 'main > .max-w-limit section:nth-child(1) > div:last-child > div:last-child ul'
};

const NEW_PARAGRAPHS = [
  "Travel in comfort with onboard Wi-Fi",
  "Our trains run from 4:34am (Mon-Sun)",
  "No peak time costs"
];

const WAIT_INTERVAL = 300;
const MAX_ATTEMPTS = 30;
const CUSTOM_UL_MARKER = 'data-ccx-custom-ul';

const styles = `
  main > .max-w-limit section:nth-child(1) > div:last-child > div:last-child ul:not([data-ccx-custom-ul]) {
    display: none !important;
  }
`;

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

const addStyles = (css) => {
  console.log('[addStyles] Starting the addStyles function...');

  if (!css) return;

  if (document.querySelector('.ccx-styles-hex21-v3')) {
    console.log('[addStyles] Custom styles already exist.');
    return;
  }

  const style = document.createElement('style');
  style.classList.add('ccx-styles-hex21-v3');
  style.appendChild(document.createTextNode(css));

  document.head.appendChild(style);
  console.log('Custom styles added.');
};

const hideOriginalUl = ul => {
  if (!ul) return;
  ul.style.display = 'none'; // Just hide it visually, no visibility:hidden
  ul.setAttribute('aria-hidden', 'true');
};

const createCustomUl = (originalUl, texts = NEW_PARAGRAPHS) => {
  if (!originalUl) return null;

  const existing = document.querySelector(`ul[${CUSTOM_UL_MARKER}]`);
  if (existing) return existing;

  const customUl = document.createElement('ul');
  customUl.setAttribute(CUSTOM_UL_MARKER, '1');

  // Copy original class list (but skip inline display:none styles)
  if (originalUl.className) customUl.className = originalUl.className;
  customUl.removeAttribute('style'); // ensure no inline styles

  // Clone <li><p> structure with same classes for consistency
  const sampleLi = originalUl.querySelector('li');
  const sampleP = sampleLi ? sampleLi.querySelector('p') : null;
  const liClass = sampleLi ? sampleLi.className : '';
  const pClass = sampleP ? sampleP.className : '';

  texts.forEach(text => {
    const li = document.createElement('li');
    if (liClass) li.className = liClass;
    const p = document.createElement('p');
    if (pClass) p.className = pClass;
    p.textContent = text;
    li.appendChild(p);
    customUl.appendChild(li);
  });

  originalUl.insertAdjacentElement('afterend', customUl);
  return customUl;
};

const updateHeroTitle = el => {
  const text = el.textContent.trim();
  el.innerHTML = `Think speed.<br>${text}`;
};

// --- Main flow ---
(async () => {
  try {
    const container = await waitForElement(SELECTORS.container);
    const titleEl = await waitForElement(SELECTORS.title);
    const originalUl = await waitForElement(SELECTORS.ul);

    // Apply layout + title change
    container.style.flexDirection = 'row-reverse';
    updateHeroTitle(titleEl);
    document.body.classList.add('ccx-heathrow-hex21-v3');

    // Hide the original ul and insert our custom one
    hideOriginalUl(originalUl);
    createCustomUl(originalUl, NEW_PARAGRAPHS);
    addStyles(styles);

    console.log('Original UL hidden and custom UL inserted once.');
  } catch (err) {
    console.warn('Initialization error:', err);
  }
})();
