// [data-test="mobile-card-variant-payg"] ::first-child

const LOG_ENABLED = true;
const TEST_NAME = "OZDE-6 | Remove discount";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const upsellImageURL = 'https://cdn-eu.dynamicyield.com/api/9880449/images/1d82604e6218.png';

const plansData = {
    payAsYouGo: [
        { icon: '★', bonusCount: '1', price: '10', highlight: '20 Lose', name: 'Subscription 10€', order: 1, entriesAmount: '20' },
        { icon: '★', bonusCount: '1', price: '25', highlight: '50 Lose', name: 'Subscription 25€', order: 3, entriesAmount: '50' },
        { icon: '★', bonusCount: '1', price: '35', highlight: '70 Lose', name: 'Subscription 35€', order: 5, entriesAmount: '70' },
    ],
    subscriptions: [
        { icon: '★', bonusCount: '2', price: '10', highlight: '20 + 1 Gratis Los', name: 'Subscription 10€', order: 2, entriesAmount: '10' },
        { icon: '★', bonusCount: '4', price: '25', highlight: '50 + 4 Gratis Los', name: 'Subscription 25€', order: 4, entriesAmount: '10' },
        { icon: '★', bonusCount: '4', price: '35', highlight: '70 + 6 Gratis Los', name: 'Subscription 35€', order: 6, entriesAmount: '10' },
    ],
};

const styles = `
#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] {
  background: #F5F5F5;
}
entries-tab-nav[data-tab-container] {
  display: none !important;
}

[id*=single-purchase-tab-pane]>div:first-child {
  display: none;
}

[id*=single-purchase-tab-pane]>div.mx-auto>div .card-ticket-icon {
  display: none !important;
}

[id*=single-purchase-tab-pane]>div.mx-auto>div [data-test="mobile-card-variant-payg"]:not([class*=ccx]) {
//   display: none !important;
}

[id*=single-purchase-tab-pane]>div.mx-auto>div [data-test="desktop-card-variant-payg"]:not([class*=ccx]) {
  // display: none !important;
}

#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] > div.mx-auto [data-test="mobile-card-variant-payg"] > .items-center {
    justify-content: space-around !important;
}

#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] > div.mx-auto [data-test="mobile-card-variant-payg"] > .items-center > .font-bold.text-base {
    margin: 0 !important;
}

#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] > div.mx-auto [data-test="mobile-card-variant-payg"] .card-ticket-icon {
    display: none !important;
}
[data-test="mobile-card-variant-payg"]:first-child {
    display: none !important;
}

#enter-now-material-tab-buttons-design [data-test="mobile-card-variant-payg"] .text-sm {
    display: none !important;
}
#enter-now-material-tab-buttons-design [id*=nav-latest] > div:first-child > div:nth-child(4) {
    justify-content: center !important;
}





.ccx-card-upsell.ccx-card-upsell--root {
    // max-width: 348px;
    margin: 0 auto;
    border-radius: 16px;
    background: #081F28;
    margin-bottom: 40px;
}

.ccx-header-upgrade {
    font-family: Showtime;
    font-weight: 500;
    font-size: 36px !important;
    width: 380px;
    margin: 0 auto;
}

.ccx-card-upsell__middle {
    color: white;
    margin-top: 0 !important;
    padding: 1rem;
    text-align: left;
}

.ccx-card-upsell__headline {
    font-family: Gellix;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
    vertical-align: middle;
    height: 44px;
}

.ccx-card-upsell__pill {
    background: #F4F3E0;
    margin-bottom: 0.5rem;
    width: 238px;
    height: 30px;
    opacity: 1;
    border-radius: 99px;
    padding-top: 4px;
    padding-right: 16px;
    padding-bottom: 4px;
    padding-left: 16px;
    font-family: Gellix;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    vertical-align: bottom;
    color: #C06717;
}

.ccx-card-upsell__pill span {
    color: #000;
}

.ccx-card-upsell__price {
    width: 124px;
    height: 38px;
    font-family: Gellix;
    font-weight: 700;
    font-size: 32px;
    line-height: 100%;
    vertical-align: middle;
}

.ccx-card-upsell__price span {
    font-family: Gellix;
    font-weight: 400;
    font-size: 18px;
    vertical-align: middle;
}

.ccx-card-upsell__entries {
    font-family: Gellix;
    font-weight: 700;
    font-size: 18px;
    line-height: 100%;
    vertical-align: middle;
    color: #FFDD00;
}

.ccx-card-upsell__bottom {
    display: flex;
    flex-flow: column;
}

.ccx-card-upsell__button {
    width: 316px;
    height: 56px;
    opacity: 1;
    border-width: 2px;
    border-radius: 76px;
    padding-top: 12px;
    padding-right: 32px;
    padding-bottom: 14px;
    padding-left: 32px;
    margin: 0 auto;
    font-family: Gellix;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    margin-bottom: 1rem;
}

.ccx-card-upsell__button:hover {
    border-color: #ffdc03;
    color: black;
}

.ccx-card-upsell__no_thanks {
    width: 316px;
    height: 22px;
    opacity: 1;
    font-family: Gellix;
    font-weight: 700;
    font-size: 18px;
    line-height: 100%;
    text-align: center;
    vertical-align: middle;
    text-decoration: underline !important;
    text-decoration-style: solid;
    text-decoration-thickness: 0%;
    text-decoration-skip-ink: auto;
    color: #FFFFFF;
    margin: 0 auto;
    margin-bottom: 1.5rem;
}

.ccx-skip {
    width: 348px;
    height: 53px;
    margin: 0 auto;
    margin-bottom: 40px;
}

.ccx-skip button {
    width: 348px;
    height: 53px;
    margin: 0 auto;
    opacity: 1;
    border-radius: 76px;
    padding-top: 12px;
    padding-right: 32px;
    padding-bottom: 14px;
    padding-left: 32px;
    background: #FFDD00;
    font-family: Gellix;
    font-weight: 700;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #090F15;
    margin-bottom: 40px;
}






`;

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
            // Single DOM element
            parts.push("%o");
            values.push(msg);

        } else if (Array.isArray(msg)) {
            // Handle arrays
            msg.forEach(item => {
                if (item instanceof Element) {
                    parts.push("%o");
                    values.push(item);
                } else if (item && typeof item === "object" && "html" in item) {
                    // Object with HTML string
                    const wrapper = document.createElement("div");
                    wrapper.innerHTML = item.html.trim();
                    const el = wrapper.firstElementChild;

                    parts.push("%o");
                    values.push(el);

                    // Log other props (e.g., entriesAmount)
                    const { html, ...rest } = item;
                    if (Object.keys(rest).length > 0) {
                        parts.push("%O");
                        values.push(rest);
                    }
                } else {
                    parts.push("%O");
                    values.push(item);
                }
            });

        } else if (msg && typeof msg === "object" && "html" in msg) {
            // Single object with HTML string
            const wrapper = document.createElement("div");
            wrapper.innerHTML = msg.html.trim();
            const el = wrapper.firstElementChild;

            parts.push("%o");
            values.push(el);

            const { html, ...rest } = msg;
            if (Object.keys(rest).length > 0) {
                parts.push("%O");
                values.push(rest);
            }

        } else {
            // Normal text/objects
            if (typeof msg === "string") {
                parts.push("%c" + msg.toUpperCase());
                values.push(style);
            } else {
                parts.push("%O");
                values.push(msg);
            }
        }
    });

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
    if (document.querySelector('.ccx-styles-de6-v1')) {
        customLog('[addStyles] Custom styles already exist.');
        return;
    }

    // Create a new <style> element
    const style = document.createElement('style');
    style.classList.add('ccx-styles-de6-v1');
    style.appendChild(document.createTextNode(css));

    // Append the style tag to the document head
    document.head.appendChild(style);
    customLog('Custom styles added.');
};

function waitForElements(configs, callback) {
    customLog('[waitForElements] Starting to wait for elements...');

    if (!configs || !Array.isArray(configs) || configs.length === 0) {
        customLog('[waitForElements] No configs provided.');
        return;
    }

    if (!window.DYO || !DYO.waitForElementAsync) {
        customLog('[waitForElements] DYO.waitForElementAsync is not available.');
        return;
    }

    // Create promises for each config
    const promises = configs.map(cfg => {
        const { selector, count } = cfg;
        return DYO.waitForElementAsync(selector, count, 100, 150)
            .then(elements => {
                customLog('[' + 'waitForElements' + '] Found ' + elements.length + ' for ' + selector);
                return { selector, elements };
            });
    });

    Promise.all(promises)
        .then(results => {
            // customLog('[waitForElements] All elements found:', results);
            if (typeof callback === 'function') callback(results);
        })
        .catch(error => {
            customLog('[waitForElements] Some selectors not found within timeout.', error);
        });
}

function createUpsellCard(pageType, matchingSubscription) {
    customLog('[createUpsellCard] Creating upsell card...');

    customLog({ pageType, matchingSubscription });

    // Root card
    const card = document.createElement('div');
    card.className = 'ccx-card-upsell ccx-card-upsell--root flex flex-col';

    // Top section (image container)
    const top = document.createElement('div');
    top.className = 'ccx-card-upsell__top';
    const img = document.createElement('img');
    img.src = upsellImageURL;
    img.alt = 'Upsell image';
    top.appendChild(img);

    // Middle section
    const middle = document.createElement('div');
    middle.className = 'ccx-card-upsell__middle';

    // Headline
    const headline = document.createElement('p');
    headline.className = 'ccx-card-upsell__headline';
    headline.innerHTML =
        'Wechsle zum Abo und dir entgeht keine Ziehung mehr';
    middle.appendChild(headline);

    // Info pills
    const pills = document.createElement('div');
    pills.className = 'ccx-card-upsell__pills';

    const pill1 = document.createElement('div');
    pill1.className = 'ccx-card-upsell__pill';
    pill1.innerHTML = '2 Bonus Verlosung <span>inklusive</span>';

    const pill2 = document.createElement('div');
    pill2.className = 'ccx-card-upsell__pill';
    pill2.innerHTML = '+1 Gratis Los <span>jeden Monat</span>';

    pills.appendChild(pill1);
    pills.appendChild(pill2);
    middle.appendChild(pills);

    // Price info
    const priceContainer = document.createElement('div');
    priceContainer.className = 'ccx-card-upsell__price-container';

    const price = document.createElement('div');
    price.className = 'ccx-card-upsell__price';

    //write without template literal
    price.innerHTML = matchingSubscription.price + '€<span>/Monat</span>';

    const entries = document.createElement('div');
    entries.className = 'ccx-card-upsell__entries';
    entries.textContent = matchingSubscription.highlight;

    priceContainer.appendChild(price);
    priceContainer.appendChild(entries);
    middle.appendChild(priceContainer);

    // Bottom section
    const bottom = document.createElement('div');
    bottom.className = 'ccx-card-upsell__bottom';

    const button = document.createElement('button');
    button.className = 'ccx-card-upsell__button';
    button.textContent = 'Abo aktivieren';

    const link = document.createElement('a');
    link.className = 'ccx-card-upsell__no_thanks';

    link.textContent = 'Nein, danke';
    if (pageType === 'cart') {
        link.addEventListener('click', (function (event) {
            event.preventDefault();
            document.querySelector('.ccx-card-upsell').remove();
        }))
    }

    bottom.appendChild(button);
    bottom.appendChild(link);

    // Assemble
    card.appendChild(top);
    card.appendChild(middle);
    card.appendChild(bottom);

    return card;
}

function removeEmojis() {
    const mobileCards = document.querySelectorAll('#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] [data-test="mobile-card-variant-payg"]');

    mobileCards.forEach(card => {
        //  if (card.firstChild.nodeType === Node.TEXT_NODE && card.firstChild.textContent.includes('🎉')) {
        // card.firstChild.remove();
        // console.log(card);

        const emojiContainer = card.querySelector('.flex > .mx-auto');
        console.log(emojiContainer);


        if (emojiContainer.firstChild.nodeType === Node.TEXT_NODE && emojiContainer.firstChild.textContent.includes('🎉')) {
            emojiContainer.firstChild.remove();
        }
    });
}

function init() {
    try {
        customLog(TEST_NAME + ' | ' + VARIATION);
        customLog('[init] Current URL: ' + CURRENT_URL);

        document.body.classList.add('ccx-omaze-de6-v1');
        customLog('[init] Added class ccx-omaze-de6-v1 to body');

        const currentPathName = window.location.pathname;

        const IS_CART_PAGE = currentPathName === '/cart';

        if (IS_CART_PAGE) {
            customLog('[init] on cart page');

            waitForElements(
                [
                    { selector: '#begin-checkout > .grid > :first-child', count: 1 },
                    { selector: '#begin-checkout [data-promo-price]', count: 1 },
                ],
                function (results) {
                    console.log('[waitForElements] Elements found', results);

                    const CONTROL_CART_PAGE_DETAILS_CONTAINER = results[0].elements;
                    // customLog(CONTROL_CART_PAGE_DETAILS_CONTAINER);

                    const CONTROL_CART_PAGE_PROMO_PRICE_ELEMENT = results[1].elements[0];
                    // customLog(CONTROL_CART_PAGE_PROMO_PRICE_ELEMENT);

                    const rawText = CONTROL_CART_PAGE_PROMO_PRICE_ELEMENT.textContent.trim(); // e.g. "25,00 €"
                    const match = rawText.match(/\d+/); // grabs first number sequence
                    const promoValue = match ? parseInt(match[0], 10) : null;

                    customLog('Extracted promo value:', promoValue);

                    // Find matching subscription in plansData
                    const matchingSubscription = plansData.subscriptions.find(
                        plan => parseInt(plan.price, 10) === promoValue
                    );

                    customLog('Matching subscription:', matchingSubscription);

                    const upsellCard = createUpsellCard('cart', matchingSubscription);
                    // insert upsell card after the cart page details container
                    CONTROL_CART_PAGE_DETAILS_CONTAINER[0].parentNode.insertBefore(upsellCard, CONTROL_CART_PAGE_DETAILS_CONTAINER[0].nextSibling);

                    // Add custom styles
                    addStyles(styles);
                }
            );
        }

        if (!IS_CART_PAGE) {
            customLog('[init] Not on cart page');

            waitForElements(
                [
                    { selector: '#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] .add-to-cart-button', count: 6 },
                    { selector: '#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] > div:nth-child(2).mx-auto > div', count: 1 },
                    { selector: '#enter-now-material-tab-buttons-design [id*=subscription-tab-pane] .add-to-cart-button', count: 3 },
                ],
                function (results) {
                    console.log('[waitForElements] Elements found', results);

                    const controlPAYGButtons = results[0].elements;
                    const controlPAYGContainer = results[1].elements[0];
                    const controlSUBSButtons = results[2].elements;

                    // Add custom styles
                    addStyles(styles);

                    removeEmojis();
                }
            );
        }

        awaitElementsDependingOnCurrentPage();
    } catch (error) {
        customLog(error.message);
    }
}

init();
