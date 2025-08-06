const LOG_ENABLED = true;
const TEST_NAME = "OZ23 | Monthly Millionaire Landing Page";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 2";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const omaze23Data = {
  headingSpan: 'NEW!',
  headingText: 'MONTHLY MILLIONAIRE DRAW',
  subHeading: 'Enter now for a chance to win £1,000,000 a month! Starting at only £8!',
  paragraphText: 'Free with an Omaze subscription.',
  imageURL: 'https://cdn-eu.dynamicyield.com/api/9880449/images/9c509cd86023.jpg',
  backgroundImage: 'https://cdn-eu.dynamicyield.com/api/9880449/images/dbacba4af7fd.jpg',
  foregroundImage: 'https://cdn-eu.dynamicyield.com/api/9880449/images/4f77fee87606.png',
}

const selectors = {
  SELECTOR_NAVIGATION_BAR: '#main-nav',
  SELECTOR_HERO_VIDEO: '.home--banner',
}

const styles = `
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
  font-size: 26px;
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
  font-style: Bold;
  font-size: 16px;
  line-height: 20px;
  vertical-align: middle;
  color: #FFFFFF;
}
.ccx-paragraph {
  font-family: Gellix;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  vertical-align: middle;
  color: white;
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

function attachEventsListeners() {
  customLog('[attachEventsListeners] Starting to attach events listeners...');
  const heroLink = document.querySelector('.campaign-hero__content a.yellow-btn');

  if (!heroLink) return;

  const href = heroLink.getAttribute('href');
  customLog('[attachEventsListeners] Found hero link href:', href);

  const ccxCTA = document.querySelector('.ccx-cta');
  if (!ccxCTA) return;

  ccxCTA.addEventListener('click', () => {
    window.location.href = href;
  });
}

function waitForElements(elementSelector) {
  customLog('[waitForElements] Starting to wait for elements...');

  Promise.all([
    DYO.waitForElementAsync(elementSelector, 1, 100, 150)
  ])
    .then(function(results) {
      const heroVideo = results[0];

      customLog('Hero Video found:', heroVideo[0]);

      createCCXContainer(heroVideo[0]);

      addStyles(styles);

      attachEventsListeners();
    })
    .catch(function(error) {
      console.warn('[waitForElements] Main nav or site footer not found within timeout.');
    });
}

function init() {
  try {
    customLog(TEST_NAME + ' | ' + SOURCE_TYPE + ' | ' + VARIATION);
    customLog('[init] Current URL: ' + CURRENT_URL);
    customLog('[init] Environment: ' + ENVIRONMENT);

    document.body.classList.add('omaze-oz23-v2');
    customLog('[init] Added class omaze-oz23-v2 to body');

    waitForElements(selectors.SELECTOR_HERO_VIDEO);

  } catch (error) {
    console.error(error.message);
  }
}

init();
