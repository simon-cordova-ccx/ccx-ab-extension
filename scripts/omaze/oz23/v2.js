const LOG_ENABLED = true;
const TEST_NAME = "OZ23 | Monthly Millionaire Landing Page";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 2";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const omaze23Data = {
  headingSpan: 'NEW!',
  headingText: 'OMAZE MONTHLY MILLIONAIRE DRAW',
  subHeading: 'Enter for your chance to win £1,000,000.',
  paragraphText: "Get entries into this month's draw or become a subscriber and receive free entries every month.",
  imageURL: 'https://cdn-eu.dynamicyield.com/api/9880449/images/9c509cd86023.jpg',
  backgroundImage: 'https://cdn-eu.dynamicyield.com/api/9880449/images/dbacba4af7fd.jpg',
  foregroundImage: 'https://cdn-eu.dynamicyield.com/api/9880449/images/4f77fee87606.png',
}

const omaze23DataV2 = {
  imageURLMobile: 'https://cdn.optimizely.com/img/8395960748/5fc2c84b0d854044a32c2d585df41f0f.png',
  imageURLDesktop: 'https://cdn.optimizely.com/img/8395960748/953d9f33b4cb4b20a1491ee173bf5710.png',
  imageYellowPart: 'https://cdn-eu.dynamicyield.com/api/9880449/images/d464e02ef748.png',
  imageBackground: 'https://cdn-eu.dynamicyield.com/api/9880449/images/85826243eaeb.png',
}

const selectors = {
  SELECTOR_NAVIGATION_BAR: '#main-nav',
  SELECTOR_HERO_VIDEO: '.home--banner',
}

const stylesHomepage = `
.ccx-container {
  background: url(https://cdn-eu.dynamicyield.com/api/9880449/images/dbacba4af7fd.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}
.ccx-container .ccx-image {
  width: 129px;
  height: 78px;
}
.ccx-container .ccx-container-header {
  padding-bottom: 0 !important;
}
.ccx-container .ccx-heading {
  font-family: Showtime;
  font-weight: 500;
  font-size: 24px;
  vertical-align: middle;
  text-transform: uppercase;
  color: #FFFFFF;
  margin: 0;
}
.ccx-container .ccx-heading span {
  color: #FEDC03;
}
.ccx-subheading {
  font-family: Gellix;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  vertical-align: middle;
  color: #FFFFFF;
}
.ccx-paragraph {
  font-family: Gellix;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  vertical-align: middle;
  color: white;
  margin-bottom: 0.5rem !important;
}
 .ccx-cta {
  border: 2px solid #FFFFFF;
  color: var(--color-grey-97, #FFFCF0);
  opacity: 1;
  padding-top: 3px;
  padding-right: 16px;
  padding-bottom: 5px;
  padding-left: 16px;
  border-radius: 76px;
  border-width: 2px;
  font-family: Gellix;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  flex-shrink: 0;
  width: fit-content;
}
.ccx-container-content {
  display: flex;
  flex-flow: column;
  justify-content: center;
}
@media (min-width: 768px) {
  .ccx-container {
    flex-flow: row !important;
    justify-content: center;
    gap: 0 !important;
    height: 152px !important;
  }
  .ccx-container .ccx-image {
    width: 157px;
    height: 94px;
    object-fit: contain;
  }
  .ccx-container .ccx-heading {
    font-size: 26px;
  }
  .ccx-container .ccx-container-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0 !important;
  }
  .ccx-container .ccx-container-content {
    padding-bottom: 0 !important;
  }
  .ccx-subheading {
    margin-bottom: 0 !important;
  }
  .ccx-paragraph {
    margin-bottom: 0.5rem !important;
  }

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
  if (document.querySelector('.ccx-styles-oz23-v2')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  // Create a new <style> element
  const style = document.createElement('style');
  style.classList.add('ccx-styles-oz23-v2');
  style.appendChild(document.createTextNode(css));

  // Append the style tag to the document head
  document.head.appendChild(style);
  customLog('Custom styles added.');
};

function createCCXContainer(element) {
  const ccxContainer = document.createElement('div');
  ccxContainer.className = 'flex flex-col w-full lg:flex-row lg:justify-center ccx-container gap-4';
  ccxContainer.innerHTML = 
    '<div class="ccx-container-header sm:px-12 px-12 py-6">' +
      '<img src="' + omaze23Data.foregroundImage + '" alt="Mobile Image" class="ccx-image">' +
    '</div>' +
    '<div class="ccx-container-content px-12 py-6 pt-0 md:p-4">' +
      '<h1 class="ccx-heading"><span>' + omaze23Data.headingSpan + ' </span>' + omaze23Data.headingText + '</h1>' +
      '<h2 class="ccx-subheading">' + omaze23Data.subHeading + '</h2>' +
      '<p class="ccx-paragraph">' + omaze23Data.paragraphText + '</p>' +
      '<button class="ccx-cta">Enter Now</button>' +
    '</div>';
  element.insertAdjacentElement('afterend', ccxContainer);
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
    container.style.background = 'url(' + omaze23DataV2.imageBackground + ')';
    container.style.textAlign = 'center';
    
    // Create img element
    var img = document.createElement('img');
    img.src = omaze23DataV2.imageYellowPart;
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
    container.style.background = 'url(' + omaze23DataV2.imageBackground + ')';
    container.style.textAlign = 'center';
    
    // Create img element
    var img = document.createElement('img');
    img.src = omaze23DataV2.imageYellowPart;
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

function attachEventsListeners() {
  customLog('[attachEventsListeners] Starting to attach events listeners...');
  const heroLink = document.querySelector('.campaign-hero__content a.yellow-btn');

  if (!heroLink) {
    customLog('[attachEventsListeners] Hero link not found');
    return;
  }

  const href = heroLink.getAttribute('href');
  customLog('[attachEventsListeners] Found hero link href:', href);

  const ccxCTA = document.querySelector('.ccx-cta');
  if (!ccxCTA) {
    customLog('[attachEventsListeners] CTA button not found');
    return;
  }

  ccxCTA.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent immediate redirect
    DY.API('event', {
      name: 'omaze_23_mm_cta_click'
    });
    customLog('[attachEventsListeners] CTA click event sent: omaze_23_mm_cta_click');
    // Redirect after event is sent
    window.location.href = href;
  });
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
        customLog('Hero Video found:', homeCarousel[0]);

        createCCXContainer(homeCarousel[0]);

        addStyles(stylesHomepage);

        attachEventsListeners();
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

    document.body.classList.add('omaze-oz23-v2');
    customLog('[init] Added class omaze-oz23-v2 to body');

    // EnterHouseCampaign pages
    waitForEnterHouseCampaign();

    // Homepage carousel pages
    waitForHomeCarousel(selectors.SELECTOR_HERO_VIDEO);

  } catch (error) {
    console.error(error.message);
  }
}

init();
