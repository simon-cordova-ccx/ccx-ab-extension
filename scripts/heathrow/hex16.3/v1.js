(function waitForButtonsAndModify() {
  const VARIATION = 'v3';

  const REPLACEMENTS = {
    v1: { bodyClass: 'ccx-hex-16-3-v1', replacementText: 'Find' },
    v2: { bodyClass: 'ccx-hex-16-3-v2', replacementText: 'Choose' },
    v3: { bodyClass: 'ccx-hex-16-3-v3', replacementText: 'Search for' },
  };

  const config = REPLACEMENTS[VARIATION] || REPLACEMENTS.v1;

  const POLL_INTERVAL = 300;
  const MAX_WAIT_MS = 10000;
  const start = performance.now();

  console.log('[FindYourTickets:' + VARIATION + '] Waiting for buttons with inner div "Get Your Ticket"...');

  document.body.classList.add(config.bodyClass);

  function findTargetDivs() {
    const matches = [];
    const buttons = Array.from(document.querySelectorAll('button'));
    buttons.forEach(button => {
      // find any descendant divs
      const divs = Array.from(button.querySelectorAll('div'));
      divs.forEach(div => {
        if (div.textContent && div.textContent.trim() === 'Get Your Ticket') {
          matches.push(div);
        }
      });
    });
    return matches;
  }

  function replaceText(divEl) {
    if (!divEl) return;
    const currentText = divEl.textContent.trim();
    // Match exact "Get Your Ticket" (case-insensitive)
    if (/^Get Your Ticket$/i.test(currentText)) {
      const newText = currentText.replace(/^Get Your/i, config.replacementText);
      if (newText !== currentText) {
        console.log('[FindYourTickets:' + VARIATION + '] Updating text: "' + currentText + '" → "' + newText + '"');
        divEl.textContent = newText;
      }
    }
  }

  function checkAndRun() {
    const divs = findTargetDivs();

    if (divs.length === 0) {
      const elapsed = Math.round(performance.now() - start);
      if (elapsed < MAX_WAIT_MS) {
        console.log('[FindYourTickets:' + VARIATION + '] Still waiting... (' + elapsed + 'ms elapsed)');
        return setTimeout(checkAndRun, POLL_INTERVAL);
      } else {
        console.warn('[FindYourTickets:' + VARIATION + '] Timed out — no matching divs found inside buttons.');
        return;
      }
    }

    console.log('[FindYourTickets:' + VARIATION + '] Found ' + divs.length + " div(s) with exact text 'Get Your Ticket' inside buttons.");
    divs.forEach((d, i) => {
      console.log('[FindYourTickets:' + VARIATION + '] → Match ' + (i + 1) + ': "' + d.textContent.trim() + '"');
    });

    // Initial replacement
    divs.forEach(replaceText);

    // Observe each matched div for text changes
    const observer = new MutationObserver(mutations => {
      // re-run replacement on the observed div(s) when they change
      mutations.forEach(m => {
        const target = m.target.nodeType === Node.TEXT_NODE ? m.target.parentNode : m.target;
        if (target && target.nodeType === Node.ELEMENT_NODE) {
          // If it's one of our tracked divs (or a child change), attempt replacement
          replaceText(target.closest ? target.closest('div') || target : target);
        }
      });
    });

    divs.forEach(divEl => {
      observer.observe(divEl, { characterData: true, subtree: true, childList: true });
      console.log('[FindYourTickets:' + VARIATION + '] Observing div:', divEl);
    });

    console.log('[FindYourTickets:' + VARIATION + '] Initial replacements done and observers attached.');
  }

  checkAndRun();
})();
