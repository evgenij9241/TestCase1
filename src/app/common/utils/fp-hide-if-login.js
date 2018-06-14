(function() {
  'use strict';
  angular
    .module('finnplay.common.utils.hide-if-login', [])
    .directive('fpHideIfLogin', function ($cookies, $rootScope) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          function watchConditions () {
            if (!$rootScope.isLoggedIn && $cookies.get('existing-user')) {
              element.css('display', 'none');
            } else {
              element.css('display', '');
            }

            if ($rootScope.isPayAndPlayCountry) {
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
