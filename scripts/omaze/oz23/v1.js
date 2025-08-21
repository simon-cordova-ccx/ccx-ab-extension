const LOG_ENABLED = true;
const TEST_NAME = "OZ23 | Monthly Millionaire Landing Page";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const omaze23Data = {
  heading: 'Introducing the Omaze Monthly Millionaire ',
  subHeading: '1 Winner. £1 Million. Guaranteed.',
  paragraphText: 'Every month, someone will win a life-changing £1,000,000 in the Omaze Monthly Millionaire Draw. And that someone could be you. Enter now for your chance to win big this summer, or become a subscriber and receive free entries every month.',
  //imageURL: 'https://cdn-eu.dynamicyield.com/api/9880449/images/9c509cd86023.jpg',
  imageURL: 'https://cdn.optimizely.com/img/8395960748/5fc2c84b0d854044a32c2d585df41f0f.png',
  //imageURL_two: 'https://cdn.optimizely.com/img/8395960748/953d9f33b4cb4b20a1491ee173bf5710.png',
}

const selectors = {
  SELECTOR_NAVIGATION_BAR: '#main-nav',
  SELECTOR_HOME_CAROUSEL: '[id*="campaign-carousel"].shopify-section'
}

const styles = `
.ccx-desktop-only{
max-width: 200px;
}
.ccx-mobile-only{
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}
.ccx-mobile-only.ccx-cta:hover{
text-decoration: none;
}

.ccx-subheading {
    font-family: Gellix;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    vertical-align: middle;
}
.ccx-paragraph {
    line-height: 28px;
    margin-bottom: 2rem;
}
.ccx-container-mobile .ccx-cta {
    line-height: 48px;
    border: 2px solid #3B5C6B;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Gellix;
    font-weight: 700;
    font-size: 18px;
    text-align: center;
    color: #090F15;
    height: 48px;
    gap: 10px;
    opacity: 1;
    padding-top: 10px;
    padding-right: 24px;
    padding-bottom: 11px;
    padding-left: 24px;
    border-radius: 76px;
    border-width: 2px;
    margin: 0 auto;
}
.ccx-container-desktop-image + div {
  padding-top: 7rem !important;
  padding-bottom: 7rem !important;
}
.ccx-container-desktop .ccx-cta {
    width: 183px;
    height: 48px;
    opacity: 1;
    line-height: 48px;
    border-radius: 76px;
    border-width: 2px;
    // border: 2px solid #3B5C6B;
    background-color: #FFDD00;
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

/*
   .ccx-new-img{
   dsiplay: none;
   }
@media only screen and (min-width: 768px) and (max-width: 1024px) {
   .ccx-main-img{
   display: none;
   }
   .ccx-new-img{
   dsiplay: block;
   }
}
*/

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

function createMobileContainer(element) {
  const mobileContainer = document.createElement('div');
  mobileContainer.className = 'block md:hidden w-full ccx-container-mobile bg-white';
  mobileContainer.innerHTML =
    '<div class="sm:px-12 px-6 py-6 ccx-container-mobile-header">' +
    '<h1 class="ccx-heading">' + omaze23Data.heading + '</h1>' +
    '</div>' +
    '<img src="' + omaze23Data.imageURL + '" alt="Mobile Image" class="w-full h-48 object-cover ccx-image">' +
    '<div class="sm:px-12 px-6 py-6 ccx-container-mobile-content">' +
    '<h2 class="ccx-subheading">' + omaze23Data.subHeading + '</h2>' +
    '<p class="ccx-paragraph">' + omaze23Data.paragraphText + '</p>' +
    //'<button class="ccx-cta">Enter Monthly Millionaire Now</button>' +
    '<a href="https://omaze.co.uk/pages/enter-cornwall-v" class="ccx-mobile-only ccx-cta">Enter Monthly Millionaire Now</a>' +
    '</div>';
  element.insertAdjacentElement('afterend', mobileContainer);
}

function createDesktopContainer(element) {
  const desktopContainer = document.createElement('div');
  desktopContainer.className = 'hidden md:flex w-full ccx-container-desktop';
  desktopContainer.innerHTML =
    '<div class="flex w-full mx-auto ccx-container-desktop-inner">' +
    '<div class="w-1/2 ccx-container-desktop-image">' +
    '<img src="' + omaze23Data.imageURL + '" alt="Desktop Image" class="w-full h-full object-cover ccx-image ccx-main-img">' +
  //  '<img src="' + omaze23Data.imageURL_two + '" alt="Mobile Image" class="w-full h-48 object-cover ccx-image ccx-new-img">' +
    '</div>' +
    '<div class="px-12 py-12 w-1/2 flex flex-col justify-center ccx-container-desktop-content">' +
    '<h1 class="ccx-heading">' + omaze23Data.heading + '</h1>' +
    '<h2 class="ccx-subheading">' + omaze23Data.subHeading + '</h2>' +
    '<p class="ccx-paragraph">' + omaze23Data.paragraphText + '</p>' +
    '<a href="https://omaze.co.uk/pages/enter-cornwall-v" class="ccx-desktop-only yellow-btn hide-on-mobile">Enter Now</a>' +
    '</div>' +
    '</div>';
  element.insertAdjacentElement('afterend', desktopContainer);
}

function waitForElements(elementSelector) {
  customLog('[waitForElements] Starting to wait for elements...');

  Promise.all([
    DYO.waitForElementAsync(elementSelector, 1, 100, 150)
  ])
    .then(function (results) {
      const homeCarousel = results[0];

      customLog('Carousel found:', homeCarousel[0]);

      createMobileContainer(homeCarousel[0]);
      createDesktopContainer(homeCarousel[0]);

      addStyles(styles);
    })
    .catch(function (error) {
      console.warn('[waitForElements] Main nav or site footer not found within timeout.');
    });
}

function init() {
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