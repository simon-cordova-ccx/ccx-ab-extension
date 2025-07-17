const LOG_ENABLED = true;

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
  console.log('legacyDesignContainer:', legacyDesignContainer);

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

  } catch (error) {
    console.warn('[init] Error waiting for elements:', error);
  }
}

init();
