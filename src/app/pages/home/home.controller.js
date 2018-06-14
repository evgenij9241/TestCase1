(function() {
  'use strict';

  angular.module('finnplay.pages.home')
    .controller('HomeCtrl', function ($scope, $rootScope, Game) {
      $scope.dark = $rootScope.dark;

      init();

      function init() {}
    });

})();
