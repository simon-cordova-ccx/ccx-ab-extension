const LOG_ENABLED = true;

const styles = `
.menu-open .nav-container.active .search-link {
    display: none !important;
}

.app-tray-panels .panel.active {
    margin-top: 15rem;
}

html.mobile div.minicart {
    padding-top: 15rem !important
}

html.mobile .app-tray-panels.active .panel-title {
    // display: none !important
}

@media screen and (min-width: 820px) and (max-width: 1180px) and (orientation: portrait) {
    .L01-persistent-search-variation-1 .filters-mobile {
        padding-top: 0rem !important
    }

    .L01-persistent-search-variation-1 #algolia-search-header-wrapper+.row {
        padding-top: 4rem !important
    }
}

@media screen and (min-width: 666px) and (max-height: 450px) and (orientation: landscape) {
    .L01-persistent-search-variation-1 .panel-body {
        padding-top: 5rem !important
    }
}

@media screen and (min-width: 992px) {
    .menu-open .app-tray-panels .panel.active {
      margin-top: 6.75rem;
    }

    .menu-open .account-panel.panel.active {
      margin-top: 6.75rem;
    }

    .app-tray-panels .panel.active {
        margin-top: 6rem;
    }

    .active .app-tray-panels .panel.algolia-search-panel.active {
      margin-top: 6.75rem;
    }

    .L01-persistent-search-variation-1 .ccx-search-wrapper {
      width: 550px;
    }

    .L01-persistent-search-variation-1 .navbar-nav .level-1>.slideout-menu {
        top: 16.75rem !important;
    }
}

.L01-persistent-search-variation-1 .app-tray-buttons .search {
  width: 0;
  height: 0;
  visibility: hidden;
}

.L01-persistent-search-variation-1 #algolia-search-header-wrapper {
    display: none !important
}

.L01-persistent-search-variation-1 .ccx-search-wrapper {
    position: absolute;
    left: 50%;
    top: 38px;
    transform: translateX(-50%) translateZ(0);
    z-index: 1500
}

.L01-persistent-search-variation-1 .ccx-search-bar {
    // width: 600px;
    height: 40px;
    background: white;
    border: 1px solid #E9E9E9;
    border-radius: 25px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    position: relative
}

.L01-persistent-search-variation-1 .ccx-search-icon {
    margin-right: 15px;
    flex-shrink: 0
}

.L01-persistent-search-variation-1 .ccx-search-icon svg {
    width: 20px !important;
    height: 20px !important
}

.L01-persistent-search-variation-1 .ccx-search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    color: #333;
    background: transparent
}

.L01-persistent-search-variation-1 .ccx-search-input::placeholder {
    color: #757575;
    opacity: 1;
    /* ensures full opacity in Firefox */
}

/* Vendor prefixes for broader support */
.L01-persistent-search-variation-1 .ccx-search-input::-webkit-input-placeholder {
    /* Chrome, Safari, Opera */
    color: #757575
}

input:-moz-placeholder {
    /* Firefox 4 - 18 */
    color: #757575 opacity: 1;
}

.L01-persistent-search-variation-1 .ccx-search-input::-moz-placeholder {
    /* Firefox 19+ */
    color: #757575 opacity: 1;
}

input:-ms-input-placeholder {
    /* IE 10-11 */
    color: #757575
}

.L01-persistent-search-variation-1 .ccx-search-input::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #757575
}

.L01-persistent-search-variation-1 .ccx-clear-button,
.L01-persistent-search-variation-1 .ccx-close-button {
    display: none
}

.L01-persistent-search-variation-1 .ccx-clear-button.ccx-visible,
.L01-persistent-search-variation-1 .ccx-close-button.ccx-visible {
    display: block
}

.L01-persistent-search-variation-1 .ccx-clear-button {
    cursor: pointer;
    color: #666;
    font-size: 14px;
    margin-left: 10px;
    white-space: nowrap
}

.L01-persistent-search-variation-1 .ccx-close-button {
    cursor: pointer;
    flex-shrink: 0;
    position: absolute;
    right: -50px
}

.L01-persistent-search-variation-1 .ccx-search-bar:hover,
.L01-persistent-search-variation-1 .ccx-search-bar.ccx-hovered {
    border-color: #d0d0d0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)
}

.L01-persistent-search-variation-1 .ccx-search-bar:focus-within,
.L01-persistent-search-variation-1 .ccx-search-bar.ccx-focused {
    border-color: #4F0341 !important;
    box-shadow: 0 4px 12px rgba(79, 3, 65, 0.2) !important
}

.L01-persistent-search-variation-1 .navbar-nav.main-menu-swiper,
.L01-persistent-search-variation-1 .prev-arrow,
.L01-persistent-search-variation-1 .next-arrow {
    margin-top: 6.89rem
}

.L01-persistent-search-variation-1 .algolia-sorting-actions {
    padding-top: 7rem !important
}

.L01-persistent-search-variation-1.modal-open .ccx-search-wrapper {
    display: none !important
}

@media screen and (min-width: 1441px) {
    .L01-persistent-search-variation-1 .ccx-search-wrapper {
        padding-top: 10px !important
    }
}

@media screen and (min-width: 1281px) {
    .L01-persistent-search-variation-1 .close-icon.icon {
        display: inline;
    }
}

@media screen and (min-width: 993px) {
    .L01-persistent-search-variation-1 .app-tray-buttons-container {
        margin-top: -6rem !important
    }

    .L01-persistent-search-variation-1 .close-icon.icon {
        display: inline;
    }

    .L01-persistent-search-variation-1 .algolia-noresult-wrapper {
        margin-top: 0px !important
    }
}

@media (min-width: 480px) {
  .active .app-tray-panels .panel.active {
    //   margin-top: 14.5rem;
    }

    .menu-open .account-panel.panel.active {
      margin-top: 6.75rem;
    }

  .app-tray-panels .panel.active {
    margin-top: 9.75rem;
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {

    .active .app-tray-panels .panel.active {
        margin-top: 9.75rem;
    }

    .app-tray-panels .panel.active {
        margin-top: 10rem;
    }


    .L01-persistent-search-variation-1 .ccx-search-wrapper {
        top: 43px !important;
        transform: none !important;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        background: transparent !important;
        left: 130px;
        right: 190px;
    }

    .L01-persistent-search-variation-1 .ccx-search-bar {
        max-width: 440px;
        min-width: 350px;
    }

    .L01-persistent-search-variation-1 .app-tray-panels.active {
        z-index: 13 !important;
    }

    .L01-persistent-search-variation-1 .algolia-refinement-bar.d-flex {
        padding-top: 9rem !important;
        padding-bottom: 0rem !important
    }

    .L01-persistent-search-variation-1 #algolia-current-refinements-filter {
        display: none !important
    }

    .L01-persistent-search-variation-1 .algolia-sorting-actions {
        padding-top: 5rem !important
    }
}

@media screen and (min-width: 481px) and (max-width: 767px) {
    .L01-persistent-search-variation-1 .ccx-search-wrapper {
        top: 91px !important;
        left: 0 !important;
        transform: none !important;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 8px;
        background-color: white !important
    }

    .L01-persistent-search-variation-1 .ccx-search-bar {
        width: 100%;
        height: 40px
    }

    .L01-persistent-search-variation-1 .ccx-search-input {
        font-size: 14px
    }

    .L01-persistent-search-variation-1 .ccx-close-button {
        right: -50px
    }

    .L01-persistent-search-variation-1 .app-tray-panels.active {
        z-index: 13 !important
    }

    .L01-persistent-search-variation-1 .algolia-sorting-actions {
        padding-top: 5rem !important
    }
}

@media screen and (max-width: 480px) {
    .L01-persistent-search-variation-1 .ccx-search-wrapper {
        top: 96px !important;
        left: 0 !important;
        transform: none !important;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 8px;
        background-color: white !important
    }

    .L01-persistent-search-variation-1 .ccx-search-bar {
        width: 100%;
        height: 40px;
        padding: 0 15px;
        transition: width 0.3s ease
    }

    .L01-persistent-search-variation-1 .ccx-search-bar.ccx-focused {
        width: 281px
    }

    .L01-persistent-search-variation-1 .ccx-search-input {
        font-size: 13px
    }

    .L01-persistent-search-variation-1 .ccx-close-button {
        right: -40px
    }

    .L01-persistent-search-variation-1 .ccx-close-button svg {
        width: 35px;
        height: 35px
    }

    .L01-persistent-search-variation-1 .app-tray-panels.active {
        z-index: 13 !important
    }

    .L01-persistent-search-variation-1 .algolia-noresult-wrapper {
        margin-top: 5rem !important
    }

    .L01-persistent-search-variation-1 .algolia-refinement-bar.d-flex {
        padding-top: 12.5rem !important;
        padding-bottom: 0rem !important
    }
}

@media screen and (max-width: 480px) and (hover: none) and (pointer: coarse) {
    .L01-persistent-search-variation-1 .ccx-search-bar.ccx-hovered {
        width: 85%
    }
}

.L01-persistent-search-variation-1 .app-tray-buttons .search .custom-search-input {
    position: absolute;
    top: -40px;
    left: 50px;
    width: calc(100% - 70px);
    height: 40px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: #333;
    z-index: 15;
    padding: 0;
    margin: 0
}

.L01-persistent-search-variation-1 .app-tray-buttons .search::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cpath d='m21 21-4.35-4.35'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 16px 16px
}

.L01-persistent-search-variation-1 .app-tray-buttons .search:focus-within::after,
.L01-persistent-search-variation-1 .app-tray-buttons .search.has-input::after {
    display: none
}

.L01-persistent-search-variation-1 .app-tray-buttons .search.search-focused::before {
    border-color: #4F0341 !important;
    box-shadow: 0 4px 12px rgba(79, 3, 65, 0.2) !important
}

@media (max-width: 768px) {
    .L01-persistent-search-variation-1 .app-tray-buttons .search .custom-search-input {
        left: 40px;
        width: calc(100% - 60px);
        height: 36px;
        top: -36px !important;
        font-size: 14px
    }

    .L01-persistent-search-variation-1 #maincontent {
        margin-top: 5rem !important
    }
}

@media (max-width: 480px) {
    .L01-persistent-search-variation-1 .app-tray-buttons .search .custom-search-input {
        left: 35px;
        width: calc(100% - 50px);
        height: 34px;
        top: -34px;
        font-size: 13px
    }
}

@media screen and (min-width: 992px) and (max-width: 1280px) {
    .L01-persistent-search-variation-1 .ccx-search-wrapper {
      // width: 100%;
    }
    .L01-persistent-search-variation-1 .ccx-search-wrapper input {
      width: 550px;
    }
    html.mobile .algolia-search-panel.active:has(.ais-SearchBox-input:not(:placeholder-shown)) .search-sticky-header-wrapper {
        padding-top: 15rem !important
    }
}

@media screen and (max-width: 1280px) {
    #search-sticky-header-wrapper {
        position: relative !important;
        padding-top: 150px !important
    }
}

@media screen and (max-width: 992px) {
    .menu-open .app-tray-panels .panel.active {
      margin-top: 0;
    }

    .menu-open .account-panel.panel.active {
        margin-top: 0;
    }
    .menu-open .ccx-search-wrapper {
        display: none !important
    }

    .ais-InstantSearch.active {
        margin-top: 6rem !important;
    }

    #search-sticky-header-wrapper {
        position: relative !important;
        padding-top: 150px !important
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
  if (document.querySelector('.ccx-styles-L01')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  // Create a new <style> element
  const style = document.createElement('style');
  style.classList.add('ccx-styles-L01');
  style.appendChild(document.createTextNode(css));

  // Append the style tag to the document head
  document.head.appendChild(style);
  customLog('Custom styles added.');
};

addStyles(styles);

setTimeout(()=>{
!function(){"use strict";function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(e,t)||n(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||n(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){var n;if(e)return"string"==typeof e?r(e,t):"Map"===(n="Object"===(n=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function t(n,r,e){function i(e,t){o.set(e,[].concat(l(null!=(e=o.get(e))?e:[]),l(t))),o.size===n.length&&(e=Array.from(o.entries()).sort(function(e,t){return a(e,1)[0]-a(t,1)[0]}).map(function(e){return a(e,2)[1]}),r(e),o.clear())}var u=2<arguments.length&&void 0!==e&&e,o=new Map,c=[];n.forEach(function(e,t){c.push(function(a,t){var n,e=document.querySelectorAll(a);if(e.length&&i(t,Array.from(e)),!e.length||u)return(n=new MutationObserver(function(e){var o=!1,c=[];e.forEach(function(e){for(var t=0,n=Array.from(e.addedNodes);t<n.length;t++){var r=n[t];r.matches&&r.matches(a)&&(c.push(r),o=!u),null!==r&&void 0!==r.querySelectorAll&&r.querySelectorAll(a).length&&(c=[].concat(l(c),l(Array.from(r.querySelectorAll(a)))),o=!u)}}),c.length&&(i(t,c),o)&&n.disconnect()})).observe(document.documentElement,{childList:!0,subtree:!0}),n}(e,t))})}var c="L01-persistent-search",i=1;function o(e,o,c){var a="string"==typeof e?new Function("return "+e):e;return new Promise(function(t,n){var r=0;(function e(){try{a()?t(a()):(c||200)<r?n():(r++,setTimeout(e,o||50))}catch(e){console.warn(e)}})()})}function u(e,t,n){return n?t?t(e):e:(e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e)}function e(n){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];try{return Promise.resolve(n.apply(this,e))}catch(e){return Promise.reject(e)}}}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(e,t)||function(e,t){var n;if(e)return"string"==typeof e?f(e,t):"Map"===(n="Object"===(n=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}e(function(e,t,n){var r;if(null!=(r=window)&&null!=(r=r.adobe)&&null!=(r=r.target)&&r.trackEvent)return window.adobe.target.trackEvent({params:{action:e,label:t,category:n},mbox:e}),u()}),e(function(t,n){return u(o("window.s"),function(){var e=window.s;e.events=t,e.linkTrackVars="events",e.linkTrackEvents=t,e.tl(!0,"o",n)})});var v=e(function(e){return u(o("window.DY"),function(){window.DY.API("event",e)})});e(function(e){return u(o("window.dataLayer"),function(){window.dataLayer.push(e)})}),e(function(e,t){return u(o("window.utag"),function(){window.trackingLockUtag||(window.trackingLockUtag=!0,"object"===s(window.utag)&&"function"==typeof window.utag.link&&(window.utag.link({monetate_event:"monetate-campaign-event",event_action:t,event_value:e,event_name:"experiment_assignement"}),setTimeout(function(){window.trackingLockUtag=!1},200)))})}),e(function(t,n,r){return u(o("window.dataLayer"),function(){var e;window.dataLayer=window.dataLayer||[],window.dataLayer&&(console.table("metric: ".concat(n)),e={hitType:"event",eventCategory:r,eventAction:t,eventLabel:n,nonInteraction:!0},console.log(":: Metric sent::",e),window.dataLayer.push(e))})}),e(function(t,n,r){return u(o("window.ga"),function(){var e=d("function"==typeof window.ga.getAll&&window.ga.getAll()||[],1)[0];e&&e.send({hitType:"event",eventCategory:r,eventAction:t,eventLabel:n,nonInteraction:!0})})});window.trackingLockUtag=window.trackingLockUtag||!1;var y=function(e){var t=new URL(window.location);e&&0<e.length?(t.searchParams.set("algq",e),e=t.toString().replace(/\+/g,"%20"),window.history.replaceState({},"",e)):(t.searchParams.delete("algq"),window.history.replaceState({},"",t))},m=function(){return new URLSearchParams(window.location.search).get("algq")||""},h=function(e,t,n){e.classList.toggle("ccx-visible",n),t&&t.classList.toggle("ccx-visible",n)},w=function(e,t,n){e.value="",t.value="",n.classList.remove("ccx-visible"),document.querySelector(".algolia-clear-button").click(),document.querySelector(".dot.js-clear-all").click()},p=function(e,t){e.value=t,y(t);t=new Event("input",{bubbles:!0});e.dispatchEvent(t)},g=function(e){document.querySelector(".app-tray-buttons .search")&&(document.querySelector(".app-tray-buttons .search").click(),setTimeout(function(){e&&document.contains(e)&&e.focus()},100))},b=function(e){var t=document.querySelector(".algolia-search-panel.active"),n=document.querySelector(".app-tray-buttons .search");(e&&!t&&n||!e&&t&&n)&&n.click()},S=function(){return'\n  <div class="ccx-search-wrapper">\n    <div class="ccx-search-bar">\n      <div class="ccx-search-icon">\n        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n          <path d="M14.796 13.7248C16.1726 12.0681 16.857 9.94403 16.7064 7.79521C16.5559 5.6464 15.582 3.63852 13.9878 2.18992C12.3935 0.741318 10.3019 -0.0363041 8.14849 0.0190624C5.99512 0.074429 3.9461 0.958521 2.42841 2.48714C0.910708 4.01575 0.0413676 6.071 0.00143861 8.22472C-0.0384904 10.3784 0.754084 12.4645 2.21408 14.0483C3.67407 15.6321 5.6889 16.5916 7.83874 16.7267C9.98858 16.8619 12.1077 16.1623 13.7545 14.7738L18.9494 19.9837L20 18.9256L14.796 13.7248ZM8.37227 15.2567C7.01074 15.2581 5.67938 14.8558 4.54658 14.1004C3.41379 13.3451 2.5305 12.2707 2.00844 11.0132C1.48638 9.75577 1.34901 8.37171 1.61373 7.03616C1.87844 5.70061 2.5333 4.47359 3.49552 3.51031C4.45775 2.54704 5.68407 1.89081 7.01933 1.62464C8.35459 1.35848 9.73882 1.49433 10.9969 2.01502C12.2549 2.53572 13.3302 3.41785 14.0868 4.54982C14.8434 5.68178 15.2472 7.01272 15.2472 8.37425C15.2478 10.1983 14.5241 11.948 13.235 13.2386C11.946 14.5292 10.1964 15.2551 8.37227 15.2567Z" fill="black"/>\n        </svg>\n      </div>                \n      <input type="text" class="ccx-search-input" placeholder="Find what you\'re looking for..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />        \n      <div class="ccx-clear-button">Clear</div>        \n      <div class="ccx-close-button">\n        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n          <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" fill="#F9F9F9" stroke="#E9E9E9"/>\n          <path d="M15 25L25 15" stroke="black" stroke-width="1.5" stroke-miterlimit="10"/>\n          <path d="M15.025 15.025L24.971 24.971" stroke="black" stroke-width="1.5" stroke-miterlimit="10"/>\n        </svg>\n      </div>\n    </div>\n  </div>\n'};function L(){function e(){o||(!function(){if(document.querySelector(".ccx-search-wrapper"))return;var e=document.querySelector(".nav-container")||document.querySelector(".global-navigation"),r=document.querySelector(".ais-SearchBox-input"),t=document.querySelector(".ais-SearchBox-form");if(!e||!r)return console.warn("Navigation container or Algolia search not found");e.insertAdjacentHTML("beforeend",S());var o,n=document.querySelector(".ccx-search-bar"),c=document.querySelector(".ccx-search-input"),a=document.querySelector(".ccx-clear-button"),i=document.querySelector(".ccx-close-button"),e=m(),u=!1,l=(e&&(c.value=e,0<(r.value=e).length&&h(a,i,!0),3<=e.length)&&(u=!0),0);c.addEventListener("input",function(e){var t=e.target.value,n=(0<t.length&&0,h(a,null,0<t.length),y(t),clearTimeout(o),++l),e=/\s{2,}/.test(t);o=setTimeout(function(){var e;n===l&&(r.value=t,e=new Event("input",{bubbles:!0}),r.dispatchEvent(e),0===t.length)&&setTimeout(function(){var e=document.querySelector(".algolia-clear-button");e&&e.click()},100)},e?1e3:400),0===t.length&&(u=!1),3<=t.length&&!u&&(v({name:"algolia-search-engagement"}),u=!0)}),c.addEventListener("keypress",function(e){"Enter"===e.key&&(e.preventDefault(),y(e.target.value),t)&&t.dispatchEvent(new Event("submit",{bubbles:!0}))}),c.addEventListener("focus",function(){n.classList.add("ccx-focused"),i.classList.add("ccx-visible"),document.querySelector(".algolia-search-panel.active")||(g(c),setTimeout(function(){b(!0)},200))}),c.addEventListener("blur",function(){n.classList.remove("ccx-focused")}),n.addEventListener("mouseenter",function(){document.activeElement!==c&&n.classList.add("ccx-hovered")}),n.addEventListener("mouseleave",function(){n.classList.remove("ccx-hovered")}),i.addEventListener("click",function(){w(c,r,a),i.classList.remove("ccx-visible"),p(r,""),document.querySelector(".dot.js-clear-all").click();try{b(!1)}catch(e){var t=document.querySelector(".app-tray-buttons .search");t&&t.click()}}),a.addEventListener("click",function(){w(c,r,a),c.focus(),p(r,"")})}(),o=!0)}var t,n=c,r=i,n="".concat(n,"-variation-").concat(r),o=!1;document.body.classList.add(t||n),e()}function k(e,t){setTimeout(function(){e()},t||2e3)}function x(e){t([".menu-group,.app-tray-buttons"],e)}var E,q,A,C,T,P,j=null,I=function(){j&&clearTimeout(j),j=setTimeout(function(){k(function(){var e=document.querySelector(".ccx-search-wrapper"),t=document.querySelector(".nav-container")||document.querySelector(".global-navigation"),n=document.querySelector(".ais-SearchBox-input");!e&&t&&n&&x(L)},50)},400)};[].includes&&"function"==typeof Promise&&Array.from&&(E=function(){var e,t=new URL(window.location.href);t.searchParams.has("algq")?(e=document.querySelector(".ccx-search-input"),t=t.searchParams.get("algq")||"",e&&e.value!==t&&(e.value=t)):k(function(){x(L)},50)},q=!0,T=history.pushState,P=history.replaceState,history.pushState=function(){T.apply(history,arguments),E("PUSH")},A&&(history.replaceState=function(){P.apply(history,arguments),E("REPLACE")}),window.onpopstate=function(){E("POP")},C&&window.addEventListener("popstate",function(){E("POP")}),q&&E("INITIAL"),window.addEventListener("orientationchange",I),window.addEventListener("resize",I),document.addEventListener("visibilitychange",function(){document.hidden||setTimeout(I,100)}),k(function(){x(L)},100))}();    
    
    
},250)


function updateSearchBarWidth(closeButton) {
  if (window.innerWidth >= 768) {
    // Reset width if screen is wider
    const searchBar = closeButton.closest('.ccx-search-bar');
    if (!searchBar) return;
    searchBar.style.width = '';
    return;
  }

  const searchBar = closeButton.closest('.ccx-search-bar');
  if (!searchBar) {
    console.log('No .ccx-search-bar parent found for close button:', closeButton);
    return;
  }

  const isHidden = window.getComputedStyle(closeButton).display === 'none';

  if (isHidden) {
    // console.log('Close button is hidden — setting .ccx-search-bar width to 100%', searchBar);
    searchBar.style.width = '100%';
  } else {
    // console.log('Close button is visible — setting .ccx-search-bar width to 90%', searchBar);
    searchBar.style.width = '90%';
  }
}

const observer = new MutationObserver(mutations => {
  const closeButtons = document.querySelectorAll('.ccx-close-button');
  closeButtons.forEach(closeButton => {
    updateSearchBarWidth(closeButton);
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Initial check on page load and window resize
console.log('Initial check for .ccx-close-button elements');
document.querySelectorAll('.ccx-close-button').forEach(updateSearchBarWidth);

window.addEventListener('resize', () => {
  document.querySelectorAll('.ccx-close-button').forEach(updateSearchBarWidth);
});
