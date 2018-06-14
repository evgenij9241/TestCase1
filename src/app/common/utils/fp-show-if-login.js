(function() {
  'use strict';
  angular
    .module('finnplay.common.utils.show-if-login', [])
    .directive('fpShowIfLogin', function ($cookies, $rootScope) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          function watchConditions () {
            if (!$rootScope.isLoggedIn && $cookies.get('existing-user')) {
              // element.css('display', 'inline-block');
            } else {
              element.css('display', 'none');
            }
          }

          watchConditions();

          scope.$watch(function () {
            return $rootScope.isLoggedIn;
          }, function () {
            watchConditions();
          });
        }
      };
    });
})();
