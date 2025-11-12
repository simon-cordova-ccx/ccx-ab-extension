(function () {
  const LOG_ENABLED = true;
  const TEST_ID = "2-1";
  const TEST_NAME = " Entries Page Content Hierarchy";
  const VARIATION = "variation-1";
  const CURRENT_URL = window.location.href;

  const SELECTORS = {
    CONTROL_SUBSCRIPTIONS_TITLE: '#enter-now-material-tab-buttons-design > [id*=nav-latest] [id*=subscription-tab-pane] > div:first-of-type',
    CONTROL_SUBSCRIPTIONS_CONTAINER: '#enter-now-material-tab-buttons-design > [id*=nav-latest] [id*=subscription-tab-pane]',
    CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS: '#enter-now-material-tab-buttons-design > [id*=nav-latest] [id*=subscription-tab-pane] [data-test="card-variant-subscription"]',
  }

  const STYLES = `
/* ===============================
HEADER BULLET POINTS
=============================== */
.ccx-subscription-banner-bullet-points {
  justify-content: space-around;
  gap: 1px;
  opacity: 1;
  border-radius: 8px;
  border-width: 1px;
  background: #0193A71A;
  border: 1px solid #7CC7D2;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0 auto;
  max-width: 375px;
}

.ccx-bullet-point-item {
  display: flex;
  align-items: center;
  height: 45px;
  justify-content: space-around;
  gap: 0.25rem;
  padding: 0;
  opacity: 1;
  border-radius: 8px;
  border-width: 1px;
  }

.ccx-bullet-point-item svg {
  width: 14px;
  height: 14px;
}

.ccx-bullet-point-text {
  font-family: Gellix;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0;
}


@media screen and (min-width: 992px) {
  .ccx-subscription-banner-bullet-points {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 2rem;
    border: none;
    background: no-repeat;
    max-width: 464px;
  }
  
  .ccx-bullet-point-item {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    border: none;
  }

  .ccx-bullet-point-item svg {
    width: auto;
    height: auto;
  }
    
  .ccx-bullet-point-text {
    font-size: 16px;
  }
}


/* ===============================
SUBSCRIPTION CARDS
=============================== */
#enter-now-material-tab-buttons-design > [id*=nav-latest] [id*=subscription-tab-pane] [data-test="card-variant-subscription"] > .text-left > .flex {
  display: none !important;
}

.subscription-card-item {
  width: 304px;
  max-width: 100%;
  border-radius: 8px;
  border-width: 1px;
  opacity: 1;
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.subscription-card-item.subscription-card-item-house {
  background: #FFDD001A;
  border: 1px solid #FFDD00;
}

.subscription-card-item.subscription-card-item-money {
  background: #0193A71A;
  border: 1px solid #0193A780;
}

.subscription-card-item.subscription-card-item-gift {
  background: #EF44440D;
  border: 1px solid #EF444433;
}

.subscription-card-item .title {
  font-family: Gellix;
  font-weight: 700;
  color: #00A3A8;
  font-size: 18px;
  line-height: 130%;
  letter-spacing: 0;
  vertical-align: middle;
  margin-bottom: 0.25rem;
}

.subscription-card-item .text {
  font-family: Gellix;
  font-weight: 400;
  font-size: 15px;
  line-height: 120%;
  letter-spacing: 0;
  vertical-align: middle;
  margin: 0;
}

.subscription-card-item span {
  font-family: Gellix;
  font-weight: 700;
  font-size: 15px;
  line-height: 120%;
  letter-spacing: 0;
  vertical-align: initial;
}

  `;

  const SVG_CHECKBOX = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.0001 23.8334C14.423 23.8351 15.8322 23.5557 17.1468 23.0112C18.4614 22.4666 19.6555 21.6677 20.6603 20.6603C21.6678 19.6554 22.4667 18.4614 23.0112 17.1468C23.5558 15.8322 23.8352 14.4229 23.8334 13C23.8352 11.5771 23.5558 10.1679 23.0112 8.85329C22.4667 7.5387 21.6678 6.34466 20.6603 5.33978C19.6555 4.33237 18.4614 3.53344 17.1468 2.9889C15.8322 2.44436 14.423 2.16494 13.0001 2.1667C11.5772 2.16494 10.1679 2.44436 8.85336 2.9889C7.53876 3.53344 6.34472 4.33237 5.33984 5.33978C4.33243 6.34466 3.5335 7.5387 2.98896 8.85329C2.44442 10.1679 2.165 11.5771 2.16676 13C2.165 14.4229 2.44442 15.8322 2.98896 17.1468C3.5335 18.4614 4.33243 19.6554 5.33984 20.6603C6.34472 21.6677 7.53876 22.4666 8.85336 23.0112C10.1679 23.5557 11.5772 23.8351 13.0001 23.8334Z" fill="#00A3A8" stroke="#00A3A8" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M8.66675 13L11.9167 16.25L18.4167 9.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

  const subscriptionCards = {
    15: [
      {
        type: 'house',
        icon: '🏡',
        title: 'Chance to win the house',
        text: `<span>100 entries</span> into every <span>Grand Prize House Draw</span> and Early Bird draw`
      },
      {
        type: 'money',
        icon: '💰',
        title: 'Chance to win £1,000,000',
        text: `<span>100 entries</span> into the Omaze Monthly Millionaire cash prize draw`
      }
    ],
    25: [
      {
        type: 'house',
        icon: '🏡',
        title: 'Chance to win the house',
        text: `<span>200 entries</span> into every <span>Grand Prize House Draw</span> and Early Bird draw`
      },
      {
        type: 'money',
        icon: '💰',
        title: 'Chance to win £1,000,000',
        text: `<span>200 entries</span> into the Omaze Monthly Millionaire cash prize draw`
      },
      {
        type: 'gift',
        icon: '🎁',
        title: 'Chance to win £100,000',
        text: `<span>200 entries</span> into a monthly subscriber cash prize draw`
      }
    ],
    50: [
      {
        type: 'house',
        icon: '🏡',
        title: 'Chance to win the house',
        text: `<span>640 entries</span> into every <span>Grand Prize House Draw</span> and Early Bird draw`
      },
      {
        type: 'money',
        icon: '💰',
        title: 'Chance to win £1,000,000',
        text: `<span>640 entries</span> into the Omaze Monthly Millionaire cash prize draw`
      },
      {
        type: 'gift',
        icon: '🎁',
        title: 'Chance to win £100,000',
        text: `<span>640 entries</span> into a monthly subscriber cash prize draw`
      }
    ]
  };

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
        msg.forEach(item => {
          if (item instanceof Element) {
            parts.push("%o");
            values.push(item);
          } else if (item && typeof item === "object" && "html" in item) {
            const wrapper = document.createElement("div");
            wrapper.innerHTML = item.html.trim();
            const el = wrapper.firstElementChild;
            parts.push("%o");
            values.push(el);
            const { html, ...rest } = item;
            if (Object.keys(rest).length > 0) {
              parts.push("%O");
              values.push(rest);
            }
          } else {
            parts.push("%O");
            values.push(item);
          }
        });
      } else if (msg && typeof msg === "object" && "html" in msg) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = msg.html.trim();
        const el = wrapper.firstElementChild;
        parts.push("%o");
        values.push(el);
        const { html, ...rest } = msg;
        if (Object.keys(rest).length > 0) {
          parts.push("%O");
          values.push(rest);
        }
      } else {
        if (typeof msg === "string") {
          parts.push("%c" + msg.toUpperCase());
          values.push(style);
        } else {
          parts.push("%O");
          values.push(msg);
        }
      }
    });

    console.log(parts.join(" "), ...values);
  };

  const addStyles = (cssString = '', variation = 'control') => {
    if (!cssString) return;
    if (!variation) variation = 'control';
    const styleClass = 'ccx-styles-' + TEST_ID.toLowerCase() + '-' + variation.toLowerCase().replace(/\s+/g, '-') + '';

    // if styles for this variation already exist, don't add again
    if (document.querySelector('.' + styleClass)) return;

    const style = document.createElement('style');
    style.classList.add(styleClass);
    style.appendChild(document.createTextNode(cssString));
    document.head.appendChild(style);
  };

  const addBodyClass = (bodyClass) => {
    // If the class for this variation already exists, don't add again
    if (!document.querySelector('.' + bodyClass)) {
      document.body.classList.add(bodyClass); // Add class to the body element
      customLog('[init] Added class ' + bodyClass + ' to body');
    }
  }

  const waitForElements = (configs, callback) => {
    if (!configs || !Array.isArray(configs) || configs.length === 0) return;
    if (!window.DYO || !DYO.waitForElementAsync) return;

    const promises = configs.map(cfg => {
      const { selector, count } = cfg;
      return DYO.waitForElementAsync(selector, count, 100, 150)
        .then(elements => ({ selector, elements }));
    });

    Promise.all(promises)
      .then(results => {
        if (typeof callback === 'function') callback(results);
      })
      .catch(() => { });
  }

  const createSubscriptionBannerBulletPoints = (CONTROL_SUBSCRIPTIONS_TITLE) => {
    // customLog('[createSubscriptionBannerBulletPoints]');
    const container = document.createElement('div');
    container.classList.add('ccx-subscription-banner-bullet-points');

    const bulletPoints = [
      'Monthly Millionaire included',
      'Cancel at any time'
    ];

    bulletPoints.forEach(point => {
      const item = document.createElement('div');
      item.classList.add('ccx-bullet-point-item');

      const icon = document.createElement('span');
      icon.classList.add('ccx-bullet-point-icon');
      icon.innerHTML = SVG_CHECKBOX;
      item.appendChild(icon);

      const text = document.createElement('span');
      text.classList.add('ccx-bullet-point-text');
      text.textContent = point;
      item.appendChild(text);

      container.appendChild(item);
    });

    CONTROL_SUBSCRIPTIONS_TITLE.insertAdjacentElement('afterend', container);
  }

  function renderCardContent(CONTROL_SUBSCRIPTIONS_CONTAINER, card, cards) {

    console.log('CONTROL_SUBSCRIPTIONS_CONTAINER', CONTROL_SUBSCRIPTIONS_CONTAINER);

    const CONTROL_CARD = CONTROL_SUBSCRIPTIONS_CONTAINER.querySelector(card);
    console.log('CONTROL_CARD', CONTROL_CARD);

    if (!CONTROL_CARD) return;

    // Find the last nested div
    const innerContainer = CONTROL_CARD.querySelector('.text-left');
    console.log('innerContainer', innerContainer);

    if (!innerContainer) return;

    const cardElements = cards.map(function (card) {
      return (
        '<div class="subscription-card-item subscription-card-item-' + card.type + '">' +
        '<div class="icon">' + card.icon + '</div>' +
        '<div class="content">' +
        '<h3 class="title">' + card.title + '</h3>' +
        '<p class="text">' + card.text + '</p>' +
        '</div>' +
        '</div>'
      );
    }).join('');


    innerContainer.insertAdjacentHTML('afterbegin', cardElements);
  }

  const init = () => {
    try {
      customLog(TEST_ID + ' | ' + VARIATION + ' | ' + TEST_NAME);
      customLog('[init] Current URL: ' + CURRENT_URL);

      waitForElements(
        [
          { selector: SELECTORS.CONTROL_SUBSCRIPTIONS_TITLE, count: 1 },
          { selector: SELECTORS.CONTROL_SUBSCRIPTIONS_CONTAINER, count: 1 },
          { selector: SELECTORS.CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS, count: 3 },
        ],
        function (results) {
          const bodyClass = 'ccx-' + TEST_ID.toLowerCase() + '-' + VARIATION.toLowerCase().replace(/\s+/g, '-') + '';

          // Add styles
          addStyles(STYLES, VARIATION);
          addBodyClass(bodyClass);

          const CONTROL_SUBSCRIPTIONS_TITLE = results[0].elements[0];
          if (!CONTROL_SUBSCRIPTIONS_TITLE) return;
          // customLog(CONTROL_SUBSCRIPTIONS_TITLE);

          const CONTROL_SUBSCRIPTIONS_CONTAINER = results[1].elements[0];
          if (!CONTROL_SUBSCRIPTIONS_CONTAINER) return;
          // customLog(CONTROL_SUBSCRIPTIONS_CONTAINER);

          const CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS = results[2].elements[0];
          if (!CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS) return;
          // customLog(CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS);

          createSubscriptionBannerBulletPoints(CONTROL_SUBSCRIPTIONS_TITLE);

          renderCardContent(CONTROL_SUBSCRIPTIONS_CONTAINER, '#subscription-card-15', subscriptionCards[15]);
          renderCardContent(CONTROL_SUBSCRIPTIONS_CONTAINER, '#subscription-card-25', subscriptionCards[25]);
          renderCardContent(CONTROL_SUBSCRIPTIONS_CONTAINER, '#subscription-card-50', subscriptionCards[50]);
        }
      );

    } catch (error) {
      customLog(error);
    }
  }

  init();
})();