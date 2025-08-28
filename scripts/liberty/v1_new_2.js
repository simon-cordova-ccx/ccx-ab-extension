const LOG_ENABLED = false;
const TEST_NAME = "Liberty L01 - Persistent search";
const VARIATION = "VARIATION 2";
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
    .desktop .app-tray-panels>div.active {
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

function setupSearchPanelVisibility() {
    customLog('[setupSearchPanelVisibility] Setting up search panel visibility...');

    // Select the HTML element
    const htmlElement = document.documentElement;

    // Create a MutationObserver instance
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // Check if the class attribute changed
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const hasMenuOpen = htmlElement.classList.contains('menu-open');
                const hasNoScroll = htmlElement.classList.contains('no-scroll');
                const searchPanel = document.querySelector('.search-panel.panel.algolia-search-panel');

                // If either menu-open or no-scroll is present, hide the search panel
                if (hasMenuOpen || hasNoScroll) {
                    customLog((hasMenuOpen ? 'menu-open' : 'no-scroll') + ' class added');
                    if (searchPanel) {
                        searchPanel.style.display = 'none';
                    }
                }

                // If neither menu-open nor no-scroll is present, show the search panel
                if (!hasMenuOpen && !hasNoScroll) {
                    customLog('menu-open and no-scroll classes removed');
                    if (searchPanel) {
                        searchPanel.style.display = 'block';
                    }
                    const searchInput = document.querySelector('.ccx-mobile-search-input');
                    if (searchInput && searchInput.value.trim() !== '') {
                        const appTrayPanels = document.querySelector('.app-tray-panels');
                        if (appTrayPanels) {
                            appTrayPanels.classList.add('active');
                        }
                        if (searchPanel) {
                            searchPanel.classList.add('active');
                            searchPanel.style.display = 'block';
                        }
                    }
                }
            }
        });
    });

    // Configure and start the observer
    observer.observe(htmlElement, {
        attributes: true, // Observe attribute changes
        attributeFilter: ['class'], // Only monitor class attribute
    });
}

function observeModalAdjust() {
    const desktopHeader = document.querySelector('.desktop-header');
    const mobileContainer = document.querySelector('.mobile'); // parent that always exists

    if (!desktopHeader || !mobileContainer) {
        console.warn('Desktop header or mobile container not found.');
        return;
    }

    let refinementObserver = null;

    const attachRefinementObserver = (target) => {
        if (!target) return;

        // Disconnect any old one
        if (refinementObserver) refinementObserver.disconnect();

        refinementObserver = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const classList = mutation.target.classList;
                    const mobileSearchPanel = document.querySelector('.mobile .search-panel.panel.algolia-search-panel.active');

                    if (classList.contains('d-flex')) {
                        desktopHeader.style.display = 'none';
                        if (mobileSearchPanel) mobileSearchPanel.style.marginTop = '0';
                        customLog('Desktop header hidden, search panel margin set to 0');
                    } else if (classList.contains('d-none')) {
                        desktopHeader.style.display = '';
                        if (mobileSearchPanel) mobileSearchPanel.style.marginTop = '15rem';
                        customLog('Desktop header shown, search panel margin reset to 15rem');
                    }
                }
            });
        });

        refinementObserver.observe(target, { attributes: true });
        // customLog('Refinement observer attached');
    };

    // Watch the mobile container for when the refinement bar is added/removed
    const containerObserver = new MutationObserver(() => {
        const target = document.querySelector('.mobile .algolia-refinement-bar');
        if (target) attachRefinementObserver(target);
    });

    containerObserver.observe(mobileContainer, { childList: true, subtree: true });

    // If it already exists on load, attach immediately
    const initialTarget = document.querySelector('.mobile .algolia-refinement-bar');
    if (initialTarget) attachRefinementObserver(initialTarget);
}

function observeSearchPanelActive() {
    const target = document.querySelector('.search-panel.panel.algolia-search-panel');

    if (!target) {
        console.warn('[Observer] Target element not found');
        return;
    }

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const hasActive = mutation.target.classList.contains('active');

                if (hasActive) {
                    const controlDesktopMenuGroup = document.querySelector('.desktop .menu-group');

                    customLog('[ACTIVE ADDED]', mutation.target);
                    if (controlDesktopMenuGroup) {
                        controlDesktopMenuGroup.style.display = 'none';
                    }
                    const controlDesktopSearchPanel = document.querySelector('.desktop .search-panel.panel.algolia-search-panel.active')
                    if (controlDesktopSearchPanel) {
                        controlDesktopSearchPanel.style.marginTop = '1rem';
                    }
                } else {
                    if (controlDesktopMenuGroup) {
                        customLog('[ACTIVE REMOVED]', mutation.target);
                        controlDesktopMenuGroup.style.display = 'block';
                        document.querySelector('.desktop .search-panel.panel.algolia-search-panel.active').style.marginTop = '6rem';

                    }
                }
            }
        }
    });

    observer.observe(target, {
        attributes: true,
        attributeFilter: ['class']
    });

    customLog('[Observer started] Watching for class "active" on', target);
}

function setupSearchInputSync() {
    const ccxInput = document.querySelector('.ccx-mobile-search-input');
    const controlSearchInput = document.querySelector('.ais-SearchBox-input');
    const controlAppTrayPanel = document.querySelector('.app-tray-panels');
    const controlSearchContainer = document.querySelector('.app-tray-panels .search-panel');
    const controlMagnifyingGlass = document.querySelector('body > div.page.d-flex.flex-column > header > div.nav-container > nav.js-header-mobile.app-tray-menu.d-flex.flex-row.flex-lg-column.justify-content-between.justify-content-lg-center.align-items-center > div > ul > li.search.d-flex.justify-content-center.align-items-center');
    const body = document.querySelector('body');

    // Validate inputs
    if (!ccxInput) {
        console.warn('[setupSearchInputSync] .ccx-mobile-search-input not found.');
        return;
    }
    if (!controlSearchInput) {
        console.warn('[setupSearchInputSync] .ais-SearchBox-input not found.');
        return;
    }
    if (!controlAppTrayPanel) {
        console.warn('[setupSearchInputSync] .app-tray-panels not found.');
    }
    if (!controlSearchContainer) {
        console.warn('[setupSearchInputSync] .app-tray-panels .search-panel not found. Check if .app-tray-panels exists:', !!document.querySelector('.app-tray-panels'));
    }
    if (!controlMagnifyingGlass) {
        console.warn('[setupSearchInputSync] Magnifying glass not found at selector: body > div.page.d-flex.flex-column > header > div.nav-container > nav.js-header-mobile.app-tray-menu.d-flex.flex-row.flex-lg-column.justify-content-between.justify-content-lg-center.align-items-center > div > ul > li.search.d-flex.justify-content-center.align-items-center');
    }
    if (!body) {
        console.warn('[setupSearchInputSync] body element not found.');
    }

    // Make new input visible immediately
    ccxInput.style.display = 'block';

    // Check for algq parameter on page load and populate custom input
    const urlParams = new URLSearchParams(window.location.search);
    const algqValue = urlParams.get('algq');
    if (algqValue) {
        ccxInput.value = algqValue;
        controlSearchInput.value = algqValue; // Ensure control input is also populated
        const inputEvent = new Event('input', { bubbles: true });
        controlSearchInput.dispatchEvent(inputEvent);
        console.log('[setupSearchInputSync] Populated custom input with algq value:', algqValue);
    }

    // Add active classes on focusin with safeguard to prevent multiple triggers
    let isProcessing = false;
    ccxInput.addEventListener('focusin', (e) => {
        if (isProcessing) return; // Prevent multiple triggers
        isProcessing = true;
        e.stopPropagation(); // Prevent bubbling to parent elements
        console.log('[setupSearchInputSync] focusin event triggered on .ccx-mobile-search-input');
        if (controlMagnifyingGlass && controlSearchContainer && !controlSearchContainer.classList.contains('active')) {
            controlMagnifyingGlass.click();
            console.log('[setupSearchInputSync] Programmatically clicked magnifying glass');
        } else if (controlSearchContainer && controlSearchContainer.classList.contains('active')) {
            console.log('[setupSearchInputSync] Skipped magnifying glass click: .app-tray-panels .search-panel already has active class');
        }
        // Refocus ccxInput after 100ms to allow website UI updates (adjust if delay is noticeable)
        setTimeout(() => { ccxInput.focus(); }, 100);
        // Reset isProcessing after 150ms to allow subsequent focuses (adjust if duplicates occur)
        setTimeout(() => { isProcessing = false; }, 150);
    });

    // Sync new input value to original input on input event
    ccxInput.addEventListener('input', () => {
        controlSearchInput.value = ccxInput.value;
        const inputEvent = new Event('input', { bubbles: true });
        controlSearchInput.dispatchEvent(inputEvent);
        console.log('[setupSearchInputSync] Synced value to original input:', ccxInput.value);
    });
}

function bindSearchComponentEvents(input, clearBtn) {
    // Validate inputs
    if (!input || !clearBtn) {
        console.warn('[bindSearchComponentEvents] Input or clear button not provided.');
        return;
    }

    // Show or hide clear button based on input content
    input.addEventListener('input', () => {
        if (input.value.length > 0) {
            clearBtn.style.display = 'block';
        } else {
            clearBtn.style.display = 'none';
        }
    });

    // Clear input, hide button, refocus, and trigger control clear button
    clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.style.display = 'none';
        // Sync cleared value to original input
        const controlSearchInput = document.querySelector('.ais-SearchBox-input');
        if (controlSearchInput) {
            controlSearchInput.value = '';
            const inputEvent = new Event('input', { bubbles: true });
            controlSearchInput.dispatchEvent(inputEvent);
            customLog('[bindSearchComponentEvents] Cleared original input .ais-SearchBox-input');
        } else {
            console.warn('[bindSearchComponentEvents] .ais-SearchBox-input not found for syncing cleared value');
        }
        // Click the control clear button
        const controlClearBtn = document.querySelector('.ais-SearchBox-reset');
        if (controlClearBtn) {
            controlClearBtn.click();
            customLog('[bindSearchComponentEvents] Clicked control clear button .ais-SearchBox-reset');
        } else {
            console.warn('[bindSearchComponentEvents] .ais-SearchBox-reset not found');
        }
        input.focus();
    });
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

    // Bind event listeners
    bindSearchComponentEvents(input, clearBtn);

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

                setupSearchInputSync();

                // Add responsive behavior
                // setupSearchPanelVisibility();

                // This listens to the mobile filter, and adjusts the desktop header visibility
                // observeModalAdjust();

                // observeSearchPanelActive();
            }
        );

    } catch (error) {
        console.warn(error.message);
    }
}

init();
