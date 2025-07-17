const LOG_ENABLED = true;
const TEST_NAME = "OZ20 | Remove discount for £10 PAYG";
const SOURCE_TYPE = "SOURCE = FACEBOOK";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

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
  @media (min-width: 1024px) {
    #enter-now-legacy-design post-order-discount-banner + div {
        margin-bottom: 4rem;
    }
  }
`;

const newCards = [
  { price: 15, entries: 20, isPAYG: true, position: "1" },
  { price: 10, entries: 100, isPAYG: false, strikeThrough: 15, pillText: '£5 OFF 1ST MONTH', position: "2" },
  { price: 20, entries: 30, isPAYG: true, position: "3" },
  { price: 30, entries: 45, isPAYG: true, position: "4" },
  { price: 50, entries: 85, isPAYG: true, position: "5" },
];

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

const setExclusiveOfferText = () => {
  const exclusiveOfferElement = document.querySelector('#enter-now-legacy-design post-order-discount-banner + div span');
  if (exclusiveOfferElement) {
    exclusiveOfferElement.textContent = 'Exclusive Offer: £5 OFF SUBSCRIPTIONS';
  }
}

const desktopChanges = () => {
  console.log('desktopChanges function started');

  if (!document) {
    console.log('document is not available');
    return;
  }

  console.log('document is available');

  const faceBookDesktopCards = document.querySelectorAll('#enter-now-legacy-design [data-test="desktop-card-variant-payg"]');

  console.log('faceBookDesktopCards:', faceBookDesktopCards);

  if (!faceBookDesktopCards) {
    console.log('faceBookDesktopCards is empty');
    return;
  }

  console.log('faceBookDesktopCards is not empty');

  faceBookDesktopCards.forEach((card, index) => {
    console.log('Processing card:', index);

    if (!card) {
      console.log('card is not available');
      return;
    }

    console.log('card is available');

    const subscriptionCard15 = document.querySelector('#enter-now-legacy-design .draw-entry-cards #social-sub-card-15');
    const topContainer = card.querySelector('.flex.flex-col.items-center');
    const button = card.querySelector('.add-to-cart-button');
    const strikeThrough = card.querySelector('.line-through');
    const entryCountElement = card.querySelector('[data-test="entry-count"]');
    const tagElement = card.querySelector('[data-test="entry-count"] + div');
    const priceElement = card.querySelector('[data-test="price"]');

    console.log('button:', button);
    console.log('strikeThrough:', strikeThrough);
    console.log('entryCountElement:', entryCountElement);
    console.log('tagElement:', tagElement);
    console.log('priceElement:', priceElement);
    console.log('topContainer:', topContainer);


    if (subscriptionCard15) {
      const subscriptionCardElement = document.querySelector('#enter-now-legacy-design .draw-entry-cards #social-sub-card-15 .flex.flex-col.items-center');
      if (subscriptionCardElement) {
        subscriptionCardElement.setAttribute('style', 'padding-top: 0 !important; padding-bottom: 19px !important; order: 16;');
      }

      const subscriptionCardButton = subscriptionCard15.querySelector('.add-to-cart-button');
      if (subscriptionCardButton) {
        const subscriptionCardButtonSpan = subscriptionCardButton.querySelector('.btn-text');
        if (subscriptionCardButtonSpan) {
          console.log('Setting subscriptionCardButtonSpan text to "Buy Now"');
          subscriptionCardButtonSpan.textContent = 'Buy Now';
        } else {
          console.log('subscriptionCardButtonSpan not found');
        }
      } else {
        console.log('subscriptionCardButton not found');
      }

      const subscriptionCardEntryContainer = subscriptionCard15.querySelector('[data-test="entry-count"]');
      console.log('subscriptionCardEntryContainer:', subscriptionCardEntryContainer);
      const subscriptionCardTagContainerElement = subscriptionCardEntryContainer.nextElementSibling;
      console.log('subscriptionCardTagContainerElement:', subscriptionCardTagContainerElement);
      if (subscriptionCardTagContainerElement) {
        const subscriptionCardTagText = subscriptionCardTagContainerElement.querySelector('.text-white');
        if (subscriptionCardTagText) {
          subscriptionCardTagText.setAttribute('style', 'font-size: 15px !important;');
        }
      }


    } else {
      console.log('subscriptionCard15 not found');
    }

    if (topContainer) {
      topContainer.setAttribute('style', 'padding-top: 0 !important; padding-bottom: 20px !important;');
    }

    if (button) {
      console.log('Removing data-discount-code attribute from button');
      button.removeAttribute('data-discount-code');
      console.log(button);
      const buttonText = button.querySelector('.btn-text');
      if (buttonText) {
        console.log('Setting button text to "Buy Now"');
        buttonText.textContent = 'Buy Now';
      }
    }

    if (entryCountElement) {
      console.log('Setting font-size to 20px on entryCountElement');
      entryCountElement.setAttribute('style', 'font-size: 20px !important');
    }

    if (strikeThrough) {
      console.log('Removing strikeThrough element');
      strikeThrough.remove();
    }

    if (tagElement) {
      console.log('Hiding tagElement');
      tagElement.style.visibility = 'hidden';
    }

    if (priceElement) {
      console.log('Price element found:', priceElement);
      console.log('Price element text content:', priceElement.textContent.trim());
      const priceText = priceElement.textContent.trim();
      const priceNumber = priceText.replace('£', '');

      console.log('priceNumber:', priceNumber);

      if (priceNumber === '45') {
        console.log('Price text is £45');
        priceElement.textContent = '£50';
      }

      if (priceNumber === '25') {
        console.log('Price text is £25');
        priceElement.textContent = '£30';
      }

      if (priceNumber === '10') {
        console.log('Price text is £10');
        priceElement.textContent = '£15';
      }
    }
  });
}

const mobileChanges = () => {
  const legacyDesignContainer = document.querySelector('#enter-now-legacy-design');
  console.log('legacyDesignContainer:', legacyDesignContainer);

  const facebookMobileCards = legacyDesignContainer.querySelectorAll('[data-test="mobile-card-variant-payg"]');
  const subscriptionCard = legacyDesignContainer.querySelector('.draw-entry-cards > div > div:nth-child(10)');

  if (facebookMobileCards.length > 0) {
    facebookMobileCards.forEach(card => {

      card.setAttribute('style', card.getAttribute('style') + '; width: 100% !important; padding: 1rem 1.5rem !important; box-shadow: 0px 2px 4px 0px #0000001A !important;');

      const leftSideContainer = card.querySelector('.flex.flex-col.items-start');
      console.log('Left side container:', leftSideContainer);

      const rightSideContainer = card.querySelector('.flex.flex-col.items-center');
      console.log('Right side container:', rightSideContainer);

      let entryCountElement;
      let priceElement;
      let strikeThroughElement;
      let labelContainer;
      let button;

      if (leftSideContainer) {
        entryCountElement = leftSideContainer.querySelector('[data-test="entry-count"]');
        console.log('Entry count element:', entryCountElement);

        labelContainer = leftSideContainer.querySelector('.flex.justify-center.items-center');
        console.log('Label container:', labelContainer);

        leftSideContainer.setAttribute('style', leftSideContainer.getAttribute('style') + '; padding: 0 !important; gap: 0 !important; line-height: normal !important; height: 57px !important; justify-content: center !important; align-items: center !important;');
        entryCountElement.setAttribute('style', entryCountElement.getAttribute('style') + '; font-size: 1rem !important;');
      }

      if (rightSideContainer) {
        priceElement = rightSideContainer.querySelector('.text-center.font-bold.leading-normal');
        priceElement.setAttribute('style', priceElement.getAttribute('style') + '; font-size: 2rem !important; color: #081F28 !important;');

        strikeThroughElement = rightSideContainer.querySelector('.line-through');
        console.log('Price element:', priceElement);

        button = rightSideContainer.querySelector('.add-to-cart-button');

        rightSideContainer.setAttribute('style', 'padding: 0 !important; justify-content: center !important;');
      }

      // Get the price element and place it just before the entry count element
      if (strikeThroughElement && entryCountElement) {
        strikeThroughElement.setAttribute('style', strikeThroughElement.getAttribute('style') + '; font-size: 2rem !important; color: #081F28 !important; margin: 0 !important; line-height: 2rem !important;');
        strikeThroughElement.classList.remove('line-through');


        entryCountElement.parentNode.insertBefore(strikeThroughElement, entryCountElement);
      }

      // If strike-through element exists, hide it
      if (priceElement) {
        priceElement.style.display = 'none'; // Hide the strike-through element
      }

      // if label container element exists, hide it
      if (labelContainer) {
        labelContainer.setAttribute('style', 'display: none !important;');
      }

      if (button) {
        button.removeAttribute('data-discount-code');
        button.setAttribute('style', button.getAttribute('style') + '; font-size: 1rem !important; margin: 0 !important;');
      }
    });
  }

  // Amend subscription card
  if (subscriptionCard) {

    let subscriptionButton;

    subscriptionCard.setAttribute('style', subscriptionCard.getAttribute('style') + '; width: 100% !important; padding: 1rem 1.5rem !important; box-shadow: 0px 2px 4px 0px #0000001A !important; justify-content: space-between !important;');

    const omazeSubscriptionLabel = subscriptionCard.querySelector('div:first-child');
    console.log('Omaze subscription label:', omazeSubscriptionLabel);

    const omazeSubscriptionLeftContainer = subscriptionCard.querySelector('.flex.flex-col.items-start');
    console.log('Omaze subscription left container:', omazeSubscriptionLeftContainer);

    const omazeSubscriptionRightContainer = subscriptionCard.querySelector('.flex.flex-col.items-center');
    console.log('Omaze subscription right container:', omazeSubscriptionRightContainer);

    if (omazeSubscriptionLeftContainer) {
      omazeSubscriptionLeftContainer.setAttribute('style', omazeSubscriptionLeftContainer.getAttribute('style') + '; margin: 0 !important;');
    }

    if (omazeSubscriptionRightContainer) {
      omazeSubscriptionLeftContainer.setAttribute('style', omazeSubscriptionLeftContainer.getAttribute('style') + '; margin: 0 !important;');

      subscriptionButton = omazeSubscriptionRightContainer.querySelector('.add-to-cart-button');
      subscriptionButton.setAttribute('style', subscriptionButton.getAttribute('style') + '; font-size: 1rem !important; margin: 0 !important;');
    }
  }

  // Amend postal service card
  const postalCardLink = legacyDesignContainer.querySelector('[href*=postal-entry]');
  if (postalCardLink) {
    const postalCard = postalCardLink.parentNode;
    console.log('postal card:', postalCard);
    postalCard.setAttribute('style', postalCard.getAttribute('style') + '; width: 100% !important;');
  }
}

async function init() {
  customLog(TEST_NAME + ' | ' + SOURCE_TYPE + ' | ' + VARIATION);
  customLog('[init] Current URL: ' + CURRENT_URL);
  customLog('[init] Environment: ' + ENVIRONMENT);

  document.body.classList.add('omaze-oz20-qa-v1');
  customLog('[init] Added class omaze-oz20-qa-v1 to body');

  try {
    const addToCartButtons = await Promise.all([
      DYO.waitForElementAsync('#enter-now-legacy-design .draw-entry-cards .add-to-cart-button', 13, 100, 150),
    ]);

    const enterNowButtons = addToCartButtons[0]; // Access the first result
    customLog('Enter Now buttons found:', enterNowButtons);

    // Add custom styles
    addStyles(styles);

    setExclusiveOfferText();

    desktopChanges();

    mobileChanges();

  } catch (error) {
    console.warn('[init] Error waiting for elements:', error);
  }
}

init();
