(function() {
'use strict';

var LOADER_FAIL_TIMEOUT = 5 * 1000

angular.module('finnplay.core.services.http-interceptor', [])

.factory('HttpInterceptor', function ($q, $injector, $timeout, $rootScope, App) {
  var loadingCount = 0;

  var timeout = $timeout(function () {
    $rootScope.$broadcast('loading:finish');
  }, LOADER_FAIL_TIMEOUT);

  function requestCounter() {
    if(++loadingCount === 1) {
      // $rootScope.$broadcast('loading:progress');
    }
  }

  function responseCounter() {
    if(--loadingCount === 0) {
      $timeout(function () {
        $timeout.cancel(timeout);
        $rootScope.$broadcast('loading:finish');
        loadingCount = 0;
      }, 500);
    }
  }

  return {
    request: function (config) {
      requestCounter();
      return config || $q.when(config);
    },
    // Intercept that user account was frozen and call logout
    response: function (response) {
      responseCounter();
      if ((response.data || {}).errorCode === 111) {
        $injector.invoke(function ($state, $timeout, User) {
          User.isLoggedIn().then(function (isLoggedIn) {
            if (isLoggedIn) {
              $timeout(function () {
                $state.go('logout');
              }, App.redirectionDelay * 1000);
            }
          });
        });
      }

      return response;
    },

    // Intercept a non-existent static page and redirect to the 404 page
    responseError: function (response) {
      responseCounter();
      var regex = new RegExp('^/?cms/' + App.mode + '/languages/[^.]+\\.html$'),
          url = response.config.url;

      if (regex.test(url)) {
        $injector.invoke(function ($state) {
          $state.go('404', {}, { location: 'replace' });
        });
      }

      return $q.reject(response);
    }

  };

});
})();
