(function () {
  'use strict';

  var LABELS = {
    freeSpins: 'freespins'
  };

  angular.module('finnplay.common.game.thumbnail', [])
    .directive('fpThumbnail', function ($rootScope, $state, $http, $filter, Game, User, fpModal) {
      return {
        restrict: 'AE',
        templateUrl: '/app/common/fp-game/thumbnail/fp-thumbnail.tmpl.html',
        scope: {
          game: '=',
          retina: '@',
          noretina: '@',
          search: '@',
          action: '&',
          demoDisabled: '='
        },
        link: function (scope, element, attrs) {
          var isMobile = $rootScope.isMobile;
          scope.isMobile = $rootScope.isMobile;
          scope.isPayAndPlayCountry = $rootScope.isPayAndPlayCountry;

          var game = scope.game;

          scope.searchThumbnail = scope.search === 'true';
          scope.isSmallScreen = $rootScope.isSmallScreen;

          scope.thumbnailClass = 'fp-thumbnail' + (isMobile ? ' fp-thumbnail--mobile' : ' ');

          scope.game.providerName = Game.getProviderTitle(game.provider);
          scope.game.providerName = Game.getProviderTitle(game.provider);

          scope.game.src = Game.getGameImageUrl(game.name, game.provider);

          if (scope.game.src && scope.game.src.indexOf('/lucky-') > -1) {
            scope.game.src = scope.game.src.replace('/lucky-', '/')
          }

          scope.showLoginBlock = !$rootScope.isLoggedIn && $rootScope.country === 'GBR';

          scope.isLoggedIn = $rootScope.isLoggedIn;
          scope.showDemo = !scope.game.hideDemoUrl && !$rootScope.isLoggedIn && !scope.gameWithReview;
          scope.showReview = !scope.game.hideDemoUrl && !$rootScope.isLoggedIn && scope.gameWithReview;

          scope.playDemo = playDemo;
          scope.playReal = playReal;
          scope.playReview = playReview;
          scope.toggleFavourite = toggleFavourite;
          scope.onImageLoaded = onImageLoaded;
          scope.showGame = showGame;

          activate();

          function activate() {
            angular.forEach(scope.game, function (value, key) {
              if (value && LABELS.hasOwnProperty(key) && !scope.game.label) {
                scope.game.label = LABELS[key];
              }
            });
            toggleFavoriteIcon(scope.game.favourite);
          }

          function playDemo () {
            return;
          }

          function playFreeSpinsGame (transactions, realGame) {
            return;
          }

          function playReal () {
            return;
          }

          function playReview () {
            return;
          }

          function onImageLoaded () {
            var placeholder = element[0].querySelector('[name="thumbnail-placeholder"]');
            var container = element[0].querySelector('[name="thumbnail-container"]');
            placeholder.style.display = 'none';
            container.classList.add('fp-thumbnail--loaded');
          }

          function toggleFavoriteIcon (favourite) {
            if ($rootScope.isMobile) return;
            var icon = element[0].querySelector('[name="thumbnail-favourite-icon"]');
            if ($rootScope.isLoggedIn) {
              var action = favourite ? 'add' : 'remove';
              return icon && icon.classList[action]('fp-thumbnail__fav--active');
            }
            return icon && icon.parentNode.removeChild(icon);
          }

          function toggleFavourite(event) {
            event.preventDefault();
          }

          function showGame() {
            var mobileTemplate = '/app/common/fp-game/mobile/fp-game-mobile.tmpl.html';

            fpModal.open({
              templateUrl: mobileTemplate,
              controller: 'FpGameMobileCtrl',
              size: 'lg',
              resolve: {
                demoDisabled: function () {
                  return scope.demoDisabled
                },
                game: function () {
                  return scope.game;
                },
                src: function () {
                  return scope.game.src;
                }
              }
            });
          }
        }
      };
    });
})();
