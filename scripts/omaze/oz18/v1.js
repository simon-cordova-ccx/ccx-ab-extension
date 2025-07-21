console.log('OMAZE - OZ18 - V1');

const CURRENT_URL = window.location.href;
const TEST_NAME = "OZ13";
const IS_CART_PAGE = CURRENT_URL.includes('https://omaze.co.uk/cart') || CURRENT_URL.includes('https://staging.omaze.co.uk/cart');
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";
const IMAGE_COTSWOLD_HOUSE = 'https://cdn-eu.dynamicyield.com/api/9880449/images/de9c194e1f65.jpg';
const IMAGE_LONDON_HOUSE = 'https://cdn-eu.dynamicyield.com/api/9880449/images/16384128bfbe.jpg';
const OMAZE_IMAGE_HEART_IN_HAND = "https://cdn-eu.dynamicyield.com/api/9880449/images/7a5283a9c1df.png";
const OMAZE_IMAGE_INFO_ICON = "https://cdn-eu.dynamicyield.com/api/9880449/images/00e4e24eb8d2.png";

let REGION;
const LOG_ENABLED = false;

// This is a custom logging function named customLog.
// It takes a variable number of arguments(...messages) and logs them to the console with a specific style, but only if LOG_ENABLED is true.
// If a message is an HTML element, it's logged as is; otherwise, it's converted to uppercase and logged with the specified style.
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

const waitForElementsWithTimeout = (selector, minElements, callback, checkInterval, timeout) => {
  checkInterval = checkInterval || 200;
  timeout = timeout || 10000;

  var intervalId = setInterval(function () {
    var elements = document.querySelectorAll(selector);
    if (elements.length >= minElements) {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      callback(elements);
    }
  }, checkInterval);

  var timeoutId = setTimeout(function () {
    clearInterval(intervalId);
    console.warn("Selector '" + selector + "' did not return at least " + minElements + " elements within " + timeout + "ms");
  }, timeout);
}

// This JavaScript function determines the region based on the utm_source URL parameter, returning 'facebook', 'klaviyo', 'other digital', or 'no source' accordingly.
function getRegionFromUTM() {
  const urlParams = new URLSearchParams(window.location.search);
  let region;

  const source = urlParams.get('utm_source');

  if (source && source.trim() !== '') {
    if (source === 'facebook' || source === 'klaviyo') {
      region = source;
    } else {
      region = 'other digital';
    }
  } else {
    region = 'no source';
  }

  return region;
}

if (!IS_CART_PAGE) {
  const VARIATION = "NEW CONTROL";

  const SELECTOR_SHOPIFY_CONTAINERS = 'main .shopify-section > div';
  const SELECTOR_ORIGINAL_MAIN_CONTAINER = '#enter-now-material-tab-buttons-design';
  const OMAZE_IMAGE_TICKET_ICON = 'https://cdn-eu.dynamicyield.com/api/9880449/images/ac47a5312560__omaze_ticket.png';


  const addStyles = () => {
    // Check if the style tag already exists
    if (document.querySelector('.ccx-styles')) {
      customLog('Custom styles already exist.');
      return;
    }

    // Create a new <style> element
    const style = document.createElement('style');
    style.classList.add('ccx-styles');
    style.textContent = `

  .ccx-postal-entry-card {
    font-family: Gellix;
    font-weight: 700;
    font-size: 12px;
    line-height: 14.4px;
    text-align: center;
    position: relative;
  }
  .ccx-postal-entry-card__mobile-container .text-2xl {
    font-family: Gellix;
    font-weight: 700;
    font-size: 12px !important;
    line-height: 14.4px !important;
  }
  .ccx-postal-entry-card__mobile-container .text-base {
    line-height: 14.4px !important;
    font-size: 12px !important;
    text-align: center;
  }
  .ccx-postal-entry-card__entry-note {
    font-family: Gellix;
    font-weight: 700;
    font-size: 10px;
    line-height: 12px;
  }
  .ccx-postal-entry-card__divider {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
    .ccx-postal-entry-card__desktop-container {
    font-family: Gellix;
    font-size: 18px !important;
  }
  .ccx-postal-entry-card__desktop-container span {
    font-size: 14px;
  }
  .ccx-postal-entry-card__divider img {
    width: 57px;
    height: 59px;
  }

  @media screen and (min-width: 1024px) {
    .ccx-postal-entry-card {
      font-family: Gellix;
      font-weight: 700;
      font-size: 12px;
      line-height: 14.4px;
      padding-left: 0.5rem !important;
      padding-right: 0.5rem !important;
    }
    .ccx-postal-entry-card__desktop-container {
      font-family: Gellix;
      font-size: 18px !important;
      height: auto !important;
      margin-bottom: 0 !important;
      width: 100% !important;
    }
    ..ccx-postal-entry-card__desktop-container br:first-child {
      display: none !important;
    }
    .ccx-postal-entry-card__divider {
      display: none !important;
    }
    .ccx-postal-entry-card__entry-note {
      display: none !important;
    }
    .ccx-postal-entry-card__mobile-container .text-2xl {
      font-size: initial !important;
    }
  }

  @media screen and (min-width: 1215px) {
    .ccx-postal-entry-card__desktop-container {
      margin: 1rem 0 !important;
      margin-bottom: 20px !important;
    }
  }

  `;

    // Append the style tag to the document head
    document.head.appendChild(style);
    customLog('Custom styles added.');
  };

  function updatePostalEntryCard() {

    let postalContainer;
    const postalLink = document.querySelector('#enter-now-legacy-design .draw-entry-cards [href*="postal-entry"]');
    if (postalLink) {
      postalContainer = postalLink.closest('.bg-white.border-neutral-200.rounded-2xl');
    }

    if (!postalContainer) {
      console.error('postalContainer not found');
      return;
    }

    postalContainer.classList.add('ccx-postal-entry-card');

    // Mobile container
    const mobileContainer = postalContainer.querySelector('.ccx-postal-entry-card > div:nth-child(1)');
    if (!mobileContainer) {
      console.error('mobileContainer not found');
      return;
    }
    mobileContainer.classList.add('ccx-postal-entry-card__mobile-container');

    // Desktop container
    const desktopContainer = postalContainer.querySelector('.ccx-postal-entry-card > div:nth-child(2)');
    if (!desktopContainer) {
      console.error('desktopContainer not found');
      return;
    }

    desktopContainer.classList.add('ccx-postal-entry-card__desktop-container');
    desktopContainer.insertAdjacentHTML('beforeend', '<br /><span>1 entry per postcard</span>');

    const mobileSpan = document.createElement('span');
    if (!mobileSpan) {
      console.error('Failed to create mobileSpan element');
      return;
    }
    mobileSpan.textContent = '1 entry per postcard';
    mobileSpan.classList.add('ccx-postal-entry-card__entry-note');
    mobileSpan.classList.add('ccx-postal-entry-card__entry-note--mobile');
    if (!mobileContainer.appendChild(mobileSpan)) {
      console.error('Failed to append mobileSpan to mobileContainer');
      return;
    }

    if (mobileContainer.insertAdjacentHTML('afterend', "<div class='ccx-postal-entry-card__divider'><img src='" + OMAZE_IMAGE_TICKET_ICON + "'></div>")) {
      console.error('Failed to insert divider HTML');
      return;
    }
  }

  async function initiateEntryPageChanges() {
    REGION = getRegionFromUTM();

    customLog(TEST_NAME + " | " + REGION + " | " + " | " + VARIATION);

    // Set session storage item to check against the cart page
    sessionStorage.setItem('oz13', 'true');

    DYO.waitForElementAsync(
      '#enter-now-legacy-design [data-test="card-variant-subscription"] a .add-to-cart-button',
      2,
      200,
      100
    ).then(function (elements) {

      elements.forEach(function (button) {
        button.innerText = 'Buy Now';

        button.addEventListener('click', function (event) {
          event.preventDefault();

          const closestLink = button.closest('a');
          if (!closestLink) return;

          const originalHref = closestLink.getAttribute('href') || '';

          let isSubscription25 = originalHref.includes('subscriptions-25');
          let domain = IS_STAGING_ENV ? 'https://staging.omaze.co.uk' : 'https://omaze.co.uk';
          let newHref;

          if (IS_STAGING_ENV) {
            if (isSubscription25) {
              newHref = domain + '/pages/omaze-subscriptions-25?utm_source=twitter';
            } else {
              newHref = domain + '/pages/omaze-subscriptions?utm_source=twitter';
            }
          } else {
            let returnTo = isSubscription25
              ? '/cart/add?items[][id]=41644844220502%26items[][quantity]=1%26items[][selling_plan]=572096598'
              : '/cart/add?items[][id]=41644844187734%26items[][quantity]=1%26items[][selling_plan]=572096598';

            newHref = domain + '/cart/clear?return_to=' + returnTo;
          }

          window.location.href = newHref;
        });

      });

      updatePostalEntryCard();
      addStyles();
    });
  }

  initiateEntryPageChanges();
}

if (IS_CART_PAGE) {
  const VARIATION = "V1 - SUBS ONLY";

  const callOutContainerOne = (entries) => {
    const container = document.createElement('div');
    container.classList.add('ccx-callout', 'ccx-callout--primary');

    container.innerHTML = '<p class="ccx-callout__title">Subscribe now:</p>' +
      '<div class="ccx-callout__text">' +
      '<span class="ccx-callout__entries">' + entries + ' Entries</span> <span> into the </span> <span class="ccx-callout__draw">London House Draw</span>' +
      '</div>' +
      '<div class="ccx-callout__support">' +
      '<img class="ccx-callout__icon" src="' + OMAZE_IMAGE_HEART_IN_HAND + '" alt="Supporting Icon">' +
      '<span>Supporting The King\'s Trust</span>' +
      '</div>';

    return container;
  };

  const callOutContainerTwo = (entries) => {
    const container = document.createElement('div');
    container.classList.add('ccx-callout', 'ccx-callout--secondary');

    container.innerHTML = '<p class="ccx-callout__title">On subscription renewal:</p>' +
      '<div class="ccx-callout__text">' +
      '<span class="ccx-callout__entries">' + entries + ' Entries</span> <span> into the </span> <span class="ccx-callout__draw">Cotswolds House Draw</span>' +
      '</div>' +
      '<div class="ccx-callout__support">' +
      '<img class="ccx-callout__icon" src="' + OMAZE_IMAGE_HEART_IN_HAND + '" alt="Supporting Icon">' +
      '<span>Supporting Guide Dogs</span>' +
      '</div>';

    return container;
  };

  const insertInfoBanner = () => {
    const referenceEl = document.querySelector('subscription-cart-container > div > div > div > hr:nth-child(5)');
    if (!referenceEl) return;

    const price = getPriceFromStepper();
    const entries = getEntryCountFromPrice(price);
    if (!entries) return;

    const banner = document.createElement('div');
    banner.classList.add('ccx-info-banner');

    banner.innerHTML = '<div class="ccx-info-banner__icon-container">' +
      '<img class="ccx-info-banner__icon" src="' + OMAZE_IMAGE_INFO_ICON + '" alt="Information Icon">' +
      '</div>' +
      '<div class="ccx-info-banner__content">' +
      '<p class="ccx-info-banner__text">' +
      'With an active subscription you’ll get <span class="ccx-info-banner__entries">' + entries + '</span> automatic entries into the new ' +
      '<span class="ccx-info-banner__draw-name">Omaze Million Pound House Draw</span>, every month. ' +
      'You don’t need to do a thing. Just let those entries roll in, for your chance to win!' +
      '</p>' +
      '</div>';

    referenceEl.parentNode.insertBefore(banner, referenceEl.nextSibling);
  };

  const getPriceFromStepper = () => {
    const el = document.querySelector('[data-test=total-price-stepper]');
    if (!el) return null;

    const match = el.textContent.match(/£(\d+)/);
    if (!match) return null;

    return parseInt(match[1], 10); // extract the number (e.g. 10)
  }

  const insertSubscribeHeader = () => {
    const targetEl = document.querySelector('[data-test="house-name-stepper"]');
    if (!targetEl) return;

    const header = document.createElement('h3');
    header.classList.add('ccx-subscribe-header');
    header.textContent = 'Subscribe to Save with Omaze';

    targetEl.parentNode.insertBefore(header, targetEl.nextSibling);
  };

  function getEntryCountFromPrice(price) {
    if (price === 10) return 60;
    if (price === 25) return 200;
    if (price === 50) return 640;
    return null; // fallback
  }

  function isPriceInCart(priceToMatch) {
    if (!window.dataLayer || !Array.isArray(window.dataLayer)) {
      return false;
    }

    return window.dataLayer.some(function (event) {
      return event.ecommerce?.items?.some(function (item) {
        return item.price === priceToMatch;
      });
    });
  }

  const insertFlexImageSection = () => {
    const target = document.querySelector('.overflow-hidden');
    if (!target) return;

    // Create main flex container
    const flexContainer = document.createElement('div');
    flexContainer.classList.add('ccx-house-images');

    // ----- First Image Block (London House) -----
    const londonBlock = document.createElement('div');
    londonBlock.classList.add('ccx-house-images__block');

    const londonImg = document.createElement('img');
    londonImg.classList.add('ccx-house-images__image');
    londonImg.src = IMAGE_LONDON_HOUSE;
    londonImg.alt = 'London House';

    const londonCaption = document.createElement('span');
    londonCaption.classList.add('ccx-house-images__caption', 'ccx-house-images__caption--top');
    londonCaption.textContent = 'London House';

    londonBlock.appendChild(londonImg);
    londonBlock.appendChild(londonCaption);

    // ----- Second Image Block (Cotswolds House) -----
    const cotswoldsBlock = document.createElement('div');
    cotswoldsBlock.classList.add('ccx-house-images__block');

    const cotswoldsImg = document.createElement('img');
    cotswoldsImg.classList.add('ccx-house-images__image');
    cotswoldsImg.src = IMAGE_COTSWOLD_HOUSE;
    cotswoldsImg.alt = 'Cotswolds House';

    const cotswoldsCaption = document.createElement('span');
    cotswoldsCaption.classList.add('ccx-house-images__caption', 'ccx-house-images__caption--bottom');
    cotswoldsCaption.textContent = 'Cotswolds House';

    cotswoldsBlock.appendChild(cotswoldsImg);
    cotswoldsBlock.appendChild(cotswoldsCaption);

    // Append blocks to main container
    flexContainer.appendChild(londonBlock);
    flexContainer.appendChild(cotswoldsBlock);

    // Insert after target
    target.parentNode.insertBefore(flexContainer, target.nextSibling);
  };

  const addStyles = () => {
    // Check if the style tag already exists
    if (document.querySelector('.ccx-styles')) {
      customLog('Custom styles already exist.');
      return;
    }

    // Create a new <style> element
    const style = document.createElement('style');
    style.classList.add('ccx-styles');
    style.textContent = `

    #begin-checkout > div.block-table > subscription-cart-container > div > div > div > div.w-full.relative.h-36.rounded-xl.overflow-hidden {
      display: none;
    }

    .ccx-house-images {
      display: flex;
      gap: 5px;
      background: rgba(255, 221, 0, 1);
      border-radius: 10px;
    }

    .ccx-house-images__block {
      position: relative;
    }

    .ccx-house-images__image {
      display: block;
      width: 180px;
      height: 100%;
    }

    .ccx-house-images > .ccx-house-images__block:nth-child(1) > img {
      border-radius: 10px 0 0 10px;
    }
    
    .ccx-house-images > .ccx-house-images__block:nth-child(2) > img {
      border-radius: 0 10px 10px 0;
    }

    .ccx-house-images__caption {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
      padding-top: 4px;
      padding-right: 10px;
      padding-bottom: 4px;
      padding-left: 10px;
      background: rgba(255, 221, 0, 1);
      font-weight: 700;
      text-align: center;
      color: rgba(8, 31, 40, 1);
      height: 25px;
      line-height: 15px;
    }

    .ccx-house-images__caption--top {
      top: 0;
      width: 122px;
      border-radius: 0 0 10px 10px;
    }

    .ccx-house-images__caption--bottom {
      bottom: 0;
      width: 130px;
      border-radius: 10px 10px 0 0;
    }

    [data-test="house-name-stepper"],
    [data-test="charity-stepper"] {
      display: none;
    }

    .ccx-subscribe-header {
      font-family: Gellix;
      font-weight: 700;
      font-size: 20px;
      line-height: 100%;
    }

    .ccx-callout {
      padding: 7px 10px 10px 13px;
      border-radius: 6px;
      margin-bottom: 12px;
      display: flex;
      flex-flow: column;
      gap: 5px;
    }
    
    .ccx-callout.ccx-callout--primary {
      border: 0.3px solid rgba(1, 147, 167, 1);
      background: rgba(1, 147, 167, 0.07);
      margin-top: 12px;
    }

    .ccx-callout.ccx-callout--secondary {
      background: rgba(255, 221, 0, 0.2);
      border: 0.3px solid rgba(239, 128, 21, 1);
    }

    .ccx-callout__title {
      font-family: Gellix;
      font-weight: 700;
      font-size: 16px;
      line-height: 100%;
      color: rgba(8, 31, 40, 1);
      margin: 0;
    }

    .ccx-callout__text {
      font-size: 15px !important;
    }

    .ccx-callout__entries {
      color: #0094a9;
      font-weight: 700;
      font-size: 15px;
    }

    .ccx-callout__draw {
      font-weight: 700;
    }

    .ccx-callout__support {
      margin: 0;
      display: flex;
      font-size: 15px;
      align-items: center;
      gap: 0.5rem;
    }

    .ccx-callout__icon {
      width: 18px;
      height: 18px;
    }

    .ccx-callout.ccx-callout--secondary + .text-base.mb-0 {
        display: none;
    }

    #begin-checkout > div.block-table > subscription-cart-container > div > div .ccx-info-banner + p {
      display: none !important;
    }

    .ccx-info-banner {
      display: flex;
    }

    .ccx-info-banner__icon-container {
      flex-basis: 20%;
    }

    .ccx-info-banner__icon {
      width: 15px;
      height: 15px;
    }

    .ccx-info-banner__text {
      font-family: Gellix;
      font-weight: 400;
      font-size: 13px;
      line-height: 15px;
    }

    .ccx-info-banner__draw-name {
      font-family: Gellix;
      font-weight: 700;
      font-size: 13px;
      line-height: 15px;
    }

    .section--cart .cart-attribute__field {
      padding: 0;
      border: none;
    }

  `;

    // Append the style tag to the document head
    document.head.appendChild(style);
    customLog('Custom styles added.');
  };

  async function initiateCartPageChanges() {
    try {
      REGION = getRegionFromUTM();

      customLog(TEST_NAME + " | " + REGION + " | " + VARIATION);

      if (IS_CART_PAGE) {
        DYO.waitForElementAsync('[data-test=total-price-stepper]', 1, 100, 100).then(() => {
          const price = getPriceFromStepper();
          const entries = getEntryCountFromPrice(price);

          if (!entries) {
            customLog("Unsupported price found:", price);
            return;
          }

          customLog("Extracted price:", price, "| Mapped entries:", entries);

          DYO.waitForElementAsync(
            '#begin-checkout>div.block-table>subscription-cart-container>div>div>div>div:nth-child(4)>div',
            1, 100, 100
          ).then(function (elements) {

            // Add styles
            addStyles();

            // Add callout elements
            const target = elements[0];
            const first = callOutContainerOne(entries);
            const second = callOutContainerTwo(entries);

            target.parentNode.insertBefore(first, target.nextSibling);
            target.parentNode.insertBefore(second, first.nextSibling);

            // Add info banner container
            insertInfoBanner();

            // Insert Subscribe Header
            insertSubscribeHeader();

            insertFlexImageSection();
          });
        });

        // waitForElementsWithTimeout('[data-test=total-price-stepper]', 1, function () {
        //   var price = getPriceFromStepper();
        //   var entries = getEntryCountFromPrice(price);

        //   if (!entries) {
        //     customLog("Unsupported price found:", price);
        //     return;
        //   }

        //   customLog("Extracted price:", price, "| Mapped entries:", entries);

        //   waitForElementsWithTimeout(
        //     '#begin-checkout>div.block-table>subscription-cart-container>div>div>div>div:nth-child(4)>div',
        //     1,
        //     function (elements) {
        //       // Add styles
        //       addStyles();

        //       // Add callout elements
        //       var target = elements[0];
        //       var first = callOutContainerOne(entries);
        //       var second = callOutContainerTwo(entries);

        //       target.parentNode.insertBefore(first, target.nextSibling);
        //       target.parentNode.insertBefore(second, first.nextSibling);

        //       // Add info banner container
        //       insertInfoBanner();

        //       // Insert Subscribe Header
        //       insertSubscribeHeader();

        //       insertFlexImageSection();
        //     },
        //     100,
        //     10000
        //   );
        // }, 100, 10000);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  initiateCartPageChanges();
}