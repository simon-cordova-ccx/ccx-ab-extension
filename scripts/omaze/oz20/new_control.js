const LOG_ENABLED = false;

const styles = `
  #enter-now-legacy-design post-order-discount-banner + div {
    margin: 0 auto;
  }
`;

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

const mobileChanges = () => {
  const legacyDesignContainer = document.querySelector('#enter-now-legacy-design');
  // console.log('legacyDesignContainer:', legacyDesignContainer);

  if (!legacyDesignContainer) return;

  const facebookMobileCards = legacyDesignContainer.querySelectorAll('[data-test="mobile-card-variant-payg"]');

  if (facebookMobileCards.length === 0) return;

  facebookMobileCards.forEach(card => {
    card.setAttribute('style', card.getAttribute('style') + '; width: 100% !important;');
  });

  const subscriptionCard = legacyDesignContainer.querySelector('.draw-entry-cards > div > div:nth-child(10)')

  // Amend subscription card
  if (subscriptionCard) {

    let subscriptionButton;

    subscriptionCard.setAttribute('style', subscriptionCard.getAttribute('style') + '; width: 100% !important; padding: 1rem 1.5rem !important; box-shadow: 0px 2px 4px 0px #0000001A !important; justify-content: space-between !important;');

    const omazeSubscriptionLeftContainer = subscriptionCard.querySelector('.flex.flex-col.items-start');
    // console.log('Omaze subscription left container:', omazeSubscriptionLeftContainer);

    const omazeSubscriptionRightContainer = subscriptionCard.querySelector('.flex.flex-col.items-center');
    // console.log('Omaze subscription right container:', omazeSubscriptionRightContainer);

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
    // console.log('postal card:', postalCard);
    postalCard.setAttribute('style', postalCard.getAttribute('style') + '; width: 100% !important;');
  }

  // new amends
  const mobileSubCard25 = document.querySelector('#enter-now-legacy-design .draw-entry-cards > div > div:nth-child(12)');
  if (mobileSubCard25) {
    mobileSubCard25.setAttribute('style', mobileSubCard25.getAttribute('style') + '; width: 100% !important; justify-content: space-between !important;');
  }
}

const SELECTORS = {
  ORIGINAL_CONTAINER: "#enter-now-material-tab-buttons-design",
  SHOPIFY_CONTAINERS: "main .shopify-section > div",
  NAV_BUTTON_FIRST: "#enter-now-material-tab-buttons-design nav button:nth-child(1)",
  ENTER_NOW_LEGACY_DESIGN: '#enter-now-legacy-design'
};

const showCorrectContainer = (containerToShow) => {
  // customLog('[showCorrectContainer] Starting function');

  const shopifySectionContainers = document.querySelectorAll(SELECTORS.SHOPIFY_CONTAINERS);

  const correctContainer = document.querySelector(containerToShow);

  if (!correctContainer) {
    customLog('[showCorrectContainer] ERROR: correctContainer not found');
    throw new Error('correctContainer not found');
  }


  // customLog('[showCorrectContainer] Found Shopify containers:', shopifySectionContainers);

  if (shopifySectionContainers && shopifySectionContainers.length > 0) {
    // customLog('[showCorrectContainer] Shopify containers found:', shopifySectionContainers.length);

    shopifySectionContainers.forEach(shopifyContainer => {

      // if the shopifyContainer has an id
      if (shopifyContainer.id) {
        // customLog('[showCorrectContainer]', 'ID:', shopifyContainer.id);

        // add class d-none to the shopifyContainer
        shopifyContainer.classList.add('d-none');
        shopifyContainer.setAttribute('style', 'display: none !important;');

        // customLog('[showCorrectContainer] Added d-none class and style to container');

        // customLog('[showCorrectContainer] Found original main container:', correctContainer);

        correctContainer.classList.remove('d-none');
        correctContainer.setAttribute('style', 'display: block !important;');

        // customLog('[showCorrectContainer] Removed d-none class and added style to original main container');

      }
    });

  } else {
    customLog('[showCorrectContainer] No Shopify containers found');
  }
}

async function init() {
  document.body.classList.add('omaze-oz20-control');
  customLog('[init] Added class omaze-oz20-control to body');

  try {
    const addToCartButtons = await Promise.all([
      DYO.waitForElementAsync('#enter-now-legacy-design .draw-entry-cards .add-to-cart-button', 13, 100, 150),
    ]);

    const enterNowButtons = addToCartButtons[0]; // Access the first result
    customLog('Enter Now buttons found:', enterNowButtons);

    // Add custom styles
    addStyles(styles);

    mobileChanges();

    showCorrectContainer(SELECTORS.ENTER_NOW_LEGACY_DESIGN);

  } catch (error) {
    console.warn('[init] Error waiting for elements:', error);
  }
}

init();
