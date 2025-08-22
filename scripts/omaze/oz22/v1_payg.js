const LOG_ENABLED = false;
const TEST_NAME = "OZ23 | Monthly Millionaire Landing Page";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";


/**
 * Trigger a callback when the history stack changes. Can be used to activate code
 * for different pages when navigating through SPAs
 */

 function onHistoryCallback(
  cb,
  invokeOnFirstCall,
  useReplaceState,
  altPopState
) {
  const pushState = history.pushState;
  const replaceState = history.replaceState;

  history.pushState = function () {
    pushState.apply(history, arguments);
    cb('PUSH');
  };

  if (useReplaceState) {
    history.replaceState = function () {
      replaceState.apply(history, arguments);
      cb('REPLACE');
    };
  }

  // legacy
  window.onpopstate = function () {
    cb('POP');
  };

  // New: covers all cases, use optional arguemnt for now
  if (altPopState) {
    window.addEventListener('popstate', () => {
      cb('POP');
    });
  }

  if (invokeOnFirstCall) {
    cb('INITIAL');
  }
}



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

const styles = {
    paygStyles: ``
}

const addStyles = (css) => {
    // customLog('[addStyles] Starting the addStyles function...');

    if (!css) return;

    if (!css) {
        // customLog('[addStyles] No CSS provided');
        return;
    }

    // Check if the style tag already exists
    if (document.querySelector('.ccx-styles-de1-v1')) {
        // customLog('[addStyles] Custom styles already exist.');
        return;
    }

    // Create a new <style> element
    const style = document.createElement('style');
    style.classList.add('ccx-styles-de1-v1');
    style.appendChild(document.createTextNode(css));

    // Append the style tag to the document head
    document.head.appendChild(style);
    // customLog('Custom styles added.');
};

function init() {
    try {
        // CLEANUP FIRST - Reset state so DYO.waitForElement will re-trigger
        // customLog('[init] Starting cleanup and reset...');
        
        // Remove existing custom buttons
        const existingButtons = document.querySelectorAll('button[style*="position: fixed"]');
        existingButtons.forEach(btn => {
            if (btn.textContent.includes('Add Bonus') || 
                btn.textContent.includes('Add Monthly') || 
                btn.textContent.includes('No Thanks')) {
                btn.remove();
                // customLog('[cleanup] Removed existing button:', btn.textContent);
            }
        });
        
        // Clear global reference
        window.customOverlayButton = null;
        
        // Reset body class to trigger fresh execution
        document.body.classList.remove('omaze-oz22-v1-payg');
        
        // customLog('[init] Cleanup completed, starting fresh initialization...');

        document.body.classList.add('omaze-oz22-v1-payg');

        DYO.waitForElement('payg-cart-container .next-button', function (elements) {
            const nextButton = elements[0];
            nextButton.style.position = 'fixed';
            nextButton.style.bottom = '0';
            nextButton.style.left = '0';
            nextButton.style.width = '100%';
            nextButton.style.zIndex = '9999';
            nextButton.classList.remove('rounded-full', 'py-3', 'my-4');
        });

        DYO.waitForElementAsync('[data-mobile="apply-offer-button"]', 1, 100, 999999).then(elements => {
            

            const controlNextButton = document.querySelector('.next-button');
            if (controlNextButton) {
                controlNextButton.classList.remove('hover:bg-[#FFCB10]', 'bg-[#FFDD00]', 'text-xl', 'font-semibold');
                controlNextButton.classList.add('bg-white');                
                controlNextButton.style.fontWeight = '500';
                controlNextButton.style.fontSize = '15px';
                controlNextButton.textContent = 'No Thanks';
                controlNextButton.style.height = '64px';
            }

            const controlAddOfferButtonContainer = elements[0];
            
            // Hide the original apply offer button
            controlAddOfferButtonContainer.style.display = 'none';

            const controlAddOfferButton = controlAddOfferButtonContainer.querySelector('button');
            
            const yellowOverlayButton = document.createElement('button');
            yellowOverlayButton.textContent = 'Add Bonus Entries';
            yellowOverlayButton.style.cssText = `
                position: fixed;
                bottom: 55px;
                left: 0;
                width: 100%;
                height: 64px;
                background-color: #FFDD00;
                color: #000000;
                font-size: 15px;
                font-weight: 600;
                border: none;
                cursor: pointer;
                z-index: 10000;
                transition: background-color 0.2s ease;
            `;

            // trigger original button
            yellowOverlayButton.addEventListener('click', function() {
                if (controlAddOfferButton) {
                    controlAddOfferButton.click();
                }
            });

            // Append to body
            document.body.appendChild(yellowOverlayButton);            
            // Store reference to the overlay button 
            window.customOverlayButton = yellowOverlayButton;
        });

        // Handle Monthly Millionaire page
        DYO.waitForElementAsync('[alt="Monthly Millionaire"]', 1, 100, 999999).then(elements => {
            
            
            // In the Monthly Millionaire section, instead of reusing the old button:
            if (window.customOverlayButton) {
                // Remove the old button completely
                window.customOverlayButton.remove();
                
                // Create a completely new button
                const newYellowButton = document.createElement('button');
                newYellowButton.textContent = 'Add Monthly Millionaire';
                newYellowButton.style.cssText = `
                    position: fixed;
                    bottom: 55px;
                    left: 0;
                    width: 100%;
                    height: 64px;
                    background-color: #FFDD00;
                    color: #000000;
                    font-size: 15px;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    z-index: 10000;
                    transition: background-color 0.2s ease;
                `;
                
                // Add fresh event listener
                newYellowButton.addEventListener('click', function() {
                    const monthlyMillionaireButton = document.querySelector('[alt="Monthly Millionaire"] ~ div button');


                    if (monthlyMillionaireButton.classList.contains('cursor-not-allowed')) {
                        document.querySelector('button[type="submit"][name="checkout"]').click()
                    }else {
                        monthlyMillionaireButton.click();
                    }
                });
                
                document.body.appendChild(newYellowButton);
                window.customOverlayButton = newYellowButton;
            }

            // Create "No Thanks" button for Step 3
            const noThanksButton = document.createElement('button');
            noThanksButton.textContent = 'No Thanks';
            noThanksButton.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 64px;
                background-color: white;
                color: #000000;
                font-size: 15px;
                font-weight: 500;
                border: none;
                cursor: pointer;
                z-index: 9999;
            `;

            // Click handler to trigger checkout button
            noThanksButton.addEventListener('click', function() {
                const checkoutButton = document.querySelector('button[type="submit"][name="checkout"]');
                if (checkoutButton) {
                    checkoutButton.click();
                } else {
                    // customLog('[No Thanks Button] Checkout button not found');
                }
            });

            document.body.appendChild(noThanksButton);
            // Modify the Monthly Millionaire price display
            const monthlyMillionaireContainer = document.querySelector('.bg-\\[\\#F5F5F5\\].border.border-\\[\\#D6D6D6\\].rounded-lg');
            
            if (monthlyMillionaireContainer) {
                const addButton = monthlyMillionaireContainer.querySelector('button[type="button"]');
                const priceElement = monthlyMillionaireContainer.querySelector('.text-xl.font-bold.text-\\[\\#090F15\\]');
                const flexContainer = monthlyMillionaireContainer.querySelector('.flex.items-center.justify-between');
                
                if (addButton && priceElement && flexContainer) {
                    const originalCheckoutCTA = document.querySelector('button[type="submit"]')
                    originalCheckoutCTA.classList.add('hidden');

                    // Hide the Add button
                    addButton.style.display = 'none';                    
                    // Move the price element to the right position (where the button was - ref: Figma)
                    
                    const buttonParent = addButton.parentElement;
                    priceElement.remove(); // Remove from current position
                    buttonParent.insertBefore(priceElement, addButton); // Insert where button was
                    
                    // Style the price btn
                    Object.assign(priceElement.style, {                                                
                        padding: '0.75rem 1.5rem',
                        minWidth: '7rem',
                        textAlign: 'center',
                        cursor: 'default',                        
                        marginLeft: '0' 
                    });
                    priceElement.style.setProperty('font-size', '24px', 'important');                    
                }
            }
        });

    } catch (error) {
        console.error(error.message);
    }
}

onHistoryCallback(function(action) {
    // customLog('[History Change] Navigation detected:', action);
    init();
}, true, true, true);