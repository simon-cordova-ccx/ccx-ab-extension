console.log('BAT 069');
// adobeQA=069

// IMPORTANT
// STAGING SITE TO USE IS: https://stage5-velo-cx.secure-update.co.uk/gb/en
// The test should not target users that have already subscribed to subscriptions, or have more than 30 cans in the last order.
// The test should target only users that have at least 5 subscription eligible cans in the last order.

const STYLES = `
.promo-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.78);
  z-index: 9998;
}

.ccx-modal-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
}

#promo-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  max-width: 600px;
  width: 100%;
}

.promo-modal-content {
  color: #2b2b2b;
  position: relative;
}

.promo-modal-content__heading {
  font-size: 34px;
  font-weight: 700;
}

.promo-modal-content__heading strong {
  color: #254aa2;
}

.promo-modal-content p {
  margin: 0 !important;
}

.promo-modal-content__subheading {
  font-size: 18px;
  font-weight: 500;
}

.promo-modal-content__copy {
  font-size: 16px;
}

.promo-modal-content__img {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: inline-block;
}

.promo-modal-content__body {
  padding: 20px 30px;
  gap: 16px;
  display: flex;
  flex-direction: column;
}

.promo-modal-content__close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.promo-modal-content__actions {
  display: flex;
  gap: 16px;
}

.promo-modal-content__subscribe-btn,
.promo-modal-content__dismiss-btn {
  padding: 11px 30px;
  border-radius: 100px;
  border: 1px solid;
  cursor: pointer;
}

.promo-modal-content__subscribe-btn {
  background-color: #254aa2;
  border: 2px solid #254aa2;
  color: #fff;
  width: 100%;
}

.promo-modal-content__dismiss-btn {
  background-color: #fff;
  color: #2b2b2b;
  border: 2px solid #01567e;
  display: none;
}

@media screen and (min-width: 768px) {
  .promo-modal-content__body {
    padding: 30px 40px;
  }

  .promo-modal-content__heading {
    font-size: 44px;
  }

  .promo-modal-content__subscribe-btn {
    width: auto;
  }

  .promo-modal-content__dismiss-btn {
    display: inline-block;
  }
}

.mb {
  display: inline-block;
}

.lg {
  display: none;
}

@media screen and (min-width: 768px) {
  .mb {
    display: none;
  }

  .lg {
    display: inline-block;
  }
}

`

const settings = {
  name: 'BAT-069-last-purchase-sub-offer',
  variation: 1,
};

/**
 * Gets the first element matching a CSS selector.
 *
 * @returns {Element|null} The first element matching the selector, or null if no element matches.
 */
function domGet(e) {
  return document.querySelector(e);
}

/**
 * Returns the customer's first name from session storage, if available.
 *
 * @returns {string} The customer's first name, or an empty string if not available.
 */
function getFirstName() {
  const firstName = sessionStorage.getItem('ccx_customerFirstName');
  if (typeof firstName === 'string' && firstName.length > 0) {
    return firstName;
  }
  return '';
}

/**
 * Calculate the savings and tier for a subscription given the order data
 * @param {Object} orderData - Object containing the order data
 * @param {Object[]} orderData.products - Array of products in the order
 * @param {String} orderData.products[].title - Name of the product
 * @param {String} orderData.products[].colour_title - Type of the product
 * @param {Number} orderData.products[].quantity - Quantity of the product
 * @param {Number} orderData.products[].fullRetail - Full retail price of the product
 * @returns {Object} Object containing the total cans, tier, full retail total, subscriber total, savings, and message
 */
function calculateSubscriptionSavings(orderData) {
  // 1. The last order must consider the total sum amount of mini and slim cans that are available for subscription (is_subscription_product: "1").
  // 2. This total amount will dictate which tier we are in: https://stage5-velo-cx.secure-update.co.uk/gb/en/subscriptions
  // 3. We then need to get the amount of mini cans, and multiply it by its saving multiplier.
  // 4. We then need to get the amount of slim cans, and multiply it by its saving multiplier.
  // Example:
  // Let's say there are 30 cans (10 slim and 20 mini) in total eligible for subscription (this qualifies us for the select tier, for example).
  // 10 slim cans * 2.60 (select tier) = 26.00
  // 20 mini cans * 1.50 (select tier) = 30.00
  // Total savings: 26.00 + 30.00 = 56.00 <-- This is what the modal should show.

  const PRICING = {
    Mini: {
      Basic: { price: 4.0, save: 1.0 },
      Standard: { price: 3.75, save: 1.25 },
      Select: { price: 3.5, save: 1.5 },
    },
    Slim: {
      Basic: { price: 4.82, save: 1.68 },
      Standard: { price: 4.19, save: 2.31 },
      Select: { price: 3.9, save: 2.6 },
    },
  };

  const productCounts = {};
  let totalQty = 0;

  console.log("🔍 Starting subscription savings calculation...");

  for (const p of orderData.products) {
    if (p.title.toLowerCase().includes('collection')) {
      console.log(`Skipping collection product: ${p.title}`);
      continue;
    }

    const type = p.colour_title;
    if (!PRICING[type]) {
      console.log(`❌ No pricing available for type: ${type}`);
      continue;
    }

    if (!productCounts[type]) productCounts[type] = [];
    productCounts[type].push(p);
    totalQty += p.quantity;

    console.log(`Added product: ${p.title}, Qty: ${p.quantity}, Type: ${type}`);
  }

  console.log("✅ Total cans ordered:", totalQty);

  let tier = '';
  let isEligible = totalQty >= 5;

  if (totalQty >= 5 && totalQty <= 9) tier = 'Basic';
  else if (totalQty >= 10 && totalQty <= 14) tier = 'Standard';
  else if (totalQty >= 15 && totalQty <= 30) tier = 'Select';
  else tier = 'Basic';

  console.log(`Eligibility: ${isEligible}, Tier: ${tier}`);

  let fullRetailTotal = 0;
  let subscriberTotal = 0;

  for (const [type, products] of Object.entries(productCounts)) {
    const typeQty = products.reduce((sum, p) => sum + p.quantity, 0);
    const simulatedQty = isEligible ? typeQty : Math.round((typeQty / totalQty) * 5);

    console.log(`📦 Type: ${type}, Qty: ${typeQty}, SimulatedQty: ${simulatedQty}`);

    for (const product of products) {
      const quantity = isEligible ? product.quantity : simulatedQty;
      const fullPrice = product.fullRetail || PRICING[type][tier].price;
      const subPrice = PRICING[type][tier].price;

      const fullCost = quantity * fullPrice;
      const subCost = quantity * subPrice;

      console.log(
        `   ➡️ ${product.title}: Qty=${quantity}, FullPrice=${fullPrice}, SubPrice=${subPrice}, FullCost=${fullCost}, SubCost=${subCost}`
      );

      fullRetailTotal += fullCost;
      subscriberTotal += subCost;
    }
  }

  const savings = fullRetailTotal - subscriberTotal;

  console.log("💰 Full Retail Total:", fullRetailTotal.toFixed(2));
  console.log("💰 Subscriber Total:", subscriberTotal.toFixed(2));
  console.log("💰 Savings:", savings.toFixed(2));

  return {
    totalCans: totalQty,
    tier: isEligible ? tier : null,
    fullRetailTotal: fullRetailTotal.toFixed(2),
    subscriberTotal: subscriberTotal.toFixed(2),
    savings: savings.toFixed(2),
    message: isEligible
      ? `You saved £${savings.toFixed(2)} with the ${tier} subscription.`
      : `You could save £${savings.toFixed(2)} by ordering 5 cans on our Basic subscription.`,
  };
}

function savingAmount() {
  const lastOrderStr = sessionStorage.getItem('ccx_lastOrder');
  if (!lastOrderStr) {
    console.log("⚠️ No last order found in sessionStorage");
    return null;
  }
  const orderData = JSON.parse(lastOrderStr);
  console.log("📝 Last order data loaded:", orderData);
  return calculateSubscriptionSavings(orderData);
}


/**
 * Reorders the last order that was placed by the user.
 *
 * @return {Promise<Object>} A promise that resolves with an object containing
 *   a `success` boolean property, and either a `results` property containing
 *   the JSON response from the server, or an `error` property containing the
 *   error message.
 */ 
async function reorderLastOrder() {
  try {
    const lastOrderData = sessionStorage.getItem('ccx_lastOrder');
    if (!lastOrderData) {
      console.error('Last order data not found in session storage.');
      return { success: false, error: 'Last order data not found.' };
    }

    const orderData = JSON.parse(lastOrderData);
    if (!orderData.orderId) {
      console.error('Order ID not found in last order data.');
      return { success: false, error: 'Order ID not found.' };
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (!csrfToken) {
      console.error('CSRF token not found');
      return { success: false, error: 'CSRF token not found' };
    }

    const reorderUrl = `/gb/en/basket/add-from-order/id/${orderData.orderId}`;

    const response = await fetch(reorderUrl, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'X-CSRF-Token': csrfToken,
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json, text/javascript, */*; q=0.01',
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Successfully reordered last order and added items to the cart.', responseData);
      return {
        success: true,
        results: responseData,
      };
    } else {
      console.error(`Failed to reorder last order:`, response.statusText);
      return { success: false, error: response.statusText };
    }
  } catch (error) {
    console.error('Error in reorderLastOrder:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Returns true if the trigger condition for the modal is satisfied, false otherwise.
 *
 * Trigger condition:
 * 1. There is a last order stored in session storage.
 * 2. The user has not subscribed to the newsletter.
 * 3. The promo modal has not been dismissed.
 * 4. There are non-zero savings.
 * 5. The total quantity of items in the last order is 5 or more.
 *
 * @returns {boolean} true if the condition is satisfied, false otherwise.
 */
function testTrigger() {
  const lastOrderStr = sessionStorage.getItem('ccx_lastOrder');
  const hasSubscribed = sessionStorage.getItem('ccx_hasSubscription');
  const promoModalDismissed = sessionStorage.getItem('promoModalDismissed');
  const savings = savingAmount()?.savings;

  console.log({
    lastOrderStr: JSON.parse(lastOrderStr || '{}'),
    hasSubscribed,
    promoModalDismissed,
    savings,
  })

  // convert to usable values
  const hasLastOrder = !!lastOrderStr; // true if it exists
  const isSubscribed = hasSubscribed === 'true';
  const isDismissed = promoModalDismissed === 'true';
  const hasPositiveSavings = Number(savings) > 0;

  if (!hasLastOrder || isSubscribed || isDismissed || !hasPositiveSavings) {
    return false;
  }

  try {
    const lastOrder = JSON.parse(lastOrderStr);
    const totalQty = lastOrder.products?.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    if (totalQty >= 5) {
      return true;
    }
  } catch (e) {
    // console.warn('Failed to parse lastOrder:', e);
  }
  return false;
}

/**
 * Updates the basket with subscription-eligible items from the last order.
 *
 * @return {Promise<Object>} A promise that resolves with an object containing
 *   a `success` boolean property, and either a `results` property containing
 *   the JSON response from the server, or an `error` property containing the
 *   error message.
 */
async function updateBasketWithSubscriptions() {
  try {
    const lastOrderData = sessionStorage.getItem('ccx_lastOrder');
    if (!lastOrderData) {
      console.error('Last order data not found in session storage.');
      return { success: false, error: 'Last order data not found.' };
    }

    const orderData = JSON.parse(lastOrderData);
    const hasSubscribed = sessionStorage.getItem('ccx_hasSubscription');
    if (hasSubscribed === 'true') {
      return { success: true, results: 'User already subscribed.' };
    }

    const eligibleItems = orderData.products
      .filter(product => product.is_subscription_product === '1')
      .map(product => ({
        product_id: product.product_id,
        colour_id: product.colour_id,
        variation_id: product.variation_id,
        qty: product.quantity,
        // payment_method_val: 'subscription'
        payment_method_val: 'subscribe'
      }));

    if (eligibleItems.length === 0) {
      console.log('No subscription-eligible items found.');
      return { success: true, results: 'No eligible items.' };
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (!csrfToken) {
      console.error('CSRF token not found');
      return { success: false, error: 'CSRF token not found' };
    }

    const response = await fetch('/gb/en/basket/add', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'X-CSRF-Token': csrfToken,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        Accept: 'application/json, text/javascript, */*; q=0.01',
      },
      body: JSON.stringify({ items: eligibleItems }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Successfully updated basket with subscription items.', responseData);
      return { success: true, results: responseData };
    } else {
      console.error(`Failed to update basket:`, response.statusText);
      return { success: false, error: response.statusText };
    }
  } catch (error) {
    console.error('Error in updateBasketWithSubscriptions:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Modified modal function to handle subscription update before redirect.
 */
function modal() {
  const hydrate = () => {
    console.log('Modal trigger test:', testTrigger());

    let firstName = getFirstName()?.toUpperCase();
    let price = savingAmount()?.savings;

    const overlay = document.createElement('div');
    overlay.className = 'promo-modal-overlay';

    const modal = document.createElement('div');
    modal.id = 'promo-modal';
    modal.innerHTML = `
        <div class="promo-modal-content">
          <div class="promo-modal-content__header">
          <img class="promo-modal-content__img" src="https://s7ap1.scene7.com/is/image/targetbatgsd/modal-banner?tm=1723996205181&fit=constrain&hei=248&wid=600" alt="">
            <button class="promo-modal-content__close"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.4142 15.7574L24.2426 18.5858L31.3137 11.5148L28.4853 8.68633L21.4142 15.7574ZM21.4142 24.2427L28.4853 31.3137L31.3137 28.4853L24.2426 21.4143L21.4142 24.2427ZM20 17.1716L11.5147 8.68633L8.68629 11.5148L17.1716 20L8.68629 28.4853L11.5147 31.3137L20 22.8285L22.8284 20L20 17.1716Z" fill="white"/>
</svg></button>
          </div>
          <div class="promo-modal-content__body">
          <h2 class="promo-modal-content__heading mb">FANCY <strong>£${price}</strong> OFF${firstName ? `, ${firstName}` : ''}?</h2>
          <h2 class="promo-modal-content__heading lg">${firstName ? `${firstName},` : ''} FANCY <strong>£${price}</strong> OFF FROM NOW ON?</h2>
          <p class="promo-modal-content__subheading">Subscribe and save £${price}</p>
          <p class="promo-modal-content__copy">Turn your last order into a subscription and save £${price} going forward. We’ll fill your basket to make it easy.</p>
          <div class="promo-modal-content__actions">
            <button class="promo-modal-content__dismiss-btn">DISMISS</button>
            <button id="addOrderToCart" class="promo-modal-content__subscribe-btn">SUBSCRIBE TODAY</button>
          </div>
          </div>
        </div>
      `;
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    document.body.classList.add('ccx-modal-open');

    overlay.addEventListener('click', function () {
      closeModal();
    });

    const closeModal = () => {
      overlay.remove();
      modal.remove();
      sessionStorage.setItem('promoModalDismissed', 'true');
      document.body.classList.remove('ccx-modal-open');
    };

    modal.querySelector('.promo-modal-content__close').addEventListener('click', closeModal);
    modal.querySelector('.promo-modal-content__dismiss-btn').addEventListener('click', closeModal);

    const addOrderToCartButton = domGet('#addOrderToCart');
    addOrderToCartButton?.addEventListener('click', async () => {
      const reorderResult = await reorderLastOrder();
      if (reorderResult?.success) {
        const updateResult = await updateBasketWithSubscriptions();
        closeModal();
        if (updateResult?.success) {
          console.log('Basket updated with subscriptions:', updateResult.results);

          if (window.location.href.includes('stage6')) {
            window.location.href = 'https://stage6-velo-cx.secure-update.co.uk/gb/en/basket';
            // document.querySelector('.popup-overlay-background')?.classList.add('mini-basket-active');
            // document.querySelector('#mini-basket-popup')?.classList.add('mini-basket-active');
          } else {
            window.location.href = 'https://www.velo.com/gb/en/basket';
          }

        } else {
          console.warn('Failed to update basket with subscriptions:', updateResult?.error);
        }

      } else {
        console.warn('Failed to reorder last order:', reorderResult?.error);
        closeModal();
      }
    });
  };

  hydrate();
}

/**
 * Adds custom CSS styles to the page.
 * @param {string} css - The CSS rules to add to the page.
 * @returns {void}
 */
const addStyles = (css) => {
  console.log('[addStyles] Starting the addStyles function...');

  if (!css) return;

  if (document.querySelector('.ccx-styles-o69-v1')) {
    console.log('[addStyles] Custom styles already exist.');
    return;
  }

  const style = document.createElement('style');
  style.classList.add('ccx-styles-o69-v1');
  style.appendChild(document.createTextNode(css));

  document.head.appendChild(style);
  console.log('Custom styles added.');
};

/**
 * Initializes all components of the experiment.
 *
 * This function is used to start the experiment. It calls the
 * `modal` and `savingAmount` functions to initialize all components.
 *
 * @function startExperiment
 */
function startExperiment() {
  const { name, variation } = settings;
  const expVariantName = `${name}-variation-${variation}`;

  const addBodyClass = (className) => {
    const body = document.body;
    body.classList.add(className || expVariantName);
  };

  // addStyles(STYLES);

  /**
   * Initializes all components of the experiment.
   *
   * This function is used to start the experiment. It calls the
   * `modal` and `savingAmount` functions to initialize all components.
   *
   * @function initComponents
   */
  const initComponents = () => {
    modal();
    savingAmount();
  };

  /**
   * Starts the experiment.
   *
   * This function is called by the startExperiment function to start the
   * experiment. It calls the addBodyClass and initComponents functions.
   *
   * @function start
   */
  const start = () => {
    addBodyClass();
    initComponents();
  };

  start();
}

// Start the experiment
startExperiment();