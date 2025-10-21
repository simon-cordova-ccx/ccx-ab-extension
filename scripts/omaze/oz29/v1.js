const LOG_ENABLED = true;
const TEST_NAME = "OZ29 | OZ29 - Subs Cancellation Friction on Cancel Click";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const images = {
  logo: 'https://cdn-eu.dynamicyield.com/api/9880449/images/55caf913cc71.png',
  logoFinal: 'https://cdn-eu.dynamicyield.com/api/9880449/images/3713eb6555ad.png',
}

const styles = `
.oz29-slider-root {
    position: fixed !important;      /* fixed to the viewport */
    inset: 0 !important;             /* top/right/bottom/left = 0 */
    width: 100vw !important;
    height: 100vh !important;
    z-index: 2147483647 !important;  /* highest possible */
    background: rgba(0,0,0,0.75);    /* optional dark backdrop */
    display: none;                   /* hidden until opened */
    overflow-y: auto;                /* scroll if content overflows */
    -webkit-overflow-scrolling: touch;
    padding: 0;
}
.oz29-slider-root.show { display: flex; }   /* show when .show is added */

.oz29-slider {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;         /* start at top on mobile */
    box-sizing: border-box;
}

/* keep the card 100% of the viewport but give it a max-width for tablets */
.oz29-card {
    width: 100%;
    max-width: 420px;
    margin: auto;
    border-radius: 0;
    height: auto;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 2rem;
}
.oz29-progress {
  display:flex; gap:12px; justify-content:center; margin-bottom:24px;
}
.oz29-progress-dot {
  width:42px; height:6px; border-radius:6px;
  background: white;
  transition: background .3s ease;
}
.oz29-logo { width:104px; margin:0 auto 24px; }
.oz29-hero {
  font-family: Gellix;
  font-weight: 700;
  font-size: 25px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  color: #081F28;
}
.step-4 .oz29-hero {
  color: white;
}
.oz29-hero span {
  font-family: Gellix;
  font-weight: 700;
  font-size: 25px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
}
.oz29-icon-container {
  width:180px; height:180px; margin:32px auto;
  border-radius:50%; background:#fff; display:flex;
  align-items:center; justify-content:center;
}
.oz29-icon { width:110px; height:110px; object-fit:contain; }
.oz29-subcopy {
  font-family: Gellix;
  font-weight: 700;
  font-size: 27px;
  line-height: 100%;
  text-align: center;
  color: #081F28;
}
.oz29-cta {
  border: none;
  padding: 14px 0;
  margin: 0 auto;
  margin-top: 32px;
  height: 48px;
  border-radius: 76px;
  opacity: 1;
  padding-top: 10px;
  padding-right: 24px;
  padding-bottom: 11px;
  padding-left: 24px;
  font-family: Gellix;
  font-weight: 700;
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  width: 250px;
  background: #081F28;
  color: white;
}
.oz29-card.step-4 .oz29-cta {
  width: auto;
  background: #FFDD00;
  color: #081F28;
}
.oz29-step-4-skip-button {
  background: none;
  border: none;
  margin-top: 16px;
  font-family: Gellix;
  font-weight: 500;
  color: #FFFFFF;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  text-decoration: none;
}
.oz29-card.step-4 {
  color:#fff;
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
  if (document.querySelector('.ccx-styles-oz29')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  // Create a new <style> element
  const style = document.createElement('style');
  style.classList.add('ccx-styles-oz29');
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

const sliderSteps = [
  {
    name: 'Step 1',
    heroCopy: 'Welcome back, !!!!',
    subCopy: 'You\'ve helped raise millions for incredible UK charities... and we\'re just getting started.',
    icon: 'https://cdn-eu.dynamicyield.com/api/9880449/images/52cadc1d39a8.gif',
    buttonText: 'Continue',
    progressColor: '#081F28',
    background: 'linear-gradient(180deg, #FFEB00 0%, #FFE600 100%)',
    topLogo: images.logo,
  },
  {
    name: 'Step 2',
    heroCopy: 'We love having you here',
    subCopy: 'You\'ve made a real difference transforming lives and increasing awareness.',
    icon: 'https://cdn-eu.dynamicyield.com/api/9880449/images/ab9ad66c9197.gif',
    buttonText: 'Continue',
    progressColor: '#081F28',
    background: 'linear-gradient(180deg, #FFEB00 0%, #FFE600 100%)',
    topLogo: images.logo,
  },
  {
    name: 'Step 3',
    heroCopy: 'You\'re a lifesaver',
    subCopy: 'Together, we\'re saving lives and creating a world where everyone has a chance.',
    icon: 'https://cdn-eu.dynamicyield.com/api/9880449/images/0c5106a81acc.gif',
    buttonText: 'Continue',
    progressColor: '#081F28',
    background: 'linear-gradient(180deg, #FFEB00 0%, #FFE600 100%)',
    topLogo: images.logo,
  },
  {
    name: 'Step 4',
    heroCopy: 'Thank you for being part of the <span style="color: #F5CD31;">Omaze Community!</span>',
    subCopy: "Here's your extra boost... <strong>30 FREE ENTRIES</strong> into the Cornwall House Draw!",
    icon: 'https://example.com/icons/confetti.svg',
    buttonText: 'Yes Please',
    progressColor: '#F5CD31',
    background: 'linear-gradient(180deg, #0B0F26 0%, #041440 100%)',
    topLogo: images.logoFinal,
    metaCopy: 'Skip',
  },
];

const createOmazeOnboardingSlider = (rootSelector, steps) => {
  const root = document.querySelector(rootSelector);
  if (!root) return null;

  root.innerHTML = `
    <div class="oz29-slider">
      <div class="oz29-card">
        <div class="oz29-progress">
          ${steps.map(() => '<span class="oz29-progress-dot"></span>').join('')}
        </div>
        <img class="oz29-logo" alt="Omaze logo" />
        <h2 class="oz29-hero"></h2>
        <div class="oz29-icon-container">
          <img class="oz29-icon" alt="" />
        </div>
        <p class="oz29-subcopy"></p>
        <button class="oz29-cta"></button>
        <button class="oz29-step-4-skip-button"></button>
      </div>
    </div>
  `;

  const els = {
    container: root.querySelector('.oz29-card'),
    dots: [...root.querySelectorAll('.oz29-progress-dot')],
    logo: root.querySelector('.oz29-logo'),
    hero: root.querySelector('.oz29-hero'),
    icon: root.querySelector('.oz29-icon'),
    iconWrap: root.querySelector('.oz29-icon-container'),
    subcopy: root.querySelector('.oz29-subcopy'),
    cta: root.querySelector('.oz29-cta'),
    meta: root.querySelector('.oz29-step-4-skip-button'),
  };

  let currentStep = 0;

  const applyStep = (index) => {
    const step = steps[index];
    if (!step) return;

    currentStep = index;
    els.container.className = 'oz29-card step-' + (index + 1);
    els.container.style.background = step.background;
    els.logo.src = step.topLogo;
    // els.hero.textContent = step.heroCopy;
    els.hero.innerHTML = step.heroCopy;
    els.subcopy.innerHTML = step.subCopy;
    els.icon.src = step.icon;
    els.cta.textContent = step.buttonText;
    els.meta.textContent = step.metaCopy || '';
    els.meta.style.display = step.metaCopy ? 'inline-block' : 'none';

    els.dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx <= index);
      dot.style.backgroundColor = idx <= index ? step.progressColor : 'rgba(255,255,255)';
    });
  };

  // els.cta.addEventListener('click', () => {
  //   if (currentStep < steps.length - 1) {
  //     applyStep(currentStep + 1);
  //   } else {
  //     customLog('[oz29-slider] Reached final step.');
  //   }
  // });

  applyStep(currentStep);

  return {
    setStep: applyStep,
    next: () => applyStep(Math.min(currentStep + 1, steps.length - 1)),
    getStep: () => currentStep,
  };
};

const init = () => {
  try {
    customLog(TEST_NAME + ' | ' + VARIATION);
    customLog('[init] Current URL: ' + CURRENT_URL);

    document.body.classList.add('ccx-omaze-oz29');
    customLog('[init] Added class ccx-omaze-oz29 to body');

    waitForElements(
      [
        { selector: '[onclick*=cancelSubscription]', count: 1 },
      ],
      function (results) {
        console.log(results);
        addStyles(styles);

        const CONTROL_CANCEL_SUBSCRIPTION_LINK = results[0]?.elements[0];

        if (CONTROL_CANCEL_SUBSCRIPTION_LINK) {
          CONTROL_CANCEL_SUBSCRIPTION_LINK.style.display = 'none';

          const CCX_CANCEL_SUBSCRIPTION_LINK = document.createElement('a');
          CCX_CANCEL_SUBSCRIPTION_LINK.classList.add('ccx-oz29-cancel-subscription-link', 'black-underline-btn');
          CCX_CANCEL_SUBSCRIPTION_LINK.textContent = 'Cancel this subscription';
          CONTROL_CANCEL_SUBSCRIPTION_LINK.insertAdjacentElement('afterend', CCX_CANCEL_SUBSCRIPTION_LINK);
          CCX_CANCEL_SUBSCRIPTION_LINK.addEventListener('click', (e) => {
            e.preventDefault();

            // ---- 1. CREATE (or reuse) THE ROOT ----
            let root = document.getElementById('oz29-slider-root');
            if (!root) {
              root = document.createElement('div');
              root.id = 'oz29-slider-root';
              root.className = 'oz29-slider-root';   // styles are already injected
              document.body.appendChild(root);
            }

            // ---- 2. SHOW THE MODAL ----
            root.classList.add('show');
            document.body.style.overflow = 'hidden';   // stop page scroll

            // ---- 3. BUILD THE SLIDER ----
            const sliderAPI = createOmazeOnboardingSlider('#oz29-slider-root', sliderSteps);

            // ---- 4. CLOSE LOGIC (skip button, final CTA, Esc, backdrop click) ----
            const closeModal = () => {
              root.classList.remove('show');
              document.body.style.overflow = '';
              // optional: remove the root after animation finishes
              setTimeout(() => root.remove(), 350);
            };

            // • Skip link (only on step 4)
            const metaBtn = root.querySelector('.oz29-step-4-skip-button');
            if (metaBtn) metaBtn.onclick = closeModal;

            // • Final CTA – you probably want to continue the original flow
            const finalCTA = () => {
              customLog('[oz29-slider] Final CTA clicked – closing slider');
              closeModal();
              // If you need to actually cancel the subscription, fire the original link:
              // CONTROL_CANCEL_SUBSCRIPTION_LINK.click();
            };
            // Hook the last step’s button
            const ctaBtn = root.querySelector('.oz29-cta');
            ctaBtn.onclick = () => {
              if (sliderAPI.getStep() === sliderSteps.length - 1) finalCTA();
              else sliderAPI.next();
            };

            // • Click outside the card
            root.addEventListener('click', (ev) => {
              if (ev.target === root) closeModal();
            });

            // • Escape key
            const escHandler = (ev) => { if (ev.key === 'Escape') closeModal(); };
            document.addEventListener('keydown', escHandler);

            // clean-up when removed
            root.addEventListener('transitionend', () => {
              if (!root.classList.contains('show')) {
                document.removeEventListener('keydown', escHandler);
              }
            });
          });
        }
      }
    );

  } catch (error) {
    customLog(error.message);
  }
}

init();
