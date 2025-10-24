(function () {
  const VARIATION = "v1";

  const REPLACEMENTS = {
    v1: { bodyClass: "ccx-hex-16-3-v1", replacementText: "Find" },
    v2: { bodyClass: "ccx-hex-16-3-v2", replacementText: "Choose" },
    v3: { bodyClass: "ccx-hex-16-3-v3", replacementText: "Search for" },
  };

  const config = REPLACEMENTS[VARIATION] || REPLACEMENTS.v1;
  const POLL_INTERVAL = 300;
  const MAX_WAIT_MS = 10000;
  const LOG_ENABLED = true;

  let activeObserver = null;

  const customLog = (...args) => {
    if (!LOG_ENABLED) return;
    console.log("%c" + args.join(" "), "background:#2a1f60;color:white;padding:3px 6px;");
  };

  const findTargetDivs = () => {
    const matches = [];
    const buttons = Array.from(document.querySelectorAll("button"));
    buttons.forEach((button) => {
      const divs = Array.from(button.querySelectorAll("div"));
      divs.forEach((div) => {
        const text = div.textContent?.trim();
        if (text === "Get Your Ticket" || text === "Get Your Tickets") {
          matches.push(div);
        }
      });
    });
    return matches;
  };

  const replaceText = (divEl) => {
    if (!divEl) return;
    const currentText = divEl.textContent.trim();
    if (/^Get Your Tickets?$/i.test(currentText)) {
      const newText = currentText.replace(/^Get Your/i, config.replacementText);
      if (newText !== currentText) {
        divEl.textContent = newText;
        customLog(`[ReplaceText] "${currentText}" → "${newText}"`);
      }
    }
  };

  const observeAndReplace = (divs) => {
    if (activeObserver) {
      activeObserver.disconnect();
      activeObserver = null;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        const target = m.target.nodeType === Node.TEXT_NODE ? m.target.parentNode : m.target;
        if (target && target.nodeType === Node.ELEMENT_NODE) {
          replaceText(target.closest ? target.closest("div") || target : target);
        }
      });
    });

    divs.forEach((divEl) => {
      observer.observe(divEl, { characterData: true, subtree: true, childList: true });
    });

    activeObserver = observer;
    customLog("[observeAndReplace] Observers attached to matched divs.");
  };

  const checkAndRun = () => {
    const start = performance.now();

    const tryFind = () => {
      const divs = findTargetDivs();
      if (divs.length === 0) {
        const elapsed = performance.now() - start;
        if (elapsed < MAX_WAIT_MS) {
          return setTimeout(tryFind, POLL_INTERVAL);
        } else {
          customLog("[checkAndRun] Timeout — no matching divs found.");
          return;
        }
      }

      divs.forEach(replaceText);
      observeAndReplace(divs);
      customLog(`[checkAndRun] Replaced text in ${divs.length} div(s).`);
    };

    tryFind();
  };

  const stopObserving = () => {
    if (activeObserver) {
      activeObserver.disconnect();
      activeObserver = null;
      customLog("[stopObserving] Disconnected active observers.");
    }
  };

  const applyPageLogic = () => {
    const isHomePage = window.location.pathname === "/";
    customLog(`[applyPageLogic] Path: ${window.location.pathname}`);

    if (!isHomePage) {
      stopObserving();
      return;
    }

    document.body.classList.add(config.bodyClass);
    customLog(`[applyPageLogic] Added body class: ${config.bodyClass}`);
    checkAndRun();
  };

  // --- SPA Route Detection ---
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
  window.addEventListener("popstate", () => window.dispatchEvent(new Event("locationchange")));

  window.addEventListener("locationchange", () => {
    customLog("[Router] Route changed:", window.location.pathname);
    setTimeout(applyPageLogic, 300);
  });

  // --- Initial run ---
  applyPageLogic();
})();
