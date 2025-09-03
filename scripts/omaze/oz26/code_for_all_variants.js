const LOG_ENABLED = true;
const TEST_NAME = "Subs Mgmt - Subscription Value Call-Out";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "1";
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

const selectors = {
  ACTIVE_TIER_CARD: 'tier-card[active]',
  SELECTOR_SUBS_FEATURES: '#subscription-management__cards .mx-auto > subscription-features'
}

const styles = `
  .subs-container {
    padding: 14.5px;
    padding-bottom: 16px;
    max-width: 420px;
    font-family: Arial, sans-serif;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    margin: 0 auto;
    width: 297px;
    opacity: 1;
    border-radius: 10px;
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
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    width: 268px;
    opacity: 1;
    border-radius: 8px;
    padding: 1rem;
  }

  .subs-icon {
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

// --- Data object ---
const subscriptionItems = [
  {
    icon: "https://cdn-eu.dynamicyield.com/api/9880449/images/1ba78e76c656.png",
    title: "Grand Prize House Draw",
    highlight: {
      25: "100 Entries",
      50: "640 Entries"
    },
    description: "Your chance to win a multi-million house.",
    button: {
      text: "See this month’s house",
      url: "#"
    }
  },
  {
    icon: "https://cdn-eu.dynamicyield.com/api/9880449/images/aee613cb897a.png",
    title: "Monthly Millionaire",
    highlight: {
      25: "200 Entries",
      50: "640 Entries"
    },
    description: "Your chance to win £1,000,000 a month.",
    button: {
      text: "Find out more",
      url: "#"
    }
  },
  {
    icon: "https://cdn-eu.dynamicyield.com/api/9880449/images/368fcb130af4.png",
    title: "Monthly Subscriber Cash Draw",
    highlight: {
      25: "200 Entries",
      50: "640 Entries"
    },
    description: "Your chance to win £100,000 in cash a month.",
  },
  {
    icon: "https://cdn-eu.dynamicyield.com/api/9880449/images/015443682e58.png",
    title: "Early Bird Prize Draw",
    highlight: {
      25: "200 Entries",
      50: "640 Entries"
    },
    description: "Your chance to win cars and cash.",
  },
  {
    icon: "https://cdn-eu.dynamicyield.com/api/9880449/images/fc255b313fb3.png",
    title: "Supporting a UK Charity",
    highlight: {}, // No highlight for this item
    description: "You’re helping fund <strong>Teenage Cancer Trust</strong>, who provide specialised care and support to over 7,000 young people with cancer every year.",
    button: {
      text: "Find out more",
      url: "#"
    }
  }
];

const fireEvents = (price) => {
  console.log('Firing events for price ' + price);

  if (price === '25') {
    customLog('[init] ----- Price is 25, firing event');
    DY.API('event', {
      name: 'oz26_price_25'
    });
  }

  if (price === '50') {
    customLog('[init] ----- Price is 50, firing event');
    DY.API('event', {
      name: 'oz26_price_50'
    });
  }
}

const applyVariationChanges = (price, variation, subscriptionFeatures) => {
  const ccxContainer = document.querySelector('.subs-container');

  if (ccxContainer) {
    return;
  }

  // Validate variation
  if (variation !== "1" && variation !== "2") {
    console.warn('Invalid variation, must be 1 or 2:', variation);
    return;
  }

  // Validate price
  if (price !== '25' && price !== '50') {
    console.warn('Price ' + price + ' is not 25 or 50, defaulting to 25');
    price = '25';
  }

  // Check if subscriptionFeatures exists
  if (!subscriptionFeatures) {
    console.warn('subscription-features element not provided');
    return;
  }

  // Create container
  const container = document.createElement('div');
  container.className = 'subs-container';

  const heading = document.createElement('h2');
  heading.textContent = "Your subscription includes:";
  container.appendChild(heading);

  // Check if subscriptionItems exists and is an array
  if (!Array.isArray(subscriptionItems)) {
    console.warn('subscriptionItems is not an array or is undefined');
    return;
  }

  subscriptionItems.forEach(item => {
    if (!item) {
      console.warn('Invalid item in subscriptionItems');
      return;
    }

    const itemDiv = document.createElement('div');
    itemDiv.className = 'subs-item';

    // Create icon container with image
    const iconDiv = document.createElement('div');
    iconDiv.className = 'subs-icon';
    if (item.icon) {
      const imgElement = document.createElement('img');
      imgElement.src = item.icon;
      imgElement.alt = item.title ? item.title + ' icon' : 'Subscription item icon';
      imgElement.style.width = '34px';
      imgElement.style.height = '34px';
      iconDiv.appendChild(imgElement);
    } else {
      console.warn('Missing icon for item:', item.title || 'unknown item');
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'subs-content';

    // Title and highlight
    const titleEl = document.createElement('h3');
    titleEl.innerHTML = (item.title ? item.title : 'Untitled') +
      (item.highlight && item.highlight[price] ? ' <span class="subs-highlight">' + item.highlight[price] + '</span>' : "")

    // Description
    const descEl = document.createElement('p');
    descEl.innerHTML = item.description || '';

    contentDiv.appendChild(titleEl);
    contentDiv.appendChild(descEl);

    // Add button if present and valid for Variation 2
    if (variation === '2' && item.button && typeof item.button === 'object' && item.button.text && item.button.url) {
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

  // Replace subscription-features element
  subscriptionFeatures.replaceWith(container);
  customLog('Subscription container built for Variation ' + variation + ' and Price £' + price + '.');

  // Fire events
  fireEvents(variation, price);
};

function waitForElements(selectors, callback) {
  customLog('[waitForElements] Starting to wait for elements...');
  customLog('[waitForElements] Selectors provided:', selectors);

  if (!selectors || !Array.isArray(selectors) || selectors.length === 0) {
    customLog('[waitForElements] No selectors provided.');
    return;
  }

  // Check DYO availability
  customLog('[waitForElements] window.DYO exists:', !!window.DYO);
  customLog('[waitForElements] DYO.waitForElementAsync exists:', !!window.DYO?.waitForElementAsync);

  if (!window.DYO || !DYO.waitForElementAsync) {
    console.warn('[waitForElements] DYO.waitForElementAsync is not available, attempting fallback with document.querySelector');

    // Fallback: Try document.querySelector for each selector
    const results = selectors.map(selector => {
      try {
        const element = document.querySelector(selector);
        customLog('[waitForElements] Fallback query for ' + selector + ':', element);
        return element ? [element] : [];
      } catch (error) {
        console.warn('[waitForElements] Error querying ' + selector + ':', error);
        return [];
      }
    });

    if (results.every(result => result.length > 0)) {
      customLog('[waitForElements] All elements found via fallback:', results);
      if (typeof callback === 'function') callback(results);
    } else {
      console.warn('[waitForElements] Some elements not found via fallback:', results);
    }
    return;
  }

  // Create promises for each selector
  const promises = selectors.map(selector =>
    DYO.waitForElementAsync(selector, 1, 200, 100) // 200ms interval, 100 retries = 20s
      .then(result => {
        customLog('[waitForElements] Found elements for ' + selector + ':', result);
        return result;
      })
      .catch(error => {
        console.warn('[waitForElements] Failed to find elements for ' + selector + ':', error);
        return []; // Return empty array to allow Promise.all to resolve
      })
  );

  Promise.all(promises)
    .then(results => {
      customLog('[waitForElements] All promises resolved:', results);
      // Check if all selectors found at least one element
      if (results.every(result => result.length > 0)) {
        customLog('[waitForElements] All elements found:', results);
        if (typeof callback === 'function') callback(results);
      } else {
        console.warn('[waitForElements] Some selectors did not return elements:', results);

        // Fallback: Try document.querySelector again
        const fallbackResults = selectors.map(selector => {
          try {
            const element = document.querySelector(selector);
            customLog('[waitForElements] Fallback query for ' + selector + ':', element);
            return element ? [element] : [];
          } catch (error) {
            console.warn('[waitForElements] Fallback error for ' + selector + ':', error);
            return [];
          }
        });

        if (fallbackResults.every(result => result.length > 0)) {
          customLog('[waitForElements] All elements found via fallback:', fallbackResults);
          if (typeof callback === 'function') callback(fallbackResults);
        } else {
          console.warn('[waitForElements] Some elements still not found via fallback:', fallbackResults);
        }
      }
    })
    .catch(error => {
      console.warn('[waitForElements] Promise.all failed:', error);
    });
}

function observeSubscriptionManagementCards() {
  customLog('[observeSubscriptionManagementCards] Starting to observe changes...');

  // Check if target element exists
  const targetElement = document.querySelector('#subscription-management__cards');
  if (!targetElement) {
    console.warn('[observeSubscriptionManagementCards] Target element #subscription-management__cards not found');
    return;
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // Check only mutations with added nodes
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          // Ensure node is an element (not a text node or comment)
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the parent element is a tier-card with active attribute
            const parent = node.parentElement;
            if (parent && parent.tagName.toLowerCase() === 'tier-card' && parent.hasAttribute('active')) {
              customLog('[observeSubscriptionManagementCards] Detected added node with parent tier-card[active]:', node);
              try {
                init();
                customLog('[observeSubscriptionManagementCards] init function called');
              } catch (error) {
                console.error('[observeSubscriptionManagementCards] Error calling init:', error.message);
              }
            }
          }
        });
      }
    });
  });

  // Observe changes to childList and subtree
  observer.observe(targetElement, {
    childList: true,
    subtree: true,
  });

  customLog('[observeSubscriptionManagementCards] Observer set up for #subscription-management__cards');
}

function init() {
  try {
    customLog(TEST_NAME + ' | ' + SOURCE_TYPE + ' | ' + VARIATION);
    customLog('[init] Current URL: ' + CURRENT_URL);
    customLog('[init] Environment: ' + ENVIRONMENT);

    document.body.classList.add('omaze-subs-25-callout-25-v1');
    customLog('[init] Added class omaze-subs-25-callout-25-v1 to body');

    const elementSelectors = [selectors.SELECTOR_SUBS_FEATURES, selectors.ACTIVE_TIER_CARD];

    waitForElements(elementSelectors, (results) => {
      // Create variables for each element
      const subscriptionFeatures = results[0]?.[0] || null; // First element of first array
      const tierCard = results[1]?.[0] || null; // First element of second array

      // Log for verification
      customLog('[waitForElements] Assigned variables:');
      customLog('subscriptionFeatures:', subscriptionFeatures);
      customLog('tierCard:', tierCard);

      // Extract and filter price from tier-card
      let price = null;
      if (tierCard && subscriptionFeatures) {
        price = tierCard.getAttribute('price');
        customLog('Extracted price from tier-card:', price);

        if (price === '15') {
          customLog('[init] Price is 15, skipping callout');
          return;
        }

        customLog('[init] Price is not 15, proceeding with callout');

        // --- Add CSS ---
        addStyles(styles);

        // --- Apply changes ---
        applyVariationChanges(price, VARIATION, subscriptionFeatures);

        // --- Observe changes ---
        observeSubscriptionManagementCards();
      } else {
        console.warn('tier-card or subscription-features element not found');
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}

init();
