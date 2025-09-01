const LOG_ENABLED = false;
const TEST_NAME = "Liberty L01 - Persistent search";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;

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

const styles = `
/* Container: Auto layout */
.ccx-mobile-search-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 10px 20px;
    padding-bottom: 2rem;
    width: 100%;
    height: 60px;
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
    height: 40px;
    background: #F9F9F9;
    border: 1px solid #E9E9E9;
    border-radius: 25px;
    order: 0;
    width: 100%;
    max-width: 600px;
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
    margin-right: 1rem;
    flex: none;
    order: 0;
    flex-grow: 0;
}

/* Placeholder text */
.ccx-mobile-search-input {
    font-family: 'Akzidenz-Grotesk Pro', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    align-items: center;
    text-align: left;
    color: #757575;
    border: none;
    background: transparent;
    outline: none;
    flex: 1;
    order: 1;
    line-height: normal;
    min-height: 19px;
    padding: 0;
    height: auto;
    box-sizing: border-box;
    width: 100%;
    display: block;
    min-width: 0;
}

.ccx-mobile-clear-btn {
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
    display: none;
    /* hidden by default */
    user-select: none;
    background-color: transparent;
    flex-shrink: 0;
    flex: 0 0 auto;
    order: 2;
}

.ccx-mobile-clear-btn:hover {
    color: #000;
    text-decoration: underline;
}

.ccx-mobile-search-close-icon {
    border-radius: 50%;
    margin-left: 10px;
    display: none;
}

.ccx-mobile-search-close-icon:hover {
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.ccx-mobile-search-close-icon:hover rect {
    stroke: #757575;
}

.ccx-mobile-search-close-icon:active rect {
    fill: #757575;
} 

.menu-open .navbar .search-link {
    width: 0;
    height: 0;
    padding: 0;
    visibility: hidden;
}

.app-tray-menu .app-tray-buttons>.search {
    width: 0;
    height: 0;
    visibility: hidden;
}

.app-tray-panels.active {
    z-index: 100;
}

.mobile .search-panel.panel.algolia-search-panel.active {
    margin-top: 15.5rem !important;
}

#algolia-search-header-wrapper {
    width: 0;
    height: 0;
    visibility: hidden;
    padding: 0 !important;
}

.algolia-search-panel>.panel-title {
    width: 0;
    height: 0;
    visibility: hidden;
}

.brand-category-letters {
    top: 15.5rem;
}

.search-results .sorting-actions {
    top: 15.5rem;
}

.ccx-mobile-menu-open .search-panel.active {
    display: none;
}

.ccx-mobile-menu-open .algolia-search-panel.active {
    display: none;
}

@media screen and (min-width: 768px) {
    .mobile .search-panel.panel.algolia-search-panel.active {
        margin-top: 9.5rem !important;
    }

    .nav-container .ccx-mobile-search-container {
        padding-bottom: 10px;
    }

    .brand-category-letters {
        top: 9.5rem;
    }

    .search-results .sorting-actions {
        top: 9.5rem;
    }
}

@media screen and (min-width: 992px) {
    .desktop.menu-open .app-tray-panels>div.active {
        margin-top: 6rem;
    }

    .desktop .refinement-bar.active {
        margin-top: 6rem;
        height: calc(100dvh - 13rem);
    }

    .desktop .search-panel.panel.algolia-search-panel.active {
        margin-top: 6rem;
    }

    .desktop #sg-navbar-collapse .navbar-nav {
        background: #F9F9F9;
    }

    .desktop #sg-navbar-collapse .navbar-nav li.nav-item>.slideout-menu {
        margin-top: 6rem;
    }

    .desktop #sg-navbar-collapse .navbar-nav {
        justify-content: center;
    }

    #sg-navbar-collapse>.navbar>div>span.prev-arrow,
    #sg-navbar-collapse>.navbar>div>span.next-arrow {
        display: none;
    }

    .brand-category-letters {
        top: 13.5rem;
    }

    .desktop .navbar-nav pinned-categories {
        padding: 0 6rem 0 2rem;
        display: flex;
        justify-content: center;
    }

    .desktop .navbar-nav pinned-categories {
        padding: 0 6rem 0 2rem;
        display: flex;
        justify-content: center;
    }

    .desktop .navbar-nav pinned-categories .prev-arrow {
        display: none;
    }

    .desktop .navbar-nav pinned-categories .next-arrow {
        display: none;
    }

    .search-results .sorting-actions {
        top: 13.5rem;
    }

    .desktop .search-panel.panel.algolia-search-panel.active {
        margin-top: 1rem;
    }
}

@media screen and (min-width: 1441px) {
    .desktop .search-panel.panel.algolia-search-panel.active {
        margin-top: 0 !important;
    }

    .brand-category-letters {
        top: 15.5rem;
    }

    .desktop .refinement-bar.active {
        margin-top: 6rem;
        height: calc(100dvh - 15rem);
    }

    .search-results .sorting-actions {
        top: 15.5rem;
    }
}
`;

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

const customLog = (...messages) => {
    if (!LOG_ENABLED) return;

    const style = "background: #000; color: #e07200; padding: 4px 8px; border-radius: 4px;";
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

function handleResize() {
    const searchContainer = document.querySelector('.ccx-mobile-search-container');
    const navContainer = document.querySelector('.nav-container');
    const brandElement = document.querySelector('header > .nav-container > nav[aria-label="main-menu"] > .brand');
    const controlDesktopCategoriesList = document.querySelector('#sg-navbar-collapse');

    if (!searchContainer || !navContainer || !controlDesktopCategoriesList || !searchContainer) {
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
            // customLog('[handleResize] Moved search container -> after .nav-container (mobile).');
        } else {
            // customLog('[handleResize] Search container already in correct mobile position.');
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
                // customLog('[handleResize] Moved search container -> after .logo-home (tablet).');
            } else {
                // customLog('[handleResize] Search container already in correct tablet position.');
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
            // customLog('[handleResize] Moved #sg-navbar-collapse -> after .nav-container (desktop).');
        } else {
            // customLog('[handleResize] #sg-navbar-collapse already in correct desktop position.');
        }

        // get the ccx search container and place it after the element "nav[aria-label="main-menu"] > .brand"
        if (brandElement) {
            if (brandElement.nextElementSibling !== searchContainer) {
                brandElement.insertAdjacentElement('afterend', searchContainer);
                // customLog('[handleResize] Moved ccx search container -> after .brand (desktop).');
            } else {
                // customLog('[handleResize] ccx search container already in correct desktop position.');
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

function createSearchComponent() {
    customLog('Creating search component...');

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

    // Search icon container and insert SVG
    const searchIcon = document.createElement('div');
    searchIcon.classList.add('ccx-mobile-search-icon');
    searchIcon.innerHTML = variationSearchIconSVG;

    // Input element with placeholder
    const input = document.createElement('input');
    input.classList.add('ccx-mobile-search-input');
    input.id = 'ccx-mobile-search-input';
    input.type = 'text';
    input.setAttribute('placeholder', "Find out what you're looking for...");

    // Clear button inside input field
    const clearBtn = document.createElement('button');
    clearBtn.classList.add('ccx-mobile-clear-btn');
    clearBtn.textContent = 'Clear';

    const closeIcon = document.createElement('div');
    closeIcon.classList.add('ccx-mobile-search-close-icon');
    closeIcon.innerHTML = variationCloseIconSVG;

    if (!container || !searchBar || !searchIcon || !input || !clearBtn || !closeIcon) {
        console.warn('Failed to create some search component elements.');
        return null;
    }

    // Preserve append order
    searchBar.appendChild(searchIcon);
    searchBar.appendChild(input);
    searchBar.appendChild(clearBtn);
    container.appendChild(searchBar);
    container.appendChild(closeIcon);

    customLog('Search component created successfully with clear button.');
    return container;
}

function appendSearchComponent() {
    customLog('Looking for ".nav-container" element...');
    const logoHome = document.querySelector('.nav-container');

    if (!logoHome) {
        console.warn('Element ".nav-container" not found. Aborting append.');
        return;
    }

    customLog('Element found, creating and appending search component.');
    const searchComponent = createSearchComponent();

    if (!searchComponent) {
        console.warn('Search component creation failed. Nothing appended.');
        return;
    }

    logoHome.insertAdjacentElement('afterend', searchComponent);
    customLog('Search component appended successfully.');
}

function bindEvents() {
    const ccxInput = document.querySelector('.ccx-mobile-search-input');
    const ccxCloseIcon = document.querySelector('.ccx-mobile-search-close-icon');
    const ccxClearButton = document.querySelector('.ccx-mobile-clear-btn');
    let controlSearchButton = document.querySelector('.mobile .app-tray-buttons-container .app-tray-buttons > .search') || document.querySelector('.desktop .app-tray-buttons > .search') ;
    const controlInput = document.querySelector('.ais-SearchBox-input');
    const controlResetButton = document.querySelector('.ais-SearchBox-reset');
    const controlMobileMenuButton = document.querySelector('.mobile .page header .nav-container > nav.js-header-mobile.app-tray-menu ul > li.navicon');
    const controlMobileMenuCloseButton = document.querySelector('.mobile #sg-navbar-collapse > div > header > ul > li.navicon');

    if (ccxInput && ccxCloseIcon) {
        // Set initial ccxInput value from algq URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const algqValue = urlParams.get('algq');
        if (algqValue && ccxInput.value === '') {
            ccxInput.value = algqValue;
            if (controlInput) {
                controlInput.value = algqValue;
                const inputEvent = new Event('input', { bubbles: true });
                controlInput.dispatchEvent(inputEvent);
                customLog('[bindEvents] Set ccxInput and controlInput to algq URL parameter value and dispatched input event on initialization.');
            }
        }

        ccxInput.addEventListener('focus', () => {
            ccxCloseIcon.style.display = 'block';
            customLog('[bindEvents] Close button displayed on input focus.');

            if (ccxClearButton) {
                ccxClearButton.style.display = ccxInput.value !== '' ? 'block' : 'none';
                customLog('[bindEvents] Clear button display set to ' + ccxClearButton.style.display + ' on focus.');
            }
        });

        ccxInput.addEventListener('click', () => {
            // If controlSearchButton is not found or no longer valid, re-query it
            if (!controlSearchButton || !document.contains(controlSearchButton)) {
                controlSearchButton = document.querySelector('.mobile .app-tray-buttons-container .app-tray-buttons > .search');
                customLog('[bindEvents] Re-queried for .search button.');
            }

            if (controlSearchButton && !controlSearchButton.classList.contains('active')) {
                controlSearchButton.click();
                ccxInput.focus(); // Ensure input retains focus after searchButton click
                customLog('[bindEvents] Programmatically clicked .search button and restored input focus.');
            } else if (!controlSearchButton) {
                console.warn('[bindEvents] .search button not found.');
            } else {
                customLog('[bindEvents] .search button already active, skipping click.');
            }
        });

        ccxInput.addEventListener('input', () => {
            if (controlInput) {
                controlInput.value = ccxInput.value;
                const inputEvent = new Event('input', { bubbles: true });
                controlInput.dispatchEvent(inputEvent);
                customLog('[bindEvents] Synced input value to .ais-SearchBox-input and dispatched input event.');
            } else {
                console.warn('[bindEvents] .ais-SearchBox-input not found.');
            }

            if (ccxInput.value === '' && controlResetButton) {
                controlResetButton.click();
                customLog('[bindEvents] Programmatically clicked .ais-SearchBox-reset as input is empty.');
            } else if (ccxInput.value === '' && !controlResetButton) {
                console.warn('[bindEvents] .ais-SearchBox-reset not found.');
            }

            if (ccxClearButton) {
                ccxClearButton.style.display = ccxInput.value !== '' ? 'block' : 'none';
                customLog(`[bindEvents] Clear button display set to ${ccxClearButton.style.display}.`);
            } else {
                console.warn('[bindEvents] .ccx-mobile-clear-btn not found.');
            }
        });

        ccxCloseIcon.addEventListener('click', () => {
            ccxCloseIcon.style.display = 'none';

            if (ccxClearButton) {
                ccxClearButton.style.display = 'none';
                customLog('[bindEvents] Clear button hidden on close icon click.');
            }

            if (controlSearchButton && controlSearchButton.classList.contains('active')) {
                controlSearchButton.click();
                customLog('[bindEvents] Clicked .search button.');
            }
        });

        if (ccxClearButton) {
            ccxClearButton.addEventListener('click', (e) => {
                // e.stopPropagation();
                // e.stopImmediatePropagation();

                if (controlResetButton && ccxInput && controlInput) {
                    controlResetButton.click();
                    customLog('[bindEvents] Programmatically clicked .ais-SearchBox-reset via clear button.');
                    
                    ccxInput.value = '';
                    customLog('[bindEvents] Cleared ccxInput value.');
                    
                    controlInput.value = '';
                    const inputEvent = new Event('input', { bubbles: true });
                    controlInput.dispatchEvent(inputEvent);
                    customLog('[bindEvents] Cleared controlInput value and dispatched input event.');

                    ccxClearButton.style.display = 'none';
                    customLog('[bindEvents] Clear button hidden.');

                    ccxInput.focus();
                    customLog('[bindEvents] Restored input focus.');
                } else {
                    console.warn('[bindEvents] .ais-SearchBox-reset not found.');
                }
            });
        } else {
            console.warn('[bindEvents] .ccx-mobile-clear-btn not found.');
        }

        if (controlMobileMenuButton) {
            controlMobileMenuButton.addEventListener('click', () => {
                document.body.classList.add('ccx-mobile-menu-open');
                customLog('[bindEvents] Added ccx-mobile-menu-open class to body.');
            });
        } else {
            console.warn('[bindEvents] .app-tray-buttons-container not found.');
        }

        if (controlMobileMenuCloseButton) {
            controlMobileMenuCloseButton.addEventListener('click', () => {
                document.body.classList.remove('ccx-mobile-menu-open');
                customLog('[bindEvents] Removed ccx-mobile-menu-open class from body.');
            });
        } else {
            console.warn('[bindEvents] #sg-navbar-collapse header li.navicon not found.');
        }
        
    } else {
        console.warn('[bindEvents] Input or close icon not found.');
    }
}

function init() {
    try {
        customLog(TEST_NAME + ' | ' + VARIATION);
        customLog('[init] Current URL: ' + CURRENT_URL);

        document.body.classList.add('ccx-liberty-l01-v1');
        customLog('[init] Added class ccx-liberty-l01-v1 to body');

        waitForElements(
            ['#algolia-searchbox-placeholder input'],
            function () {
                const ccxInputContainer = document.querySelector('.ccx-mobile-search-container');

                if (ccxInputContainer) return;

                addStyles(styles);
                appendSearchComponent();

                setupResizeListener();

                bindEvents();
            }
        );

    } catch (error) {
        console.warn(error.message);
    }
}

init();
