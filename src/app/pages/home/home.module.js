(function() {
  'use strict';

  angular.module('finnplay.pages.home', [
    'ui.router',
    'finnplay.models.game'
  ])
    .config(function ($stateProvider) {
      $stateProvider
        .state('home', {

          parent: '_main',
          url: '/',

          resolve: {
            pnp: function ($stateParams, $q, PayAndPlay) {
              var deferred = $q.defer();

              PayAndPlay.isPayAndPlayCountry().then(function (result) {
                return deferred.resolve(result);
              });

              return deferred.promise;
            }
          },

          templateProvider: function($templateRequest, pnp) {
            if (pnp) {
              return $templateRequest('/app/pages/home/home-pnp.tmpl.html');
            }
            return $templateRequest('/app/pages/home/home.tmpl.html');
          },

          controllerProvider: function($stateParams, pnp) {
            if (pnp) {
              return 'HomePnpCtrl';
            }
            return 'HomeCtrl'
          },
          controllerAs: 'homeCtrl',
          data: {
            title: 'APP.TITLE',
            access: 'guest'
          }
        })
    });

})();
