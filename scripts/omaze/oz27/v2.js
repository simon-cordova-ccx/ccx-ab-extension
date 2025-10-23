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
  image1: 'https://cdn.shopify.com/s/files/1/0275/8390/5878/files/BCN_SHIELDArtboard_1_copy_27WEBSITE.png?v=1758014149',
  image2: 'https://cdn.shopify.com/s/files/1/0275/8390/5878/files/BCN_SHIELDArtboard_1_copy_27WEBSITE.png?v=1758014149',
  image3: 'https://cdn.shopify.com/s/files/1/0275/8390/5878/files/BCN_SHIELDArtboard_1_copy_27WEBSITE.png?v=1758014149',
  image4: 'https://cdn.shopify.com/s/files/1/0275/8390/5878/files/BCN_SHIELDArtboard_1_copy_27WEBSITE.png?v=1758014149',
}

const SLIDE_DATA = [
  {
    image: IMAGES.image1,
    name: 'Valeri A',
    mainText: "\"This is such a great idea to boost funds for charities as well as giving people just a chance to win such great prizes.\"",
    userInfo: 'a retired cabbie, won a £4M house in Sussex.'
  },
  {
    image: IMAGES.image2,
    name: 'Lukas Kuprian',
    mainText: "\"Super easy and yet very trustworthy process. Excited to see how my luck is playing out.\"",
    userInfo: 'an English teacher, won a £5M house in London.'
  },
  {
    image: IMAGES.image3,
    name: 'Abigail T',
    mainText: "\"Easy to use site, very clear information and options that work for everyone, great way to support an array of charities.\"",
    userInfo: 'a former nurse, won a £4.5M house in Cornwall.'
  },
  {
    image: IMAGES.image4,
    name: 'Nick I',
    mainText: "\"Great company doing so much good for so many charities and for us ordinary people hope that one day we could be one of the lucky winners.\"",
    userInfo: 'dad-to-be, won a £4.5M house in London.'
  },
  {
    image: IMAGES.image4,
    name: 'Matt C',
    mainText: "\"I like the opportunity to change my lifestyle as well as being able to help a great charitable cause.\"",
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
  position: relative;
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
  height: 162px;
  background: #081F28;
  display: flex;
  padding: 1rem 1rem;
  border-radius: 20px;
  box-sizing: border-box;
  position: relative;
}

/* Slide content layout */
.slide-content {
  display: flex;
  flex-direction: row;
  text-shadown: none;
}

/* Left side: Image */
.slide-image {
  background: #FFDD00;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  border: 2px solid #FFDD00;
  padding: 0;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  text-shadow: none;
}

.slide-image img {
  width: 60px;
  height: 60px;
  display: block;
  border: 2px solid #FEDC03;
  opacity: 1;
  border-radius: 50%;
  border-width: 2px;
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
  display: none;
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

.ccx-trustpilot {
  position: absolute;
  bottom: 1rem;
  right: 3rem;
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
    height: 141px;
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

@media (min-width: 768px) and (max-width: 991px) {
  .slideshow-wrapper {
    padding-bottom: 2rem;
  }
}
`;

function getInitials(fullName = '') {
  return fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part[0].toUpperCase())
    .join('');
}


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
    imageDiv.textContent = getInitials(data.name);

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

    userP.appendChild(nameSpan);
    userP.appendChild(infoSpan);
    textDiv.appendChild(mainP);
    textDiv.appendChild(userP);
    content.appendChild(imageDiv);
    content.appendChild(textDiv);
    // content.appendChild(trustPilotElement);
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

  // Trust Pilot:
  const trustPilotHTML = `<div class="ccx-trustpilot"><svg width="167" height="21" viewBox="0 0 167 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_4338_615)">
    <path d="M78.1289 2.1449H94.4503V18.4663H78.1289V2.1449ZM95.8105 2.1449H112.132V18.4663H95.8105V2.1449ZM113.492 2.1449H129.813V18.4663H113.492V2.1449ZM131.174 2.1449H147.495V18.4663H131.174V2.1449ZM148.855 2.1449H165.177V18.4663H148.855V2.1449Z" fill="#00B67A"/>
    <path d="M86.2892 13.1448L88.7714 12.5158L89.8085 15.7121L86.2892 13.1448ZM92.0017 9.01347H87.6323L86.2892 4.89911L84.946 9.01347H80.5767L84.113 11.5637L82.7699 15.6781L86.3062 13.1278L88.4824 11.5637L92.0017 9.01347ZM103.971 13.1448L106.453 12.5158L107.49 15.7121L103.971 13.1448ZM109.683 9.01347H105.314L103.971 4.89911L102.628 9.01347H98.2582L101.795 11.5637L100.451 15.6781L103.988 13.1278L106.164 11.5637L109.683 9.01347ZM121.652 13.1448L124.134 12.5158L125.172 15.7121L121.652 13.1448ZM127.365 9.01347H122.995L121.652 4.89911L120.309 9.01347H115.94L119.476 11.5637L118.133 15.6781L121.669 13.1278L123.845 11.5637L127.365 9.01347ZM139.334 13.1448L141.816 12.5158L142.853 15.7121L139.334 13.1448ZM145.046 9.01347H140.677L139.334 4.89911L137.991 9.01347H133.621L137.158 11.5637L135.815 15.6781L139.351 13.1278L141.527 11.5637L145.046 9.01347ZM157.015 13.1448L159.498 12.5158L160.535 15.7121L157.015 13.1448ZM162.728 9.01347H158.359L157.015 4.89911L155.672 9.01347H151.303L154.839 11.5637L153.496 15.6781L157.032 13.1278L159.209 11.5637L162.728 9.01347Z" fill="white"/>
    </g>
    <g clip-path="url(#clip1_4338_615)">
    <path d="M20.6466 7.43597H28.0517V8.81757H25.14V16.5842H23.5389V8.81757H20.6401V7.43597H20.6466ZM27.7354 9.9603H29.104V11.2386H29.1299C29.1751 11.0578 29.259 10.8835 29.3816 10.7157C29.5043 10.5478 29.6528 10.3864 29.8271 10.2508C30.0014 10.1088 30.1951 9.99903 30.4082 9.90865C30.6212 9.82472 30.8407 9.77953 31.0602 9.77953C31.2281 9.77953 31.3507 9.78598 31.4153 9.79244C31.4799 9.79889 31.5444 9.81181 31.6154 9.81826V11.2257C31.5122 11.2063 31.4089 11.1934 31.2991 11.1805C31.1893 11.1676 31.086 11.1611 30.9828 11.1611C30.7374 11.1611 30.505 11.2128 30.2855 11.3096C30.066 11.4065 29.8788 11.5549 29.7174 11.7422C29.556 11.9359 29.4268 12.1683 29.33 12.4523C29.2332 12.7364 29.188 13.0592 29.188 13.4272V16.5778H27.7289V9.9603H27.7354ZM38.3233 16.5842H36.8901V15.661H36.8642C36.6835 15.9967 36.4188 16.2614 36.0637 16.4616C35.7086 16.6617 35.3471 16.765 34.9791 16.765C34.1075 16.765 33.4748 16.5519 33.0874 16.1194C32.7001 15.6868 32.5064 15.0348 32.5064 14.1632V9.9603H33.9655V14.0212C33.9655 14.6022 34.0752 15.0154 34.3012 15.2543C34.5207 15.4931 34.837 15.6158 35.2373 15.6158C35.5472 15.6158 35.799 15.5706 36.0056 15.4738C36.2122 15.3769 36.38 15.2543 36.5027 15.0929C36.6318 14.9379 36.7222 14.7442 36.7803 14.5247C36.8384 14.3052 36.8642 14.0664 36.8642 13.8081V9.96675H38.3233V16.5842ZM40.8089 14.4602C40.8541 14.8863 41.0155 15.1833 41.2931 15.3576C41.5772 15.5254 41.9129 15.6158 42.3067 15.6158C42.4423 15.6158 42.5972 15.6029 42.7715 15.5835C42.9458 15.5642 43.1137 15.519 43.2622 15.4609C43.4171 15.4028 43.5398 15.3124 43.6431 15.1962C43.7399 15.08 43.7851 14.9315 43.7787 14.7442C43.7722 14.557 43.7012 14.4021 43.5721 14.2859C43.443 14.1632 43.2816 14.0728 43.0814 13.9953C42.8813 13.9243 42.6553 13.8598 42.3971 13.8081C42.1388 13.7565 41.8806 13.6984 41.6159 13.6403C41.3447 13.5821 41.08 13.5047 40.8283 13.4207C40.5765 13.3368 40.3505 13.2206 40.1504 13.0721C39.9502 12.9301 39.7888 12.7429 39.6726 12.5169C39.55 12.2909 39.4918 12.0133 39.4918 11.6776C39.4918 11.3161 39.5822 11.0191 39.7565 10.7738C39.9309 10.5284 40.1568 10.3347 40.4215 10.1863C40.6927 10.0378 40.9897 9.93447 41.3189 9.86991C41.6482 9.81181 41.9645 9.77953 42.2615 9.77953C42.6037 9.77953 42.9329 9.81826 43.2428 9.88928C43.5527 9.9603 43.8368 10.0765 44.0886 10.2444C44.3404 10.4058 44.5469 10.6188 44.7148 10.8771C44.8827 11.1353 44.986 11.4516 45.0312 11.8196H43.5075C43.4365 11.471 43.2816 11.2321 43.0298 11.1159C42.778 10.9933 42.4875 10.9352 42.1647 10.9352C42.0614 10.9352 41.9387 10.9416 41.7967 10.961C41.6546 10.9804 41.5255 11.0126 41.3964 11.0578C41.2737 11.103 41.1704 11.174 41.08 11.2644C40.9961 11.3548 40.9509 11.471 40.9509 11.6195C40.9509 11.8003 41.0155 11.9423 41.1381 12.0521C41.2608 12.1618 41.4222 12.2522 41.6223 12.3297C41.8225 12.4007 42.0484 12.4652 42.3067 12.5169C42.5649 12.5685 42.8296 12.6266 43.1008 12.6848C43.3655 12.7429 43.6237 12.8203 43.882 12.9043C44.1402 12.9882 44.3662 13.1044 44.5663 13.2529C44.7665 13.4014 44.9279 13.5821 45.0505 13.8017C45.1732 14.0212 45.2377 14.2988 45.2377 14.6216C45.2377 15.0154 45.1474 15.3447 44.9666 15.6223C44.7858 15.8934 44.5534 16.1194 44.2693 16.2872C43.9853 16.4551 43.6625 16.5842 43.3138 16.6617C42.9652 16.7392 42.6166 16.7779 42.2744 16.7779C41.8548 16.7779 41.4674 16.7327 41.1123 16.6359C40.7572 16.539 40.4473 16.397 40.1891 16.2098C39.9309 16.0161 39.7243 15.7772 39.5758 15.4931C39.4273 15.2091 39.3498 14.8669 39.3369 14.4731H40.8089V14.4602ZM45.6251 9.9603H46.7291V7.97183H48.1882V9.9603H49.5052V11.0514H48.1882V14.5893C48.1882 14.7442 48.1946 14.8734 48.2075 14.9896C48.2204 15.0993 48.2527 15.1962 48.2979 15.2736C48.3431 15.3511 48.4141 15.4092 48.511 15.448C48.6078 15.4867 48.7305 15.5061 48.8983 15.5061C49.0016 15.5061 49.1049 15.5061 49.2082 15.4996C49.3115 15.4931 49.4148 15.4802 49.5181 15.4544V16.5842C49.3567 16.6036 49.1953 16.6165 49.0468 16.6359C48.8919 16.6552 48.7369 16.6617 48.5755 16.6617C48.1882 16.6617 47.8783 16.623 47.6459 16.5519C47.4134 16.4809 47.2262 16.3712 47.0971 16.2291C46.9615 16.0871 46.8776 15.9128 46.8259 15.6997C46.7807 15.4867 46.7485 15.2414 46.742 14.9702V11.0643H45.638V9.9603H45.6251ZM50.5382 9.9603H51.9198V10.8577H51.9456C52.1522 10.4703 52.4363 10.1992 52.8043 10.0313C53.1722 9.86345 53.5661 9.77953 53.9986 9.77953C54.5216 9.77953 54.9735 9.86991 55.3609 10.0571C55.7482 10.2379 56.071 10.4897 56.3293 10.8125C56.5875 11.1353 56.7747 11.5098 56.9039 11.9359C57.033 12.362 57.0975 12.8203 57.0975 13.3045C57.0975 13.75 57.0394 14.1826 56.9232 14.5957C56.807 15.0154 56.6327 15.3834 56.4003 15.7062C56.1679 16.029 55.8709 16.2808 55.5093 16.4745C55.1478 16.6681 54.7282 16.765 54.2375 16.765C54.0245 16.765 53.8114 16.7456 53.5983 16.7069C53.3853 16.6681 53.1787 16.6036 52.985 16.5197C52.7913 16.4357 52.6041 16.326 52.4427 16.1904C52.2749 16.0548 52.1393 15.8999 52.0231 15.7256H51.9972V19.0311H50.5382V9.9603ZM55.6385 13.2787C55.6385 12.9817 55.5997 12.6912 55.5223 12.4071C55.4448 12.1231 55.3286 11.8777 55.1736 11.6582C55.0187 11.4387 54.825 11.2644 54.599 11.1353C54.3666 11.0062 54.1019 10.9352 53.8049 10.9352C53.1916 10.9352 52.7268 11.1482 52.4169 11.5743C52.107 12.0004 51.9521 12.5685 51.9521 13.2787C51.9521 13.6144 51.9908 13.9243 52.0747 14.2084C52.1586 14.4925 52.2749 14.7378 52.4427 14.9444C52.6041 15.151 52.7978 15.3124 53.0238 15.4286C53.2497 15.5512 53.5144 15.6094 53.8114 15.6094C54.1471 15.6094 54.4247 15.5383 54.6571 15.4028C54.8896 15.2672 55.0768 15.0864 55.2253 14.8734C55.3738 14.6539 55.4835 14.4085 55.5481 14.1309C55.6062 13.8533 55.6385 13.5692 55.6385 13.2787ZM58.2144 7.43597H59.6735V8.81757H58.2144V7.43597ZM58.2144 9.9603H59.6735V16.5842H58.2144V9.9603ZM60.9776 7.43597H62.4367V16.5842H60.9776V7.43597ZM66.9108 16.765C66.3814 16.765 65.9101 16.6746 65.4969 16.5003C65.0837 16.326 64.7351 16.0806 64.4445 15.7772C64.1605 15.4673 63.941 15.0993 63.7925 14.6732C63.644 14.2471 63.5665 13.7758 63.5665 13.2658C63.5665 12.7622 63.644 12.2974 63.7925 11.8713C63.941 11.4452 64.1605 11.0772 64.4445 10.7673C64.7286 10.4574 65.0837 10.2185 65.4969 10.0442C65.9101 9.86991 66.3814 9.77953 66.9108 9.77953C67.4402 9.77953 67.9114 9.86991 68.3246 10.0442C68.7378 10.2185 69.0865 10.4639 69.377 10.7673C69.661 11.0772 69.8805 11.4452 70.029 11.8713C70.1775 12.2974 70.255 12.7622 70.255 13.2658C70.255 13.7758 70.1775 14.2471 70.029 14.6732C69.8805 15.0993 69.661 15.4673 69.377 15.7772C69.0929 16.0871 68.7378 16.326 68.3246 16.5003C67.9114 16.6746 67.4402 16.765 66.9108 16.765ZM66.9108 15.6094C67.2336 15.6094 67.5176 15.5383 67.7565 15.4028C67.9954 15.2672 68.1891 15.0864 68.344 14.8669C68.499 14.6474 68.6087 14.3956 68.6862 14.118C68.7572 13.8404 68.7959 13.5563 68.7959 13.2658C68.7959 12.9817 68.7572 12.7041 68.6862 12.4201C68.6152 12.136 68.499 11.8907 68.344 11.6712C68.1891 11.4516 67.9954 11.2773 67.7565 11.1418C67.5176 11.0062 67.2336 10.9352 66.9108 10.9352C66.5879 10.9352 66.3039 11.0062 66.065 11.1418C65.8261 11.2773 65.6325 11.4581 65.4775 11.6712C65.3226 11.8907 65.2128 12.136 65.1353 12.4201C65.0643 12.7041 65.0256 12.9817 65.0256 13.2658C65.0256 13.5563 65.0643 13.8404 65.1353 14.118C65.2064 14.3956 65.3226 14.6474 65.4775 14.8669C65.6325 15.0864 65.8261 15.2672 66.065 15.4028C66.3039 15.5448 66.5879 15.6094 66.9108 15.6094ZM70.6811 9.9603H71.7851V7.97183H73.2442V9.9603H74.5612V11.0514H73.2442V14.5893C73.2442 14.7442 73.2506 14.8734 73.2635 14.9896C73.2764 15.0993 73.3087 15.1962 73.3539 15.2736C73.3991 15.3511 73.4701 15.4092 73.567 15.448C73.6638 15.4867 73.7865 15.5061 73.9543 15.5061C74.0576 15.5061 74.1609 15.5061 74.2642 15.4996C74.3675 15.4931 74.4708 15.4802 74.5741 15.4544V16.5842C74.4127 16.6036 74.2513 16.6165 74.1028 16.6359C73.9479 16.6552 73.7929 16.6617 73.6315 16.6617C73.2442 16.6617 72.9343 16.623 72.7018 16.5519C72.4694 16.4809 72.2822 16.3712 72.1531 16.2291C72.0175 16.0871 71.9336 15.9128 71.8819 15.6997C71.8367 15.4867 71.8045 15.2414 71.798 14.9702V11.0643H70.694V9.9603H70.6811Z" fill="white"/>
    <path d="M18.9425 7.79274H12.2541L10.1881 1.42706L8.11573 7.79274L1.42725 7.78629L6.84388 11.7245L4.77149 18.0837L10.1881 14.152L15.5983 18.0837L13.5324 11.7245L18.9425 7.79274Z" fill="#00B67A"/>
    <path d="M13.9966 13.1642L13.5317 11.7245L10.1875 14.152L13.9966 13.1642Z" fill="#005128"/>
    </g>
    <defs>
    <clipPath id="clip0_4338_615">
    <rect width="87.0477" height="16.3301" fill="white" transform="translate(78.1289 2.14056)"/>
    </clipPath>
    <clipPath id="clip1_4338_615">
    <rect width="73.1343" height="17.9608" fill="white" transform="translate(1.42725 1.42706)"/>
    </clipPath>
    </defs>
    </svg></div>`;

    container.insertAdjacentHTML('beforeend', trustPilotHTML);

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