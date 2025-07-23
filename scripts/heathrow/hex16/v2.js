const LOG_ENABLED = true;
const newTextSingular = 'Buy your ticket';
const newTextPlural = 'Buy your tickets';

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

const replaceText = (element, newTextSingular, newTextPlural) => {
  customLog('REPLACE TEXT FUNCTION CALLED');
  const currentText = element.textContent;
  customLog('CURRENT TEXT:', currentText);

  if (currentText === 'Get Your Ticket') {
    customLog('REPLACING TEXT WITH SINGULAR VERSION');
    element.textContent = newTextSingular;
  }
  
  if (currentText === 'Get Your Tickets') {
    customLog('REPLACING TEXT WITH PLURAL VERSION');
    element.textContent = newTextPlural;
  }
};

const observeButtonElement = (buttonElement, newTextSingular, newTextPlural) => {
  customLog('OBSERVE BUTTON ELEMENT FUNCTION CALLED');
  const observer = new MutationObserver((mutations) => {
    customLog('MUTATION OBSERVED');
    mutations.forEach((mutation) => {
      customLog('MUTATION DETAILS:', mutation);
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        customLog('TEXT CONTENT CHANGED:', mutation.target.textContent);
        replaceText(mutation.target, newTextSingular, newTextPlural);
      }
    });
  });

  observer.observe(buttonElement, {
    childList: true,
    characterData: true,
    subtree: true,
  });
  customLog('BUTTON ELEMENT OBSERVED');
};

const pollForButtonElement = (newTextSingular, newTextPlural, timeout = 10000) => {
  customLog('POLL FOR BUTTON ELEMENT FUNCTION CALLED');
  const buttonElement = document.querySelector('main > div > section:first-child > .max-w-limit > .relative > div:first-child > div:first-child > div > div:last-child > button');
  customLog('BUTTON ELEMENT QUERY RESULT:', buttonElement);
  
  if (buttonElement) {
    customLog('BUTTON ELEMENT FOUND, PERFORMING INITIAL TEXT REPLACEMENT');
    const buttonTextElement = buttonElement.querySelector('div');
    customLog('BUTTON TEXT ELEMENT QUERY RESULT:', buttonTextElement);
    if (buttonTextElement) {
        replaceText(buttonTextElement, newTextSingular, newTextPlural);
        observeButtonElement(buttonElement, newTextSingular, newTextPlural);
    }
  } else {
    customLog('BUTTON ELEMENT NOT FOUND, RETRYING IN', timeout, 'MS');
    setTimeout(() => {
      pollForButtonElement(newTextSingular, newTextPlural, timeout);
    }, timeout);
  }
};

pollForButtonElement(newTextSingular, newTextPlural);