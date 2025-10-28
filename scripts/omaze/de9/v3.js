const LOG_ENABLED = true;
const TEST_NAME = "OZDE-9 | LP Trust Testing";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "variation-3";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const styles = `
.ccx-container {
    background: #081F28;
    color: white;
    font-family: Showtime;
    font-weight: 500;
    font-size: 36px;
    line-height: 40px;
    letter-spacing: 0;
    text-align: center;
    vertical-align: middle;
    text-transform: uppercase;
}
.ccx-container__title {
    color: #F5F5F5;
    margin-bottom: 1rem;
    padding: 1rem;
    padding-bottom: 0;
}
.ccx-container__paragraph {
  font-family: Gellix;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0;
  text-align: center;
  vertical-align: middle;
  padding: 0 1rem;
  text-transform: none;
}
.ccx-container__paragraph span {
  color: #FFDD00;
  font-weight: 700;
}

.ccx-container__video-container {
  position: relative;
  width: 100%;
  height: 380px;
  background-image: url('https://cdn-eu.dynamicyield.com/api/9880449/images/dd4521e755b9.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ccx-container__video {
  width: 100%;
  height: 100%;
  opacity: 0.9;
  object-fit: cover;
}

.ccx-container__polygon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.ccx-container__polygon:hover {
  transform: translate(-50%, -50%) scale(1.1);
  opacity: 0.8;
}
`;

const IMAGE_ONE = 'https://cdn-eu.dynamicyield.com/api/9880449/images/dd4521e755b9.jpg';

const POLYGON = `<svg width="65" height="73" viewBox="0 0 65 73" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_6724_1052)">
<path d="M60.25 32.476L4 64.9519L4 -2.45877e-06L60.25 32.476Z" fill="white"/>
</g>
<defs>
<filter id="filter0_d_6724_1052" x="0" y="0" width="64.25" height="72.9519" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6724_1052"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6724_1052" result="shape"/>
</filter>
</defs>
</svg>`;

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

const VIDEO_URL = '';

const addStyles = (css) => {
  customLog('[addStyles] Starting the addStyles function...');

  if (!css) return;

  if (!css) {
    customLog('[addStyles] No CSS provided');
    return;
  }

  // Check if the style tag already exists
  if (document.querySelector('.ccx-styles-de9-v3')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  // Create a new <style> element
  const style = document.createElement('style');
  style.classList.add('ccx-styles-de9-v3');
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

const createContainer = () => {
  const ccxContainer = document.createElement('div');
  ccxContainer.classList.add('ccx-container');

  const ccxContainerTitle = document.createElement('h1');
  ccxContainerTitle.classList.add('ccx-container__title');
  ccxContainerTitle.textContent = 'Lerne unseren Gewinner des Plauer-See-Hauses kennen';
  ccxContainer.appendChild(ccxContainerTitle);

  const ccxParagraph = document.createElement("p");
  ccxParagraph.classList.add("ccx-container__paragraph");
  const ccxParagraphTextInitial = document.createTextNode("Schau dir an, wie ");
  const ccxSpan = document.createElement("span");
  const ccxSpanText = document.createTextNode("Burak B. aus Berlin ");
  const ccxParagraphTextRemaining = document.createTextNode(" erfährt, dass er das Haus am Plauer See gewonnen hat.");

  ccxSpan.appendChild(ccxSpanText);
  ccxParagraph.appendChild(ccxParagraphTextInitial);
  ccxParagraph.appendChild(ccxSpan);
  ccxParagraph.appendChild(ccxParagraphTextRemaining);

  ccxContainer.appendChild(ccxParagraph);

  const ccxVideoContainer = document.createElement("div");
  ccxVideoContainer.classList.add("ccx-container__video-container");
  const ccxVideo = document.createElement("video");
  ccxVideo.classList.add("ccx-container__video");
  ccxVideo.src = VIDEO_URL || "";
  ccxVideo.controls = false;
  ccxVideoContainer.appendChild(ccxVideo);

  const ccxPolygonWrapper = document.createElement("div");
  ccxPolygonWrapper.classList.add("ccx-container__polygon");
  ccxPolygonWrapper.innerHTML = POLYGON;
  ccxVideoContainer.appendChild(ccxPolygonWrapper);

  ccxContainer.appendChild(ccxVideoContainer);

  return ccxContainer;
};

const attachEventListeners = () => {
  const CCX_VIDEO_PLAY_BUTTON = document.querySelector('.ccx-container__polygon');
  const CCX_VIDEO = document.querySelector('.ccx-container__video');

  if (CCX_VIDEO && CCX_VIDEO_PLAY_BUTTON) {
    CCX_VIDEO_PLAY_BUTTON.addEventListener("click", () => {
      if (CCX_VIDEO.paused) {
        customLog('[attachEventListeners] Play button clicked');
        CCX_VIDEO.play();
        CCX_VIDEO_PLAY_BUTTON.style.display = "none";
      } else {
        customLog('[attachEventListeners] Pause button clicked');
        CCX_VIDEO.pause();
        CCX_VIDEO_PLAY_BUTTON.style.display = "block";
      }
    });
  }
}

const updateLiveRentSellHeader = () => {
  // live-rent-sell > h1
  const liveRentSellHeader = document.querySelector('live-rent-sell > h1');

  if (!liveRentSellHeader) {
    customLog('[updateLiveRentSellHeader] live-rent-sell header not found');
    return;
  }

  if (liveRentSellHeader) {
    liveRentSellHeader.textContent = 'EXPLORE THE LANDHAUS IN OBERBAYERN';
  }
}

const init = () => {
  try {
    customLog(TEST_NAME + ' | ' + VARIATION);
    customLog('[init] Current URL: ' + CURRENT_URL);

    document.body.classList.add('ccx-omaze-oz-de9-' + VARIATION);
    customLog('[init] Added class ccx-container to body');

    waitForElements(
      [
        { selector: '.hero-mobile-addendum', count: 1 }
      ],
      function (results) {
        console.log(results);
        addStyles(styles);

        // const CONTROL_ELEMENT_LOGIN = document.querySelector('#begin-checkout a[href*="/account/login"]');
        const CONTROL_HERO_ADDENDUM = results[0].elements[0];
        if (!CONTROL_HERO_ADDENDUM) {
          customLog('[init] Login element not found');
          return;
        }

        const CCX_CONTAINER = createContainer();
        CONTROL_HERO_ADDENDUM.insertAdjacentElement('afterend', CCX_CONTAINER);
        attachEventListeners();

        updateLiveRentSellHeader();
      }
    );

  } catch (error) {
    customLog(error.message);
  }
}

init();
