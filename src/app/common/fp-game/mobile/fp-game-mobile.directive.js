(function () {
  'use strict';

  angular.module('finnplay.common.game.mobile', [])
    .controller('FpGameMobileCtrl', function ($scope, demoDisabled, game, src, Fn, Language, $window, $state, $rootScope, $filter, fpModal) {
      var NETAPARTNER_PROVIDER_ID = 11;

      $scope.game = game;
      $scope.providerName = $filter('translate')($scope.game.providerTitle);
      $scope.src = src;
      $scope.isLoggedIn = $rootScope.isLoggedIn;
      $scope.demoDisabled = demoDisabled || $rootScope.country === 'GBR';
      $scope.ok = ok;
      $scope.cancel = cancel;
      $scope.signup = signup;
      $scope.licenseText = licenseText;
      $scope.playGame = playGame;
      $scope.toggleFavourite = toggleFavourite;

      function ok() {
        fpModal.close();
      }

      function cancel() {
        fpModal.close();
      }

      function signup() {
        fpModal.close();
      }

      function licenseText() {
        var T_KEY = 'APP.PAGE.GAME.LICENSE';
        if (NETAPARTNER_PROVIDER_ID === $scope.game.provider) {
          T_KEY = 'APP.PAGE.GAME.NETENT_MOBILE_LICENSE';
        }
        return $filter('translate')(T_KEY, {provider: $filter('translate')($scope.game.providerTitle)});
      }

      function playGame(mode) {

      }

      function toggleFavourite(event) {
        event.preventDefault();
      }
    });
})();
