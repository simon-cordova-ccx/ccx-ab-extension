const LOG_ENABLED = true;
const TEST_NAME = "OZDE-5 | Entry Tab Removal";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 2";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const ticketIconSVG = `<svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_6145_386)">
<path d="M38.335 19C38.335 8.50659 29.8284 0 19.335 0C8.84155 0 0.334961 8.50659 0.334961 19C0.334961 29.4934 8.84155 38 19.335 38C29.8284 38 38.335 29.4934 38.335 19Z" fill="#FFDD00"/>
<path d="M32.6352 17.9179L30.7599 15.9588C30.6703 15.8695 30.5544 15.814 30.4383 15.814C30.3224 15.814 30.2039 15.843 30.117 15.9298C29.6771 16.3689 29.0924 16.574 28.5051 16.574C27.9177 16.574 27.333 16.311 26.8931 15.8719C26.4533 15.4328 26.2479 14.8489 26.2479 14.2626C26.2479 13.6763 26.5112 13.0925 26.9511 12.6533C27.3909 12.2142 27.096 12.4482 27.096 12.3324C27.096 12.2166 27.067 12.0984 26.9801 12.0116L26.2768 11.3095L26.9801 9.64226C27.0696 9.40822 26.9801 9.17419 26.7457 9.05839L24.2274 7.97508C23.993 7.8858 23.7586 7.97508 23.6426 8.20911C23.1157 9.40822 21.7962 9.93419 20.6265 9.43718C19.423 8.91121 18.8961 7.62522 19.365 6.4261C19.481 6.22102 19.394 5.98699 19.1595 5.90013L16.4649 4.76132C16.3489 4.70342 16.2305 4.70342 16.1145 4.76132C15.9985 4.81922 15.909 4.87713 15.8801 4.99536L7.8251 24.4685C7.73568 24.7024 7.8251 24.9366 8.05953 25.0522L9.67147 25.7255L11.194 27.3035C11.2834 27.3926 11.3994 27.4481 11.5154 27.4481C11.6314 27.4481 11.7499 27.4192 11.8369 27.3322C12.2767 26.8933 12.8325 26.6881 13.4488 26.6881C14.0651 26.6881 14.6209 26.951 15.0608 27.3902C15.9405 28.2974 15.9115 29.7595 15.0028 30.6064C14.9134 30.6957 14.8578 30.8116 14.8578 30.9273C14.8578 31.0432 14.8868 31.1614 14.9738 31.2481L16.8781 33.2073C16.9676 33.2966 17.0836 33.3521 17.1996 33.3521C17.3156 33.3521 17.434 33.2942 17.492 33.2362L32.6376 18.5838C32.814 18.3787 32.814 18.0868 32.6376 17.9107L32.6352 17.9179Z" fill="#081F28"/>
<path d="M17.1976 32.247L15.8781 30.9033C16.8158 29.7041 16.7578 27.9186 15.6727 26.7798C15.0878 26.1647 14.2951 25.8148 13.4469 25.8148C12.5986 25.8148 12.1008 26.0198 11.5425 26.4299L10.1094 24.9365L24.6388 10.8969L26.0743 12.3879C25.6634 12.9139 25.4 13.587 25.4 14.2891C25.3711 15.1384 25.6924 15.9274 26.2797 16.5402C26.8671 17.153 27.6572 17.5053 28.5056 17.5053C29.3537 17.5053 29.8515 17.3002 30.4099 16.89L31.6981 18.2339L17.1976 32.2423V32.247Z" fill="white"/>
<path d="M9.20089 24.5554L8.79004 24.4105L16.5526 5.72156L18.457 6.51053C18.0751 8.03053 18.8388 9.61088 20.3323 10.2551C21.8259 10.8993 23.4668 10.313 24.2861 8.96908L26.0141 9.72908L25.6322 10.6363L24.9579 9.93417C24.7815 9.75804 24.5181 9.75804 24.3416 9.93417L9.20089 24.5554Z" fill="#FFDD00"/>
<path d="M19.5096 23.0454C19.1742 22.6883 18.9335 22.2699 18.7934 21.8331C18.777 21.7861 18.7459 21.753 18.7001 21.7337C18.5197 21.6745 18.3389 21.6295 18.1574 21.6059C18.0613 21.5922 17.9873 21.6756 18.0058 21.7691C18.1643 22.4172 18.4846 23.0311 18.9723 23.5502C19.4599 24.0692 20.0526 24.4273 20.6896 24.6259C20.7781 24.6537 20.8696 24.5817 20.8619 24.4848C20.8463 24.2986 20.8127 24.1153 20.7683 23.9352C20.7553 23.892 20.7207 23.8552 20.6749 23.836C20.2477 23.6688 19.8451 23.4025 19.5096 23.0454Z" fill="#081F28"/>
<path d="M22.3035 24.4335C22.2256 23.3771 21.7818 22.3663 21.0556 21.5932C20.3604 20.8532 19.4643 20.3713 18.4655 20.2007C18.4655 20.2007 18.2486 20.1688 18.074 20.1527C18.0063 20.147 17.9442 20.1915 17.9348 20.2626C17.9156 20.4192 17.8995 20.5938 17.8946 20.7509C17.8926 20.8151 17.9408 20.8738 18.0048 20.883C18.1543 20.9019 18.339 20.9363 18.339 20.9363C19.1777 21.0841 19.9298 21.4864 20.5143 22.1086C21.1264 22.7603 21.4968 23.6044 21.5621 24.4927C21.5621 24.4927 21.5698 24.5893 21.5775 24.686C21.5826 24.7504 21.6345 24.8057 21.6987 24.8076C21.8558 24.8126 22.0274 24.8109 22.1885 24.7981C22.2602 24.7931 22.3085 24.734 22.307 24.6661C22.3071 24.548 22.3035 24.4335 22.3035 24.4335Z" fill="#081F28"/>
<path d="M24.2892 17.6608C22.9494 16.6254 21.0755 16.5631 19.6705 17.5088C18.9954 17.9628 18.512 18.5694 18.2231 19.2427C18.1845 19.3344 18.2422 19.4327 18.3348 19.4428C18.5234 19.4666 18.7118 19.4975 18.8963 19.539L18.9 19.5355C19.9359 19.7753 20.859 20.308 21.5922 21.0885C22.3254 21.869 22.7993 22.8307 22.9741 23.8723L22.9705 23.8759C23.0004 24.0625 23.0229 24.2563 23.0314 24.4423C23.0357 24.5354 23.1336 24.6026 23.2204 24.5698C23.719 24.3924 24.1888 24.1105 24.5973 23.7268C26.3529 22.0775 26.2781 19.2024 24.2892 17.6608ZM22.1296 20.5837C21.3479 19.7517 20.3729 19.1637 19.2886 18.8724C19.3967 18.7293 19.5225 18.5903 19.6587 18.4624C20.9616 17.2384 23.0177 17.3029 24.242 18.6062C25.4663 19.9094 25.4024 21.9655 24.0995 23.1895C23.9633 23.3174 23.8204 23.4309 23.6671 23.5333C23.4335 22.429 22.9112 21.4157 22.1296 20.5837Z" fill="#081F28"/>
</g>
<defs>
<clipPath id="clip0_6145_386">
<rect width="38" height="38" fill="white" transform="translate(0.334961)"/>
</clipPath>
</defs>
</svg>
`;

const plansData = {
  payAsYouGo: [
    { icon: '★', bonusCount: '2', price: '10', highlight: '20 Lose', name: 'Subscription 10€', order: 1, entriesAmount: '20' },
    { icon: '★', bonusCount: '4', price: '25', highlight: '50 Lose', name: 'Subscription 25€', order: 3, entriesAmount: '50' },
    { icon: '★', bonusCount: '4', price: '35', highlight: '70 Lose', name: 'Subscription 35€', order: 5, entriesAmount: '70' },
  ],
  subscriptions: [
    { icon: '★', bonusCount: '2', price: '10', highlight: '20 + 1 Gratis Los', name: 'Subscription 10€', order: 2, entriesAmount: '10' },
    { icon: '★', bonusCount: '4', price: '25', highlight: '50 + 4 Gratis Los', name: 'Subscription 25€', order: 4, entriesAmount: '10' },
    { icon: '★', bonusCount: '4', price: '35', highlight: '70 + 6 Gratis Los', name: 'Subscription 35€', order: 6, entriesAmount: '10' },
  ],
}

const styles = `
entries-tab-nav[data-tab-container] {
  display: none !important;
}

entries-tab-nav[data-tab-container] + div {
  min-height: 409px;
  padding-bottom: 13rem;
}

[id*=single-purchase-tab-pane]>div:first-child {
  display: none;
}

[id*=single-purchase-tab-pane]>div.mx-auto>div .card-ticket-icon {
  display: none !important;
}

[id*=single-purchase-tab-pane]>div.mx-auto>div [data-test="mobile-card-variant-payg"]:not([class*=ccx]) {
  display: none !important;
}

[id*=single-purchase-tab-pane]>div.mx-auto>div [data-test="desktop-card-variant-payg"]:not([class*=ccx]) {
  display: none !important;
}

.ccx-mobile-card {
  width: 100%;
  border-radius: 10px;
  border-width: 1px;
  padding: 16px 0;
  background: #081F28;
  border: 1px solid #ECF0F4;
  box-shadow: 0px 2px 4px 0px #0000001A;
  height: 151px;
}

.ccx-mobile-card__top {
  margin-bottom: 0.75rem;
}

.ccx-mobile-card__bonus {
  width: 260px;
  height: 30px;
  border-radius: 99px;
  padding: 0 4px 0 10px;
  background: #F4F3E0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ccx-mobile-card__icon {
  display: none;
}

.ccx-mobile-card__bonus-text {
  font-family: Gellix;
  font-weight: 700;
  font-size: 16px;
  color: #C06717;
  margin-right: 0.25rem;
}

.ccx-mobile-card__bonus-subtext {
  font-family: Gellix;
  font-weight: 700;
  font-size: 16px;
  color: #000000;
}

.ccx-mobile-card__bottom {
  display: flex;
  justify-content: space-around;
  height: 82px;
  align-items: center;
}

.ccx-mobile-card__left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.ccx-mobile-card__right {
  flex: 1;
}

.ccx-mobile-card__price-container {
  width: 114px;
  height: 38px;
}

.ccx-mobile-card__price {
  font-family: Gellix;
  font-weight: 700;
  font-size: 32px;
  color: white;
}

.ccx-mobile-card__price-unit {
  font-family: Gellix;
  font-weight: 400;
  font-size: 15px;
  color: white;
}

.ccx-mobile-card__highlight {
  font-family: Gellix;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #FFDD00;
  width: 175px;
  height: 44px;
}

.ccx-mobile-card__button {
  background: #FFDD00;
  width: 145px;
  height: 48px;
  border-radius: 76px;
  font-family: Gellix;
  font-weight: 700;
  font-size: 18px;
  color: #090F15;
}

.ccx-mobile-card__button:hover {
  color: #000;
  background-color: #fdee8c;
}

.ccx-mobile-card--payg {
  background: #FFFFFF;
}

.ccx-mobile-card--payg .ccx-mobile-card__price {
  color: #081F28;
}

.ccx-mobile-card--payg .ccx-mobile-card__highlight {
  color: #081F28;
  margin-top: 14px;
}

.ccx-desktop-card {
  display: none;
}

@media screen and (min-width: 1024px) {
  .ccx-mobile-card {
    display: none;
  }

  .ccx-desktop-card {
    border-width: 1px;
    position: relative;
    display: flex;
    height: 300px;
    border-radius: 20px;
    border: 1px solid #E6E6E6;
    background: white;
    padding-top: 25px;
    padding-right: 8px;
    padding-left: 8px;
    opacity: 1;
    max-width: 380px;
    min-width: 150px;
    flex: 1 1 calc(16.66% - 16px) !important;
    max-width: 198px;
  }

  [id=enter-now-material-tab-buttons-design] [id*=single-purchase-tab] > div:nth-child(2) .ccx-desktop-card--subscription:nth-child(17),
  [id=enter-now-material-tab-buttons-design] [id*=single-purchase-tab] > div:nth-child(2) .ccx-desktop-card--subscription:nth-child(18) {
    border-radius: 20px 20px 0 0;
  }

  .ccx-desktop-card__inner-container {
    flex: 1;
    width: 100%;
    max-width: 380px;
  }

  .ccx-desktop-card__highlight {
    font-family: Gellix;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
    text-align: center;
    vertical-align: middle;
    height: 24px;
    opacity: 1;
    margin-bottom: 8px;
  }

  .ccx-desktop-card__bonus {
    opacity: 1;
    font-family: Gellix;
    font-size: 14px;
    line-height: 120%;
    text-align: center;
    vertical-align: middle;
    border-bottom: 1px solid #87C7CA;
    height: 50px;
  }

  .ccx-desktop-card__bonus p {
    font-size: inherit;
  }

  .ccx-desktop-card__bottom {
    margin-top: 14.5px;
  }

  .ccx-desktop-card__price {
    height: 65px;
    opacity: 1;
    font-family: Gellix;
    font-weight: 700;
    font-size: 46px;
    vertical-align: middle;
    line-height: 51px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ccx-desktop-card.ccx-desktop-card--subscription {
    background: #081F28;
  }

  .ccx-desktop-card__button {
    margin-top: 29.5px;
    width: 100%;
    height: 53px;
    border-radius: 76px;
    padding-top: 12px;
    padding-bottom: 14px;
    opacity: 1;
    background: #FFDD00;
    font-family: Gellix;
    font-weight: 700;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #090F15;
  }

  .ccx-desktop-card__button:hover,
  .ccx-desktop-card__button:focus {
    color: #000;
    background-color: #fdee8c;
    outline: none;
    text-decoration: none;
    cursor: pointer;
  }


  .ccx-desktop-card--subscription .ccx-desktop-card__highlight {
    color: #FFDD00;
    font-family: Gellix;
    font-weight: 700;
    font-size: clamp(17px, 1.5vw, 20px) !important;
    line-height: 100%;
    text-align: center;
    vertical-align: middle;
  }

  .ccx-desktop-card--subscription .ccx-desktop-card__bonus {
    font-family: Gellix;
    font-weight: 700;
    font-style: Bold;
    font-size: 14px;
    leading-trim: NONE;
    line-height: 120%;
    letter-spacing: 1.5%;
    text-align: center;
    vertical-align: middle;
    color: white;
  }

  .ccx-desktop-card--subscription .ccx-desktop-card__price {
    display: flex;
    flex-flow: column;
    height: 79px;
  }

  .ccx-desktop-card--subscription .ccx-desktop-card__price-value {
    font-family: Gellix;
    font-weight: 700;
    font-size: 46px;
    line-height: 150%;
    text-align: center;
    vertical-align: middle;
    color: white;
  }

  .ccx-desktop-card--subscription .ccx-desktop-card__price-span {
    font-family: Gellix;
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    vertical-align: middle;
    color: #FFFFFF;
  }

  .ccx-desktop-card--subscription .ccx-desktop-card__button {
    margin-top: 14.5px;
  }

  .ccx-desktop-card__footer {
    display: flex;
    flex-flow: column;
    color: #081F28;
    background: white;
    position: absolute;
    bottom: -11rem;
    left: 0;
    opacity: 1;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-width: 1px;
    border-right-width: 1px;
    border-left-width: 1px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-style: solid;
    border-color: #ECF0F4;
    box-shadow: 0px 2px 4px 0px #0000001A;
  }

  .ccx-desktop-card__footer-image {
    display: flex;
    justify-content: center;
  }

  span.ccx-desktop-card__footer-bold {
    font-family: Gellix;
    font-weight: 700;
    font-size: 16px;
    margin-right: 0.25rem;
    line-height: 1;
  }

  span.ccx-desktop-card__footer-regular {
    font-family: Gellix;
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
    text-align: center;
  }
}

@media screen and (min-width: 1142px) {
  .ccx-desktop-card__footer {
    bottom: -9rem;
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
  if (document.querySelector('.ccx-styles-de1-v2')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  // Create a new <style> element
  const style = document.createElement('style');
  style.classList.add('ccx-styles-de1-v2');
  style.appendChild(document.createTextNode(css));

  // Append the style tag to the document head
  document.head.appendChild(style);
  customLog('Custom styles added.');
};

function createMobileCard(planData, type = 'subscription') {
  const card = document.createElement('div');
  card.className = 'ccx-mobile-card ' + (type === 'subscription' ? 'ccx-mobile-card--subscription' : 'ccx-mobile-card--payg') + ' basis-1/5 flex-1';
  card.style.order = planData.order;
  card.setAttribute('data-test', "mobile-card-variant-payg");

  const top = document.createElement('div');
  top.className = 'ccx-mobile-card__top';

  const bonus = document.createElement('div');
  bonus.className = 'ccx-mobile-card__bonus';

  const icon = document.createElement('span');
  icon.className = 'ccx-mobile-card__icon';
  icon.textContent = planData.icon || '';

  const bold = document.createElement('strong');
  bold.className = 'ccx-mobile-card__bonus-text';
  bold.textContent = planData.bonusCount
    ? planData.bonusCount + ' Bonus Verlosung'
    : 'Bonus Verlosung';

  const span = document.createElement('span');
  span.className = 'ccx-mobile-card__bonus-subtext';
  span.textContent = ' inklusive';

  const bottom = document.createElement('div');
  bottom.className = 'ccx-mobile-card__bottom';

  const left = document.createElement('div');
  left.className = 'ccx-mobile-card__left';

  const priceContainer = document.createElement('div');
  priceContainer.className = 'ccx-mobile-card__price-container';

  const price = document.createElement('span');
  price.className = 'ccx-mobile-card__price';
  price.textContent = planData.price + '€' || '';

  if (type === 'subscription') {
    const priceSpan = document.createElement('span');
    priceSpan.className = 'ccx-mobile-card__price-unit';
    priceSpan.textContent = '/Monat';
    priceContainer.append(price, priceSpan);
  } else {
    priceContainer.append(price);
  }

  const highlight = document.createElement('div');
  highlight.className = 'ccx-mobile-card__highlight';
  highlight.textContent = planData.highlight || '';

  const right = document.createElement('div');
  right.className = 'ccx-mobile-card__right';

  const button = document.createElement('button');
  button.className = 'ccx-mobile-card__button';
  button.textContent = 'Mitmachen';

  bonus.append(icon, bold, span);
  left.append(priceContainer, highlight);
  right.append(button);
  top.append(bonus);
  bottom.append(left, right);
  card.append(top, bottom);

  return card;
}

function createDesktopCard(planData, type = 'subscription') {
  const card = document.createElement('div');
  card.className = 'ccx-desktop-card ' + (type === 'subscription' ? 'ccx-desktop-card--subscription' : 'ccx-desktop-card--payg') + ' flex-1 max-w-[380px] basis-1/5';
  card.style.order = planData.order;

  const inner = document.createElement('div');
  inner.className = 'ccx-desktop-card__inner-container';

  const top = document.createElement('div');
  top.className = 'ccx-desktop-card__top';

  // Highlight
  const highlight = document.createElement('div');
  highlight.className = 'ccx-desktop-card__highlight';
  highlight.textContent = planData.highlight || '';

  // Bonus
  const bonus = document.createElement('div');
  bonus.className = 'ccx-desktop-card__bonus';
  if (planData.bonusCount) {
    bonus.textContent = planData.bonusCount + ' Bonus Verlosung ';
  } else {
    bonus.textContent = 'Bonus Verlosung ';
  }
  const inklusive = document.createElement('p');
  inklusive.textContent = 'inklusive';
  bonus.appendChild(inklusive);

  // Bottom
  const bottom = document.createElement('div');
  bottom.className = 'ccx-desktop-card__bottom';

  const price = document.createElement('div');
  price.className = 'ccx-desktop-card__price';

  const priceValue = document.createElement('span');
  priceValue.className = 'ccx-desktop-card__price-value';
  priceValue.textContent = planData.price + '€' || '';

  price.appendChild(priceValue);

  // Only add /Monat for subscription cards
  if (type === 'subscription') {
    const priceSpan = document.createElement('span');
    priceSpan.className = 'ccx-desktop-card__price-span';
    priceSpan.textContent = '/Monat';
    price.appendChild(priceSpan);
  }

  const button = document.createElement('button');
  button.className = 'ccx-desktop-card__button';
  button.textContent = 'Mitmachen';

  // Footer for subscription plans with price 25 or 35
  let footer = null;
  if (type === 'subscription' && (parseInt(planData.price) === 25 || parseInt(planData.price) === 35)) {
    footer = document.createElement('div');
    footer.className = 'ccx-desktop-card__footer';

    const footerImageDiv = document.createElement('div');
    footerImageDiv.className = 'ccx-desktop-card__footer-image';
    footerImageDiv.innerHTML = ticketIconSVG;

    const footerTextDiv = document.createElement('div');
    footerTextDiv.className = 'ccx-desktop-card__footer-text';

    const footerBoldSpan = document.createElement('span');
    footerBoldSpan.className = 'ccx-desktop-card__footer-bold';
    footerBoldSpan.textContent = '+1 Los/Monat';

    const footerRegularSpan = document.createElement('span');
    footerRegularSpan.className = 'ccx-desktop-card__footer-regular';
    footerRegularSpan.textContent = 'für die Exklusive-Verlosung von 25.000 € in Bar';

    footerTextDiv.append(footerBoldSpan, footerRegularSpan);
    footer.append(footerImageDiv, footerTextDiv);
  }

  // Assemble
  bottom.append(price, button);
  top.append(highlight, bonus, bottom);
  inner.append(top);
  if (footer) {
    inner.append(footer);
  }
  card.append(inner);

  return card;
}

function setupPaygButtonClicks(plansData, controlPaygButtons) {
  // Select all new PAYG buttons (mobile and desktop)
  const newPaygButtons = document.querySelectorAll('.ccx-mobile-card--payg .ccx-mobile-card__button, .ccx-desktop-card--payg .ccx-desktop-card__button');

  // Log the number of new PAYG buttons found
  customLog('New PAYG buttons found:', newPaygButtons.length, 'Buttons:', Array.from(newPaygButtons).map(btn => btn.outerHTML));

  // Log the number of control PAYG buttons and their data-entries-amount values
  customLog('Control PAYG buttons found:', controlPaygButtons.length, 'Buttons:', Array.from(controlPaygButtons).map(btn => ({
    html: btn.outerHTML,
    entriesAmount: btn.getAttribute('data-entries-amount')
  })));

  // Function to extract number from data-entries-amount (e.g., "20" from "20 Lose")
  function extractNumberFromEntries(element) {
    const value = element.getAttribute('data-entries-amount');
    if (value) {
      const match = value.match(/^\d+/);
      return match ? match[0] : null;
    }
    return null;
  }

  // Add click event listeners to new PAYG buttons
  newPaygButtons.forEach((newButton, index) => {
    newButton.addEventListener('click', () => {
      // Calculate the correct plansData index (handles both mobile and desktop)
      const planIndex = index % plansData.payAsYouGo.length;

      // Get the price and entriesAmount from plansData for this button
      const price = plansData.payAsYouGo[planIndex].price;
      const entriesAmount = plansData.payAsYouGo[planIndex].entriesAmount;

      // Log the clicked button, price, and entriesAmount
      customLog('Clicked button:', newButton.outerHTML, 'Price:', price, 'EntriesAmount:', entriesAmount);

      // Find the matching control button
      const matchingControlButton = Array.from(controlPaygButtons).find(button => {
        const controlEntriesAmount = extractNumberFromEntries(button);
        // Log comparison for each control button
        customLog('Comparing control button:', button.getAttribute('data-entries-amount'), 'with entriesAmount:', entriesAmount);
        return controlEntriesAmount === entriesAmount;
      });

      // Programmatically click the matching control button
      if (matchingControlButton) {
        customLog('Found matching control button:', matchingControlButton.outerHTML);
        matchingControlButton.click();
      } else {
        console.error('No control button found for price: ' + price + ', entriesAmount: ' + entriesAmount);
      }
    });
  });
}

function setupSubscriptionButtonClicks(plansData, controlSubscriptionButtons) {
  // Select all new subscription buttons (mobile and desktop)
  const newSubscriptionButtons = document.querySelectorAll('.ccx-mobile-card--subscription .ccx-mobile-card__button, .ccx-desktop-card--subscription .ccx-desktop-card__button');

  // Log the number of new subscription buttons found
  customLog('New subscription buttons found:', newSubscriptionButtons.length, 'Buttons:', Array.from(newSubscriptionButtons).map(btn => btn.outerHTML));

  // Log the number of control subscription buttons and their price values
  customLog('Control subscription buttons found:', controlSubscriptionButtons.length, 'Buttons:', Array.from(controlSubscriptionButtons).map(btn => ({
    html: btn.outerHTML,
    price: btn.closest('[data-test="card-variant-subscription"]')?.querySelector('[data-test="price"]')?.textContent.trim()
  })));

  // Function to extract price from control button's parent [data-test="card-variant-subscription"] [data-test="price"]
  function extractPriceFromControlButton(element) {
    const priceElement = element.closest('[data-test="card-variant-subscription"]')?.querySelector('[data-test="price"]');
    return priceElement ? priceElement.textContent.trim() : null;
  }

  // Add click event listeners to new subscription buttons
  newSubscriptionButtons.forEach((newButton, index) => {
    newButton.addEventListener('click', () => {
      // Calculate the correct plansData index (handles both mobile and desktop)
      const planIndex = index % plansData.subscriptions.length;

      // Get the price from plansData for this button
      const price = plansData.subscriptions[planIndex].price;

      // Log the clicked button and its price
      customLog('Clicked button:', newButton.outerHTML, 'Price:', price);

      // Find the matching control button
      const matchingControlButton = Array.from(controlSubscriptionButtons).find(button => {
        const controlPrice = extractPriceFromControlButton(button);
        // Log comparison for each control button
        customLog('Comparing control button price:', controlPrice, 'with price:', price);
        return controlPrice === price;
      });

      // Programmatically click the matching control button
      if (matchingControlButton) {
        customLog('Found matching control button:', matchingControlButton.outerHTML);
        matchingControlButton.click();
      } else {
        console.error('No control button found for price: ' + price);
      }
    });
  });
}

function waitForElements(selectors, numberOfElementsToWaitFor, callback) {
  customLog('[waitForElements] Starting to wait for elements...');

  if (!selectors || !Array.isArray(selectors) || selectors.length === 0) {
    customLog('[waitForElements] No selectors provided.');
    return;
  }

  if (!window.DYO || !DYO.waitForElementAsync) {
    customLog('[waitForElements] DYO.waitForElementAsync is not available.');
    return;
  }

  // Create promises for each selector
  const promises = selectors.map(selector =>
    DYO.waitForElementAsync(selector, numberOfElementsToWaitFor, 100, 150)
  );

  Promise.all(promises)
    .then(results => {
      customLog('[waitForElements] All elements found:', results[0]);
      if (typeof callback === 'function') callback(results);
    })
    .catch(error => {
      customLog('[waitForElements] Some selectors not found within timeout.', error);
    });
}

function init() {
  try {
    customLog(TEST_NAME + ' | ' + VARIATION);
    customLog('[init] Current URL: ' + CURRENT_URL);

    document.body.classList.add('ccx-omaze-de5-v2');
    customLog('[init] Added class ccx-omaze-de5-v2 to body');

    waitForElements(
      ['#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] .add-to-cart-button'], 6,
      function (results) {
        // console.log('[waitForElements] Elements found', results);

        const controlPayAsYouGoButtons = document.querySelectorAll('#enter-now-material-tab-buttons-design [id*="single-purchase-tab-pane"] .md\\:hidden .add-to-cart-button');
        const controlSubscriptionButtons = document.querySelectorAll('#enter-now-material-tab-buttons-design [id*=subscription-tab-pane] .add-to-cart-button');

        // Add custom styles
        addStyles(styles);

        const controlMobileContainer = document.querySelector('#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] > div:nth-child(2).mx-auto > div')
        const controlDesktopContainer = document.querySelector('#enter-now-material-tab-buttons-design [id*=single-purchase-tab-pane] > div:nth-child(2).mx-auto > div')

        if (controlMobileContainer && controlDesktopContainer) {
          plansData.payAsYouGo.forEach(planData => {
            const card = createMobileCard(planData, 'payg');
            controlMobileContainer.appendChild(card);
          });
          plansData.subscriptions.forEach(planData => {
            const card = createMobileCard(planData);
            controlMobileContainer.appendChild(card);
          });

          plansData.payAsYouGo.forEach(planData => {
            const card = createDesktopCard(planData, 'payg');
            controlDesktopContainer.appendChild(card);
          });
          plansData.subscriptions.forEach(planData => {
            const card = createDesktopCard(planData);
            controlDesktopContainer.appendChild(card);
          });

          setupPaygButtonClicks(plansData, controlPayAsYouGoButtons);

          setupSubscriptionButtonClicks(plansData, controlSubscriptionButtons);
        }

      }
    );

  } catch (error) {
    customLog(error.message);
  }
}

init();