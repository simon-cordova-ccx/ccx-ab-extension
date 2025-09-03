const LOG_ENABLED = true;
const TEST_NAME = "OZDE-5 | Entry Tab Removal";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const plansData = {
  subscriptions: [
    { icon: '★', bonusCount: '2', price: '10€', highlight: '20 + 1 Gratis Los', name: 'Subscription 10€' },
    { icon: '★', bonusCount: '4', price: '25€', highlight: '50 + 4 Gratis Los', name: 'Subscription 25€' },
    { icon: '★', bonusCount: '4', price: '35€', highlight: '70 + 6 Gratis Los', name: 'Subscription 35€' }
  ],
  payAsYouGo: [
    { icon: '★', bonusCount: '2', price: '10€', highlight: '20 + 1 Gratis Los', name: 'Subscription 10€' },
    { icon: '★', bonusCount: '4', price: '25€', highlight: '50 + 4 Gratis Los', name: 'Subscription 25€' },
    { icon: '★', bonusCount: '4', price: '35€', highlight: '70 + 6 Gratis Los', name: 'Subscription 35€' }
  ]
}

const styles = `
entries-tab-nav[data-tab-container] {
  display: none !important;
}

[id*=single-purchase-tab-pane]>div:first-child {
  display: none;
}

[id*=single-purchase-tab-pane]>div.mx-auto>div .card-ticket-icon {
  display: none !important;
}

.ccx-subscription-mobile-card {
  width: 100%;
  border-radius: 10px;
  border-width: 1px;
  padding-top: 16px;
  padding-bottom: 16px;
  opacity: 1;
  background: #081F28;
  border: 1px solid #ECF0F4;
  box-shadow: 0px 2px 4px 0px #0000001A;
  height: 151px;
}

.ccx-subscription-mobile-top {
  margin-bottom: 0.75rem;
}

.ccx-subscription-mobile-bonus {
  width: 260px;
  height: 30px;
  border-radius: 99px;
  padding-right: 4px;
  padding-left: 10px;
  opacity: 1;
  background: #F4F3E0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
}

.ccx-subscription-mobile-icon {
  display: none;
}

strong.ccx-subscription-mobile-bold {
  font-family: Gellix;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  vertical-align: bottom;
  color: #C06717;
  margin-right: 0.25rem;
}

span.ccx-subscription-mobile-span {
  font-family: Gellix;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  vertical-align: bottom;
  color: #000000;
}

.ccx-subscription-mobile-bottom {
  padding-right: 16px;
  padding-left: 16px;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  height: 82px;
  align-items: center;
}

.ccx-subscription-mobile-left {
  width: 175px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.ccx-subscription-mobile-price-container {
  width: 114px;
  height: 38px;
}



span.ccx-subscription-mobile-price {
  font-family: Gellix;
  font-weight: 700;
  font-size: 32px;
  line-height: 100%;
  vertical-align: middle;
  color: white;
}

span.ccx-subscription-mobile-price-span {
  font-family: Gellix;
  font-weight: 400;
  font-size: 15px;
  line-height: 100%;
  vertical-align: bottom;
  color: white;
}

.ccx-subscription-mobile-highlight {
  font-family: Gellix;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  color: #FFDD00;
  width: 175px;
  height: 44px;
}

.ccx-subscription-mobile-button {
  background: #FFDD00;
  width: 145px;
  height: 48px;
  border-radius: 76px;
  padding-top: 10px;
  padding-right: 24px;
  padding-bottom: 11px;
  padding-left: 24px;
  opacity: 1;
  font-family: Gellix;
  font-weight: 700;
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  color: #090F15;
}

.ccx-subscription-mobile-button:hover {
  color: #000;
  background-color: #fdee8c;
  outline: none;
  text-decoration: none;
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

function createMobileSubscriptionCard(planData) {
  const card = document.createElement('div');
  card.className = 'ccx-subscription-mobile-card md:hidden basis-1/5 flex-1';

  const top = document.createElement('div');
  top.className = 'ccx-subscription-mobile-top';

  const bonus = document.createElement('div');
  bonus.className = 'ccx-subscription-mobile-bonus';

  const icon = document.createElement('span');
  icon.className = 'ccx-subscription-mobile-icon';
  icon.textContent = planData.icon || '';

  const bold = document.createElement('strong');
  bold.className = 'ccx-subscription-mobile-bold';
  bold.textContent = planData.bonusCount ? `${planData.bonusCount} Bonus Verlosung` : 'Bonus Verlosung';

  const span = document.createElement('span');
  span.className = 'ccx-subscription-mobile-span';
  span.textContent = ' inklusive';

  const bottom = document.createElement('div');
  bottom.className = 'ccx-subscription-mobile-bottom';

  const left = document.createElement('div');
  left.className = 'ccx-subscription-mobile-left';

  const priceContainer = document.createElement('div');
  priceContainer.className = 'ccx-subscription-mobile-price-container';

  const price = document.createElement('span');
  price.className = 'ccx-subscription-mobile-price';
  price.textContent = planData.price || '';

  const priceSpan = document.createElement('span');
  priceSpan.className = 'ccx-subscription-mobile-price-span';
  priceSpan.textContent = '/Monat' || '';

  const highlight = document.createElement('div');
  highlight.className = 'ccx-subscription-mobile-highlight';
  highlight.textContent = planData.highlight || '';

  const right = document.createElement('div');
  right.className = 'ccx-subscription-mobile-right';

  const button = document.createElement('button');
  button.className = 'ccx-subscription-mobile-button';
  button.textContent = 'Mitmachen';
  button.setAttribute('aria-label', `Join ${planData.name} plan`);

  bonus.append(icon, bold, span);
  priceContainer.append(price, priceSpan);
  left.append(priceContainer, highlight);
  right.append(button);
  top.append(bonus);
  bottom.append(left, right);
  card.append(top, bottom);

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

        const targetElement = document.querySelector('#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] > div:nth-child(2).mx-auto > div')

        if (targetElement) {
          plansData.subscriptions.forEach(planData => {
            const card = createMobileSubscriptionCard(planData);
            targetElement.appendChild(card);
          });
        }

      }
    );

  } catch (error) {
    customLog(error.message);
  }
}

init();