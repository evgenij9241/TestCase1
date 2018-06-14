(function () {
  'use strict';

  angular.module('finnplay.common.ui.input-currency', [])
    .directive('fpInputCurrency', function () {
      return {
        restrict: 'E',
        templateUrl: '/app/common/ui/fp-input-currency/fp-input-currency.tmpl.html',
        scope: {
          model: '=ngModel',
          min: '=min',
          max: '=max',
          currency: '=currency'
        }
      };
    });
})();
