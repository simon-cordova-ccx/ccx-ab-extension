const LOG_ENABLED = true;
const TEST_NAME = "OZ20 | Remove discount for £10 PAYG";
const SOURCE_TYPE = "SOURCE = FACEBOOK";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

// Log function to output messages in a custom format
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

const pillSVG = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.31816 15.125C7.14878 15.125 6.97891 15.0911 6.80853 15.0234C6.63816 14.9555 6.48484 14.8538 6.34859 14.7183L1.28178 9.6515C1.14441 9.5145 1.04422 9.36319 0.981219 9.19756C0.918219 9.03206 0.886719 8.86369 0.886719 8.69244C0.886719 8.52119 0.918219 8.35038 0.981219 8.18C1.04422 8.00975 1.14441 7.8565 1.28178 7.72025L7.70872 1.28169C7.83322 1.15744 7.98041 1.05863 8.15028 0.98525C8.32003 0.91175 8.49547 0.875 8.67659 0.875H13.7622C14.1409 0.875 14.4628 1.00844 14.7278 1.27531C14.9927 1.54231 15.1251 1.86319 15.1251 2.23794V7.3235C15.1251 7.5065 15.0912 7.68088 15.0235 7.84663C14.9556 8.01238 14.8577 8.15675 14.7298 8.27975L8.28416 14.7183C8.14866 14.8538 7.99616 14.9555 7.82666 15.0234C7.65716 15.0911 7.48766 15.125 7.31816 15.125ZM12.1035 4.83406C12.3659 4.83406 12.5889 4.74294 12.7725 4.56069C12.9563 4.37844 13.0482 4.15706 13.0482 3.89656C13.0482 3.63419 12.9566 3.41119 12.7735 3.22756C12.5903 3.04381 12.368 2.95194 12.1063 2.95194C11.8448 2.95194 11.6227 3.0435 11.44 3.22662C11.2573 3.40975 11.166 3.63213 11.166 3.89375C11.166 4.15525 11.2572 4.37737 11.4394 4.56012C11.6217 4.74275 11.843 4.83406 12.1035 4.83406Z" fill="white"/>
  </svg>`;

const styles = `
  #enter-now-legacy-design post-order-discount-banner + div {
    width: 45%;
    margin: 0 auto;
    padding-bottom: 1rem !important;
    min-width: 337px !important;
    max-width: 356px !important;
  }
  #enter-now-legacy-design post-order-discount-banner + div > div {
    width: 100% !important;
  }
  #enter-now-legacy-design post-order-discount-banner + div span {
    font-size: 15px !important;
  }
  #enter-now-legacy-design .sse-main__subheader {
    display: none !important;
  }
  #enter-now-legacy-design .ccx-mobile-card-variant-payg {
    padding: 16px 24px !important;
    margin: 0 !important;
    box-shadow: 0px 2px 4px 0px #0000001A;
  }
  #enter-now-legacy-design .ccx-mobile-card-variant-payg__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  #enter-now-legacy-design .ccx-mobile-card-variant-payg__content-left {
    font-family: Gellix;
    font-weight: 700;
    font-size: 32px;
    letter-spacing: inherit;
    vertical-align: middle;
    text-align: center;
  }
  #enter-now-legacy-design .ccx-mobile-card-variant-payg__content-left .ccx_price {
    margin: 0;
    --tw-text-opacity: 1 !important;
    color: rgb(8 31 40 / var(--tw-text-opacity)) !important;
    letter-spacing: .42px !important;
    line-height: 1.5 !important;
    font-weight: 700 !important;
    font-size: 28px !important;
  }
  #enter-now-legacy-design .ccx-mobile-card-variant-payg__content-left .ccx_entries {
    font-family: Gellix;
    font-weight: 700;
    font-size: 16px;
    line-height: 100%;
    vertical-align: middle;
    margin: 0;
  }
  #enter-now-legacy-design .ccx-mobile-card-variant-payg__content .add-to-cart-button {
    margin: 0 !important;
    padding: 0 !important;
    width: 131px !important;
    height: 43px !important;
    opacity: 1;
    border-radius: 76px !important;
  }

  #enter-now-legacy-design .draw-entry-cards [data-test="mobile-card-variant-payg"]:not(.ccx-mobile-card-variant-payg) {
    display: none !important;
  }

  #enter-now-legacy-design .draw-entry-cards > div > div {
    width: 100% !important;
    box-shadow: 0px 2px 4px 0px #0000001A;
  }
  #enter-now-legacy-design .draw-entry-cards > div > [data-test="mobile-card-variant-payg"][class^="ccx-mobile-card"] {
    // display: block !important;
    width: 100% !important;
  }
  #enter-now-legacy-design .draw-entry-cards > div > .ccx-mobile-card-variant-subscription {
    // display: block !important;
    width: 100% !important;
    margin-top: 1.75rem !important;
  }



  .ccx-mobile-card-variant-payg__price {
    font-family: Gellix;
    font-weight: 700;
    font-size: 32px;
    line-height: 100%;
    vertical-align: middle;
  }
  .ccx-mobile-card-variant-payg__entries {
    font-family: Gellix;
    font-weight: 700;
    font-size: 16px;
    line-height: 100%;
    vertical-align: middle;
}



  
  .ccx-mobile-card-variant-subscription {
    padding: 16px 24px !important;
    margin: 0 !important;
    box-shadow: 0px 2px 4px 0px #0000001A !important;
    margin-top: 1rem !important;
  }
  .ccx-mobile-card-variant-subscription__label {
    width: 154px;
    height: 32px;
    opacity: 1;
    padding-top: 3px;
    padding-right: 10px;
    padding-bottom: 5px;
    padding-left: 10px;
    gap: 7px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: #212226;
    font-family: Gellix;
    font-weight: 700;
    font-size: 14px;
    line-height: 100%;
    vertical-align: middle;
    color: #FFFFFF;
    top: -2rem !important;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50% !important;
  }
  .ccx-mobile-card-variant-subscription__entries {
    font-family: Gellix;
    font-weight: 700;
    font-size: 26px;
    line-height: 100%;
    vertical-align: middle;
  }

  .ccx-mobile-card-variant-subscription__button.add-to-cart-button {
    margin: 0 !important;
    padding: 0 !important;
    width: 131px !important;
    height: 43px !important;
    opacity: 1;
    border-radius: 76px !important;
  }
  .ccx-mobile-card-variant-subscription__strikethrough {
    font-family: Gellix;
    font-weight: 700;
    font-size: 22px;
    line-height: 100%;
    vertical-align: bottom;
    color: #FF0000;
  }
  .ccx-mobile-card-variant-subscription__strikethrough-price {
    text-decoration: line-through;
  }
  .ccx-mobile-card-variant-subscription__strikethrough-month {
    font-family: Gellix;
    font-weight: 700;
    font-size: 14px;
    line-height: 100%;
    vertical-align: bottom;
    text-decoration: none;
  }
  .ccx-mobile-card-variant-subscription__pill-container {
    width: 161px;
    height: 26px;
    opacity: 1;
    padding-top: 4px;
    padding-right: 10px;
    padding-bottom: 4px;
    padding-left: 6px;
    gap: 6px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #0193A7;
    font-family: Gellix;
    font-weight: 700;
    font-size: 13px;
    line-height: 100%;
    vertical-align: bottom;
    color: #FFFFFF;
  }
  .ccx-mobile-card-variant-subscription__price-value {
    font-family: Gellix;
    font-weight: 700;
    font-size: 40px;
    line-height: 100%;
    text-align: right;
    vertical-align: bottom;
    color: #0193A7;
  }
  .ccx-mobile-card-variant-subscription__price-month {
    font-family: Gellix;
    font-weight: 700;
    font-size: 16px;
    line-height: 100%;
    text-align: right;
    vertical-align: bottom;
  }



  #enter-now-legacy-design .draw-entry-cards > div > div:nth-child(10) {
    display: none !important;
  }


  #enter-now-legacy-design [data-test="desktop-card-variant-payg"] .line-through {
    display: none;
  }

  #enter-now-legacy-design [data-test="desktop-card-variant-payg"] [data-test="entry-count"] + div {
    display: none !important;
  }
  #enter-now-legacy-design [data-test="desktop-card-variant-payg"] > div:first-child {
    padding-top: .625rem !important;
    padding-bottom: .625rem !important;
    height: 87px !important;
  }

  #enter-now-legacy-design [data-test="desktop-card-variant-payg"] [data-test="entry-count"] + div {
    display: none !important;
  }

  @media (min-width: 1024px) {
    #enter-now-legacy-design .draw-entry-cards > div > [data-test="mobile-card-variant-payg"][class^="ccx-mobile-card"] {
      display: none !important;
    }
    #enter-now-legacy-design .draw-entry-cards > div > .ccx-mobile-card-variant-subscription {
      display: none !important;
    }
  }
`;

const addStyles = (css) => {
  customLog('[addStyles] Starting the addStyles function...');

  if (!css) return;

  if (!css) {
    customLog('[addStyles] No CSS provided');
    return;
  }

  // Check if the style tag already exists
  if (document.querySelector('.ccx-omaze-oz20-v1')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  // Create a new <style> element
  const style = document.createElement('style');
  style.classList.add('ccx-omaze-oz20-v1');
  style.appendChild(document.createTextNode(css));

  // Append the style tag to the document head
  document.head.appendChild(style);
  customLog('Custom styles added.');
};

const newCards = [
  { price: 15, entries: 20, isPAYG: true, position: "1" },
  { price: 10, entries: 100, isPAYG: false, strikeThrough: 15, pillText: '£5 OFF 1ST MONTH', position: "2" },
  { price: 20, entries: 30, isPAYG: true, position: "3" },
  { price: 30, entries: 45, isPAYG: true, position: "4" },
  { price: 50, entries: 85, isPAYG: true, position: "5" },
];

function setExclusiveOfferText() {
  document.querySelector('#enter-now-legacy-design post-order-discount-banner + div span').textContent = 'Exclusive Offer: £5 OFF SUBSCRIPTIONS';
}

// Function to add mobile PAYG cards
function addMobilePayGCards(containerSelector, card) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.warn('[addMobilePayGCards] Container not found:', containerSelector);
    return;
  }

  // Only process PAYG card
  if (!card.isPAYG) return;

  // Outer container
  const outerDiv = document.createElement('div');
  outerDiv.className = 'ccx-mobile-card-variant-payg flex w-[348px] h-[135px] px-[24px] pt-0 pb-[6px] gap-4 flex-shrink-0 lg:hidden bg-white border-[1px] border-neutral-200 rounded-2xl text-center relative py-1 justify-between basis-1/5 flex-1';
  outerDiv.setAttribute('data-test', 'mobile-card-variant-payg');

  // Content container
  const contentDiv = document.createElement('div');
  contentDiv.className = 'ccx-mobile-card-variant-payg__content flex w-full h-full justify-between items-center';

  // Left container
  const leftDiv = document.createElement('div');
  leftDiv.className = 'ccx-mobile-card-variant-payg__left flex flex-col justify-center gap-1';

  // Price
  const price = document.createElement('div');
  price.className = 'ccx-mobile-card-variant-payg__price';
  price.textContent = `£${card.price}`;
  leftDiv.appendChild(price);

  // Entries
  const entries = document.createElement('div');
  entries.className = 'ccx-mobile-card-variant-payg__entries';
  entries.textContent = `${card.entries} Entries`;
  leftDiv.appendChild(entries);

  // Right container
  const rightDiv = document.createElement('div');
  rightDiv.className = 'ccx-mobile-card-variant-payg__right flex flex-col justify-center items-end';

  // Button
  const button = document.createElement('button');
  button.className = 'ccx-mobile-card-variant-payg__button add-to-cart-button px-4 py-2 rounded mt-2';
  button.textContent = 'Buy Now';
  rightDiv.appendChild(button);

  // Assemble the card
  contentDiv.appendChild(leftDiv);
  contentDiv.appendChild(rightDiv);
  outerDiv.appendChild(contentDiv);
  container.appendChild(outerDiv);
}

function addMobileSubscriptionCards(containerSelector, card) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.warn('[addMobileSubscriptionCards] Container not found:', containerSelector);
    return;
  }

  // Only process subscription card
  if (card.isPAYG) return;

  // Outer container
  const outerDiv = document.createElement('div');
  outerDiv.className = 'ccx-mobile-card-variant-subscription flex lg:hidden w-[348px] h-[135px] px-5 pb-[6px] justify-center items-center gap-4 flex-shrink-0 rounded-[10px] border-[3px] border-[#081F28] relative py-1 bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] mt-6';

  // Label container
  const labelDiv = document.createElement('div');
  labelDiv.className = 'ccx-mobile-card-variant-subscription__label absolute top-[-12px] left-1/2 transform -translate-x-1/2';
  labelDiv.textContent = 'Omaze Subscription';
  outerDiv.appendChild(labelDiv);

  // Content container
  const contentDiv = document.createElement('div');
  contentDiv.className = 'ccx-mobile-card-variant-subscription__content flex w-full h-full justify-between items-center gap-2';

  // Left container
  const leftDiv = document.createElement('div');
  leftDiv.className = 'ccx-mobile-card-variant-subscription__left flex flex-col text-left gap-1';

  // Entries
  const entries = document.createElement('div');
  entries.className = 'ccx-mobile-card-variant-subscription__entries';
  entries.textContent = `${card.entries} Entries`;
  leftDiv.appendChild(entries);

  // Price (strikethrough)
  const strikeThrough = document.createElement('div');
  strikeThrough.className = 'ccx-mobile-card-variant-subscription__strikethrough';
  const strikeThroughSpan = document.createElement('span');
  strikeThroughSpan.className = 'ccx-mobile-card-variant-subscription__strikethrough-price';
  strikeThroughSpan.textContent = `£${card.strikeThrough || card.price}`;
  const strikeThroughMonthSpan = document.createElement('span');
  strikeThroughMonthSpan.className = 'ccx-mobile-card-variant-subscription__strikethrough-month';
  strikeThroughMonthSpan.textContent = '/month';
  strikeThrough.appendChild(strikeThroughSpan);
  strikeThrough.appendChild(strikeThroughMonthSpan);
  leftDiv.appendChild(strikeThrough);

  // Pill container
  const pillContainer = document.createElement('div');
  pillContainer.className = 'ccx-mobile-card-variant-subscription__pill-container flex items-center mt-1';

  // Pill SVG
  const pillSvg = document.createElement('span');
  pillSvg.className = 'ccx-mobile-card-variant-subscription__pill-svg';
  pillSvg.innerHTML = pillSVG;
  pillContainer.appendChild(pillSvg);

  // Pill text
  const pillText = document.createElement('span');
  pillText.className = 'ccx-mobile-card-variant-subscription__pill-text';
  pillText.textContent = '£5 OFF 1ST MONTH';
  pillContainer.appendChild(pillText);
  leftDiv.appendChild(pillContainer);

  // Right container
  const rightDiv = document.createElement('div');
  rightDiv.className = 'ccx-mobile-card-variant-subscription__right flex flex-col justify-center items-end gap-1';

  // Price (repeated in right)
  const priceRight = document.createElement('div');
  priceRight.className = 'ccx-mobile-card-variant-subscription__price';
  const priceSpan = document.createElement('span');
  priceSpan.className = 'ccx-mobile-card-variant-subscription__price-value';
  priceSpan.textContent = `£${card.price}`;
  const monthSpan = document.createElement('span');
  monthSpan.className = 'ccx-mobile-card-variant-subscription__price-month';
  monthSpan.textContent = '/month';
  priceRight.appendChild(priceSpan);
  priceRight.appendChild(monthSpan);
  rightDiv.appendChild(priceRight);

  // Button
  const button = document.createElement('button');
  button.className = 'ccx-mobile-card-variant-subscription__button add-to-cart-button px-4 py-2 rounded mt-2';
  button.textContent = 'Buy Now';
  rightDiv.appendChild(button);

  // Assemble the card
  contentDiv.appendChild(leftDiv);
  contentDiv.appendChild(rightDiv);
  outerDiv.appendChild(contentDiv);
  container.appendChild(outerDiv);
}

const waitForElements = async function (elementSelector) {
  customLog('[waitForElements] Starting to wait for elements...');

  try {
    const results = await Promise.all([
      DYO.waitForElementAsync(elementSelector, 13, 100, 150),
    ]);
    const enterNowButtons = results[0]; // Access the first result
    customLog('Enter Now buttons found:', enterNowButtons);

    // Add custom styles
    addStyles(styles);

    // Sort cards by position and append in order
    const sortedCards = [...newCards].sort((a, b) => Number(a.position) - Number(b.position));
    const containerSelector = '#enter-now-legacy-design .draw-entry-cards > div';
    sortedCards.forEach(card => {
      if (card.isPAYG) {
        addMobilePayGCards(containerSelector, card);
      } else {
        addMobileSubscriptionCards(containerSelector, card);
      }
    });

    setExclusiveOfferText();

  } catch (error) {
    console.warn('[waitForElements] Error waiting for elements:', error);
  }
};

async function init() {
  try {
    customLog(TEST_NAME + ' | ' + SOURCE_TYPE + ' | ' + VARIATION);
    customLog('[init] Current URL: ' + CURRENT_URL);
    customLog('[init] Environment: ' + ENVIRONMENT);

    document.body.classList.add('omaze-oz20-qa-v1');
    customLog('[init] Added class omaze-oz20-qa-v1 to body');

    waitForElements('#enter-now-legacy-design .draw-entry-cards .add-to-cart-button')

  } catch (error) {
    console.error(error.message);
  }
}

init();
