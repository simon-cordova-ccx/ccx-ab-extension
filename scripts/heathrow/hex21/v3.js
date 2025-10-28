(function () {
  console.log("[CCX] Script started (SPA route-aware)");

  // --- Config ---
  const BODY_CLASS = "ccx-heathrow-hex21-v3";

  const SELECTORS = {
    container: "main > .max-w-limit section:nth-child(1) > div:last-child > div:last-child",
    title: "main > .max-w-limit section:nth-child(1) > div:last-child > div:last-child h1",
    ul: "main > .max-w-limit section:nth-child(1) > div:last-child > div:last-child ul",
  };

  const NEW_PARAGRAPHS = [
    "Travel in comfort with onboard Wi-Fi",
    "Our trains run from 4:34am (Mon-Sun)",
    "No peak time costs",
  ];

  const WAIT_INTERVAL = 300;
  const MAX_ATTEMPTS = 100;
  const CUSTOM_UL_MARKER = "data-ccx-custom-ul";

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
        console.log(`[waitForElement] Attempt ${attempt + 1} for selector:`, selector);
        const el = document.querySelector(selector);
        if (el) {
          console.log("[waitForElement] Found element:", selector, el);
          return resolve(el);
        }
        if (++attempt >= maxAttempts) {
          console.warn(
            "[waitForElement] Timed out:",
            selector,
            "not found after",
            attempt,
            "attempts"
          );
          return reject(new Error("Element not found: " + selector));
        }
        setTimeout(check, interval);
      };
      check();
    });

  const addStyles = (css) => {
    console.log("[addStyles] Checking for style injection...");
    if (!css) {
      console.warn("[addStyles] No CSS provided, skipping.");
      return;
    }
    if (document.querySelector(".ccx-styles-hex21-v3")) {
      console.log("[addStyles] Styles already present, skipping re-injection.");
      return;
    }
    const style = document.createElement("style");
    style.classList.add("ccx-styles-hex21-v3");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    console.log("[addStyles] Custom styles added to <head>.");
  };

  const hideOriginalUl = (ul) => {
    console.log("[hideOriginalUl] Attempting to hide UL:", ul);
    if (!ul) {
      console.warn("[hideOriginalUl] No UL found to hide.");
      return;
    }
    ul.style.display = "none";
    ul.setAttribute("aria-hidden", "true");
    console.log("[hideOriginalUl] Original UL hidden.");
  };

  const createCustomUl = (originalUl, texts = NEW_PARAGRAPHS) => {
    console.log("[createCustomUl] Attempting to create custom UL...");
    if (!originalUl) {
      console.warn("[createCustomUl] No original UL provided, aborting.");
      return null;
    }

    // const existing = document.querySelector(`ul[${CUSTOM_UL_MARKER}]`);
    const existing = document.querySelector(`ul[data-ccx-custom-ul]`);
    if (existing) {
      console.log("[createCustomUl] Custom UL already exists:", existing);
      return existing;
    }

    const customUl = document.createElement("ul");
    customUl.setAttribute('data-ccx-custom-ul', "1");
    if (originalUl.className) customUl.className = originalUl.className;

    const sampleLi = originalUl.querySelector("li");
    const sampleP = sampleLi ? sampleLi.querySelector("p") : null;
    const liClass = sampleLi ? sampleLi.className : "";
    const pClass = sampleP ? sampleP.className : "";

    console.log("[createCustomUl] Sample LI class:", liClass, "Sample P class:", pClass);

    texts.forEach((text, i) => {
      console.log(`[createCustomUl] Adding LI #${i + 1}:`, text);
      const li = document.createElement("li");
      if (liClass) li.className = liClass;
      const p = document.createElement("p");
      if (pClass) p.className = pClass;
      p.textContent = text;
      li.appendChild(p);
      customUl.appendChild(li);
    });

    originalUl.insertAdjacentElement("afterend", customUl);
    console.log("[createCustomUl] Custom UL inserted after original UL:", customUl);
    return customUl;
  };

  const updateHeroTitle = (el) => {
    console.log("[updateHeroTitle] Attempting to update hero title:", el);
    if (!el) {
      console.warn("[updateHeroTitle] No title element found, skipping.");
      return;
    }
    const text = el.textContent.trim();
    console.log("[updateHeroTitle] Current title text:", text);
    if (text.startsWith("Think speed.")) {
      console.log("[updateHeroTitle] Prefix already exists, skipping update.");
      return;
    }
    el.innerHTML = "Think speed.<br>" + text;
    console.log("[updateHeroTitle] Hero title updated.");
  };

  // --- Main page logic ---
  async function applyPageChanges() {
    console.log("[Main] Starting page logic...");
    try {
      // Wait for elements
      const container = await waitForElement(SELECTORS.container);
      const titleEl = await waitForElement(SELECTORS.title);
      const originalUl = await waitForElement(SELECTORS.ul);

      console.log("[Main] Elements ready:", { container, titleEl, originalUl });

      // Apply styles and layout
      addStyles(styles);
      document.body.classList.add(BODY_CLASS);
      console.log("[Main] BODY_CLASS added:", BODY_CLASS);

      container.style.display = "flex";
      container.style.flexDirection = "row-reverse";
      container.style.marginTop = "2rem";
      console.log("[Main] Container styles applied.");

      const isHomePage = window.location.href === 'https://www.heathrowexpress.com/';

      if (isHomePage) {
        updateHeroTitle(titleEl);
        hideOriginalUl(originalUl);
        createCustomUl(originalUl, NEW_PARAGRAPHS);
        const ccxList = document.querySelector('ul[data-ccx-custom-ul]');
        if (ccxList) {
          ccxList.style.display = 'block';
        }
      } else {
        const ccxList = document.querySelector('ul[data-ccx-custom-ul]');
        if (ccxList) {
          ccxList.style.display = 'none';
        }
      }

      console.log("[Main] Page transformation complete!");
    } catch (err) {
      console.error("[Main] Initialization error:", err);
    }
  }

  // --- SPA route detection ---
  function patchHistoryMethod(method) {
    console.log(`[Router] Patching history method: ${method}`);
    const original = history[method];
    history[method] = function (...args) {
      console.log(`[Router] ${method} called with args:`, args);
      const result = original.apply(this, args);
      window.dispatchEvent(new Event("locationchange"));
      return result;
    };
  }

  patchHistoryMethod("pushState");
  patchHistoryMethod("replaceState");

  window.addEventListener("popstate", () => {
    console.log("[Router] popstate event fired");
    window.dispatchEvent(new Event("locationchange"));
  });

  window.addEventListener("locationchange", () => {
    console.log("[Router] Detected location change:", window.location.pathname);
    setTimeout(() => applyPageChanges(), 300);
  });

  // --- Initial run ---
  console.log("[Init] Running initial applyPageChanges()");
  applyPageChanges();
})();
