(function () {
    const LOG_ENABLED = true;
    const BODY_CLASS = "ccx-heathrow-hex22-v2";

    const ICON_CLOSE = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.20972 7.53194L1.58194 12.1597C1.4088 12.3329 1.18843 12.4194 0.920833 12.4194C0.653241 12.4194 0.43287 12.3329 0.259722 12.1597C0.0865741 11.9866 0 11.7662 0 11.4986C0 11.231 0.0865741 11.0106 0.259722 10.8375L4.8875 6.20972L0.259722 1.58194C0.0865741 1.4088 0 1.18843 0 0.920833C0 0.653241 0.0865741 0.43287 0.259722 0.259722C0.43287 0.0865741 0.653241 0 0.920833 0C1.18843 0 1.4088 0.0865741 1.58194 0.259722L6.20972 4.8875L10.8375 0.259722C11.0106 0.0865741 11.231 0 11.4986 0C11.7662 0 11.9866 0.0865741 12.1597 0.259722C12.3329 0.43287 12.4194 0.653241 12.4194 0.920833C12.4194 1.18843 12.3329 1.4088 12.1597 1.58194L7.53194 6.20972L12.1597 10.8375C12.3329 11.0106 12.4194 11.231 12.4194 11.4986C12.4194 11.7662 12.3329 11.9866 12.1597 12.1597C11.9866 12.3329 11.7662 12.4194 11.4986 12.4194C11.231 12.4194 11.0106 12.3329 10.8375 12.1597L6.20972 7.53194Z" fill="#CDBAD2"/>
</svg>
`;

    const ICON_TRAIN = `<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 13.5V4C0 3.11667 0.229167 2.4125 0.6875 1.8875C1.14583 1.3625 1.75 0.9625 2.5 0.6875C3.25 0.4125 4.10417 0.229167 5.0625 0.1375C6.02083 0.0458333 7 0 8 0C9.1 0 10.1375 0.0458333 11.1125 0.1375C12.0875 0.229167 12.9375 0.4125 13.6625 0.6875C14.3875 0.9625 14.9583 1.3625 15.375 1.8875C15.7917 2.4125 16 3.11667 16 4V13.5C16 14.4833 15.6625 15.3125 14.9875 15.9875C14.3125 16.6625 13.4833 17 12.5 17L13 17.5C13.2833 17.7833 13.35 18.1042 13.2 18.4625C13.05 18.8208 12.775 19 12.375 19C12.2583 19 12.1458 18.9792 12.0375 18.9375C11.9292 18.8958 11.8333 18.8333 11.75 18.75L10 17H6L4.25 18.75C4.16667 18.8333 4.07083 18.8958 3.9625 18.9375C3.85417 18.9792 3.74167 19 3.625 19C3.24167 19 2.97083 18.8208 2.8125 18.4625C2.65417 18.1042 2.71667 17.7833 3 17.5L3.5 17C2.51667 17 1.6875 16.6625 1.0125 15.9875C0.3375 15.3125 0 14.4833 0 13.5ZM2 8H7V5H2V8ZM9 8H14V5H9V8ZM4.5 14C4.93333 14 5.29167 13.8583 5.575 13.575C5.85833 13.2917 6 12.9333 6 12.5C6 12.0667 5.85833 11.7083 5.575 11.425C5.29167 11.1417 4.93333 11 4.5 11C4.06667 11 3.70833 11.1417 3.425 11.425C3.14167 11.7083 3 12.0667 3 12.5C3 12.9333 3.14167 13.2917 3.425 13.575C3.70833 13.8583 4.06667 14 4.5 14ZM11.5 14C11.9333 14 12.2917 13.8583 12.575 13.575C12.8583 13.2917 13 12.9333 13 12.5C13 12.0667 12.8583 11.7083 12.575 11.425C12.2917 11.1417 11.9333 11 11.5 11C11.0667 11 10.7083 11.1417 10.425 11.425C10.1417 11.7083 10 12.0667 10 12.5C10 12.9333 10.1417 13.2917 10.425 13.575C10.7083 13.8583 11.0667 14 11.5 14Z" fill="white"/>
</svg>
`;

    const ICON_CLOCK = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12.5 12.2002L17 14.9004L16.2002 16.2002L11 13V7H12.5V12.2002Z" fill="white"/>
<mask id="mask0_2170_61" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
<path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12.5 12.2002L17 14.9004L16.2002 16.2002L11 13V7H12.5V12.2002Z" fill="white"/>
</mask>
<g mask="url(#mask0_2170_61)">
</g>
</svg>
`;

    const ICON_SUN = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_2170_74" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_2170_74)">
<path d="M11 5V1H13V5H11ZM17.65 7.75L16.275 6.375L19.075 3.5L20.475 4.925L17.65 7.75ZM19 13V11H23V13H19ZM11 23V19H13V23H11ZM6.35 7.7L3.5 4.925L4.925 3.525L7.75 6.35L6.35 7.7ZM19.05 20.5L16.275 17.625L17.625 16.275L20.475 19.025L19.05 20.5ZM1 13V11H5V13H1ZM4.925 20.5L3.525 19.075L6.325 16.275L7.05 16.95L7.775 17.65L4.925 20.5ZM12 18C10.3333 18 8.91667 17.4167 7.75 16.25C6.58333 15.0833 6 13.6667 6 12C6 10.3333 6.58333 8.91667 7.75 7.75C8.91667 6.58333 10.3333 6 12 6C13.6667 6 15.0833 6.58333 16.25 7.75C17.4167 8.91667 18 10.3333 18 12C18 13.6667 17.4167 15.0833 16.25 16.25C15.0833 17.4167 13.6667 18 12 18ZM12 16C13.1 16 14.0417 15.6083 14.825 14.825C15.6083 14.0417 16 13.1 16 12C16 10.9 15.6083 9.95833 14.825 9.175C14.0417 8.39167 13.1 8 12 8C10.9 8 9.95833 8.39167 9.175 9.175C8.39167 9.95833 8 10.9 8 12C8 13.1 8.39167 14.0417 9.175 14.825C9.95833 15.6083 10.9 16 12 16Z" fill="white"/>
</g>
</svg>
`;

    const ICON_KIDS = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_2170_156" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_2170_156)">
<path d="M7.00007 5.9038C6.49241 5.9038 6.05782 5.72305 5.69632 5.36155C5.33482 5.00005 5.15407 4.56546 5.15407 4.0578C5.15407 3.55013 5.33482 3.11546 5.69632 2.7538C6.05782 2.3923 6.49241 2.21155 7.00007 2.21155C7.50774 2.21155 7.94232 2.3923 8.30382 2.7538C8.66549 3.11546 8.84632 3.55013 8.84632 4.0578C8.84632 4.56546 8.66549 5.00005 8.30382 5.36155C7.94232 5.72305 7.50774 5.9038 7.00007 5.9038ZM16.8271 11.1538C16.4424 11.1538 16.1122 11.0174 15.8366 10.7445C15.5609 10.4715 15.4231 10.14 15.4231 9.75005C15.4231 9.35255 15.5609 9.01921 15.8366 8.75005C16.1122 8.48088 16.4424 8.3463 16.8271 8.3463C17.2244 8.3463 17.5577 8.48088 17.8271 8.75005C18.0962 9.01921 18.2308 9.35096 18.2308 9.7453C18.2308 10.1395 18.0962 10.4728 17.8271 10.7453C17.5577 11.0176 17.2244 11.1538 16.8271 11.1538ZM5.11557 21.75V14.9615H3.53857V9.0193C3.53857 8.52213 3.71557 8.09655 4.06957 7.74255C4.42357 7.38855 4.84916 7.21155 5.34632 7.21155H8.30782C8.66166 7.21155 8.98057 7.3023 9.26457 7.4838C9.54857 7.66513 9.76616 7.91413 9.91732 8.2308L12.9538 14.6173L14.6136 12.7078C14.7404 12.5463 14.8978 12.42 15.0858 12.3288C15.2737 12.2378 15.472 12.1923 15.6808 12.1923H18.1346C18.5139 12.1923 18.8363 12.325 19.1018 12.5905C19.3673 12.856 19.5001 13.1785 19.5001 13.5578V17.0385H18.5001V21.75H15.1538V14.3423L13.8021 15.8463H11.8616L9.50007 10.6288V21.75H5.11557Z" fill="white"/>
</g>
</svg>
`;

    const CAVEATS = [
        "*15 minute journey time to Heathrow Terminals 2 & 3 with an extra 6 minutes to Terminal 5. A free transfer is available to Terminal 4 taking an extra 4 minutes.",
        "**Based on an Advance Discounted Single (one way) ticket purchased for travel on all dates 30 days or more in advance. Tickets are only valid on the Heathrow Express Service in the direction for which they have been purchased.",
        "***Children aged 15 years and under travel free in Standard Class when accompanied by a paying adult, or can travel unaccompanied if they have proof of air travel such as a valid flight booking or boarding pass. Photo ID will be required.",
    ];

    const styles = `
    main .max-w-limit.mx-auto > div > .grid:first-of-type { margin-bottom: 2rem; }
    .ccx-mobile-container { width:100%;height:91px;display:flex;flex-flow:column;gap:10px;opacity:1;padding:12px 24px 12px 12px;background:#511E62;color:white;position:relative; }
    span.ccx-close-icon { text-align:right;margin-left:auto;width:12px;height:12px;opacity:1;color:#CDBAD2;position:absolute;top:1rem;right:1rem; }
    .ccx-mobile-container ol { list-style-type:disc;padding-left:2rem; }
    .ccx-mobile-container ol .ccx-mobile-list-item { font-family:inherit;font-weight:600;font-size:14px; }
    .ccx-desktop-container { display:none;background:#511E62;width:100%;color:white;opacity:1;padding:1rem 3rem; }
    ol.ccx-desktop-list { width:100%;display:flex;justify-content:space-between;gap:2rem; }
    li.ccx-desktop-list-item { display:flex;gap:0.75rem;align-items:center;flex:1;justify-content:center; }
    span.ccx-desktop-list-item__text { font-family:inherit;font-weight:600;font-size:16px;line-height:24px; }
    @media screen and (max-width:1023px){
        main > .max-w-limit > div:first-child {
            padding-top: 0 !important;
        }
    }
    @media screen and (min-width:1024px){
      .ccx-container{padding:0;}
      .ccx-mobile-container{display:none;}
      .ccx-desktop-container{display:flex;max-width:1504px;margin:0 auto;}
    }
  `;

    const customLog = (...msg) => {
        if (!LOG_ENABLED) return;
        console.log("%c" + msg.join(" "), "background:#2a1f60;color:white;padding:2px 6px;");
    };

    const waitForElement = (selector, interval = 300, maxAttempts = 50) =>
        new Promise((resolve, reject) => {
            let attempts = 0;
            const check = () => {
                const el = document.querySelector(selector);
                if (el) return resolve(el);
                if (++attempts >= maxAttempts) return reject("Not found: " + selector);
                setTimeout(check, interval);
            };
            check();
        });

    const addStyles = (css) => {
        if (!css || document.querySelector(".ccx-styles-hex-22-v2")) return;
        const style = document.createElement("style");
        style.className = "ccx-styles-hex-22-v2";
        style.textContent = css;
        document.head.appendChild(style);
        customLog("[addStyles] Injected.");
    };

    const ensureContainerPlacement = () => {
        const container = document.querySelector(".ccx-container");
        const nav = document.querySelector("nav");
        if (!container || !nav) return;
        if (nav.lastElementChild !== container) {
            nav.insertAdjacentElement("beforeend", container);
            customLog("[ensureContainerPlacement] Repositioned container inside <nav>.");
        }
    };

    const removeContainerIfPresent = () => {
        const container = document.querySelector(".ccx-container");
        if (container) {
            container.remove();
            customLog("[removeContainerIfPresent] Removed container (not fares page).");
        }
    };

    const createAndAttachContainers = () => {
        const params = new URLSearchParams(window.location.search);
        const direction = params.get("direction");
        const children = parseInt(params.get("children") || "0", 10);
        const hasChildren = children > 0;

        const BASE_USP = {
            icon: ICON_TRAIN,
            text: "Travel on any train on your selected date",
        };

        let USPList = [];
        if (direction === "fromHeathrow") {
            USPList = [
                BASE_USP,
                { icon: ICON_CLOCK, text: hasChildren ? "Kids under 15 travel free***" : "Trains run every 15 mins*" },
                { icon: ICON_SUN, text: "First train from Heathrow at 5:12am" },
            ];
        } else if (direction === "toHeathrow") {
            USPList = [
                BASE_USP,
                { icon: ICON_CLOCK, text: hasChildren ? "Kids under 15 travel free***" : "Trains run every 15 mins*" },
                { icon: ICON_SUN, text: "First train from Paddington at 4:34am" },
            ];
        } else {
            USPList = [BASE_USP];
        }

        const nav = document.querySelector("nav");
        if (!nav) {
            customLog("[createAndAttachContainers] <nav> not found.");
            return;
        }

        let wrapper = document.querySelector(".ccx-container");
        if (wrapper) {
            customLog("[createAndAttachContainers] Already exists, ensuring placement...");
            ensureContainerPlacement();
            return;
        }

        wrapper = document.createElement("div");
        wrapper.className = "ccx-container mx-auto";

        // --- Mobile ---
        const mobile = document.createElement("div");
        mobile.className = "ccx-mobile-container";
        const mobileList = document.createElement("ol");
        mobileList.className = "ccx-mobile-list";
        USPList.forEach((usp) => {
            const li = document.createElement("li");
            li.className = "ccx-mobile-list-item";
            li.textContent = usp.text;
            mobileList.appendChild(li);
        });
        mobile.appendChild(mobileList);

        const closeBtn = document.createElement("span");
        closeBtn.className = "ccx-close-icon";
        closeBtn.innerHTML = ICON_CLOSE;
        mobile.appendChild(closeBtn);

        // --- Desktop ---
        const desktop = document.createElement("div");
        desktop.className = "ccx-desktop-container";
        const desktopList = document.createElement("ol");
        desktopList.className = "ccx-desktop-list";
        USPList.forEach((usp) => {
            const li = document.createElement("li");
            li.className = "ccx-desktop-list-item";
            const iconSpan = document.createElement("span");
            iconSpan.className = "ccx-desktop-list-item__icon";
            iconSpan.innerHTML = usp.icon;
            const textSpan = document.createElement("span");
            textSpan.className = "ccx-desktop-list-item__text";
            textSpan.textContent = usp.text;
            li.append(iconSpan, textSpan);
            desktopList.appendChild(li);
        });
        desktop.appendChild(desktopList);

        wrapper.append(mobile, desktop);
        nav.insertAdjacentElement("beforeend", wrapper);

        closeBtn.addEventListener("click", () => {
            wrapper.remove();
            customLog("[closeBtn] Removed container.");
        });

        ensureContainerPlacement();
    };

    async function applyPageChanges() {
        try {
            const pathname = window.location.pathname || "";
            const isFaresPage = pathname.includes("/booking/fares");

            customLog(`[applyPageChanges] Checking route: ${pathname}`);

            if (!isFaresPage) {
                removeContainerIfPresent();
                return;
            }

            customLog("[applyPageChanges] On fares page — applying logic...");
            document.body.classList.add(BODY_CLASS);
            addStyles(styles);
            await waitForElement("nav");
            createAndAttachContainers();
            ensureContainerPlacement();
            customLog("[applyPageChanges] Complete ✅");
        } catch (err) {
            console.warn("[applyPageChanges] Error:", err);
        }
    }

    // --- SPA route detection ---
    function patchHistoryMethod(method) {
        const original = history[method];
        history[method] = function (...args) {
            const result = original.apply(this, args);
            window.dispatchEvent(new Event("locationchange"));
            return result;
        };
    }
    patchHistoryMethod("pushState");
    patchHistoryMethod("replaceState");
    window.addEventListener("popstate", () =>
        window.dispatchEvent(new Event("locationchange"))
    );

    window.addEventListener("locationchange", () => {
        customLog("[Router] Route changed:", window.location.pathname);
        setTimeout(() => applyPageChanges(), 300);
    });

    // --- Handle viewport changes ---
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            customLog("[Resize] Checking container placement after resize...");
            ensureContainerPlacement();
        }, 250);
    });

    // --- Initial run ---
    applyPageChanges();
})();
