(function () {
    const LOG_ENABLED = true;
    const TEST_ID = "DE13";
    const TEST_NAME = "TRUST PILOT ON THE HOMEPAGE";
    const VARIATION = "variation-1";
    const CURRENT_URL = window.location.href;
    const SOURCE_TYPE = "NO SOURCE";
    const IS_STAGING_ENV = CURRENT_URL.includes('staging');
    let resizeTimer;
    let isAnimating = false;

    const SELECTORS = {
        CONTROL_HMA_LAST_H3: '.hero-mobile-addendum > .hma-content > h3:last-of-type',
    };

    const SLIDE_DATA = [
        {
            name: 'Karim P',
            mainText: "Schön etwas gutes zu tun und gleichzeitig die Chance zu haben etwas zu gewinnen!",
            userInfo: ' 8.Oktober 2025'
        },
        {
            name: 'Felix',
            mainText: "Wie immer gut und vertrauenswürdig. Übersichtliche Website und einfache Abwicklung.",
            userInfo: '6.Oktober 2025'
        },
        {
            name: 'Jürgen A',
            mainText: "Einfache und schnelle Abwicklung, angenehme Kommunikation und ein soziales Unternehmen. Sehr gut.",
            userInfo: '5.Oktober 2025'
        },
        {
            name: 'Jeanette',
            mainText: "Unkompliziert und einfach! Tolle Sache! Spenden und eventuell mit etwas Glück sogar noch gewinnen 😊 ",
            userInfo: '3.Oktober 2025'
        },
    ];

    const ARROW_LEFT = `<svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.82747 7.00414L6.75663 1.97199C6.92428 1.80083 7.00532 1.59829 6.99973 1.36437C6.99414 1.13045 6.90752 0.927904 6.73986 0.756742C6.5722 0.585581 6.37381 0.5 6.14467 0.5C5.91554 0.5 5.71714 0.585581 5.54949 0.756742L0.402379 6.02852C0.268252 6.16545 0.167658 6.31949 0.100595 6.49066C0.0335312 6.66182 0 6.83298 0 7.00414C0 7.1753 0.0335312 7.34646 0.100595 7.51763C0.167658 7.68879 0.268252 7.84283 0.402379 7.97976L5.56625 13.2515C5.73391 13.4227 5.92951 13.5054 6.15306 13.4997C6.3766 13.494 6.5722 13.4056 6.73986 13.2344C6.90752 13.0633 6.99135 12.8607 6.99135 12.6268C6.99135 12.3929 6.90752 12.1903 6.73986 12.0192L1.82747 7.00414Z" fill="white"/>
</svg>`;

    const ARROW_RIGHT = `<svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(180deg);">
  <path d="M1.82747 7.00414L6.75663 1.97199C6.92428 1.80083 7.00532 1.59829 6.99973 1.36437C6.99414 1.13045 6.90752 0.927904 6.73986 0.756742C6.5722 0.585581 6.37381 0.5 6.14467 0.5C5.91554 0.5 5.71714 0.585581 5.54949 0.756742L0.402379 6.02852C0.268252 6.16545 0.167658 6.31949 0.100595 6.49066C0.0335312 6.66182 0 6.83298 0 7.00414C0 7.1753 0.0335312 7.34646 0.100595 7.51763C0.167658 7.68879 0.268252 7.84283 0.402379 7.97976L5.56625 13.2515C5.73391 13.4227 5.92951 13.5054 6.15306 13.4997C6.3766 13.494 6.5722 13.4056 6.73986 13.2344C6.90752 13.0633 6.99135 12.8607 6.99135 12.6268C6.99135 12.3929 6.90752 12.1903 6.73986 12.0192L1.82747 7.00414Z" fill="white"/>
</svg>`;

    const TRUST_PILOT_HTML = `<div class="ccx-trustpilot"><svg width="167" height="21" viewBox="0 0 167 21" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_4338_615)"><path d="M78.1289 2.1449H94.4503V18.4663H78.1289V2.1449ZM95.8105 2.1449H112.132V18.4663H95.8105V2.1449ZM113.492 2.1449H129.813V18.4663H113.492V2.1449ZM131.174 2.1449H147.495V18.4663H131.174V2.1449ZM148.855 2.1449H165.177V18.4663H148.855V2.1449Z" fill="#00B67A"/><path d="M86.2892 13.1448L88.7714 12.5158L89.8085 15.7121L86.2892 13.1448ZM92.0017 9.01347H87.6323L86.2892 4.89911L84.946 9.01347H80.5767L84.113 11.5637L82.7699 15.6781L86.3062 13.1278L88.4824 11.5637L92.0017 9.01347ZM103.971 13.1448L106.453 12.5158L107.49 15.7121L103.971 13.1448ZM109.683 9.01347H105.314L103.971 4.89911L102.628 9.01347H98.2582L101.795 11.5637L100.451 15.6781L103.988 13.1278L106.164 11.5637L109.683 9.01347ZM121.652 13.1448L124.134 12.5158L125.172 15.7121L121.652 13.1448ZM127.365 9.01347H122.995L121.652 4.89911L120.309 9.01347H115.94L119.476 11.5637L118.133 15.6781L121.669 13.1278L123.845 11.5637L127.365 9.01347ZM139.334 13.1448L141.816 12.5158L142.853 15.7121L139.334 13.1448ZM145.046 9.01347H140.677L139.334 4.89911L137.991 9.01347H133.621L137.158 11.5637L135.815 15.6781L139.351 13.1278L141.527 11.5637L145.046 9.01347ZM157.015 13.1448L159.498 12.5158L160.535 15.7121L157.015 13.1448ZM162.728 9.01347H158.359L157.015 4.89911L155.672 9.01347H151.303L154.839 11.5637L153.496 15.6781L157.032 13.1278L159.209 11.5637L162.728 9.01347Z" fill="white"/></g><g clip-path="url(#clip1_4338_615)"><path d="M20.6466 7.43597H28.0517V8.81757H25.14V16.5842H23.5389V8.81757H20.6401V7.43597H20.6466ZM27.7354 9.9603H29.104V11.2386H29.1299C29.1751 11.0578 29.259 10.8835 29.3816 10.7157C29.5043 10.5478 29.6528 10.3864 29.8271 10.2508C30.0014 10.1088 30.1951 9.99903 30.4082 9.90865C30.6212 9.82472 30.8407 9.77953 31.0602 9.77953C31.2281 9.77953 31.3507 9.78598 31.4153 9.79244C31.4799 9.79889 31.5444 9.81181 31.6154 9.81826V11.2257C31.5122 11.2063 31.4089 11.1934 31.2991 11.1805C31.1893 11.1676 31.086 11.1611 30.9828 11.1611C30.7374 11.1611 30.505 11.2128 30.2855 11.3096C30.066 11.4065 29.8788 11.5549 29.7174 11.7422C29.556 11.9359 29.4268 12.1683 29.33 12.4523C29.2332 12.7364 29.188 13.0592 29.188 13.4272V16.5778H27.7289V9.9603H27.7354ZM38.3233 16.5842H36.8901V15.661H36.8642C36.6835 15.9967 36.4188 16.2614 36.0637 16.4616C35.7086 16.6617 35.3471 16.765 34.9791 16.765C34.1075 16.765 33.4748 16.5519 33.0874 16.1194C32.7001 15.6868 32.5064 15.0348 32.5064 14.1632V9.9603H33.9655V14.0212C33.9655 14.6022 34.0752 15.0154 34.3012 15.2543C34.5207 15.4931 34.837 15.6158 35.2373 15.6158C35.5472 15.6158 35.799 15.5706 36.0056 15.4738C36.2122 15.3769 36.38 15.2543 36.5027 15.0929C36.6318 14.9379 36.7222 14.7442 36.7803 14.5247C36.8384 14.3052 36.8642 14.0664 36.8642 13.8081V9.96675H38.3233V16.5842ZM40.8089 14.4602C40.8541 14.8863 41.0155 15.1833 41.2931 15.3576C41.5772 15.5254 41.9129 15.6158 42.3067 15.6158C42.4423 15.6158 42.5972 15.6029 42.7715 15.5835C42.9458 15.5642 43.1137 15.519 43.2622 15.4609C43.4171 15.4028 43.5398 15.3124 43.6431 15.1962C43.7399 15.08 43.7851 14.9315 43.7787 14.7442C43.7722 14.557 43.7012 14.4021 43.5721 14.2859C43.443 14.1632 43.2816 14.0728 43.0814 13.9953C42.8813 13.9243 42.6553 13.8598 42.3971 13.8081C42.1388 13.7565 41.8806 13.6984 41.6159 13.6403C41.3447 13.5821 41.08 13.5047 40.8283 13.4207C40.5765 13.3368 40.3505 13.2206 40.1504 13.0721C39.9502 12.9301 39.7888 12.7429 39.6726 12.5169C39.55 12.2909 39.4918 12.0133 39.4918 11.6776C39.4918 11.3161 39.5822 11.0191 39.7565 10.7738C39.9309 10.5284 40.1568 10.3347 40.4215 10.1863C40.6927 10.0378 40.9897 9.93447 41.3189 9.86991C41.6482 9.81181 41.9645 9.77953 42.2615 9.77953C42.6037 9.77953 42.9329 9.81826 43.2428 9.88928C43.5527 9.9603 43.8368 10.0765 44.0886 10.2444C44.3404 10.4058 44.5469 10.6188 44.7148 10.8771C44.8827 11.1353 44.986 11.4516 45.0312 11.8196H43.5075C43.4365 11.471 43.2816 11.2321 43.0298 11.1159C42.778 10.9933 42.4875 10.9352 42.1647 10.9352C42.0614 10.9352 41.9387 10.9416 41.7967 10.961C41.6546 10.9804 41.5255 11.0126 41.3964 11.0578C41.2737 11.103 41.1704 11.174 41.08 11.2644C40.9961 11.3548 40.9509 11.471 40.9509 11.6195C40.9509 11.8003 41.0155 11.9423 41.1381 12.0521C41.2608 12.1618 41.4222 12.2522 41.6223 12.3297C41.8225 12.4007 42.0484 12.4652 42.3067 12.5169C42.5649 12.5685 42.8296 12.6266 43.1008 12.6848C43.3655 12.7429 43.6237 12.8203 43.882 12.9043C44.1402 12.9882 44.3662 13.1044 44.5663 13.2529C44.7665 13.4014 44.9279 13.5821 45.0505 13.8017C45.1732 14.0212 45.2377 14.2988 45.2377 14.6216C45.2377 15.0154 45.1474 15.3447 44.9666 15.6223C44.7858 15.8934 44.5534 16.1194 44.2693 16.2872C43.9853 16.4551 43.6625 16.5842 43.3138 16.6617C42.9652 16.7392 42.6166 16.7779 42.2744 16.7779C41.8548 16.7779 41.4674 16.7327 41.1123 16.6359C40.7572 16.539 40.4473 16.397 40.1891 16.2098C39.9309 16.0161 39.7243 15.7772 39.5758 15.4931C39.4273 15.2091 39.3498 14.8669 39.3369 14.4731H40.8089V14.4602ZM45.6251 9.9603H46.7291V7.97183H48.1882V9.9603H49.5052V11.0514H48.1882V14.5893C48.1882 14.7442 48.1946 14.8734 48.2075 14.9896C48.2204 15.0993 48.2527 15.1962 48.2979 15.2736C48.3431 15.3511 48.4141 15.4092 48.511 15.448C48.6078 15.4867 48.7305 15.5061 48.8983 15.5061C49.0016 15.5061 49.1049 15.5061 49.2082 15.4996C49.3115 15.4931 49.4148 15.4802 49.5181 15.4544V16.5842C49.3567 16.6036 49.1953 16.6165 49.0468 16.6359C48.8919 16.6552 48.7369 16.6617 48.5755 16.6617C48.1882 16.6617 47.8783 16.623 47.6459 16.5519C47.4134 16.4809 47.2262 16.3712 47.0971 16.2291C46.9615 16.0871 46.8776 15.9128 46.8259 15.6997C46.7807 15.4867 46.7485 15.2414 46.742 14.9702V11.0643H45.638V9.9603H45.6251ZM50.5382 9.9603H51.9198V10.8577H51.9456C52.1522 10.4703 52.4363 10.1992 52.8043 10.0313C53.1722 9.86345 53.5661 9.77953 53.9986 9.77953C54.5216 9.77953 54.9735 9.86991 55.3609 10.0571C55.7482 10.2379 56.071 10.4897 56.3293 10.8125C56.5875 11.1353 56.7747 11.5098 56.9039 11.9359C57.033 12.362 57.0975 12.8203 57.0975 13.3045C57.0975 13.75 57.0394 14.1826 56.9232 14.5957C56.807 15.0154 56.6327 15.3834 56.4003 15.7062C56.1679 16.029 55.8709 16.2808 55.5093 16.4745C55.1478 16.6681 54.7282 16.765 54.2375 16.765C54.0245 16.765 53.8114 16.7456 53.5983 16.7069C53.3853 16.6681 53.1787 16.6036 52.985 16.5197C52.7913 16.4357 52.6041 16.326 52.4427 16.1904C52.2749 16.0548 52.1393 15.8999 52.0231 15.7256H51.9972V19.0311H50.5382V9.9603ZM55.6385 13.2787C55.6385 12.9817 55.5997 12.6912 55.5223 12.4071C55.4448 12.1231 55.3286 11.8777 55.1736 11.6582C55.0187 11.4387 54.825 11.2644 54.599 11.1353C54.3666 11.0062 54.1019 10.9352 53.8049 10.9352C53.1916 10.9352 52.7268 11.1482 52.4169 11.5743C52.107 12.0004 51.9521 12.5685 51.9521 13.2787C51.9521 13.6144 51.9908 13.9243 52.0747 14.2084C52.1586 14.4925 52.2749 14.7378 52.4427 14.9444C52.6041 15.151 52.7978 15.3124 53.0238 15.4286C53.2497 15.5512 53.5144 15.6094 53.8114 15.6094C54.1471 15.6094 54.4247 15.5383 54.6571 15.4028C54.8896 15.2672 55.0768 15.0864 55.2253 14.8734C55.3738 14.6539 55.4835 14.4085 55.5481 14.1309C55.6062 13.8533 55.6385 13.5692 55.6385 13.2787ZM58.2144 7.43597H59.6735V8.81757H58.2144V7.43597ZM58.2144 9.9603H59.6735V16.5842H58.2144V9.9603ZM60.9776 7.43597H62.4367V16.5842H60.9776V7.43597ZM66.9108 16.765C66.3814 16.765 65.9101 16.6746 65.4969 16.5003C65.0837 16.326 64.7351 16.0806 64.4445 15.7772C64.1605 15.4673 63.941 15.0993 63.7925 14.6732C63.644 14.2471 63.5665 13.7758 63.5665 13.2658C63.5665 12.7622 63.644 12.2974 63.7925 11.8713C63.941 11.4452 64.1605 11.0772 64.4445 10.7673C64.7286 10.4574 65.0837 10.2185 65.4969 10.0442C65.9101 9.86991 66.3814 9.77953 66.9108 9.77953C67.4402 9.77953 67.9114 9.86991 68.3246 10.0442C68.7378 10.2185 69.0865 10.4639 69.377 10.7673C69.661 11.0772 69.8805 11.4452 70.029 11.8713C70.1775 12.2974 70.255 12.7622 70.255 13.2658C70.255 13.7758 70.1775 14.2471 70.029 14.6732C69.8805 15.0993 69.661 15.4673 69.377 15.7772C69.0929 16.0871 68.7378 16.326 68.3246 16.5003C67.9114 16.6746 67.4402 16.765 66.9108 16.765ZM66.9108 15.6094C67.2336 15.6094 67.5176 15.5383 67.7565 15.4028C67.9954 15.2672 68.1891 15.0864 68.344 14.8669C68.499 14.6474 68.6087 14.3956 68.6862 14.118C68.7572 13.8404 68.7959 13.5563 68.7959 13.2658C68.7959 12.9817 68.7572 12.7041 68.6862 12.4201C68.6152 12.136 68.499 11.8907 68.344 11.6712C68.1891 11.4516 67.9954 11.2773 67.7565 11.1418C67.5176 11.0062 67.2336 10.9352 66.9108 10.9352C66.5879 10.9352 66.3039 11.0062 66.065 11.1418C65.8261 11.2773 65.6325 11.4581 65.4775 11.6712C65.3226 11.8907 65.2128 12.136 65.1353 12.4201C65.0643 12.7041 65.0256 12.9817 65.0256 13.2658C65.0256 13.5563 65.0643 13.8404 65.1353 14.118C65.2064 14.3956 65.3226 14.6474 65.4775 14.8669C65.6325 15.0864 65.8261 15.2672 66.065 15.4028C66.3039 15.5448 66.5879 15.6094 66.9108 15.6094ZM70.6811 9.9603H71.7851V7.97183H73.2442V9.9603H74.5612V11.0514H73.2442V14.5893C73.2442 14.7442 73.2506 14.8734 73.2635 14.9896C73.2764 15.0993 73.3087 15.1962 73.3539 15.2736C73.3991 15.3511 73.4701 15.4092 73.567 15.448C73.6638 15.4867 73.7865 15.5061 73.9543 15.5061C74.0576 15.5061 74.1609 15.5061 74.2642 15.4996C74.3675 15.4931 74.4708 15.4802 74.5741 15.4544V16.5842C74.4127 16.6036 74.2513 16.6165 74.1028 16.6359C73.9479 16.6552 73.7929 16.6617 73.6315 16.6617C73.2442 16.6617 72.9343 16.623 72.7018 16.5519C72.4694 16.4809 72.2822 16.3712 72.1531 16.2291C72.0175 16.0871 71.9336 15.9128 71.8819 15.6997C71.8367 15.4867 71.8045 15.2414 71.798 14.9702V11.0643H70.694V9.9603H70.6811Z" fill="white"/><path d="M18.9425 7.79274H12.2541L10.1881 1.42706L8.11573 7.79274L1.42725 7.78629L6.84388 11.7245L4.77149 18.0837L10.1881 14.152L15.5983 18.0837L13.5324 11.7245L18.9425 7.79274Z" fill="#00B67A"/><path d="M13.9966 13.1642L13.5317 11.7245L10.1875 14.152L13.9966 13.1642Z" fill="#005128"/></g><defs><clipPath id="clip0_4338_615"><rect width="87.0477" height="16.3301" fill="white" transform="translate(78.1289 2.14056)"/></clipPath><clipPath id="clip1_4338_615"><rect width="73.1343" height="17.9608" fill="white" transform="translate(1.42725 1.42706)"/></clipPath></defs></svg></div>`;

    const STYLES = `
    /* ===============================
   SLIDER COMPONENT
=============================== */
.no-italic {
  font-style: normal !important;
  display: inline;
}
.ccx-slider-wrapper {
  background: #081f28;
  border-radius: 20px;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 1;
  max-height: 215px;
  margin-bottom: 1rem;
  min-height: 220px;
  justify-content: center;
}

.ccx-slider-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
}

.ccx-arrow-wrap {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex: 0 0 auto;
  align-self: center;
}

.ccx-arrow-btn {
  background: none;
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ccx-main {
  display: flex;
  flex: 1 1 auto;
  transition: opacity 250ms ease;
  will-change: opacity;
}
.ccx-main.is-fading-out { opacity: 0; }
.ccx-main.is-fading-in { opacity: 1; }

.ccx-media {
  display: flex;
  width: 60px;
  height: 60px;
  flex: 0 0 auto;
  align-self: flex-start;
}
.ccx-media img {
  display: block;
  width: auto;
  height: 60px;
  object-fit: contain;
}

.ccx-copy {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1 1 auto;
  margin-left: 1rem;
}
.ccx-maintext {
  text-align: left;
  margin: 0;
  color: #fff;
  font-family: Gellix;
  font-weight: 500;
  font-style: italic;
  font-size: 17px;
  line-height: normal;
  text-shadow: none;
}
.ccx-desc {
  text-align: left;
  margin: 0;
  color: #fff;
  font-family: Gellix;
  font-weight: 700;
  font-size: 13px;
  text-shadow: none;
}
.ccx-desc strong {
  font-weight: 700;
}

.ccx-slider-bottom {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}
.ccx-bottom-image,
.ccx-trustpilot {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 768px) and (max-width: 991px) {
  .ccx-slider-wrapper {
    display: none !important;
  }
}

@media (min-width: 992px) {
  .ccx-slider-wrapper {
    width: 483px;
    margin: 0 auto;
    min-height: auto;
    border: 2px solid #ffdd00;
    background: #081f28a6;
  }
  .ccx-slider-top {
    min-height: 6rem;
  }
  .ccx-slider-bottom {
    padding-right: 1rem;
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

    const addBodyClass = (bodyClass) => {
        // If the class for this variation already exists, don't add again
        if (!document.querySelector('.' + bodyClass)) {
            document.body.classList.add(bodyClass); // Add class to the body element
            customLog('[init] Added class ' + bodyClass + ' to body');
        }
    }

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

    const fadeSwap = (container, updateFn) => {
        if (isAnimating) return; // ignore rapid clicks during an active animation
        isAnimating = true;
        container.classList.remove('is-fading-in');
        container.offsetHeight;

        const onFadeOutEnd = () => {
            // update content while invisible
            updateFn();

            // next frame, fade in
            requestAnimationFrame(() => {
                container.classList.add('is-fading-in');
                container.classList.remove('is-fading-out');

                const onFadeInEnd = () => {
                    container.removeEventListener('transitionend', onFadeInEnd);
                    container.classList.remove('is-fading-in');
                    isAnimating = false;
                };

                // fallback if transitionend doesn't fire
                const fallbackIn = setTimeout(() => {
                    container.removeEventListener('transitionend', onFadeInEnd);
                    container.classList.remove('is-fading-in');
                    isAnimating = false;
                }, 400); // 250ms CSS + buffer

                container.addEventListener('transitionend', (e) => {
                    if (e.target !== container || e.propertyName !== 'opacity') return;
                    clearTimeout(fallbackIn);
                    onFadeInEnd();
                }, { once: true });
            });
        };

        // start fade out
        container.classList.add('is-fading-out');

        // fallback if transitionend doesn't fire
        const fallbackOut = setTimeout(() => {
            onFadeOutEnd();
        }, 300); // 250ms CSS + buffer

        container.addEventListener('transitionend', (e) => {
            if (e.target !== container || e.propertyName !== 'opacity') return;
            clearTimeout(fallbackOut);
            onFadeOutEnd();
        }, { once: true });
    };

    const handlePrevClick = (state, render) => {
        const { data } = state;
        state.index = state.index === 0 ? data.length - 1 : state.index - 1;
        render();
    };

    const handleNextClick = (state, render) => {
        const { data } = state;
        state.index = state.index === data.length - 1 ? 0 : state.index + 1;
        render();
    };

    function createCCXSlider(CONTROL_HMA_LAST_H3, SLIDE_DATA, ARROW_LEFT, ARROW_RIGHT, TRUST_PILOT_HTML) {
        if (!CONTROL_HMA_LAST_H3) return;

        // === Helper: get user initials ===
        const getInitials = (name) => {
            if (!name) return '';
            const cleanName = name.replace(/[^a-zA-Z\s]/g, '').trim(); // remove punctuation like commas
            const parts = cleanName.split(' ').filter(Boolean);
            return parts.length > 1
                ? (parts[0][0] + parts[1][0]).toUpperCase()
                : parts[0][0].toUpperCase();
        };

        // === Create wrapper ===
        const wrapper = document.createElement('div');
        wrapper.className = 'ccx-slider-wrapper';

        // === TOP (row) ===
        const top = document.createElement('div');
        top.className = 'ccx-slider-top';

        const leftWrap = document.createElement('div');
        leftWrap.className = 'ccx-arrow-wrap ccx-arrow-wrap--left';
        const leftBtn = document.createElement('button');
        leftBtn.className = 'ccx-arrow-btn ccx-arrow-btn--left';
        leftBtn.innerHTML = ARROW_LEFT;
        leftWrap.appendChild(leftBtn);

        const main = document.createElement('div');
        main.className = 'ccx-main';

        // main -> [media][copy]
        const media = document.createElement('div');
        media.className = 'ccx-media';

        const initialsCircle = document.createElement('div');
        initialsCircle.className = 'ccx-initials-circle';
        initialsCircle.style.cssText = `
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #FFDD00;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Gellix, sans-serif;
    font-weight: 700;
    font-size: 18px;
    text-shadow: none;
  `;

        // Copy container
        const copy = document.createElement('div');
        copy.className = 'ccx-copy';
        const pMain = document.createElement('p');
        pMain.className = 'ccx-maintext';
        const pDesc = document.createElement('p');
        pDesc.className = 'ccx-desc';
        copy.appendChild(pMain);
        copy.appendChild(pDesc);

        main.appendChild(media);
        main.appendChild(copy);

        const rightWrap = document.createElement('div');
        rightWrap.className = 'ccx-arrow-wrap ccx-arrow-wrap--right';
        const rightBtn = document.createElement('button');
        rightBtn.className = 'ccx-arrow-btn ccx-arrow-btn--right';
        rightBtn.innerHTML = ARROW_RIGHT;
        rightWrap.appendChild(rightBtn);

        top.appendChild(leftWrap);
        top.appendChild(main);
        top.appendChild(rightWrap);

        // === BOTTOM (Trustpilot area) ===
        const bottom = document.createElement('div');
        bottom.className = 'ccx-slider-bottom';
        const bottomImgWrap = document.createElement('div');
        bottomImgWrap.className = 'ccx-bottom-image';
        const trustWrap = document.createElement('div');
        trustWrap.className = 'ccx-trustpilot';
        trustWrap.innerHTML = TRUST_PILOT_HTML;
        bottomImgWrap.appendChild(trustWrap);
        bottom.appendChild(bottomImgWrap);

        // Append to wrapper and insert after H3
        wrapper.appendChild(top);
        wrapper.appendChild(bottom);
        CONTROL_HMA_LAST_H3.insertAdjacentElement('afterend', wrapper);

        // === State + renderer ===
        const state = { index: 0, data: SLIDE_DATA };

        const render = () => {
            const slide = state.data[state.index];
            fadeSwap(main, () => {
                media.innerHTML = '';

                const initials = getInitials(slide.name);
                initialsCircle.textContent = initials;
                media.appendChild(initialsCircle);

                // ✨ Wrap the smiley in a span to keep it upright
                const formatted = slide.mainText.replace(/😊/g, '<span class="no-italic">😊</span>');
                pMain.innerHTML = formatted;

                // Bold name and add date
                pDesc.innerHTML = '<strong>' + slide.name + '</strong>';
            });
        };

        // === Initial render ===
        const first = state.data[state.index];
        const initials = getInitials(first.name);
        media.appendChild(initialsCircle);
        initialsCircle.textContent = initials;

        const firstFormatted = first.mainText.replace(/😊/g, '<span class="no-italic">😊</span>');
        pMain.innerHTML = firstFormatted;
        pDesc.innerHTML = '<strong>' + first.name + '</strong>';

        // === Navigation ===
        leftBtn.addEventListener('click', () => handlePrevClick(state, render));
        rightBtn.addEventListener('click', () => handleNextClick(state, render));
    }

    const handleSlideshowPosition = (CONTROL_HMA_LAST_H3) => {
        const slideshowWrapper = document.querySelector('.ccx-slider-wrapper');
        const heroContent = document.querySelector('#hero-video > .campaign-hero__content');
        const hmaHeading = document.querySelector('.hero-mobile-addendum .hma-content h3:last-of-type');

        if (!slideshowWrapper) {
            customLog('[handleSlideshowPosition] Slideshow wrapper not found');
            return;
        }

        const screenWidth = window.innerWidth;

        if (screenWidth >= 992) {
            // Move slideshow as the last child inside #hero-video > .campaign-hero__content
            if (heroContent && heroContent.lastElementChild !== slideshowWrapper) {
                customLog('[handleSlideshowPosition] Moving slideshow inside #hero-video > .campaign-hero__content (desktop)');
                heroContent.appendChild(slideshowWrapper);
            }
        } else {
            // Move slideshow after the last H3 inside .hma-content (mobile)
            if (hmaHeading && hmaHeading.nextElementSibling !== slideshowWrapper) {
                customLog('[handleSlideshowPosition] Moving slideshow after HMA heading (mobile)');
                hmaHeading.insertAdjacentElement('afterend', slideshowWrapper);
            }
        }
    };

    const init = () => {
        try {
            customLog(TEST_ID + ' | ' + VARIATION + ' | ' + TEST_NAME);
            customLog('[init] Current URL: ' + CURRENT_URL);

            waitForElements(
                [
                    { selector: SELECTORS.CONTROL_HMA_LAST_H3, count: 1 },
                ],
                function (results) {
                    const bodyClass = 'ccx-' + TEST_ID.toLowerCase() + '-' + VARIATION.toLowerCase().replace(/\s+/g, '-') + '';
                    console.log(bodyClass);

                    // If the class for this variation already exists, don't add again
                    if (document.querySelector('.' + bodyClass)) return;
                    document.body.classList.add(bodyClass); // Add class to the body element
                    customLog('[init] Added class ' + bodyClass + ' to body');

                    // Add styles
                    addStyles(STYLES, VARIATION);
                    addBodyClass(bodyClass);

                    // ==========================
                    // Element References
                    // ==========================
                    const CONTROL_HMA_LAST_H3 = results?.[0]?.elements?.[0];
                    if (!CONTROL_HMA_LAST_H3) return;

                    customLog('[Elements Ready]', { CONTROL_HMA_LAST_H3 });

                    // ==========================
                    // Component Creation
                    // ==========================
                    createCCXSlider(
                        CONTROL_HMA_LAST_H3,
                        SLIDE_DATA,
                        ARROW_LEFT,
                        ARROW_RIGHT,
                        TRUST_PILOT_HTML,
                        VARIATION
                    );

                    handleSlideshowPosition(CONTROL_HMA_LAST_H3);
                    // Listen for window resize with debouncing
                    window.addEventListener('resize', () => {
                        clearTimeout(resizeTimer);
                        resizeTimer = setTimeout(() => {
                            handleSlideshowPosition();
                        }, 150);
                    });

                    // ==========================
                    // Hero Video Observer
                    // ==========================
                    const heroVideo = document.querySelector('.home--banner #hero-video');
                    const bannerComponent = document.querySelector('.ccx-banner-component');

                    if (heroVideo && bannerComponent) {
                        const toggleBannerVisibility = () => {
                            bannerComponent.style.display = heroVideo.classList.contains('active') ? 'flex' : 'none';
                        };

                        // Initial check
                        toggleBannerVisibility();

                        // Observe for changes
                        const observer = new MutationObserver(toggleBannerVisibility);
                        observer.observe(heroVideo, { attributes: true, attributeFilter: ['class'] });

                        customLog('[MutationObserver] Watching for #hero-video class changes...');
                    }
                }
            );

        } catch (error) {
            customLog(error);
        }
    }

    init();
})();