const LOG_ENABLED = true;
const TEST_NAME = "OZDE-6 | Remove discount for £10 PAYG";
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
  display: none !important;
}

[id*=single-purchase-tab-pane]>div.mx-auto>div [data-test="desktop-card-variant-payg"]:not([class*=ccx]) {
  display: none !important;
}

.ccx-mobile-card {
  width: 100%;
  border-radius: 10px;
  border-width: 1px;
  padding: 16px 0;
  background: #081F28;
  border: 1px solid #ECF0F4;
  box-shadow: 0px 2px 4px 0px #0000001A;
  height: 151px;
}

.ccx-mobile-card__top {
  margin-bottom: 0.75rem;
}

.ccx-mobile-card__bonus {
  width: 260px;
  height: 30px;
  border-radius: 99px;
  padding: 0 4px 0 10px;
  background: #F4F3E0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ccx-mobile-card__icon {
  display: none;
}

.ccx-mobile-card__bonus-text {
  font-family: Gellix;
  font-weight: 700;
  font-size: 16px;
  color: #C06717;
  margin-right: 0.25rem;
}

.ccx-mobile-card__bonus-subtext {
  font-family: Gellix;
  font-weight: 700;
  font-size: 16px;
  color: #000000;
}

.ccx-mobile-card__bottom {
  display: flex;
  justify-content: space-around;
  height: 82px;
  align-items: center;
}

.ccx-mobile-card__left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.ccx-mobile-card__right {
  flex: 1;
}

.ccx-mobile-card__price-container {
  width: 114px;
  height: 38px;
}

.ccx-mobile-card__price {
  font-family: Gellix;
  font-weight: 700;
  font-size: 32px;
  color: white;
}

.ccx-mobile-card__price-unit {
  font-family: Gellix;
  font-weight: 400;
  font-size: 15px;
  color: white;
}

.ccx-mobile-card__highlight {
  font-family: Gellix;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #FFDD00;
  width: 175px;
  height: 44px;
}

.ccx-mobile-card__button {
  background: #FFDD00;
  width: 145px;
  height: 48px;
  border-radius: 76px;
  font-family: Gellix;
  font-weight: 700;
  font-size: 18px;
  color: #090F15;
}

.ccx-mobile-card__button:hover {
  color: #000;
  background-color: #fdee8c;
}

.ccx-mobile-card--payg {
  background: #FFFFFF;
}

.ccx-mobile-card--payg .ccx-mobile-card__price {
  color: #081F28;
}

.ccx-mobile-card--payg .ccx-mobile-card__highlight {
  color: #081F28;
  margin-top: 14px;
}

.ccx-desktop-card {
  display: none;
}





.ccx-card-upsell.ccx-card-upsell--root {
    max-width: 348px;
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

.ccx-card-upsell__headline strong {
    font-family: Gellix;
    font-weight: 700;
    font-size: 18px;
    line-height: 100%;
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
    text-decoration: underline;
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












@media screen and (min-width: 1024px) {
  .ccx-mobile-card {
    display: none;
  }

  .ccx-desktop-card {
    border-width: 1px;
    position: relative;
    display: flex;
    height: 300px;
    border-radius: 20px;
    border: 1px solid #E6E6E6;
    background: white;
    padding-top: 25px;
    padding-right: 8px;
    padding-left: 8px;
    opacity: 1;
    max-width: 380px;
    min-width: 150px;
    flex: 1 1 calc(16.66% - 16px) !important;
    max-width: 198px !important;
  }

  .ccx-desktop-card__inner-container {
    flex: 1;
    width: 100%;
    max-width: 380px;
  }

  .ccx-desktop-card__highlight {
    font-family: Gellix;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
    text-align: center;
    vertical-align: middle;
    height: 24px;
    opacity: 1;
    margin-bottom: 8px;
  }

  .ccx-desktop-card__bonus {
    opacity: 1;
    font-family: Gellix;
    font-size: 14px;
    line-height: 120%;
    text-align: center;
    vertical-align: middle;
    border-bottom: 1px solid #87C7CA;
    height: 50px;
  }

  .ccx-desktop-card__bonus p {
    font-size: inherit;
  }

  .ccx-desktop-card__bottom {
    margin-top: 14.5px;
  }

  .ccx-desktop-card__price {
    height: 65px;
    opacity: 1;
    font-family: Gellix;
    font-weight: 700;
    font-size: 46px;
    vertical-align: middle;
    line-height: 51px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ccx-desktop-card.ccx-desktop-card--subscription {
    background: #081F28;
  }

  .ccx-desktop-card__button {
    margin-top: 29.5px;
    width: 100%;
    height: 53px;
    border-radius: 76px;
    padding-top: 12px;
    padding-bottom: 14px;
    opacity: 1;
    background: #FFDD00;
    font-family: Gellix;
    font-weight: 700;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #090F15;
  }

  .ccx-desktop-card__button:hover,
  .ccx-desktop-card__button:focus {
    color: #000;
    background-color: #fdee8c;
    outline: none;
    text-decoration: none;
    cursor: pointer;
  }


  .ccx-desktop-card--subscription .ccx-desktop-card__highlight {
    color: #FFDD00;
    font-family: Gellix;
    font-weight: 700;
    font-size: clamp(17px, 1.5vw, 20px) !important;
    line-height: 100%;
    text-align: center;
    vertical-align: middle;
  }

  .ccx-desktop-card--subscription .ccx-desktop-card__bonus {
    font-family: Gellix;
    font-weight: 700;
    font-style: Bold;
    font-size: 14px;
    leading-trim: NONE;
    line-height: 120%;
    letter-spacing: 1.5%;
    text-align: center;
    vertical-align: middle;
    color: white;
  }

  .ccx-desktop-card--subscription .ccx-desktop-card__price {
    display: flex;
    flex-flow: column;
    height: 79px;
  }

  .ccx-desktop-card--subscription .ccx-desktop-card__price-value {
    font-family: Gellix;
    font-weight: 700;
    font-size: 46px;
    line-height: 150%;
    text-align: center;
    vertical-align: middle;
    color: white;
  }

  .ccx-desktop-card--subscription .ccx-desktop-card__price-span {
    font-family: Gellix;
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    vertical-align: middle;
    color: #FFFFFF;
  }

  .ccx-desktop-card--subscription .ccx-desktop-card__button {
    margin-top: 14.5px;
  }
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

function createMobileCard(planData, type = 'subscription') {
    const card = document.createElement('div');
    card.className = 'ccx-mobile-card ' + (type === 'subscription' ? 'ccx-mobile-card--subscription' : 'ccx-mobile-card--payg') + ' basis-1/5 flex-1';
    card.style.order = planData.order;
    card.setAttribute('data-test', "mobile-card-variant-payg");

    const top = document.createElement('div');
    top.className = 'ccx-mobile-card__top';

    const bonus = document.createElement('div');
    bonus.className = 'ccx-mobile-card__bonus';

    const icon = document.createElement('span');
    icon.className = 'ccx-mobile-card__icon';
    icon.textContent = planData.icon || '';

    const bold = document.createElement('strong');
    bold.className = 'ccx-mobile-card__bonus-text';
    bold.textContent = planData.bonusCount
        ? planData.bonusCount + ' Bonus Verlosung'
        : 'Bonus Verlosung';

    const span = document.createElement('span');
    span.className = 'ccx-mobile-card__bonus-subtext';
    span.textContent = ' inklusive';

    const bottom = document.createElement('div');
    bottom.className = 'ccx-mobile-card__bottom';

    const left = document.createElement('div');
    left.className = 'ccx-mobile-card__left';

    const priceContainer = document.createElement('div');
    priceContainer.className = 'ccx-mobile-card__price-container';

    const price = document.createElement('span');
    price.className = 'ccx-mobile-card__price';
    price.textContent = planData.price + '€' || '';

    if (type === 'subscription') {
        const priceSpan = document.createElement('span');
        priceSpan.className = 'ccx-mobile-card__price-unit';
        priceSpan.textContent = '/Monat';
        priceContainer.append(price, priceSpan);
    } else {
        priceContainer.append(price);
    }

    const highlight = document.createElement('div');
    highlight.className = 'ccx-mobile-card__highlight';
    highlight.textContent = planData.highlight || '';

    const right = document.createElement('div');
    right.className = 'ccx-mobile-card__right';

    const button = document.createElement('button');
    button.className = 'ccx-mobile-card__button';
    button.textContent = 'Mitmachen';

    bonus.append(icon, bold, span);
    left.append(priceContainer, highlight);
    right.append(button);
    top.append(bonus);
    bottom.append(left, right);
    card.append(top, bottom);

    return card;
}

function createDesktopCard(planData, type = 'subscription') {
  const card = document.createElement('div');
  card.className = 'ccx-desktop-card ' + (type === 'subscription' ? 'ccx-desktop-card--subscription' : 'ccx-desktop-card--payg') + ' flex-1 max-w-[380px] basis-1/5';
  card.style.order = planData.order;

  const inner = document.createElement('div');
  inner.className = 'ccx-desktop-card__inner-container';

  const top = document.createElement('div');
  top.className = 'ccx-desktop-card__top';

  // Highlight
  const highlight = document.createElement('div');
  highlight.className = 'ccx-desktop-card__highlight';
  highlight.textContent = planData.highlight || '';

  // Bonus
  const bonus = document.createElement('div');
  bonus.className = 'ccx-desktop-card__bonus';
  if (planData.bonusCount) {
    bonus.textContent = planData.bonusCount + ' Bonus Verlosung ';
  } else {
    bonus.textContent = 'Bonus Verlosung ';
  }
  const inklusive = document.createElement('p');
  inklusive.textContent = 'inklusive';
  bonus.appendChild(inklusive);

  // Bottom
  const bottom = document.createElement('div');
  bottom.className = 'ccx-desktop-card__bottom';

  const price = document.createElement('div');
  price.className = 'ccx-desktop-card__price';

  const priceValue = document.createElement('span');
  priceValue.className = 'ccx-desktop-card__price-value';
  priceValue.textContent = planData.price + '€' || '';

  price.appendChild(priceValue);

  // Only add /Monat for subscription cards
  if (type === 'subscription') {
    const priceSpan = document.createElement('span');
    priceSpan.className = 'ccx-desktop-card__price-span';
    priceSpan.textContent = '/Monat';
    price.appendChild(priceSpan);
  }

  const button = document.createElement('button');
  button.className = 'ccx-desktop-card__button';
  button.textContent = 'Mitmachen';

  // Assemble
  bottom.append(price, button);
  top.append(highlight, bonus, bottom);
  inner.append(top);
  card.append(inner);

  return card;
}

function createUpsellCard(planIndex, planPrice, entriesAmount) {
    customLog('[createUpsellCard] Creating upsell card...');

    console.log(planIndex, planPrice, entriesAmount);

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
        'Aktualisieren <strong>Du Ihre</strong> Bestellung – und <strong>keine Ziehung entgeht Ihnen</strong>';
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
    price.innerHTML = planPrice + '€<span>/Monat</span>';

    const entries = document.createElement('div');
    entries.className = 'ccx-card-upsell__entries';
    entries.textContent = entriesAmount + ' + 1 Gratis Los';

    priceContainer.appendChild(price);
    priceContainer.appendChild(entries);
    middle.appendChild(priceContainer);

    // Bottom section
    const bottom = document.createElement('div');
    bottom.className = 'ccx-card-upsell__bottom';

    const button = document.createElement('button');
    button.className = 'ccx-card-upsell__button';
    button.textContent = 'Bestellung aufwerten';

    const link = document.createElement('a');
    link.className = 'ccx-card-upsell__no_thanks';
    link.href = '#';
    link.textContent = 'Nein danke';

    bottom.appendChild(button);
    bottom.appendChild(link);

    // Assemble
    card.appendChild(top);
    card.appendChild(middle);
    card.appendChild(bottom);

    return card;
}

function bindUpsellElements(upsellCard, matchingControlButton, skipButton) {
    customLog('[bindUpsellElements] Binding upsell elements...');

    console.log('mathcingControlButton:', matchingControlButton);

    const controlSubscriptionButtons = document.querySelectorAll('#enter-now-material-tab-buttons-design [id*=subscription-tab-pane] .add-to-cart-button');

     // Find the matching control button
      const matchingControlSubscriptionButton = Array.from(controlSubscriptionButtons).find(button => {
        const controlPrice = extractPriceFromControlButton(button);
        // Log comparison for each control button
        customLog('Comparing control button price:', controlPrice, 'with price:', price);
        return controlPrice === price;
      });

    const upsellButton = upsellCard.querySelector('.ccx-card-upsell__button');
    const upsellNoThanks = upsellCard.querySelector('.ccx-card-upsell__no_thanks');

    if (matchingControlButton) {
        const entriesAttr = matchingControlPAYGButton.getAttribute('data-entries-amount'); // "50 Lose"
        const entriesNumber = parseInt(entriesAttr, 10); // 50

        console.log(entriesNumber);
    }

    if (upsellButton) {
        upsellButton.addEventListener('click', () => {
            customLog('[bindUpsellElements] Upsell button clicked');
            // matchingControlButton.click();
        });
    }

    if (upsellNoThanks) {
        upsellNoThanks.addEventListener('click', (e) => {
            e.preventDefault();
            customLog('[bindUpsellElements] No thanks clicked');
            matchingControlButton.click();
        });
    }
    
    if (skipButton) {
        skipButton.addEventListener('click', () => {
            customLog('[bindUpsellElements] Skip button clicked');
            matchingControlButton.click();
        });
    }
}

function setupPaygButtonClicks(plansData, controlPaygButtons) {
    // Select all new PAYG buttons (mobile and desktop)
    const newPaygButtons = document.querySelectorAll('.ccx-mobile-card--payg .ccx-mobile-card__button, .ccx-desktop-card--payg .ccx-desktop-card__button');

    // Log the number of new PAYG buttons found
    customLog('New PAYG buttons found:', newPaygButtons.length, 'Buttons:', Array.from(newPaygButtons).map(btn => btn.outerHTML));

    // Log the number of control PAYG buttons and their data-entries-amount values
    customLog('Control PAYG buttons found:', controlPaygButtons.length, 'Buttons:', Array.from(controlPaygButtons).map(btn => ({
        html: btn.outerHTML,
        entriesAmount: btn.getAttribute('data-entries-amount')
    })));

    // Function to extract number from data-entries-amount (e.g., "20" from "20 Lose")
    function extractNumberFromEntries(element) {
        const value = element.getAttribute('data-entries-amount');
        if (value) {
            const match = value.match(/^\d+/);
            return match ? match[0] : null;
        }
        return null;
    }

    // Add click event listeners to new PAYG buttons
    newPaygButtons.forEach((newButton, index) => {
        newButton.addEventListener('click', () => {
            // Calculate the correct plansData index (handles both mobile and desktop)
            const planIndex = index % plansData.payAsYouGo.length;

            // Get the price and entriesAmount from plansData for this button
            const price = plansData.payAsYouGo[planIndex].price;
            const entriesAmount = plansData.payAsYouGo[planIndex].entriesAmount;

            // Log the clicked button, price, and entriesAmount
            customLog('Clicked button:', newButton.outerHTML, 'Price:', price, 'EntriesAmount:', entriesAmount);

            // Find the matching control button
            const matchingControlButton = Array.from(controlPaygButtons).find(button => {
                const controlEntriesAmount = extractNumberFromEntries(button);
                // Log comparison for each control button
                customLog('Comparing control button:', button.getAttribute('data-entries-amount'), 'with entriesAmount:', entriesAmount);
                return controlEntriesAmount === entriesAmount;
            });

            // Programmatically click the matching control button
            if (matchingControlButton) {
                customLog('Found matching control button:', matchingControlButton.outerHTML);

                console.log('Plan index:', planIndex);

                // if (planIndex != 0) { // if it is not the €10 PAYG card
                //     matchingControlButton.click();
                //     return;
                // }

                // if (planIndex == 0) { // if it is the €10 PAYG card
                    // Show alert message
                    customLog('PAYG 10 € button clicked');

                    const header = document.querySelector('#enter-now-material-tab-buttons-design > [id*=nav-latest] > div:first-child h1');
                    if (header) {
                        header.textContent = 'JETZT ZUM OMAZE-ABO UPGRADEN';
                        header.classList.add('ccx-header-upgrade');
                    }

                    const headerNestedDivs = document.querySelectorAll('#enter-now-material-tab-buttons-design > [id*=nav-latest] > div:first-child > div');
                    headerNestedDivs.forEach(div => {
                        div.setAttribute("style", "display: none !important;");
                    });

                    const singlePurchaseTabPane = document.querySelector('#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane]');
                    if (singlePurchaseTabPane) {
                        singlePurchaseTabPane.setAttribute("style", "display: none !important;");

                        const upsellCard = createUpsellCard(planIndex, price, entriesAmount);

                        // Insert upsell card after singlePurchaseTabPane
                        singlePurchaseTabPane.insertAdjacentElement('afterend', upsellCard);

                        // Create skip container
                        const skipContainer = document.createElement('div');
                        skipContainer.className = 'ccx-skip';

                        const skipButton = document.createElement('button');
                        skipButton.textContent = 'Skip'; // Change text if needed

                        skipContainer.appendChild(skipButton);

                        // Insert skip container after the upsell card
                        upsellCard.insertAdjacentElement('afterend', skipContainer);

                        bindUpsellElements(upsellCard, matchingControlButton, skipButton);

                        customLog('[createUpsellCard] Inserted upsell card and skip container');
                    } else {
                        customLog('[createUpsellCard] singlePurchaseTabPane not found');
                    }
                // }

            } else {
                console.error('No control button found for price: ' + price + ', entriesAmount: ' + entriesAmount);
            }

        });
    });
}

function waitForElements(selectors, numberOfElementsToWaitFor, callback) {
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
        DYO.waitForElementAsync(selector, numberOfElementsToWaitFor, 100, 150)
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

function init() {
    try {
        customLog(TEST_NAME + ' | ' + VARIATION);
        customLog('[init] Current URL: ' + CURRENT_URL);

        document.body.classList.add('ccx-omaze-de6-v1');
        customLog('[init] Added class ccx-omaze-de6-v1 to body');

        waitForElements(
            ['#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] .add-to-cart-button'], 6,
            function (results) {
                // console.log('[waitForElements] Elements found', results);

                const controlPayAsYouGoButtons = document.querySelectorAll('#enter-now-material-tab-buttons-design [id*=nav-latest] [id*=single-purchase-tab-pane] [data-test="mobile-card-variant-payg"] .add-to-cart-button');

                const controlSubscriptionButtons = document.querySelectorAll('#enter-now-material-tab-buttons-design [id*=subscription-tab-pane] .add-to-cart-button');

                // Add custom styles
                addStyles(styles);

                const controlMobileContainer = document.querySelector('#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] > div:nth-child(2).mx-auto > div');
                const controlDesktopContainer = document.querySelector('#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] > div:nth-child(2).mx-auto > div');

                if (!controlMobileContainer || !controlDesktopContainer) return;

                if (controlMobileContainer) {
                    plansData.payAsYouGo.forEach(planData => {
                        const card = createMobileCard(planData, 'payg');
                        controlMobileContainer.appendChild(card);
                    });
                    //   plansData.subscriptions.forEach(planData => {
                    //     const card = createMobileCard(planData);
                    //     controlMobileContainer.appendChild(card);
                    //   });
                }

                if (controlDesktopContainer) {
                  plansData.payAsYouGo.forEach(planData => {
                    const card = createDesktopCard(planData, 'payg');
                    controlDesktopContainer.appendChild(card);
                  });

                //   plansData.subscriptions.forEach(planData => {
                //     const card = createDesktopCard(planData);
                //     controlDesktopContainer.appendChild(card);
                //   });
                }

                setupPaygButtonClicks(plansData, controlPayAsYouGoButtons);

                //   setupSubscriptionButtonClicks(plansData, controlSubscriptionButtons);

            }
        );

    } catch (error) {
        customLog(error.message);
    }
}

init();