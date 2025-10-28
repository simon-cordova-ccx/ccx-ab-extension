// TODO: CAROUSEL - UPDATE URLS AND IMAGES 

const LOG_ENABLED = true;
const TEST_NAME = "OZDE-9 | LP Trust Testing";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const styles = `
.ccx-omaze-de9-v1 {
  background: white;
  padding-bttom: 2rem;
}
.ccx-omaze-de9-v1__title {
  position: relative;
  width: max-content;
  text-transform: uppercase;
  letter-spacing: 0;
  background-image: linear-gradient(#FFDD00);
  background-repeat: no-repeat;
  background-size: 100% 4px;
  background-position: left calc(100% - 10px);
  padding-bottom: 0.2em;
  margin: 0 auto;
  text-transform: none;
  font-family: 'Gellix';
}
.ccx-omaze-de9-v1__slider {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 1rem;
  padding-bottom: 2rem;
}

/* Row of slides that moves left */
.ccx-omaze-de9-v1__slider-track {
  display: flex;
  gap: 32px;
  width: max-content;
  animation: ccx-scroll 20s linear infinite;
}

/* Individual slide items */
.ccx-omaze-de9-v1__slide {
  width: 166px;
  height: 90px;
  opacity: 1;
  padding: 8px;
  border-radius: 4px;
  border-width: 1px;
  border: 1px solid #000000;
  background: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Images */
.ccx-omaze-de9-v1__img {
  display: block;
  height: 64px;
  width: auto;
  object-fit: contain;
  filter: grayscale(100%);       /* optional style */
  opacity: 0.9;                  /* optional style */
}

/* Pause on hover (optional) */
.ccx-omaze-de9-v1__slider:hover .ccx-omaze-de9-v1__slider-track {
  // animation-play-state: paused;
}

/* Keyframes: slide entire track to the left by half its length (because we duplicated images) */
@keyframes ccx-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
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
  if (document.querySelector('.ccx-styles-de9-v1')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  // Create a new <style> element
  const style = document.createElement('style');
  style.classList.add('ccx-styles-de9-v1');
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

// --- Create container and images ---
const createContainer = () => {
  const ccxContainer = document.createElement('div');
  ccxContainer.classList.add('ccx-omaze-de9-v1');

  const ccxContainerTitle = document.createElement('h1');
  ccxContainerTitle.classList.add('ccx-omaze-de9-v1__title');
  ccxContainerTitle.textContent = 'Bekannt aus';
  ccxContainer.appendChild(ccxContainerTitle);

  // --- Slider container ---
  const sliderContainer = document.createElement('div');
  sliderContainer.classList.add('ccx-omaze-de9-v1__slider');
  sliderContainer.setAttribute('aria-label', 'Partner logos');
  sliderContainer.setAttribute('role', 'region');

  const sliderTrack = document.createElement('div');
  sliderTrack.classList.add('ccx-omaze-de9-v1__slider-track');

  // --- Image data (src + URL target) ---
  const images = [
    {
      src: 'https://cdn-eu.dynamicyield.com/api/9880449/images/dbe908c75a3e.png',
      link: 'https://www.ardmediathek.de/video/abendschau/soziallotterie-villa-verlosung-fuer-den-guten-zweck/br/Y3JpZDovL2JyLmRlL2Jyb2FkY2FzdC9GMjAyNFdPMDE3MDI4QTAvc2VjdGlvbi9hMGViYTFkOC1hNmU3LTRiYjgtODMwNC02ZDE1YThmOGE4OTQ',
    },
    {
      src: 'https://cdn-eu.dynamicyield.com/api/9880449/images/490e02a026e8.png',
      link: 'https://www.mdr.de/nachrichten/sachsen/dresden/dresden-radebeul/gewinn-soziallotterie-porsche-glueck-100.html',
    },
    {
      src: 'https://cdn-eu.dynamicyield.com/api/9880449/images/e27c673dd893.png',
      link: 'https://www.nordkurier.de/regional/mueritz/neue-lotterie-wirbt-mit-diesem-traumhaus-in-mv-doch-was-steckt-hinter-dem-gewinn-3657498',
    },
  ];

  // --- Helper to add images to the track ---
  const addImages = (arr) => {
    arr.forEach((item, i) => {
      const imgWrap = document.createElement('div');
      imgWrap.classList.add('ccx-omaze-de9-v1__slide');

      const img = document.createElement('img');
      img.classList.add('ccx-omaze-de9-v1__img');
      img.src = item.src;
      img.alt = 'Slide'; // ← no template literal
      img.dataset.index = i; // For listener lookup
      img.dataset.link = item.link; // Store click URL

      imgWrap.appendChild(img);
      sliderTrack.appendChild(imgWrap);
    });
  };

  // Append and duplicate for looping effect
  addImages(images);
  addImages(images);

  sliderContainer.appendChild(sliderTrack);
  ccxContainer.appendChild(sliderContainer);

  return ccxContainer;
};

// --- Isolated event listener setup ---
const attachEventListeners = (containerEl) => {
  if (!containerEl) {
    console.warn('[attachEventListeners] No container element provided.');
    return;
  }

  const imgs = containerEl.querySelectorAll('.ccx-omaze-de9-v1__img');
  console.log('[attachEventListeners] Found ' + imgs.length + ' images to attach handlers.');

  imgs.forEach((img) => {
    const url = img.dataset.link;
    if (!url) {
      console.warn('[attachEventListeners] Missing link for image:', img);
      return;
    }

    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      console.log('[attachEventListeners] Image clicked:', url);
      window.open(url, '_blank', 'noopener');
    });
  });
};

const init = () => {
  try {
    customLog(TEST_NAME + ' | ' + VARIATION);
    customLog('[init] Current URL: ' + CURRENT_URL);

    document.body.classList.add('ccx-omaze-de9-v1');
    customLog('[init] Added class ccx-omaze-de9-v1 to body');

    waitForElements(
      [
        { selector: '.hero-mobile-addendum', count: 1 }
      ],
      function (results) {
        console.log(results);
        addStyles(styles);

        const CONTROL_HERO_ADDENDUM = results[0].elements[0];
        if (!CONTROL_HERO_ADDENDUM) {
          customLog('[init] Login element not found');
          return;
        }

        const CCX_CONTAINER = createContainer();
        CONTROL_HERO_ADDENDUM.insertAdjacentElement('afterend', CCX_CONTAINER);

        const CCX_SLIDER_CONTAINER = document.querySelector('.ccx-omaze-de9-v1__slider');
        if (CCX_SLIDER_CONTAINER) {
          attachEventListeners(CCX_CONTAINER);
        }
      }
    );

  } catch (error) {
    customLog(error.message);
  }
}

init();
