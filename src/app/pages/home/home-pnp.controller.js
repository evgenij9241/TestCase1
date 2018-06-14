(function() {
  'use strict';

  angular.module('finnplay.pages.home')
    .controller('HomePnpCtrl', function ($scope, $rootScope, Game) {
      $scope.dark = $rootScope.dark;

      init();

      function init() {}
    });

})();
