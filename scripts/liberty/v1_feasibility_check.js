const algoliaParamName = 'algq';

function removeQueryParam(paramName) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  params.delete(paramName);

  window.history.pushState({}, '', url.origin + url.pathname + '?' + params.toString());
}

removeQueryParam(algoliaParamName);

// DOM elements
const controlNavMainMenu = document.querySelector('nav[aria-label="main-menu"] > .main-menu');
const controlTextInput = document.querySelector('#algolia-searchbox-placeholder > input');
const controlStickyContainer = document.querySelector('.search-sticky-header-wrapper');
const shopifyCategories = document.querySelector('[aria-label="Shop categories"]');
const controlAlgoliaSearchPanel = document.querySelector('#algolia-search-header-wrapper');

// Hide elements
if (shopifyCategories) shopifyCategories.style.display = 'none';
if (controlAlgoliaSearchPanel) controlAlgoliaSearchPanel.style.display = 'none';

// Clear search input
if (controlTextInput) controlTextInput.value = '';

// Create custom search input
if (controlNavMainMenu) {
  const currentStyle = controlNavMainMenu.getAttribute('style');
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter text...';
  input.classList.add('ccx-input');

  controlNavMainMenu.setAttribute('style', currentStyle + '; display: none;');
  controlNavMainMenu.parentNode.insertBefore(input, controlNavMainMenu);

  input.addEventListener('input', () => {
    const controlTextInput = document.querySelector('#algolia-searchbox-placeholder > div > form > input');

    // Toggle panels
    const controlAppTrayPanel = document.querySelector('.app-tray-panels');
    if (controlAppTrayPanel) controlAppTrayPanel.classList.add('active');

    const controlAlgoliaSearchPanel = document.querySelector('.search-panel.panel.algolia-search-panel');
    if (controlAlgoliaSearchPanel) controlAlgoliaSearchPanel.classList.add('active');

    // Update search input
    if (controlTextInput) {
      controlTextInput.value = input.value;
      const event = new Event('input', { bubbles: true });
      controlTextInput.dispatchEvent(event);
    } else {
      console.error('controlTextInput element not found');
    }
  });
}