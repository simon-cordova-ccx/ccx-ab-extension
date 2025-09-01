const LOG_ENABLED = true;
const TEST_NAME = "OZDE-5 | Entry Tab Removal";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const plansData = [
  {
    type: 'payg',
    planData: {
      id: 1,
      name: 'PAYG 10€',
      price: '10€',
      data: '20 Lose',
      duration: ''
    }
  },
  {
    type: 'payg',
    planData: {
      id: 2,
      name: 'PAYG 25€',
      price: '25€',
      data: '50 Lose',
      duration: ''
    }
  },
  {
    type: 'payg',
    planData: {
      id: 3,
      name: 'PAYG 35€',
      price: '35€',
      data: '70 Lose',
      duration: ''
    }
  },
  {
    type: 'subscription',
    planData: {
      id: 4,
      name: 'Subscription 10€/Month',
      bonusRaffle: 2,
      price: '10€',
      freeEntries: 20,
      freeEntriesBonus: 1
    }
  },
  {
    type: 'subscription',
    planData: {
      id: 5,
      name: 'Subscription 25€/Month',
      bonusRaffle: 4,
      price: '25€',
      freeEntries: 50,
      freeEntriesBonus: 4
    }
  },
  {
    type: 'subscription',
    planData: {
      id: 6,
      name: 'Subscription 35€/Month',
      bonusRaffle: 4,
      price: '35€',
      freeEntries: 70,
      freeEntriesBonus: 6
    }
  }
];

const styles = ``;

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

function createMobilePAYGCard(planData) {
  const card = document.createElement('article');
  card.className = 'payg-card';
  card.setAttribute('aria-labelledby', `plan-${planData.id}-title`);
  card.setAttribute('data-test', `mobile-card-variant-payg`);

  const title = document.createElement('h2');
  title.className = 'payg-card-title';
  title.id = `plan-${planData.id}-title`;
  title.textContent = planData.name;

  const price = document.createElement('p');
  price.className = 'payg-card-price';
  price.textContent = planData.price;

  const dataAllowance = document.createElement('p');
  dataAllowance.className = 'payg-card-data-allowance';
  dataAllowance.textContent = planData.data;

  const duration = document.createElement('p');
  duration.className = 'payg-card-duration';
  duration.textContent = planData.duration;

  const button = document.createElement('button');
  button.className = 'payg-card-select-button';
  button.textContent = 'Select Plan';
  button.setAttribute('aria-label', `Select ${planData.name} plan`);

  card.append(title, price, dataAllowance, duration, button);
  return card;
}

function createMobileSubscriptionCard(planData) {
  const card = document.createElement('article');
  card.className = 'subscription-card';
  card.setAttribute('aria-labelledby', `plan-${planData.id}-title`);
  card.setAttribute('data-test', `card-variant-subscription`);

  const bonusRaffle = document.createElement('div');
  bonusRaffle.className = 'subscription-card-bonus';
  bonusRaffle.textContent = `${planData.bonusRaffle} Bonus Verlosung inklusive`;

  const price = document.createElement('h2');
  price.className = 'subscription-card-price';
  price.id = `plan-${planData.id}-title`;
  price.textContent = `${planData.price}/Monat`;

  const freeEntries = document.createElement('p');
  freeEntries.className = 'subscription-card-entries';
  freeEntries.textContent = `${planData.freeEntries} + ${planData.freeEntriesBonus} Gratis Los`;

  const button = document.createElement('button');
  button.className = 'subscription-card-join-button';
  button.textContent = 'Mitmachen';
  button.setAttribute('aria-label', `Join ${planData.name} plan`);

  card.append(bonusRaffle, price, freeEntries, button);
  return card;
}

const targetElement = document.querySelector('#enter-now-material-tab-buttons-design entries-tab-nav');
if (targetElement) {
  plansData.forEach(plan => {
    const card = plan.type === 'payg' 
      ? createMobilePAYGCard(plan.planData) 
      : createMobileSubscriptionCard(plan.planData);
    targetElement.parentNode.insertBefore(card, targetElement);
  });
}

function init() {
  try {
    customLog(TEST_NAME + ' | ' + SOURCE_TYPE + ' | ' + VARIATION);
    customLog('[init] Current URL: ' + CURRENT_URL);
    customLog('[init] Environment: ' + ENVIRONMENT);

    document.body.classList.add('omaze-de5-v1');
    customLog('[init] Added class omaze-de5-v1 to body');

    waitForElements(selectors.SELECTOR_HOME_CAROUSEL);
  } catch (error) {
    console.error(error.message);
  }
}

init();
