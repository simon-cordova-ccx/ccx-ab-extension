// TODO: NEED TO ADD LINKS FOR THE BUTTONS
// const URL_PATTERN = /^https:\/\/www\.theoutnet\.com\/(en-gb|en-au|de-de|en-de|en-be|fr-fr|ar-ae|it-it|ja-jp|ko-kr|zh-cn)\/shop(?:\/mens)?\/?$/;

const LOG_ENABLED = false;

const TEST_META = {
  NUMBER: "web00716",
  VARIATION: "VARIATION 1",
};

const SELECTORS = {
  CONTAINER_JUST_IN: '[data-testid="whats-new-outer"]',
};

const styles = `
.ccx-login-container {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background-color: #f9f6c2;
    width: calc(100% - 64px + 24px);
    text-align: center;
    margin: 0 auto;
    padding: 32px 0;
}

.ccx-login-container h1 {
    font-weight: 400;
    font-size: 24px;
    line-height: 25px;
    letter-spacing: 1px;
}

.ccx-login-container p {
    font-family: THE OUTNET;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0px;
}

.ccx-button-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 1rem;
    width: 100%;
    justify-content: center;
}

.ccx-button {
    font-family: THE OUTNET;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 1px;
    text-align: center;
    height: 46px;
    max-width: 233px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 163.5px;
    flex: 1 1 150px;
}

@media (min-width: 768px) {
    .ccx-button {
        width: 233px;
    }
}

.ccx-button_login {
    background: #000000;
    border: none;
    color: white;
}

.ccx-button_login:hover {
    background: #000000B2;
    cursor: pointer;
}

/* Register button styles */
.ccx-button_register {
    border: 1px solid #000000;
    background: transparent;
}

.ccx-button_register:hover {
    cursor: pointer;
    opacity: 70%;
}
`;

// Language map
const languageContent = {
  en: {
    h1: "Sign in or register now",
    p: "Enter your account to enjoy exclusive benefits and experiences",
    or: "or"
  },
  fr: {
    h1: "Identifiez-vous ou inscrivez-vous dès maintenant",
    p: "Connectez-vous à votre compte pour bénéficier d'expériences et avantages exclusifs",
    or: "ou"
  },
  de: {
    h1: "Jetzt anmelden oder registrieren",
    p: "In Ihrem Konto warten exklusive Vorteile und Erlebnisse auf Sie",
    or: "oder"
  },
  ar: {
    h1: "سجلي الدخول أو أنشئي حساب جديد الآن",
    p: "أدخلي إلى حسابك لتستمتعي بالمزايا والتجارب الحصرية",
    or: "أو"
  },
  it: {
    h1: "Accedi o registrati ora",
    p: "Accedi al tuo account per scoprire vantaggi ed esperienze esclusive",
    or: "o"
  },
  ja: {
    h1: "サインインまたはアカウント新規登録",
    p: "サインインして、特典満載のショッピング体験をお楽しみください",
    or: "または"
  },
  ko: {
    h1: "로그인 또는 계정 등록",
    p: "고객님의 계정으로 특별한 혜택과 쇼핑을 경험하세요.",
    or: "또는"
  },
  zh: {
    h1: "登录/注册",
    p: "即刻登入账号,享受独家福利与丝滑体验",
    or: "/"
  }
};

const addStyles = (css) => {
  customLog('[addStyles] Starting the addStyles function...');

  if (!css) return;

  if (!css) {
    customLog('[addStyles] No CSS provided');
    return;
  }

  // Check if the style tag already exists
  if (document.querySelector('.ccx-styles-outnet-00716')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  // Create a new <style> element
  const style = document.createElement('style');
  style.classList.add('ccx-styles-outnet-00716');
  style.appendChild(document.createTextNode(css));

  // Append the style tag to the document head
  document.head.appendChild(style);
  customLog('Custom styles added.');
};

const customLog = function () {
  if (!LOG_ENABLED) return;

  const style = "background: #000; color: white; padding: 4px 8px; border-radius: 4px;";
  const parts = [];
  const values = [];

  for (var i = 0; i < arguments.length; i++) {
    var msg = arguments[i];
    if (msg instanceof Element) {
      parts.push("%o");
      values.push(msg);
    } else {
      parts.push("%c" + String(msg).toUpperCase());
      values.push(style);
    }
  }

  console.log(parts.join(" "), ...values);
};

const addVariationChanges = (container) => {
  customLog("🎯 Adding variation changes to JUST IN container...");

  const ccxContainer = document.querySelector('.ccx-login-container');
  if (ccxContainer) return;

  // Extract region-language and base language
  const regionLangMatch = window.location.pathname.match(/^\/([a-z]{2}-[a-z]{2})\//i);
  const regionLang = regionLangMatch ? regionLangMatch[1] : 'en-gb';
  const baseLang = regionLang.split('-')[0];

  const content = languageContent[baseLang] || languageContent['en'];
  const [signInText, registerText] = content.h1.split(content.or).map(part => part.trim());

  // Create container
  const fullWidthContainer = document.createElement("div");
  fullWidthContainer.classList.add("ccx-login-container");
  container.parentNode.insertBefore(fullWidthContainer, container);

  // Heading
  const h1Element = document.createElement("h1");
  h1Element.textContent = content.h1;
  fullWidthContainer.appendChild(h1Element);

  // Paragraph
  const pElement = document.createElement("p");
  pElement.textContent = content.p;
  fullWidthContainer.appendChild(pElement);

  // Button container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("ccx-button-container");
  fullWidthContainer.appendChild(buttonContainer);

  // Sign In button
  const signInLink = document.createElement("a");
  signInLink.classList.add('ccx-button', 'ccx-button_login');
  signInLink.textContent = signInText;
  signInLink.href = `https://www.theoutnet.com/${regionLang}/account/login`;
  buttonContainer.appendChild(signInLink);

  // Register button
  const registerLink = document.createElement("a");
  registerLink.classList.add('ccx-button', 'ccx-button_register');
  registerLink.textContent = registerText;
  registerLink.href = `https://www.theoutnet.com/${regionLang}/account/register`;
  buttonContainer.appendChild(registerLink);
};

const attachEventListeners = function () {
  customLog("🎯 Attaching event listeners...");
  const logInButton = document.querySelector('.ccx-button_login');
  if (logInButton) {
    logInButton.addEventListener('click', () => {
      customLog("🎯 Clicked log in button");

      window['optimizely'] = window['optimizely'] || [];
      window['optimizely'].push({
        type: "event",
        eventName: "web-00716_login"
      });
    });
  } else {
    customLog("❌ Log in button not found.");
  }

  const registerButton = document.querySelector('.ccx-button_register');
  if (registerButton) {
    registerButton.addEventListener('click', () => {
      customLog("🎯 Clicked register button");

      window['optimizely'] = window['optimizely'] || [];
      window['optimizely'].push({
        type: "event",
        eventName: "web-00716_register"
      });
    });
  } else {
    customLog("❌ Register button not found.");
  }
};

const init = function () {
  try {
    customLog("🚀 INIT STARTED");

    document.body.classList.add("ccx-outnet-web-00716");

    console.log({ TEST_META });

    const utils = window.optimizely.get('utils');

    if (!utils || typeof utils.waitForElement !== 'function') {
      customLog("❌ Optimizely utility function waitForElement not available.");
      return;
    }

    // Wait for the JUST IN element to appear in the DOM, then apply the changes
    utils.waitForElement(SELECTORS.CONTAINER_JUST_IN).then(function (containerJustIn) {
      const justInParentTopLevelContainer = containerJustIn.parentNode.parentNode.parentNode;
      addStyles(styles);
      addVariationChanges(justInParentTopLevelContainer);
    attachEventListeners();
    });

    customLog("🎉 INIT COMPLETE");
  } catch (error) {
    console.error("[init] ❌ Error: " + error.message + "\nStack: " + error.stack);
  }
};

init();
