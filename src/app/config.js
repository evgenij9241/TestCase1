(function() {
'use strict';

angular.module('finnplay').provider('App', function (Const) {

  this.config = {

    /**
     * App modes
     * @params: "mobile", "tablet", "desktop"
     */
    mode: 'mobile',

    /**
     * Delay in seconds before redirection to an another state.
     * @description:
     * Delay is necessary so that the user had time to read a message. For example, it is used for redirection to the
     * login page after the successful account activation or password reset.
     */
    redirectionDelay: 3,

    /**
     * Game groups, displayed on the home page
     * Example: ['home', 'mostPopular', 'other']
     */
    homePageGameGroups: false,

    /**
     * Number of games for each game list on the home and casino page
     */
    homePageGamesListLimit: 10,
    casinoPageGamesListLimit: 10,

    /**
     * Minimal time to display preloader.
     */
    preloaderMinimalDelay: 600,

    /**
     * Display language prefix in the browser's address bar (e.g. "/en/login")
     */
    showLanguageInUrl: true,

    /**
     * Is betting page enabled/disabled
     */
    isBettingPageEnabled: false,

    /**
     * Fields
     */
    field: {
      // When the field validation result should be displayed
      // @ "onSubmit" - form is submitted
      // @ "onType" - immediately on entering text in a field or when the form is submitted
      showErrors: 'onSubmit',
      // Timeout in milliseconds before async validation (e.g. checking for email or nickname duplication)
      asyncValidationTimeout: 1000,
      // Possible types of fields
      types: {
        // ----- Main types: -----
        text: {
          template: 'text'
        },
        email: {
          template: 'email'
        },
        password: {
          template: 'password'
        },
        number: {
          template: 'number',
          validation: {
            isNumber: 'float'
          }
        },
        url: {
          template: 'url'
        },
        select: {
          template: 'select'
        },
        radio: {
          template: 'radio'
        },
        checkbox: {
          template: 'checkbox',
          validation: {
            required: false
          }
        },
        textarea: {
          template: 'textarea'
        },
        datePicker: {
          template: 'datePicker'
        },
        dateSelector: {
          template: 'dateSelector'
        },
        registrationCampaigns: {
          template: 'campaigns'
        },
        depositCampaigns: {
          template: 'campaigns'
        },
        // ----- Custom types: -----
        myEmail: {
          template: 'email',
          validation: {
            maxlength: 45,
            isDuplicated: 'email'
          }
        },
        myConfirmEmail: {
          template: 'email',
          validation: {
            isEqual: '{{formCtrl.email.$viewValue}}'
          }
        },
        myPassword: {
          template: 'password',
          validation: {
            minlength: 6
          }
        },
        myConfirmPassword: {
          template: 'password',
          validation: {
            isEqual: '{{formCtrl.password.$viewValue}}'
          }
        },
        myNickName: {
          template: 'text',
          validation: {
            isDuplicated: 'nickName'
          }
        },
        myGender: {
          template: 'radio',
          options: {
            male: 'APP.FIELD.GENDER.OPTIONS.MALE',
            female: 'APP.FIELD.GENDER.OPTIONS.FEMALE'
          }
        },
        myBirthDate: {
          template: 'dateSelector'
        },
        myCountry: {
          template: 'select',
          options: (function () {
            var obj = {};
            for (var key in Const.defaultTranslation.EXT.COUNTRY) {
              obj[key] = 'EXT.COUNTRY.' + key;
            }
            return obj;
          })()
        },
        myPhoneNumber: {
          template: 'tel',
          validation: {
            isPhoneNumber: '{{formCtrl.country.$viewValue}}'
          }
        },
        myRegistrationCurrency: {
          template: 'select'
        },
        myPromoCode: {
          template: 'text',
          validation: {
            required: false
          }
        },
        myAgeChecked: {
          template: 'checkbox'
        },
        myPolicyChecked: {
          template: 'checkbox'
        },
        myReceiveEmail: {
          template: 'checkbox'
        },
        myCampaignsEnabled: {
          template: 'checkbox'
        }
      },
      // Read only fields for the My Details page
      readonly: ['nickName', 'email', 'country', 'currency', 'firstName', 'lastName']
    },

    /**
     * Notices
     */
    notices: {
      // Allow multiple notices at once
      areStackable: false,
      // Timeout in seconds, after which notices will be removed (0 = unremovable)
      removalTimeout: 0
    },

    /**
     * Swiper
     * @description:
     * Global settings for the swiper carousel.
     * Details: http://www.idangero.us/sliders/swiper/api.php
     */
    swiper: {
      eventTarget: 'container',
      calculateHeight: true,
      roundLengths: true,
      freeMode: true,
      freeModeFluid: true,
      responsive: {
        0: {
          slidesPerView: 3
        },
        480: {
          slidesPerView: 4
        },
        768: {
          slidesPerView: 6
        },
        1024: {
          slidesPerView: 7
        }
      }
    },

    /**
     * Datepicker
     * @description:
     * All settings can be provided as attributes in the "datepicker" or globally configured through
     * the "datepickerConfig"
     */
    datepicker: {},

    /**
     * Datepicker Popup
     * @description:
     * Options for datepicker can be passed as JSON using the "datepicker-options" attribute.
     * Specific settings for the "datepicker-popup", that can globally configured through the "datepickerPopupConfig"
     */
    datepickerPopup: {
      // @ "datepicker-popup" - the format for displayed dates (default: 'yyyy-MM-dd')
      datepickerPopup: 'dd-MM-yyyy',
      // @ "show-button-bar" - whether to display a button bar underneath (default: true)
      showButtonBar: true,
      // @ "current-text" - the text to display for the current day button. (default: 'Today')
      currentText: 'APP.FIELD_TYPE.DATEPICKER.BTN.CURRENT',
      // @ "clear-text" - the text to display for the clear button. (default: 'Clear')
      clearText: 'APP.FIELD_TYPE.DATEPICKER.BTN.CLEAR',
      // @ "close-text" - the text to display for the close button. (default: 'Done')
      closeText: 'APP.FIELD_TYPE.DATEPICKER.BTN.CLOSE',
      // @ "close-on-date-selection" - whether to close calendar when a date is chosen. (default: true)
      closeOnDateSelection: true,
      // @ "datepicker-append-to-body" - append the datepicker popup (default: false)
      appendToBody: false
    },

    /**
     * Games Search
     */
    gamesSearch: {
      // Delay before starting the games search after the end of typing
      delay: 600,
      // Number of games for preview
      limit: 12
    }

  };

  this.$get = function() {
    return this.config;
  };

});
})();
