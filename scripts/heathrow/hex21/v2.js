(function() {

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

const styles = `
  main #main-content > div:last-child ul:not([data-ccx-custom-ul]) {
    display: none !important;
  }
`;

const CUSTOM_UL_MARKER = 'data-ccx-custom-ul';
const WAIT_INTERVAL = 300;
const MAX_ATTEMPTS = 20;

// --- Utilities ---
const waitForElements = (selectors, interval = WAIT_INTERVAL, maxAttempts = MAX_ATTEMPTS) =>
  new Promise((resolve, reject) => {
    const check = (attempt = 0) => {
      const elements = selectors.map(sel => document.querySelector(sel));
      const allFound = elements.every(el => el);
      if (allFound) return resolve(elements);
      if (attempt >= maxAttempts) return reject(`Elements not found: ${selectors.join(', ')}`);
      setTimeout(() => check(attempt + 1), interval + 0);
    };
    check();
  });

const addStyles = (css) => {
  if (!css) return;
  if (document.querySelector('.ccx-styles-hex21-v3')) return;
  const style = document.createElement('style');
  style.classList.add('ccx-styles-hex21-v3');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
};

const hideOriginalUl = ul => {
  if (!ul) return;
  ul.setAttribute('aria-hidden', 'true');
};

const createCustomUl = (originalUl, texts = NEW_PARAGRAPHS) => {
  if (!originalUl) return null;

  const existing = !!document.querySelector(`ul[${CUSTOM_UL_MARKER}]`);
  if (existing) return;

  const customUl = document.createElement('ul');
  customUl.setAttribute(CUSTOM_UL_MARKER, '1');

  // Copy original class list
  if (originalUl.className) customUl.className = originalUl.className;
  customUl.removeAttribute('style'); // remove any inline styles

  // Copy structure and classes from sample li/p
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

const updateHeroTitle = titleEl => {
  const text = titleEl.textContent.trim();
  titleEl.innerHTML = `Think speed.<br>${text}`;
};

const applyBodyClass = className => document.body.classList.add(className);

// --- Main flow ---
(async () => {
  try {
    applyBodyClass('ccx-heathrow-hex21-v2');

    const [CONTROL_HERO_TITLE, CONTROL_HERO_LIST] = await waitForElements([
      SELECTORS.title,
      SELECTORS.ul
    ]);

    // Hide original UL, create custom
    hideOriginalUl(CONTROL_HERO_LIST);
    createCustomUl(CONTROL_HERO_LIST, NEW_PARAGRAPHS);
    addStyles(styles);

    // Update title and body class
    updateHeroTitle(CONTROL_HERO_TITLE);

    console.log('Custom UL inserted and original hidden. Title updated.');
  } catch (err) {
    console.warn(err);
  }
})();

})();

