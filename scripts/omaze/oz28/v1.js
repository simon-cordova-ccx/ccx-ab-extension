const LOG_ENABLED = true;
const TEST_NAME = "OZ28 - Auto-Enter Messaging";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";
const CLASS_STYLE = 'ccx-styles-oz28-v1';
const CLASS_BODY = 'ccx-omaze-oz28-v1';
const SELECTORS = {
    cartProgress: 'nav[aria-label="Progress"] + div > div > div > .text-sm',
    subscriptionTabButton: '[id*=enter-now-material-tab-buttons] > [id*=nav-latest] entries-tab-nav > nav [data-target*="#subscription-tab-pane"]',
    subscriptionTabTitle: '[id*=enter-now-material-tab-buttons] > [id*=nav-latest] .text-3xl.font-bold',
    subscriptionTabImageText: '[id*=enter-now-material-tab-buttons] > [id*=nav-latest] entries-tab-nav + div > [id*=subscription-tab-pane] span.text-white.text-lg',
    newDrawDescription: '[id*=enter-now-legacy-design] #new-draw-mm > span.font-medium',
    subscriptionCardTopLabel: '[id*=enter-now-legacy-design] .draw-entry-cards [data-test="card-variant-subscription"] > div:first-child > span'
};

// Configuration for text replacements
const textReplacements = {
    noSource: {
        button: { from: /Subscription/, to: 'Auto-Renew' },
        title: { from: /.*/, to: 'Auto-Renew each draw' },
        imageText: { from: 'take out an Omaze Subscription', to: 'auto-renew Omaze draws' }
    },
    digital: {
        description: { from: 'subscriptions', to: 'auto-renewals' },
        cardLabel: { from: 'Subscription', to: 'Auto-Renew' }
    },
    cart: { progress: { from: 'subscription renews', to: 'entries auto-renew' } }
};

// Custom logging function for debugging
const customLog = (...messages) => {
    if (!LOG_ENABLED) return;

    const style = `
        background: linear-gradient(90deg, #6a6971, #2a1f60);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
    `;

    const parts = [];
    const values = [];

    messages.forEach(msg => {
        if (msg instanceof Element) {
            parts.push("%o");
            values.push(msg);
        } else if (Array.isArray(msg)) {
            msg.forEach(item => processLogItem(item, parts, values, style));
        } else if (msg && typeof msg === "object" && "html" in msg) {
            processLogItem(msg, parts, values, style);
        } else {
            parts.push(typeof msg === "string" ? "%c" + msg.toUpperCase() : "%O");
            values.push(typeof msg === "string" ? style : msg);
        }
    });

    console.log(parts.join(" "), ...values);
};

// Helper function to process log items
const processLogItem = (item, parts, values, style) => {
    if (item instanceof Element) {
        parts.push("%o");
        values.push(item);
    } else if (item && typeof item === "object" && "html" in item) {
        parts.push("%s");
        values.push(item.html.trim());
        const { html, ...rest } = item;
        if (Object.keys(rest).length > 0) {
            parts.push("%O");
            values.push(rest);
        }
    } else {
        parts.push("%O");
        values.push(item);
    }
};

// Waits for DOM elements to be available
const waitForElements = (configs, callback) => {
    customLog('[waitForElements] Starting to wait for elements...');
    if (!configs || !Array.isArray(configs) || configs.length === 0) {
        throw new Error('[waitForElements] No configs provided.');
    }
    if (!window.DYO || !DYO.waitForElementAsync) {
        throw new Error('[waitForElements] DYO.waitForElementAsync is not available.');
    }
    if (typeof callback !== 'function') {
        throw new Error('[waitForElements] Callback must be a function.');
    }

    const promises = configs.map(({ selector, count }) =>
        DYO.waitForElementAsync(selector, count, 100, 150)
            .then(elements => {
                customLog('[waitForElements] Found ' + elements.length + ' for ' + selector);
                return { selector, elements };
            })
    );

    return Promise.all(promises).then(callback);
};

// Retrieves UTM source parameter from URL
const getUTMSourceParam = () => new URLSearchParams(window.location.search).get('utm_source') ?? null;

// Replaces text in a DOM element
const replaceText = (element, { from, to }) => {
    if (!element) return;
    customLog(`[replaceText] Changing text for element...`);
    const newText = element.textContent.replace(from, to);
    element.innerHTML = newText;
};

// Handles text changes for no-source entries page
const handleNoSourceEntriesPageTextChanges = (button, title, imageText) => {
    replaceText(button, textReplacements.noSource.button);
    replaceText(title, textReplacements.noSource.title);
    replaceText(imageText, textReplacements.noSource.imageText);
};

// Handles text changes for digital entries page
const handleDigitalEntriesPageTextChanges = (description, cardLabel) => {
    replaceText(description, textReplacements.digital.description);
    replaceText(cardLabel, textReplacements.digital.cardLabel);
};

// Handles text changes for cart page
const handleCartPageTextChanges = (progressText) => {
    if (!progressText) return;
    customLog(`[handleCartPageTextChanges] Changing text for cart page element...`);

    // Simple and safe replacement — keeps all child elements intact
    progressText.innerHTML = progressText.innerHTML.replace(
        textReplacements.cart.progress.from,
        textReplacements.cart.progress.to
    );
};

function observeProgressAndUpdateText() {
    // Select the last <li> in the progress navigation
    const progressNav = document.querySelector('nav[aria-label="Progress"]');
    if (!progressNav) {
        console.warn('Progress navigation not found.');
        return;
    }

    const lastStep = progressNav.querySelector('li:last-child');
    if (!lastStep) {
        console.warn('Last progress step not found.');
        return;
    }

    // Function to perform the text replacement
    const replaceText = () => {
        const targetElement = document.querySelector('[data-test="grand-prize-card-stepper"] .text-sm.mb-0');
        if (!targetElement) {
            console.warn('Target text element not found.');
            return;
        }

        // Only modify if the text contains the original phrase
        if (targetElement.textContent.includes('subscription renews each month')) {
            const newHTML = targetElement.innerHTML.replace(
                'subscription renews each month',
                'entries auto-renew each month'
            );
            targetElement.innerHTML = newHTML;
            console.log('Text updated successfully.');
            // Optionally: disconnect observer after successful change
            // observer.disconnect();
        }
    };

    // Create a MutationObserver to watch for class changes on the last <li>
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('active')) {
                    console.log('Last progress step is now active. Updating text...');
                    replaceText();
                    // Optional: Stop observing after first activation
                    // observer.disconnect();
                }
            }
        }
    });

    // Start observing the last <li> for class attribute changes
    observer.observe(lastStep, {
        attributes: true,
        attributeFilter: ['class']
    });

    // Also check immediately in case it's already active
    if (lastStep.classList.contains('active')) {
        replaceText();
    }

    // Return observer in case you want to disconnect later
    return observer;
}

// Main initialization function for OZ28 experiment
const init = () => {
    try {
        customLog(TEST_NAME + ' | ' + VARIATION + ' | URL: ' + CURRENT_URL);
        document.body.classList.add(CLASS_BODY);

        const currentPathName = window.location.pathname;
        const IS_CART_PAGE = currentPathName === '/cart';
        const utmSourceValue = getUTMSourceParam();

        if (IS_CART_PAGE) {
            customLog('[init] On cart page');
            return waitForElements(
                [{ selector: SELECTORS.cartProgress, count: 1 }],
                (results) => {
                    results[0]?.elements.forEach(handleCartPageTextChanges);

                    observeProgressAndUpdateText();
                }
            );
        }

        customLog('[init] On entries page');
        if (!IS_CART_PAGE && !utmSourceValue) {
            return waitForElements(
                [
                    { selector: SELECTORS.subscriptionTabButton, count: 1 },
                    { selector: SELECTORS.subscriptionTabTitle, count: 1 },
                    { selector: SELECTORS.subscriptionTabImageText, count: 1 },
                ],
                (results) => {
                    results[0]?.elements.forEach(button => handleNoSourceEntriesPageTextChanges(button, null, null));
                    results[1]?.elements.forEach(title => handleNoSourceEntriesPageTextChanges(null, title, null));
                    results[2]?.elements.forEach(imageText => handleNoSourceEntriesPageTextChanges(null, null, imageText));
                }
            );
        }

        if (!IS_CART_PAGE && utmSourceValue !== 'facebook') {
            return waitForElements(
                [
                    { selector: SELECTORS.newDrawDescription, count: 1 },
                    { selector: SELECTORS.subscriptionCardTopLabel, count: 1 },
                ],
                (results) => {
                    results[0]?.elements.forEach(item => handleDigitalEntriesPageTextChanges(item, null));
                    results[1]?.elements.forEach(item => handleDigitalEntriesPageTextChanges(null, item));
                }
            );
        }

        customLog('[init] No action for utm_source=facebook');
    } catch (error) {
        customLog('[init] Error: ' + error.message);
    }
};

init();