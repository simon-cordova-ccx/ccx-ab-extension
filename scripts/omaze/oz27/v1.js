const LOG_ENABLED = false;
const TEST_NAME = "OZ-27 | Social Proof in LP Hero Section";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const SELECTORS = {
  CONTROL_HOME_BANNER: '.home--banner',
}

const IMAGES = {
  image1: 'https://cdn-eu.dynamicyield.com/api/9880449/images/b424ee2ca29d.png',
  image2: 'https://cdn-eu.dynamicyield.com/api/9880449/images/61eddeb9d1eb.png',
  image3: 'https://cdn-eu.dynamicyield.com/api/9880449/images/f8e77cc7acac.png',
  image4: 'https://cdn-eu.dynamicyield.com/api/9880449/images/636939c668f5.png',
}

const SLIDE_DATA = [
  {
    image: IMAGES.image1,
    name: 'James,',
    mainText: "\"Things like this just don't happen to people where I'm from. When I was a cabbie, I used to drop people off at incredible homes, now I've got one of my own.\"",
    userInfo: 'a retired cabbie, won a £4M house in Sussex.'
  },
  {
    image: IMAGES.image2,
    name: 'Hillary,',
    mainText: "\"I'm an English teacher, but you don't need to be a maths teacher to work out that £20 for an incredible £5,000,000 home is an exceptional return!\"",
    userInfo: 'an English teacher, won a £5M house in London.'
  },
  {
    image: IMAGES.image3,
    name: 'Lisa,',
    mainText: "\"We've worked so hard to try and save enough to pay off our mortgage and retire comfortably. Now, seeing our new home, I don't think we could get much more comfortable than this.\"",
    userInfo: 'a former nurse, won a £4.5M house in Cornwall.'
  },
  {
    image: IMAGES.image4,
    name: 'Roger,',
    mainText: "\"We'd been trying to save enough for a deposit so we could get a mortgage, but now we'll never even need one. Turns out all we needed was my £35 Omaze entry and a big slice of luck.\"",
    userInfo: 'dad-to-be, won a £4.5M house in London.'
  }
];

const ARROW_LEFT = `<svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.82747 7.00414L6.75663 1.97199C6.92428 1.80083 7.00532 1.59829 6.99973 1.36437C6.99414 1.13045 6.90752 0.927904 6.73986 0.756742C6.5722 0.585581 6.37381 0.5 6.14467 0.5C5.91554 0.5 5.71714 0.585581 5.54949 0.756742L0.402379 6.02852C0.268252 6.16545 0.167658 6.31949 0.100595 6.49066C0.0335312 6.66182 0 6.83298 0 7.00414C0 7.1753 0.0335312 7.34646 0.100595 7.51763C0.167658 7.68879 0.268252 7.84283 0.402379 7.97976L5.56625 13.2515C5.73391 13.4227 5.92951 13.5054 6.15306 13.4997C6.3766 13.494 6.5722 13.4056 6.73986 13.2344C6.90752 13.0633 6.99135 12.8607 6.99135 12.6268C6.99135 12.3929 6.90752 12.1903 6.73986 12.0192L1.82747 7.00414Z" fill="white"/>
</svg>`;

const ARROW_RIGHT = `<svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(180deg);">
  <path d="M1.82747 7.00414L6.75663 1.97199C6.92428 1.80083 7.00532 1.59829 6.99973 1.36437C6.99414 1.13045 6.90752 0.927904 6.73986 0.756742C6.5722 0.585581 6.37381 0.5 6.14467 0.5C5.91554 0.5 5.71714 0.585581 5.54949 0.756742L0.402379 6.02852C0.268252 6.16545 0.167658 6.31949 0.100595 6.49066C0.0335312 6.66182 0 6.83298 0 7.00414C0 7.1753 0.0335312 7.34646 0.100595 7.51763C0.167658 7.68879 0.268252 7.84283 0.402379 7.97976L5.56625 13.2515C5.73391 13.4227 5.92951 13.5054 6.15306 13.4997C6.3766 13.494 6.5722 13.4056 6.73986 13.2344C6.90752 13.0633 6.99135 12.8607 6.99135 12.6268C6.99135 12.3929 6.90752 12.1903 6.73986 12.0192L1.82747 7.00414Z" fill="white"/>
</svg>`;

let slideIndex = 1;
let slideshowContainer;

function showSlides(n, container) {
  const slides = container.querySelectorAll('.mySlides');
  // Dots are in the wrapper, not the container
  const wrapper = container.closest('.slideshow-wrapper');
  const dots = wrapper ? wrapper.querySelectorAll('.dot') : [];

  if (!slides.length) {
    customLog('[showSlides] No slides found', { slides: slides.length, dots: dots.length });
    return;
  }

  const total = slides.length;

  // Proper modulo wrap: Handles negative, beyond bounds
  slideIndex = ((n - 1 + total) % total) + 1;
  customLog('[showSlides] Calculated index', slideIndex, 'for total', total);

  // Hide all
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    slide.setAttribute('aria-hidden', 'true');
  });
  dots.forEach(dot => dot.classList.remove('active'));

  // Show active with safety check
  const activeIndex = slideIndex - 1;
  if (activeIndex >= 0 && activeIndex < total) {
    const activeSlide = slides[activeIndex];
    if (activeSlide) {
      activeSlide.classList.add('active');
      activeSlide.setAttribute('aria-hidden', 'false');
    }
    const activeDot = dots[activeIndex];
    if (activeDot) {
      activeDot.classList.add('active');
    }
  } else {
    customLog('[showSlides] Invalid activeIndex', activeIndex);
  }
}

function plusSlides(n, container) {
  showSlides(slideIndex + n, container);
}

function currentSlide(n, container) {
  showSlides(n, container);
}

const bindSlideshowEvents = (wrapper) => {
  const container = wrapper.querySelector('.slideshow-container');
  if (!container) {
    customLog('[bindEvents] Container not found');
    return;
  }

  // Make wrapper focusable first
  wrapper.tabIndex = 0;

  // Delegation with preventDefault
  wrapper.addEventListener('click', (e) => {
    const target = e.target.closest('.prev, .next, .dot');
    if (!target) return;

    e.preventDefault();
    e.stopPropagation();
    customLog('[click] Detected on', target.className);

    if (target.classList.contains('prev')) {
      plusSlides(-1, container);
    } else if (target.classList.contains('next')) {
      plusSlides(1, container);
    } else if (target.classList.contains('dot')) {
      const index = parseInt(target.dataset.index, 10);
      if (index) currentSlide(index, container);
    }
  });

  // Keyboard nav
  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      plusSlides(-1, container);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      plusSlides(1, container);
    }
  });
};

const styles = `
.slideshow-wrapper {
  padding: 1rem;
  padding-bottom: 0;
  background: white;
}

.mySlides {
  display: flex;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  color: white;
  background: #081F28;
  transition: opacity 0.6s ease;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  align-items: center;
}

.mySlides.active {
  opacity: 1;
  visibility: visible;
  position: relative;
}

/* Slideshow container */
.slideshow-container {
  background: #081F28;
  display: flex;
  padding: 1rem 1rem;
  border-radius: 20px;
  box-sizing: border-box;
  position: relative;
  min-height: 150px;
}

/* Slide content layout */
.slide-content {
  display: flex;
  flex-direction: row;
}

/* Left side: Image */
.slide-image {
  flex-basis: 25%;
}

.slide-image img {
  width: 60px;
  height: 60px;
  display: block;
  opacity: 1;
  border-radius: 50%;
  border-width: 2px;
  object-fit: cover;
}

/* Right side: Text */
.slide-text {
  flex: 5;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.slide-main-text {
  font-style: italic;
  font-family: Gellix, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 16.8px;
  vertical-align: middle;
  margin: 0;
}

.slide-user {
  font-size: 14px;
  color: white;
  margin: 0;
}

.slide-name {
  font-family: Gellix, sans-serif;
  font-weight: 700;
  font-size: 13px;
  line-height: 120%;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: 18px;
  user-select: none;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 0;
  flex-basis: 10%;
  border: none;
  transition: opacity 0.3s ease;
}

.prev:hover,
.next:hover {
  opacity: 0.7;
}

.prev {
  border-radius: 20px 0 0 20px;
}

.next {
  border-radius: 0 20px 20px 0;
}

.prev svg,
.next svg {
  pointer-events: none;
}

.dot-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 8px;
  width: 8px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.dot.active {
  background-color: #717171;
}



@media (min-width: 992px) {
  .slideshow-wrapper {
    padding: 0;
    background: transparent;
    border: 2px solid #FFDD00;
    width: 483px;
    margin: 0 auto;
    border-radius: 20px;
  }
  .slideshow-container {
    background: #081F28A6;
    min-height: 165px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .mySlides {
    background: transparent;
  }
  .slide-text {
    text-align: left;
  }
  .dot-container {
    display: none;
  }
}
`;

const createSlideshowElement = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('slideshow-wrapper');

  const container = document.createElement('div');
  container.classList.add('slideshow-container');
  wrapper.appendChild(container);

  // Prev button
  const prev = document.createElement('button');
  prev.classList.add('prev');
  prev.type = 'button';
  prev.setAttribute('aria-label', 'Previous slide');
  prev.innerHTML = ARROW_LEFT;
  container.appendChild(prev);

  // Slides
  SLIDE_DATA.forEach((data, index) => {
    const slide = document.createElement('div');
    slide.classList.add('mySlides');

    const content = document.createElement('div');
    content.classList.add('slide-content');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('slide-image');
    const img = document.createElement('img');
    img.src = data.image;
    img.alt = data.name + ' profile image';
    img.loading = 'lazy';
    imageDiv.appendChild(img);

    const textDiv = document.createElement('div');
    textDiv.classList.add('slide-text');

    const mainP = document.createElement('p');
    mainP.classList.add('slide-main-text');
    mainP.textContent = data.mainText;

    const userP = document.createElement('p');
    userP.classList.add('slide-user');

    const nameSpan = document.createElement('span');
    nameSpan.classList.add('slide-name');
    nameSpan.textContent = data.name;

    const infoSpan = document.createElement('span');
    infoSpan.classList.add('slide-user-info');
    infoSpan.textContent = ' ' + data.userInfo; // Added space before userInfo

    userP.appendChild(nameSpan);
    userP.appendChild(infoSpan);
    textDiv.appendChild(mainP);
    textDiv.appendChild(userP);
    content.appendChild(imageDiv);
    content.appendChild(textDiv);
    slide.appendChild(content);
    container.appendChild(slide);
  });

  // Next button
  const next = document.createElement('button');
  next.classList.add('next');
  next.type = 'button';
  next.setAttribute('aria-label', 'Next slide');
  next.innerHTML = ARROW_RIGHT;
  container.appendChild(next);

  // Dot container
  const dotContainer = document.createElement('div');
  dotContainer.classList.add('dot-container');
  SLIDE_DATA.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.index = index + 1;
    dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
    dot.setAttribute('role', 'button');
    dot.setAttribute('tabindex', '0');
    dotContainer.appendChild(dot);
  });
  wrapper.appendChild(dotContainer);

  return wrapper;
};

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

const addStyles = (css) => {
  customLog('[addStyles] Starting the addStyles function...');

  if (!css) return;

  if (document.querySelector('.ccx-styles-OZ27-v1')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  const style = document.createElement('style');
  style.classList.add('ccx-styles-OZ27-v1');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
  customLog('Custom styles added.');
};

const handleSlideshowPosition = () => {
  const slideshowWrapper = document.querySelector('.slideshow-wrapper');
  const yellowBtn = document.querySelector('.campaign-hero__content a.yellow-btn');
  const homeBanner = document.querySelector(SELECTORS.CONTROL_HOME_BANNER);

  if (!slideshowWrapper) {
    customLog('[handleSlideshowPosition] Slideshow wrapper not found');
    return;
  }

  const screenWidth = window.innerWidth;

  if (screenWidth >= 992) {
    // Desktop: Move after yellow button
    if (yellowBtn && slideshowWrapper.previousElementSibling !== yellowBtn) {
      customLog('[handleSlideshowPosition] Moving slideshow after yellow button (desktop)');
      yellowBtn.insertAdjacentElement('afterend', slideshowWrapper);
    }
  } else {
    // Mobile: Move after home banner
    if (homeBanner && slideshowWrapper.previousElementSibling !== homeBanner) {
      customLog('[handleSlideshowPosition] Moving slideshow after home banner (mobile)');
      homeBanner.insertAdjacentElement('afterend', slideshowWrapper);
    }
  }
};

// Call immediately after slideshow is created
handleSlideshowPosition();

// Listen for window resize with debouncing
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    handleSlideshowPosition();
  }, 150);
});

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

  const promises = configs.map(cfg => {
    const { selector, count } = cfg;
    return DYO.waitForElementAsync(selector, count, 100, 150)
      .then(elements => {
        customLog('[waitForElements] Found ' + elements.length + ' for ' + selector);
        return { selector, elements };
      });
  });

  Promise.all(promises)
    .then(results => {
      if (typeof callback === 'function') callback(results);
    })
    .catch(error => {
      customLog('[waitForElements] Some selectors not found within timeout.', error);
    });
}

const init = () => {
  try {
    customLog(TEST_NAME + ' | ' + VARIATION);
    customLog('[init] Current URL: ' + CURRENT_URL);

    document.body.classList.add('ccx-omaze-oz27-v1');
    customLog('[init] Added class ccx-omaze-oz27-v1 to body');

    waitForElements(
      [
        { selector: SELECTORS.CONTROL_HOME_BANNER, count: 1 },
      ],
      function (results) {
        addStyles(styles);

        const CONTROL_HOME_BANNER = results[0].elements[0];
        if (!CONTROL_HOME_BANNER) {
          customLog('[init] Home Banner not found');
          return;
        }

        // Check for duplicate to avoid re-insertion
        if (CONTROL_HOME_BANNER.nextElementSibling?.classList.contains('slideshow-wrapper')) {
          customLog('[init] Slideshow already inserted');
          return;
        }

        const slideshowEl = createSlideshowElement();
        CONTROL_HOME_BANNER.insertAdjacentElement('afterend', slideshowEl);
        customLog('[init] Slideshow inserted via DOM API');

        // Ensure correct position
        handleSlideshowPosition();

        const container = slideshowEl.querySelector('.slideshow-container');
        if (container) {
          // Use setTimeout to ensure DOM is fully ready
          setTimeout(() => {
            showSlides(slideIndex, container);
            customLog('[init] Initial slide displayed');
          }, 0);
          bindSlideshowEvents(slideshowEl);

          // Listen for window resize with debouncing
          let resizeTimer;
          window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
              handleSlideshowPosition();
            }, 50);
          });
        } else {
          customLog('[init] Container not found after insert');
        }
      }
    );

  } catch (error) {
    customLog('[init] Error:', error.message);
  }
}

init();