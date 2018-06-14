(function() {
  'use strict';

  angular
    .module('finnplay')
    .config(routeConfig);

  function routeConfig($locationProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, Const) {

    // Use the HTML5 History API (it is necessary to setup redirects on the server side)
    $locationProvider.html5Mode({enabled: true, requireBase: false});

    $stateProvider
      .state('finnplay', {
          url: '/{language:|' + Const.availableLanguages.join('|') + '}',
          abstract: true,
          params: {
            language: {
              value: null,
              squash: true
            },
            returnBack: null
          },
          template: '<ui-view/>'
        })
    ;

    // Remove a trailing slash from URL
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.url();

      if (/^[^?]+\/$/.test(path)) {
        return path.slice(0, -1);
      }
      // FYI: it will show blank page if you try to rewrite "domain.com/?query" by "domain.com?query"
      if (/^[^?]+\/\?/.test(path)) {
        return path.replace('/?', '?');
      }
    });
    // For any unmatched url, redirect to root
    $urlRouterProvider.otherwise('/');

    // Defines whether URLs should match trailing slashes, or not ("false" to match trailing slashes in URLs)
    $urlMatcherFactoryProvider.strictMode(false);
  }

})();
