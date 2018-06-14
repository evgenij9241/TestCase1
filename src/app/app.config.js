(function() {
  'use strict';

  angular
    .module('finnplay')
    .config(setupCache)
    .config(setupToastr)
    .config(cssInjector)
    .config(config);

  /** @ngInject */
  function config($logProvider, $translateProvider, $httpProvider, Fn, Const) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Default language
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');

    // Sanitize ( http://angular-translate.github.io/docs/#/guide/19_security )
    $translateProvider.useSanitizeValueStrategy('escapeParameters');

    // Load english translation for the pre-caching (associated with gulp)
    $translateProvider.translations('en', Const.defaultTranslation);

    // Load other translations from Json
    $translateProvider.useStaticFilesLoader({
      prefix: '/data/translations/',
      suffix: '.json'
    });

    // Http settings for POST requests
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.transformRequest = function (data) {
      return Fn.serialize(data);
    };

    $httpProvider.interceptors.push('HttpInterceptor');

    if (window.navigator.userAgent.match(/Trident\/|MSIE|Edge\//)) {
      if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.common = {};
      }
      $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
      $httpProvider.defaults.headers.common.Pragma = 'no-cache';
      $httpProvider.defaults.headers.common['If-Modified-Since'] = '0';
    }
  }

  function setupCache(CacheFactoryProvider) {
    angular.extend(CacheFactoryProvider.defaults, {
      // Remove all items from a cache on a two hours
      cacheFlushInterval: 7200000,

      // Maximum number of items a cache can hold
      capacity: 750,

      // Cache will remove expired items as soon as they are discovered
      deleteOnExpire: 'aggressive',

      // The number of milliseconds until a newly inserted item expires
      maxAge: 900000,

      // Determines how often a cache will scan for expired items when in aggressive mode. 30 seconds
      recycleFreq: 30000,

      // Determines the storage medium used by a cache
      storageMode: 'localStorage',

      // Determines the namespace of a cache when localStorage
      storagePrefix: 'finnplay'
    });
  }

  function setupToastr(toastrConfig){
    angular.extend(toastrConfig, {
        allowHtml: false,
        autoDismiss: false,
        closeButton: false,
        closeHtml: '<button>&times;</button>',
        containerId: 'toast-container',
        extendedTimeOut: 3000,
        iconClasses: {
          error: 'toast-error',
          info: 'toast-info',
          success: 'toast-success',
          warning: 'toast-warning'
        },
        maxOpened: 0,
        messageClass: 'toast-message',
        newestOnTop: true,
        onHidden: null,
        onShown: null,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: true,
        progressBar: true,
        tapToDismiss: true,
        target: 'body',
        timeOut: 5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
      });
  }

  function cssInjector(cssInjectorProvider){
    cssInjectorProvider.setSinglePageMode(true);
  }

})();
