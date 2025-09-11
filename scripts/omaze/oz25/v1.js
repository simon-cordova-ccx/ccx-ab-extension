const LOG_ENABLED = true;
const TEST_NAME = "REMOVE MONTHLY MILLIONAIRE";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "1";
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

    customLog(parts.join(" "), ...values);
};

const SELECTORS = {
    paygMultiStepContainer: '#payg-multi-step-container [aria-label="Progress"] ol:first-child li',
}

const STYLES = `
    #payg-multi-step-container > payg-cart-container > div:nth-child(2) {
        display: none !important;
    }
    button[name="checkout"] {
        display: none !important;
    }
    button[name="checkout"] + div {
        display: none !important;
    }
    #payg-multi-step-container > payg-cart-container > div > nav > ol.flex.items-center.justify-center.p-0.list-none > li:nth-child(4) {
        display: none !important;
    }
    #payg-multi-step-container > payg-cart-container > div > nav > ol.flex.items-center.justify-center.p-0.list-none > li:nth-child(5) {
        display: none !important;
    }
    #payg-multi-step-container > payg-cart-container > div > nav > ol.p-0.list-none.grid > li:nth-child(3) {
        display: none !important;
    }
    /* First <ol> */
    #payg-multi-step-container > payg-cart-container > div > nav > ol:first-child {
        margin: 0px calc(33% - 1rem) !important;
    }

    /* Second <ol> */
    #payg-multi-step-container > payg-cart-container > div > nav > ol:nth-child(2) {
        display: flex !important;
        justify-content: space-between !important;
        margin: 0px calc(33% - 45px) !important;
    }

    .block-qty {
        display: none !important;
    }
`;

const addStyles = (css) => {
    customLog('[addStyles] Starting the addStyles function...');

    if (!css) return;

    if (document.querySelector('.ccx-styles-oz25-v1')) {
        customLog('[addStyles] Custom styles already exist.');
        return;
    }

    const style = document.createElement('style');
    style.classList.add('ccx-styles-oz25-v1');
    style.appendChild(document.createTextNode(css));

    document.head.appendChild(style);
    customLog('Custom styles added.');
};

function autoCheckoutAfterUpsellNext() {
    customLog('[Debug] Starting observer on document.body to detect upsell container.');

    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // ensure it's an element
                        const upsell = node.matches('[data-test="upsell-container"]')
                            ? node
                            : node.querySelector('[data-test="upsell-container"]');

                        if (upsell) {
                            customLog('[Debug] Upsell container detected! Listening for .next-button click.');

                            const nextButton = document.querySelector('.next-button');
                            if (!nextButton) {
                                customLog('[Debug] .next-button not found yet.');
                                return;
                            }

                            // Listen for user click on .next-button
                            const onNextClick = () => {
                                customLog('[Debug] .next-button clicked! Starting polling for checkout button.');

                                const intervalId = setInterval(() => {
                                    const checkoutButton = document.querySelector('button[name="checkout"]');
                                    if (checkoutButton) {
                                        customLog('[Debug] Checkout button found! Clicking...');
                                        checkoutButton.click();
                                        clearInterval(intervalId);
                                        customLog('[Debug] Polling stopped.');
                                    } else {
                                        customLog('[Debug] Checkout button not yet available. Polling...');
                                    }
                                }, 200);

                                // Remove listener after first click
                                nextButton.removeEventListener('click', onNextClick);
                            };

                            nextButton.addEventListener('click', onNextClick);

                            // Optional: disconnect the observer if we only care about the first upsell
                            // observer.disconnect();
                        }
                    }
                });
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function hideMontlyMillionaireContainer() {
    customLog('[Debug] Starting observer on document.body');

    const observer = new MutationObserver(() => {
        const targetLi = document.querySelector(
            '#payg-multi-step-container > payg-cart-container nav[aria-label="Progress"] > ol:first-child > li:nth-child(5)'
        );

        if (!targetLi) {
            customLog('[Debug] Target fifth <li> not found yet.');
            return;
        }

        if (targetLi.classList.contains('active')) {

            customLog('[Debug] Fifth <li> is active! Hiding the sibling div with !important.');

            const siblingDiv = document.querySelector('nav[aria-label="Progress"] + div');
            const totalPrice = document.querySelector('.total-price.text-center');
            const nextButton = document.querySelector('.next-button');

            if (siblingDiv) {
                const existingStyle = siblingDiv.getAttribute('style') || '';
                // siblingDiv.setAttribute('style', existingStyle + '; display: none !important;');
                siblingDiv.setAttribute('style', existingStyle + '; visibility: hidden !important;');
                customLog('[Debug] Sibling div hidden.');
            } else {
                customLog('[Debug] Sibling div not found.');
            }

            if (totalPrice) {
                const existingStyle = totalPrice.getAttribute('style') || '';
                // totalPrice.setAttribute('style', existingStyle + '; display: none !important;');
                totalPrice.setAttribute('style', existingStyle + '; visibility: hidden !important;');
                customLog('[Debug] Total price hidden.');
            } else {
                customLog('[Debug] Total price element not found.');
            }

            if (nextButton) {
                const existingStyle = nextButton.getAttribute('style') || '';
                // nextButton.setAttribute('style', existingStyle + '; display: none !important;');
                nextButton.setAttribute('style', existingStyle + '; visibility: hidden !important;');
                customLog('[Debug] Next button hidden.');

            } else {
                customLog('[Debug] Next button not found.');
            }

            // Optional: stop observing
            // observer.disconnect();
            customLog('[Debug] Observer disconnected.');
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function watchProgressAndUpdateBonus() {
    const progressOl = document.querySelector('nav[aria-label="Progress"] > ol:first-child');

    if (!progressOl) {
        customLog('[Debug] Progress <ol> not found.');
        return;
    }

    // Helper to check and update
    const checkAndUpdate = () => {
        const listItems = progressOl.querySelectorAll('li');
        customLog('[Debug] Progress list length:', listItems.length);

        if (listItems.length < 5) {
            const targetDiv = document.querySelector(
                'nav[aria-label="Progress"] > ol:nth-child(2) li:nth-child(2) > div'
            );

            if (targetDiv) {
                targetDiv.textContent = 'Bonus Entries';
                customLog('[Debug] Updated text to "Bonus Entries"');
            } else {
                customLog('[Debug] Target <div> not found.');
            }
        }

        const lastItem = progressOl.querySelector('li:last-child');
        if (lastItem) {
            // if last item has the class active
            if (lastItem.classList.contains('active')) {
                customLog('[Debug] Last <li> is active! Hiding the sibling div with !important.');

                const siblingDiv = document.querySelector('nav[aria-label="Progress"] + div');
                if (siblingDiv) {
                    const existingStyle = siblingDiv.getAttribute('style') || '';
                    siblingDiv.setAttribute('style', existingStyle + '; display: none !important;');
                    customLog('[Debug] Sibling div hidden.');

                    const totalPrice = document.querySelector('.total-price.text-center');
                    if (totalPrice) {
                        const existingStyle = totalPrice.getAttribute('style') || '';
                        totalPrice.setAttribute('style', existingStyle + '; display: none !important;');
                        customLog('[Debug] Total price hidden.');
                    } else {
                        customLog('[Debug] Total price element not found.');
                    }

                } else {
                    customLog('[Debug] Sibling div not found.');
                }

                // Optional: stop observing
                // observer.disconnect();
                customLog('[Debug] Observer disconnected.');
            } else {
                customLog('[Debug] Last <li> is not active.');
            }
        }

    };

    // Run once immediately
    checkAndUpdate();

    // Then observe for future changes
    const observer = new MutationObserver(checkAndUpdate);
    observer.observe(progressOl, { childList: true, subtree: true });
    customLog('[Debug] Observer started on Progress <ol>');
}

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

function monitorLastStepStatus() {
  const observer = new MutationObserver(() => {
    const steps = document.querySelectorAll(
      '#payg-multi-step-container [aria-label="Progress"] ol:first-child li'
    );

    if (steps.length > 0) {
      const lastStep = steps[steps.length - 1];

      if (lastStep.classList.contains('active')) {
        if (document.body.classList.contains('ccx-clicked-offer-button')) {
          customLog("✅ Last step active & offer button was clicked. Triggering checkout...");

          const checkoutBtn = document.querySelector("[name='checkout']");
          if (checkoutBtn) {
            document.body.classList.remove("ccx-clicked-offer-button");
            checkoutBtn.click()
          } else {
            console.warn("⚠️ Checkout button not found.");
          }
        } else {
          customLog("❌ Last step active but offer button never clicked. Reloading...");
          setTimeout(() => window.location.reload(), 1000);
        }
      } else {
        customLog("ℹ️ Last step is not active");
      }
    } else {
      customLog("⚠️ No steps found");
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"]
  });
}

function waitForOfferButton() {
  const observer = new MutationObserver(() => {
    const offerBtn = document.querySelector('[data-mobile="apply-offer-button"]');
    if (offerBtn) {
        customLog('Offer button found:', offerBtn);
      offerBtn.addEventListener("click", () => {
        document.body.classList.add("ccx-clicked-offer-button");
      });
      observer.disconnect(); // stop watching once found
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
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
            const controlMultiStepContainer = results[0]?.[0] || null; // First element of first array

            // Log for verification
            customLog('[waitForElements] Assigned variables...');
            customLog('controlMultiStepContainer:', controlMultiStepContainer);

            // --- Add CSS ---
            addStyles(STYLES);

            // Start the observer
            autoCheckoutAfterUpsellNext();

            // Start it
            watchProgressAndUpdateBonus();

            hideMontlyMillionaireContainer();

            // Call the function to execute
            monitorLastStepStatus();

            waitForOfferButton();
        });
    } catch (error) {
        console.error(error.message);
    }
}

init();
