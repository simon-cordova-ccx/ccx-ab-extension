(function () {
    const LOG_ENABLED = false;
    const TEST_ID = "OZ35";
    const TEST_NAME = "Multi-Video Hero Test on House Landing Page";
    const VARIATION = "new-control";
    const CURRENT_URL = window.location.href;

    const SELECTORS = {
        // HOME_BANNER_VIDEO: '.home--banner video',
        enterNowButtons: 'a[class*=yellow-btn]'
    }

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
                parts.push("%o");
                values.push(msg);
            } else if (Array.isArray(msg)) {
                msg.forEach(item => {
                    if (item instanceof Element) {
                        parts.push("%o");
                        values.push(item);
                    } else if (item && typeof item === "object" && "html" in item) {
                        const wrapper = document.createElement("div");
                        wrapper.innerHTML = item.html.trim();
                        const el = wrapper.firstElementChild;
                        parts.push("%o");
                        values.push(el);
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

    const waitForElements = (configs, callback) => {
        if (!configs || !Array.isArray(configs) || configs.length === 0) return;
        if (!window.DYO || !DYO.waitForElementAsync) return;

        const promises = configs.map(cfg => {
            const { selector, count } = cfg;
            return DYO.waitForElementAsync(selector, count, 100, 150)
                .then(elements => ({ selector, elements }));
        });

        Promise.all(promises)
            .then(results => {
                if (typeof callback === 'function') callback(results);
            })
            .catch(() => { });
    }

    const attachEventListeners = (results) => {
        customLog('[attachEventListeners] Attaching event listeners...');

        // results is an array of objects with {selector, elements}
        const buttonResult = results.find(r => r.selector === SELECTORS.enterNowButtons);

        if (!buttonResult || !buttonResult.elements) {
            // console.warn('[attachEventListeners] No buttons found');
            return;
        }

        buttonResult.elements.forEach(button => {
            button.addEventListener('click', () => {
                customLog('[attachEventListeners] Enter Now button clicked');
                // send DY custom event
                DY.API("event", {
                    name: "click-home-enter-now-button"
                });
            });
        });
    }

    const init = () => {
        try {
            customLog(TEST_ID + ' | ' + VARIATION + ' | ' + TEST_NAME);
            customLog('[init] Current URL: ' + CURRENT_URL);

            waitForElements(
                [
                    // { selector: SELECTORS.HOME_BANNER_VIDEO, count: 1 },
                    { selector: SELECTORS.enterNowButtons, count: 3 },
                ],
                function (results) {
                    const styleClass = 'ccx-styles-oz35-' + VARIATION.toLowerCase().replace(/\s+/g, '-');

                    if (document.querySelector('.' + styleClass)) return;

                    document.body.classList.add(styleClass);
                    customLog('[init] Added class ' + styleClass + ' to body');

                    const videoResult = results.find(r => r.selector === SELECTORS.HOME_BANNER_VIDEO);
                    const HOME_BANNER_VIDEO = videoResult?.elements?.[0];

                    attachEventListeners(results);

                    if (!HOME_BANNER_VIDEO) {
                        // console.warn('[init] Video element not found');
                        return;
                    }
                }
            );

        } catch (error) { }
    }

    init();
})();