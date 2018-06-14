(function () {
  'use strict';

  angular.module('finnplay.common.game.list', [])
    .directive('fpGamesList', function () {
      return {
        restrict: 'AE',
        templateUrl: '/app/common/fp-games/list/fp-games-list.tmpl.html',
        scope: true,
        controller: 'FpGamesListCtrl',
        controllerAs: 'gamesList',
        bindToController: {
          noGamesFound: '=',
          noFavouritesGamesFound: '=',
          group: '=',
          gamesId: '=',
          search: '=',
          page: '@',
          showBy: '@',
          sortableByProvider: '@',
          listClass: '@',
          itemClass: '@',
          startSearch: '=',
          searchByProvider: '=',
          demoDisabled: '=',
          gamesAmount: '=',
          isUk: '='
        }
      };
    })
      .controller('FpGamesListCtrl', function (Game, Const, $rootScope) {
        var gamesList = this;

        gamesList.isMobile = $rootScope.isMobile;
        gamesList.getGroupTitle = Game.getGroupTitle;
        gamesList.loading = true;
        gamesList.itemsContainerListClass = 'fp-games-list ' + (gamesList.listClass || '');
        gamesList.itemListClass = 'fp-games-list__item ' + (gamesList.itemClass || '') + (gamesList.isMobile ? ' fp-games-list__item--mobile' : ' ');


        gamesList.getGameImageUrl = Game.getGameImageUrl;
        gamesList.getTitle = Game.getTitle;

        init();

        function clearFavourited () {}

        function getFavourites() {}

        function init () {
          gamesList.loading = true;
          Game.getGamesByGroupName().then(function (games) {
            gamesList.games = games.map(function (game) {
              game.gameTitle = Game.getTitle(game.gameId);
              return game;
            });
            gamesList.loading = false;
          });
        }
      });
})();
