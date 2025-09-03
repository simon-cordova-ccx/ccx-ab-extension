// TODO: NEED TO ADD LINKS FOR THE BUTTONS
// const URL_PATTERN = /^https:\/\/www\.theoutnet\.com\/(en-gb|en-au|de-de|en-de|en-be|fr-fr|ar-ae|it-it|ja-jp|ko-kr|zh-cn)\/shop(?:\/mens)?\/?$/;

// TODO: NEED TO SEND ATTRIBUTES WHEN:
//  CONTROL REACHES THE JUST IN SECTION
//  VARIANTS REACH THE VARIATION CHANGES

// /shop and /shop/mens

const LOG_ENABLED = true;

const TEST_META = {
  NUMBER: "web00716",
  VARIATION: "variation-2",
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
  text-align: center;
  padding: 2rem 1rem;
  width: calc(100% - 2rem);
  margin: 0 auto;
  margin-top: 4rem;
  background: #f9f6c2;
  font-family: 'TheOutnetWebXL';
}


@media (min-width: 768px) {
    .ccx-login-container {
      width: calc(100% - 4rem);
    }
}

.ccx-login-container h1 {
    font-family: 'TheOutnetWebXL';
    font-weight: 400;
    font-size: 24px;
    line-height: 25px;
    letter-spacing: 1px;
}

.ccx-login-container p {
    font-family: 'TheOutnetWebXL';
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0px;
    max-width: 484px;
}

.ccx-button-container {
    display: flex;
    gap: 1rem;
    font-size: 1rem;
    width: 100%;
    justify-content: center;
    flex-direction: column;
}
@media (min-width: 768px) {
    .ccx-button-container {
        flex-direction: row;
    }
}

.ccx-button {
    font-family: 'TheOutnetWebXL';
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 1px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 46px;
}

@media (min-width: 768px) {
    .ccx-button {
        width: 233px;
        height: 46px;
        max-width: 233px;
        flex: 1 1 46px;
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

const languageContent = {
  "EN": {
    "Main_copy": "SIGN IN OR REGISTER NOW",
    "Supporting_copy": "Enter your details to create your wishlist, track orders and enjoy birthday surprises! <strong>If you are a VIP</strong>, you will also see early access to the best new arrivals, exclusive promos, and more.",
    "Sign_in_CTA": "Sign In",
    "Register_CTA": "Register"
  },
  "AR": {
    "Main_copy": "تسجيل الدخول أو تسجيل حساب جديد الآن",
    "Supporting_copy": "أدخل بياناتك لإنشاء قائمة أمنياتك وتتبع الطلبات والاستمتاع بمفاجآت عيد الميلاد! إذا كنت من العملاء المميزين، ستتمتع أيضًا بإمكانية الوصول المبكر إلى أفضل المنتجات الجديدة والعروض الترويجية الحصرية وغير ذلك المزيد.",
    "Sign_in_CTA": "تسجيل الدخول",
    "Register_CTA": "تسجيل حساب جديد"
  },
  "DE": {
    "Main_copy": "JETZT ANMELDEN ODER REGISTRIEREN",
    "Supporting_copy": "Geben Sie Ihre Daten ein und kreieren Sie Ihre Wish List, verfolgen Sie Ihre Bestellungen und lassen Sie sich zu Ihrem Geburtstag überraschen! <strong>Wenn Sie zu den VIPs gehören</strong>, erhalten Sie zudem einen vorzeitigen Zugang zu den besten Neuheiten, exklusiven Promos, und vieles mehr.",
    "Sign_in_CTA": "Anmelden",
    "Register_CTA": "Registrieren"
  },
  "JA": {
    "Main_copy": "サインイン/新規登録",
    "Supporting_copy": "アカウントではご注文履歴の確認やウィッシュリストの作成ができるほか、お客様のバースデーにはサプライズもご用意しています。<strong>VIPのお客様は</strong>、新入荷アイテムやプロモーションへ先行でアクセスしていただけます。",
    "Sign_in_CTA": "サインイン",
    "Register_CTA": "新規登録"
  },
  "KO": {
    "Main_copy": "로그인 또는 회원 가입",
    "Supporting_copy": "위시리스트를 만들거나 계정에서 주문 현황을 확인하고, 생일에는 서프라이즈 혜택을 즐겨보세요. 또한 <strong>VIP 회원</strong>은 신상품과 프로모션을 가장 먼저 만나보실 수 있습니다.",
    "Sign_in_CTA": "로그인",
    "Register_CTA": "회원 가입"
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
  const baseLang = regionLang.split('-')[0].toUpperCase();

  const content = languageContent[baseLang] || languageContent['EN'];

  // Create container
  const fullWidthContainer = document.createElement("div");
  fullWidthContainer.classList.add("ccx-login-container");
  container.parentNode.insertBefore(fullWidthContainer, container);

  // Heading
  const h1Element = document.createElement("h1");
  h1Element.textContent = content.Main_copy;
  fullWidthContainer.appendChild(h1Element);

  // Paragraph
  const pElement = document.createElement("p");
  // pElement.textContent = content.Supporting_copy;
  pElement.innerHTML = content.Supporting_copy;
  fullWidthContainer.appendChild(pElement);

  // Button container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("ccx-button-container");
  fullWidthContainer.appendChild(buttonContainer);

  // Register button
  const registerLink = document.createElement("button");
  registerLink.classList.add('ccx-button', 'ccx-button_register');
  registerLink.textContent = content.Register_CTA;
  registerLink.href = `https://www.theoutnet.com/${regionLang}/account/register`;
  buttonContainer.appendChild(registerLink);

  // Sign In button
  const signInLink = document.createElement("button");
  signInLink.classList.add('ccx-button', 'ccx-button_login');
  signInLink.textContent = content.Sign_in_CTA;
  signInLink.href = `https://www.theoutnet.com/${regionLang}/account/login`;
  buttonContainer.appendChild(signInLink);


};

const attachEventListeners = function () {
  customLog("🎯 Attaching event listeners...");
  const logInButton = document.querySelector('.ccx-button_login');
  if (logInButton) {
    logInButton.addEventListener('click', () => {
      customLog("🎯 Clicked log in button");

      window.optimizely = window.optimizely || [];
      window.optimizely.push({
        type: "event",
        eventName: "web-00716_login"
      });

      window.location.href = "https://www.theoutnet.com/en-gb/account/login";
    });
  } else {
    customLog("❌ Log in button not found.");
  }

  const registerButton = document.querySelector('.ccx-button_register');
  if (registerButton) {
    registerButton.addEventListener('click', () => {
      customLog("🎯 Clicked register button");

      window.optimizely = window.optimizely || [];
      window.optimizely.push({
        type: "event",
        eventName: "web-00716_register"
      });

      // Extract region-language
      const regionLangMatch = window.location.pathname.match(/^\/([a-z]{2}-[a-z]{2})\//i);
      const regionLang = regionLangMatch ? regionLangMatch[1] : 'en-gb';

      setTimeout(() => {
        window.location.href = `https://www.theoutnet.com/${regionLang}/account/register`;
      }, 250);
    });
  } else {
    customLog("❌ Register button not found.");
  }
};

const insersectElements = (element) => {
  window.optimizely = window.optimizely || [];

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      customLog("🎯 Element in view:", element);
      observer.unobserve(entries[0].target);
      window.optimizely.push({
        type: 'user',
        attributes: {
          'web-00716': 'reached-section'
        }
      });
    }
  }, {
    threshold: 1.0
  });

  observer.observe(element);
};

const checkUserSummary = () => {
  const maxTime = 5000; // 5 seconds
  const interval = 500; // Check every 500ms
  const maxAttempts = maxTime / interval;
  let attempts = 0;

  const pollForUserSummary = () => {
    if (window.SF && window.SF.getUserSummary) {
      window.SF.getUserSummary()
        .then(result => {
          if (result === null) {
            console.log("🚫 User summary is null");
          } else {
            console.log("🎯 User summary received:", result);
          }
        })
        .catch(error => {
          console.log("❌ Error calling getUserSummary:", error);
        });
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(pollForUserSummary, interval);
    } else {
      console.log("❌ window.SF.getUserSummary not found after 5 seconds");
    }
  };

  pollForUserSummary();
};

const init = function () {
  try {
    customLog("🚀 INIT STARTED");

    document.body.classList.add(`ccx-outnet-web-00716-${TEST_META.VARIATION}`);

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
      insersectElements(justInParentTopLevelContainer);
      checkUserSummary();
    });

    customLog("🎉 INIT COMPLETE");
  } catch (error) {
    console.error("[init] ❌ Error: " + error.message + "\nStack: " + error.stack);
  }
};

init();
