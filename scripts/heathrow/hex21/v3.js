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
      main #main-content > div:last-child ul:not([${CUSTOM_UL_MARKER}]) {
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
            console.log("[waitForElement] Found element:", selector);
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
      if (!css) return;
      if (document.querySelector(".ccx-styles-hex21-v3")) return;
      const style = document.createElement("style");
      style.classList.add("ccx-styles-hex21-v3");
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
      console.log("[addStyles] Custom styles added to <head>.");
    };
  
    const hideOriginalUl = (ul) => {
      if (!ul) return;
      ul.style.display = "none";
      ul.setAttribute("aria-hidden", "true");
      console.log("[hideOriginalUl] Original UL hidden.");
    };
  
    const createCustomUl = (originalUl, texts = NEW_PARAGRAPHS) => {
      if (!originalUl) return null;
  
      const existing = document.querySelector(`ul[${CUSTOM_UL_MARKER}]`);
      if (existing) {
        console.log("[createCustomUl] Custom UL already exists, skipping.");
        return existing;
      }
  
      console.log("[createCustomUl] Creating new custom UL...");
      const customUl = document.createElement("ul");
      customUl.setAttribute(CUSTOM_UL_MARKER, "1");
      if (originalUl.className) customUl.className = originalUl.className;
  
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
      console.log("[createCustomUl] Custom UL inserted after original UL.");
      return customUl;
    };
  
    const updateHeroTitle = (el) => {
      if (!el) return;
      const text = el.textContent.trim();
      if (text.startsWith("Think speed.")) {
        console.log("[updateHeroTitle] Prefix already exists, skipping.");
        return;
      }
      el.innerHTML = "Think speed.<br>" + text;
      console.log("[updateHeroTitle] Hero title updated.");
    };
  
    // --- Main page logic ---
    async function applyPageChanges() {
      try {
        console.log("[Main] Starting page logic...");
  
        // Wait for elements
        const container = await waitForElement(SELECTORS.container);
        const titleEl = await waitForElement(SELECTORS.title);
        const originalUl = await waitForElement(SELECTORS.ul);
  
        // Apply styles and layout
        addStyles(styles);
        document.body.classList.add(BODY_CLASS);
  
        container.style.display = "flex";
        container.style.flexDirection = "row-reverse";
        container.style.marginTop = "2rem";
  
        updateHeroTitle(titleEl);
        hideOriginalUl(originalUl);
        createCustomUl(originalUl, NEW_PARAGRAPHS);
  
        console.log("[Main] Page transformation complete ✅");
      } catch (err) {
        console.error("[Main] Initialization error:", err);
      }
    }
  
    // --- SPA route detection (pushState / replaceState / popstate) ---
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
  
    // --- On route change, wait a bit then reapply ---
    window.addEventListener("locationchange", () => {
      console.log("[Router] Route changed:", window.location.pathname);
      setTimeout(() => applyPageChanges(), 300);
    });
  
    // --- Initial run ---
    applyPageChanges();
  })();