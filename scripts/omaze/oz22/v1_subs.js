const LOG_ENABLED = false;
const TEST_NAME = "OZ22 | Sticky button on cart page";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1 - SUBS";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const selectors = {
    SELECTOR_SUBS_FIRST_STEP_BUTTON_NEXT: 'nav[aria-label="Progress"] + div > .next-button',
}

const styles = `
.ccx-step-1 .next-button {
  position: fixed;
  bottom: 0;
  left: 0;
  border-radius: 0 !important;
  width: 100%;
  margin: 0 !important;
  z-index: 9999;
}

.ccx-step-2-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
}
.omaze-oz22-v1 {
    a[href="/pages/postal-entry-route"].underline {
        color: #666666 !important;
    }
    
}
.ccx-step-4-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
}

.ccx-step-4-container>button {
  margin: 0 !important;
  border-radius: 0 !important;
}

.ccx-step-2-container>button:first-child {
  margin: 0 !important;
  border-radius: 0 !important;
}

.ccx-step-2-container>button:last-child {
  margin: 0 !important;
  border-radius: 0 !important;
  border: 0 !important;
  font-weight: normal !important;
}
`;

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
            // Wrap each text message with %c to apply the style
            parts.push("%c" + String(msg).toUpperCase());
            values.push(style);
        }
    });

    // Join parts with spaces so the log is more readable
    console.log(parts.join(" "), ...values);
};

const addStyles = (css) => {
    customLog('[addStyles] Starting the addStyles function...');

    if (!css) return;

    if (!css) {
        customLog('[addStyles] No CSS provided');
        return;
    }

    // Check if the style tag already exists
    if (document.querySelector('.ccx-styles-oz22-v1-subs')) {
        customLog('[addStyles] Custom styles already exist.');
        return;
    }

    // Create a new <style> element
    const style = document.createElement('style');
    style.classList.add('ccx-styles-oz22-v1-subs');
    style.appendChild(document.createTextNode(css));

    // Append the style tag to the document head
    document.head.appendChild(style);
    customLog('Custom styles added.');
};

function replaceClass(element, oldClass, newClass) {
    if (element.classList.contains(oldClass)) {
        element.classList.replace(oldClass, newClass);
    } else {
        element.classList.add(newClass);
    }
}

function handleHouseDraw() {
    customLog('[handleHouseDraw] Running House Draw specific logic');

    const container = document.querySelector('nav[aria-label="Progress"] + div');

    if (!container) {
        console.warn('[handleHouseDraw] Container not found');
        return;
    }

    replaceClass(container, 'ccx-step-1', 'ccx-step-1');
}

function handlePrizeBooster() {
    customLog('[handlePrizeBooster] Running Prize Booster specific logic');

    const container = document.querySelector('nav[aria-label="Progress"] + div + div');
    customLog('[handlePrizeBooster] Container query result:', container);

    if (!container) {
        console.warn('[handlePrizeBooster] Container not found');
        return;
    }

    customLog('[handlePrizeBooster] Replacing class on container...');
    replaceClass(container, 'ccx-step-1', 'ccx-step-2');
    customLog('[handlePrizeBooster] Class replaced on container');

    const ccxStepTwoContainer = document.querySelector('.ccx-step-2-container');

    if (ccxStepTwoContainer) return;

    // create a container with position fixed, bottom 0, left 0, and add it to the DOM
    const bottomContainer = document.createElement('div');
    customLog('[handlePrizeBooster] Creating bottom container...');
    bottomContainer.classList.add('ccx-step-2-container');
    customLog('[handlePrizeBooster] Adding bottom container to DOM...');
    container.appendChild(bottomContainer);
    customLog('[handlePrizeBooster] Bottom container added to DOM');

    const buttonPrizeBooster = document.querySelector('#begin-checkout > div.block-table > subscription-cart-container > div > div:nth-child(3) button:first-of-type');
    customLog('[handlePrizeBooster] Button Prize Booster query result:', buttonPrizeBooster);

    const buttonNoThanks = document.querySelector('#begin-checkout > div.block-table > subscription-cart-container > div > div:nth-child(3) button[type="submit"]');
    customLog('[handlePrizeBooster] Button No Thanks query result:', buttonNoThanks);

    // add the button to the bottom container
    customLog('[handlePrizeBooster] Adding buttons to bottom container...');
    bottomContainer.appendChild(buttonPrizeBooster);
    bottomContainer.appendChild(buttonNoThanks);
    customLog('[handlePrizeBooster] Buttons added to bottom container');
}

function handleWeeklyDraw() {
    customLog('[handleWeeklyDraw] Running Weekly Draw specific logic');

    const container = document.querySelector('nav[aria-label="Progress"] + div + div');
    customLog('[handlePrizeBooster] Container query result:', container);

    if (!container) {
        console.warn('[handlePrizeBooster] Container not found');
        return;
    }

    customLog('[handleWeeklyDraw] Replacing class on container...');
    replaceClass(container, 'ccx-step-2', 'ccx-step-3');
    customLog('[handleWeeklyDraw] Class replaced on container');

    const ccxStepThreeContainer = document.querySelector('.ccx-step-3-container');

    if (ccxStepThreeContainer) return;

    /////
    // create a container with position fixed, bottom 0, left 0, and add it to the DOM
    const bottomContainer = document.createElement('div');
    customLog('[handleWeeklyDraw] Creating bottom container...');
    bottomContainer.classList.add('ccx-step-2-container');
    customLog('[handleWeeklyDraw] Adding bottom container to DOM...');
    container.appendChild(bottomContainer);
    customLog('[handleWeeklyDraw] Bottom container added to DOM');

    const buttonPrizeBooster = document.querySelector('#begin-checkout > div.block-table > subscription-cart-container > div > div:nth-child(3) button:first-of-type');
    customLog('[handleWeeklyDraw] Button Prize Booster query result:', buttonPrizeBooster);

    const buttonNoThanks = document.querySelector('#begin-checkout > div.block-table > subscription-cart-container > div > div:nth-child(3) button[type="submit"]');
    customLog('[handleWeeklyDraw] Button No Thanks query result:', buttonNoThanks);

    // add the button to the bottom container
    customLog('[handleWeeklyDraw] Adding buttons to bottom container...');
    bottomContainer.appendChild(buttonPrizeBooster);
    bottomContainer.appendChild(buttonNoThanks);
    customLog('[handleWeeklyDraw] Buttons added to bottom container');
}

function handleSummary() {
    customLog('[handleSummary] Running Summary specific logic');

    const container = document.querySelector('nav[aria-label="Progress"] + div + div');
    customLog('[handleSummary] Container query result:', container);

    if (!container) {
        console.warn('[handleSummary] Container not found');
        return;
    }

    customLog('[handleSummary] Replacing class on container...');
    replaceClass(container, 'ccx-step-3', 'ccx-step-4');
    customLog('[handleSummary] Class replaced on container');

    const ccxStepFourContainer = document.querySelector('.ccx-step-4-container');

    if (ccxStepFourContainer) return;

    // create a container with position fixed, bottom 0, left 0, and add it to the DOM
    const bottomContainer = document.createElement('div');
    customLog('[handleSummary] Creating bottom container...');
    bottomContainer.classList.add('ccx-step-4-container');
    customLog('[handleSummary] Adding bottom container to DOM...');
    container.appendChild(bottomContainer);
    customLog('[handleSummary] Bottom container added to DOM');

    const buttonCheckout = document.querySelector('.ccx-step-4 button[type="submit"]');
    customLog('[handleSummary] Checkout button query result:', buttonCheckout);

    // add the button to the bottom container
    customLog('[handleSummary] Adding buttons to bottom container...');
    bottomContainer.appendChild(buttonCheckout);
    customLog('[handleSummary] Buttons added to bottom container');
}

function observeActiveListItems(containerSelector) {
    const itemOrder = ['House Draw', 'Prize Booster', 'Weekly Draw', 'Summary'];

    const container = document.querySelector(containerSelector);
    if (!container) {
        console.warn('[observeActiveListItems] Container not found:', containerSelector);
        return;
    }

    const listItems = container.querySelectorAll('li.group');
    if (listItems.length === 0) {
        console.warn('[observeActiveListItems] No list items found in container:', containerSelector);
        return;
    }

    // Map item text to corresponding functions
    const itemHandlers = {
        'House Draw': handleHouseDraw,
        'Prize Booster': handlePrizeBooster,
        'Weekly Draw': handleWeeklyDraw,
        'Summary': handleSummary
    };

    // Function to process active items and call the handler for the last one
    function processActiveItems() {
        const activeItems = Array.from(listItems)
            .filter(li => li.classList.contains('active'))
            .map(li => li.querySelector('div').textContent);

        const lastActive = activeItems.sort((a, b) => itemOrder.indexOf(b) - itemOrder.indexOf(a))[0];

        if (lastActive && itemHandlers[lastActive]) {
            customLog('[observeActiveListItems] Last active list item: "' + lastActive + '"');
            itemHandlers[lastActive]();
        }
    }

    // Check initial state
    processActiveItems();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('active')) {
                    processActiveItems();
                }
            }
        });
    });

    listItems.forEach((li) => {
        observer.observe(li, { attributes: true, attributeFilter: ['class'] });
    });
}

function waitForElements(elementSelector) {
    customLog('[waitForElements] Starting to wait for elements...');

    Promise.all([
        DYO.waitForElementAsync(elementSelector, 1, 100, 150)
    ])
        .then(function (results) {
            const nextButton = results[0];

            customLog('[waitForElements] - SUBS - First step next button found:', nextButton[0]);

            observeActiveListItems('nav[aria-label="Progress"]');

            addStyles(styles);
        })
        .catch(function (error) {
            console.warn('[waitForElements] - SUBS - First step next button NOT found:');
        });
}

function init() {
    try {
        customLog(TEST_NAME + ' | ' + SOURCE_TYPE + ' | ' + VARIATION);
        customLog('[init] Current URL: ' + CURRENT_URL);
        customLog('[init] Environment: ' + ENVIRONMENT);

        document.body.classList.add('omaze-oz22-v1-subs');
        customLog('[init] Added class omaze-oz22-v1-subs to body');

        waitForElements(selectors.SELECTOR_SUBS_FIRST_STEP_BUTTON_NEXT);
    } catch (error) {
        console.error(error.message);
    }
}

init();
