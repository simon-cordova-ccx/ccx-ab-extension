(function () {
  const LOG_ENABLED = true;
  const TEST_ID = "2-2";
  const TEST_NAME = " Entries Page Content Hierarchy";
  const VARIATION = "variation-1";
  const CURRENT_URL = window.location.href;

  const SELECTORS = {
    CONTROL_SUBSCRIPTIONS_TITLE: '#enter-now-material-tab-buttons-design > [id*=nav-latest] [id*=subscription-tab-pane] > div:first-of-type',
    CONTROL_SUBSCRIPTIONS_CONTAINER: '#enter-now-material-tab-buttons-design > [id*=nav-latest] [id*=subscription-tab-pane]',
    CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS: '#enter-now-material-tab-buttons-design > [id*=nav-latest] [id*=subscription-tab-pane] [data-test="card-variant-subscription"]',
  }

    const SVG_HOUSE = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_273_3648" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_273_3648)">
<path d="M4 19V11.625L3 12.4C2.76666 12.5667 2.51666 12.6333 2.25 12.6C1.98333 12.5667 1.76666 12.4333 1.6 12.2C1.43333 11.9667 1.36666 11.7167 1.4 11.45C1.43333 11.1833 1.55833 10.9667 1.775 10.8L4 9.1V7C4 6.71667 4.09583 6.47917 4.2875 6.2875C4.47916 6.09583 4.71666 6 5 6C5.28333 6 5.52083 6.09583 5.7125 6.2875C5.90416 6.47917 6 6.71667 6 7V7.575L10.775 3.925C10.9583 3.79167 11.1542 3.69167 11.3625 3.625C11.5708 3.55833 11.7833 3.525 12 3.525C12.2167 3.525 12.4292 3.55833 12.6375 3.625C12.8458 3.69167 13.0417 3.79167 13.225 3.925L22.225 10.8C22.4417 10.9667 22.5667 11.1833 22.6 11.45C22.6333 11.7167 22.5667 11.9667 22.4 12.2C22.2333 12.4167 22.0167 12.5417 21.75 12.575C21.4833 12.6083 21.2417 12.5417 21.025 12.375L20 11.625V19C20 19.55 19.8042 20.0208 19.4125 20.4125C19.0208 20.8042 18.55 21 18 21H13.5C13.3667 21 13.25 20.95 13.15 20.85C13.05 20.75 13 20.6333 13 20.5V16C13 15.7167 12.9042 15.4792 12.7125 15.2875C12.5208 15.0958 12.2833 15 12 15C11.7167 15 11.4792 15.0958 11.2875 15.2875C11.0958 15.4792 11 15.7167 11 16V20.5C11 20.6333 10.95 20.75 10.85 20.85C10.75 20.95 10.6333 21 10.5 21H6C5.45 21 4.97916 20.8042 4.5875 20.4125C4.19583 20.0208 4 19.55 4 19ZM5.3 5C4.91666 5 4.62083 4.84167 4.4125 4.525C4.20416 4.20833 4.19166 3.88333 4.375 3.55C4.65833 3.06667 5.02916 2.6875 5.4875 2.4125C5.94583 2.1375 6.45 2 7 2C7.18333 2 7.35833 1.95417 7.525 1.8625C7.69166 1.77083 7.81666 1.64167 7.9 1.475C7.98333 1.325 8.09583 1.20833 8.2375 1.125C8.37916 1.04167 8.54166 1 8.725 1C9.10833 1 9.4 1.15833 9.6 1.475C9.8 1.79167 9.80833 2.11667 9.625 2.45C9.34166 2.93333 8.97083 3.3125 8.5125 3.5875C8.05416 3.8625 7.55 4 7 4C6.81666 4 6.64166 4.04167 6.475 4.125C6.30833 4.20833 6.18333 4.34167 6.1 4.525C6.01666 4.675 5.90833 4.79167 5.775 4.875C5.64166 4.95833 5.48333 5 5.3 5Z" fill="#0193A7"/>
</g>
</svg>
`;

  const SVG_DOLLAR_SIGN = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5833 22.4167C17.5664 22.4167 22.4167 17.5664 22.4167 11.5833C22.4167 5.60025 17.5664 0.75 11.5833 0.75C5.60025 0.75 0.75 5.60025 0.75 11.5833C0.75 17.5664 5.60025 22.4167 11.5833 22.4167Z" fill="#0193A7" stroke="#0193A7" stroke-width="1.5"/>
<path d="M10.5835 12.5833C9.9165 14.2503 8.9165 15.9163 7.5835 16.5833H13.9165C13.9165 16.5833 14.9165 16.5833 15.5835 15.9163M13.2505 12.5833H6.5835H13.2505ZM14.5835 9.58331C14.5835 8.98997 14.4075 8.40995 14.0779 7.9166C13.7483 7.42326 13.2797 7.03874 12.7315 6.81168C12.1834 6.58461 11.5802 6.5252 10.9982 6.64096C10.4163 6.75671 9.88173 7.04244 9.46218 7.46199C9.04262 7.88155 8.7569 8.4161 8.64114 8.99804C8.52538 9.57999 8.58479 10.1832 8.81186 10.7314C9.03892 11.2795 9.42344 11.7481 9.91679 12.0777C10.4101 12.4074 10.9902 12.5833 11.5835 12.5833" fill="#0193A7"/>
<path d="M10.5835 12.5833C9.9165 14.2503 8.9165 15.9163 7.5835 16.5833H13.9165C13.9165 16.5833 14.9165 16.5833 15.5835 15.9163M13.2505 12.5833H6.5835M14.5835 9.58331C14.5835 8.98997 14.4075 8.40995 14.0779 7.9166C13.7483 7.42326 13.2797 7.03874 12.7315 6.81168C12.1834 6.58461 11.5802 6.5252 10.9982 6.64096C10.4163 6.75671 9.88173 7.04244 9.46218 7.46199C9.04262 7.88155 8.7569 8.4161 8.64114 8.99804C8.52538 9.57999 8.58479 10.1832 8.81186 10.7314C9.03892 11.2795 9.42344 11.7481 9.91679 12.0777C10.4101 12.4074 10.9902 12.5833 11.5835 12.5833" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

  const SVG_CLOSE = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_194_7403" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_194_7403)">
<path d="M12 13.0538L15.073 16.127C15.2115 16.2653 15.3856 16.3362 15.5953 16.3395C15.8048 16.3427 15.982 16.2718 16.127 16.127C16.2718 15.982 16.3443 15.8063 16.3443 15.6C16.3443 15.3937 16.2718 15.218 16.127 15.073L13.0538 12L16.127 8.927C16.2653 8.7885 16.3362 8.61442 16.3395 8.40475C16.3427 8.19525 16.2718 8.018 16.127 7.873C15.982 7.72817 15.8063 7.65575 15.6 7.65575C15.3937 7.65575 15.218 7.72817 15.073 7.873L12 10.9462L8.927 7.873C8.7885 7.73467 8.61442 7.66383 8.40475 7.6605C8.19525 7.65733 8.018 7.72817 7.873 7.873C7.72817 8.018 7.65575 8.19367 7.65575 8.4C7.65575 8.60633 7.72817 8.782 7.873 8.927L10.9462 12L7.873 15.073C7.73467 15.2115 7.66383 15.3856 7.6605 15.5953C7.65733 15.8048 7.72817 15.982 7.873 16.127C8.018 16.2718 8.19367 16.3443 8.4 16.3443C8.60633 16.3443 8.782 16.2718 8.927 16.127L12 13.0538ZM12.0017 21.5C10.6877 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#081F28"/>
</g>
</svg>
`;

const SVG_CALENDAR = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_256_39631" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="1" y="1" width="24" height="24">
<rect x="1" y="1" width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_256_39631)">
<path d="M6 9.80777H20V7.30777C20 7.23077 19.9679 7.16026 19.9038 7.09626C19.8398 7.0321 19.7693 7.00002 19.6923 7.00002H6.30775C6.23075 7.00002 6.16025 7.0321 6.09625 7.09626C6.03208 7.16026 6 7.23077 6 7.30777V9.80777ZM6.30775 22.5C5.80258 22.5 5.375 22.325 5.025 21.975C4.675 21.625 4.5 21.1974 4.5 20.6923V7.30777C4.5 6.8026 4.675 6.37502 5.025 6.02502C5.375 5.67502 5.80258 5.50002 6.30775 5.50002H7.69225V4.15377C7.69225 3.9346 7.76567 3.7516 7.9125 3.60477C8.05933 3.4581 8.24233 3.38477 8.4615 3.38477C8.68083 3.38477 8.86383 3.4581 9.0105 3.60477C9.15733 3.7516 9.23075 3.9346 9.23075 4.15377V5.50002H16.8078V4.13477C16.8078 3.92193 16.8795 3.74368 17.023 3.60002C17.1667 3.45652 17.3449 3.38477 17.5578 3.38477C17.7706 3.38477 17.9488 3.45652 18.0923 3.60002C18.2359 3.74368 18.3078 3.92193 18.3078 4.13477V5.50002H19.6923C20.1974 5.50002 20.625 5.67502 20.975 6.02502C21.325 6.37502 21.5 6.8026 21.5 7.30777V12.0213C21.5 12.2341 21.4282 12.4123 21.2845 12.5558C21.141 12.6994 20.9628 12.7713 20.75 12.7713C20.5372 12.7713 20.359 12.6994 20.2155 12.5558C20.0718 12.4123 20 12.2341 20 12.0213V11.3078H6V20.6923C6 20.7693 6.03208 20.8398 6.09625 20.9038C6.16025 20.9679 6.23075 21 6.30775 21H12.425C12.6378 21 12.8161 21.0718 12.9598 21.2155C13.1033 21.359 13.175 21.5372 13.175 21.75C13.175 21.9628 13.1033 22.141 12.9598 22.2845C12.8161 22.4282 12.6378 22.5 12.425 22.5H6.30775ZM19.1923 23.5C17.9436 23.5 16.8814 23.0622 16.0058 22.1865C15.1301 21.3108 14.6923 20.2487 14.6923 19C14.6923 17.7513 15.1301 16.6892 16.0058 15.8135C16.8814 14.9378 17.9436 14.5 19.1923 14.5C20.4411 14.5 21.5033 14.9378 22.3788 15.8135C23.2544 16.6892 23.6923 17.7513 23.6923 19C23.6923 20.2487 23.2544 21.3108 22.3788 22.1865C21.5033 23.0622 20.4411 23.5 19.1923 23.5ZM19.6348 18.8193V16.5C19.6348 16.3795 19.5911 16.2757 19.5038 16.1885C19.4166 16.1013 19.3128 16.0578 19.1923 16.0578C19.0718 16.0578 18.9679 16.1013 18.8808 16.1885C18.7936 16.2757 18.75 16.3795 18.75 16.5V18.8038C18.75 18.9243 18.7718 19.039 18.8155 19.148C18.859 19.257 18.9276 19.3583 19.0213 19.452L20.5463 20.977C20.6334 21.0642 20.7357 21.1094 20.853 21.1125C20.9702 21.1157 21.0756 21.0705 21.1693 20.977C21.2629 20.8834 21.3098 20.7795 21.3098 20.6655C21.3098 20.5513 21.2629 20.4474 21.1693 20.3538L19.6348 18.8193Z" fill="#081F28"/>
</g>
</svg>
`;

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


/* ===============================
CARDS INFO CONTAINER
=============================== */
.ccx-subscription-header {
  font-family: Gellix;
  font-weight: 500;
  color: #081F28;
  font-size: 16px;
  line-height: 28px;
  letter-spacing: 0;
  margin-bottom: 1rem;
}

.ccx-header-top,
.ccx-header-bottom {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 16px;
}

.ccx-price {
  font-size: 16px;
}

.ccx-subscription-header strong {
  font-family: Gellix;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0;
}

  `;

  const subscriptionCards = {
    15: [
      {
        type: 'house',
        icon: SVG_HOUSE,
        title: 'HOUSE DRAW',
        text: `<span>100 entries</span> into every <span>Grand Prize House Draw</span> and Early Bird draw`
      },
      {
        type: 'money',
        icon: SVG_DOLLAR_SIGN,
        title: 'BONUS DRAW:',
        text: `Get entries into the Monthly Millionaire Draw for a chance to win £1,000,000`
      }
    ],
    25: [
      {
        type: 'house',
        icon: SVG_HOUSE,
        title: 'HOUSE DRAW',
        text: `<span>200 entries</span> into every <span>Grand Prize House Draw</span> and Early Bird draw`
      },
      {
        type: 'money',
        icon: SVG_DOLLAR_SIGN,
        title: 'BONUS DRAW:',
        text: `Get entries into the Monthly Millionaire Draw for a chance to win £1,000,000`
      },
      {
        type: 'gift',
        icon: SVG_DOLLAR_SIGN,
        title: 'BONUS DRAW:',
        text: `Get entries into a monthly £100,000 cash prize draw`
      }
    ],
    50: [
      {
        type: 'house',
        icon: SVG_HOUSE,
        title: 'HOUSE DRAW',
        text: `<span>640 entries</span> into every <span>Grand Prize House Draw</span> and Early Bird draw`
      },
      {
        type: 'money',
        icon: SVG_DOLLAR_SIGN,
        title: 'BONUS DRAW:',
        text: `Get entries into the Monthly Millionaire Draw for a chance to win £1,000,000`
      },
      {
        type: 'gift',
        icon: SVG_DOLLAR_SIGN,
        title: 'BONUS DRAW:',
        text: `Get entries into a monthly £100,000 cash prize draw`
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

  const renderCardContent = (CONTROL_SUBSCRIPTIONS_CONTAINER, cardId, subscriptionCardDetails) => {

    // customLog('CONTROL_SUBSCRIPTIONS_CONTAINER', CONTROL_SUBSCRIPTIONS_CONTAINER);

    const CONTROL_CARD = CONTROL_SUBSCRIPTIONS_CONTAINER.querySelector(cardId);
    // customLog('CONTROL_CARD', CONTROL_CARD);

    if (!CONTROL_CARD) return;

    // Find the last nested div
    const innerContainer = CONTROL_CARD.querySelector('.text-left');
    // customLog('innerContainer', innerContainer);

    if (!innerContainer) return;

    const ccxCardContainer = document.createElement('div');
    ccxCardContainer.classList.add('ccx-card-container');

var cardElements = subscriptionCardDetails.map(function(cardDetail) {
  return (
    '<div class="subscription-card-item subscription-card-item-' + cardDetail.type + '">' +
      '<div class="icon">' + cardDetail.icon + '</div>' +
      '<div class="content">' +
        '<h3 class="title">' + cardDetail.title + '</h3>' +
        '<p class="text">' + cardDetail.text + '</p>' +
      '</div>' +
    '</div>'
  );
}).join('');


    ccxCardContainer.innerHTML = cardElements;

    innerContainer.insertAdjacentElement('afterbegin', ccxCardContainer);
  }

  const addHeaderContainer = (CONTROL_SUBSCRIPTIONS_CONTAINER, cardId, price, dateText) => {
  const CONTROL_CARD = CONTROL_SUBSCRIPTIONS_CONTAINER.querySelector(cardId);
  if (!CONTROL_CARD) return;

   const innerContainer = CONTROL_CARD.querySelector('.text-left');
    // customLog('innerContainer', innerContainer);

    if (!innerContainer) return;

var headerHTML =
  '<header class="ccx-subscription-header" role="banner">' +
    '<div class="ccx-header-top">' +
      '<span class="ccx-header-icon" aria-hidden="true">' + SVG_CLOSE + '</span>' +
      '<span class="ccx-header-text">Cancel at any time</span>' +
    '</div>' +
    '<div class="ccx-header-bottom">' +
      '<span class="ccx-header-icon" aria-hidden="true">' + SVG_CALENDAR + '</span>' +
      '<div class="ccx-date">' +
        '<span class="ccx-price">' +
          '<strong>£' + price + '/month</strong> ' + dateText +
        '</span>' +
      '</div>' +
    '</div>' +
  '</header>';

  innerContainer.insertAdjacentHTML("afterbegin", headerHTML);
};


  const init = () => {
    try {
      customLog(TEST_ID + ' | ' + VARIATION + ' | ' + TEST_NAME);
      customLog('[init] Current URL: ' + CURRENT_URL);

      waitForElements(
        [
          { selector: SELECTORS.CONTROL_SUBSCRIPTIONS_CONTAINER, count: 1 },
          { selector: SELECTORS.CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS, count: 3 },
        ],
        function (results) {
          const bodyClass = 'ccx-' + TEST_ID.toLowerCase() + '-' + VARIATION.toLowerCase().replace(/\s+/g, '-') + '';

          // Add styles
          addStyles(STYLES, VARIATION);
          addBodyClass(bodyClass);

          const CONTROL_SUBSCRIPTIONS_CONTAINER = results[0].elements[0];
          if (!CONTROL_SUBSCRIPTIONS_CONTAINER) return;
          // customLog(CONTROL_SUBSCRIPTIONS_CONTAINER);

          const CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS = results[1].elements[0];
          if (!CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS) return;
          // customLog(CONTROL_SUBSCRIPTIONS_CONTAINER_CARDS);

          renderCardContent(CONTROL_SUBSCRIPTIONS_CONTAINER, '#subscription-card-15', subscriptionCards[15]);
          renderCardContent(CONTROL_SUBSCRIPTIONS_CONTAINER, '#subscription-card-25', subscriptionCards[25]);
          renderCardContent(CONTROL_SUBSCRIPTIONS_CONTAINER, '#subscription-card-50', subscriptionCards[50]);

          addHeaderContainer(CONTROL_SUBSCRIPTIONS_CONTAINER, '#subscription-card-15', 15, 'from 1st December');
          addHeaderContainer(CONTROL_SUBSCRIPTIONS_CONTAINER, '#subscription-card-25', 25, 'from 1st December');
          addHeaderContainer(CONTROL_SUBSCRIPTIONS_CONTAINER, '#subscription-card-50', 50, 'from 1st December');

        }
      );

    } catch (error) {
      customLog(error);
    }
  }

  init();
})();