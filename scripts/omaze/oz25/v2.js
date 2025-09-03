const LOG_ENABLED = true;
const TEST_NAME = "REMOVE MONTHLY MILLIONAIRE";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "2";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const customLog = (...messages) => {
    if (!LOG_ENABLED) return;

    const style = "background: #000; color: white; padding: 4px 8px; border-radius: 4px;";
    const parts = [];
    const values = [];

    messages.forEach(msg => {
        if (msg instanceof Element) {
            parts.push("%o");
            values.push(msg);
        } else {
            parts.push("%c" + String(msg).toUpperCase());
            values.push(style);
        }
    });

    console.log(parts.join(" "), ...values);
};

const SELECTORS = {
    paygMultiStepContainer: '#payg-multi-step-container',
}

const STYLES = `
    #payg-multi-step-container > payg-cart-container > div > nav > ol:first-child > li:nth-child(4) {
        display: none !important;
    }
    #payg-multi-step-container > payg-cart-container > div > nav > ol:first-child > li:nth-child(5) {
        display: none !important;
    }
    #payg-multi-step-container > payg-cart-container > div > nav > ol:nth-child(2) > li:nth-child(2) {
        display: none !important;
    }

    #payg-multi-step-container > payg-cart-container > div > nav > ol:first-child {
        margin: 0px calc(33% - 16px) !important;
    }

    #payg-multi-step-container > payg-cart-container > div > nav > ol:nth-child(2) {
        grid-template-columns: repeat(2, minmax(0px, 1fr)) !important;
        margin: 0px calc(33% - 72px) !important;
    }

    #payg-multi-step-container > payg-cart-container > div > nav > ol:nth-child(2) > li:nth-child(2) {
        display: none !important;
    }
`;

const addStyles = (css) => {
    customLog('[addStyles] Starting the addStyles function...');

    if (!css) return;

    if (document.querySelector('.ccx-styles-subs-callout-v1')) {
        customLog('[addStyles] Custom styles already exist.');
        return;
    }

    const style = document.createElement('style');
    style.classList.add('ccx-styles-subs-callout-v1');
    style.appendChild(document.createTextNode(css));

    document.head.appendChild(style);
    customLog('Custom styles added.');
};

function waitForElements(selectors, callback) {
    customLog('[waitForElements] Starting to wait for elements...');
    customLog('[waitForElements] Selectors provided:', selectors);

    if (!selectors || !Array.isArray(selectors) || selectors.length === 0) {
        customLog('[waitForElements] No selectors provided.');
        return;
    }

    // Check DYO availability
    customLog('[waitForElements] window.DYO exists:', !!window.DYO);
    customLog('[waitForElements] DYO.waitForElementAsync exists:', !!window.DYO?.waitForElementAsync);

    if (!window.DYO || !DYO.waitForElementAsync) {
        console.warn('[waitForElements] DYO.waitForElementAsync is not available, attempting fallback with document.querySelector');

        // Fallback: Try document.querySelector for each selector
        const results = selectors.map(selector => {
            try {
                const element = document.querySelector(selector);
                customLog('[waitForElements] Fallback query for ' + selector + ':', element);
                return element ? [element] : [];
            } catch (error) {
                console.warn('[waitForElements] Error querying ' + selector + ':', error);
                return [];
            }
        });

        if (results.every(result => result.length > 0)) {
            customLog('[waitForElements] All elements found via fallback:', results);
            if (typeof callback === 'function') callback(results);
        } else {
            console.warn('[waitForElements] Some elements not found via fallback:', results);
        }
        return;
    }

    // Create promises for each selector
    const promises = selectors.map(selector =>
        DYO.waitForElementAsync(selector, 1, 200, 100) // 200ms interval, 100 retries = 20s
            .then(result => {
                customLog('[waitForElements] Found elements for ' + selector + ':', result);
                return result;
            })
            .catch(error => {
                console.warn('[waitForElements] Failed to find elements for ' + selector + ':', error);
                return []; // Return empty array to allow Promise.all to resolve
            })
    );

    Promise.all(promises)
        .then(results => {
            customLog('[waitForElements] All promises resolved:', results);
            // Check if all selectors found at least one element
            if (results.every(result => result.length > 0)) {
                customLog('[waitForElements] All elements found:', results);
                if (typeof callback === 'function') callback(results);
            } else {
                console.warn('[waitForElements] Some selectors did not return elements:', results);

                // Fallback: Try document.querySelector again
                const fallbackResults = selectors.map(selector => {
                    try {
                        const element = document.querySelector(selector);
                        customLog('[waitForElements] Fallback query for ' + selector + ':', element);
                        return element ? [element] : [];
                    } catch (error) {
                        console.warn('[waitForElements] Fallback error for ' + selector + ':', error);
                        return [];
                    }
                });

                if (fallbackResults.every(result => result.length > 0)) {
                    customLog('[waitForElements] All elements found via fallback:', fallbackResults);
                    if (typeof callback === 'function') callback(fallbackResults);
                } else {
                    console.warn('[waitForElements] Some elements still not found via fallback:', fallbackResults);
                }
            }
        })
        .catch(error => {
            console.warn('[waitForElements] Promise.all failed:', error);
        });
}

function updatePaygMultiStepGridTemplateColumns() {
  const element = document.querySelector('#payg-multi-step-container > payg-cart-container > div > nav > ol:nth-child(2)');
  if (element) {
    element.removeAttribute('style');
    element.style.gridTemplateColumns = 'repeat(2, minmax(0px, 1fr))';
  }
}

function autoClickNextOnThirdLiActive() {
    console.log('[Debug] Starting observer on document.body');

    const observer = new MutationObserver(() => {
        const targetLi = document.querySelector(
            'nav[aria-label="Progress"] > ol:first-child li:nth-child(3)'
        );

        if (!targetLi) {
            console.log('[Debug] Target third <li> not found yet.');
            return;
        }

        if (targetLi.classList.contains('active')) {
            console.log('[Debug] Third <li> is active! Clicking .next-button...');

            const nextButton = document.querySelector('.next-button');
            if (nextButton) {
                nextButton.click();
                console.log('[Debug] .next-button clicked.');

                const contentContainer = document.querySelector('nav[aria-label="Progress"] + div')
                if (contentContainer) {
                    contentContainer.style.display = 'flex';
                    console.log('[Debug] Content container shown.');
                }
            } else {
                console.log('[Debug] .next-button not found.');
            }

            observer.disconnect();
            console.log('[Debug] Observer disconnected.');
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function init() {
    try {
        customLog(TEST_NAME + ' | ' + SOURCE_TYPE + ' | ' + VARIATION);
        customLog('[init] Current URL: ' + CURRENT_URL);
        customLog('[init] Environment: ' + ENVIRONMENT);

        document.body.classList.add('omaze-25-v1');
        customLog('[init] Added class omaze-25-v1 to body');

        const elementSelectors = [SELECTORS.paygMultiStepContainer]; // reference the selectors constants

        waitForElements(elementSelectors, (results) => {
            // Create variables for each element
            const controlPAYGMultiStepContainer = results[0]?.[0] || null; // First element of first array

            // Log for verification
            customLog('[waitForElements] Assigned variables...');
            customLog('controlPAYGMultiStepContainer:', controlPAYGMultiStepContainer);

            // --- Add CSS ---
            addStyles(STYLES);

            // Update Grid Multi Step Template Columns
            updatePaygMultiStepGridTemplateColumns();

            // Start the observer
            autoClickNextOnThirdLiActive();
        });
    } catch (error) {
        console.error(error.message);
    }
}

init();
