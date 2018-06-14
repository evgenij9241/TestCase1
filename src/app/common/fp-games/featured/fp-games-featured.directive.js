(function () {
  'use strict';

  angular.module('finnplay.common.game.featured', [])

    .directive('fpGamesFeatured', function ($rootScope, User) {
      return {
        restrict: 'E',
        templateUrl: '/app/common/fp-games/featured/_fp-games-featured.tmpl.html',
        scope: {
          page: '@',
          gamesLinkDisabled: '=',
          moreDisabled: '=',
          demoDisabled: '=',
          gamesAmount: '='
        },
        link: function (scope) {
          scope.data = {};
          scope.isMobile   = $rootScope.isMobile;
          scope.isLoggedIn = $rootScope.isLoggedIn;
          scope.country = null;
          scope.isUk = null;

          User.getCountry().then(function (result) {
            scope.isUk = result === 'GBR';
            scope.group = scope.isUk ? 'UK' : 'mostPopular';
            scope.moreDisabled = scope.moreDisabled || scope.isUk;
            scope.isGamesLinkDisabled = scope.gamesLinkDisabled || scope.isUk;
            scope.country = result;
          });

        }
      };
    });
}());
