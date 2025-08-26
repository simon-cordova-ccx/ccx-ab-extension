const LOG_ENABLED = true;
const TEST_NAME = "Subs Mgmt - Subscription Value Call-Out";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

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
            parts.push("%c" + String(msg).toUpperCase());
            values.push(style);
        }
    });

    console.log(parts.join(" "), ...values);
};

const styles = `
  .subs-container {
    padding: 24px;
    max-width: 420px;
    font-family: Arial, sans-serif;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    margin: 0 auto;
    width: 297px;
    opacity: 1;
    border-radius: 10px;
    padding-bottom: 16px;
    gap: 10px;
    display: flex;
    flex-flow: column;
    background: #EBEDFA;
  }

  .subs-container h2 {
    margin-bottom: 20px;
    font-family: Gellix;
    font-weight: 700;
    font-size: 20px;
    line-height: 22.22px;
    color: #081F28;
  }

  .subs-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    width: 268px;
    opacity: 1;
    border-radius: 8px;
    padding-top: 5px;
    padding-bottom: 4px;
  }

  .subs-icon {
    background: #ffe600;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    font-size: 18px;
    margin-top: 0.5rem;
  }

  .subs-content {
    flex: 1;
  }

  .subs-content h3 {
    margin: 0;
    color: #1a1a1a;
    display: flex;
    flex-flow: column;
    font-family: Gellix;
    font-weight: 700;
    font-size: 15px;
    line-height: 22.22px;
  }

  .subs-content p {
    margin: 0;
    color: #333;
    font-family: Gellix;
    font-weight: 400;
    font-size: 13px;
    line-height: 120%;
  }

  .subs-highlight {
    color: #0193A7;
    font-family: Gellix;
    font-weight: 700;
    font-size: 14px;
    line-height: 22.22px;
    height: 26px;
  }
    
  .subs-btn {
    display: inline-block;
    margin-top: 10px;
    padding: 8px 14px;
    background: #ffe600;
    color: #081F28;
    font-weight: 700;
    font-size: 14px;
    border-radius: 9999px;
    text-decoration: none;
    font-family: Gellix, Arial, sans-serif;
  }
`

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

// --- Data object ---
const subscriptionItems = [
  {
    icon: "🏠",
    title: "Grand Prize House Draw",
    highlight: "100 Entries", // Changed from 200 to 100
    description: "Your chance to win a multi-million house",
    button: {
      text: "See this month’s house",
      url: "#"
    }
  },
  {
    icon: "💷",
    title: "Monthly Millionaire",
    highlight: "200 Entries",
    description: "Your chance to win £1,000,000 a month",
    button: {
      text: "Find out more",
      url: "#"
    }
  },
  {
    icon: "📅",
    title: "Monthly Subscriber Cash Draw",
    highlight: "200 Entries",
    description: "Your chance to win £100,000 in cash a month"
    // no button
  },
  {
    icon: "⏰",
    title: "Early Bird Prize Draw",
    highlight: "200 Entries",
    description: "Your chance to win cars and cash"
    // no button
  },
  {
    icon: "💛",
    title: "Supporting a UK Charity",
    description: "You’re helping fund <strong>Teenage Cancer Trust</strong>, who provide specialised care and support to over 7,000 young people with cancer every year.",
    button: {
      text: "Find out more",
      url: "#"
    }
  }
];

const selectors = {
    // SELECTOR_SUBS_FEATURES: 'subscription-features'
    SELECTOR_SUBS_FEATURES: '#subscription-management__cards .mx-auto'
}

// --- Extend DOM builder to support optional buttons ---
const applyVariationChanges = (element) => {
  const container = document.createElement('div');
  container.className = 'subs-container';

  const heading = document.createElement('h2');
  heading.textContent = "Your subscription includes:";
  container.appendChild(heading);

  subscriptionItems.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'subs-item';

    const iconDiv = document.createElement('div');
    iconDiv.className = 'subs-icon';
    iconDiv.textContent = item.icon;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'subs-content';

    const titleEl = document.createElement('h3');
    titleEl.innerHTML = item.title + (item.highlight ? ` <span class="subs-highlight">${item.highlight}</span>` : "");

    const descEl = document.createElement('p');
    descEl.innerHTML = item.description;

    contentDiv.appendChild(titleEl);
    contentDiv.appendChild(descEl);

    // Add button if present
    if (item.button) {
      const btn = document.createElement('a');
      btn.href = item.button.url;
      btn.className = 'subs-btn';
      btn.textContent = item.button.text;
      contentDiv.appendChild(btn);
    }

    itemDiv.appendChild(iconDiv);
    itemDiv.appendChild(contentDiv);

    container.appendChild(itemDiv);
  });

  const ELEMENT_SUBSCRIPTION_FEATURES = document.querySelector(selectors.SELECTOR_SUBS_FEATURES);
  if (ELEMENT_SUBSCRIPTION_FEATURES) {
    ELEMENT_SUBSCRIPTION_FEATURES.replaceWith(container);
  }

  customLog('Subscription container built from data object (VARIATION 2).');
};

function waitForElements(elementSelector) {
    customLog('[waitForElements] Starting to wait for elements...');

    Promise.all([
        DYO.waitForElementAsync(elementSelector, 1, 100, 150)
    ])
        .then(function (results) {
            const subscriptionFeatures = results[0];

            console.log(subscriptionFeatures);

            customLog('subscriptionFeatures found:', subscriptionFeatures[0]);

            // --- Add CSS ---
            addStyles(styles);

            // --- Apply changes ---
            applyVariationChanges(subscriptionFeatures);
        })
        .catch(function (error) {
            console.warn('[waitForElements] SubscriptionFeatures element not found within timeout.');
        });
}

function init() {
    try {
        customLog(TEST_NAME + ' | ' + SOURCE_TYPE + ' | ' + VARIATION);
        customLog('[init] Current URL: ' + CURRENT_URL);
        customLog('[init] Environment: ' + ENVIRONMENT);

        document.body.classList.add('omaze-subs-25-callout-25-v1');
        customLog('[init] Added class omaze-subs-25-callout-25-v1 to body');

        waitForElements(selectors.SELECTOR_SUBS_FEATURES);
    } catch (error) {
        console.error(error.message);
    }
}

init();
