const CONTROL_HERO_CONTAINER = document.querySelector('main > .max-w-limit section:nth-child(1) > div:last-child > div:last-child');

if (CONTROL_HERO_CONTAINER) {
  CONTROL_HERO_CONTAINER.style.flexDirection = 'row-reverse';
}

const CONTROL_HERO_TITLE = document.querySelector('main > .max-w-limit section:nth-child(1) > div:last-child > div:last-child h1');
if (CONTROL_HERO_TITLE) {
  const heroTitleTextContent = CONTROL_HERO_TITLE.textContent.trim();
  CONTROL_HERO_TITLE.innerHTML = `Think speed.<br>${heroTitleTextContent}`;
}

const newParagraphs = [
    "Travel in comfort with onboard Wi-Fi",
    "Our trains run from 4:34am (Mon-Sun)",
    "No peak time costs"
]

const CONTROL_HERO_LIST_PARAGRAPHS = document.querySelectorAll('main > .max-w-limit section:nth-child(1) > div:last-child > div:last-child ul p');
if (CONTROL_HERO_LIST_PARAGRAPHS.length > 0) {
    CONTROL_HERO_LIST_PARAGRAPHS.forEach((paragraph, index) => {
        paragraph.textContent = newParagraphs[index];
    });
}


document.body.classList.add('ccx-omaze-hex21-v3');