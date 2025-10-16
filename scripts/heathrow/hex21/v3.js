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
const MAX_ATTEMPTS = 100;
const CUSTOM_UL_MARKER = 'data-ccx-custom-ul';

const styles = `
  main #main-content > div:last-child ul:not([data-ccx-custom-ul]) {
    display: none !important;
  }
  main #main-content {
    margin-top: 2rem;
  }
`;

// --- Utilities ---
const waitForElement = (selector, interval = WAIT_INTERVAL, maxAttempts = MAX_ATTEMPTS) =>
  new Promise((resolve, reject) => {
    let attempt = 0;
    const check = () => {
      const el = document.querySelector(selector);
      if (el) {
        console.log('[waitForElement] Found element:', selector);
        return resolve(el);
      }
      if (++attempt >= maxAttempts) {
        console.warn('[waitForElement] Timed out:', selector, 'not found after', attempt, 'attempts');
        return reject(new Error('Element not found: ' + selector));
      }
      console.log('[waitForElement] Attempt', attempt, ':', selector, 'not found yet...');
      setTimeout(check, interval);
    };
    check();
  });

const addStyles = (css) => {
  console.log('[addStyles] Starting the addStyles function...');
  if (!css) {
    console.log('[addStyles] No CSS provided, skipping.');
    return;
  }

  if (document.querySelector('.ccx-styles-hex21-v3')) {
    console.log('[addStyles] Custom styles already exist, skipping.');
    return;
  }

  const style = document.createElement('style');
  style.classList.add('ccx-styles-hex21-v3');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
  console.log('[addStyles] Custom styles added to <head>.');
};

const hideOriginalUl = ul => {
  if (!ul) {
    console.warn('[hideOriginalUl] No UL element provided to hide.');
    return;
  }
  ul.style.display = 'none'; 
  ul.setAttribute('aria-hidden', 'true');
  console.log('[hideOriginalUl] Original UL hidden.');
};

const createCustomUl = (originalUl, texts = NEW_PARAGRAPHS) => {
  if (!originalUl) {
    console.warn('[createCustomUl] No original UL provided, cannot create custom UL.');
    return null;
  }

  const existing = document.querySelector('ul[' + CUSTOM_UL_MARKER + ']');
  console.log('---', existing);
  if (existing) {
    console.log('[createCustomUl] Custom UL already exists, returning existing one.');
    return existing;
  }

  console.log('[createCustomUl] Creating new custom UL...');
  const customUl = document.createElement('ul');
  customUl.setAttribute(CUSTOM_UL_MARKER, '1');

  if (originalUl.className) customUl.className = originalUl.className;
  customUl.removeAttribute('style');

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
  console.log('[createCustomUl] Custom UL inserted after original UL.');
  return customUl;
};

const updateHeroTitle = el => {
  if (!el) {
    console.warn('[updateHeroTitle] No title element provided.');
    return;
  }
  const text = el.textContent.trim();
  el.innerHTML = 'Think speed.<br>' + text;
  console.log('[updateHeroTitle] Hero title updated.');
};

// --- Main flow ---
(async () => {
  try {
    console.log('[Main] Waiting for container...');
    const container = await waitForElement(SELECTORS.container);

    console.log('[Main] Waiting for hero title...');
    const titleEl = await waitForElement(SELECTORS.title);

    console.log('[Main] Waiting for original UL...');
    const originalUl = await waitForElement(SELECTORS.ul);

    console.log('[Main] Applying layout changes...');
    container.style.flexDirection = 'row-reverse';
    updateHeroTitle(titleEl);
    document.body.classList.add('ccx-heathrow-hex21-v3');
    console.log('[Main] Layout and body class updated.');
    
    hideOriginalUl(originalUl);
    createCustomUl(originalUl, NEW_PARAGRAPHS);
    addStyles(styles);

    console.log('[Main] Original UL hidden and custom UL inserted. Process complete.');
  } catch (err) {
    console.error('[Main] Initialization error:', err);
  }
})();
