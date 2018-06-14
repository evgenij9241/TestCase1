(function () {
  'use strict';

  angular.module('finnplay.common.ui.input-amount', [])

    .directive('fpInputAmount', function ($filter) {
      return {
        restrict: 'E',
        templateUrl: '/app/common/ui/fp-input-amount/fp-input-amount.tmpl.html',
        scope: {
          model: '=ngModel',
          label: '=label',
          description: '=description',
          min: '=min',
          max: '=max',
          currency: '=currency'
        },
        link: function (scope) {
          scope.radio = '';
          scope.showDescription = showDescription;

          activate();

          function activate() {
            scope.$watch('model', function(value) {
              if (value) {
                scope.radio = 'yes';
              } else {
                scope.radio = '';
              }
            });
          }

          function showDescription() {
            var replacements = {
              min: $filter('currency')(scope.min, scope.currency),
              max: $filter('currency')(scope.max, scope.currency)
            };

            return $filter('translate')(scope.description, replacements);
          }
        }
      };
    });

})();
