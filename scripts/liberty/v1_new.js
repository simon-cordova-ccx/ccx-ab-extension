/*
HTML element has class mobile when screen size is less than 992px

HTML element has class desktop when screen size is greater than or equal to 991px

When a navigation item is clicked, except for the menu item, the element with class "app-tray-panels" and "modal-background" get an "active" class 

When the mobile menu icon is clicked, the html element gets a class of "menu-open" and the body an inline style of "overflow: hidden;"
    - Depending on the clicked item, the element with class .mini-cart. .search-panel, .account-panel, .wishlist-panel also gets an "active" class
    - All of this

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
    gap: 10px;
    width: 100%;
    height: 60px;
    background: #FFFFFF;
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

.ccx-mobile-search-close-icon:hover {
    cursor: pointer;
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

function waitForElements(elementSelector) {
    customLog('[waitForElements] Starting to wait for elements...');
    if (!elementSelector) {
        customLog('[waitForElements] No element selector provided.');
        return;
    }

    if (!window.DYO || !DYO.waitForElementAsync) {
        console.warn('[waitForElements] DYO.waitForElementAsync is not available.');
        return;
    }

    Promise.all([
        DYO.waitForElementAsync(elementSelector, 1, 100, 150)
    ])
        .then(function (results) {
            addStyles(styles);
            appendSearchComponent();
        })
        .catch(function (error) {
            console.warn('[waitForElements] Selector not found within timeout.');
        });
}

function createSearchComponent() {
    console.log('Creating search component...');
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
    input.placeholder = "Find what you’re looking for…";

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
        console.error('Failed to create some search component elements.');
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
        console.error('Search component creation failed. Nothing appended.');
        return;
    }

    logoHome.insertAdjacentElement('afterend', searchComponent);
    console.log('Search component appended successfully.');
}

function setupSearchCloseBehavior(searchContainer) {
    if (!searchContainer) {
        console.error('No search container provided.');
        return;
    }

    const ccxMobileCloseIcon = searchContainer.querySelector('.ccx-mobile-search-close-icon');
    const ccxMobileSearchInput = searchContainer.querySelector('.ccx-mobile-search-input');

    if (!ccxMobileCloseIcon || !ccxMobileSearchInput) {
        console.error('Required elements not found in search container.');
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


function init() {
    try {
        customLog(TEST_NAME + ' | ' + VARIATION);
        customLog('[init] Current URL: ' + CURRENT_URL);

        document.body.classList.add('ccx-liberty-l01-v1');
        customLog('[init] Added class ccx-liberty-l01-v1 to body');

        waitForElements('#footercontent');

    } catch (error) {
        console.error(error.message);
    }
}

init();
