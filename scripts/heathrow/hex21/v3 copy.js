(function () {
  console.log('[CCX v3] Script started (auto-reapply watcher)');

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
          console.warn('[waitForElement] Timed out:', selector, 'after', attempt, 'attempts');
          return reject(new Error('Element not found: ' + selector));
        }
        setTimeout(check, interval);
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
    console.log('[addStyles] Styles added');
  };

  const hideOriginalUl = (ul) => {
    if (!ul) return;
    ul.style.display = 'none';
    ul.setAttribute('aria-hidden', 'true');
    console.log('[hideOriginalUl] Original UL hidden');
  };

  const createCustomUl = (originalUl, texts = NEW_PARAGRAPHS) => {
    if (!originalUl) return null;
    if (document.querySelector('ul[' + CUSTOM_UL_MARKER + ']')) {
      console.log('[createCustomUl] Custom UL already exists');
      return;
    }

    console.log('[createCustomUl] Creating custom UL...');
    const customUl = document.createElement('ul');
    customUl.setAttribute(CUSTOM_UL_MARKER, '1');
    if (originalUl.className) customUl.className = originalUl.className;

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
    console.log('[createCustomUl] Custom UL created successfully.');
    return customUl;
  };

  const updateHeroTitle = (el) => {
    if (!el) {
      console.warn('[updateHeroTitle] Title element not found');
      return;
    }
    const text = el.textContent.trim();
    if (text.startsWith('Think speed.')) {
      console.log('[updateHeroTitle] Prefix already applied');
      return;
    }
    el.innerHTML = 'Think speed.<br>' + text;
    console.log('[updateHeroTitle] Hero title updated');
  };

  // --- Core logic (runs on init and reapply) ---
  const applyChanges = () => {
    console.log('[applyChanges] Running reapply logic...');
    const container = document.querySelector(SELECTORS.container);
    const titleEl = document.querySelector(SELECTORS.title);
    const originalUl = document.querySelector(SELECTORS.ul);

    if (!container || !titleEl || !originalUl) {
      console.log('[applyChanges] One or more key elements missing, skipping.');
      return;
    }

    container.style.flexDirection = 'row-reverse';
    updateHeroTitle(titleEl);
    hideOriginalUl(originalUl);
    createCustomUl(originalUl, NEW_PARAGRAPHS);
    document.body.classList.add('ccx-heathrow-hex21-v3');
    addStyles(styles);
    console.log('[applyChanges] Layout, title, and UL updates applied.');
  };

  // --- Observer (auto reapplies on DOM changes) ---
  const observeMutations = () => {
    console.log('[Observer] Starting mutation observer...');
    const observer = new MutationObserver((mutations) => {
      const added = mutations.some(m => m.addedNodes.length > 0);
      const removed = mutations.some(m => m.removedNodes.length > 0);
      if (added || removed) {
        console.log('[Observer] DOM mutation detected, reapplying changes...');
        applyChanges();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    console.log('[Observer] Now observing document.body for re-render changes');
  };

  // --- Main flow ---
  (async () => {
    try {
      console.log('[Main] Waiting for container, title, and UL...');
      await waitForElement(SELECTORS.container);
      await waitForElement(SELECTORS.title);
      await waitForElement(SELECTORS.ul);

      console.log('[Main] Initial elements found, applying changes...');
      applyChanges();

      // Start observing DOM to auto-reapply
      observeMutations();
      console.log('[Main] Mutation observer initialized.');

    } catch (err) {
      console.error('[Main] Initialization error:', err);
    }
  })();
})();
