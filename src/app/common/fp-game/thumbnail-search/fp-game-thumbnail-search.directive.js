(function () {
  'use strict';

  angular.module('finnplay.common.game.thumbnail-search', [])
    .directive('fpGameThumbnailSearch', function () {
      return {
        restrict: 'AE',
        templateUrl: '/app/common/fp-game/thumbnail-search/fp-game-thumbnail-search.tmpl.html',
        scope: {
          src: '=',
          retina: '@',
          noretina: '@'
        },
        link: function (scope) {
          scope.loaded = false;
        }
      };

    });
})();
