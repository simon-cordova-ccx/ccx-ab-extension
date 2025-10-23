(function () {
  console.log('[CCX] Script started (SPA-aware interval watcher)');

  // --- Config ---
  const SELECTORS = {
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

  const PREFIX_TEXT = 'Think Speed.'; // capital S as required

  // --- Utility functions ---
  const addStyles = (css) => {
    if (!css) return;
    if (document.querySelector('.ccx-styles-hex21-v3')) return;
    const style = document.createElement('style');
    style.classList.add('ccx-styles-hex21-v3');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    console.log('[addStyles] Styles injected');
  };

  const hideOriginalUl = (ul) => {
    if (!ul) return;
    ul.setAttribute('aria-hidden', 'true');
    console.log('[hideOriginalUl] UL hidden');
  };

  const createCustomUl = (originalUl, texts = NEW_PARAGRAPHS) => {
    if (!originalUl) return null;
    if (document.querySelector('[data-ccx-custom-ul]')) { // ✅ fixed selector
      console.log('[createCustomUl] Custom UL already exists');
      return;
    }

    console.log('[createCustomUl] Creating custom UL...');
    const customUl = document.createElement('ul');
    customUl.setAttribute('data-ccx-custom-ul', '1');
    customUl.className = originalUl.className || '';

    const sampleLi = originalUl.querySelector('li');
    const sampleP = sampleLi ? sampleLi.querySelector('p') : null;
    const liClass = sampleLi ? sampleLi.className : '';
    const pClass = sampleP ? sampleP.className : '';

    texts.forEach((text) => {
      const li = document.createElement('li');
      if (liClass) li.className = liClass;
      const p = document.createElement('p');
      if (pClass) p.className = pClass;
      p.textContent = text;
      li.appendChild(p);
      customUl.appendChild(li);
    });

    originalUl.insertAdjacentElement('afterend', customUl);
    console.log('[createCustomUl] Custom UL created');
    return customUl;
  };

  // --- Title Observer ---
  const observeTitle = () => {
    const targetSelector = SELECTORS.title;
    console.log('[Observer] Starting watcher for:', targetSelector);

    const handleTitle = () => {
      console.log('[handleTitle] Checking for title element...');
      const el = document.querySelector(targetSelector);
      if (!el) return console.log('[handleTitle] Title element NOT found.');

      const rawText = el.textContent.trim();
      if (!rawText) return console.log('[handleTitle] Title element empty, skipping.');

      const hasPrefix = el.textContent.startsWith(PREFIX_TEXT);
      if (!hasPrefix) {
        console.log('[handleTitle] Adding prefix...');
        const prefixNode = document.createTextNode(PREFIX_TEXT);
        const brNode = document.createElement('br');
        el.insertBefore(brNode, el.firstChild);
        el.insertBefore(prefixNode, el.firstChild);
        console.log('[handleTitle] Prefix inserted.');
      } else {
        console.log('[handleTitle] Prefix already exists, skipping.');
      }

      // --- Also ensure UL is handled when title appears ---
      const heroUl = document.querySelector(SELECTORS.ul);
      const customUl = document.querySelector('[data-ccx-custom-ul]');
      if (heroUl && !customUl) {
        console.log('[handleTitle] Found hero UL, creating custom UL...');
        hideOriginalUl(heroUl);
        createCustomUl(heroUl, NEW_PARAGRAPHS);
      } else if (!heroUl) {
        console.log('[handleTitle] No hero UL found.');
      } else if (customUl) {
        console.log('[handleTitle] Custom UL already exists.');
      }
    };

    // Initial check
    handleTitle();

    // Watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      if (mutations.some(m => m.addedNodes.length || m.removedNodes.length)) {
        handleTitle();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    console.log('[Observer] Watching document.body for title changes...');
  };

  // --- Main flow ---
  const runMainFlow = () => {
    console.log('[Main] (Re)initializing...');
    try {
      document.body.classList.add('ccx-heathrow-hex21-v2');
      console.log('[Main] Body class applied');

      addStyles(styles);

      // UL setup
      const heroUl = document.querySelector(SELECTORS.ul);
      if (heroUl) {
        hideOriginalUl(heroUl);
        createCustomUl(heroUl, NEW_PARAGRAPHS);
      } else {
        console.warn('[Main] UL not found initially');
      }

      observeTitle();
      console.log('[Main] Main flow fully applied');
    } catch (err) {
      console.warn('[Main] Error in main flow:', err);
    }
  };

  // --- SPA Page Change Listener ---
  const observePageChanges = () => {
    let lastUrl = location.href;
    console.log('[SPA] Starting page change observer...');
    const checkUrl = () => {
      const currentUrl = location.pathname;
      if (currentUrl !== lastUrl) {
        console.log('[SPA] URL changed:', currentUrl);
        lastUrl = currentUrl;

        // Only reapply when we're on the homepage
        if (currentUrl === '/') {
          console.log('[SPA] On homepage — reapplying main flow...');
          runMainFlow();
        } else {
          console.log('[SPA] Not on homepage — no reapply needed.');
        }
      }
    };

    // Poll for URL changes (safe, lightweight for SPAs)
    setInterval(checkUrl, 1000);
    console.log('[SPA] URL watcher active.');
  };

  // --- Init ---
  (() => {
    console.log('[Init] Starting CCX Heathrow Hex21 v2...');
    runMainFlow();
    observePageChanges();
  })();
})();
