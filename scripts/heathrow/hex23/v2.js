const LOG_ENABLED = true;

const ICON_CLOSE = `<svg width="13" height="13" viewBox="0 0 13 13" fill="42174C" xmlns="http://www.w3.org/2000/svg">
<path d="M6.20972 7.53194L1.58194 12.1597C1.4088 12.3329 1.18843 12.4194 0.920833 12.4194C0.653241 12.4194 0.43287 12.3329 0.259722 12.1597C0.0865741 11.9866 0 11.7662 0 11.4986C0 11.231 0.0865741 11.0106 0.259722 10.8375L4.8875 6.20972L0.259722 1.58194C0.0865741 1.4088 0 1.18843 0 0.920833C0 0.653241 0.0865741 0.43287 0.259722 0.259722C0.43287 0.0865741 0.653241 0 0.920833 0C1.18843 0 1.4088 0.0865741 1.58194 0.259722L6.20972 4.8875L10.8375 0.259722C11.0106 0.0865741 11.231 0 11.4986 0C11.7662 0 11.9866 0.0865741 12.1597 0.259722C12.3329 0.43287 12.4194 0.653241 12.4194 0.920833C12.4194 1.18843 12.3329 1.4088 12.1597 1.58194L7.53194 6.20972L12.1597 10.8375C12.3329 11.0106 12.4194 11.231 12.4194 11.4986C12.4194 11.7662 12.3329 11.9866 12.1597 12.1597C11.9866 12.3329 11.7662 12.4194 11.4986 12.4194C11.231 12.4194 11.0106 12.3329 10.8375 12.1597L6.20972 7.53194Z" fill="#511E62"/>
</svg>
`;

const USPList = [
    {
        text: "Our trains run every 15 minutes"
    },
    {
        text: "Tickets start from £10 one way**"
    },
    {
        text: "Kids 15 and under travel free***"
    },
];

const styles = `
    main .max-w-limit.mx-auto > div > .grid:first-of-type {
        margin-bottom: 2rem;
    }
    .ccx-mobile-container {
        width: 100%;
        height: 91px;
        display: flex;
        flex-flow: column;
        gap: 10px;
        opacity: 1;
        padding-top: 12px;
        padding-right: 24px;
        padding-bottom: 12px;
        padding-left: 12px;
        background: #CDBAD0;
        color: #42174C;
        position: relative;
    }
    span.ccx-close-icon {
        text-align: right;
        margin-left: auto;
        width: 12px;
        height: 12px;
        opacity: 1;
        color: #CDBAD2;
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
    .ccx-mobile-container ol {
        list-style-type: disc;
        padding-left: 2rem;
    }
    .ccx-mobile-container ol .ccx-mobile-list-item {
        font-family: Montserrat;
        font-weight: 600;
        font-size: 14px;
        letter-spacing: 0;
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

const createAndAttachContainers = () => {
    customLog('[createAndAttachContainers] Creating and attaching containers...');

    // Control element - nav second container
    const CONTROL_ELEMENT_NAV = document.querySelector('nav');

    // Outer container
    const CCX_OUTER_WRAPPER_CONTAINER = document.createElement('div');
    CCX_OUTER_WRAPPER_CONTAINER.className = 'ccx-container mx-auto';

    // Inner mobile container
    const CCX_MOBILE_CONTAINER = document.createElement('div');
    CCX_MOBILE_CONTAINER.className = 'ccx-mobile-container';
    // Inner mobile list
    const CCX_ELEMENT_MOBILE_LIST = document.createElement('ol');
    CCX_ELEMENT_MOBILE_LIST.className = 'ccx-mobile-list';
    USPList.forEach(usp => {
        const li = document.createElement('li');
        li.className = 'ccx-mobile-list-item';

        li.textContent = usp.text;
        CCX_ELEMENT_MOBILE_LIST.appendChild(li);
    });
    CCX_MOBILE_CONTAINER.appendChild(CCX_ELEMENT_MOBILE_LIST);

    // Attach close icon to mobile container
    const span = document.createElement('span');
    span.className = 'ccx-close-icon';
    span.innerHTML = ICON_CLOSE;
    CCX_MOBILE_CONTAINER.appendChild(span);

    // Appends
    CCX_OUTER_WRAPPER_CONTAINER.appendChild(CCX_MOBILE_CONTAINER);
    CONTROL_ELEMENT_NAV.insertAdjacentElement('beforeend', CCX_OUTER_WRAPPER_CONTAINER);
}

const attachEventListeners = () => {
    customLog('[attachEventListeners] Attaching event listeners...');

    const CONTROL_ELEMENT_CLOSE_BUTTON = document.querySelector('.ccx-close-icon');
    const CCX_ELEMENT_WRAPPER_CONTAINER = document.querySelector('.ccx-container');
    if (!CONTROL_ELEMENT_CLOSE_BUTTON || !CCX_ELEMENT_WRAPPER_CONTAINER) return;

    CONTROL_ELEMENT_CLOSE_BUTTON.addEventListener('click', () => {
        customLog('[attachEventListeners] Clicked close button');
        CCX_ELEMENT_WRAPPER_CONTAINER.remove();
    });
}

const attachMutationObserver = () => {
    customLog('[attachMutationObserver] Attaching mutation observer...');

    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const handleStructureChange = () => {
        const CCX_ELEMENT_WRAPPER_CONTAINER = document.querySelector('.ccx-container');
        const CONTROL_ELEMENT_NAV = document.querySelector('nav');

        if (
            CCX_ELEMENT_WRAPPER_CONTAINER &&
            CONTROL_ELEMENT_NAV &&
            CONTROL_ELEMENT_NAV.lastElementChild !== CCX_ELEMENT_WRAPPER_CONTAINER
        ) {
            CONTROL_ELEMENT_NAV.insertAdjacentElement('beforeend', CCX_ELEMENT_WRAPPER_CONTAINER);
            console.log('[MutationObserver] .ccx-container repositioned inside <nav>');
        }
    };

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            const addedNodes = Array.from(mutation.addedNodes);
            const removedNodes = Array.from(mutation.removedNodes);

            // Detect when <footer> or <nav> is added or removed
            const relevantChange = [...addedNodes, ...removedNodes].some(node => {
                return (
                    node.tagName === 'FOOTER' ||
                    node.tagName === 'NAV' ||
                    (node.querySelector && (node.querySelector('footer') || node.querySelector('nav')))
                );
            });

            // Or if the change happened *inside* an existing <nav>
            const navChanged = mutation.target.tagName === 'NAV';

            if (relevantChange || navChanged) {
                handleStructureChange();
            }
        }
    });

    observer.observe(targetNode, config);
};

const addStyles = (css) => {
    customLog('[addStyles] Starting the addStyles function...');

    if (!css) return;

    if (!css) {
        customLog('[addStyles] No CSS provided');
        return;
    }

    // Check if the style tag already exists
    if (document.querySelector('.ccx-styles-hex23-v2')) {
        customLog('[addStyles] Custom styles already exist.');
        return;
    }

    // Create a new <style> element
    const style = document.createElement('style');
    style.classList.add('ccx-styles-hex23-v2');
    style.appendChild(document.createTextNode(css));

    // Append the style tag to the document head
    document.head.appendChild(style);
    customLog('Custom styles added.');
};

const init = () => {
    customLog('--- HEATHROW - HEX 22 - V2 ---');
    document.body.classList.add('ccx-heathrow-hex23-v2');
    customLog('[init] Initializing...');
    createAndAttachContainers();
    attachEventListeners();
    addStyles(styles);
    attachMutationObserver();
}

init();
