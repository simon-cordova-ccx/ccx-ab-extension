const LOG_ENABLED = true;
const TEST_NAME = "OZDE-7 | PayPal Signup on Cart (Non‑Logged‑In)";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const emailIconSVG = `<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 5.25L10.2568 9.54525C9.79094 9.81581 9.21581 9.81581 8.75 9.54525L2 5.25" stroke="#0090B1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.5 3H15.5C16.3279 3 17 3.67213 17 4.5V13.5C17 14.3279 16.3279 15 15.5 15H3.5C2.67213 15 2 14.3279 2 13.5V4.5C2 3.67213 2.67213 3 3.5 3" stroke="#0090B1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const secureIconSVG = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.8333 8.76335C13.8333 12.0967 11.5 13.7633 8.72667 14.73C8.58144 14.7792 8.42369 14.7769 8.28 14.7233C5.5 13.7633 3.16667 12.0967 3.16667 8.76335V4.09668C3.16667 3.72874 3.46539 3.43001 3.83333 3.43001C5.16667 3.43001 6.83333 2.63001 7.99333 1.61668C8.28512 1.36739 8.71488 1.36739 9.00667 1.61668C10.1733 2.63668 11.8333 3.43001 13.1667 3.43001C13.5346 3.43001 13.8333 3.72874 13.8333 4.09668" stroke="#081F28" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.5 8.09668L7.83333 9.43001L10.5 6.76335" stroke="#081F28" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const bonusDrawsIconSVG = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.84467 1.97268C7.9036 1.65715 8.17902 1.42842 8.5 1.42842C8.82098 1.42842 9.0964 1.65715 9.15533 1.97268L9.856 5.67801C9.95784 6.21714 10.3795 6.63884 10.9187 6.74068L14.624 7.44135C14.9395 7.50028 15.1683 7.7757 15.1683 8.09668C15.1683 8.41766 14.9395 8.69308 14.624 8.75201L10.9187 9.45268C10.3795 9.55452 9.95784 9.97622 9.856 10.5153L9.15533 14.2207C9.0964 14.5362 8.82098 14.7649 8.5 14.7649C8.17902 14.7649 7.9036 14.5362 7.84467 14.2207L7.144 10.5153C7.04216 9.97622 6.62046 9.55452 6.08133 9.45268L2.376 8.75201C2.06047 8.69308 1.83174 8.41766 1.83174 8.09668C1.83174 7.7757 2.06047 7.50028 2.376 7.44135L6.08133 6.74068C6.62046 6.63884 7.04216 6.21714 7.144 5.67801M13.8333 1.43001V4.09668M15.1667 2.76335H12.5" stroke="#081F28" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.83333 13.43C1.83333 14.1659 2.43078 14.7633 3.16667 14.7633C3.90255 14.7633 4.5 14.1659 4.5 13.43C4.5 12.6941 3.90255 12.0967 3.16667 12.0967C2.43078 12.0967 1.83333 12.6941 1.83333 13.43" stroke="#081F28" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const quickCheckoutIconSVG = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 4.09668V8.09668H11.1667" stroke="#081F28" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.83333 8.09668C1.83333 11.7761 4.82057 14.7633 8.5 14.7633C12.1794 14.7633 15.1667 11.7761 15.1667 8.09668C15.1667 4.41725 12.1794 1.43001 8.5 1.43001C4.82057 1.43001 1.83333 4.41725 1.83333 8.09668" stroke="#081F28" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const styles = `
    .body-no-scroll {
        overflow: hidden;
        height: 100%;
    }
    .ccx-hide {
        display: none !important;
    }
    #begin-checkout [issubscriptionpurchase] > div:nth-child(2) {
        padding-top: 1rem !important;
        padding-bottom: 0 !important;
    }
    .ccx-modal.ccx-modal--overlay {
        background: #081F28B2;
        z-index: 1000 !important;
    }
    .ccx-modal__content {
        box-shadow: 0px 12px 40px 0px #00000066;
        border: 1px solid #E6E9EB;
        background: white;
        border-radius: 12px;
        border-width: 1px;
        opacity: 1;
        padding-top: 48px;
        padding-right: 0;
        padding-bottom: 48px;
        padding-left: 0;
        max-width: 90%;
        max-height: 90vh;      /* limits height to viewport */
        overflow-y: auto;      /* enable vertical scroll */
        -webkit-overflow-scrolling: touch; /* smooth scrolling on iOS */
    }
    .ccx-modal__top-container {
        padding-right: 40px;
        padding-left: 40px;
    }
    .ccx-modal__button--paypal span {
        font-family: Gellix;
        font-weight: 700;
        font-size: 16px;
        line-height: 15px;
        letter-spacing: 0;
        text-align: center;
        vertical-align: middle;
    }
    .ccx-button-unified {
        background: #FFDD00;
        color: #081F28;
        font-weight: 700;
        font-size: 18px;
        line-height: 1.2;
        letter-spacing: 0;
        text-align: center;
        width: 354px;
        height: 58px;
        border-radius: 96px;
        opacity: 1;
        padding-top: 16px;
        padding-bottom: 20px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ccx-modal__title {
        font-family: Gellix;
        font-weight: 700;
        font-size: 30px;
        text-transform: none;
        letter-spacing: 0px;
        text-align: center;
        vertical-align: middle;
        color: #0F1720;
        margin-bottom: 12px;
    }
    .ccx-modal__description {
        font-family: Gellix;
        font-weight: 500;
        font-size: 14px;
        line-height: normal;
        letter-spacing: 0px;
        text-align: center;
        width: 100%;
        vertical-align: middle;
        color: #081F28;
    }
    .ccx-modal__button--paypal {
        margin-bottom: 1rem;
        font-family: Gellix, sans-serif;
        font-size: 16px;
        letter-spacing: 0px;
        text-align: center;
        vertical-align: middle;
        background: rgb(0, 112, 186);
        color: white;
    }
    .ccx-modal__subtext {
        font-family: Gellix;
        font-weight: 500;
        color: #626262;
        font-size: 12px;
        letter-spacing: 0px;
        text-align: center;
        vertical-align: middle;
        max-width: 251px;
        margin: 0 auto;
        margin-bottom: 1rem;
    }
    .ccx-modal__or-text {
        font-family: Gellix;
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0px;
        text-align: center;
        vertical-align: middle;
        color: #081F28;
        height: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
    }
    .ccx-modal__button.ccx-modal__button--email {
        background: white;
        color: #0090B1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Gellix;
        font-weight: 700;
        font-size: 16px;
        letter-spacing: 0px;
        text-align: center;
        vertical-align: middle;
        width: 100%;
        height: 56px;
        border-radius: 24px;
        border-width: 1px;
        opacity: 1;
        padding-top: 15px;
        padding-right: 17px;
        padding-bottom: 15px;
        padding-left: 17px;
        gap: 10px;
        margin-bottom: 1rem;
        border: 1px solid #0090B1;
    }
    .ccx-modal__login-text {
        font-family: Gellix;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 0px;
        width: 100%;
        opacity: 1;
        text-align: center;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 2rem;
    }
    .ccx-modal__bottom-container {
        padding-right: 1rem;
        padding-left: 1rem;
    }
    .ccx-modal__button-container {
        text-align: center;
        color: #081F28;
    }
    .ccx-modal__button-container .ccx-modal__button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        font-size: 12px;
        border: 1px solid #F5F5F5;
        width: auto;
        height: 30px;
        border-radius: 48px;
        border-width: 1px;
        opacity: 1;
        padding-top: 7px;
        padding-right: 11px;
        padding-bottom: 7px;
        padding-left: 11px;
        gap: 8px;
        margin-bottom: 1rem;
        line-height: 12px;
        cursor: initial;
    }
    .ccx-modal__button-text {
        text-align: center;
    }
    .ccx-modal__terms {
        font-family: Gellix;
        font-weight: 500;
        font-size: 12px;
        line-height: initial;
        letter-spacing: 0px;
        text-align: center;
        vertical-align: bottom;
        color: #6B7280;
        max-width: 304px;
        margin: 0 auto;
    }

    @media screen and (min-width: 768px) {
        .ccx-button-unified {
            font-size: 16px;
        }
        .ccx-modal__content {
            max-width: 560px;
            max-height: none;  /* desktop: modal can grow normally */
            overflow: visible;
        }
        .ccx-modal__button-container {
            display: flex;
            gap: 0.5rem;
        }
        .ccx-modal__description {
            padding: 0 3rem;
        }
    }

    @media screen and (min-width: 991px) {        
        .ccx-button-unified {
            font-size: 18px;
        }
        
    }

`;

const customLog = (...messages) => {
    if (!LOG_ENABLED) return;

    const style = `
        background: linear-gradient(90deg, #6a6971, #2a1f60);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
    `;

    const parts = [];
    const values = [];

    messages.forEach(msg => {
        if (msg instanceof Element) {
            // Single DOM element
            parts.push("%o");
            values.push(msg);

        } else if (Array.isArray(msg)) {
            // Handle arrays
            msg.forEach(item => {
                if (item instanceof Element) {
                    parts.push("%o");
                    values.push(item);
                } else if (item && typeof item === "object" && "html" in item) {
                    // Object with HTML string
                    const wrapper = document.createElement("div");
                    wrapper.innerHTML = item.html.trim();
                    const el = wrapper.firstElementChild;

                    parts.push("%o");
                    values.push(el);

                    // Log other props (e.g., entriesAmount)
                    const { html, ...rest } = item;
                    if (Object.keys(rest).length > 0) {
                        parts.push("%O");
                        values.push(rest);
                    }
                } else {
                    parts.push("%O");
                    values.push(item);
                }
            });

        } else if (msg && typeof msg === "object" && "html" in msg) {
            // Single object with HTML string
            const wrapper = document.createElement("div");
            wrapper.innerHTML = msg.html.trim();
            const el = wrapper.firstElementChild;

            parts.push("%o");
            values.push(el);

            const { html, ...rest } = msg;
            if (Object.keys(rest).length > 0) {
                parts.push("%O");
                values.push(rest);
            }

        } else {
            // Normal text/objects
            if (typeof msg === "string") {
                parts.push("%c" + msg.toUpperCase());
                values.push(style);
            } else {
                parts.push("%O");
                values.push(msg);
            }
        }
    });

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
    if (document.querySelector('.ccx-styles-de7-v1')) {
        customLog('[addStyles] Custom styles already exist.');
        return;
    }

    // Create a new <style> element
    const style = document.createElement('style');
    style.classList.add('ccx-styles-de7-v1');
    style.appendChild(document.createTextNode(css));

    // Append the style tag to the document head
    document.head.appendChild(style);
    customLog('Custom styles added.');
};

const waitForElements = (configs, callback) => {
    customLog('[waitForElements] Starting to wait for elements...');

    if (!configs || !Array.isArray(configs) || configs.length === 0) {
        customLog('[waitForElements] No configs provided.');
        return;
    }

    if (!window.DYO || !DYO.waitForElementAsync) {
        customLog('[waitForElements] DYO.waitForElementAsync is not available.');
        return;
    }

    // Create promises for each config
    const promises = configs.map(cfg => {
        const { selector, count } = cfg;
        return DYO.waitForElementAsync(selector, count, 100, 150)
            .then(elements => {
                customLog('[' + 'waitForElements' + '] Found ' + elements.length + ' for ' + selector);
                return { selector, elements };
            });
    });

    Promise.all(promises)
        .then(results => {
            // customLog('[waitForElements] All elements found:', results);
            if (typeof callback === 'function') callback(results);
        })
        .catch(error => {
            customLog('[waitForElements] Some selectors not found within timeout.', error);
        });
}

const addUnifiedLoginButton = (CONTROL_ELEMENT_LOGIN) => {
    // create new button with class ccx-button-unified and insert it before CONTROL_ELEMENT_LOGIN
    const unifiedButton = document.createElement('button');
    unifiedButton.classList.add(
        'ccx-button-unified',
        'bg-[#FFDD00]',
        'font-bold',
        'text-[#081F28]',
        'rounded-full',
        'px-8',
        'py-3',
        'w-full',
        'mx-auto',
        'max-w-80',
        'text-center'
    );

    unifiedButton.textContent = 'Einloggen, um fortzufahren';
    CONTROL_ELEMENT_LOGIN.parentNode.insertBefore(unifiedButton, CONTROL_ELEMENT_LOGIN);

    document.querySelector('.ccx-button-unified').addEventListener('click', (event) => {
        event.preventDefault();

        document.querySelector('.ccx-modal').classList.remove('ccx-hide');

        document.body.classList.add('body-no-scroll');
    })
}

const createLoginModal = () => {
    const modal = document.createElement('div');
    modal.classList.add(
        'ccx-modal',
        'ccx-modal--overlay',
        'fixed',
        'inset-0',
        'flex',
        'items-center',
        'justify-center',
        'ccx-hide'
    );

    const modalContent = document.createElement('div');
    modalContent.classList.add('ccx-modal__content');

    // Create two main wrappers
    const topContainer = document.createElement('div');
    topContainer.classList.add('ccx-modal__top-container');

    const bottomContainer = document.createElement('div');
    bottomContainer.classList.add('ccx-modal__bottom-container');

    // === TOP CONTAINER ELEMENTS ===
    const title = document.createElement('h2');
    title.classList.add('ccx-modal__title');
    title.textContent = 'Jetzt mitmachen — Dein Schnellstart zum Alpen-Haus';
    topContainer.appendChild(title);

    const description = document.createElement('p');
    description.classList.add('ccx-modal__description');
    description.textContent = 'Starte deine Teilnahme in Sekunden. Einfacher Checkout, große Träume — du bist bei jedem Schritt abgesichert.';
    topContainer.appendChild(description);

    const paypalBtn = document.createElement('button');
    paypalBtn.classList.add(
        'ccx-modal__button',
        'ccx-modal__button--paypal',
        'flex',
        'items-center',
        'justify-center',
        'rounded-full',
        'w-full',
        'py-3',
        'px-6'
    );

    const paypalImg = document.createElement('img');
    paypalImg.src = '//omaze.de/cdn/shop/t/133/assets/paypal-sso_44x.png?v=5786271219429686701759325932';
    paypalImg.style.marginRight = '.5rem';
    paypalImg.style.width = '22px';
    paypalImg.style.height = '22px';

    const paypalText = document.createElement('span');
    paypalText.textContent = 'Mit PayPal Anmelden Mit PayPal Anmelden';

    paypalBtn.appendChild(paypalImg);
    paypalBtn.appendChild(paypalText);
    topContainer.appendChild(paypalBtn);

    const paypalSubtext = document.createElement('p');
    paypalSubtext.classList.add('ccx-modal__subtext');
    paypalSubtext.textContent = 'Keine Passwörter nötig. Du bist durch den Käuferschutz abgesichert.';
    topContainer.appendChild(paypalSubtext);

    const orText = document.createElement('p');
    orText.classList.add('ccx-modal__or-text');
    orText.textContent = 'ODER';
    topContainer.appendChild(orText);

    const emailBtn = document.createElement('button');
    emailBtn.classList.add('ccx-modal__button', 'ccx-modal__button--email');
    emailBtn.innerHTML = emailIconSVG + '<span>Mit E-Mail registrieren</span>';
    topContainer.appendChild(emailBtn);

    const loginText = document.createElement('p');
    loginText.classList.add('ccx-modal__login-text');
    loginText.innerHTML = 'Hast du schon ein Konto? &nbsp <a href="#" class="ccx-modal__login-link text-blue-600 underline">Einloggen</a>';
    topContainer.appendChild(loginText);

    loginText.querySelector('.ccx-modal__login-link').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Login link clicked');
    });

    // === BOTTOM CONTAINER ELEMENTS ===
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('ccx-modal__button-container');

    const buttonInfo = [
        { text: 'Sicher & geschützt', icon: secureIconSVG },
        { text: 'Bonus-Verlosungen inklusive', icon: bonusDrawsIconSVG },
        { text: 'Schneller Checkout', icon: quickCheckoutIconSVG }
    ];

    buttonInfo.forEach((button, i) => {
        const btn = document.createElement('button');
        btn.classList.add('ccx-modal__button', 'ccx-modal__button--icon-' + (i + 1));

        const iconContainer = document.createElement('span');
        iconContainer.classList.add('ccx-modal__icon');
        iconContainer.innerHTML = button.icon;

        const btnText = document.createElement('span');
        btnText.classList.add('ccx-modal__button-text');
        btnText.textContent = button.text;

        btn.appendChild(iconContainer);
        btn.appendChild(btnText);
        buttonContainer.appendChild(btn);
    });

    bottomContainer.appendChild(buttonContainer);

    const termsText = document.createElement('p');
    termsText.classList.add('ccx-modal__terms');
    termsText.innerHTML = `
        Mit deiner Anmeldung akzeptierst du unsere 
        <a href="https://omaze.de/pages/agb">Nutzungsbedingungen</a> 
        und 
        <a href="https://omaze.de/pages/datenschutz">Datenschutzrichtlinie</a>.
    `;
    bottomContainer.appendChild(termsText);

    // Append both containers to modal content
    modalContent.appendChild(topContainer);
    modalContent.appendChild(bottomContainer);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    return modal;
};


const attachModalCloseListener = () => {
    const modalOverlay = document.querySelector('.ccx-modal.ccx-modal--overlay')
    if (!modalOverlay) return;

    modalOverlay.addEventListener('click', (e) => {
        console.log(e);

        if (e.target.classList.contains('ccx-modal--overlay')) {
            modalOverlay.classList.add('ccx-hide');
            document.body.classList.remove('body-no-scroll');
        }
    })

}

const attachEventListeners = (CONTROL_ELEMENT_LOGIN, CONTROL_ELEMENT_PAYPAL, CONTROL_ELEMENT_REGISTER) => {

    const CCX_LOGIN_BUTTON = document.querySelector('.ccx-modal__login-link');
    const CCX_PAYPAL_BUTTON = document.querySelector('.ccx-modal__button--paypal');
    const CCX_REGISTER_BUTTON = document.querySelector('.ccx-modal__button--email');

    if (!CCX_LOGIN_BUTTON || !CCX_PAYPAL_BUTTON || !CCX_REGISTER_BUTTON) return;

    CCX_LOGIN_BUTTON.addEventListener('click', () => {
        CONTROL_ELEMENT_LOGIN.click();
    });

    CCX_PAYPAL_BUTTON.addEventListener('click', () => {
        CONTROL_ELEMENT_PAYPAL.click();
    });

    CCX_REGISTER_BUTTON.addEventListener('click', () => {
        CONTROL_ELEMENT_REGISTER.click();
    });

}

const init = () => {
    try {
        customLog(TEST_NAME + ' | ' + VARIATION);
        customLog('[init] Current URL: ' + CURRENT_URL);

        document.body.classList.add('ccx-omaze-de7-v1');
        customLog('[init] Added class ccx-omaze-de7-v1 to body');

        const currentPathName = window.location.pathname;

        const IS_CART_PAGE = currentPathName === '/cart';

        if (IS_CART_PAGE) {
            customLog('[init] On cart page');

            waitForElements(
                [
                    { selector: '#begin-checkout a[href*="/account/login"]', count: 1 },
                    { selector: '#begin-checkout img[src*="paypal"]', count: 1 },
                    { selector: '#begin-checkout a[href*="/account/register"]', count: 1 },
                ],
                function (results) {
                    console.log(results);
                    addStyles(styles);

                    // const CONTROL_ELEMENT_LOGIN = document.querySelector('#begin-checkout a[href*="/account/login"]');
                    const CONTROL_ELEMENT_LOGIN = results[0].elements[0];
                    if (!CONTROL_ELEMENT_LOGIN) {
                        customLog('[init] Login element not found');
                        return;
                    }
                    CONTROL_ELEMENT_LOGIN.classList.add('ccx-hide');

                    // const CONTROL_ELEMENT_PAYPAL = document.querySelector('#begin-checkout img[src*="paypal"]').parentNode;
                    const CONTROL_ELEMENT_PAYPAL = results[1].elements[0].parentNode;
                    if (!CONTROL_ELEMENT_PAYPAL) {
                        customLog('[init] Paypal element not found');
                        return;
                    }
                    CONTROL_ELEMENT_PAYPAL.classList.add('ccx-hide');
                    CONTROL_ELEMENT_PAYPAL.nextElementSibling.classList.add('ccx-hide');

                    // const CONTROL_ELEMENT_REGISTER = document.querySelector('#begin-checkout a[href*="/account/register"]');
                    const CONTROL_ELEMENT_REGISTER = results[2].elements[0];

                    addUnifiedLoginButton(CONTROL_ELEMENT_LOGIN);

                    createLoginModal();

                    attachModalCloseListener();

                    attachEventListeners(CONTROL_ELEMENT_LOGIN, CONTROL_ELEMENT_PAYPAL, CONTROL_ELEMENT_REGISTER);
                }
            );
        }

    } catch (error) {
        customLog(error.message);
    }
}

init();
