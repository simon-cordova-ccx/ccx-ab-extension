const LOG_ENABLED = true;
const TEST_NAME = "OZ - DE - V1";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

// Selectors for the Shopify containers
const SELECTOR_SHOPIFY_CONTAINERS = 'main .shopify-section > div[id*=enter-now-]';
const SELECTOR_CONTAINER_ENTER_NOW_MATERIAL_TAB_BUTTONS_DESIGN = '#enter-now-material-tab-buttons-design';
const SELECTOR_CONTAINER_ENTER_NOW_MATERIAL_TAB_BUTTONS_DESIGN_PRESELECT_PAYG = '#enter-now-material-tab-buttons-design-preselect-payg';
const SELECTOR_CONTAINER_ENTER_NOW_BIG_TAB_BUTTONS_DESIGN = '#enter-now-big-tab-buttons-design';
const SELECTOR_CONTAINER_ENTER_NOW_LEGACY_DESIGN = '#enter-now-legacy-design';
const SELECTOR_CONTAINER_ENTER_NOW_LEGACY_DESIGN_NO_SUBS = '#enter-now-legacy-design-no-subs';
const SELECTOR_CONTAINER_ENTER_NOW_LEGACY_DESIGN_NO_SUBS_LOWER_PRICE_POINTS = '#enter-now-legacy-design-no-subs-lower-price-points';

// Selectors for the buttons
const SELECTOR_CONTAINER_ENTER_NOW_MATERIAL_TAB_BUTTONS_DESIGN_BUTTONS = '#enter-now-material-tab-buttons-design .add-to-cart-button';
const SELECTOR_ENTER_NOW_LEGAGY_DESIGN_BUTTONS = '#enter-now-legacy-design [data-test*=card-variant] .add-to-cart-button';

const newTrophyIcon = '<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.802 5.321C7.761 5.359 7.75 5.396 7.75 5.423V10.961C7.75 12.361 8.136 13.561 8.833 14.398C9.516 15.216 10.548 15.75 12 15.75C13.452 15.75 14.484 15.216 15.167 14.398C15.864 13.562 16.25 12.361 16.25 10.961V5.423C16.25 5.396 16.24 5.359 16.198 5.321C16.1427 5.27421 16.0724 5.24899 16 5.25H8C7.92759 5.24899 7.85727 5.27421 7.802 5.321ZM6.25 5.423C6.25 4.443 7.091 3.75 8 3.75H16C16.909 3.75 17.75 4.444 17.75 5.423V5.75H19C19.966 5.75 20.75 6.534 20.75 7.5V9.5C20.75 11.408 19.223 12.921 17.443 13.203C17.2193 13.9905 16.8368 14.7239 16.319 15.358C15.466 16.38 14.259 17.046 12.75 17.21V19.75H15C15.1989 19.75 15.3897 19.829 15.5303 19.9697C15.671 20.1103 15.75 20.3011 15.75 20.5C15.75 20.6989 15.671 20.8897 15.5303 21.0303C15.3897 21.171 15.1989 21.25 15 21.25H9C8.80109 21.25 8.61032 21.171 8.46967 21.0303C8.32902 20.8897 8.25 20.6989 8.25 20.5C8.25 20.3011 8.32902 20.1103 8.46967 19.9697C8.61032 19.829 8.80109 19.75 9 19.75H11.25V17.21C9.741 17.045 8.534 16.38 7.681 15.358C7.16324 14.7239 6.78073 13.9905 6.557 13.203C4.777 12.92 3.25 11.408 3.25 9.5V7.5C3.25 6.534 4.034 5.75 5 5.75H6.25V5.423ZM6.25 7.25H5C4.9337 7.25 4.87011 7.27634 4.82322 7.32322C4.77634 7.37011 4.75 7.4337 4.75 7.5V9.5C4.75 10.41 5.394 11.238 6.272 11.582C6.25754 11.3756 6.25021 11.1689 6.25 10.962V7.25ZM17.728 11.582C18.606 11.238 19.25 10.41 19.25 9.5V7.5C19.25 7.4337 19.2237 7.37011 19.1768 7.32322C19.1299 7.27634 19.0663 7.25 19 7.25H17.75V10.961C17.75 11.1697 17.7427 11.3767 17.728 11.582Z" fill="#626262"/></svg>';

const styles = `
  #enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] > div:first-child {
    display: none !important;
  }
  #enter-now-material-tab-buttons-design [id*=subscription-tab-pane] > div:first-child > div:first-child {
    display: none !important;
  }
  #enter-now-material-tab-buttons-design [data-test="card-variant-subscription"] .p-4.text-left > .flex {
    align-items: center;
  }
  #enter-now-material-tab-buttons-design [data-test="card-variant-subscription"] .text-lg.pb-2.pl-4.flex-1 {
    padding-bottom: 0 !important;
  }
  #enter-now-material-tab-buttons-design [data-test="card-variant-subscription"] .text-lg.pb-2.pl-4.flex-1 p {
    margin-bottom: 0 !important;
    font-size: 14px;
  }
  #enter-now-material-tab-buttons-design [id*=nav-latest] h1 {
    margin-top: 2rem;
  }
  #enter-now-material-tab-buttons-design [id*=nav-latest] > div:nth-child(1) > div:nth-child(4) {
    align-items: center !important;
  }
  #enter-now-material-tab-buttons-design [id*=nav-latest] > div:nth-child(1) > div:nth-child(4) svg {
    margin: 0 !important;
  }
  #enter-now-material-tab-buttons-design [id*=nav-latest] > div > div:nth-child(3) > p {
    color: #626262;
    line-height: 16px;
    font-weight: 700 !important;
  }
  #enter-now-material-tab-buttons-design [id*=nav-latest] > div > div:nth-child(3) > p > b{
    color: initial;
  }
  #enter-now-material-tab-buttons-design [id*=nav-latest] > div > div:nth-child(4) .text-base.font-bold {
    color: #626262;
  }
  @media (max-width: 768px) {
    #enter-now-material-tab-buttons-design [id*=nav-latest] h1 {
      margin-top: 2rem;
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

const showCorrectContainer = (containerToShow) => {
  // customLog('[showCorrectContainer] Starting function');

  const shopifySectionContainers = document.querySelectorAll(SELECTOR_SHOPIFY_CONTAINERS);

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

    applyVariationChanges(correctContainer);

  } else {
    customLog('[showCorrectContainer] No Shopify containers found');
  }
}

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

const applyVariationChanges = (container) => {
  customLog('[applyVariationChanges] Starting the applyVariationChanges function...');
  console.log(container);

  const sectionHeader = container.querySelector('h1');
  if (sectionHeader) {
    sectionHeader.textContent = 'Wähle DEINE teilnAhme';
  }

  const sectionSubTitle = container.querySelector('p');
  if (sectionSubTitle) {
    sectionSubTitle.innerHTML = `Dieses 2,5 Mio. € Haus am Plauer See plus 100.000€ Startkapital könnten bald dir gehören, während du die <strong>SOS - Kinderdörfer weltweit</strong> unterstützt.`;
  }

  const aboveTrophyContainer = container.querySelector('[id*=nav-latest] > div:first-child > div:nth-child(3)');
  if (aboveTrophyContainer) {
    const paragraph = aboveTrophyContainer.querySelector('p');
    if (paragraph) {
      paragraph.innerHTML = `<b>Aktuelle Bonus Verlosung:</b> Porsche 911 (Wert 140.000€)`;
      paragraph.classList.remove('px-6');
    }
  }

  const originalTrophyElement = container.querySelector('svg');
  if (originalTrophyElement) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = newTrophyIcon;
    const newIconElement = wrapper.firstElementChild;
    originalTrophyElement.replaceWith(newIconElement);
  }

  const subscriptionCards = container.querySelectorAll('[data-test="card-variant-subscription"]');

  if (subscriptionCards.length > 0) {
    const firstCard = subscriptionCards[0];

    const texts = [
      "<b>20 Lose/Monat</b> für die Haus-Verlosung",
      "<b>1 Gratis-Los/Monat</b> für die Haus-Verlosung",
      "<b>2 Lose/Monat</b> automatisch für offene Bonus-Verlosungen",
    ];

    const spanElements = firstCard.querySelectorAll('span.text-lg.pb-2.pl-4.flex-1');

    spanElements.forEach((span, index) => {
      const p = span.querySelector('p');
      if (p && texts[index]) {
        p.innerHTML = texts[index];
      }
    });
  }

};

const waitForElements = (elementSelector) => {
  customLog('[waitForElements] Starting to wait for cards...');

  DYO.Q(DYO.waitForElementAsync(elementSelector, 9, 10, 1000)).then(function (buttons) {
    customLog('[waitForElements] Buttons found: ' + buttons.length);

    const mainContainer = buttons[0].closest('[id^="enter-now"]');

    console.log('[waitForElements] mainContainer:', mainContainer);

    if (!mainContainer) {
      customLog('[waitForElements] ERROR: mainContainer not found');
      throw new Error('Parent container not found');
    }

    addStyles(styles);
    showCorrectContainer(SELECTOR_CONTAINER_ENTER_NOW_MATERIAL_TAB_BUTTONS_DESIGN);

  }).catch(function (error) {
    customLog('[waitForContainer]:', error);
  });
};

async function init() {
  try {

    customLog(TEST_NAME + ' | ' + SOURCE_TYPE + ' | ' + VARIATION);
    customLog('[init] Current URL: ' + CURRENT_URL);
    customLog('[init] Environment: ' + ENVIRONMENT);

    document.body.classList.add('oz-de1-qa-v1');
    customLog('[init] Added class oz-de1-qa-v1 to body');

    waitForElements(SELECTOR_CONTAINER_ENTER_NOW_MATERIAL_TAB_BUTTONS_DESIGN_BUTTONS);

  } catch (error) {
    console.error(error.message);
  }
}

init();
