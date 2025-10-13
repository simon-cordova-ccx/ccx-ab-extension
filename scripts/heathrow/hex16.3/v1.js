(function waitForButtonsAndModify() {
    const VARIATION = 'v3';

    const REPLACEMENTS = {
        v1: { bodyClass: 'ccx-hex-16-3-v1', replacementText: 'Find' },
        v2: { bodyClass: 'ccx-hex-16-3-v2', replacementText: 'Choose' },
        v3: { bodyClass: 'ccx-hex-16-3-v3', replacementText: 'Search for' },
    };

    const config = REPLACEMENTS[VARIATION] || REPLACEMENTS.v1;

    const SELECTOR =
        'main > .max-w-limit > section button .overflow-hidden.whitespace-nowrap.text-ellipsis.width-full';
    const POLL_INTERVAL = 300;
    const MAX_WAIT_MS = 10000;
    const start = performance.now();

    console.log('[FindYourTickets:' + VARIATION + '] Waiting for control elements...');

    document.body.classList.add(config.bodyClass);

    function checkAndRun() {
        const buttons = [].slice.call(document.querySelectorAll(SELECTOR)).filter(function (el) {
            return el.textContent.includes('Get Your');
        });

        if (buttons.length === 0) {
            const elapsed = Math.round(performance.now() - start);
            if (elapsed < MAX_WAIT_MS) {
                console.log('[FindYourTickets:' + VARIATION + '] Still waiting... (' + elapsed + 'ms elapsed)');
                return setTimeout(checkAndRun, POLL_INTERVAL);
            } else {
                console.warn('[FindYourTickets:' + VARIATION + '] Timed out — no matching buttons found.');
                return;
            }
        }

        console.log('[FindYourTickets:' + VARIATION + '] Found ' + buttons.length + " 'Get Your' button(s).");
        buttons.forEach(function (el, i) {
            console.log('[FindYourTickets:' + VARIATION + '] → Button ' + (i + 1) + ': "' + el.textContent.trim() + '"');
        });

        function replaceText(el) {
            if (!el) return;
            var currentText = el.textContent.trim();
            if (/^Get Your/i.test(currentText)) {
                var newText = currentText.replace(/^Get Your/, config.replacementText);
                if (newText !== currentText) {
                    console.log('[FindYourTickets:' + VARIATION + '] Updating text: "' + currentText + '" → "' + newText + '"');
                    el.textContent = newText;
                }
            }
        }

        console.log('[FindYourTickets:' + VARIATION + '] Performing initial replacements...');
        buttons.forEach(replaceText);

        var observer = new MutationObserver(function () {
            console.log('[FindYourTickets:' + VARIATION + '] Detected text change, re-checking...');
            buttons.forEach(replaceText);
        });

        buttons.forEach(function (el) {
            observer.observe(el, { characterData: true, subtree: true, childList: true });
            console.log('[FindYourTickets:' + VARIATION + '] Observing:', el);
        });

        console.log('[FindYourTickets:' + VARIATION + '] Observer active and text replacement live.');
    }

    checkAndRun();
})();
