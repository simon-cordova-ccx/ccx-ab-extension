(function () {
  console.log("[CCX] Script started (SPA route-aware)");

  // --- Config ---
  const BODY_CLASS = "ccx-heathrow-hex21-v2";
  const SELECTORS = {
    title: "main > .max-w-limit section:nth-child(1) > div:last-child > div:last-child h1",
    ul: "main > .max-w-limit section:nth-child(1) > div:last-child > div:last-child ul",
  };

  const NEW_PARAGRAPHS = [
    "Travel in comfort with onboard Wi-Fi",
    "Our trains run from 4:34am (Mon-Sun)",
    "No peak time costs",
  ];

  const PREFIX_TEXT = "Think Speed."; // capital S as required

  const styles = `
    main #main-content > div:last-child ul:not([data-ccx-custom-ul]) {
      display: none !important;
    }
  `;

  // --- Utility functions ---
  const waitForElement = (selector, interval = 300, maxAttempts = 30) =>
    new Promise((resolve, reject) => {
      let attempt = 0;
      const check = () => {
        const el = document.querySelector(selector);
        if (el) return resolve(el);
        if (++attempt >= maxAttempts)
          return reject(new Error(`Element not found: ${selector}`));
        setTimeout(check, interval);
      };
      check();
    });

  const addStyles = (css) => {
    if (!css) return;
    if (document.querySelector(".ccx-styles-hex21-v3")) return;
    const style = document.createElement("style");
    style.classList.add("ccx-styles-hex21-v3");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    console.log("[addStyles] Styles injected");
  };

  const hideOriginalUl = (ul) => {
    if (!ul) return;
    ul.setAttribute("aria-hidden", "true");
    console.log("[hideOriginalUl] UL hidden");
  };

  const createCustomUl = (originalUl, texts = NEW_PARAGRAPHS) => {
    if (!originalUl) return null;
    if (document.querySelector("[data-ccx-custom-ul]")) {
      console.log("[createCustomUl] Custom UL already exists");
      return;
    }

    const customUl = document.createElement("ul");
    customUl.setAttribute("data-ccx-custom-ul", "1");
    customUl.className = originalUl.className || "";

    const sampleLi = originalUl.querySelector("li");
    const sampleP = sampleLi ? sampleLi.querySelector("p") : null;
    const liClass = sampleLi ? sampleLi.className : "";
    const pClass = sampleP ? sampleP.className : "";

    texts.forEach((text) => {
      const li = document.createElement("li");
      if (liClass) li.className = liClass;
      const p = document.createElement("p");
      if (pClass) p.className = pClass;
      p.textContent = text;
      li.appendChild(p);
      customUl.appendChild(li);
    });

    originalUl.insertAdjacentElement("afterend", customUl);
    console.log("[createCustomUl] Custom UL created");
    return customUl;
  };

  const handleTitle = (titleEl) => {
    if (!titleEl) return;
    const rawText = titleEl.textContent.trim();
    if (!rawText) return;

    const hasPrefix = rawText.startsWith(PREFIX_TEXT);
    if (!hasPrefix) {
      console.log("[handleTitle] Adding prefix nodes...");
      const prefixNode = document.createTextNode(PREFIX_TEXT);
      const brNode = document.createElement("br");
      titleEl.insertBefore(brNode, titleEl.firstChild);
      titleEl.insertBefore(prefixNode, titleEl.firstChild);
      console.log("[handleTitle] Prefix nodes inserted.");
    } else {
      console.log("[handleTitle] Prefix already exists, skipping.");
    }
  };

  // --- Main homepage logic ---
  async function applyPageChanges() {
    console.log("[Main] Running page logic...");

    document.body.classList.add(BODY_CLASS);
    addStyles(styles);

    // UL logic
    try {
      const heroUl = await waitForElement(SELECTORS.ul);
      hideOriginalUl(heroUl);
      createCustomUl(heroUl, NEW_PARAGRAPHS);
    } catch (e) {
      console.warn("[Main] UL setup skipped:", e);
    }

    // Title logic
    try {
      const titleEl = await waitForElement(SELECTORS.title);
      handleTitle(titleEl);
    } catch (e) {
      console.warn("[Main] Title setup skipped:", e);
    }
  }

  // --- SPA navigation handling (same stable approach as before) ---
  function patchHistoryMethod(method) {
    const original = history[method];
    history[method] = function (...args) {
      const result = original.apply(this, args);
      window.dispatchEvent(new Event("locationchange"));
      return result;
    };
  }

  patchHistoryMethod("pushState");
  patchHistoryMethod("replaceState");
  window.addEventListener("popstate", () =>
    window.dispatchEvent(new Event("locationchange"))
  );

  window.addEventListener("locationchange", () => {
    console.log("[Router] Route changed:", window.location.pathname);
    // Delay slightly to let the SPA render
    setTimeout(() => applyPageChanges(), 300);
  });

  // --- Initial run ---
  applyPageChanges();
})();
