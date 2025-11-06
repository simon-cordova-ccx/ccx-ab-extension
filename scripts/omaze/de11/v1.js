(function () {
  const LOG_ENABLED = true;
  const TEST_ID = "DE11";
  const TEST_NAME = "Multi-Video Hero Test on House Landing Page";
  const VARIATION = "variation-1";
  const CURRENT_URL = window.location.href;
  const SOURCE_TYPE = "NO SOURCE";
  const IS_STAGING_ENV = CURRENT_URL.includes('staging');

  const cardsData = {
    desktop: [
      {
        iconText: '3 € RABATT',
        heading: "70 Lose (+2 Gratis Lose)",
        emojiContainerIcon: '🎉',
        emojiContainerText: '1 Bonus Verlosung',
        emojiContainerSpan: 'inklusive',
        strikeThroughPrice: "35 €",
        newPrice: "32 €",
        buttonText: 'Jetzt mitmachen',
        buttonLink: 'https://omaze.de/cart/51859472908469:1?discount=TSTD3EU&storefront=true'
      },
      {
        iconText: '3 € RABATT',
        heading: "50 Lose (+2 Gratis Lose)",
        emojiContainerIcon: '🎉',
        emojiContainerText: '1 Bonus Verlosung',
        emojiContainerSpan: 'inklusive',
        strikeThroughPrice: "25 €",
        newPrice: "22 €",
        buttonText: 'Jetzt mitmachen',
        buttonLink: 'https://omaze.de/cart/51859472875701:1?discount=TSTD3EU&storefront=true'
      },
      {
        iconText: '3 € RABATT',
        heading: "20 Lose",
        emojiContainerIcon: '🎉',
        emojiContainerText: '1 Bonus Verlosung',
        emojiContainerSpan: 'inklusive',
        strikeThroughPrice: "10 €",
        newPrice: "7 €",
        buttonText: 'Jetzt mitmachen',
        buttonLink: 'https://omaze.de/cart/51859472842933:1?discount=TSTD3EU&storefront=true'
      },
    ],
    mobile: [
      {
        iconText: '3 € RABATT',
        heading: "20 Lose",
        subHeading: null,
        emojiContainerIcon: '🎉',
        emojiContainerText: '1 Bonus Verlosung',
        emojiContainerSpan: 'inklusive',
        strikeThroughPrice: "10 €",
        newPrice: "7 €",
        buttonText: 'Mitmachen',
        buttonLink: 'https://omaze.de/cart/51859472908469:1?discount=TSTD3EU&storefront=true'
      },
      {
        iconText: '3 € RABATT',
        heading: "20 Lose",
        subHeading: "(+1 Gratis Los)",
        emojiContainerIcon: '🎉',
        emojiContainerText: '1 Bonus Verlosung',
        emojiContainerSpan: 'inklusive',
        strikeThroughPrice: "25 €",
        newPrice: "22 €",
        buttonText: 'Mitmachen',
        buttonLink: 'https://omaze.de/cart/51859472875701:1?discount=TSTD3EU&storefront=true'
      },
      {
        iconText: '3 € RABATT',
        heading: "70 Lose",
        subHeading: "(+2 Gratis Los)",
        emojiContainerIcon: '🎉',
        emojiContainerText: '1 Bonus Verlosung',
        emojiContainerSpan: 'inklusive',
        strikeThroughPrice: "35 €",
        newPrice: "32 €",
        buttonText: 'Mitmachen',
        buttonLink: 'https://omaze.de/cart/51859472842933:1?discount=TSTD3EU&storefront=true'
      },
    ]
  };

  const SELECTORS = {
    CONTROL_TAB_PANE_IMAGE: '#enter-now-material-tab-buttons-design > [id*=nav-latest] [id*=single-purchase-tab-pane] img',
    CONTROL_MOBILE_IMAGES: '#enter-now-material-tab-buttons-design > [id*=nav-latest] [id*=single-purchase-tab-pane] [data-test="mobile-card-variant-payg"]',
    CONTROL_DESKTOP_IMAGES: '#enter-now-material-tab-buttons-design > [id*=nav-latest] [id*=single-purchase-tab-pane] [data-test="desktop-card-variant-payg"]',
  }

  const STYLES = `
    [data-test="mobile-card-variant-payg"]:not(.ccx-mobile-card) {
      display: none !important;
    }
    [data-test="desktop-card-variant-payg"]:not(.ccx-desktop-card) {
      display: none !important;
    }
    .ccx-paragraph-container {
      max-width: 380px !important;
      width: 100%;
      margin: 1rem auto;
    }
    .ccx-paragraph-container .ccx-paragraph {
      margin: 0;
      font-family: Gellix;
      font-weight: 400;
      font-size: 18px;
      line-height: normal;
      text-align: center;
      vertical-align: middle;
    }
    .ccx-paragraph-container .ccx-paragraph .ccx-paragraph-highlight {
      font-family: Gellix;
      font-weight: 700;
      font-size: 18px;
      text-align: center;
      color: #0193A7;
      line-height: normal;
    }
    .ccx-mobile-card {
      border: 1px solid #E6E6E6;
      max-width: 380px;
      gap: 1px;
      border-radius: 20px;
      border-width: 1px;
      position: relative;
      box-shadow: 0px 2px 4px 0px #0000001A;
    }
    .ccx-mobile-card .ccx-card-inner {
      background: white;
      border-radius: 20px;
      padding-top: 3rem;
      padding-bottom: 1rem;
      }
    .ccx-mobile-card .ccx-card-inner .discount-tag {
      border-radius: 0 10px 0 10px;
      background: #0193A7;
      padding: 0.5rem 1rem;
      position: absolute;
      top: 0;
      right: 0;
      font-family: Gellix;
      font-weight: 700;
      font-size: 16px;
      line-height: normal;
      letter-spacing: 0.24px;
      text-align: center;
      vertical-align: middle;
      color: #F5F5F5;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 179px;
    }
    .ccx-mobile-card .ccx-card-inner .discount-tag__heading {
      font-family: Gellix;
      font-weight: 700;
      font-size: 40px;
      line-height: 100%;
      text-align: center;
      vertical-align: middle;
      color: #081F28;
      margin: 0;
      margin-bottom: 1rem;
    }
    .ccx-mobile-card .ccx-card-inner .discount-tag__sub-heading {
      font-family: Gellix;
      font-weight: 700;
      font-size: 25px;
      line-height: 100%;
      text-align: center;
      vertical-align: middle;
      margin-bottom: 1rem;
    }
    .ccx-mobile-card .ccx-card-inner .emoji-container {
        background: #F4F3E0;
        display: inline-block;
        padding-top: 4px;
        padding-right: 4px;
        padding-bottom: 4px;
        padding-left: 10px;
        opacity: 1;
        border-radius: 99px;
        margin-bottom: 1rem;
    }

    .ccx-mobile-card .ccx-card-inner .price {
      margin: 0 auto;
      margin-bottom: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
    .ccx-mobile-card .ccx-card-inner .price .strike {
      font-family: Gellix;
      font-weight: 700;
      font-size: 24px;
      text-decoration: line-through;
      color: #FF0000;
    }
    .ccx-mobile-card .ccx-card-inner .price .new {
      font-family: Gellix;
      font-weight: 700;
      font-size: 43px;
      text-align: center;
      color: #0193A7;
    }
    .ccx-card-inner .cta-button {
      display: block;
      max-width: 314px;
      height: 56px;
      padding-top: 12px;
      padding-right: 32px;
      padding-bottom: 14px;
      padding-left: 32px;
      opacity: 1;
      border-radius: 76px;
      background: #FFDD00;
      margin: 0 auto;
      font-family: Gellix;
      font-weight: 700;
      font-size: 20px;
      line-height: 150%;
      text-align: center;
      color: #090F15;
    }

    .ccx-card-inner .cta-button:hover, .ccx-card-inner .cta-button:focus {
      color: #000;
      background-color: #fdee8c;
      outline: none;
      text-decoration: none;
    }

    .ccx-desktop-card {
      display: none;
      position: relative;
    }

    @media screen and (min-width: 992px) {
      .ccx-mobile-card {
        display: none;
      }
      .ccx-desktop-card {
        display: flex;
        background: white;
        padding: 0.7rem;
        padding-top: 75px;
        border: 1px solid #E6E6E6;
        width: 380px;
        height: 431px;
        gap: 1px;
        opacity: 1;
        border-radius: 20px;
        border-width: 1px;
        position: relative;
      }
      .ccx-desktop-card .discount-tag {
        width: 201px;
        height: 43px;
        padding-top: 8px;
        padding-right: 16px;
        padding-bottom: 8px;
        padding-left: 16px;
        opacity: 1;
        position: absolute;
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        top: 0;
        right: 0;
        background: #0193A7;
        color: #F5F5F5;
        font-family: Gellix;
        font-weight: 700;
        font-size: 18px;
        text-align: center;
      }
      .ccx-desktop-card  .ccx-card-inner h3 {
        font-family: Gellix;
        font-weight: 700;
        font-size: 26px;
        line-height: 150%;
        text-align: center;
        vertical-align: middle;
      }

      .ccx-desktop-card .ccx-card-inner .emoji-container {
        background: #F4F3E0;
        padding-top: 4px;
        padding-right: 4px;
        padding-bottom: 4px;
        padding-left: 10px;
        gap: 7px;
        border-radius: 99px;
        display: flex;
        justify-content: center;
        margin-bottom: 1.5rem;
      }

      .ccx-desktop-card .ccx-card-inner .horizontal-line {
        width: 100%;
        height: 2rem;
        border-top: 1px solid #87C7CA;
      }

      .ccx-desktop-card  .ccx-card-inner .price {
        display: flex;
        flex-flow: column;
        margin-bottom: 40px;
      }

      .ccx-desktop-card .ccx-card-inner .price .strike {
        font-family: Gellix;
        font-weight: 700;
        font-size: 30px;
        line-height: 120%;
        text-align: center;
        vertical-align: middle;
        text-decoration: line-through;
        color: #FF0000;
      }

      .ccx-desktop-card .ccx-card-inner .price .new {
        font-family: Gellix;
        font-weight: 700;
        font-size: 56px;
        line-height: 100%;
        text-align: center;
        vertical-align: middle;
        color: #0193A7;
      }


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

  const addStyles = (cssString = '', variation = 'control') => {
    if (!cssString) return;
    if (!variation) variation = 'control';
    const styleClass = 'ccx-styles-' + TEST_ID.toLowerCase() + '-' + variation.toLowerCase().replace(/\s+/g, '-') + '';

    // if styles for this variation already exist, don't add again
    if (document.querySelector('.' + styleClass)) return;

    const style = document.createElement('style');
    style.classList.add(styleClass);
    style.appendChild(document.createTextNode(cssString));
    document.head.appendChild(style);
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

  const addParagraphContainer = (anchorElement) => {
    customLog('[addParagraphContainer] Adding paragraph container...');

    const paragraphContainer = document.createElement('div');
    paragraphContainer.classList.add('ccx-paragraph-container');

    const paragraph = document.createElement('p');
    paragraph.classList.add('ccx-paragraph');

    paragraph.appendChild(document.createTextNode('Das '));

    const highlight = document.createElement('span');
    highlight.classList.add('ccx-paragraph-highlight'); // pick whatever class you need
    highlight.textContent = '3-Euro-Rabattangebot';
    paragraph.appendChild(highlight);

    paragraph.appendChild(document.createTextNode(' kann nur einmal pro Kundin oder Kunde und nur für den Kauf eines einzelnen Los-Pakets eingelöst werden.'));

    paragraphContainer.appendChild(paragraph);
    anchorElement.insertAdjacentElement('afterend', paragraphContainer);
  };

  const createMobilePAYGCards = (controlMobileCardElements) => {
    customLog('[createMobilePAYGCards] Creating PAYG cards...');

    const ccxMobileCard = document.querySelector('.ccx-mobile-card');
    if (ccxMobileCard) return;

    const parentContainer = controlMobileCardElements[0].parentElement;
    console.log(parentContainer);

    cardsData.mobile.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = 'ccx-mobile-card';
      cardElement.setAttribute('data-test', 'mobile-card-variant-payg');

      // inner container wrapping everything
      cardElement.innerHTML = `
      <div class="ccx-card-inner">
        <div class="discount-tag">${card.iconText}</div>
        <h3 class="discount-tag__heading">${card.heading}</h3>
        ${card.subHeading ? `<h3 class="discount-tag__sub-heading">${card.subHeading}</h3>` : ''}
        <div class="emoji-container">
          <span>${card.emojiContainerIcon}</span>
          <span>${card.emojiContainerText}</span>
          <span class="light">${card.emojiContainerSpan}</span>
        </div>
        <div class="price">
          <span class="strike">${card.strikeThroughPrice}</span>
          <span class="new">${card.newPrice}</span>
        </div>
        <a href="${card.buttonLink}" class="cta-button">${card.buttonText}</a>
      </div>
    `;
      parentContainer.appendChild(cardElement);
    });
  };

  function createDesktopPAYGCards(controlDesktopCardElements) {
    customLog('[createDesktopPAYGCards] Creating PAYG cards...');

    const ccxDesktopCard = document.querySelector('.ccx-desktop-card');
    if (ccxDesktopCard) return;

    const parentContainer = controlDesktopCardElements[0].parentElement;
    console.log(parentContainer);

    cardsData.desktop.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = 'ccx-desktop-card';
      cardElement.setAttribute('data-test', 'desktop-card-variant-payg');

      // inner container wrapping everything
      cardElement.innerHTML = `
      <div class="ccx-card-inner">
        <div class="discount-tag">${card.iconText}</div>
        <h3>${card.heading}</h3>
        <div class="emoji-container">
          <span>${card.emojiContainerIcon}</span>
          <span>${card.emojiContainerText}</span>
          <span class="light">${card.emojiContainerSpan}</span>
        </div>
        <div class="horizontal-line"></div>
        <div class="price">
          <span class="strike">${card.strikeThroughPrice}</span>
          <span class="new">${card.newPrice}</span>
        </div>
        <a href="${card.buttonLink}" class="cta-button">${card.buttonText}</a>
      </div>
    `;
      parentContainer.appendChild(cardElement);
    });
  }

  const init = () => {
    try {
      customLog(TEST_ID + ' | ' + VARIATION + ' | ' + TEST_NAME);
      customLog('[init] Current URL: ' + CURRENT_URL);

      // Add  paragraph
      waitForElements(
        [
          { selector: SELECTORS.CONTROL_TAB_PANE_IMAGE, count: 1 },
        ],
        function (results) {
          const bodyClass = 'ccx-' + TEST_ID.toLowerCase() + '-' + VARIATION.toLowerCase().replace(/\s+/g, '-') + '';
          customLog(bodyClass);
          // if the class for this variation already exists, don't add again
          if (document.querySelector('.' + bodyClass)) return;
          document.body.classList.add(bodyClass); // Add class to the body element
          customLog('[init] Added class ' + bodyClass + ' to body');

          // Add styles
          addStyles(STYLES, VARIATION);

          const CONTROL_TAB_PANE_IMAGE = results[0].elements[0];
          if (!CONTROL_TAB_PANE_IMAGE) return;

          customLog(CONTROL_TAB_PANE_IMAGE);

          addParagraphContainer(CONTROL_TAB_PANE_IMAGE)
        }
      );

      // Add mobile PAYG cards
      waitForElements(
        [
          { selector: SELECTORS.CONTROL_MOBILE_IMAGES, count: 3 },
        ],
        function (mobileImages) {
          customLog(mobileImages);
          createMobilePAYGCards(mobileImages[0].elements);
        }
      );

      // Add desktop PAYG cards
      waitForElements(
        [
          { selector: SELECTORS.CONTROL_DESKTOP_IMAGES, count: 3 },
        ],
        function (desktopImages) {
          customLog(desktopImages);
          createDesktopPAYGCards(desktopImages[0].elements);
        }
      );

    } catch (error) { }
  }

  init();
})();
