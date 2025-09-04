const LOG_ENABLED = true;
const TEST_NAME = "OZDE-5 | Entry Tab Removal";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const plansData = {
  payAsYouGo: [
    { icon: '★', bonusCount: '2', price: '10€', highlight: '20 Lose', name: 'Subscription 10€', order: 1, },
    { icon: '★', bonusCount: '4', price: '25€', highlight: '50 Lose', name: 'Subscription 25€', order: 3, },
    { icon: '★', bonusCount: '4', price: '35€', highlight: '70 Lose', name: 'Subscription 35€', order: 5, },
  ],
  subscriptions: [
    { icon: '★', bonusCount: '2', price: '10€', highlight: '20 + 1 Gratis Los', name: 'Subscription 10€', order: 2, },
    { icon: '★', bonusCount: '4', price: '25€', highlight: '50 + 4 Gratis Los', name: 'Subscription 25€', order: 4, },
    { icon: '★', bonusCount: '4', price: '35€', highlight: '70 + 6 Gratis Los', name: 'Subscription 35€', order: 6, },
  ],
}

const styles = `
entries-tab-nav[data-tab-container] {
  display: none !important;
}

[id*=single-purchase-tab-pane] > div:first-child {
  display: none;
}

[id*=single-purchase-tab-pane] > div.mx-auto > div .card-ticket-icon {
  display: none !important;
}

[id*=single-purchase-tab-pane] > div.mx-auto > div [data-test="mobile-card-variant-payg"]:not([class*=ccx]) {
  display: none !important;
}

[id*=single-purchase-tab-pane] > div.mx-auto > div [data-test="desktop-card-variant-payg"]:not([class*=ccx]) {
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

@media screen and (min-width: 768px) {
  .ccx-mobile-card {
    display: none;
  }

  .ccx-desktop-card {
    display: flex;
    width: 198px;
    height: 300px;
    border-radius: 20px;
    border-width: 1px;
    padding-top: 25px;
    padding-right: 8px;
    padding-left: 8px;
    opacity: 1;
    border: 1px solid #E6E6E6;
    background: white;
  }

  .ccx-desktop-card__inner-container {
    flex: 1;
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
    width: 183px;
    height: 53px;
    border-radius: 76px;
    padding-top: 12px;
    padding-right: 32px;
    padding-bottom: 14px;
    padding-left: 32px;
    opacity: 1;
    background: #FFDD00;
    font-family: Gellix;
    font-weight: 700;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #090F15;
  }




.ccx-desktop-card--subscription .ccx-desktop-card__highlight {
  color: #FFDD00;
  font-family: Gellix;
  font-weight: 700;
  font-size: 20px;
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
  if (document.querySelector('.ccx-styles-de1-v1')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  // Create a new <style> element
  const style = document.createElement('style');
  style.classList.add('ccx-styles-de1-v1');
  style.appendChild(document.createTextNode(css));

  // Append the style tag to the document head
  document.head.appendChild(style);
  customLog('Custom styles added.');
};

function createMobileCard(planData, type = 'subscription') {
  const card = document.createElement('div');
  card.className = `ccx-mobile-card ${type === 'subscription' ? 'ccx-mobile-card--subscription' : 'ccx-mobile-card--payg'} basis-1/5 flex-1`;
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
    ? `${planData.bonusCount} Bonus Verlosung`
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
  price.textContent = planData.price || '';

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
  card.className = `ccx-desktop-card ${type === 'subscription' ? 'ccx-desktop-card--subscription' : 'ccx-desktop-card--payg'} flex-1 max-w-[380px] basis-1/5 `;
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
    bonus.textContent = `${planData.bonusCount} Bonus Verlosung `;
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
  priceValue.textContent = planData.price || '';

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
    DYO.waitForElementAsync(selector, 9, 100, 150)
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

    document.body.classList.add('ccx-omaze-de5-v1');
    customLog('[init] Added class ccx-omaze-de5-v1 to body');

    waitForElements(
      ['#enter-now-material-tab-buttons-design .add-to-cart-button'],
      function (results) {
        console.log('[waitForElements] Elements found', results);

        // Add custom styles
        addStyles(styles);

        const controlMobileContainer = document.querySelector('#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] > div:nth-child(2).mx-auto > div')
        const controlDesktopContainer = document.querySelector('#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] > div:nth-child(2).mx-auto > div')

        if (controlMobileContainer) {
          plansData.payAsYouGo.forEach(planData => {
            const card = createMobileCard(planData, 'payg');
            controlMobileContainer.appendChild(card);
          });
          plansData.subscriptions.forEach(planData => {
            const card = createMobileCard(planData);
            console.log(card);
            controlMobileContainer.appendChild(card);
          });
        }

        if (controlDesktopContainer) {
          plansData.payAsYouGo.forEach(planData => {
            const card = createDesktopCard(planData, 'payg');
            controlDesktopContainer.appendChild(card);
          });
          plansData.subscriptions.forEach(planData => {
            const card = createDesktopCard(planData);
            console.log(card);
            controlDesktopContainer.appendChild(card);
          });
        }

      }
    );

  } catch (error) {
    customLog(error.message);
  }
}

init();