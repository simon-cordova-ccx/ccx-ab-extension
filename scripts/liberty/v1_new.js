/*
HTML element has class mobile when screen size is less than 992px

HTML element has class desktop when screen size is greater than or equal to 991px

When a navigation item is clicked, except for the menu item, the element with class "app-tray-panels" and "modal-background" get an "active" class 

When the mobile menu icon is clicked, the html element gets a class of "menu-open" and the body an inline style of "overflow: hidden;"
    - Depending on the clicked item, the element with class .mini-cart. .search-panel, .account-panel, .wishlist-panel also gets an "active" class
    - All of this happens when the mobile menu is open

When the mobile menu is open, and the menu's user icon is clicked, the element with class "app-tray-panels" gets an "active" class, as does the element with class .account-panel
    - Closing this panel shows the mobile menu again
When the mobile menu is open, and the menu's user icon is clicked, the element with class "app-tray-panels" gets an "active" class, as does the element with class .wishlist-panel
    - Closing this panel shows the mobile menu again
When the mobile menu is open, and the menu's user icon is clicked, the element with class "app-tray-panels" gets an "active" class, as does the element with class .wishlist-panel
    - Closing this panel removes the "menu-open" class from the html element and the inline style "overflow: hidden" from the body, and the mobile menu closes
*/

const LOG_ENABLED = true;
const TEST_NAME = "Liberty L01 - Persistent search";
const VARIATION = "VARIATION 2";
const CURRENT_URL = window.location.href;

const omaze23Data = {
}

const variationSearchIconSVG = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.796 13.7249C16.1726 12.0681 16.857 9.94409 16.7064 7.79527C16.5559 5.64646 15.582 3.63859 13.9878 2.18998C12.3935 0.741379 10.3019 -0.0362431 8.14849 0.0191235C5.99512 0.07449 3.9461 0.958582 2.42841 2.4872C0.910708 4.01582 0.0413676 6.07107 0.00143861 8.22478C-0.0384904 10.3785 0.754084 12.4646 2.21408 14.0484C3.67407 15.6322 5.6889 16.5916 7.83874 16.7268C9.98858 16.8619 12.1077 16.1624 13.7545 14.7739L18.9494 19.9837L20 18.9256L14.796 13.7249ZM8.37227 15.2567C7.01074 15.2582 5.67938 14.8558 4.54658 14.1005C3.41379 13.3451 2.5305 12.2708 2.00844 11.0133C1.48638 9.75583 1.34901 8.37177 1.61373 7.03622C1.87844 5.70067 2.5333 4.47365 3.49552 3.51038C4.45775 2.5471 5.68407 1.89087 7.01933 1.6247C8.35459 1.35854 9.73882 1.49439 10.9969 2.01508C12.2549 2.53578 13.3302 3.41791 14.0868 4.54988C14.8434 5.68184 15.2472 7.01278 15.2472 8.37431C15.2478 10.1984 14.5241 11.9481 13.235 13.2387C11.946 14.5293 10.1964 15.2552 8.37227 15.2567Z" fill="black"/>
</svg>
`;

const variationCloseIconSVG = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="39" height="39" rx="19.5" fill="#F9F9F9" stroke="#E9E9E9"/>
<path d="M15 25L25 15" stroke="black" stroke-width="1.5" stroke-miterlimit="10"/>
<path d="M15.025 15.025L24.971 24.971" stroke="black" stroke-width="1.5" stroke-miterlimit="10"/>
</svg>
`;

const selectors = {

}

const styles = `
/* Container: Auto layout */
  .ccx-mobile-search-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 10px 20px;
    padding-bottom: 2rem;
    gap: 10px;
    width: 100%;
    height: 60px;
    background: #FFFFFF;
    max-width: 600px;
    margin: 0 auto;
  }

  /* Search bar: Auto layout */
.ccx-mobile-search-bar-mobile {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  gap: 10px;
  height: 40px;
  background: #F9F9F9;
  border: 1px solid #E9E9E9;
  border-radius: 25px;
  flex: none;
  order: 0;
  flex-grow: 1;
}

.ccx-mobile-search-bar-mobile:hover {
    border-color: #757575;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.ccx-mobile-search-bar-mobile:focus-within {
  border: 1px solid #757575;
  color: #000000;
}

.ccx-mobile-search-bar-mobile:focus-within .ccx-mobile-search-input {
  color: #000000;
}

  /* Search icon */
  .ccx-mobile-search-icon {
    width: 20px;
    height: 19.97px;
    color: #000000;

    flex: none;
    order: 0;
    flex-grow: 0;
  }

  /* Placeholder text */
.ccx-mobile-search-input {
    height: 19px;
    font-family: 'Akzidenz-Grotesk Pro', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-align: left;
    color: #757575;
    border: none;
    background: transparent;
    outline: none;
    flex: none;
    order: 1;
    flex-grow: 1;
}

.ccx-mobile-clear-btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Akzidenz-Grotesk Pro', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
  text-align: center;
  color: #757575;
  border: none;
  border-radius: 3px;
  padding: 2px 8px;
  cursor: pointer;
  display: none; /* hidden by default */
  user-select: none;
  background-color: transparent;
}

.ccx-mobile-clear-btn:hover {
    color: #000;
    text-decoration: underline;
}   

.ccx-mobile-search-close-icon {
    border-radius: 50%;
}

.ccx-mobile-search-close-icon:hover {
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.menu-open .navbar .search-link {
    width: 0;
    height: 0;
    padding: 0;
    visibility: hidden;
}

.app-tray-menu .app-tray-buttons > .search {
    width: 0;
    height: 0;
    visibility: hidden;
}

.app-tray-panels.active {
    z-index: 100;
}

.mobile .search-panel.panel.algolia-search-panel.active {
    margin-top: 15.5rem;
}

#algolia-search-header-wrapper {
    width: 0;
    height: 0;
    visibility: hidden;
}

.algolia-search-panel > .panel-title {
    width: 0;
    height: 0;
    visibility: hidden;
}

@media screen and (min-width: 768px) {
    .mobile .search-panel.panel.algolia-search-panel.active {
        margin-top: 9.5rem;
    }
    .nav-container .ccx-mobile-search-container {
        padding-bottom: 10px;
    }
}

@media screen and (min-width: 992px) {
    .desktop .app-tray-panels > div.active {
        margin-top: 6rem;
    }
    .desktop .search-panel.panel.algolia-search-panel.active {
        margin-top: 6rem;
    }
    .desktop #sg-navbar-collapse .navbar-nav .slideout-menu {
        margin-top: 6rem;
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
    if (document.querySelector('.ccx-syles-liberty-L01')) {
        customLog('[addStyles] Custom styles already exist.');
        return;
    }

    // Create a new <style> element
    const style = document.createElement('style');
    style.classList.add('ccx-syles-liberty-L01');
    style.appendChild(document.createTextNode(css));

    // Append the style tag to the document head
    document.head.appendChild(style);
    customLog('Custom styles added.');
};

function waitForElements(selectors, callback) {
    customLog('[waitForElements] Starting to wait for elements...');

    if (!selectors || !Array.isArray(selectors) || selectors.length === 0) {
        customLog('[waitForElements] No selectors provided.');
        return;
    }

    if (!window.DYO || !DYO.waitForElementAsync) {
        console.warn('[waitForElements] DYO.waitForElementAsync is not available.');
        return;
    }

    // Create promises for each selector
    const promises = selectors.map(selector =>
        DYO.waitForElementAsync(selector, 1, 100, 150)
    );

    Promise.all(promises)
        .then(results => {
            customLog('[waitForElements] All elements found:', results[0]);
            if (typeof callback === 'function') callback(results);
        })
        .catch(error => {
            console.warn('[waitForElements] Some selectors not found within timeout.', error);
        });
}

function createSearchComponent() {
    console.log('Creating search component...');

    const containerExists = document.querySelector('.ccx-mobile-search-container');
    if (containerExists) {
        console.warn('Search component already exists. Aborting creation.');
        return null;
    }

    // Container
    const container = document.createElement('div');
    container.classList.add('ccx-mobile-search-container');

    // Search bar wrapper
    const searchBar = document.createElement('div');
    searchBar.classList.add('ccx-mobile-search-bar-mobile');
    searchBar.style.position = 'relative';

    // Search icon container and insert SVG
    const searchIcon = document.createElement('div');
    searchIcon.classList.add('ccx-mobile-search-icon');
    searchIcon.innerHTML = variationSearchIconSVG;

    // Input element with placeholder
    const input = document.createElement('input');
    input.classList.add('ccx-mobile-search-input');
    input.type = 'text';
    input.placeholder = `Find what you're looking for…`;

    // Clear button inside input field (absolute positioned)
    const clearBtn = document.createElement('button');
    clearBtn.classList.add('ccx-mobile-clear-btn');
    clearBtn.textContent = 'Clear';

    // Show or hide clear button based on input content
    input.addEventListener('input', () => {
        if (input.value.length > 0) {
            clearBtn.style.display = 'block';
        } else {
            clearBtn.style.display = 'none';
        }
    });

    // Clear input & hide button on click
    clearBtn.addEventListener('click', () => {
        input.value = '';
        input.focus();
        clearBtn.style.display = 'none';
    });

    const closeIcon = document.createElement('div');
    closeIcon.classList.add('ccx-mobile-search-close-icon');
    closeIcon.innerHTML = variationCloseIconSVG;

    if (!container || !searchBar || !searchIcon || !input || !clearBtn || !closeIcon) {
        console.warn('Failed to create some search component elements.');
        return null;
    }

    // Preserve your append order exactly
    searchBar.appendChild(searchIcon);
    searchBar.appendChild(input);
    searchBar.appendChild(clearBtn);
    container.appendChild(searchBar);
    container.appendChild(closeIcon);

    console.log('Search component created successfully with clear button.');
    return container;
}

function bindMobileSearchInput() {
    const ccxMobileSearchInput = document.querySelector('.ccx-mobile-search-input');
    const controlSearchInput = document.querySelector('#algolia-searchbox-placeholder input');
    const ccxMobileClearButton = document.querySelector('.ccx-mobile-clear-btn');
    const controlClearBtn = document.querySelector('.ais-SearchBox-reset.algolia-clear-button');
    const ccxMobileCloseIcon = document.querySelector('.ccx-mobile-search-close-icon');

    if (!ccxMobileSearchInput) {
        console.warn('Required element not found: ccxMobileSearchInput');
        return;
    }

    if (!controlSearchInput) {
        console.warn('Required element not found: controlSearchInput');
        return;
    }

    if (!ccxMobileClearButton) {
        console.warn('Required element not found: ccx-mobile-clear-btn');
        // Not fatal, continue
    }

    if (!ccxMobileCloseIcon) {
        console.warn('Required element not found: ccx-mobile-search-close-icon');
        // Not fatal, continue
    }

    ccxMobileSearchInput.addEventListener('input', () => {
        // Toggle panels
        const controlAppTrayPanel = document.querySelector('.app-tray-panels');
        if (controlAppTrayPanel) controlAppTrayPanel.classList.add('active');

        const controlAlgoliaSearchPanel = document.querySelector('.search-panel.panel.algolia-search-panel');
        if (controlAlgoliaSearchPanel) controlAlgoliaSearchPanel.classList.add('active');

        // Update search input value and dispatch input event for Algolia
        controlSearchInput.value = ccxMobileSearchInput.value;
        controlSearchInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    if (ccxMobileClearButton) {
        ccxMobileClearButton.addEventListener('click', () => {
            // Clear our custom input
            ccxMobileSearchInput.value = '';
            const inputEvent = new Event('input', { bubbles: true });
            ccxMobileSearchInput.dispatchEvent(inputEvent);

            // Also trigger click on original clear button if found
            if (controlClearBtn) {
                controlClearBtn.click();
            } else {
                console.warn('Original clear button .ais-SearchBox-reset.algolia-clear-button not found');
            }
        });
    }

    if (ccxMobileCloseIcon) {
        ccxMobileCloseIcon.addEventListener('click', () => {
            console.log('[ccxMobileCloseIcon] Click event triggered.');

            const appTrayPanel = document.querySelector('.app-tray-panels.active');
            if (appTrayPanel) {
                appTrayPanel.classList.remove('active');
                console.log('[ccxMobileCloseIcon] Removed .active from app-tray-panels:', appTrayPanel);
            } else {
                console.warn('[ccxMobileCloseIcon] No .app-tray-panels.active found.');
            }

            const activeSearchPanel = document.querySelector('.search-panel.panel.algolia-search-panel.active');
            if (activeSearchPanel) {
                activeSearchPanel.classList.remove('active');
                console.log('[ccxMobileCloseIcon] Removed .active from search panel:', activeSearchPanel);
            } else {
                console.warn('[ccxMobileCloseIcon] No .search-panel.panel.algolia-search-panel.active found.');
            }
        });

        console.log('[ccxMobileCloseIcon] Event listener attached successfully:', ccxMobileCloseIcon);
    } else {
        console.warn('[ccxMobileCloseIcon] Element not found — listener not attached.');
    }

}

function appendSearchComponent() {
    console.log('Looking for ".nav-container" element...');
    const logoHome = document.querySelector('.nav-container');

    if (!logoHome) {
        console.warn('Element ".nav-container" not found. Aborting append.');
        return;
    }

    console.log('Element found, creating and appending search component.');
    const searchComponent = createSearchComponent();
    setupSearchCloseBehavior(searchComponent);

    if (!searchComponent) {
        console.warn('Search component creation failed. Nothing appended.');
        return;
    }

    logoHome.insertAdjacentElement('afterend', searchComponent);
    console.log('Search component appended successfully.');

    bindMobileSearchInput();
    customLog('Search component initialized and bound to input events.');

    // Apply "algq" parameter if exists
    applyAlgqParamValue();

    // Add responsive behavior
    setupResizeListener();
}

function setupSearchCloseBehavior(searchContainer) {
    if (!searchContainer) {
        console.warn('No search container provided.');
        return;
    }

    const ccxMobileCloseIcon = searchContainer.querySelector('.ccx-mobile-search-close-icon');
    const ccxMobileSearchInput = searchContainer.querySelector('.ccx-mobile-search-input');

    if (!ccxMobileCloseIcon || !ccxMobileSearchInput) {
        console.warn('Required elements not found in search container.');
        return;
    }

    // Hide closeIcon initially if input is empty
    if (ccxMobileSearchInput.value.length === 0) {
        ccxMobileCloseIcon.style.display = 'none';
    }

    // Show or hide closeIcon based on input value
    ccxMobileSearchInput.addEventListener('input', () => {
        if (ccxMobileSearchInput.value.length > 0) {
            ccxMobileCloseIcon.style.display = 'block';
        } else {
            ccxMobileCloseIcon.style.display = 'none';
        }
    });

    // On close icon click: hide icon, clear input, focus input
    ccxMobileCloseIcon.addEventListener('click', () => {
        ccxMobileCloseIcon.style.display = 'none';
        ccxMobileSearchInput.value = '';
        ccxMobileSearchInput.focus();

        // Trigger input event to update any other listeners/UI
        ccxMobileSearchInput.dispatchEvent(new Event('input'));
    });
}

function applyAlgqParamValue() {
    const urlParams = new URLSearchParams(window.location.search);
    const algqValue = urlParams.get('algq');

    if (!algqValue) {
        customLog('[applyAlgqParamValue] No "algq" param found in URL.');
        return;
    }

    customLog('[applyAlgqParamValue] Found algq param:', algqValue);

    const ccxMobileSearchInput = document.querySelector('.ccx-mobile-search-input');
    const controlSearchInput = document.querySelector('#algolia-searchbox-placeholder input');

    if (ccxMobileSearchInput) {
        ccxMobileSearchInput.value = algqValue;
        ccxMobileSearchInput.dispatchEvent(new Event('input', { bubbles: true }));
        customLog('[applyAlgqParamValue] Applied value to ccxMobileSearchInput.');
    } else {
        console.warn('[applyAlgqParamValue] ccxMobileSearchInput not found.');
    }

    if (controlSearchInput) {
        controlSearchInput.value = algqValue;
        controlSearchInput.dispatchEvent(new Event('input', { bubbles: true }));
        customLog('[applyAlgqParamValue] Applied value to controlSearchInput.');
    } else {
        console.warn('[applyAlgqParamValue] controlSearchInput not found.');
    }
}


function handleResize() {
    const searchContainer = document.querySelector('.ccx-mobile-search-container');
    const navContainer = document.querySelector('.nav-container');
    const brandElement = document.querySelector('header > .nav-container > nav[aria-label="main-menu"] > .brand');
    const controlDesktopCategoriesList = document.querySelector('#sg-navbar-collapse');

    if (!searchContainer || !navContainer || !controlDesktopCategoriesList) {
        console.warn('[handleResize] Required elements not found.');
        return;
    }

    /** ------------------------------
     * Mobile placement for SEARCH
     * Width: ≤767px
     * Place searchContainer AFTER navContainer
     --------------------------------*/
    if (window.innerWidth <= 767) {
        if (navContainer.nextElementSibling !== searchContainer) {
            navContainer.insertAdjacentElement('afterend', searchContainer);
            customLog('[handleResize] Moved search container -> after .nav-container (mobile).');
        } else {
            customLog('[handleResize] Search container already in correct mobile position.');
        }
    }

    /** ------------------------------
     * Tablet placement for SEARCH
     * Width: 768px–991px
     * Place searchContainer AFTER .logo-home inside nav.js-header-mobile.app-tray-menu
     --------------------------------*/
    if (window.innerWidth >= 768 && window.innerWidth < 992) {
        customLog('[handleResize] Window width in tablet range (768px–991px). Applying tablet placement...');

        const tabletLogoHome = document.querySelector('.nav-container > nav.js-header-mobile.app-tray-menu .logo-home');

        if (tabletLogoHome) {
            if (tabletLogoHome.nextElementSibling !== searchContainer) {
                tabletLogoHome.insertAdjacentElement('afterend', searchContainer);
                customLog('[handleResize] Moved search container -> after .logo-home (tablet).');
            } else {
                customLog('[handleResize] Search container already in correct tablet position.');
            }
        } else {
            console.warn('[handleResize] Tablet target element (.logo-home inside nav.js-header-mobile.app-tray-menu) not found.');
        }
    }

    /** ------------------------------
     * Desktop placement for #sg-navbar-collapse
     * Width: ≥992px
     * Place it AFTER navContainer
     --------------------------------*/
    if (window.innerWidth >= 992) {
        if (navContainer.nextElementSibling !== controlDesktopCategoriesList) {
            navContainer.insertAdjacentElement('afterend', controlDesktopCategoriesList);
            customLog('[handleResize] Moved #sg-navbar-collapse -> after .nav-container (desktop).');
        } else {
            customLog('[handleResize] #sg-navbar-collapse already in correct desktop position.');
        }

        // get the ccx search container and place it after the element "nav[aria-label="main-menu"] > .brand"
        if (brandElement) {
            if (brandElement.nextElementSibling !== searchContainer) {
                brandElement.insertAdjacentElement('afterend', searchContainer);
                customLog('[handleResize] Moved ccx search container -> after .brand (desktop).');
            } else {
                customLog('[handleResize] ccx search container already in correct desktop position.');
            }
        } else {
            console.warn('[handleResize] .brand element not found for desktop placement.');
        }
    }

    /** ------------------------------
     * Mobile + Tablet placement for #sg-navbar-collapse
     * Width: ≤991px
     * Place it AFTER brandElement
     --------------------------------*/
    if (window.innerWidth <= 991) {
        if (brandElement) {
            if (brandElement.nextElementSibling !== controlDesktopCategoriesList) {
                brandElement.insertAdjacentElement('afterend', controlDesktopCategoriesList);
                customLog('[handleResize] Moved #sg-navbar-collapse -> after .brand (mobile/tablet).');
            } else {
                customLog('[handleResize] #sg-navbar-collapse already in correct mobile/tablet position.');
            }
        } else {
            console.warn('[handleResize] .brand element not found for mobile/tablet placement.');
        }

    }
}

function setupResizeListener() {
    // Run once immediately
    handleResize();

    // Attach listener
    window.addEventListener('resize', handleResize);
    customLog('[setupResizeListener] Resize listener attached.');
}

function setupSearchPanelToggle() {
    const searchPanel = document.querySelector('.search-panel.panel.algolia-search-panel.active');

    if (!searchPanel) {
        console.warn('[setupSearchPanelToggle] Active search panel not found.');
        return;
    }

    // 1. Hide search panel when clicking ".mobile .app-tray-buttons li:last-child"
    const controlHamburgerCloseButton = document.querySelector('.mobile .app-tray-buttons li:last-child');
    if (controlHamburgerCloseButton) {
        controlHamburgerCloseButton.addEventListener('click', () => {
            console.log('[setupSearchPanelToggle] Hiding search panel (hamburger close button).');
            searchPanel.style.display = 'none';
        });
    } else {
        console.warn('[setupSearchPanelToggle] .mobile .app-tray-buttons li:last-child not found.');
    }

    // 2. Show search panel when clicking the last menu item (delegated, since it may not exist yet)
    document.addEventListener('click', (event) => {
        // const lastMenuItem = document.querySelector('.menu-open .nav-container [aria-label="main-menu"] .navbar-header-m ul > li:last-child');
        const lastMenuItem = document.querySelector('.nav-container [aria-label="main-menu"] .navbar-header-m ul > li:last-child');
        if (!lastMenuItem) {
            console.warn('[setupSearchPanelToggle] Last menu item not found.');
            return;
        }
        if (lastMenuItem && lastMenuItem.contains(event.target)) {
            console.log('[setupSearchPanelToggle] Last menu item clicked, showing search panel.');
            searchPanel.style.display = 'block';
        }
    });
}

function init() {
    try {
        customLog(TEST_NAME + ' | ' + VARIATION);
        customLog('[init] Current URL: ' + CURRENT_URL);

        document.body.classList.add('ccx-liberty-l01-v1');
        customLog('[init] Added class ccx-liberty-l01-v1 to body');

        waitForElements(
            ['#footercontent', '#algolia-searchbox-placeholder input'],
            function () {
                addStyles(styles);
                appendSearchComponent();
                setupSearchPanelToggle();
            }
        );

    } catch (error) {
        console.warn(error.message);
    }
}

init();
