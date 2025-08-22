const LOG_ENABLED = true;
const TEST_NAME = "OZ23 | Monthly Millionaire Landing Page";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const omaze23Data = {
  headingMobile: 'Introducing the Omaze Monthly Millionaire',
  headingDesktop: 'The Omaze Monthly Millionaire ',
  subHeading: '1 Winner. £1 Million. Guaranteed.',
  paragraphTextMobile: 'Every month, someone will win a life-changing £1,000,000. And that someone could be you. Enjoy 100 monthly entries, automatically included with your subscription from 1st August.',
  paragraphTextDesktop: 'Every month, someone will win a life-changing £1,000,000 in the Omaze Monthly Millionaire Draw. And that someone could be you. Enter now for your chance to win big this summer, or become a subscriber and receive free entries every month.',
  imageURLMobile: 'https://cdn.optimizely.com/img/8395960748/5fc2c84b0d854044a32c2d585df41f0f.png',
  imageURLDesktop: 'https://cdn.optimizely.com/img/8395960748/953d9f33b4cb4b20a1491ee173bf5710.png',
  imageYellowPart: 'https://cdn-eu.dynamicyield.com/api/9880449/images/d464e02ef748.png',
  imageBackground: 'https://cdn-eu.dynamicyield.com/api/9880449/images/85826243eaeb.png',
}

const selectors = {
  SELECTOR_NAVIGATION_BAR: '#main-nav',
  SELECTOR_HOME_CAROUSEL: '[id*="campaign-carousel"].shopify-section'
}

const stylesHomepage = `
.ccx-desktop-only {
  max-width: 200px;
  margin: 0;
}

.ccx-mobile-only {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.ccx-mobile-only.ccx-cta:hover {
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

.ccx-container-desktop-content {
  justify-content: center !important;
  gap: 1rem;
}

.ccx-container-desktop-content  .ccx-heading {
  margin: 0;
}

.ccx-container-desktop-content  .ccx-subheading {
  margin: 0;
}

.ccx-container-desktop-content  .ccx-paragraph {
  margin: 0;
  margin-bottom: 0.5rem;
}

.ccx-container-desktop-content  a.yellow-btn {
  margin: 0;
}

.ccx-container-mobile .ccx-image {
  max-height: 380px;
}

@media only screen and (min-width: 768px) {
  .ccx-container-desktop {
    height: 600px;
    max-height: 600px;
  }
  .ccx-container-desktop-image {
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .ccx-container-desktop-image-yellow {
    object-fit: contain;
  }

  .ccx-paragraph {
    margin-bottom: 1.5rem;
  }
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
`;

const stylesEnterNowPage = `
[id*=subscription-tab-pane]  {
  padding-top: 1.5rem !important;
}
  
.ccx-enter-now-banner-section {
  text-align: center;
  padding-top: 1rem;
  max-height: 140px;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  width: 340px;
  height: 140px;
  margin: 0 auto;
  border-radius: 8px;
}

h2.ccx-monthly-draw-heading {
  font-family: Gellix;
  font-weight: 700;
  font-size: 20px;
  line-height: 36px;
  text-align: center;
  vertical-align: middle;
  color: #081F28;
}

[id*=enter-now-material-tab-buttons-design] [id*=subscription-tab-pane] .ccx-subscriber-paragraph {
    font-family: Gellix;
    font-weight: 500;
    font-size: 15px;
    text-align: center;
    vertical-align: middle;
    color: #081F28;
    width: 228px;
    margin: 0 auto;
    margin-top: 0 !important;
}

#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] .ccx-subscriber-paragraph {
    font-family: Gellix;
    font-weight: 500;
    font-size: 15px;
    text-align: center;
    vertical-align: middle;
    color: #081F28;
    width: 228px;
    margin: 0 auto;
    margin-top: 0 !important;
}

.ccx-enter-now-banner-section img {
  width: 90px;
  height: 54px;
  margin: 0 auto;
}

.ccx-enter-now-banner-section p {
  margin: 0;
}

.ccx-enter-now-banner-section .text-white {
  font-family: Gellix;
  font-weight: 700;
  font-style: Bold;
  font-size: 20px;
  leading-trim: NONE;
  line-height: 20px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
  color: #FFFFFF;
}

.ccx-enter-now-banner-section .text-white > .text-yellow {
  color: #F0D204;
  font-size: 20px;
}

@media only screen and (min-width: 768px) {
  .ccx-enter-now-banner-section .text-white {
    font-size: 17px;
  }

  .ccx-enter-now-banner-section .text-white > .text-yellow {
    font-size: 20px;
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
  if (document.querySelector('.ccx-styles-oz23-v1')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  // Create a new <style> element
  const style = document.createElement('style');
  style.classList.add('ccx-styles-oz23-v1');
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
    '<h1 class="ccx-heading">' + omaze23Data.headingMobile + '</h1>' +
    '</div>' +
    '<img src="' + omaze23Data.imageURLMobile + '" alt="Mobile Image" class="w-full h-48 object-cover ccx-image">' +
    '<div class="sm:px-12 px-6 py-6 ccx-container-mobile-content">' +
    '<h2 class="ccx-subheading">' + omaze23Data.subHeading + '</h2>' +
    '<p class="ccx-paragraph">' + omaze23Data.paragraphTextMobile + '</p>' +
    '<a href="https://omaze.co.uk/pages/enter-cornwall-v" class="ccx-mobile-only ccx-cta">Enter Monthly Millionaire Now</a>' +
    '</div>';
  element.insertAdjacentElement('afterend', mobileContainer);
}

// function createDesktopContainer(element) {
//   const desktopContainer = document.createElement('div');
//   desktopContainer.className = 'hidden md:flex w-full ccx-container-desktop';
//   desktopContainer.innerHTML =
//     '<div class="flex w-full mx-auto ccx-container-desktop-inner">' +
//     '<div class="w-1/2 ccx-container-desktop-image">' +
//     '<img src="' + omaze23Data.imageURLDesktop + '" alt="Desktop Image" class="object-cover ccx-image ccx-new-img">' +
//     '</div>' +
//     '<div class="px-12 w-1/2 flex flex-col justify-center ccx-container-desktop-content">' +
//     '<h1 class="ccx-heading">' + omaze23Data.headingDesktop + '</h1>' +
//     '<h2 class="ccx-subheading">' + omaze23Data.subHeading + '</h2>' +
//     '<p class="ccx-paragraph">' + omaze23Data.paragraphTextDesktop + '</p>' +
//     '<a href="https://omaze.co.uk/pages/enter-cornwall-v" class="ccx-desktop-only yellow-btn hide-on-mobile">Enter Now</a>' +
//     '</div>' +
//     '</div>';
//   element.insertAdjacentElement('afterend', desktopContainer);
// }

function createDesktopContainer(element) {
  const desktopContainer = document.createElement('div');
  desktopContainer.className = 'hidden md:flex w-full ccx-container-desktop';
  desktopContainer.innerHTML =
    '<div class="flex w-full mx-auto ccx-container-desktop-inner">' +
    '<div class="w-1/2 ccx-container-desktop-image" style="background-image: url(' + omaze23Data.imageBackground + ');">' +
      '<img src="' + omaze23Data.imageYellowPart + '" alt="Desktop Image" class="ccx-container-desktop-image-yellow" style="width: 260px; height: 216px;">' +
    '</div>' +
    '<div class="px-12 w-1/2 flex flex-col justify-center ccx-container-desktop-content">' +
    '<h1 class="ccx-heading">' + omaze23Data.headingDesktop + '</h1>' +
    '<h2 class="ccx-subheading">' + omaze23Data.subHeading + '</h2>' +
    '<p class="ccx-paragraph">' + omaze23Data.paragraphTextDesktop + '</p>' +
    '<a href="https://omaze.co.uk/pages/enter-cornwall-v" class="ccx-desktop-only yellow-btn hide-on-mobile">Enter Now</a>' +
    '</div>' +
    '</div>';
  element.insertAdjacentElement('afterend', desktopContainer);
}

function createSubscriptionEnterNowPageChanges() {
  customLog('[createSubscriptionEnterNowPageChanges] Creating Enter Now page changes...');

  const header = document.querySelector('#enter-now-material-tab-buttons-design [id*=subscription-tab-pane] .text-3xl.font-bold');
  customLog('[createSubscriptionEnterNowPageChanges] Header found:', header);

  if (header) {
    // Create h2 element
    var h2 = document.createElement('h2');
    h2.textContent = 'New! Omaze Monthly Millionaire Draw';
    h2.classList.add('ccx-monthly-draw-heading');
    
    // Create paragraph element
    var paragraph = document.createElement('p');
    paragraph.textContent = 'Become a subscriber and receive free entries every month.';
    paragraph.classList.add('ccx-subscriber-paragraph');
    
    // Create container div
    var container = document.createElement('div');
    container.className = 'ccx-enter-now-banner-section';
    container.style.background = 'url(' + omaze23Data.imageBackground + ')';
    container.style.textAlign = 'center';
    
    // Create img element
    var img = document.createElement('img');
    img.src = omaze23Data.imageYellowPart;
    img.style.display = 'block';
    img.style.margin = '0 auto';
    img.classList.add('ccx-banner-image');
    
    // Create first paragraph for container
    var paragraph1 = document.createElement('p');
    paragraph1.classList.add('ccx-banner-paragraph-first', 'text-white');
    paragraph1.innerHTML = 'Enter now for your chance to win <span class="text-yellow">£1,000,000!</span>';
    
    // Append elements to container
    container.appendChild(img);
    container.appendChild(paragraph1);
    
    // Insert elements after the header
    header.insertAdjacentElement('afterend', container);
    header.insertAdjacentElement('afterend', paragraph);
    header.insertAdjacentElement('afterend', h2);
  }
}

function createPAYGEnterNowPageChanges() {
  customLog('[createPAYGEnterNowPageChanges] Creating Enter Now page changes...');

  const image = document.querySelector('#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] > img');

  if (image) {
    // Create h2 element
    var h2 = document.createElement('h2');
    h2.textContent = 'New! Omaze Monthly Millionaire Draw';
    h2.classList.add('ccx-monthly-draw-heading');
    
    // Create paragraph element
    var paragraph = document.createElement('p');
    paragraph.textContent = 'Become a subscriber and receive free entries every month.';
    paragraph.classList.add('ccx-subscriber-paragraph');
    
    // Create container div
    var container = document.createElement('div');
    container.className = 'ccx-enter-now-banner-section';
    container.style.background = 'url(' + omaze23Data.imageBackground + ')';
    container.style.textAlign = 'center';
    
    // Create img element
    var img = document.createElement('img');
    img.src = omaze23Data.imageYellowPart;
    img.style.display = 'block';
    img.style.margin = '0 auto';
    img.classList.add('ccx-banner-image');
    
    // Create first paragraph for container
    var paragraph1 = document.createElement('p');
    paragraph1.classList.add('ccx-banner-paragraph-first', 'text-white');
    paragraph1.innerHTML = 'Enter now for your chance to win <span class="text-yellow">£1,000,000</span>';
    
    // Append elements to container
    container.appendChild(img);
    container.appendChild(paragraph1);
    
    // Insert elements before the image
    image.insertAdjacentElement('beforebegin', h2);
    image.insertAdjacentElement('beforebegin', paragraph);
    image.insertAdjacentElement('beforebegin', container);
  }
}

async function waitForEnterHouseCampaign() {
  customLog('[waitForEnterHouseCampaign] Waiting for .dy-page-category...');

  try {
    const elements = await DYO.waitForElementAsync('.dy-page-category', 1, 100, 150);
    const target = elements?.[0];

    if (!target) {
      customLog('[waitForEnterHouseCampaign] .dy-page-category not found.');
      return;
    }

    // Poll until dataset.category is available
    let retries = 20; // ~2 seconds (20 * 100ms)
    const checkCategory = () =>
      new Promise(resolve => {
        const interval = setInterval(() => {
          const category = target.dataset?.category ?? "";
          if (category === "EnterHouseCampaign" || retries <= 0) {
            clearInterval(interval);
            resolve(category);
          }
          retries--;
        }, 100);
      });

    const PAGE_CATEGORY = await checkCategory();
    customLog('[waitForEnterHouseCampaign] Page category resolved:', PAGE_CATEGORY);

    if (PAGE_CATEGORY === "EnterHouseCampaign") {
      customLog('[waitForEnterHouseCampaign] ✅ Running EnterHouseCampaign code...');

      // --- Now wait for the subscription tab button ---
      const subscriptionEnterNowButtons = await DYO.waitForElementAsync(
        '#enter-now-material-tab-buttons-design [id*=subscription-tab-pane] .add-to-cart-button',
        3,
        100,
        150
      );

      if (subscriptionEnterNowButtons?.[0]) {
        customLog('[waitForEnterHouseCampaign] Subscription tab button found:', subscriptionEnterNowButtons[0]);
        addStyles(stylesEnterNowPage);
        createSubscriptionEnterNowPageChanges();
      } else {
        customLog('[waitForEnterHouseCampaign] Subscription tab button NOT found');
      }

      // --- Now wait for the PAYG tab button ---
      const paygEnterNowButtons = await DYO.waitForElementAsync(
        '#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] .add-to-cart-button',
        8,
        100,
        150
      );

      if (paygEnterNowButtons?.[0]) {
        customLog('[waitForEnterHouseCampaign] PAYG tab button found:', paygEnterNowButtons[0]);
        addStyles(stylesEnterNowPage);
        createPAYGEnterNowPageChanges();
      } else {
        customLog('[waitForEnterHouseCampaign] PAYG tab button NOT found');
      }

    } else {
      customLog('[waitForEnterHouseCampaign] ❌ Not EnterHouseCampaign, skipping...');
    }
  } catch (error) {
    console.warn('[waitForEnterHouseCampaign] Error:', error);
  }
}

// --- CASE 1: Home pages ---
function waitForHomeCarousel(elementSelector) {
  customLog('[waitForHomeCarousel] Starting check...');

  Promise.all([
    DYO.waitForElementAsync(elementSelector, 1, 100, 150)
  ])
    .then(function (results) {
      const homeCarousel = results[0];

      if (homeCarousel?.[0]) {
        customLog('[waitForHomeCarousel] Carousel found:', homeCarousel[0]);
        createMobileContainer(homeCarousel[0]);
        createDesktopContainer(homeCarousel[0]);
        addStyles(stylesHomepage);
      } else {
        customLog('[waitForHomeCarousel] No carousel found, skipping...');
      }
    })
    .catch(function (error) {
      console.warn('[waitForHomeCarousel] Error while waiting for carousel:', error);
    });
}

function init() {
  try {
    customLog(TEST_NAME + ' | ' + SOURCE_TYPE + ' | ' + VARIATION);
    customLog('[init] Current URL: ' + CURRENT_URL);
    customLog('[init] Environment: ' + ENVIRONMENT);

    document.body.classList.add('omaze-oz23-v1');
    customLog('[init] Added class omaze-oz23-v1 to body');

    // EnterHouseCampaign pages
    waitForEnterHouseCampaign();

    // Homepage carousel pages
    waitForHomeCarousel(selectors.SELECTOR_HOME_CAROUSEL);

  } catch (error) {
    console.error(error.message);
  }
}

init();
