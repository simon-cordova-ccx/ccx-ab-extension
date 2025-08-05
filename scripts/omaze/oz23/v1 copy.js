const LOG_ENABLED = true;
const TEST_NAME = "OZ23 | Monthly Millionaire Landing Page";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const IMAGE_URL = `https://cdn-eu.dynamicyield.com/api/9880449/images/9c509cd86023.jpg`;

const selectors = {
  SELECTOR_NAVIGATION_BAR: '#main-nav',
//   SELECTOR_HOME_CAROUSEL: '[data-automation="campaign-carousel"]'
  SELECTOR_HOME_CAROUSEL: '[id*="campaign-carousel"].shopify-section'
}

const styles = `
.ccx-cta {
    width: 183px;
    height: 48px;
    opacity: 1;
    line-height: 48px;
    border-radius: 76px;
    border-width: 2px;
    border: 2px solid #3B5C6B;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Gellix;
    font-weight: 700;
    font-size: 18px;
    text-align: center;
    color: #090F15;
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

const addVariationChanges = (homeCarousel) => {
  customLog('[addVariationChanges] Starting the addVariationChanges function...');
  console.log(homeCarousel);

  const ccxContainer = document.createElement('div');
  ccxContainer.classList.add('flex', 'flex-col', 'md:flex-row', 'ccx-omaze-23', 'sm:px-12', 'px-6', 'py-0');

  const ccxImageContainer = document.createElement('div');
  ccxImageContainer.classList.add('md:w-1/2', 'ccx-image-container');

  const ccxImage = document.createElement('img');
  ccxImage.src = IMAGE_URL;
  ccxImage.alt = 'Monthly Millionaire Image';
  ccxImage.classList.add('w-full', 'h-full', 'object-cover', 'object-center', 'ccx-image');
  ccxImageContainer.appendChild(ccxImage);

  const ccxContentContainer = document.createElement('div');
  ccxContentContainer.classList.add('md:w-1/2', 'md:pl-4', 'content-container', 'sm:px-12', 'px-6', 'py-6');

  const ccxHeading = document.createElement('h2');
  ccxHeading.textContent = 'Introducing the Omaze Monthly Millionaire';
//   ccxHeading.classList.add('text-lg', 'font-bold', 'mb-2', 'ccx-heading');
  ccxContentContainer.appendChild(ccxHeading);

  const ccxSubheading = document.createElement('h3');
  ccxSubheading.textContent = '1 Winner. £1 Million. Guaranteed.';
  ccxSubheading.classList.add('ccx-subheading');
  ccxContentContainer.appendChild(ccxSubheading);

  const ccxDescription = document.createElement('p');
  ccxDescription.textContent = 'Every month, someone will win a life-changing £1,000,000. And that someone could be you. Enjoy 100 monthly entries, automatically included with your subscription from 1st August.';
  ccxDescription.classList.add('text-md', 'mb-4', 'ccx-description');
  ccxContentContainer.appendChild(ccxDescription);

  const ccxCallToAction = document.createElement('button');
  ccxCallToAction.textContent = 'Button';
  ccxCallToAction.classList.add('ccx-cta');
  ccxContentContainer.appendChild(ccxCallToAction);

  ccxContainer.appendChild(ccxImageContainer);
  ccxContainer.appendChild(ccxContentContainer);

  homeCarousel.insertAdjacentElement('afterend', ccxContainer);
}

const waitForElements = async function (elementSelector) {
  customLog('[waitForElements] Starting to wait for elements...');

  try {
    const results = await Promise.all([
      DYO.waitForElementAsync(elementSelector, 1, 100, 150)
    ]);
    const homeCarousel = results[0];

    customLog('Carousel found:', homeCarousel[0]);

    addVariationChanges(homeCarousel[0]);

    addStyles(styles);

  } catch (error) {
    console.warn('[waitForElements] Main nav or site footer not found within timeout.');
  }
};

async function init() {
  try {

    customLog(TEST_NAME + ' | ' + SOURCE_TYPE + ' | ' + VARIATION);
    customLog('[init] Current URL: ' + CURRENT_URL);
    customLog('[init] Environment: ' + ENVIRONMENT);

    document.body.classList.add('omaze-oz23-v1');
    customLog('[init] Added class omaze-oz23-v1 to body');

    waitForElements(selectors.SELECTOR_HOME_CAROUSEL);

  } catch (error) {
    console.error(error.message);
  }
}

init();
