// --- Homepage Checker ---
function isHomePage() {
  return window.location.pathname === "/";
}

// --- Constants ---
const BODY_CLASS = "ccx-heathrow-hex21-v1";
const SELECTORS = { container: "main #main-content" };
const WAIT_INTERVAL = 300;
const MAX_ATTEMPTS = 30;

// --- Utility: Wait for element to appear ---
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

// --- Main Homepage Logic ---
async function applyHomepageChanges() {
  if (!isHomePage()) return;

  // console.log("Applying homepage logic...");

  try {
    const container = await waitForElement(SELECTORS.container);

    // Apply layout changes
    container.style.display = "flex";
    container.style.flexDirection = "row-reverse";
    container.style.marginTop = "2rem";

    // Add marker class
    document.body.classList.add(BODY_CLASS);
    // console.log("Homepage layout applied ✅");
  } catch (err) {
    // console.warn("Homepage init error:", err.message);
  }
}

// --- Mutation Handler (debounced) ---
function handleBodyChange() {
  if (isHomePage()) {
    // If we're home but styles aren't applied, reapply
    const container = document.querySelector(SELECTORS.container);
    if (!container || container.style.flexDirection !== "row-reverse") {
      applyHomepageChanges();
    }
  }
}

// --- Observer Setup ---
const observer = new MutationObserver(() => {
  clearTimeout(observer._debounce);
  observer._debounce = setTimeout(handleBodyChange, 150);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

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

// --- React to Route Changes ---
window.addEventListener("locationchange", () => {
  // console.log("Route changed:", window.location.pathname);
  if (isHomePage()) {
    // Wait a moment before applying, to allow SPA render to complete
    setTimeout(() => applyHomepageChanges(), 300);
  } else {
    document.body.classList.remove(BODY_CLASS);
  }
});

// --- Initial Run ---
applyHomepageChanges();
