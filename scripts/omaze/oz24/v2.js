console.log('OMAZE OZ24 - V2');
!function(){"use strict";function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,i,c=[],s=!0,l=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;s=!1}else for(;!(s=(n=a.call(r)).done)&&(c.push(n.value),c.length!==t);s=!0);}catch(e){l=!0,o=e}finally{try{if(!s&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(e,t)||r(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||r(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){var r;if(e)return"string"==typeof e?n(e,t):"Map"===(r="Object"===(r=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function e(r,n,e){function c(e,t){o.set(e,[].concat(l(null!=(e=o.get(e))?e:[]),l(t))),o.size===r.length&&(e=Array.from(o.entries()).sort(function(e,t){return i(e,1)[0]-i(t,1)[0]}).map(function(e){return i(e,2)[1]}),n(e),o.clear())}var s=2<arguments.length&&void 0!==e&&e,o=new Map,a=[];r.forEach(function(e,t){a.push(function(i,t){var r,e=document.querySelectorAll(i);if(e.length&&c(t,Array.from(e)),!e.length||s)return(r=new MutationObserver(function(e){var o=!1,a=[];e.forEach(function(e){for(var t=0,r=Array.from(e.addedNodes);t<r.length;t++){var n=r[t];n.matches&&n.matches(i)&&(a.push(n),o=!s),null!==n&&void 0!==n.querySelectorAll&&n.querySelectorAll(i).length&&(a=[].concat(l(a),l(Array.from(n.querySelectorAll(i)))),o=!s)}}),a.length&&(c(t,a),o)&&r.disconnect()})).observe(document.documentElement,{childList:!0,subtree:!0}),r}(e,t))})}var o="OZ24-entries-page",a=2;[].includes&&"function"==typeof Promise&&Array.from&&e([".subscription-cards-container"],function(){function e(){var e;e=function(){document.querySelectorAll('[data-test="card-variant-subscription"]').forEach(function(e,t){e.classList.add("card-redesign");var r,n,o,a=e.querySelector(".bg-\\[\\#13323f\\]"),i=(a&&(a.classList.add("header-redesign"),(o=a.querySelector(".leading-none.text-white"))&&(o.classList.remove("[text-shadow:none]"),o.classList.add("[text-shadow:_0_4px_4px_rgb(0_0_0_/_50%)]")),(o=a.querySelector(".flex.justify-center"))&&(o.classList.add("badge-container-redesign"),o=o.querySelector(".bg-\\[\\#0193A7\\]"))&&o.classList.add("badge-redesign",["badge-gray","badge-teal","badge-dark"][t]),(o=a.querySelector(".text-white"))&&o.classList.add("header-content-redesign"),(o=a.querySelector('[data-test="entry_count"]'))&&(o.classList.add("entry-count-redesign"),o.classList.remove("drop-shadow-[0px_4px_4px_rgba(0,0,0,0.50)]")),(c=a.querySelector(".line-through"))&&(c.classList.add("strike-price-redesign"),i=o?o.parentElement:null)&&o&&o.nextSibling&&i.insertBefore(c,o.nextSibling),(i=a.querySelector('[data-test="price"]'))&&(i.classList.add("main-price-redesign"),c=i.parentElement)&&(c.classList.add("price-container-redesign"),o=c.querySelector(".text-white"))&&(o.classList.add("month-text-redesign"),o.classList.remove("drop-shadow-[0px_4px_4px_rgba(0,0,0,0.50)]")),a.querySelector(".bg-\\[\\#F00\\]")),e.querySelector(".p-4.text-left")),c=(i&&(r=function(e){var t=e.querySelector('div[class*="text-[#0193A7]"]')||e.querySelector('div[class*="font-bold"]');t||e.querySelectorAll("div").forEach(function(e){"BONUS DRAW:"===e.textContent.trim()&&(t=e)}),t&&t.textContent.includes("BONUS DRAW:")&&(t.textContent="BRAND NEW DRAW:")},i.classList.add("body-redesign"),i.querySelectorAll(".flex").forEach(function(e,t){var r;!e.querySelector(".border")&&(e.classList.add("feature-item-redesign"),e=e.querySelector("img.tick-image"))&&((r=document.createElement("div")).className="feature-icon-redesign ".concat(["checkmark-icon","entries-icon","price-icon"][t]||"checkmark-icon"),e.parentNode.replaceChild(r,e))}),(n=i.querySelectorAll(".border.border-red-500\\/20, .border.border-\\[\\#0193A7\\]\\/50")).forEach(function(e,t){e.classList.add("bonus-box-redesign"),1===n.length?(e.classList.add("bonus-box-money"),r(e)):0===t?e.classList.add("bonus-box-gift"):1===t&&(e.classList.add("bonus-box-money"),r(e))})),e.querySelector("a.block"));c&&(o=c.querySelector(".add-to-cart-button"))&&(1===t?o.classList.add("button-redesign","button-primary"):o.classList.add("button-redesign","button-secondary"))})},setTimeout(function(){e()},500||2e3)}var t,r=o,n=a,r="".concat(r,"-variation-").concat(n);document.body.classList.add(t||r),e()})}();

const STYLES = `
.OZ24-entries-page-variation-2 .subscription-cards-container {
    display: flex !important;
    align-items: flex-start !important;
    min-height: auto !important;
    overflow-x: auto !important
}

.OZ24-entries-page-variation-2 .card-redesign {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex !important;
    flex-direction: column !important;
    min-height: 100% !important;
    height: auto !important;
    height: fit-content !important;
    width: 348px !important;
    flex-shrink: 0 !important;
}

.OZ24-entries-page-variation-2 [data-test="card-variant-subscription"].card-redesign {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 0.5rem !important;
    overflow: hidden !important;
    min-height: auto !important;
    height: auto !important;
    display: flex !important;
    flex-direction: column !important;
    flex-shrink: 0 !important;
    max-width: 340px !important;
}

.OZ24-entries-page-variation-2 .card-redesign.rounded-3xl {
    border-radius: 1.5rem !important
}

.OZ24-entries-page-variation-2 .header-redesign {
    background: white !important;
    padding: 1rem !important;
    position: relative !important;
    text-align: left !important;
    text-shadow: none !important;
    flex: 0 0 auto !important;
    padding-bottom: 0px !important
}

.OZ24-entries-page-variation-2 .header-content-redesign {
    text-align: left !important;
    text-shadow: none !important;
    color: inherit !important
}

.OZ24-entries-page-variation-2 .entry-count-redesign {
    color: #1f2937 !important;
    margin-bottom: 0.5rem !important;
    display: block !important;
    text-shadow: none !important;
    text-align: left !important;
    padding-top: 1.5rem !important;
    font-weight: 700 !important;
    font-size: 32px !important;
    line-height: 100% !important;
    letter-spacing: 1.5% !important;
    font-family: 'Gellix'
}

.OZ24-entries-page-variation-2 .strike-price-redesign {
    color: #3A4957 !important;
    margin-bottom: 0.5rem !important;
    display: block !important;
    text-shadow: none !important;
    text-align: left !important;
    font-size: 22px !important
}

.OZ24-entries-page-variation-2 .main-price-redesign {
    color: #0d9488 !important;
    text-shadow: none !important;
    text-align: left !important
}

.OZ24-entries-page-variation-2 .price-container-redesign {
    justify-content: flex-start !important;
    align-items: baseline !important;
    text-align: left !important
}

.OZ24-entries-page-variation-2 .price-container-redesign~.mx-auto {
    text-align: left !important;
    margin-left: 0px !important
}

.OZ24-entries-page-variation-2 .price-container-redesign~.mx-auto .leading-none {
    overflow: unset !important
}

.OZ24-entries-page-variation-2 .month-text-redesign {
    color: #0193A7 !important;
    font-size: 4.5rem !important;
    font-weight: 700 !important;
    line-height: 100% !important;
    letter-spacing: 1.5% !important;
    text-shadow: none !important
}

.OZ24-entries-page-variation-2 .month-text-redesign+span.text-white {
    font-weight: 400 !important;
    font-size: 24px !important;
    line-height: 52px !important;
    letter-spacing: 1.5% !important;
    color: #13323F !important;
    text-shadow: none !important
}

.OZ24-entries-page-variation-2 .hide-discount-badge {
    display: none !important
}

.OZ24-entries-page-variation-2 .badge-container-redesign {
    position: absolute !important;
    top: 0 !important;
    right: 0 !important;
    z-index: 10 !important;
    display: flex !important;
    justify-content: flex-start !important;
    overflow: hidden !important;
    border-top-right-radius: 0.5rem !important
}

.OZ24-entries-page-variation-2 .badge-redesign {
    background: none !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 0 !important;
    width: 203px !important;
    height: 40px !important;
    min-width: 203px !important;
    position: relative !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: white !important;
    font-size: 0.875rem !important;
    font-weight: 600 !important;
    text-align: center !important
}

.OZ24-entries-page-variation-2 .badge-redesign.bg-\[#0193A7\],
.OZ24-entries-page-variation-2 .badge-redesign.rounded-b-2xl,
.OZ24-entries-page-variation-2 .badge-redesign.shadow-lg {
    background: none !important;
    border-radius: 0 !important;
    box-shadow: none !important
}

.OZ24-entries-page-variation-2 .badge-redesign span {
    font-size: 0 !important;
    position: relative !important;
    z-index: 2 !important
}

.OZ24-entries-page-variation-2 .badge-gray {
    background-color: #626262 !important;
    border-bottom-left-radius: 2rem !important
}

.OZ24-entries-page-variation-2 .badge-gray::after {
    content: "Bonus Draw Included" !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    color: white !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    line-height: 100% !important;
    text-align: center !important;
    text-transform: capitalize !important;
    white-space: nowrap !important;
    z-index: 3 !important
}

.OZ24-entries-page-variation-2 .badge-teal {
    background-color: #0090B1 !important;
    border-bottom-left-radius: 2rem !important
}

.OZ24-entries-page-variation-2 .badge-teal::after {
    content: "Two Bonus Draws Included" !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    color: white !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    line-height: 100% !important;
    text-align: center !important;
    text-transform: capitalize !important;
    white-space: nowrap !important;
    z-index: 3 !important
}

.OZ24-entries-page-variation-2 .badge-dark {
    background-color: #081F28 !important;
    border-bottom-left-radius: 2rem !important
}

.OZ24-entries-page-variation-2 .badge-dark::after {
    content: "Two Bonus Draws Included" !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    color: white !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    line-height: 100% !important;
    text-align: center !important;
    text-transform: capitalize !important;
    white-space: nowrap !important;
    z-index: 3 !important
}

.OZ24-entries-page-variation-2 .body-redesign {
    padding: 1rem;
    padding-top: 0px !important;
    flex: 1 1 auto !important;
    display: flex !important;
    flex-direction: column !important
}

.OZ24-entries-page-variation-2 .feature-item-redesign {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
    font-size: 0px !important
}

.OZ24-entries-page-variation-2 .feature-item-redesign.bonus-box-redesign .font-medium {
    font-size: 17px !important
}

.OZ24-entries-page-variation-2 .feature-item-redesign span {
    padding-left: 0.5rem !important;
    padding-bottom: 0 !important;
    line-height: 1.4 !important;
    font-size: 18px !important
}

.OZ24-entries-page-variation-2 .feature-icon-redesign {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: transparent !important;
    color: transparent !important
}

.OZ24-entries-page-variation-2 .feature-icon-redesign+span {
    padding-left: 0px !important;
    padding-top: 5px;
    padding-bottom: 5px !important
}

.OZ24-entries-page-variation-2 .checkmark-icon {
    background-image: url("data:image/svg+xml,%3Csvg width='27' height='26' viewBox='0 0 27 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.3333 23.8337C14.7563 23.8354 16.1655 23.556 17.4801 23.0115C18.7947 22.4669 19.9887 21.668 20.9936 20.6606C22.001 19.6557 22.7999 18.4617 23.3445 17.1471C23.889 15.8325 24.1684 14.4232 24.1667 13.0003C24.1684 11.5774 23.889 10.1682 23.3445 8.8536C22.7999 7.53901 22.001 6.34497 20.9936 5.34008C19.9887 4.33267 18.7947 3.53374 17.4801 2.9892C16.1655 2.44466 14.7563 2.16525 13.3333 2.167C11.9104 2.16525 10.5012 2.44466 9.18661 2.9892C7.87202 3.53374 6.67798 4.33267 5.67309 5.34008C4.66568 6.34497 3.86675 7.53901 3.32221 8.8536C2.77767 10.1682 2.49825 11.5774 2.50001 13.0003C2.49825 14.4232 2.77767 15.8325 3.32221 17.1471C3.86675 18.4617 4.66568 19.6557 5.67309 20.6606C6.67798 21.668 7.87202 22.4669 9.18661 23.0115C10.5012 23.556 11.9104 23.8354 13.3333 23.8337Z' stroke='black' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M9 13L12.25 16.25L18.75 9.75' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    margin-top: 8px !important
}

.OZ24-entries-page-variation-2 .entries-icon {
    background-image: url("data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1.08301' y='0.75' width='22.5' height='22.5' rx='11.25' stroke='black' stroke-width='1.5'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.29729 14.893C4.04155 14.6372 3.89787 14.2904 3.89787 13.9287C3.89787 13.567 4.04155 13.2202 4.29729 12.9644L13.2973 3.96442C13.553 3.70868 13.8999 3.565 14.2616 3.565C14.6232 3.565 14.9701 3.70868 15.2259 3.96442L16.923 5.66156C17.0959 5.83449 17.1474 6.09292 17.0548 6.31792C16.9997 6.45214 16.9855 6.59966 17.014 6.74193C17.0425 6.88419 17.1124 7.01485 17.215 7.11744C17.3176 7.22004 17.4483 7.29 17.5906 7.31852C17.7328 7.34704 17.8804 7.33284 18.0146 7.27771C18.1247 7.23197 18.2459 7.22008 18.3628 7.24356C18.4797 7.26703 18.587 7.3248 18.6709 7.40949L20.3687 9.10728C20.6245 9.36302 20.7681 9.70989 20.7681 10.0716C20.7681 10.4332 20.6245 10.7801 20.3687 11.0358L11.3687 20.0358C11.113 20.2916 10.7661 20.4353 10.4044 20.4353C10.0428 20.4353 9.69589 20.2916 9.44015 20.0358L7.74301 18.3387C7.57008 18.1658 7.51865 17.9073 7.61058 17.6817C7.66571 17.5475 7.67991 17.4 7.65139 17.2577C7.62287 17.1154 7.55291 16.9848 7.45031 16.8822C7.34772 16.7796 7.21706 16.7096 7.0748 16.6811C6.93253 16.6526 6.78501 16.6668 6.65079 16.7219C6.54082 16.7676 6.41974 16.7795 6.30297 16.7562C6.18621 16.7328 6.07903 16.6752 5.99508 16.5908L4.29729 14.893ZM4.94015 13.6073C4.8549 13.6925 4.80701 13.8081 4.80701 13.9287C4.80701 14.0493 4.8549 14.1649 4.94015 14.2501L6.50294 15.8129C7.71858 15.4754 8.85772 16.6146 8.52022 17.8302L10.083 19.393C10.1683 19.4782 10.2839 19.5261 10.4044 19.5261C10.525 19.5261 10.6406 19.4782 10.7259 19.393L19.7259 10.393C19.8111 10.3077 19.859 10.1921 19.859 10.0716C19.859 9.951 19.8111 9.83538 19.7259 9.75013L18.1631 8.18735C16.9474 8.52485 15.8083 7.38571 16.1458 6.17006L14.583 4.60728C14.4978 4.52203 14.3821 4.47414 14.2616 4.47414C14.141 4.47414 14.0254 4.52203 13.9401 4.60728L4.94015 13.6073Z' fill='black' stroke='black' stroke-width='0.4'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.0294 12.4812C16.1573 12.3533 16.3307 12.2815 16.5116 12.2815C16.6924 12.2815 16.8658 12.3533 16.9937 12.4812L17.3151 12.8026C17.443 12.9305 17.5149 13.1039 17.5149 13.2847C17.5149 13.4656 17.443 13.639 17.3151 13.7669C17.1873 13.8948 17.0138 13.9666 16.833 13.9666C16.6522 13.9666 16.4787 13.8948 16.3509 13.7669L16.0294 13.4455C15.9016 13.3176 15.8297 13.1441 15.8297 12.9633C15.8297 12.7825 15.9016 12.609 16.0294 12.4812ZM10.5652 7.01688C10.693 6.88901 10.8665 6.81717 11.0473 6.81717C11.2281 6.81717 11.4016 6.88901 11.5294 7.01688L11.8509 7.33831C11.9787 7.46618 12.0506 7.63961 12.0506 7.82045C12.0506 8.00129 11.9787 8.17472 11.8509 8.30259C11.723 8.43047 11.5496 8.5023 11.3687 8.5023C11.1879 8.5023 11.0145 8.43047 10.8866 8.30259L10.5652 7.98117C10.4373 7.85329 10.3654 7.67986 10.3654 7.49902C10.3654 7.31818 10.4373 7.14475 10.5652 7.01688ZM12.333 8.78474C12.4609 8.65687 12.6343 8.58503 12.8151 8.58503C12.996 8.58503 13.1694 8.65687 13.2973 8.78474L13.6187 9.10617C13.7466 9.23404 13.8184 9.40747 13.8184 9.58831C13.8184 9.76915 13.7466 9.94258 13.6187 10.0705C13.4908 10.1983 13.3174 10.2702 13.1366 10.2702C12.9557 10.2702 12.7823 10.1983 12.6544 10.0705L12.333 9.74902C12.2051 9.62115 12.1333 9.44772 12.1333 9.26688C12.1333 9.08604 12.2051 8.91261 12.333 8.78474ZM14.2616 10.7133C14.3894 10.5854 14.5629 10.5136 14.7437 10.5136C14.9246 10.5136 15.098 10.5854 15.2259 10.7133L15.5473 11.0347C15.6752 11.1626 15.747 11.336 15.747 11.5169C15.747 11.6977 15.6752 11.8712 15.5473 11.999C15.4194 12.1269 15.246 12.1987 15.0651 12.1987C14.8843 12.1987 14.7109 12.1269 14.583 11.999L14.2616 11.6776C14.1337 11.5497 14.0619 11.3763 14.0619 11.1955C14.0619 11.0146 14.1337 10.8412 14.2616 10.7133Z' fill='black'/%3E%3C/svg%3E") !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    margin-top: 8px !important
}

.OZ24-entries-page-variation-2 .price-icon {
    background-image: url("data:image/svg+xml,%3Csvg width='27' height='26' viewBox='0 0 27 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.3333 23.8337C19.3164 23.8337 24.1667 18.9834 24.1667 13.0003C24.1667 7.01724 19.3164 2.16699 13.3333 2.16699C7.35025 2.16699 2.5 7.01724 2.5 13.0003C2.5 18.9834 7.35025 23.8337 13.3333 23.8337Z' stroke='%23081F28' stroke-width='1.5'/%3E%3Cpath d='M12.334 14C11.667 15.667 10.667 17.333 9.33398 18H15.667C15.667 18 16.667 18 17.334 17.333M15.001 14H8.33398M16.334 11C16.334 10.4067 16.158 9.82664 15.8284 9.33329C15.4987 8.83994 15.0302 8.45543 14.482 8.22836C13.9339 8.0013 13.3307 7.94189 12.7487 8.05765C12.1668 8.1734 11.6322 8.45912 11.2127 8.87868C10.7931 9.29824 10.5074 9.83279 10.3916 10.4147C10.2759 10.9967 10.3353 11.5999 10.5623 12.1481C10.7894 12.6962 11.1739 13.1648 11.6673 13.4944C12.1606 13.8241 12.7406 14 13.334 14' stroke='%23081F28' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    margin-top: 8px !important
}

.OZ24-entries-page-variation-2 .bonus-box-redesign {
    display: flex !important;
    padding: 0.75rem !important;
    align-items: flex-start !important;
    gap: 0.75rem !important
}

.OZ24-entries-page-variation-2 .bonus-box-redesign .flex.w-6 {
    font-size: 0 !important;
    color: transparent !important
}

.OZ24-entries-page-variation-2 .bonus-box-gift .flex.w-6 {
    background-image: url("data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.333 12H2.33301M12.333 2V22M13.333 12C13.333 13.0609 13.7544 14.0783 14.5046 14.8284C15.2547 15.5786 16.2721 16 17.333 16M11.333 12C11.333 13.0609 10.9116 14.0783 10.1614 14.8284C9.41129 15.5786 8.39387 16 7.33301 16' stroke='%230193A7' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M12.3328 10.0355C12.3333 9.31142 12.5757 8.60828 13.0213 8.03763C13.467 7.46697 14.0904 7.06147 14.7928 6.88547C16.3958 6.48547 17.8488 7.93747 17.4478 9.54147C17.2718 10.2438 16.8663 10.8673 16.2956 11.3129C15.725 11.7586 15.0218 12.0009 14.2978 12.0015H12.3328M12.3328 10.0355V12.0015M12.3328 10.0355C12.3322 9.31142 12.0899 8.60828 11.6442 8.03763C11.1986 7.46697 10.5751 7.06147 9.87277 6.88547C8.26977 6.48547 6.81677 7.93747 7.21777 9.54147C7.39377 10.2438 7.79927 10.8673 8.36993 11.3129C8.94058 11.7586 9.64372 12.0009 10.3678 12.0015H12.3328' stroke='%230193A7' stroke-width='1.5'/%3E%3Cpath d='M2.33301 12C2.33301 7.286 2.33301 4.929 3.79701 3.464C5.26301 2 7.61901 2 12.333 2C17.047 2 19.404 2 20.868 3.464C22.333 4.93 22.333 7.286 22.333 12C22.333 16.714 22.333 19.071 20.868 20.535C19.405 22 17.047 22 12.333 22C7.61901 22 5.26201 22 3.79701 20.535C2.33301 19.072 2.33301 16.714 2.33301 12Z' stroke='%230193A7' stroke-width='1.5'/%3E%3C/svg%3E") !important;
    background-size: 1.5rem !important;
    background-repeat: no-repeat !important;
    background-position: center !important
}

.OZ24-entries-page-variation-2 .bonus-box-money .flex.w-6 {
    background-image: url("data:image/svg+xml,%3Csvg width='27' height='27' viewBox='0 0 27 27' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.2028 16.1679H13.2596C14.4784 16.2004 15.4534 17.1916 15.4534 18.4104C15.4534 19.4504 14.7465 20.3197 13.7878 20.5797V21.4897C13.7878 21.8147 13.5278 22.0747 13.2028 22.0747C12.8778 22.0747 12.6178 21.8147 12.6178 21.4897V20.5797C12.1404 20.4512 11.7187 20.1692 11.4176 19.7771C11.1166 19.385 10.953 18.9047 10.9521 18.4104C10.9521 18.0854 11.2121 17.8254 11.5371 17.8254C11.8621 17.8254 12.1221 18.0854 12.1221 18.4104C12.1221 19.0116 12.6015 19.491 13.1946 19.491C13.7878 19.491 14.2753 19.0035 14.2753 18.4104C14.2753 17.8172 13.7878 17.3297 13.1946 17.3297H13.1378C12.5533 17.3139 11.998 17.0707 11.5899 16.652C11.1818 16.2333 10.953 15.6719 10.9521 15.0872C10.9521 14.0472 11.659 13.1779 12.6178 12.9179V12.0079C12.6178 11.6829 12.8778 11.4229 13.2028 11.4229C13.5278 11.4229 13.7878 11.6829 13.7878 12.0079V12.9179C14.7465 13.1779 15.4534 14.0472 15.4534 15.0872C15.4534 15.4122 15.1934 15.6722 14.8684 15.6722C14.5434 15.6722 14.2834 15.4122 14.2834 15.0872C14.2834 14.4941 13.7959 14.0066 13.2028 14.0066C12.6096 14.0066 12.1221 14.4941 12.1221 15.0872C12.1221 15.6804 12.6096 16.1679 13.2028 16.1679Z' fill='%230090B1'/%3E%3Cpath d='M8.89026 4.59385L11.1539 7.2426L10.9093 7.5156C6.25045 8.56048 2.77051 12.7213 2.77051 17.6954C2.77051 22.0683 6.31951 25.6173 10.6924 25.6173H15.7055C20.0784 25.6173 23.6274 22.0691 23.6274 17.6962C23.6355 12.7213 20.1556 8.56048 15.4967 7.5156C15.5158 7.3439 15.4848 7.17034 15.4073 7.01591L17.3329 4.8116L17.4573 4.61985C17.6024 4.30324 17.6396 3.94772 17.5629 3.60795C17.4863 3.26818 17.3002 2.96298 17.0333 2.7393C16.7663 2.51561 16.4332 2.38583 16.0853 2.36991C15.7373 2.35398 15.3938 2.4528 15.1075 2.65116L14.4226 1.83866C14.2689 1.66672 14.0808 1.52909 13.8704 1.43473C13.66 1.34037 13.4321 1.2914 13.2015 1.29102C12.9709 1.29063 12.7428 1.33884 12.5321 1.4325C12.3214 1.52616 12.1328 1.66317 11.9786 1.8346L11.2611 2.63573C10.9756 2.43324 10.6313 2.33048 10.2814 2.34335C9.93161 2.35622 9.59578 2.48399 9.32587 2.70691C9.05596 2.92983 8.86703 3.23547 8.78828 3.57656C8.70954 3.91765 8.74538 4.27518 8.89026 4.59385ZM11.9769 5.71916L10.5989 4.12666C10.9191 4.28064 11.2813 4.3243 11.6289 4.2508C11.9765 4.17731 12.29 3.99082 12.5205 3.72041L13.1705 2.87704L13.892 3.73179C14.117 3.9934 14.4204 4.17531 14.7572 4.25042C15.0939 4.32553 15.446 4.28982 15.7608 4.1486L14.3893 5.71916H11.9769ZM4.39551 17.6954C4.39551 12.8302 8.33776 8.88791 13.203 8.88791C18.0683 8.88791 22.0105 12.8302 22.0024 17.6938V17.6954C22.0017 19.3652 21.3381 20.9665 20.1574 22.1473C18.9766 23.328 17.3753 23.9916 15.7055 23.9923H10.6924C9.02255 23.9916 7.42129 23.328 6.24053 22.1473C5.05978 20.9665 4.39615 19.3652 4.39551 17.6954Z' fill='%230090B1'/%3E%3C/svg%3E") !important;
    background-size: 1.5rem !important;
    background-repeat: no-repeat !important;
    background-position: center !important
}

.OZ24-entries-page-variation-2 a[id*="add-to-cart"] {
    padding-top: 25px !important
}

.OZ24-entries-page-variation-2 a[id*="add-to-cart"] [data-entries-amount="200"] {
    background-color: #FFDD00 !important;
    border: none !important
}

.OZ24-entries-page-variation-2 a[id*="add-to-cart"] [data-entries-amount="200"]:hover {
    background-color: #FDEE8C !important
}

.OZ24-entries-page-variation-2 a[id*="add-to-cart"] button {
    border: 1px solid #3B5C6B;
    background-color: transparent !important
}

.OZ24-entries-page-variation-2 a[id*="add-to-cart"] button:hover,
.OZ24-entries-page-variation-2 a[id*="add-to-cart"] button:focus,
.OZ24-entries-page-variation-2 a[id*="add-to-cart"] button:active,
.OZ24-entries-page-variation-2 a[id*="add-to-cart"] button:focus-visible {
    background-color: white !important
}

.OZ24-entries-page-variation-2 .button-redesign {
    width: 100% !important;
    padding: 0.75rem 1.5rem !important;
    font-weight: 600 !important;
    border-radius: 9999px !important;
    transition: all 0.2s !important
}

.OZ24-entries-page-variation-2 .body-redesign>.block:last-child {
    margin-top: auto !important;
    align-self: stretch !important
}

.OZ24-entries-page-variation-2 #subscription-card-25 {
    border: 4px solid #0090B1 !important
}

.OZ24-entries-page-variation-2 .tab-pane div[class*="enter-subs-offer.png"] {
    display: none !important
}

@media (max-width: 1100px) {
    .OZ24-entries-page-variation-2 .subscription-cards-container {
        // justify-content: flex-start !important;
        margin-left: 1rem !important
    }
}

@media (min-width: 1101px) {
    .OZ24-entries-page-variation-2 .subscription-cards-container {
        justify-content: center !important
    }
}

@media (max-width: 768px) {
    .OZ24-entries-page-variation-2 [data-test="card-variant-subscription"].card-redesign {
        max-width: 340px !important;
        width: 260px !important;
    }
}
`

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

addStyles(STYLES);