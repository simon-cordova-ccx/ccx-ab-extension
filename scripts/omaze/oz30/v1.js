const LOG_ENABLED = true;
const TEST_NAME = "OZ30 - MM LP Winner Testimonial";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";
const CLASS_STYLE = 'ccx-styles-oz30-v1';
const CLASS_BODY = 'ccx-omaze-oz30-v1';
const SELECTORS = {
  campaignHeroSubtext: '.campaign-hero-subtext',
  newImageURL: 'https://cdn-eu.dynamicyield.com/api/9880449/images/88a919c5cf4c.jpg'
};

const styles = `
  .campaign-hero-subtext {
    margin-bottom: 1rem !important;
  }
  .campaign-hero-subtext > p {
    font-family: Gellix;
    font-weight: 700;
    font-size: 20px !important;
    text-align: center;
  }
  .campaign-hero-subtext > p > br {
    display: none;
  }
  .ccx-oz30-card-container {
    width: 342px;
    height: 132px;
    display: flex;
    border: 2px solid #FFDD00;
    border-radius: 20px;
    border-width: 2px;
    padding: 10px;
    gap: 10px;
  }
  .ccx-oz30-card-left-side {
    flex-basis: 20%;
  }
  .ccx-oz30-card-left-side img {
    width: 61px;
    height: 60px;
    border-radius: 50%;
    border-width: 2px;
    opacity: 1;
    object-fit: cover;
    border: 2px solid #FFDD00;
  }
  .ccx-oz30-card-right-side {
    flex-basis: 80%;
  }
  .ccx-oz30-card-right-side p:first-child {
    font-family: Gellix;
    font-weight: 500;
    font-style: italic;
    font-size: 14px;
    line-height: 16.8px;
    letter-spacing: 0;
    vertical-align: middle;
    color: white;
    margin-bottom: 0.5rem;
  }
  .ccx-oz30-card-right-side p:last-child {
    font-family: Gellix;
    font-weight: 400;
    font-size: 13px;
    color: white;
    line-height: 13px;
  }
  .ccx-oz30-card-right-side p:last-child strong {
    font-family: Gellix;
    font-weight: 700;
    font-size: 13px;
    color: white;
    line-height: 15.6px;
  }

  @media screen and (min-width: 768px) {
    .campaign-hero-overlay img.campaign-logo-desktop {
      margin-bottom: 0 !important;
    }
    .campaign-hero-overlay .campaign-hero-title {
      margin-bottom: 2rem !important;
    }
    .ccx-oz30-card-container {
      margin-bottom: 1rem !important;
    }
  }

  @media screen and (min-width: 1269px) {
    .ccx-oz30-card-container {
      margin-bottom: 2rem !important;
    }
  }

`;

const addStyles = (css) => {
  customLog('[addStyles] Starting the addStyles function...');

  if (!css) return;

  if (document.querySelector('.ccx-styles-subs-callout-v1')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  const style = document.createElement('style');
  style.classList.add('ccx-styles-subs-callout-v1');
  style.appendChild(document.createTextNode(css));

  document.head.appendChild(style);
  customLog('Custom styles added.');
};

// Waits for DOM elements to be available
const waitForElements = (configs, callback) => {
  customLog('[waitForElements] Starting to wait for elements...');
  if (!configs || !Array.isArray(configs) || configs.length === 0) {
    throw new Error('[waitForElements] No configs provided.');
  }
  if (!window.DYO || !DYO.waitForElementAsync) {
    throw new Error('[waitForElements] DYO.waitForElementAsync is not available.');
  }
  if (typeof callback !== 'function') {
    throw new Error('[waitForElements] Callback must be a function.');
  }

  const promises = configs.map(({ selector, count }) =>
    DYO.waitForElementAsync(selector, count, 100, 150)
      .then(elements => {
        customLog('[waitForElements] Found ' + elements.length + ' for ' + selector);
        return { selector, elements };
      })
  );

  return Promise.all(promises).then(callback);
};

// Custom logging function for debugging
const customLog = (...messages) => {
  if (!LOG_ENABLED) return;

  const style = `
        background: linear-gradient(90deg, #6a6971, #2a1f60);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
    `;

  const parts = [];
  const values = [];

  messages.forEach(msg => {
    if (msg instanceof Element) {
      parts.push("%o");
      values.push(msg);
    } else if (Array.isArray(msg)) {
      msg.forEach(item => processLogItem(item, parts, values, style));
    } else if (msg && typeof msg === "object" && "html" in msg) {
      processLogItem(msg, parts, values, style);
    } else {
      parts.push(typeof msg === "string" ? "%c" + msg.toUpperCase() : "%O");
      values.push(typeof msg === "string" ? style : msg);
    }
  });

  console.log(parts.join(" "), ...values);
};

const createCard = () => {
   customLog('[createCard] Starting the createCard function...');

   const cardContainer = document.createElement('div');
   cardContainer.className = 'ccx-oz30-card-container';

   const cardLeftSide = document.createElement('div');
   cardLeftSide.className = 'ccx-oz30-card-left-side';

   const cardRightSide = document.createElement('div');
   cardRightSide.className = 'ccx-oz30-card-right-side';

   cardContainer.appendChild(cardLeftSide);
   cardContainer.appendChild(cardRightSide);

   const cardLeftSideImg = document.createElement('img');
   cardLeftSideImg.src = SELECTORS.newImageURL;
   cardLeftSide.appendChild(cardLeftSideImg);

   const cardRightSideTextTop = document.createElement('p');
   cardRightSideTextTop.textContent = "\“Winning a million pounds is beyond transformational, it’s incredible, utterly life-changing for our family.\”";


  //  const cardRightSideTextBottom = document.createElement('p');
  //  cardRightSideTextBottom.textContent = "\"Naomi from Worcestershire won £1,000,000 in the August Monthly Millionaire Draw.\"";
  const highlight = (text) => Object.assign(document.createElement('strong'), { textContent: text });

  const cardRightSideTextBottom = document.createElement('p');
  cardRightSideTextBottom.append(
    '"', highlight('Naomi'), ' from Worcestershire won ',
    highlight('£1,000,000'), ' in the ',
    highlight('August Monthly Millionaire Draw'), '."'
  );


   cardRightSide.appendChild(cardRightSideTextTop);
   cardRightSide.appendChild(cardRightSideTextBottom);

   return cardContainer;
}
// Main initialisation function for OZ30 experiment
const init = () => {
  try {
    customLog(TEST_NAME + ' | ' + VARIATION + ' | URL: ' + CURRENT_URL);
    document.body.classList.add(CLASS_BODY);

    waitForElements(
      [{ selector: SELECTORS.campaignHeroSubtext, count: 1 }],
      (results) => {
        console.log(results[0]?.elements);

        const CONTROL_CAMPAIGN_HERO_SUBTEXT = results[0]?.elements;

        const CCX_OUTER_CONTAINER = document.querySelector('.ccx-oz30-card-container');

        if (CONTROL_CAMPAIGN_HERO_SUBTEXT && !CCX_OUTER_CONTAINER) {
          const cardContainer = createCard();
          results[0].elements[0].insertAdjacentElement('afterend', cardContainer);
          addStyles(styles);
        } else {
          customLog('[init] Campaign Hero Subtext not found or CCX container already exists');
        }
      }
    );

  } catch (error) {
    customLog('[init] Error: ' + error.message);
  }
};

init();