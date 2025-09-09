const LOG_ENABLED = false;
const TEST_NAME = "Liberty L01 - Persistent search";
const VARIATION = "CONTROL";
const CURRENT_URL = window.location.href;

const customLog = (...messages) => {
    if (!LOG_ENABLED) return;

    const style = "background: #000; color: #e07200; padding: 4px 8px; border-radius: 4px;";
    const parts = [];
    const values = [];

    messages.forEach(msg => {
        if (msg instanceof Element) {
            parts.push("%o");
            values.push(msg);
        } else {
            // Wrap each text message with %c to apply the style
            parts.push("%c" + String(msg).toUpperCase());
            values.push(style);
        }
    });

    // Join parts with spaces so the log is more readable
    console.log(parts.join(" "), ...values);
};

function waitForElements(selectors, callback) {
    customLog('[waitForElements] Starting to wait for elements...');

    if (!selectors || !Array.isArray(selectors) || selectors.length === 0) {
        customLog('[waitForElements] No selectors provided.');
        return;
    }

    if (!window.DYO || !DYO.waitForElementAsync) {
        customLog('[waitForElements] DYO.waitForElementAsync is not available.');
        return;
    }

    // Create promises for each selector
    const promises = selectors.map(selector =>
        DYO.waitForElementAsync(selector, 1, 100, 150)
    );

    Promise.all(promises)
        .then(results => {
            customLog('[waitForElements] All elements found:', results[0]);
            if (typeof callback === 'function') callback(results);
        })
        .catch(error => {
            customLog('[waitForElements] Some selectors not found within timeout.', error);
        });
}

function bindEvents() {
    const controlInput = document.querySelector('.ais-SearchBox-input');
    
    if (!controlInput) {
        customLog('[bindEvents] Control input not found.');
        return;
    }

    controlInput.addEventListener('input', function() {
        // Track in session storage if the user has logged at least 3 characters for controlInput
        if (controlInput.value.length >= 3 && !sessionStorage.getItem('ccx_loggedThreeChars')) {
            customLog('[bindEvents] at least 3 characters in controlInput');
            DY.API("event", {
                name: "algolia-search-engagement"
            });
            customLog('[bindEvents] Logged algolia-search-engagement event for controlInput.');
            sessionStorage.setItem('ccx_loggedThreeChars', 'true');
            customLog('[bindEvents] Set sessionStorage flag ccx_loggedThreeChars.');
        } else {
            customLog('[bindEvents] less than 3 characters in controlInput or already logged');
        }
    });
}

function init() {
    try {
        customLog(TEST_NAME + ' | ' + VARIATION);
        customLog('[init] Current URL: ' + CURRENT_URL);

        document.body.classList.add('ccx-liberty-l01-control');
        customLog('[init] Added class ccx-liberty-l01-control to body');

        waitForElements(
            ['#algolia-searchbox-placeholder input'],
            function () {
                bindEvents();
            }
        );

    } catch (error) {
        customLog(error.message);
    }
}

init();
