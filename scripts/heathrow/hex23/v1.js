const LOG_ENABLED = true;

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
    }
    .ccx-mobile-container ol {
        list-style-type: disc;
        padding-left: 1rem;
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
    const CONTROL_TITLE_START_YOUR_JOURNEY = document.querySelector('main button.font-bold + div > p');

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

    // Appends
    CCX_OUTER_WRAPPER_CONTAINER.appendChild(CCX_MOBILE_CONTAINER);
    CONTROL_TITLE_START_YOUR_JOURNEY.insertAdjacentElement('beforeend', CCX_OUTER_WRAPPER_CONTAINER);
}

const addStyles = (css) => {
    customLog('[addStyles] Starting the addStyles function...');

    if (!css) return;

    if (!css) {
        customLog('[addStyles] No CSS provided');
        return;
    }

    // Check if the style tag already exists
    if (document.querySelector('.ccx-styles-hex23-v1')) {
        customLog('[addStyles] Custom styles already exist.');
        return;
    }

    // Create a new <style> element
    const style = document.createElement('style');
    style.classList.add('ccx-styles-hex23-v1');
    style.appendChild(document.createTextNode(css));

    // Append the style tag to the document head
    document.head.appendChild(style);
    customLog('Custom styles added.');
};

const init = () => {
    customLog('--- HEATHROW - HEX 23 - V1 ---');
    document.body.classList.add('ccx-heathrow-hex23-v1');
    customLog('[init] Initializing...');
    createAndAttachContainers();
    addStyles(styles);
}

init();
