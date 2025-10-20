(function waitForButtonsAndModify() {
  const VARIATION = 'v1';

  // console.log('CCX - 16.3', VARIATION);

  const REPLACEMENTS = {
    v1: { bodyClass: 'ccx-hex-16-3-v1', replacementText: 'Find' },
    v2: { bodyClass: 'ccx-hex-16-3-v2', replacementText: 'Choose' },
    v3: { bodyClass: 'ccx-hex-16-3-v3', replacementText: 'Search for' },
  };

  const config = REPLACEMENTS[VARIATION] || REPLACEMENTS.v1;

  const POLL_INTERVAL = 300;
  const MAX_WAIT_MS = 10000;
  const start = performance.now();

  // console.log(`[FindYourTickets:${VARIATION}] Waiting for buttons with inner div "Get Your Ticket"...`);

  document.body.classList.add(config.bodyClass);
  // console.log(`[FindYourTickets:${VARIATION}] Added body class: ${config.bodyClass}`);

  function findTargetDivs() {
    // console.log(`[FindYourTickets:${VARIATION}] Running findTargetDivs()`);
    const matches = [];
    const buttons = Array.from(document.querySelectorAll('button'));
    // console.log(`[FindYourTickets:${VARIATION}] Found ${buttons.length} button(s) on page`);

    buttons.forEach((button, bIndex) => {
      const divs = Array.from(button.querySelectorAll('div'));
      divs.forEach((div, dIndex) => {
        if (div.textContent && (div.textContent.trim() === 'Get Your Ticket' || div.textContent.trim() === 'Get Your Tickets')) {
          matches.push(div);
          // console.log(`[FindYourTickets:${VARIATION}] → Match found in button ${bIndex + 1}, div ${dIndex + 1}: "${div.textContent.trim()}"`);
        }
      });
    });

    // console.log(`[FindYourTickets:${VARIATION}] Total matches found: ${matches.length}`);
    return matches;
  }

  function replaceText(divEl) {
    if (!divEl) {
      console.warn(`[FindYourTickets:${VARIATION}] replaceText called with null or undefined div`);
      return;
    }
    const currentText = divEl.textContent.trim();
    if (/^Get Your Tickets?$/i.test(currentText)) {
      const newText = currentText.replace(/^Get Your/i, config.replacementText);
      if (newText !== currentText) {
        // console.log(`[FindYourTickets:${VARIATION}] Updating text: "${currentText}" → "${newText}"`);
        divEl.textContent = newText;
      } else {
        // console.log(`[FindYourTickets:${VARIATION}] No change needed for div text: "${currentText}"`);
      }
    } else {
      // console.log(`[FindYourTickets:${VARIATION}] div text does not match exact "Get Your Ticket": "${currentText}"`);
    }
  }

  function checkAndRun() {
    // console.log(`[FindYourTickets:${VARIATION}] Running checkAndRun()`);
    const divs = findTargetDivs();

    if (divs.length === 0) {
      const elapsed = Math.round(performance.now() - start);
      if (elapsed < MAX_WAIT_MS) {
        // console.log(`[FindYourTickets:${VARIATION}] Still waiting... (${elapsed}ms elapsed)`);
        return setTimeout(checkAndRun, POLL_INTERVAL);
      } else {
        console.warn(`[FindYourTickets:${VARIATION}] Timed out — no matching divs found inside buttons.`);
        return;
      }
    }

    // console.log(`[FindYourTickets:${VARIATION}] Found ${divs.length} div(s) with exact text 'Get Your Ticket' inside buttons.`);
    divs.forEach((d, i) => {
      // console.log(`[FindYourTickets:${VARIATION}] → Match ${i + 1}: "${d.textContent.trim()}"`);
    });

    // console.log(`[FindYourTickets:${VARIATION}] Performing initial replacements...`);
    divs.forEach(replaceText);

    // console.log(`[FindYourTickets:${VARIATION}] Setting up MutationObservers for changes...`);
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        const target = m.target.nodeType === Node.TEXT_NODE ? m.target.parentNode : m.target;
        if (target && target.nodeType === Node.ELEMENT_NODE) {
          // console.log(`[FindYourTickets:${VARIATION}] Mutation detected on div: "${target.textContent.trim()}"`);
          replaceText(target.closest ? target.closest('div') || target : target);
        }
      });
    });

    divs.forEach(divEl => {
      observer.observe(divEl, { characterData: true, subtree: true, childList: true });
      // console.log(`[FindYourTickets:${VARIATION}] Observing div: "${divEl.textContent.trim()}"`);
    });

    // console.log(`[FindYourTickets:${VARIATION}] Initial replacements done and observers attached.`);
  }

  checkAndRun();
})();