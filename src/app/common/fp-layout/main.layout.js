(function() {
  'use strict';

  angular
    .module('finnplay.common.layout.main', ['ui.router'])
    .config(routeConfig);

  function routeConfig($stateProvider) {

    $stateProvider
      .state('_main', {
          parent: 'finnplay',
          abstract: true,
          templateUrl: '/app/common/fp-layout/main.tmpl.html',
          controller: function ($scope, $rootScope) {
            $scope.isPayAndPlayCountry = $rootScope.isPayAndPlayCountry;
            $scope.isPayAndPlay = $rootScope.isPayAndPlay;
            $scope.isMobile = $rootScope.isMobile;
            $scope.dark = $rootScope.dark;
            $scope.page = $rootScope.dark;
          }
        })
    ;
  }

})();
