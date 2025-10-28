// TODO: HOW DOES IT WORK SECTION?

const LOG_ENABLED = true;
const TEST_NAME = "OZDE-9 | LP Trust Testing";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 2";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

const TIMELINE_FLAG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.66667 14.6667V2.66667C2.66667 2.45683 2.76546 2.25924 2.93333 2.13333C3.62572 1.61404 4.46785 1.33333 5.33333 1.33333C7.33333 1.33333 8.66667 2.66667 10.222 2.66667C11.1109 2.66667 11.7924 2.48889 12.2667 2.13333C12.4687 1.98182 12.739 1.95745 12.9648 2.07038C13.1907 2.18331 13.3333 2.41415 13.3333 2.66667V9.33333C13.3333 9.54317 13.2345 9.74076 13.0667 9.86667C12.3743 10.386 11.5321 10.6667 10.6667 10.6667C8.66667 10.6667 7.33333 9.33333 5.33333 9.33333C4.34941 9.33336 3.40002 9.69603 2.66667 10.352" stroke="#F5F5F5" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const TIMELINE_CLOCK = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.66667 8.66667C2.66667 11.6102 5.05645 14 8 14C10.9435 14 13.3333 11.6102 13.3333 8.66667C13.3333 5.72312 10.9435 3.33333 8 3.33333C5.05645 3.33333 2.66667 5.72312 2.66667 8.66667" stroke="#081F28" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 6V8.66667L9.33333 10M3.33333 2L1.33333 4M14.6667 4L12.6667 2M4.25333 12.4667L2.66667 14M11.76 12.4467L13.3333 14" stroke="#081F28" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const styles = `
.hero-mobile-addendum .hma-content > h1 {
  font-size: 36px !important;
  color: #081F28 !important;
}

/* ---------- SLIDER CONTAINER ---------- */
.ccx-slider-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  background: #fff;
  padding: 2rem 0;
}

.ccx-slider__header {
  margin: 0 auto;
  margin-bottom: 1.5rem;
  font-family: Showtime;
  font-weight: 500;
  font-size: 36px;
  line-height: 40px;
  letter-spacing: 0;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
}

.ccx-slider {
  display: flex;
  width: max-content;
  animation: ccx-slide-scroll 15s linear infinite;
  gap: 1rem;
}

.ccx-slide {
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  font-family: sans-serif;
  width: 260px;
  height: 214px;
  opacity: 1;
  padding-right: 16px;
  padding-left: 16px;
  border-radius: 20px;
  border-width: 2px;
  border: 2px solid #081F28;
  box-shadow: 0px 4px 34px 0px #00000026;
  background: #121a2f;
}

.ccx-slide h2 {
  color: #FFDD00;
  margin-bottom: 10px;
  border-bottom: 1px solid #FFDD00;
  padding-bottom: 1rem;
  font-family: Showtime;
  font-weight: 500;
  font-size: 30px;
  line-height: 90%;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
}

.ccx-slide p {
  font-family: Gellix;
  font-weight: 400;
  font-size: 17px;
  line-height: 120%;
  text-align: center;
  vertical-align: middle;
  color: white;
}

.ccx-slide span {
  font-family: Gellix;
  font-weight: 700;
  font-size: 17px;
  line-height: 120%;
  text-align: center;
  vertical-align: middle;
}

/* Continuous scroll - no gap at loop */
@keyframes ccx-slide-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}



/* ---------- HOW DOES IT WORK? ---------- */
.ccx-how-does-it-work {
  padding: 2rem 1rem;
}
.ccx-how-does-it-work h2 {
  text-align: center;
}



/* ---------- TIMELINE STYLES ---------- */

.ccx-timeline__header {
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 2rem;
  color: #000000;
  font-family: Gellix;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0px;
  vertical-align: middle;
}

.ccx-timeline-container {
  font-family: "Inter", sans-serif;
  color: #0c0c0c;
  border-radius: 24px;
  padding: 20px;
  background: #fff;
}

.ccx-timeline {
  position: relative;
  margin-left: 40px;
  padding-left: 30px;
}

/* --- Base vertical line --- */
.ccx-timeline::before {
  content: "";
  position: absolute;
  top: 48px;
  bottom: 0;
  left: 2px;
  width: 8px;
  height: 31rem;
  background: #d9e2e6;
  z-index: 0;
}

/* --- Green portion (progress from first → second) --- */
.ccx-timeline::after {
  content: "";
  position: absolute;
  top: 48px;
  left: 2px;
  width: 8px;
  height: 5rem;
  background: #00754a;
  z-index: 1;
}

.ccx-timeline-item {
  position: relative;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 12px;
}

.ccx-icon-wrapper {
  position: absolute;
  left: -48px;
  top: 5px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #d9e2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.ccx-timeline-item.ccx-green {
  margin-bottom: 2.5rem;
}
.ccx-timeline-item.ccx-green .ccx-content {
  justify-content: center;
}

.ccx-timeline-item.ccx-green .ccx-icon-wrapper {
  background: #00844C;
  border: 1px solid #081F28;
}

.ccx-timeline-item.ccx-green .ccx-icon-wrapper svg path {
  stroke: #fff;
}

/* --- Remove duplicate connector lines --- */
.ccx-connector {
  display: none;
}

/* --- Current step styling --- */
.ccx-timeline-item.ccx-current .ccx-icon-wrapper {
  border-color: #00754a;
}

.ccx-timeline-item.ccx-current .ccx-icon-wrapper svg path {
  stroke: #081f28;
}

.ccx-current-label {
  color: #00844C;
  margin: 0;
  font-family: Gellix;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0px;
  vertical-align: middle;
  position: absolute;
  top: -1rem;
}



.ccx-content {
  position: relative;
  z-index: 2;
  margin-left: 0.5rem;
  min-height: 48px;
  display: flex;
  flex-flow: column;
}

.ccx-content h3 {
  color: #081f28;
  margin-bottom: 4px;
  font-family: Gellix;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0px;
  vertical-align: middle;
}

.ccx-content .ccx-date {
  margin-bottom: 4px;
  font-family: Gellix;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #081F28;
}

.ccx-content a {
  color: #0090B1;
  font-family: Gellix;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0px;
  vertical-align: middle;
  text-decoration: underline;
  text-decoration-style: solid;
  text-decoration-thickness: 0%;
  text-decoration-skip-ink: auto;
}

.ccx-content a:hover {
  text-decoration: underline;
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
  if (document.querySelector('.ccx-styles-de9-v2')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  // Create a new <style> element
  const style = document.createElement('style');
  style.classList.add('ccx-styles-de9-v2');
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

const createTimeline = () => {
  const container = document.createElement("div");
  container.classList.add("ccx-timeline-container");

  // Header
  const header = document.createElement("h2");
  header.classList.add("ccx-timeline__header");
  header.textContent = "Die Oberbayern Haus-Verlosung";
  container.appendChild(header);

  // Timeline data
  const events = [
    {
      title: "Die Oberbayern Haus-Verlosung hat begonnen",
      date: "16. Oktober • 08:00",
      icon: TIMELINE_FLAG,
      green: true
    },
    {
      current: true,
      label: "Aktueller Stand",
      title: "Audi SQ7 + 50.000 € endet am",
      date: "09. November 2025 • 23:59",
      linkText: "Ziehungsergebnis wird am 12. November 2025 bekannt gegeben",
      linkUrl: "https://omaze.de/pages/verlosungsergebnisse#month-11",
      icon: TIMELINE_CLOCK
    },
    {
      title: "Mercedes G-Klasse + 50.000 € endet am",
      date: "23. November 2025 • 23:59",
      linkText: "Ziehungsergebnis wird am 26. November 2025 bekannt gegeben",
      linkUrl: "https://omaze.de/pages/verlosungsergebnisse#month-11",
      icon: TIMELINE_CLOCK
    },
    {
      title: "250.000 € Weihnachtsgeld endet am",
      date: "07. Dezember 2025 • 23:59",
      linkText: "Ziehungsergebnis wird am 10. Dezember 2025 bekannt gegeben",
      linkUrl: "https://omaze.de/pages/verlosungsergebnisse#month-12",
      icon: TIMELINE_CLOCK
    },
    {
      title: "10 x 10.000 € in bar endet am",
      date: "27. Dezember • 23:59",
      linkText: "Ziehungsergebnis wird am 06. Januar 2026 bekannt gegeben",
      linkUrl: "https://omaze.de/pages/verlosungsergebnisse-2026#month-1",
      icon: TIMELINE_CLOCK
    },
    {
      title: "Die Oberbayern Haus-Verlosung endet am",
      date: "27. Dezember 2025 • 23:59",
      linkText: "Ziehungsergebnis wird am 06. Januar 2026 bekannt gegeben",
      linkUrl: "https://omaze.de/pages/verlosungsergebnisse-2026#month-1",
      icon: TIMELINE_CLOCK
    }
  ];

  // Build timeline
  const timeline = document.createElement("div");
  timeline.classList.add("ccx-timeline");

  events.forEach((ev, index) => {
    const item = document.createElement("div");
    item.classList.add("ccx-timeline-item");
    if (ev.current) item.classList.add("ccx-current");
    if (ev.green) item.classList.add("ccx-green");

    // Icon wrapper
    const iconWrapper = document.createElement("div");
    iconWrapper.classList.add("ccx-icon-wrapper");
    iconWrapper.innerHTML = ev.icon;

    // Vertical connector
    if (index !== events.length - 1) {
      const connector = document.createElement("div");
      connector.classList.add("ccx-connector");
      if (index === 0) connector.classList.add("ccx-connector-green"); // green line to current
      iconWrapper.appendChild(connector);
    }

    // Content
    const content = document.createElement("div");
    content.classList.add("ccx-content");

    if (ev.current && ev.label) {
      const label = document.createElement("p");
      label.classList.add("ccx-current-label");
      label.textContent = ev.label;
      content.appendChild(label);
    }

    const title = document.createElement("h3");
    title.textContent = ev.title;
    content.appendChild(title);

    const date = document.createElement("p");
    date.classList.add("ccx-date");
    date.textContent = ev.date;
    content.appendChild(date);

    if (ev.linkText) {
      const link = document.createElement("a");
      link.href = ev.linkUrl;
      link.target = "_blank";
      link.textContent = ev.linkText;
      content.appendChild(link);
    }

    item.appendChild(iconWrapper);
    item.appendChild(content);
    timeline.appendChild(item);
  });

  container.appendChild(timeline);
  customLog("[createTimeline] Timeline component created successfully.");
  return container;
};

const createSliderContainer = () => {
  const container = document.createElement('div');
  container.classList.add('ccx-slider-container');

  const slider = document.createElement('div');
  slider.classList.add('ccx-slider');

  const sliderHeader = document.createElement('h2');
  sliderHeader.textContent = 'WER IST OMAZE?';
  sliderHeader.classList.add('ccx-slider__header');
  container.appendChild(sliderHeader);

  const slidesData = [
    {
      heading: 'ÜBER 200 MIO. €',
      text: `Thanks to the Omaze Community, we\'ve raised <span>over €200M</span> for good causes worldwide.`,
      newText: `Dank der Omaze Community haben wir weltweit mehr als 200 Mio. € für wohltätige Zwecke gesammelt.`,
    },
    {
      heading: 'ÜBER 100 MIO. €',
      text: `From houses, to cars, to cash. Omaze has given away over <span>100 MIO. € in prizes</span>.`,
      newText: `Wir haben bereits mehr als 100 Mio. € in Preisen vergeben, die Leben verändern – von Häusern und Autos bis hin zu Geldpreisen.`
    },
    {
      heading: '13 years',
      text: `Launched in 2012, Omaze have been <span>delivering dreams</span> for over a decade around the world.`,
      newText: `Seit 2012 hilft Omaze Menschen dabei, ihr Leben zu verändern und gleichzeitig Gutes zu tun.`,
    },
  ];

  // Create and duplicate slides for smooth infinite loop
  const allSlides = [...slidesData, ...slidesData]; // duplicate set
  allSlides.forEach(slideData => {
    const slide = document.createElement('div');
    slide.classList.add('ccx-slide');

    const heading = document.createElement('h2');
    heading.textContent = slideData.heading;

    const text = document.createElement('p');
    // text.innerHTML = slideData.text;
    text.innerHTML = slideData.newText;

    slide.appendChild(heading);
    slide.appendChild(text);
    slider.appendChild(slide);
  });

  container.appendChild(slider);
  customLog('[createSliderContainer] Slider created successfully.');
  return container;
};

const createHowDoesItWorkSection = () => {
  const container = document.createElement('div');
  container.classList.add('ccx-how-does-it-work');

  const heading = document.createElement('h2');
  heading.textContent = 'SO FUNKTIONIERT\'S';
  container.appendChild(heading);

  const paragraph_one = document.createElement('p');
  paragraph_one.textContent = 'Mach mit bei der Oberbayern Haus-Verlosung und sichere dir die Chance auf das Landhaus als Hauptpreis. Außerdem nimmst du automatisch an vier Bonus-Verlosungen teil.';
  container.appendChild(paragraph_one);
  
  const paragraph_two = document.createElement('p');
  paragraph_two.textContent = 'In der Übrersicht siehst du alle Verlosungen und die wichtigsten Termine auf einen Blick.';
  container.appendChild(paragraph_two);

  // const timelineContainer = document.createElement('div');
  // timelineContainer.classList.add('ccx-timeline-container');
  // container.appendChild(timelineContainer);

  // const timelineHeader = document.createElement('h3');
  // timelineHeader.textContent = 'The Omaze Oberbayern House Draw';
  // timelineContainer.appendChild(timelineHeader);

  const timelineComponent = createTimeline();

  container.appendChild(timelineComponent);

  return container;
};

const init = () => {
  try {
    customLog(TEST_NAME + ' | ' + VARIATION);
    customLog('[init] Current URL: ' + CURRENT_URL);

    document.body.classList.add('ccx-omaze-de9-v2');
    customLog('[init] Added class ccx-omaze-de9-v2 to body');

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

        const CONTROL_HERO_ADDENDUM_TITLE = CONTROL_HERO_ADDENDUM.querySelector('h1');
        if (CONTROL_HERO_ADDENDUM_TITLE) {
          CONTROL_HERO_ADDENDUM_TITLE.textContent = 'EINE PERSON GEWINNT GARANTIERT - GEWINNE DIESES 2,7 MIO. € LANDHAUS IN OBERBAYERN';
        }

        const CONTROL_HERO_ADDENDUM_TEXT = CONTROL_HERO_ADDENDUM.querySelector('.hma-content__text');
        if (CONTROL_HERO_ADDENDUM_TEXT) {
          CONTROL_HERO_ADDENDUM_TEXT.textContent = 'Gekaufte Lose unterstützen';
        }
      }
    );

    waitForElements(
      [
        { selector: 'live-rent-sell', count: 1 }
      ],
      function (results) {
        console.log(results);
        addStyles(styles);

        // const CONTROL_ELEMENT_LOGIN = document.querySelector('#begin-checkout a[href*="/account/login"]');
        const CONTROL_LIVE_RENT_SELL = results[0].elements[0];
        if (!CONTROL_LIVE_RENT_SELL) {
          customLog('[init] Login element not found');
          return;
        }

        // SLIDER CONTAINER
        const CCX_SLIDER_CONTAINER = createSliderContainer();
        CONTROL_LIVE_RENT_SELL.insertAdjacentElement('afterend', CCX_SLIDER_CONTAINER);

        // HOW DOES IT WORK
        const CCX_HOW_DOES_IT_WORK = createHowDoesItWorkSection();
        const ccx_element_slider_container = document.querySelector('.ccx-slider-container');
        if (ccx_element_slider_container) {
          ccx_element_slider_container.insertAdjacentElement('afterend', CCX_HOW_DOES_IT_WORK);
        }
      }
    );
    
    waitForElements(
      [
        { selector: '.hero-mobile-addendum > .hma-content > h1', count: 1 }
      ],
      function (results) {
        console.log(results);

        const CONTROL_HERO_ADDENDUM_HEADER = results[0].elements[0];
        if (!CONTROL_HERO_ADDENDUM_HEADER) {
          customLog('[init] Control hero addemdum header not found');
          return;
        }

        CONTROL_HERO_ADDENDUM_HEADER.textContent = 'EINE PERSON GEWINNT GARANTIERT - GEWINNE DAS 2,7 MIO. € LANDHAUS IN OBERBAYERN';
      }
    );

    waitForElements(
      [
        { selector: '.hero-mobile-addendum  > .hma-content .hma-content__text', count: 1 }
      ],
      function (results) {
        console.log(results);

        const CONTROL_HERO_ADDENDUM_TEXT = results[0].elements[0];
        if (!CONTROL_HERO_ADDENDUM_TEXT) {
          customLog('[init] Control hero addemdum text not found');
          return;
        }

        CONTROL_HERO_ADDENDUM_TEXT.textContent = 'Mit jedem Los unterstützt du:';
      }
    );

  } catch (error) {
    customLog(error.message);
  }
}

init();
