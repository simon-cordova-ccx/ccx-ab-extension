const LOG_ENABLED = true;
const TEST_NAME = "OZ21 | Homepage Navigation";
const SOURCE_TYPE = "SOURCE = NO SOURCE";
const VARIATION = "VARIATION 1";
const CURRENT_URL = window.location.href;
const IS_STAGING_ENV = CURRENT_URL.includes('staging');
const ENVIRONMENT = IS_STAGING_ENV ? "staging" : "production";

// [id^="carousel-template--"][id$="__campaign-carousel"]

const svgIcons = {
  tour: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_2248_2261)">
          <path d="M11.0007 5.21583L15.584 9.34083V16.5H13.7507V11H8.25065V16.5H6.41732V9.34083L11.0007 5.21583ZM11.0007 2.75L1.83398 11H4.58398V18.3333H10.084V12.8333H11.9173V18.3333H17.4173V11H20.1673L11.0007 2.75Z" fill="#FEFCF7"/>
          </g>
          <defs>
          <clipPath id="clip0_2248_2261">
          <rect width="22" height="22" fill="white"/>
          </clipPath>
          </defs>
        </svg>`,
  keyInfo: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2266_1528)">
              <path d="M10.0833 6.41667H15.5833V8.25H10.0833V6.41667ZM10.0833 10.0833H15.5833V11.9167H10.0833V10.0833ZM10.0833 13.75H15.5833V15.5833H10.0833V13.75ZM6.41667 6.41667H8.25V8.25H6.41667V6.41667ZM6.41667 10.0833H8.25V11.9167H6.41667V10.0833ZM6.41667 13.75H8.25V15.5833H6.41667V13.75ZM18.425 2.75H3.575C3.11667 2.75 2.75 3.11667 2.75 3.575V18.425C2.75 18.7917 3.11667 19.25 3.575 19.25H18.425C18.7917 19.25 19.25 18.7917 19.25 18.425V3.575C19.25 3.11667 18.7917 2.75 18.425 2.75ZM17.4167 17.4167H4.58333V4.58333H17.4167V17.4167Z" fill="#FEFCF7"/>
              </g>
              <defs>
              <clipPath id="clip0_2266_1528">
              <rect width="22" height="22" fill="white"/>
              </clipPath>
              </defs>
            </svg>`,
  gallery: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2266_1534)">
              <path d="M18.334 3.66665V14.6666H7.33398V3.66665H18.334ZM18.334 1.83331H7.33398C6.32565 1.83331 5.50065 2.65831 5.50065 3.66665V14.6666C5.50065 15.675 6.32565 16.5 7.33398 16.5H18.334C19.3423 16.5 20.1673 15.675 20.1673 14.6666V3.66665C20.1673 2.65831 19.3423 1.83331 18.334 1.83331ZM10.5423 10.6975L12.0915 12.7691L14.3648 9.92748L17.4173 13.75H8.25065L10.5423 10.6975ZM1.83398 5.49998V18.3333C1.83398 19.3416 2.65898 20.1666 3.66732 20.1666H16.5007V18.3333H3.66732V5.49998H1.83398Z" fill="#FEFCF7"/>
              </g>
              <defs>
              <clipPath id="clip0_2266_1534">
              <rect width="22" height="22" fill="white"/>
              </clipPath>
              </defs>
            </svg>`,
  earlyBird: `<svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.9037 7.47005L13.6733 5.8678C13.722 5.76658 13.743 5.66346 13.7373 5.5632C13.7315 5.46294 13.6981 5.36268 13.6389 5.26815C13.5797 5.17363 13.5033 5.1001 13.4155 5.05235C13.3305 5.00365 13.2274 4.97883 13.1118 4.97883H12.6439C12.5513 4.97883 12.4701 4.99315 12.4014 5.02275C12.3298 5.05235 12.262 5.10105 12.198 5.16598L9.40789 8.01518C9.31813 8.12117 9.18444 8.18801 9.0355 8.18801H7.26519V16.2498C11.0551 16.2498 14.845 16.2479 18.6347 16.2479C18.8104 16.2479 18.9708 16.1753 19.0873 16.0598C19.2038 15.9442 19.2754 15.7838 19.2754 15.6072C19.2754 15.4315 19.2029 15.2711 19.0873 15.1546C18.9727 15.04 18.8152 14.9684 18.6433 14.9664H15.9994C15.7292 14.9664 15.5105 14.7478 15.5105 14.4776C15.5105 14.2073 15.7292 13.9887 15.9994 13.9887H19.5019C19.669 13.9887 19.839 13.9218 19.9545 13.7996C20.071 13.6831 20.1426 13.5227 20.1426 13.347C20.1426 13.1713 20.0701 13.0109 19.9545 12.8944C19.8399 12.7798 19.6824 12.7082 19.5105 12.7063H16.8666C16.5964 12.7063 16.3778 12.4876 16.3778 12.2174C16.3778 11.9472 16.5964 11.7285 16.8666 11.7285H20.3691C20.5362 11.7285 20.7062 11.6617 20.8217 11.5394C20.9382 11.4229 21.0098 11.2625 21.0098 11.0868C21.0098 10.9111 20.9373 10.7507 20.8217 10.6342C20.7071 10.5196 20.5496 10.448 20.3777 10.4461H17.7338C17.4636 10.4461 17.245 10.2275 17.245 9.95722C17.245 9.68699 17.4636 9.46834 17.7338 9.46834H21.2363C21.412 9.46834 21.5724 9.39577 21.6889 9.28023C21.8054 9.16469 21.8771 9.00427 21.8771 8.82762C21.8771 8.65192 21.8045 8.49151 21.6889 8.37501C21.5744 8.25756 21.4139 8.18595 21.2363 8.18595C18.6037 8.18499 15.9712 8.18404 13.3385 8.18308C12.9843 8.18308 12.7341 7.79922 12.9079 7.46886L12.9037 7.47005ZM12.1321 4.08225C12.0892 3.88746 12.0538 3.6898 12.0261 3.49025C11.9736 3.10926 11.9498 2.72064 11.9564 2.32818C11.9593 2.14867 12.0586 1.99303 12.2047 1.91091C13.4508 1.21005 14.8353 0.859619 16.2189 0.859619C17.6025 0.859619 18.987 1.21005 20.2331 1.90996C20.4021 2.00449 20.4928 2.18496 20.4814 2.36542C20.488 2.99372 20.4174 3.61915 20.2713 4.22358C20.1815 4.59502 20.0631 4.95979 19.918 5.31499C20.2006 5.37323 20.4556 5.51455 20.6532 5.71221C20.9168 5.97289 21.0801 6.33668 21.0801 6.73582C21.0801 6.90196 21.0514 7.06142 20.9999 7.21039H21.2319C21.6759 7.20848 22.0808 7.39086 22.3739 7.68496C22.668 7.97619 22.8504 8.38201 22.8504 8.82696C22.8504 9.27097 22.668 9.67488 22.3758 9.96896C22.2421 10.1036 22.0846 10.2144 21.9108 10.2955C22.1276 10.6202 22.3271 10.9601 22.5076 11.3125C22.8084 11.8997 23.0566 12.5204 23.2457 13.1658C23.4978 14.0243 23.642 14.9094 23.6782 15.7975C23.7155 16.6903 23.6439 17.5859 23.4663 18.4597C23.3068 19.2427 22.9172 19.9082 22.3835 20.379C21.8382 20.8602 21.146 21.14 20.3964 21.14H12.0413C11.2907 21.14 10.5985 20.8602 10.0542 20.379C9.52044 19.9082 9.13086 19.2427 8.9714 18.4597C8.91124 18.1618 8.86445 17.8782 8.83103 17.6098C8.81576 17.4829 8.80143 17.353 8.78998 17.2203H7.02731C6.9576 17.3349 6.87548 17.4399 6.78095 17.5344C6.48303 17.8323 6.07149 18.0176 5.61792 18.0176H2.40205C1.94944 18.0176 1.53694 17.8323 1.23902 17.5344C0.941108 17.2365 0.755859 16.825 0.755859 16.3723V7.96753C0.755859 7.51493 0.941104 7.10243 1.23902 6.80451C1.53695 6.50659 1.94848 6.32134 2.40205 6.32134H5.61792C6.07053 6.32134 6.48303 6.50659 6.78095 6.80451C6.8984 6.92196 6.99867 7.05755 7.07695 7.20745H8.83006L11.5008 4.47945C11.6536 4.32381 11.8274 4.20445 12.0212 4.1233C12.0575 4.10802 12.0938 4.09465 12.131 4.08224L12.1321 4.08225ZM18.8668 5.28632C19.0644 4.87191 19.2182 4.43937 19.3261 3.9944C19.434 3.54751 19.4951 3.08918 19.5075 2.62799C18.4762 2.10091 17.3476 1.83738 16.2199 1.83738C15.0922 1.83738 13.9635 2.10093 12.9323 2.62799C12.939 2.87052 12.9591 3.11401 12.9925 3.3575C13.0221 3.57234 13.0632 3.78719 13.1147 4.00012C13.3897 4.00107 13.6514 4.06887 13.8843 4.19778C14.1164 4.32382 14.314 4.51097 14.4639 4.74873C14.5709 4.9187 14.6435 5.10108 14.6817 5.28728H18.8668L18.8668 5.28632ZM14.1097 7.20845H19.6307C19.7596 7.20845 19.878 7.15498 19.9639 7.07C20.0499 6.98501 20.1024 6.86661 20.1024 6.73676C20.1024 6.60691 20.0489 6.48848 19.9639 6.40352C19.8799 6.31758 19.7615 6.26411 19.6307 6.26411H14.5642L14.5508 6.29085L14.1087 7.20847L14.1097 7.20845ZM9.77182 17.2221C9.78041 17.3109 9.79092 17.4016 9.80142 17.4933C9.83484 17.7683 9.87685 18.0261 9.92555 18.2667C10.042 18.8368 10.3199 19.3161 10.7 19.6513C11.0666 19.975 11.5345 20.164 12.0415 20.164H20.3966C20.9037 20.164 21.3715 19.9759 21.7382 19.6513C22.1173 19.3171 22.3961 18.8368 22.5117 18.2667C22.673 17.4713 22.738 16.653 22.7045 15.8365C22.6711 15.0307 22.5393 14.2238 22.3102 13.4418C22.1574 12.9204 21.9645 12.4201 21.7354 11.9475C21.6704 12.0506 21.595 12.1451 21.5091 12.2311C21.3267 12.3972 21.1691 12.5127 20.9352 12.6015C21.0517 12.825 21.1176 13.078 21.1176 13.3463C21.1176 13.7923 20.9352 14.1971 20.643 14.4902C20.4606 14.6564 20.3031 14.7719 20.0691 14.8607C20.1856 15.0842 20.2515 15.3372 20.2515 15.6055C20.2515 16.0495 20.0691 16.4534 19.7769 16.7475C19.4838 17.0426 19.0789 17.225 18.634 17.225C15.6797 17.225 12.7253 17.2231 9.77082 17.2231L9.77182 17.2221ZM3.52341 8.82688C3.52341 8.55665 3.74207 8.33799 4.0123 8.33799C4.28254 8.33799 4.50119 8.55665 4.50119 8.82688V10.8979C4.50119 11.1682 4.28254 11.3868 4.0123 11.3868C3.74207 11.3868 3.52341 11.1682 3.52341 10.8979V8.82688ZM5.61932 7.30006H2.40345C2.22012 7.30006 2.05302 7.37549 1.93175 7.49676C1.81049 7.61803 1.73505 7.78512 1.73505 7.96845V16.3733C1.73505 16.5566 1.81049 16.7227 1.93175 16.844C2.05302 16.9653 2.22012 17.0407 2.40345 17.0407H5.61932C5.80265 17.0407 5.96975 16.9653 6.09102 16.844C6.21228 16.7227 6.28772 16.5556 6.28772 16.3733V7.96845C6.28772 7.78512 6.21228 7.61802 6.09102 7.49676C5.96975 7.37549 5.80265 7.30006 5.61932 7.30006Z" fill="#FEFCF7"/>
              </svg>`,
  moreDetails: `<svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_2266_1558)">
                  <path d="M20.1875 10.0925L3.6875 10.0833V11.9167H20.1875V10.0925ZM3.6875 14.6667H14.6875V16.5H3.6875V14.6667ZM20.1875 5.5H3.6875V7.3425L20.1875 7.33333V5.5Z" fill="#FEFCF7"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_2266_1558">
                  <rect width="22" height="22" fill="white" transform="translate(0.9375)"/>
                  </clipPath>
                  </defs>
                </svg>`,
  charityInfo: `<svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.083 13.8616C23.6233 13.3718 22.9186 13.2128 22.2869 13.4577C21.5565 13.7327 20.7315 14.2183 19.8335 14.8929C19.4425 15.185 18.944 15.3999 18.4026 15.5589C18.5057 15.0432 18.394 14.3471 17.8956 13.969C17.7065 13.8272 17.4788 13.7413 17.2124 13.7198C15.8674 13.5995 13.9209 13.0538 11.7339 12.1772C8.86796 11.03 5.5808 13.7284 5.4433 13.8444C5.40033 13.8831 5.36595 13.9261 5.34017 13.9733C4.93627 13.5823 4.31323 13.4835 3.80189 13.78L1.97142 14.837C1.35698 15.1936 1.14642 15.9843 1.49876 16.5987L4.10691 21.1147C4.34754 21.5272 4.78153 21.7592 5.2241 21.7592C5.44324 21.7592 5.66238 21.7034 5.86863 21.5873L7.6991 20.5303C8.22332 20.2295 8.45104 19.6108 8.28778 19.0565C9.36629 18.6053 10.6725 18.8159 12.2881 19.0866C13.4096 19.2756 14.6428 19.4819 15.9878 19.4819C16.469 19.4819 16.9675 19.4561 17.4831 19.3916C20.3362 19.035 22.6006 17.4666 24.0015 16.2032C24.341 15.8939 24.5343 15.4513 24.5343 14.9915C24.5343 14.5661 24.371 14.1665 24.0831 13.8615L24.083 13.8616ZM7.2693 19.7826L5.43883 20.8396C5.34 20.8955 5.22398 20.9127 5.11227 20.8826C5.00055 20.8525 4.91031 20.7838 4.85014 20.6806L2.242 16.1647C2.18614 16.0659 2.16895 15.9498 2.19903 15.8381C2.22911 15.7264 2.29786 15.6362 2.40098 15.576L4.23145 14.519C4.2959 14.4803 4.37325 14.4631 4.4463 14.4631C4.48497 14.4631 4.51934 14.4674 4.55801 14.476C4.66973 14.5061 4.75997 14.5748 4.82013 14.6779L7.3467 19.0564C7.3467 19.0564 7.3467 19.065 7.35099 19.0693L7.35959 19.0779L7.42834 19.1939C7.54865 19.4002 7.4756 19.6623 7.26935 19.7826H7.2693ZM23.4256 15.5673C22.3556 16.5298 20.1514 18.1926 17.3799 18.5364C15.5666 18.7641 13.9037 18.4848 12.4343 18.2356C10.7198 17.9477 9.21584 17.6985 7.8924 18.2829L5.76115 14.5919C5.84279 14.5833 5.92443 14.5618 5.99318 14.5017C6.02326 14.4759 9.02666 12.018 11.416 12.972C13.6804 13.8786 15.7128 14.4458 17.1437 14.5704C17.1824 14.5704 17.2941 14.5833 17.3801 14.6478C17.5476 14.7767 17.625 15.1118 17.5605 15.404C17.5605 15.4083 17.5605 15.4169 17.5562 15.4212C17.5133 15.5845 17.3844 15.722 17.2168 15.8036C15.2789 16.0872 13.2552 15.8724 13.2249 15.8681C12.9886 15.8423 12.7781 16.0142 12.7523 16.2462C12.7265 16.4825 12.8941 16.6931 13.1304 16.7189C13.3324 16.7404 18.1148 17.2517 20.3576 15.5716C21.3975 14.7896 22.1494 14.4201 22.6006 14.2482C22.9057 14.1322 23.2451 14.2052 23.4643 14.4415C23.6061 14.5876 23.6791 14.781 23.6791 14.9787C23.6791 15.2021 23.5889 15.404 23.4256 15.5544L23.4256 15.5673Z" fill="#FEFCF7"/>
                  <path d="M3.47852 10.5531C3.71483 10.5531 3.9082 10.3597 3.9082 10.1234C3.9082 9.84842 3.92109 9.57342 3.94687 9.30273C3.96836 9.06641 3.79219 8.85585 3.55587 8.83436C3.31955 8.81286 3.109 8.98904 3.0875 9.22536C3.06172 9.52186 3.04883 9.82261 3.04883 10.1234C3.04883 10.3597 3.24219 10.5531 3.47852 10.5531Z" fill="#FEFCF7"/>
                  <path d="M3.75326 7.81162C3.79623 7.82451 3.8349 7.8288 3.87787 7.8288C4.06263 7.8288 4.2345 7.70849 4.29037 7.52374C4.46224 6.94367 4.69856 6.38077 4.98646 5.85224C5.09818 5.6417 5.02084 5.38387 4.81029 5.27218C4.59974 5.16048 4.34192 5.2378 4.23022 5.44835C3.91654 6.03272 3.65873 6.64716 3.46966 7.2831C3.40091 7.51084 3.52982 7.75147 3.75754 7.82022L3.75326 7.81162Z" fill="#FEFCF7"/>
                  <path d="M5.6704 4.50315C5.79501 4.50315 5.91534 4.45158 6.00127 4.34846C6.17315 4.14221 6.36221 3.93596 6.55558 3.74259C8.26145 2.03672 10.5261 1.10007 12.9365 1.10007C17.9124 1.10007 21.9597 5.14784 21.9597 10.1233C21.9597 10.3596 22.1531 10.553 22.3894 10.553C22.6257 10.553 22.8191 10.3596 22.8191 10.1233C22.8191 4.67507 18.3847 0.240234 12.936 0.240234C10.2979 0.240234 7.81417 1.26718 5.94944 3.13621C5.73889 3.34676 5.53263 3.57021 5.34357 3.79793C5.19318 3.9784 5.21466 4.24912 5.39943 4.4038C5.48107 4.47255 5.5756 4.50263 5.67443 4.50263L5.6704 4.50315Z" fill="#FEFCF7"/>
                  <path d="M17.3044 5.66341C17.2528 5.50872 17.1196 5.397 16.9606 5.37122L14.4512 4.9845L13.3083 2.72006C13.1622 2.43218 12.6852 2.43218 12.5391 2.72006L11.3962 4.9845L8.88679 5.37122C8.7278 5.397 8.5946 5.50872 8.54304 5.66341C8.49147 5.8181 8.53444 5.98566 8.65046 6.10169L10.4508 7.88919L10.0426 10.3942C10.0169 10.5532 10.0813 10.7165 10.2145 10.811C10.3477 10.9056 10.5196 10.9184 10.6657 10.8454L12.9216 9.68524L15.1774 10.8454C15.2376 10.8755 15.3064 10.8927 15.3751 10.8927C15.4653 10.8927 15.5513 10.8669 15.6286 10.811C15.7618 10.7165 15.8263 10.5532 15.8005 10.3942L15.3923 7.88919L17.1927 6.10169C17.3087 5.98567 17.3474 5.8181 17.3001 5.66341H17.3044ZM14.6359 7.43372C14.5371 7.53255 14.4941 7.67004 14.5156 7.80754L14.8207 9.68957L13.1277 8.81731C13.0676 8.78724 12.9988 8.77005 12.9301 8.77005C12.8613 8.77005 12.7969 8.78724 12.7324 8.81731L11.0394 9.68957L11.3445 7.80754C11.366 7.67004 11.323 7.53254 11.2242 7.43372L9.87069 6.0931L11.7527 5.80522C11.8902 5.78373 12.0105 5.69779 12.0707 5.57318L12.9301 3.87162L13.7894 5.57318C13.8539 5.69779 13.9699 5.78373 14.1074 5.80522L15.9894 6.0931L14.6359 7.43372Z" fill="#FEFCF7"/>
                </svg>`,
  inTheNews: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2266_1572)">
                <path d="M20.1673 2.75L18.6365 4.28083L17.1148 2.75L15.584 4.28083L14.0532 2.75L12.5315 4.28083L11.0007 2.75L9.46982 4.28083L7.94815 2.75L6.41732 4.28083L4.88648 2.75L3.36482 4.28083L1.83398 2.75V17.4167C1.83398 18.425 2.65898 19.25 3.66732 19.25H18.334C19.3423 19.25 20.1673 18.425 20.1673 17.4167V2.75ZM10.084 17.4167H3.66732V11.9167H10.084V17.4167ZM18.334 17.4167H11.9173V15.5833H18.334V17.4167ZM18.334 13.75H11.9173V11.9167H18.334V13.75ZM18.334 10.0833H3.66732V7.33333H18.334V10.0833Z" fill="#FEFCF7"/>
                </g>
                <defs>
                <clipPath id="clip0_2266_1572">
                <rect width="22" height="22" fill="white"/>
                </clipPath>
                </defs>
              </svg>`
};

const selectors = {
  SELECTOR_NAVIGATION_BAR: '#main-nav',
  SELECTOR_SHOPIFY_CONTAINERS: 'main .shopify-section > div[id*=enter-now-]',
  SELECTOR_CONTAINER_ENTER_NOW_MATERIAL_TAB_BUTTONS_DESIGN: '#enter-now-material-tab-buttons-design',
  SELECTOR_CONTAINER_ENTER_NOW_MATERIAL_TAB_BUTTONS_DESIGN_PRESELECT_PAYG: '#enter-now-material-tab-buttons-design-preselect-payg',
  SELECTOR_CONTAINER_ENTER_NOW_BIG_TAB_BUTTONS_DESIGN: '#enter-now-big-tab-buttons-design',
  SELECTOR_CONTAINER_ENTER_NOW_LEGACY_DESIGN: '#enter-now-legacy-design',
  SELECTOR_CONTAINER_ENTER_NOW_LEGACY_DESIGN_NO_SUBS: '#enter-now-legacy-design-no-subs',
  SELECTOR_CONTAINER_ENTER_NOW_LEGACY_DESIGN_NO_SUBS_LOWER_PRICE_POINTS: '#enter-now-legacy-design-no-subs-lower-price-points',
  SELECTOR_CONTAINER_ENTER_NOW_MATERIAL_TAB_BUTTONS_DESIGN_BUTTONS: '#enter-now-material-tab-buttons-design .add-to-cart-button',
  SELECTOR_ENTER_NOW_LEGAGY_DESIGN_BUTTONS: '#enter-now-legacy-design [data-test*=card-variant] .add-to-cart-button',
  SELECTOR_CONTAINER_ENTER_NOW_MATERIAL_TAB_BUTTONS_DESIGN_BUTTONS: '#enter-now-material-tab-buttons-design .add-to-cart-button',
  SELECTOR_ENTER_NOW_LEGAGY_DESIGN_BUTTONS: '#enter-now-legacy-design [data-test*=card-variant] .add-to-cart-button',
}

const newTrophyIcon = '<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.802 5.321C7.761 5.359 7.75 5.396 7.75 5.423V10.961C7.75 12.361 8.136 13.561 8.833 14.398C9.516 15.216 10.548 15.75 12 15.75C13.452 15.75 14.484 15.216 15.167 14.398C15.864 13.562 16.25 12.361 16.25 10.961V5.423C16.25 5.396 16.24 5.359 16.198 5.321C16.1427 5.27421 16.0724 5.24899 16 5.25H8C7.92759 5.24899 7.85727 5.27421 7.802 5.321ZM6.25 5.423C6.25 4.443 7.091 3.75 8 3.75H16C16.909 3.75 17.75 4.444 17.75 5.423V5.75H19C19.966 5.75 20.75 6.534 20.75 7.5V9.5C20.75 11.408 19.223 12.921 17.443 13.203C17.2193 13.9905 16.8368 14.7239 16.319 15.358C15.466 16.38 14.259 17.046 12.75 17.21V19.75H15C15.1989 19.75 15.3897 19.829 15.5303 19.9697C15.671 20.1103 15.75 20.3011 15.75 20.5C15.75 20.6989 15.671 20.8897 15.5303 21.0303C15.3897 21.171 15.1989 21.25 15 21.25H9C8.80109 21.25 8.61032 21.171 8.46967 21.0303C8.32902 20.8897 8.25 20.6989 8.25 20.5C8.25 20.3011 8.32902 20.1103 8.46967 19.9697C8.61032 19.829 8.80109 19.75 9 19.75H11.25V17.21C9.741 17.045 8.534 16.38 7.681 15.358C7.16324 14.7239 6.78073 13.9905 6.557 13.203C4.777 12.92 3.25 11.408 3.25 9.5V7.5C3.25 6.534 4.034 5.75 5 5.75H6.25V5.423ZM6.25 7.25H5C4.9337 7.25 4.87011 7.27634 4.82322 7.32322C4.77634 7.37011 4.75 7.4337 4.75 7.5V9.5C4.75 10.41 5.394 11.238 6.272 11.582C6.25754 11.3756 6.25021 11.1689 6.25 10.962V7.25ZM17.728 11.582C18.606 11.238 19.25 10.41 19.25 9.5V7.5C19.25 7.4337 19.2237 7.37011 19.1768 7.32322C19.1299 7.27634 19.0663 7.25 19 7.25H17.75V10.961C17.75 11.1697 17.7427 11.3767 17.728 11.582Z" fill="#626262"/></svg>';

const secondaryLinks = [
  {
    href: "#hero-video",
    icon: svgIcons.tour,
    text: "Tour"
  },
  {
    href: "[id*=live-rent]",
    icon: svgIcons.keyInfo,
    text: "Key info"
  },
  {
    href: "[id*=campaign-carousel] .swiper-wrapper",
    icon: svgIcons.gallery,
    text: "Gallery"
  },
  {
    href: "[id*=half_width_carousel]",
    icon: svgIcons.earlyBird,
    text: "Early bird"
  },
  {
    href: "[id*=campaign-multi-block-1]",
    icon: svgIcons.moreDetails,
    text: "More details"
  },
  {
    href: "[id*=campaign_multi_block_]",
    icon: svgIcons.charityInfo,
    text: "Charity info"
  },
  {
    href: "[id*=campaign-in-the-news]",
    icon: svgIcons.inTheNews,
    text: "In the news"
  }
];

const styles = `
  nav#main-nav {
    height: 107px;
  }
  #ccx-secondary-nav {
    position: fixed;
    top: 107px;
    left: 0;
    width: 100vw;
    padding: 0.25rem 0;
    height: 60px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    display: flex;
    color: #fefcf7;
    align-items: stretch;
    background: #202E33E5;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  #ccx-secondary-nav::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  #ccx-secondary-nav ul {
    display: flex;
    margin: 0;
    list-style: none;
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 0 16px;
    flex-wrap: nowrap;
  }
  #ccx-secondary-nav li {
    margin-right: 32px;
    display: flex;
    align-items: center;
    height: 100%;
    flex-shrink: 0;
  }
  #ccx-secondary-nav li:last-child {
    padding-right: 16px;
  }
  #ccx-secondary-nav a {
    display: flex;
    align-items: center;
    text-decoration: none;
    height: 100%;
    padding: 0 8px;
    transition: background 0.2s;
    border-radius: 4px;
    color: #fefcf7;
    font-family: Gellix;
    font-weight: 700;
    font-size: 18px;
    line-height: 100%;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
  }
  #ccx-secondary-nav a.active,
  #ccx-secondary-nav a:active {
    color: #FFDD00 !important;
    background: transparent;
  }
  #ccx-secondary-nav a.active .icon svg path,
  #ccx-secondary-nav a.active .icon svg {
    fill: #FFDD00 !important;
    stroke: #FFDD00 !important;
  }
  #ccx-secondary-nav a .text {
    padding-bottom: 3px;
  }
  #ccx-secondary-nav .ccx-secondary-nav-underline {
    position: absolute;
    top: 50px !important;
    background: #FFDD00;
    border-radius: 2px 2px 0 0;
    transition: left 0.25s cubic-bezier(.4,0,.2,1), width 0.25s cubic-bezier(.4,0,.2,1), top 0.25s;
    z-index: 2;
    pointer-events: none;
    height: 3px !important;
    opacity: 1;
  }
  #ccx-secondary-nav .icon {
    margin-right: 8px;
    display: flex;
    align-items: center;
  }
  @media (min-width: 768px) {
    #ccx-secondary-nav ul {
      justify-content: space-between;
    }
    #ccx-secondary-nav li:nth-child(4) {
      margin-right: auto;
    }
  }
`;

const customLog = (...messages) => {
  if (!LOG_ENABLED) return;

  const style = "background: #000; color: white; padding: 4px 8px; border-radius: 4px;";
  const parts = [];
  const values = [];

  messages.forEach(msg => {
    if (msg instanceof Element) {
      parts.push("%o");
      values.push(msg);
    } else {
      // Wrap each text message with %c to apply the style
      parts.push("%c" + String(msg).toUpperCase());
      values.push(style);
    }
  });

  // Join parts with spaces so the log is more readable
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
  if (document.querySelector('.ccx-styles-de1-v1')) {
    customLog('[addStyles] Custom styles already exist.');
    return;
  }

  // Create a new <style> element
  const style = document.createElement('style');
  style.classList.add('ccx-styles-de1-v1');
  style.appendChild(document.createTextNode(css));

  // Append the style tag to the document head
  document.head.appendChild(style);
  customLog('Custom styles added.');
};

function getRegionFromUTM() {
  const urlParams = new URLSearchParams(window.location.search);
  let region;

  const source = urlParams.get('utm_source');

  if (source && source.trim() !== '') {
    if (source === 'facebook' || source === 'klaviyo') {
      region = source;
    } else {
      region = 'other digital';
    }
  } else {
    region = 'no source';
  }

  return region;
}

function addSecondaryNav(links) {
  const existing = document.getElementById('ccx-secondary-nav');
  if (existing) existing.remove();

  const nav = document.createElement('nav');
  nav.id = 'ccx-secondary-nav';

  const ul = document.createElement('ul');

  // Filter links that point to elements that exist
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const target = document.querySelector(link.href);

    if (!target) continue; // Skip if no matching element

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.href;

    const iconSpan = document.createElement('span');
    iconSpan.className = 'icon';
    iconSpan.innerHTML = link.icon;

    const textSpan = document.createElement('span');
    textSpan.className = 'text';
    textSpan.textContent = link.text;

    a.appendChild(iconSpan);
    a.appendChild(textSpan);
    li.appendChild(a);
    ul.appendChild(li);
  }

  // Only add nav if there are items
  if (ul.children.length > 0) {
    nav.appendChild(ul);

    const underline = document.createElement('div');
    underline.className = 'ccx-secondary-nav-underline';
    nav.appendChild(underline);

    document.body.appendChild(nav);
  }
}

function enableSecondaryNavActiveState() {
  const nav = document.getElementById('ccx-secondary-nav');
  if (!nav) return;

  const underline = nav.querySelector('.ccx-secondary-nav-underline');
  const links = nav.querySelectorAll('a');
  if (!underline || !links.length) return;

  function moveUnderlineTo(link) {
    const linkRect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    underline.style.left = (linkRect.left - navRect.left + nav.scrollLeft) + "px";
    underline.style.width = linkRect.width + "px";
    underline.style.top = "50px"; // Always 50px from the top of the nav
  }

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      moveUnderlineTo(this);

      const selector = this.getAttribute('href');
      if (selector && selector !== '#') {
        let target;
        if (selector.startsWith('#')) {
          target = document.getElementById(selector.slice(1));
        } else {
          try {
            target = document.querySelector(selector);
          } catch (err) {
            target = null;
          }
        }
        if (target) {
          // Set scroll so the section is exactly 50px below the top of the viewport
          const targetTop = target.getBoundingClientRect().top + window.scrollY - 50;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
      }
    });
  });

  links[0].classList.add('active');
  moveUnderlineTo(links[0]);

  window.addEventListener('resize', () => {
    const active = nav.querySelector('a.active');
    if (active) moveUnderlineTo(active);
  });

  nav.scrollLeft = 0; // Ensure nav starts scrolled to the left
}

// const waitForElements = (elementSelector) => {
//   customLog('[waitForElements] Starting to wait for cards...');

//   // Wait for both the navigation bar and the site footer
//   Promise.all([
//     DYO.waitForElementAsync(elementSelector, 1, 100, 150),
//     DYO.waitForElementAsync('.site-footer', 1, 100, 150)
//   ])
//     .then(function ([navElements, footerElements]) {
//       // Both elements are ready and exist exactly once
//       console.log('Element found:', navElements[0]);
//       console.log('Site footer found:', footerElements[0]);

//       // Add styles to the document
//       addStyles(styles);

//       // Add secondary nav
//       addSecondaryNav(secondaryLinks);
//       enableSecondaryNavActiveState();
//     })
//     .catch(function () {
//       // One or both elements not found within 15 seconds
//       console.warn('#main-nav or .site-footer not found within timeout.');
//     });
// };

const waitForElements = async function(elementSelector) {
  customLog('[waitForElements] Starting to wait for elements...');

  try {
    const results = await Promise.all([
      DYO.waitForElementAsync(elementSelector, 1, 100, 150),
      DYO.waitForElementAsync('.site-footer', 1, 100, 150)
    ]);
    const navElements = results[0];
    const footerElements = results[1];

    customLog('Main navigation found:', navElements[0]);
    customLog('Site footer found:', footerElements[0]);

    const validLinks = [];
    for (let i = 0; i < secondaryLinks.length; i++) {
      const link = secondaryLinks[i];
      try {
        const elements = await DYO.waitForElementAsync(link.href, 1, 100, 20); // 2 seconds (20 * 100ms)
        if (elements && elements.length > 0) {
          customLog('[waitForElements] Found element for ' + link.href + ':', elements[0]);
          validLinks.push(link);
        } else {
          customLog('[waitForElements] No element found for ' + link.href + ' within 2 seconds, skipping.');
        }
      } catch (error) {
        customLog('[waitForElements] No element found for ' + link.href + ' within 2 seconds, skipping.');
      }
    }

    addStyles(styles);

    if (validLinks.length > 0) {
      addSecondaryNav(validLinks);
      enableSecondaryNavActiveState();
    } else {
      customLog('[waitForElements] No valid secondary links found, skipping secondary nav.');
    }

  } catch (error) {
    console.warn('[waitForElements] Main nav or site footer not found within timeout.');
  }
};

async function init() {
  try {

    customLog(TEST_NAME + ' | ' + SOURCE_TYPE + ' | ' + VARIATION);
    customLog('[init] Current URL: ' + CURRENT_URL);
    customLog('[init] Environment: ' + ENVIRONMENT);

    document.body.classList.add('omaze-oz21-qa-v1');
    customLog('[init] Added class omaze-oz21-qa-v1 to body');

    waitForElements(selectors.SELECTOR_NAVIGATION_BAR);

  } catch (error) {
    console.error(error.message);
  }
}

init();
